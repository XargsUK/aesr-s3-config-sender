import { saveSettings, loadSettings } from '../settings';
import { jest } from '@jest/globals';

describe('Settings Module', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <input type="text" id="aesrIdText" />
      <input type="checkbox" id="debugModeCheckbox" />
      <div id="emptyState"></div>
    `;
    jest.clearAllMocks();
  });

  describe('saveSettings', () => {
    it('should save settings to chrome storage', async () => {
      const setSpy = chrome.storage.local.set as jest.Mock;
      const settings = {
        aesrId: 'test-id',
        debugMode: true,
      };

      // Set input values
      const aesrIdInput = document.getElementById('aesrIdText') as HTMLInputElement;
      const debugModeCheckbox = document.getElementById('debugModeCheckbox') as HTMLInputElement;
      aesrIdInput.value = settings.aesrId;
      debugModeCheckbox.checked = settings.debugMode;

      await saveSettings();

      expect(setSpy).toHaveBeenCalledWith({ globalSettings: settings });
    });

    it('should update empty state after saving', async () => {
      const aesrIdInput = document.getElementById('aesrIdText') as HTMLInputElement;
      const debugModeCheckbox = document.getElementById('debugModeCheckbox') as HTMLInputElement;
      aesrIdInput.value = 'test-id';
      debugModeCheckbox.checked = true;

      await saveSettings();

      const emptyState = document.getElementById('emptyState');
      expect(emptyState?.innerHTML).toContain('Settings Complete!');
      expect(emptyState?.innerHTML).toContain('Create First Profile');
    });

    it('should handle errors gracefully', async () => {
      const setSpy = chrome.storage.local.set as jest.Mock;
      setSpy.mockImplementationOnce(() => Promise.reject(new Error('Test error')));

      const consoleSpy = jest.spyOn(console, 'error');
      await saveSettings();

      expect(consoleSpy).toHaveBeenCalled();
    });
  });

  describe('loadSettings', () => {
    it('should load settings from chrome storage', async () => {
      const settings = {
        aesrId: 'test-id',
        debugMode: true,
      };

      const getSpy = chrome.storage.local.get as jest.Mock;
      getSpy.mockImplementationOnce(() => Promise.resolve({ globalSettings: settings }));

      await loadSettings();

      const aesrIdInput = document.getElementById('aesrIdText') as HTMLInputElement;
      const debugModeCheckbox = document.getElementById('debugModeCheckbox') as HTMLInputElement;
      expect(aesrIdInput.value).toBe(settings.aesrId);
      expect(debugModeCheckbox.checked).toBe(settings.debugMode);
    });

    it('should handle missing settings', async () => {
      const getSpy = chrome.storage.local.get as jest.Mock;
      getSpy.mockImplementationOnce(() => Promise.resolve({}));

      await loadSettings();

      const aesrIdInput = document.getElementById('aesrIdText') as HTMLInputElement;
      const debugModeCheckbox = document.getElementById('debugModeCheckbox') as HTMLInputElement;
      expect(aesrIdInput.value).toBe('');
      expect(debugModeCheckbox.checked).toBe(false);
    });
  });
});
