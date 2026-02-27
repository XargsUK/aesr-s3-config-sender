import { createIcons, UserPlus, Plus } from 'lucide';

import { logErrorMessage } from './debug';
import { GlobalSettings, setGlobalSettings } from './state';
import { showToastMessage } from './toast';
import { showEmptyState, showProfileSetup, clearProfileForm, toggleSettings } from './ui';

export async function saveSettings(): Promise<void> {
  const aesrId = (document.getElementById('aesrIdText') as HTMLInputElement).value.trim();
  const debugMode = (document.getElementById('debugModeCheckbox') as HTMLInputElement).checked;

  try {
    // Save settings globally
    const settings: GlobalSettings = { aesrId, debugMode };
    await chrome.storage.local.set({ globalSettings: settings });
    setGlobalSettings(settings);

    showToastMessage('success', 'Settings saved successfully');
    toggleSettings();

    // Update empty state to show create profile button
    const emptyState = document.getElementById('emptyState');
    if (emptyState) {
      emptyState.innerHTML = `
        <i data-lucide="user-plus" class="empty-state-icon"></i>
        <h2>Settings Complete!</h2>
        <p>Now let's create your first profile to manage your AWS configurations</p>
        <button id="emptyStateNewProfile" class="btn primary">
          <i data-lucide="plus"></i>
          Create First Profile
        </button>
      `;
      createIcons({ icons: { UserPlus, Plus }, root: emptyState });

      const newProfileButton = document.getElementById('emptyStateNewProfile');
      newProfileButton?.addEventListener('click', () => {
        clearProfileForm();
        showProfileSetup(true);
        showEmptyState(false);
      });
    }
  } catch (error) {
    showToastMessage('danger', 'Failed to save settings');
    logErrorMessage('Failed to save settings:', error);
  }
}

export async function loadSettings(): Promise<void> {
  const data = await chrome.storage.local.get(['globalSettings']);
  const settings = data.globalSettings as GlobalSettings;

  if (settings) {
    setGlobalSettings(settings);
    (document.getElementById('aesrIdText') as HTMLInputElement).value = settings.aesrId;
    (document.getElementById('debugModeCheckbox') as HTMLInputElement).checked = settings.debugMode;
  }
}
