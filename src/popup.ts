import {
  getLastSentTimestamp,
  setLastSentTimestamp,
} from "./library/timestamp";
import { loadProfilesIntoDropdown, loadProfile } from "./library/profile";
import {
  getCurrentProfileData,
  setCurrentProfileData,
  ProfileData
} from "./library/state";
import { getS3FileContent } from "./library/s3";
import { logDebugMessage, logErrorMessage } from "./library/debug";
import { showToastMessage } from "./library/toast";

interface AWSCredentials {
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken: string;
}

interface MessageData {
  action: string;
  dataType: string;
  data: string;
}

window.onload = function () {
  const openOptionsLink = document.getElementById("openOptionsLink");
  const openCreditsLink = document.getElementById("openCreditsLink");
  const profileListElement = document.getElementById("profileList") as HTMLSelectElement;
  const syncButton = document.getElementById("syncButton");

  if (!openOptionsLink || !openCreditsLink || !profileListElement || !syncButton) {
    throw new Error("Required DOM elements not found");
  }

  openOptionsLink.onclick = async function (e: MouseEvent) {
    e.preventDefault();
    try {
      await chrome.tabs.create({ url: chrome.runtime.getURL("credits.html") });
    } catch (error) {
      logErrorMessage("Error creating tab:", error);
    }
    return false;
  };

  openCreditsLink.onclick = async function (e: MouseEvent) {
    e.preventDefault();
    try {
      await chrome.tabs.create({ url: chrome.runtime.getURL("credits.html") });
    } catch (error) {
      logErrorMessage("Error creating tab:", error);
    }
    return false;
  };

  profileListElement.addEventListener("change", function () {
    handleProfileChange(this.value);
  });

  async function handleProfileChange(selectedProfile: string): Promise<void> {
    const profileData = await loadProfile(selectedProfile);
    setCurrentProfileData(profileData);
    logDebugMessage(
      "Profile changed to: ",
      selectedProfile,
      " Current profile data is: ",
      getCurrentProfileData()
    );
  }

  syncButton.addEventListener("click", function () {
    if (navigator.userAgent.toLowerCase().indexOf("firefox") > -1) {
      checkHostPermission().then((hasPermission: boolean) => {
        if (hasPermission) {
          handleSyncButtonClick();
        } else {
          showRequestPermissionButton();
        }
      });
    } else {
      handleSyncButtonClick();
    }
  });

  async function handleSyncButtonClick(): Promise<void> {
    const profileData = getCurrentProfileData();
    if (profileData) {
      try {
        const data = await (isFirefox()
          ? browser.storage.local.get(["awsCredentials"])
          : chrome.storage.local.get(["awsCredentials"])
        ) as { awsCredentials?: AWSCredentials };
            
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
          const messageData: MessageData = {
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
              const err = error as Error;
              logErrorMessage("Failed to send data: " + err.message);
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
        const err = error as Error;
        logErrorMessage("An error occurred", err);
        showToastMessage("danger", "An error occurred: " + err.message);
      }
    } else {
      logDebugMessage("No profile selected");
      showToastMessage("warning", "No profile selected");
    }
  }

  function isFirefox(): boolean {
    return typeof InstallTrigger !== "undefined";
  }

  getLastSentTimestamp();
  loadProfilesIntoDropdown(null, "profileList");

  async function openOptions(): Promise<void> {
    try {
      if (window.chrome) {
        await chrome.runtime.openOptionsPage();
      } else if (window.browser) {
        await browser.runtime.openOptionsPage();
      }
    } catch (error) {
      logErrorMessage(`Error: ${error}`);
    }
  }

  function checkHostPermission(): Promise<boolean> {
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

  function requestPermissions(): void {
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

  function showRequestPermissionButton(): void {
    const requestButton = document.createElement("button");
    requestButton.textContent = "Give Permissions to Sync";
    requestButton.addEventListener("click", function () {
      requestPermissions();
      window.close();
    });
    document.body.appendChild(requestButton);
  }
}; 