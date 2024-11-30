import { logDebugMessage } from './debug';
import { getCurrentProfileData, setCurrentProfileData, ProfileData } from './state';

interface Profiles {
  [key: string]: ProfileData;
}

interface ProfilesResult {
  profiles: Profiles;
  defaultProfileName: string | null;
}

interface AWSCredentials {
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken: string;
}

interface ExportResult {
  dataStr: string;
  filename: string;
}

export async function loadProfile(profileName: string): Promise<ProfileData> {
  const result = (await chrome.storage.sync.get(profileName)) as { [key: string]: ProfileData };
  const profileData = result[profileName];
  setCurrentProfileData(profileData);
  return profileData;
}

export async function loadProfiles(): Promise<ProfilesResult> {
  const allItems = (await chrome.storage.sync.get(null)) as {
    [key: string]: ProfileData | string | boolean;
  };

  // Filter out non-profile keys
  const profiles = Object.keys(allItems).reduce<Profiles>((acc, key) => {
    if (key !== 'debugMode' && key !== 'defaultProfile' && typeof allItems[key] === 'object') {
      acc[key] = allItems[key] as ProfileData;
    }
    return acc;
  }, {});

  const defaultProfileName = (allItems.defaultProfile as string) || null;

  return { profiles, defaultProfileName };
}

export async function setDefaultProfile(profileName: string): Promise<string> {
  if (profileName) {
    await chrome.storage.sync.set({ defaultProfile: profileName });
    return profileName;
  } else {
    throw new Error('No profile selected');
  }
}

export async function loadDefaultProfile(): Promise<string | null> {
  const result = (await chrome.storage.sync.get('defaultProfile')) as { defaultProfile?: string };
  return result.defaultProfile || null;
}

export async function importProfile(file: File): Promise<string> {
  const reader = new FileReader();

  const fileContent = await new Promise<string>(
    (resolve: (value: string) => void, reject: (reason?: Error) => void): void => {
      reader.onload = (): void => resolve(reader.result as string);
      reader.onerror = (ev: ProgressEvent<FileReader>): void => {
        reject(new Error(`Failed to read file: ${ev.target?.error?.message || 'Unknown error'}`));
      };
      reader.readAsText(file);
    },
  );

  const importedProfile = JSON.parse(fileContent) as { [key: string]: ProfileData };
  const profileName = Object.keys(importedProfile)[0];

  if (typeof importedProfile[profileName] !== 'object') {
    throw new Error('Invalid profile data');
  }

  await chrome.storage.sync.set(importedProfile);
  return profileName;
}

export async function exportProfile(profileName: string): Promise<ExportResult> {
  const result = (await chrome.storage.sync.get(profileName)) as { [key: string]: ProfileData };

  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(result));
  const filename = profileName + '.json';

  return { dataStr, filename };
}

export async function deleteProfile(profileName: string): Promise<void> {
  await chrome.storage.sync.remove(profileName);
}

export async function saveProfile(profileName: string, profileData: ProfileData): Promise<void> {
  await chrome.storage.sync.set({
    [profileName]: profileData,
  });
}

export async function loadProfilesIntoDropdown(
  selectedProfileName: string | null,
  dropdownId: string,
): Promise<void> {
  const { profiles, defaultProfileName } = await loadProfiles();

  const profileList = document.getElementById(dropdownId) as HTMLSelectElement;
  if (!profileList) {
    throw new Error(`Dropdown with id ${dropdownId} not found`);
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
      option.selected = true;
      // Load the default profile data
      const profileData = await loadProfile(defaultProfileName);
      setCurrentProfileData(profileData);
    }

    profileList.appendChild(option);
    if (profileName === selectedProfileName) {
      option.selected = true;
    }
    logDebugMessage('Current Profile Data:', getCurrentProfileData());
  }

  if (defaultProfileName) {
    profileList.value = defaultProfileName;
  } else {
    profileList.selectedIndex = 0;
  }

  // Log the currentProfileData
  logDebugMessage('Current Profile Data:', getCurrentProfileData());
}

export async function saveAWSCredentials(
  profileName: string,
  awsCredentials: AWSCredentials,
): Promise<void> {
  const currentProfile = getCurrentProfileData();
  if (!currentProfile) {
    throw new Error('No current profile data found');
  }

  await chrome.storage.sync.set({
    [profileName]: {
      ...currentProfile,
      awsCredentials,
    },
  });
}
