async function loadProfile(profileName) {
    const profileData = await new Promise((resolve) =>
      chrome.storage.sync.get(profileName, (result) => resolve(result[profileName]))
    );
  
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

export { loadProfile, loadProfiles, setDefaultProfile, loadDefaultProfile, importProfile, exportProfile, deleteProfile, saveProfile };
