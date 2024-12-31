import { createIcons, icons } from 'lucide';

import { logDebugMessage, logErrorMessage } from './debug';
import {
  loadProfile,
  loadProfiles,
  setDefaultProfile,
  loadDefaultProfile,
  importProfile,
  exportProfile,
  deleteProfile,
  saveProfile,
} from './profile';
import { ProfileData, getGlobalSettings } from './state';
import { showToastMessage } from './toast';
import { showProfileSetup, clearProfileForm, showEmptyState, toggleSettings } from './ui';

export async function saveProfileAndUpdateUI(): Promise<void> {
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
    .filter(([, value]) => !value)
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

export async function deleteProfileAndUpdateUI(profileName: string): Promise<void> {
  try {
    const { profiles, defaultProfileName } = await loadProfiles();
    const isDefaultProfile = profileName === defaultProfileName;
    await deleteProfile(profileName);

    // Get remaining profiles (excluding the 'defaultProfile' key)
    const remainingProfiles = Object.keys(profiles).filter(
      (p) => p !== 'defaultProfile' && p !== profileName,
    );

    if (remainingProfiles.length === 0) {
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
      showEmptyState(true);
      showProfileSetup(false);
      return;
    }

    if (isDefaultProfile) {
      // Set the next profile as default
      const newDefaultProfile = remainingProfiles[0];
      await setDefaultProfile(newDefaultProfile);
      await loadProfilesAndUpdateUI(newDefaultProfile);
      showToastMessage('info', `Default profile set to: ${newDefaultProfile}`);
    } else {
      await loadProfilesAndUpdateUI(defaultProfileName);
    }

    showToastMessage('success', 'Profile deleted successfully');
  } catch (error) {
    showToastMessage('danger', 'Failed to delete profile');
    logErrorMessage('Failed to delete profile:', error);
  }
}

export async function loadProfileAndUpdateUI(profileName: string): Promise<void> {
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

export async function loadProfilesAndUpdateUI(selectedProfileName: string | null): Promise<void> {
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

export async function setDefaultProfileAndUpdateUI(): Promise<void> {
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

export async function loadDefaultProfileAndUpdateUI(): Promise<void> {
  const defaultProfile = await loadDefaultProfile();

  if (defaultProfile) {
    const profileList = document.getElementById('profileList') as HTMLSelectElement;
    if (profileList) {
      profileList.value = defaultProfile;
      await loadProfileAndUpdateUI(defaultProfile);
    }
  }
}

export function importProfileAndUpdateUI(): void {
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

export async function exportProfileAndUpdateUI(): Promise<void> {
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
