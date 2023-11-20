import { logDebugMessage } from "./debug.js";
import { getCurrentProfileData, setCurrentProfileData } from "./state.js";

async function loadProfile(profileName) {
  const profileData = await new Promise((resolve) =>
    chrome.storage.sync.get(profileName, (result) =>
      resolve(result[profileName])
    )
  );
  setCurrentProfileData(profileData);
  return profileData;
}

async function loadProfiles() {
  const allItems = await new Promise((resolve) =>
    chrome.storage.sync.get(null, (items) => resolve(items))
  );

  // Filter out non-profile keys
  const profiles = Object.keys(allItems).reduce((acc, key) => {
    if (key !== "debugMode" && key !== "defaultProfile") {
      acc[key] = allItems[key];
    }
    return acc;
  }, {});

  const defaultProfileName = allItems.defaultProfile;

  return { profiles, defaultProfileName };
}

async function setDefaultProfile(profileName) {
  if (profileName) {
    return new Promise((resolve) =>
      chrome.storage.sync.set({ defaultProfile: profileName }, () =>
        resolve(profileName)
      )
    );
  } else {
    throw new Error("No profile selected");
  }
}

async function loadDefaultProfile() {
  const defaultProfile = await new Promise((resolve) =>
    chrome.storage.sync.get("defaultProfile", (result) =>
      resolve(result.defaultProfile)
    )
  );

  return defaultProfile;
}

async function importProfile(file) {
  const reader = new FileReader();

  const fileContent = await new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsText(file);
  });

  const importedProfile = JSON.parse(fileContent);
  const profileName = Object.keys(importedProfile)[0];

  if (typeof importedProfile[profileName] !== "object") {
    throw new Error("Invalid profile data");
  }

  await new Promise((resolve) =>
    chrome.storage.sync.set(importedProfile, resolve)
  );

  return profileName;
}

async function exportProfile(profileName) {
  const profileData = await new Promise((resolve) =>
    chrome.storage.sync.get(profileName, (result) => resolve(result))
  );

  const dataStr =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(profileData));
  const filename = profileName + ".json";

  return { dataStr, filename };
}

async function deleteProfile(profileName) {
  await new Promise((resolve) =>
    chrome.storage.sync.remove(profileName, resolve)
  );
}

async function saveProfile(profileName, profileData) {
  await new Promise((resolve) =>
    chrome.storage.sync.set(
      {
        [profileName]: profileData,
      },
      resolve
    )
  );
}

async function loadProfilesIntoDropdown(selectedProfileName, dropdownId) {
  const { profiles, defaultProfileName } = await loadProfiles();

  const profileList = document.getElementById(dropdownId);
  profileList.innerHTML = '';

  for (const profileName in profiles) {
    if (profileName === "defaultProfile") continue;

    const option = document.createElement("md-select-option");
    option.value = profileName;
    
    const headline = document.createElement("div");
    headline.slot = "headline";
    headline.textContent = profileName;
    option.appendChild(headline);

    // Set the selected attribute if this is the selected profile
    if (profileName === selectedProfileName || profileName === defaultProfileName) {
      option.setAttribute('selected', '');
      const profileData = await loadProfile(profileName);
      setCurrentProfileData(profileData);
    }

    profileList.appendChild(option);
    logDebugMessage("Profile Loaded:", profileName);
  }

  logDebugMessage("Current Profile Data:", getCurrentProfileData());
}



async function saveAWSCredentials(profileName, awsCredentials) {
  await new Promise((resolve) =>
    chrome.storage.sync.set(
      {
        [profileName]: {
          ...getCurrentProfileData(), // Merge existing profile data
          awsCredentials, // Add new AWS credentials
        },
      },
      resolve
    )
  );
}

export {
  loadProfile,
  loadProfiles,
  setDefaultProfile,
  loadDefaultProfile,
  importProfile,
  exportProfile,
  deleteProfile,
  saveProfile,
  loadProfilesIntoDropdown,
  saveAWSCredentials,
};
