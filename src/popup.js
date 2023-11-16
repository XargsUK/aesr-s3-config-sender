import {
  getLastSentTimestamp,
  setLastSentTimestamp,
} from "./library/timestamp.js";
import { loadProfilesIntoDropdown, loadProfile } from "./library/profile.js";
import {
  getCurrentProfileData,
  setCurrentProfileData,
} from "./library/state.js";
import { getS3FileContent } from "./library/s3.js";
import { logDebugMessage, logErrorMessage } from "./library/debug.js";
import { showToastMessage } from "./library/toast.js";

window.onload = function () {
  document.getElementById("openOptionsLink").onclick = function (e) {
    openOptions();
    return false;
  };

  document.getElementById("openCreditsLink").onclick = function (e) {
    chrome.tabs.create(
      { url: chrome.runtime.getURL("credits.html") },
      function (tab) {}
    );
    return false;
  };

  const profileListElement = document.getElementById("profileList");
  profileListElement.addEventListener("change", function () {
    handleProfileChange(this.value);
  });

  async function handleProfileChange(selectedProfile) {
    const profileData = await loadProfile(selectedProfile);
    setCurrentProfileData(profileData);
    logDebugMessage(
      "Profile changed to: ",
      selectedProfile,
      " Current profile data is: ",
      getCurrentProfileData()
    );
  }

  document.getElementById("syncButton").addEventListener("click", function () {
    // Check if the browser is Firefox using the user agent string
    if (navigator.userAgent.toLowerCase().indexOf("firefox") > -1) {
      // For Firefox, check host permissions
      checkHostPermission().then((hasPermission) => {
        if (hasPermission) {
          // If permission is granted, proceed with the sync operation
          handleSyncButtonClick();
        } else {
          // If permission is not granted, inform the user and show a button to request permission
          showRequestPermissionButton();
        }
      });
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
          ? browser.storage.local.get(["awsCredentials"])
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
            browser.runtime
              .sendMessage(aesrSenderId, messageData)
              .then((response) => {
                setLastSentTimestamp(Date.now());
                getLastSentTimestamp();
                showToastMessage("success", "Sync successful!");
              })
              .catch((error) => {
                logErrorMessage("Failed to send data: " + error.message);
                showToastMessage("danger", "Failed to send data");
              });
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
        showToastMessage("danger", "An error occurred: " + error.message);
      }
    } else {
      logDebugMessage("No profile selected");
      showToastMessage("warning", "No profile selected");
    }
  }

  function isFirefox() {
    return typeof InstallTrigger !== "undefined";
  }

  getLastSentTimestamp();
  loadProfilesIntoDropdown(null, "profileList");

  function openOptions() {
    if (window.chrome) {
      chrome.runtime.openOptionsPage((err) => {
        if (err) logErrorMessage(`Error: ${err}`);
      });
    } else if (window.browser) {
      window.browser.runtime.openOptionsPage().catch((err) => {
        if (err) logErrorMessage(`Error: ${err}`);
      });
    }
  }

  function checkHostPermission() {
    return new Promise((resolve, reject) => {
      const permissionsToCheck = {
        origins: ["https://signin.aws.amazon.com/saml"],
      };
      browser.permissions
        .contains(permissionsToCheck)
        .then((hasPermission) => {
          resolve(hasPermission);
        })
        .catch((error) => {
          logErrorMessage("Error checking permissions:", error);
          reject(error);
        });
    });
  }

  function requestPermissions() {
    const permissionsToRequest = {
      origins: ["https://signin.aws.amazon.com/saml"],
    };
    browser.permissions
      .request(permissionsToRequest)
      .then((granted) => {
        if (granted) {
          logDebugMessage("Permission was granted");
        } else {
          logDebugMessage("Permission was refused");
        }
      })
      .catch((error) => {
        logErrorMessage("Error requesting permissions:", error);
      });
  }

  function showRequestPermissionButton() {
    // Show a button to request permissions
    const requestButton = document.createElement("button");
    requestButton.textContent = "Give Permissions to Sync";
    requestButton.addEventListener("click", function () {
      requestPermissions();
      window.close(); // Close the popup after requesting permissions
    });
    document.body.appendChild(requestButton);
  }

  function requestPermissions() {
    const permissionsToRequest = {
      origins: ["https://signin.aws.amazon.com/saml"],
    };
    browser.permissions
      .request(permissionsToRequest)
      .then((granted) => {
        if (granted) {
          logDebugMessage("Permission was granted");
        } else {
          logDebugMessage("Permission was refused");
        }
      })
      .catch((error) => {
        logErrorMessage("Error requesting permissions:", error);
      });
  }
};
