import { setLastSentTimestamp, getLastSentTimestamp } from '../timestamp';
import { jest } from '@jest/globals';

describe('timestamp', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="lastSent"></div>';
    jest.clearAllMocks();
  });

  describe('setLastSentTimestamp', () => {
    it('should save timestamp to chrome storage', async () => {
      const setSpy = chrome.storage.local.set;
      const timestamp = Date.now();
      await setLastSentTimestamp(timestamp);
      expect(setSpy).toHaveBeenCalledWith({ lastSentTimestamp: timestamp });
    });

    it('should not save if timestamp is falsy', async () => {
      const setSpy = chrome.storage.local.set;
      await setLastSentTimestamp(0);
      expect(setSpy).not.toHaveBeenCalled();
    });
  });

  describe('getLastSentTimestamp', () => {
    it('should update DOM with formatted timestamp', async () => {
      const timestamp = Date.now();
      const getSpy = chrome.storage.local.get as jest.Mock;
      getSpy.mockImplementationOnce(() => Promise.resolve({ lastSentTimestamp: timestamp }));

      await getLastSentTimestamp();
      const lastSentElement = document.getElementById('lastSent');
      expect(lastSentElement?.textContent).toContain('Last sent:');
      expect(lastSentElement?.textContent).not.toBe('Last sent: Never');
    });

    it('should show "Never" when no timestamp exists', async () => {
      const getSpy = chrome.storage.local.get as jest.Mock;
      getSpy.mockImplementationOnce(() => Promise.resolve({}));

      await getLastSentTimestamp();
      const lastSentElement = document.getElementById('lastSent');
      expect(lastSentElement?.textContent).toBe('Last sent: Never');
    });

    it('should throw error if element not found', async () => {
      document.body.innerHTML = '';
      await expect(getLastSentTimestamp()).rejects.toThrow('Last sent element not found');
    });
  });
});
