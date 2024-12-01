import './styles/modern.css';
import { createIcons, icons } from 'lucide';

import { logDebugMessage, logErrorMessage, restoreDebugModeSetting } from './library/debug';
import { showDeleteConfirmation } from './library/modal';
import {
  loadProfile,
  loadProfiles,
  setDefaultProfile,
  loadDefaultProfile,
  importProfile,
  exportProfile,
  saveProfile,
  migrateFromOldVersion,
} from './library/profile';
import { getS3FileContent } from './library/s3';
import { saveSettings, loadSettings } from './library/settings';
import { ProfileData, getGlobalSettings, setGlobalSettings } from './library/state';
import { getLastSentTimestamp, setLastSentTimestamp } from './library/timestamp';
import { showToastMessage } from './library/toast';
import {
  setButtonLoading,
  showConfigSuccess,
  showProfileSetup,
  clearProfileForm,
  showEmptyState,
  toggleSettings,
  getThisExtensionId,
  copyToClipboard,
} from './library/ui';

// Initialize Lucide icons
createIcons({ icons });

// Basic console log to verify script loading
console.log('Script loaded successfully');

// Profile Management Functions
async function saveProfileAndUpdateUI(): Promise<void> {
  const profileNameInput = document.getElementById('profileName') as HTMLInputElement;
  const profileName = profileNameInput.value.trim();
  if (!profileName) {
    showToastMessage('danger', 'Profile name is required');
    return;
  }

  // Check for global AESR ID
  const settings = getGlobalSettings();
  if (!settings?.aesrId) {
    showToastMessage('warning', 'Please set your AESR Extension ID in Settings');
    toggleSettings();
    return;
  }

  const profileData: ProfileData = {
    region: (document.getElementById('awsRegion') as HTMLInputElement).value.trim(),
    bucket: (document.getElementById('bucketName') as HTMLInputElement).value.trim(),
    key: (document.getElementById('fileKey') as HTMLInputElement).value.trim(),
  };

  const requiredFields = {
    region: profileData.region,
    bucket: profileData.bucket,
    key: profileData.key,
  };

  const missingFields = Object.entries(requiredFields)
    .filter(([_, value]) => !value)
    .map(([field]) => field);

  if (missingFields.length > 0) {
    showToastMessage(
      'danger',
      `Please fill in the following required fields: ${missingFields.join(', ')}`,
    );
    return;
  }

  try {
    const { profiles } = await loadProfiles();
    await saveProfile(profileName, profileData);
    if (!profiles.defaultProfile) {
      await setDefaultProfile(profileName);
    }
    await loadProfilesAndUpdateUI(profileName);
    showToastMessage('success', 'Profile Saved');
  } catch (error) {
    showToastMessage('danger', 'Failed to save profile');
    logErrorMessage('Failed to save profile:', error);
  }
}

async function loadProfileAndUpdateUI(profileName: string): Promise<void> {
  logDebugMessage('Loading profile:', profileName);
  const profileData = await loadProfile(profileName);
  logDebugMessage('Profile data:', profileData);

  if (profileData) {
    (document.getElementById('profileName') as HTMLInputElement).value = profileName;
    (document.getElementById('awsRegion') as HTMLInputElement).value = profileData.region;
    (document.getElementById('bucketName') as HTMLInputElement).value = profileData.bucket;
    (document.getElementById('fileKey') as HTMLInputElement).value = profileData.key;
  } else {
    logDebugMessage('No data found for profile:', profileName);
  }
}

async function loadProfilesAndUpdateUI(selectedProfileName: string | null): Promise<void> {
  const { profiles, defaultProfileName } = await loadProfiles();
  const profileList = document.getElementById('profileList') as HTMLSelectElement;

  if (!profileList) {
    throw new Error('Profile list element not found');
  }

  // Get profile names excluding the 'defaultProfile' key
  const profileNames = Object.keys(profiles).filter((p) => p !== 'defaultProfile');

  if (profileNames.length === 0) {
    showEmptyState(true);
    return;
  }

  showEmptyState(false);
  profileList.innerHTML = '<option value="" disabled>Select a Profile</option>';

  for (const profileName of profileNames) {
    const option = document.createElement('option');
    option.value = profileName;
    option.textContent =
      profileName === defaultProfileName ? `${profileName} (default)` : profileName;

    if (profileName === defaultProfileName) {
      option.style.fontWeight = 'bold';
    }

    profileList.appendChild(option);
    if (profileName === selectedProfileName) {
      option.selected = true;
    }
  }

  if (selectedProfileName) {
    profileList.value = selectedProfileName;
  } else if (defaultProfileName) {
    profileList.value = defaultProfileName;
  } else {
    profileList.selectedIndex = 0;
  }
}

async function setDefaultProfileAndUpdateUI(): Promise<void> {
  const profileList = document.getElementById('profileList') as HTMLSelectElement;
  if (!profileList) {
    throw new Error('Profile list element not found');
  }

  const selectedOption = profileList.options[profileList.selectedIndex];
  if (!selectedOption) {
    throw new Error('No profile selected');
  }

  const selectedProfile = selectedOption.text;

  try {
    const profileName = await setDefaultProfile(selectedProfile);
    showToastMessage('success', 'Default profile set to: ' + profileName);
    loadProfilesAndUpdateUI(null);
  } catch (error) {
    if (error instanceof Error) {
      showToastMessage('warning', error.message);
    }
    logErrorMessage('Failed to set default profile:', error);
  }
}

async function loadDefaultProfileAndUpdateUI(): Promise<void> {
  const defaultProfile = await loadDefaultProfile();

  if (defaultProfile) {
    const profileList = document.getElementById('profileList') as HTMLSelectElement;
    if (profileList) {
      profileList.value = defaultProfile;
      await loadProfileAndUpdateUI(defaultProfile);
    }
  }
}

function importProfileAndUpdateUI(): void {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = '.json';
  fileInput.style.display = 'none';

  fileInput.addEventListener('change', async (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (!file) {
      return;
    }

    try {
      const profileName = await importProfile(file);
      showToastMessage('success', 'Profile imported successfully');
      await loadProfilesAndUpdateUI(null);
      setTimeout(async () => {
        await loadProfileAndUpdateUI(profileName);
        const profileList = document.getElementById('profileList') as HTMLSelectElement;
        if (profileList) {
          profileList.value = profileName;
        }
      }, 100);
    } catch (error) {
      showToastMessage('danger', 'Invalid profile JSON file');
      logErrorMessage('Failed to import profile:', error);
    } finally {
      fileInput.remove();
    }
  });

  document.body.appendChild(fileInput);
  fileInput.click();
}

async function exportProfileAndUpdateUI(): Promise<void> {
  const profileList = document.getElementById('profileList') as HTMLSelectElement;
  if (!profileList) {
    throw new Error('Profile list element not found');
  }

  const profileName = profileList.value;
  if (!profileName) {
    showToastMessage('warning', 'Select a profile to export first!');
    return;
  }

  try {
    const { dataStr, filename } = await exportProfile(profileName);
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', filename);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    showToastMessage('success', 'Profile exported successfully');
  } catch (error) {
    showToastMessage('danger', 'Failed to export profile');
    logErrorMessage('Failed to export profile:', error);
  }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', async () => {
  console.log('DOMContentLoaded event fired');

  try {
    // Attempt to migrate from old version if needed
    const { migrated, profileCount } = await migrateFromOldVersion();
    if (migrated) {
      showToastMessage(
        'success',
        `Successfully migrated ${profileCount} profile${profileCount !== 1 ? 's' : ''} to the new version`,
      );
    }
  } catch (error) {
    logErrorMessage('Migration failed:', error);
    showToastMessage('danger', 'Failed to migrate profiles from old version');
  }

  // Load settings first
  const data = await chrome.storage.local.get(['globalSettings']);
  if (data.globalSettings) {
    setGlobalSettings(data.globalSettings);
  }

  // Pull Config button
  const pullConfigButton = document.getElementById('pullConfigButton') as HTMLButtonElement;
  console.log('Pull config button found:', !!pullConfigButton);

  pullConfigButton?.addEventListener('click', async () => {
    console.log('Pull config button clicked');
    setButtonLoading(pullConfigButton, true);
    try {
      console.log('Getting config textarea and profile list...');
      const configTextArea = document.getElementById('awsConfigTextArea') as HTMLTextAreaElement;
      const profileList = document.getElementById('profileList') as HTMLSelectElement;
      console.log('Selected profile:', profileList.value);

      console.log('Loading profile data...');
      const profileData = await loadProfile(profileList.value);
      console.log('Profile data:', profileData);

      if (!profileData) {
        console.log('No profile data found');
        showToastMessage('danger', 'No profile selected');
        return;
      }

      console.log('Getting AWS credentials...');
      const data = await chrome.storage.local.get(['awsCredentials']);
      console.log('AWS credentials found:', !!data.awsCredentials);

      const awsCredentials = data.awsCredentials;
      if (!awsCredentials) {
        console.log('No AWS credentials found');
        showToastMessage('warning', 'No AWS credentials found. Please sign in to AWS first.');
        return;
      }

      console.log('Fetching S3 content...');
      const content = await getS3FileContent(
        awsCredentials.accessKeyId,
        awsCredentials.secretAccessKey,
        awsCredentials.sessionToken,
        profileData.region,
        profileData.bucket,
        profileData.key,
      );
      console.log('S3 content fetched successfully');

      configTextArea.value = content;
      showConfigSuccess();
      showToastMessage('success', 'Configuration pulled successfully');
    } catch (error) {
      console.error('Error in pull config:', error);
      showToastMessage('danger', 'Failed to pull configuration');
      logErrorMessage('Failed to pull configuration:', error);
    } finally {
      setButtonLoading(pullConfigButton, false);
    }
  });

  // Load initial data
  await loadProfilesAndUpdateUI(null);
  await loadDefaultProfileAndUpdateUI();
  restoreDebugModeSetting();
  getLastSentTimestamp();

  // If default profile is loaded, show config section
  const profileList = document.getElementById('profileList') as HTMLSelectElement;
  if (profileList?.value) {
    showProfileSetup(false);
    const configSection = document.getElementById('configSection');
    configSection?.classList.add('show');
  } else {
    // No profiles exist, check if settings are configured
    const settings = getGlobalSettings();
    const emptyState = document.getElementById('emptyState');
    if (settings?.aesrId && emptyState) {
      // If AESR ID is set, show the "create first profile" screen
      emptyState.innerHTML = `
        <i data-lucide="user-plus" class="empty-state-icon"></i>
        <h2>Settings Complete!</h2>
        <p>Now let's create your first profile to manage your AWS configurations</p>
        <button id="emptyStateNewProfile" class="btn primary">
          <i data-lucide="plus"></i>
          Create First Profile
        </button>
      `;
      createIcons({ icons });

      const newProfileButton = document.getElementById('emptyStateNewProfile');
      newProfileButton?.addEventListener('click', () => {
        clearProfileForm();
        showProfileSetup(true);
        showEmptyState(false);
      });
    }
  }

  // New Profile button
  const newProfileButton = document.getElementById('newProfileButton');
  newProfileButton?.addEventListener('click', () => {
    clearProfileForm();
    showProfileSetup(true);
  });

  // Edit Profile button
  const editProfileButton = document.getElementById('editProfileButton');
  editProfileButton?.addEventListener('click', async () => {
    const profileList = document.getElementById('profileList') as HTMLSelectElement;
    if (!profileList || !profileList.value) {
      showToastMessage('warning', 'Please select a profile to edit');
      return;
    }

    const profileSetup = document.getElementById('profileSetup');
    if (profileSetup?.classList.contains('show')) {
      showProfileSetup(false);
    } else {
      await loadProfileAndUpdateUI(profileList.value);
      showProfileSetup(true);
    }
  });

  // Save Profile button
  const saveProfileButton = document.getElementById('saveProfileButton');
  saveProfileButton?.addEventListener('click', saveProfileAndUpdateUI);

  // Push to AESR button
  const saveButton = document.getElementById('saveButton');
  saveButton?.addEventListener('click', async () => {
    const configTextArea = document.getElementById('awsConfigTextArea') as HTMLTextAreaElement;
    const settings = getGlobalSettings();
    if (!settings?.aesrId) {
      showToastMessage('warning', 'Please set your AESR Extension ID in Settings');
      toggleSettings();
      return;
    }

    if (!configTextArea.value) {
      showToastMessage('warning', 'Please pull configuration from S3 first');
      return;
    }

    try {
      const messageData = {
        action: 'updateConfig',
        dataType: 'ini',
        data: configTextArea.value,
      };

      chrome.runtime.sendMessage(settings.aesrId, messageData, function (_response) {
        if (chrome.runtime.lastError) {
          logErrorMessage('Failed to send data: ' + chrome.runtime.lastError.message);
          showToastMessage('danger', 'Failed to send data');
          return;
        }
        setLastSentTimestamp(Date.now());
        getLastSentTimestamp();
        showToastMessage('success', 'Configuration pushed successfully');
      });
    } catch (error) {
      logErrorMessage('Failed to push configuration:', error);
      showToastMessage('danger', 'Failed to push configuration');
    }
  });

  // Delete Profile button
  const deleteProfileButton = document.getElementById('deleteProfileButton');
  deleteProfileButton?.addEventListener('click', () => {
    const profileName = (document.getElementById('profileName') as HTMLInputElement).value;
    if (profileName) {
      showDeleteConfirmation(profileName);
    }
  });

  // Close Profile button
  const closeProfileButton = document.getElementById('closeProfileButton');
  closeProfileButton?.addEventListener('click', () => {
    showProfileSetup(false);
  });

  // Set Default Profile button
  const setDefaultProfileButton = document.getElementById('setDefaultProfileButton');
  setDefaultProfileButton?.addEventListener('click', setDefaultProfileAndUpdateUI);

  // Import Profile button
  const importProfileButton = document.getElementById('importProfileButton');
  importProfileButton?.addEventListener('click', importProfileAndUpdateUI);

  // Export Profile button
  const exportProfileButton = document.getElementById('exportProfileButton');
  exportProfileButton?.addEventListener('click', exportProfileAndUpdateUI);

  // Settings button and modal
  const settingsButton = document.getElementById('settingsButton');
  const closeSettingsModal = document.getElementById('closeSettingsModal');
  const cancelSettingsButton = document.getElementById('cancelSettingsButton');
  const settingsModal = document.getElementById('settingsModal');

  settingsButton?.addEventListener('click', toggleSettings);
  closeSettingsModal?.addEventListener('click', toggleSettings);
  cancelSettingsButton?.addEventListener('click', toggleSettings);

  // Close settings modal when clicking outside
  settingsModal?.addEventListener('click', (e) => {
    if (e.target === settingsModal) {
      toggleSettings();
    }
  });

  // Close settings modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && settingsModal?.classList.contains('show')) {
      toggleSettings();
    }
  });

  // Empty state new profile button
  const emptyStateNewProfile = document.getElementById('emptyStateNewProfile');
  emptyStateNewProfile?.addEventListener('click', () => {
    clearProfileForm();
    showProfileSetup(true);
    showEmptyState(false);
  });

  // Settings save button
  const saveSettingsButton = document.getElementById('saveSettingsButton');
  saveSettingsButton?.addEventListener('click', saveSettings);

  // Display this extension's ID
  const thisExtensionId = document.getElementById('thisExtensionId') as HTMLInputElement;
  if (thisExtensionId) {
    thisExtensionId.value = getThisExtensionId();
  }

  // Copy this extension's ID button
  const copyThisId = document.getElementById('copyThisId');
  copyThisId?.addEventListener('click', () => {
    copyToClipboard(getThisExtensionId());
  });

  // Empty state settings button
  const emptyStateSettings = document.getElementById('emptyStateSettings');
  emptyStateSettings?.addEventListener('click', () => {
    toggleSettings();
  });

  // Load settings on startup
  await loadSettings();
});
