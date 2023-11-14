import { getLastSentTimestamp, setLastSentTimestamp } from "./library/timestamp";
import { loadProfilesIntoDropdown, loadProfile } from "./library/profile.js";
import { getCurrentProfileData, setCurrentProfileData } from "./library/state.js";
import { getS3FileContent } from "./library/s3.js";
import { logDebugMessage } from "./library/debug.js";
import { showToastMessage } from "./library/toast.js";

window.onload = function() {
  document.getElementById('openOptionsLink').onclick = function(e) {
    openOptions();
    return false;
  }
  
  document.getElementById('openCreditsLink').onclick = function(e) {
    chrome.tabs.create({ url: chrome.runtime.getURL('credits.html') }, function(tab){});
    return false;
  }

  const profileListElement = document.getElementById("profileList");
  profileListElement.addEventListener("change", function() {
    handleProfileChange(this.value);
  });

  async function handleProfileChange(selectedProfile) {
    const profileData = await loadProfile(selectedProfile);
    setCurrentProfileData(profileData);
    logDebugMessage("Profile changed to: ", selectedProfile, " Current profile data is: ", getCurrentProfileData());
  }

  document.getElementById("syncButton").addEventListener("click", function() {
    handleSyncButtonClick();
  });
  async function handleSyncButtonClick() {
    const profileData = getCurrentProfileData();
    if (profileData) {
      try {
        const data = await (chrome.storage.local.get ? chrome.storage.local.get(['awsCredentials']) : browser.storage.local.get(['awsCredentials']));
        const awsCredentials = data.awsCredentials;
        if (awsCredentials) {
          const bucket = profileData.bucket;
          const key = profileData.key;
          const region = profileData.region;
          const configContent = await getS3FileContent(
            awsCredentials.accessKeyId,
            awsCredentials.secretAccessKey,
            awsCredentials.sessionToken,
            region,
            bucket,
            key
          );
  
          logDebugMessage("S3 file content: ", configContent);
  
          const aesrSenderId = profileData.aesrId;
          const sendMessage = chrome.runtime.sendMessage ? chrome.runtime.sendMessage : browser.runtime.sendMessage;
          sendMessage(aesrSenderId, {
            action: 'updateConfig',
            dataType: 'ini',
            data: configContent,
          }, function(response) {
            if (response) {
              setLastSentTimestamp(Date.now());
              getLastSentTimestamp();
              showToastMessage("success", "Sync successful!");
            } else {
              logDebugMessage('Failed to send data');
              showToastMessage("danger", "Failed to send data");
            }
          });
        } else {
          logDebugMessage("No AWS credentials found");
          showToastMessage("warning", "No AWS credentials found");
        }
      } catch (error) {
        logDebugMessage("An error occurred", error);
        showToastMessage("danger", "An error occurred: " + error);
      }
    } else {
      logDebugMessage("No profile selected");
      showToastMessage("warning", "No profile selected");
    }
  }
  
  getLastSentTimestamp();
  loadProfilesIntoDropdown(null, "profileList");
  

function openOptions() {
  if (window.chrome) {
    chrome.runtime.openOptionsPage(err => {
      if (err) console.error(`Error: ${err}`);
    });
  } else if (window.browser) {
    window.browser.runtime.openOptionsPage().catch(err => {
      if (err) console.error(`Error: ${err}`);
    });
  }
}
}
