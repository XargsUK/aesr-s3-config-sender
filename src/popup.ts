import {
  getLastSentTimestamp,
  setLastSentTimestamp,
} from "./library/timestamp";
import { loadProfilesIntoDropdown, loadProfile } from "./library/profile";
import {
  getCurrentProfileData,
  setCurrentProfileData,
} from "./library/state";
import { getS3FileContent } from "./library/s3";
import { logDebugMessage, logErrorMessage } from "./library/debug";
import { showToastMessage } from "./library/toast";

// Basic console log to verify script loading
console.log('Popup script starting...');

function setupOptionsLink() {
  const optionsLink = document.getElementById('openOptionsLink');
  console.log('Options link found:', optionsLink);

  if (optionsLink) {
    optionsLink.onclick = function(e) {
      console.log('Options link clicked');
      e.preventDefault();
      chrome.runtime.openOptionsPage();
      return false;
    };
  }
}

// Create an observer instance
const observer = new MutationObserver((mutations, obs) => {
  const optionsLink = document.getElementById('openOptionsLink');
  if (optionsLink) {
    console.log('Options link found by observer');
    setupOptionsLink();
    obs.disconnect(); // Stop observing once we find the element
  }
});

// Start observing
observer.observe(document.documentElement, {
  childList: true,
  subtree: true
});

// Also try immediate setup in case the element is already there
setupOptionsLink();

// And try on DOMContentLoaded just to be thorough
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded fired');
  setupOptionsLink();
});

// And on load
window.addEventListener('load', () => {
  console.log('Window load fired');
  setupOptionsLink();
});

// Credits link handler
document.getElementById("openCreditsLink")?.addEventListener("click", (e) => {
  e.preventDefault();
  const creditsUrl = chrome.runtime.getURL("credits.html");
  chrome.tabs.create({ url: creditsUrl });
  return false;
});

// Profile change handler
const profileListElement = document.getElementById("profileList") as HTMLSelectElement;
if (profileListElement) {
  profileListElement.addEventListener("change", async function () {
    const profileData = await loadProfile(this.value);
    setCurrentProfileData(profileData);
    logDebugMessage(
      "Profile changed to: ",
      this.value,
      " Current profile data is: ",
      getCurrentProfileData()
    );
  });
}

// Sync button handler
document.getElementById("syncButton")?.addEventListener("click", async function () {
  // Check if the browser is Firefox using the user agent string
  if (navigator.userAgent.toLowerCase().indexOf("firefox") > -1) {
    // For Firefox, check host permissions
    const hasPermission = await checkHostPermission();
    if (hasPermission) {
      // If permission is granted, proceed with the sync operation
      handleSyncButtonClick();
    } else {
      // If permission is not granted, inform the user and show a button to request permission
      showRequestPermissionButton();
    }
  } else {
    // For other browsers, directly handle the sync button click
    handleSyncButtonClick();
  }
});

async function handleSyncButtonClick() {
  const profileData = getCurrentProfileData();
  if (profileData) {
    try {
      const data = await (isFirefox()
        ? (browser.storage.local.get(["awsCredentials"]) as Promise<{ awsCredentials: any }>)
        : chrome.storage.local.get(["awsCredentials"]));
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
        const messageData = {
          action: "updateConfig",
          dataType: "ini",
          data: configContent,
        };

        if (isFirefox()) {
          try {
            await browser.runtime.sendMessage(aesrSenderId, messageData);
            setLastSentTimestamp(Date.now());
            getLastSentTimestamp();
            showToastMessage("success", "Sync successful!");
          } catch (error) {
            logErrorMessage("Failed to send data: " + (error as Error).message);
            showToastMessage("danger", "Failed to send data");
          }
        } else {
          chrome.runtime.sendMessage(
            aesrSenderId,
            messageData,
            function (response) {
              if (chrome.runtime.lastError) {
                logErrorMessage(
                  "Failed to send data: " + chrome.runtime.lastError.message
                );
                showToastMessage("danger", "Failed to send data");
                return;
              }
              setLastSentTimestamp(Date.now());
              getLastSentTimestamp();
              showToastMessage("success", "Sync successful!");
            }
          );
        }
      } else {
        logDebugMessage("No AWS credentials found");
        showToastMessage("warning", "No AWS credentials found");
      }
    } catch (error) {
      logErrorMessage("An error occurred", error);
      showToastMessage("danger", "An error occurred: " + (error as Error).message);
    }
  } else {
    logDebugMessage("No profile selected");
    showToastMessage("warning", "No profile selected");
  }
}

function isFirefox(): boolean {
  return typeof InstallTrigger !== "undefined";
}

function checkHostPermission(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const permissionsToCheck = {
      origins: ["https://signin.aws.amazon.com/saml"],
    };
    browser.permissions
      .contains(permissionsToCheck)
      .then((hasPermission: boolean) => {
        resolve(hasPermission);
      })
      .catch((error: Error) => {
        logErrorMessage("Error checking permissions:", error);
        reject(error);
      });
  });
}

function showRequestPermissionButton() {
  const requestButton = document.createElement("button");
  requestButton.textContent = "Give Permissions to Sync";
  requestButton.addEventListener("click", function () {
    requestPermissions();
    window.close();
  });
  document.body.appendChild(requestButton);
}

function requestPermissions() {
  const permissionsToRequest = {
    origins: ["https://signin.aws.amazon.com/saml"],
  };
  browser.permissions
    .request(permissionsToRequest)
    .then((granted: boolean) => {
      if (granted) {
        logDebugMessage("Permission was granted");
      } else {
        logDebugMessage("Permission was refused");
      }
    })
    .catch((error: Error) => {
      logErrorMessage("Error requesting permissions:", error);
    });
}

// Initialize
getLastSentTimestamp();
loadProfilesIntoDropdown(null, "profileList");
