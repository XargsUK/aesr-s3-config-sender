import './styles/modern.css';
import { createIcons, icons } from 'lucide';

import {
  logDebugMessage,
  logErrorMessage,
  saveDebugModeSetting,
  restoreDebugModeSetting,
} from './library/debug';
import {
  loadProfile,
  loadProfiles,
  setDefaultProfile,
  loadDefaultProfile,
  importProfile,
  exportProfile,
  deleteProfile,
  saveProfile,
} from './library/profile';
import { ProfileData } from './library/state';
import { showToastMessage } from './library/toast';

// Initialize Lucide icons
createIcons({
  icons: {
    Download: icons.Download,
    Upload: icons.Upload,
    Save: icons.Save,
    Trash: icons.Trash,
    Home: icons.Home,
    FileInput: icons.FileInput,
    FileOutput: icons.FileOutput,
  },
});

// PROFILE MANAGEMENT
// Saves profile to Chrome storage and refreshes the profiles list on the page.
async function saveProfileAndUpdateUI(): Promise<void> {
  const profileNameInput = document.getElementById('profileName') as HTMLInputElement;
  const profileName = profileNameInput.value.trim();
  if (!profileName) {
    showToastMessage('danger', 'Profile name is required');
    return;
  }

  const profileData: ProfileData = {
    region: (document.getElementById('awsRegion') as HTMLInputElement).value,
    bucket: (document.getElementById('bucketName') as HTMLInputElement).value,
    key: (document.getElementById('fileKey') as HTMLInputElement).value,
    aesrId: (document.getElementById('aesrIdText') as HTMLInputElement).value,
  };

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

// Deletes a profile from Chrome storage and refreshes the profiles list on the page.
async function deleteProfileAndUpdateUI(profileName: string): Promise<void> {
  try {
    const { profiles, defaultProfileName } = await loadProfiles();
    const isDefaultProfile = profileName === defaultProfileName;
    await deleteProfile(profileName);
    if (isDefaultProfile) {
      const newDefaultProfile = Object.keys(profiles).find(
        (p) => p !== profileName && p !== 'defaultProfile',
      );
      if (newDefaultProfile) {
        await setDefaultProfile(newDefaultProfile);
        loadProfilesAndUpdateUI(newDefaultProfile);
      } else {
        loadProfilesAndUpdateUI(null);
      }
    } else {
      loadProfilesAndUpdateUI(null);
    }
  } catch (error) {
    showToastMessage('danger', 'Failed to delete profile');
    logErrorMessage('Failed to delete profile:', error);
  }
}

// Loads a profile from Chrome storage and populates the form with the profile data.
async function loadProfileAndUpdateUI(profileName: string): Promise<void> {
  logDebugMessage('Loading profile:', profileName);
  const profileData = await loadProfile(profileName);
  logDebugMessage('Profile data:', profileData);

  if (profileData) {
    (document.getElementById('profileName') as HTMLInputElement).value = profileName;
    (document.getElementById('awsRegion') as HTMLInputElement).value = profileData.region;
    (document.getElementById('bucketName') as HTMLInputElement).value = profileData.bucket;
    (document.getElementById('fileKey') as HTMLInputElement).value = profileData.key;
    (document.getElementById('aesrIdText') as HTMLInputElement).value = profileData.aesrId;
  } else {
    logDebugMessage('No data found for profile:', profileName);
  }
}

// Loads all profiles saved in Chrome storage and creates a dropdown list of profiles, setting the default profile if it exists.
async function loadProfilesAndUpdateUI(selectedProfileName: string | null): Promise<void> {
  const { profiles, defaultProfileName } = await loadProfiles();

  const profileList = document.getElementById('profileList') as HTMLSelectElement;
  if (!profileList) {
    throw new Error('Profile list element not found');
  }

  profileList.innerHTML = '<option value="" disabled>Select a Profile</option>';

  for (const profileName in profiles) {
    if (profileName === 'defaultProfile') continue;

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

// Sets the user's default profile to the currently selected profile in the dropdown list.
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

// Loads the user's default profile from Chrome storage.
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

// Allows users to import a profile from a JSON file.
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

// Allows users to export a profile to a JSON file.
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
document.addEventListener('DOMContentLoaded', () => {
  // Load profiles and default profile
  loadProfilesAndUpdateUI(null);
  loadDefaultProfileAndUpdateUI();
  restoreDebugModeSetting();

  // Profile list change event
  const profileList = document.getElementById('profileList') as HTMLSelectElement;
  profileList?.addEventListener('change', () => {
    const selectedProfile = profileList.value;
    if (selectedProfile) {
      loadProfileAndUpdateUI(selectedProfile);
    }
  });

  // Save profile button
  const saveButton = document.getElementById('saveButton');
  saveButton?.addEventListener('click', saveProfileAndUpdateUI);

  // Delete profile button
  const deleteButton = document.getElementById('deleteButton');
  deleteButton?.addEventListener('click', () => {
    const profileName = (document.getElementById('profileName') as HTMLInputElement).value;
    if (profileName) {
      deleteProfileAndUpdateUI(profileName);
    }
  });

  // Set default profile button
  const setDefaultButton = document.getElementById('setDefaultButton');
  setDefaultButton?.addEventListener('click', setDefaultProfileAndUpdateUI);

  // Import profile button
  const importButton = document.getElementById('importButton');
  importButton?.addEventListener('click', importProfileAndUpdateUI);

  // Export profile button
  const exportButton = document.getElementById('exportButton');
  exportButton?.addEventListener('click', exportProfileAndUpdateUI);

  // Debug mode checkbox
  const debugModeCheckbox = document.getElementById('debugModeCheckbox') as HTMLInputElement;
  debugModeCheckbox?.addEventListener('change', saveDebugModeSetting);
});
