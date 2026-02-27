import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import {
  areCredentialsExpired,
  getValidCredentials,
  clearExpiredCredentials,
} from '../credentials';

describe('credentials', () => {
  const validCredentials = {
    accessKeyId: 'AKIAIOSFODNN7EXAMPLE',
    secretAccessKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
    sessionToken: 'FwoGZXIvYXdzEBYaDH7hHA==',
    expiration: new Date(Date.now() + 3600_000).toISOString(),
  };

  const expiredCredentials = {
    ...validCredentials,
    expiration: new Date(Date.now() - 3600_000).toISOString(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('areCredentialsExpired', () => {
    it('should return true for a past date string', () => {
      expect(areCredentialsExpired('2020-01-01T00:00:00Z')).toBe(true);
    });

    it('should return false for a future date string', () => {
      const future = new Date(Date.now() + 3600_000).toISOString();
      expect(areCredentialsExpired(future)).toBe(false);
    });

    it('should return true for a past Date object', () => {
      expect(areCredentialsExpired(new Date('2020-01-01T00:00:00Z'))).toBe(true);
    });

    it('should return false for a future Date object', () => {
      expect(areCredentialsExpired(new Date(Date.now() + 3600_000))).toBe(false);
    });

    it('should return true when expiration equals now', () => {
      const now = new Date();
      expect(areCredentialsExpired(now)).toBe(true);
    });

    it('should return true for an invalid expiration value', () => {
      expect(areCredentialsExpired('[object Object]')).toBe(true);
      expect(areCredentialsExpired('')).toBe(true);
    });
  });

  describe('getValidCredentials', () => {
    it('should return credentials when they are valid', async () => {
      const getSpy = chrome.storage.local.get as jest.Mock;
      getSpy.mockImplementationOnce(() => Promise.resolve({ awsCredentials: validCredentials }));

      const result = await getValidCredentials();
      expect(result).toEqual(validCredentials);
    });

    it('should return null when no credentials exist', async () => {
      const getSpy = chrome.storage.local.get as jest.Mock;
      getSpy.mockImplementationOnce(() => Promise.resolve({}));

      const result = await getValidCredentials();
      expect(result).toBeNull();
    });

    it('should return null and clear storage when credentials are expired', async () => {
      const getSpy = chrome.storage.local.get as jest.Mock;
      getSpy.mockImplementationOnce(() => Promise.resolve({ awsCredentials: expiredCredentials }));

      const result = await getValidCredentials();
      expect(result).toBeNull();
      expect(chrome.storage.local.remove).toHaveBeenCalledWith('awsCredentials');
    });

    it('should return null when credentials are incomplete', async () => {
      const getSpy = chrome.storage.local.get as jest.Mock;
      getSpy.mockImplementationOnce(() =>
        Promise.resolve({ awsCredentials: { accessKeyId: 'AKID' } }),
      );

      const result = await getValidCredentials();
      expect(result).toBeNull();
      expect(chrome.storage.local.remove).not.toHaveBeenCalled();
    });
  });

  describe('clearExpiredCredentials', () => {
    it('should remove expired credentials from storage', async () => {
      const getSpy = chrome.storage.local.get as jest.Mock;
      getSpy.mockImplementationOnce(() => Promise.resolve({ awsCredentials: expiredCredentials }));

      await clearExpiredCredentials();
      expect(chrome.storage.local.remove).toHaveBeenCalledWith('awsCredentials');
    });

    it('should leave valid credentials untouched', async () => {
      const getSpy = chrome.storage.local.get as jest.Mock;
      getSpy.mockImplementationOnce(() => Promise.resolve({ awsCredentials: validCredentials }));

      await clearExpiredCredentials();
      expect(chrome.storage.local.remove).not.toHaveBeenCalled();
    });

    it('should do nothing when no credentials exist', async () => {
      const getSpy = chrome.storage.local.get as jest.Mock;
      getSpy.mockImplementationOnce(() => Promise.resolve({}));

      await clearExpiredCredentials();
      expect(chrome.storage.local.remove).not.toHaveBeenCalled();
    });
  });
});
