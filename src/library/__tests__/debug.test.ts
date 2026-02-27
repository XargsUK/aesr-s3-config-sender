import {
  logDebugMessage,
  logErrorMessage,
  saveDebugModeSetting,
  restoreDebugModeSetting,
} from '../debug';
import { jest } from '@jest/globals';

describe('Debug Module', () => {
  const consoleSpy = {
    log: jest.spyOn(console, 'log'),
    error: jest.spyOn(console, 'error'),
  };

  beforeEach(() => {
    document.body.innerHTML = '<input type="checkbox" id="debugModeCheckbox" />';
    jest.clearAllMocks();
  });

  describe('logDebugMessage', () => {
    it('should log message when debug mode is enabled', async () => {
      const getSpy = chrome.storage.local.get as jest.Mock;
      getSpy.mockImplementationOnce(() =>
        Promise.resolve({ globalSettings: { aesrId: '', debugMode: true } }),
      );

      await logDebugMessage('test message');
      expect(consoleSpy.log).toHaveBeenCalledWith('test message');
    });

    it('should not log message when debug mode is disabled', async () => {
      const getSpy = chrome.storage.local.get as jest.Mock;
      getSpy.mockImplementationOnce(() =>
        Promise.resolve({ globalSettings: { aesrId: '', debugMode: false } }),
      );

      await logDebugMessage('test message');
      expect(consoleSpy.log).not.toHaveBeenCalled();
    });

    it('should not log when globalSettings is missing', async () => {
      const getSpy = chrome.storage.local.get as jest.Mock;
      getSpy.mockImplementationOnce(() => Promise.resolve({}));

      await logDebugMessage('test message');
      expect(consoleSpy.log).not.toHaveBeenCalled();
    });

    it('should handle multiple arguments', async () => {
      const getSpy = chrome.storage.local.get as jest.Mock;
      getSpy.mockImplementationOnce(() =>
        Promise.resolve({ globalSettings: { aesrId: '', debugMode: true } }),
      );

      await logDebugMessage('test', 123, { key: 'value' });
      expect(consoleSpy.log).toHaveBeenCalledWith('test', 123, { key: 'value' });
    });
  });

  describe('logErrorMessage', () => {
    it('should log error when debug mode is enabled', async () => {
      const getSpy = chrome.storage.local.get as jest.Mock;
      getSpy.mockImplementationOnce(() =>
        Promise.resolve({ globalSettings: { aesrId: '', debugMode: true } }),
      );

      await logErrorMessage('error message');
      expect(consoleSpy.error).toHaveBeenCalledWith('error message');
    });

    it('should not log error when debug mode is disabled', async () => {
      const getSpy = chrome.storage.local.get as jest.Mock;
      getSpy.mockImplementationOnce(() =>
        Promise.resolve({ globalSettings: { aesrId: '', debugMode: false } }),
      );

      await logErrorMessage('error message');
      expect(consoleSpy.error).not.toHaveBeenCalled();
    });
  });

  describe('saveDebugModeSetting', () => {
    it('should save debug mode setting when checkbox is checked', async () => {
      const getSpy = chrome.storage.local.get as jest.Mock;
      getSpy.mockImplementationOnce(() =>
        Promise.resolve({ globalSettings: { aesrId: 'test-id', debugMode: false } }),
      );
      const setSpy = chrome.storage.local.set;
      const checkbox = document.getElementById('debugModeCheckbox') as HTMLInputElement;
      checkbox.checked = true;

      await saveDebugModeSetting();
      expect(setSpy).toHaveBeenCalledWith({
        globalSettings: { aesrId: 'test-id', debugMode: true },
      });
      expect(consoleSpy.log).toHaveBeenCalledWith('Debug mode is on.');
    });

    it('should save debug mode setting when checkbox is unchecked', async () => {
      const getSpy = chrome.storage.local.get as jest.Mock;
      getSpy.mockImplementationOnce(() =>
        Promise.resolve({ globalSettings: { aesrId: 'test-id', debugMode: true } }),
      );
      const setSpy = chrome.storage.local.set;
      const checkbox = document.getElementById('debugModeCheckbox') as HTMLInputElement;
      checkbox.checked = false;

      await saveDebugModeSetting();
      expect(setSpy).toHaveBeenCalledWith({
        globalSettings: { aesrId: 'test-id', debugMode: false },
      });
      expect(consoleSpy.log).toHaveBeenCalledWith('Debug mode is off.');
    });

    it('should throw error when checkbox is not found', async () => {
      document.body.innerHTML = '';
      await expect(saveDebugModeSetting()).rejects.toThrow('Debug mode checkbox not found');
    });
  });

  describe('restoreDebugModeSetting', () => {
    it('should restore debug mode setting when enabled', async () => {
      const getSpy = chrome.storage.local.get as jest.Mock;
      getSpy.mockImplementationOnce(() =>
        Promise.resolve({ globalSettings: { aesrId: '', debugMode: true } }),
      );

      await restoreDebugModeSetting();
      const checkbox = document.getElementById('debugModeCheckbox') as HTMLInputElement;
      expect(checkbox.checked).toBe(true);
    });

    it('should restore debug mode setting when disabled', async () => {
      const getSpy = chrome.storage.local.get as jest.Mock;
      getSpy.mockImplementationOnce(() =>
        Promise.resolve({ globalSettings: { aesrId: '', debugMode: false } }),
      );

      await restoreDebugModeSetting();
      const checkbox = document.getElementById('debugModeCheckbox') as HTMLInputElement;
      expect(checkbox.checked).toBe(false);
    });

    it('should handle missing globalSettings', async () => {
      const getSpy = chrome.storage.local.get as jest.Mock;
      getSpy.mockImplementationOnce(() => Promise.resolve({}));

      await restoreDebugModeSetting();
      const checkbox = document.getElementById('debugModeCheckbox') as HTMLInputElement;
      expect(checkbox.checked).toBe(false);
    });

    it('should throw error when checkbox is not found', async () => {
      document.body.innerHTML = '';
      await expect(restoreDebugModeSetting()).rejects.toThrow('Debug mode checkbox not found');
    });
  });
});
