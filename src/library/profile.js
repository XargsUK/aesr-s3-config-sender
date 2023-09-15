import { logDebugMessage } from "./debug.js";
import { getCurrentProfileData, setCurrentProfileData } from "./state.js";

async function loadProfile(profileName) {
    const profileData = await new Promise((resolve) =>
      chrome.storage.sync.get(profileName, (result) => resolve(result[profileName]))
    );
    setCurrentProfileData(profileData);
    return profileData;
  }
  
async function loadProfiles() {
    const profiles = await new Promise((resolve) =>
        chrome.storage.sync.get(null, (items) => resolve(items))
    );

    const defaultProfileName = await new Promise((resolve) =>
        chrome.storage.sync.get('defaultProfile', (result) => resolve(result.defaultProfile))
    );

    return { profiles, defaultProfileName };
}

async function setDefaultProfile(profileName) {
    if (profileName) {
      return new Promise((resolve) =>
        chrome.storage.sync.set({ defaultProfile: profileName }, () => resolve(profileName))
      );
    }
    else {
      throw new Error('No profile selected');
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
  
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(profileData));
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
      chrome.storage.sync.set({
        [profileName]: profileData
      }, resolve)
    );
  }

  async function loadProfilesIntoDropdown(selectedProfileName, dropdownId) {
    const { profiles, defaultProfileName } = await loadProfiles();
  
    const profileList = document.getElementById(dropdownId);
    profileList.innerHTML = '<option value="" disabled>Select a Profile</option>';
  
    for (const profileName in profiles) {
      if (profileName === "defaultProfile") continue;
  
      const option = document.createElement("option");
      option.value = profileName;
      option.textContent = profileName === defaultProfileName ? `${profileName} (default)` : profileName;
  
      if (profileName === defaultProfileName) {
        option.style.fontWeight = "bold";
        option.selected = true;
        // Load the default profile data
        const profileData = await loadProfile(defaultProfileName);
        setCurrentProfileData(profileData);
      }
  
      profileList.appendChild(option);
      if (profileName === selectedProfileName) {
        option.selected = true;
        // Update the currentProfileData if selectedProfileName is provided
        let currentProfileData = await loadProfile(selectedProfileName);
      }
      logDebugMessage("Current Profile Data:", getCurrentProfileData());
    }
  
    if (defaultProfileName) {
      profileList.value = defaultProfileName;
    } else {
      profileList.selectedIndex = 0;
    }

    // Log the currentProfileData
    logDebugMessage("Current Profile Data:", getCurrentProfileData());
}



export { loadProfile, loadProfiles, setDefaultProfile, loadDefaultProfile, importProfile, exportProfile, deleteProfile, saveProfile, loadProfilesIntoDropdown};
