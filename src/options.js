import * as bootstrap from "bootstrap";
import '@material/web/all.js';
import "./options.css";
import './css/theme.css';
import {
  loadProfile,
  loadProfiles,
  setDefaultProfile,
  loadDefaultProfile,
  importProfile,
  exportProfile,
  deleteProfile,
  saveProfile,
} from "./library/profile.js";
import { showToastMessage } from "./library/toast.js";
import { getS3FileContent } from "./library/s3.js";
import {
  setLastSentTimestamp,
  getLastSentTimestamp,
} from "./library/timestamp.js";
import { logDebugMessage, logErrorMessage, saveDebugModeSetting, restoreDebugModeSetting } from "./library/debug.js";

window.bootstrap = bootstrap;

// Tooltips for buttons, only show on hover
const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);

tooltipTriggerList.forEach((tooltipTriggerEl) => {
  // Attaching the tooltip behavior to the element
  new bootstrap.Tooltip(tooltipTriggerEl, {
    trigger: "hover", // Show tooltip only on hover
  });
});

// PROFILE MANAGEMENT
// Saves profile to Chrome storage and refreshes the profiles list on the page.
async function saveProfileAndUpdateUI() {
  const profileName = document.getElementById("profileName").value.trim();
  if (!profileName) {
    showToastMessage("red", "Profile name is required");
    return;
  }

  const profileData = {
    region: document.getElementById("awsRegion").value,
    bucket: document.getElementById("bucketName").value,
    key: document.getElementById("fileKey").value,
    aesrId: document.getElementById("aesrIdText").value,
  };

  try {
    const { profiles } = await loadProfiles();
    await saveProfile(profileName, profileData);
    if (!profiles.defaultProfile) {
      await setDefaultProfile(profileName);
    }
    await loadProfilesAndUpdateUI(profileName);
    showToastMessage("green", "Profile Saved");
  } catch (error) {
    showToastMessage("red", "Failed to save profile");
    logErrorMessage("Failed to save profile:", error);
  }
}

// Deletes a profile from Chrome storage and refreshes the profiles list on the page.
async function deleteProfileAndUpdateUI(profileName) {
  try {
    const { profiles, defaultProfileName } = await loadProfiles();
    const isDefaultProfile = profileName === defaultProfileName;
    await deleteProfile(profileName);
    if (isDefaultProfile) {
      const newDefaultProfile = Object.keys(profiles).find(
        (p) => p !== profileName && p !== "defaultProfile"
      );
      if (newDefaultProfile) {
        await setDefaultProfile(newDefaultProfile);
        loadProfilesAndUpdateUI(newDefaultProfile);
      } else {
        loadProfilesAndUpdateUI();
      }
    } else {
      loadProfilesAndUpdateUI();
    }
  } catch (error) {
    showToastMessage("red", "Failed to delete profile");
    logErrorMessage("Failed to delete profile:", error);
  }
}

// Loads a profile from Chrome storage and populates the form with the profile data.
async function loadProfileAndUpdateUI(profileName) {
  logDebugMessage("Loading profile:", profileName); // Debug
  const profileData = await loadProfile(profileName);
  logDebugMessage("Profile data:", profileData); // Debugging line

  if (profileData) {
    document.getElementById("profileName").value = profileName;
    document.getElementById("awsRegion").value = profileData.region;
    document.getElementById("bucketName").value = profileData.bucket;
    document.getElementById("fileKey").value = profileData.key;
    document.getElementById("aesrIdText").value = profileData.aesrId;
  } else {
    logDebugMessage("No data found for profile:", profileName); // Debugging line
  }
}

// Loads all profiles saved in Chrome storage and creates a dropdown list of profiles, setting the default profile if it exists.
async function loadProfilesAndUpdateUI(selectedProfileName) {
  const { profiles, defaultProfileName } = await loadProfiles();

  const profileList = document.getElementById("profileList");
  profileList.innerHTML = ''; // Clear existing options

  // Dynamically create and append md-select-option elements
  for (const profileName in profiles) {
    if (profileName === "defaultProfile") continue; // Skip defaultProfile key

    const option = document.createElement("md-select-option");
    option.value = profileName;
    
    const headline = document.createElement("div");
    headline.slot = "headline";
    headline.textContent = 
      profileName === defaultProfileName
        ? `${profileName} (default)`
        : profileName;
    option.appendChild(headline);

    // Set selected attribute based on the current or default profile
    if (profileName === selectedProfileName || profileName === defaultProfileName) {
      option.setAttribute('selected', '');
    }

    profileList.appendChild(option);
  }

  // Additional logic to set the value of the md-filled-select if needed
  // This depends on how md-filled-select manages its displayed value
}


// Sets the user's default profile to the currently selected profile in the dropdown list.
async function setDefaultProfileAndUpdateUI() {
  const profileList = document.getElementById("profileList");
  const selectedOption = profileList.querySelector('md-select-option[aria-selected="true"]');
  let selectedProfile = selectedOption ? selectedOption.textContent.trim() : null;

  if (!selectedProfile) {
    showToastMessage("yellow", "No profile selected");
    return;
  }

  try {
    const profileName = await setDefaultProfile(selectedProfile);
    showToastMessage("green", "Default profile set to: " + profileName);
    loadProfilesAndUpdateUI();
  } catch (error) {
    showToastMessage("yellow", error.message);
    logErrorMessage("Failed to set default profile:", error);
  }
}


// Loads the user's default profile from Chrome storage.
async function loadDefaultProfileAndUpdateUI() {
  const defaultProfile = await loadDefaultProfile();

  if (defaultProfile) {
    document.getElementById("profileList").value = defaultProfile;
    loadProfileAndUpdateUI(defaultProfile);
  }
}

// Allows users to import a profile from a JSON file.
function importProfileAndUpdateUI() {
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = ".json";
  fileInput.style.display = "none";

  fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    importProfile(file)
      .then((profileName) => {
        showToastMessage("green", "Profile imported successfully");
        loadProfilesAndUpdateUI();
        setTimeout(() => {
          loadProfileAndUpdateUI(profileName);
          document.getElementById("profileList").value = profileName;
        }, 100);
      })
      .catch((error) => {
        showToastMessage("red", "Invalid profile JSON file");
        logErrorMessage("Failed to import profile:", error);
      })
      .finally(() => {
        // Remove the file input element after it's been used
        fileInput.remove();
      });
  });

  // Append the file input element to the document and trigger the file selection dialog
  document.body.appendChild(fileInput);
  fileInput.click();
}

// Allows users to export a profile to a JSON file.
async function exportProfileAndUpdateUI() {
  const profileName = document.getElementById("profileList").value;
  if (!profileName) {
    showToastMessage("yellow", "Select a profile to export first!");
    return;
  }

  try {
    const { dataStr, filename } = await exportProfile(profileName);
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", filename);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    showToastMessage("green", "Profile exported successfully");
  } catch (error) {
    showToastMessage("red", "Failed to export profile");
    logErrorMessage("Failed to export profile:", error);
  }
}

// Fetches the content of an S3 file using AWS credentials and returns it as a string.
async function fetchS3FileContent(
  accessKeyId,
  secretAccessKey,
  sessionToken,
  region,
  bucket,
  key
) {
  try {
    // Log the credentials being used
    logDebugMessage(
      "Using credentials for S3 fetch:",
      accessKeyId,
      secretAccessKey,
      sessionToken
    );

    const content = await getS3FileContent(
      accessKeyId,
      secretAccessKey,
      sessionToken,
      region,
      bucket,
      key
    );

    return content;
  } catch (error) {
    logErrorMessage("Error fetching file from S3:", error);
    showToastMessage("red", "Error fetching file from S3: " + error.message);
  }
}

// Saves a timestamp to local storage as the last time data was sent.
function updateLastSentTimestamp(timestamp) {
  setLastSentTimestamp(timestamp);
  getLastSentTimestamp();
}

function isFirefox() {
  return typeof InstallTrigger !== "undefined";
}

window.onload = function () {

const tabs = document.getElementById('myTabs');
const syncContent = document.getElementById('syncContent');
const settingsContent = document.getElementById('settingsContent');
const helpContent = document.getElementById('helpContent');

tabs.addEventListener('change', (event) => {
  // Hide all content
  syncContent.hidden = true;
  settingsContent.hidden = true;
  helpContent.hidden = true;

  // Show the selected tab's content
  switch(event.target.activeTabIndex) {
    case 0:
      syncContent.hidden = false;
      break;
    case 1:
      settingsContent.hidden = false;
      break;
    case 2:
      helpContent.hidden = false;
      break;
  }
});

  const textArea = document.getElementById("awsConfigTextArea");
  const saveButton = document.getElementById("saveButton");
  const pullS3ConfigButton = document.getElementById("pullS3ConfigButton");

  saveButton.onclick = function () {
    const aesrSenderId = document.getElementById("aesrIdText").value;

    const messageData = {
      action: "updateConfig",
      dataType: "ini",
      data: textArea.value,
    };

    if (isFirefox()) {
      browser.runtime
        .sendMessage(aesrSenderId, messageData)
        .then((response) => {
          setLastSentTimestamp(Date.now());
          getLastSentTimestamp();
        })
        .catch((error) => {
          logErrorMessage("Failed to send data: " + error.message);
        });
    } else {
      chrome.runtime.sendMessage(
        aesrSenderId,
        messageData,
        function (response) {
          if (response) {
            setLastSentTimestamp(Date.now());
            getLastSentTimestamp();
          } else if (chrome.runtime.lastError) {
            logErrorMessage(
              "Failed to send data: " + chrome.runtime.lastError.message
            );
          }
        }
      );
    }
  };

  // Pulls AWS config data from S3 and updates the AWS config text area on the page.
  pullS3ConfigButton.onclick = async function () {
    // Retrieve credentials from chrome.storage.local
    chrome.storage.local.get("awsCredentials", async (data) => {
      if (chrome.runtime.lastError || !data.awsCredentials) {
        logErrorMessage(
          "Error retrieving credentials: " + chrome.runtime.lastError
        );
        return;
      }

      const credentials = data.awsCredentials;
      const accessKeyId = credentials.accessKeyId;
      const secretAccessKey = credentials.secretAccessKey;
      const sessionToken = credentials.sessionToken;
      const region = document.getElementById("awsRegion").value;
      const bucket = document.getElementById("bucketName").value;
      const key = document.getElementById("fileKey").value;

      if (!accessKeyId || !secretAccessKey || !region || !bucket || !key) {
        logDebugMessage("Please fill in all required fields.");
        return;
      }

      try {
        const content = await fetchS3FileContent(
          accessKeyId,
          secretAccessKey,
          sessionToken,
          region,
          bucket,
          key
        );
        textArea.value = content;
        showToastMessage("green", "Config downloaded");
      } catch (error) {
        showToastMessage(
          "red",
          "Error fetching S3 file content: " + error.message
        );
        logErrorMessage("Error fetching S3 file content:", error);
      }
    });
  };

  document.getElementById("saveProfileButton").onclick = saveProfileAndUpdateUI;
  document.getElementById("deleteProfileButton").onclick = () =>
    deleteProfileAndUpdateUI(document.getElementById("profileList").value);
  document.getElementById("profileList").onchange = () =>
    loadProfileAndUpdateUI(document.getElementById("profileList").value);
  document.getElementById("setDefaultProfileButton").onclick = setDefaultProfileAndUpdateUI;
  document.getElementById("exportProfileButton").onclick = exportProfileAndUpdateUI;
  document.getElementById("importProfileButton").onclick = importProfileAndUpdateUI;
  loadProfilesAndUpdateUI(); // Load the saved profiles initially
  loadDefaultProfileAndUpdateUI(); // Load the default profile initially
};

document.addEventListener("DOMContentLoaded", function () {
  restoreDebugModeSetting();
  document.getElementById("debugModeCheckbox").addEventListener('change', saveDebugModeSetting);
  // Creates a MutationObserver to hide a .hiddendiv.common on the page when a childList mutation occurs.
  const bodyObserver = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "childList") {
        const hiddenDiv = document.querySelector(".hiddendiv.common");
        if (hiddenDiv) {
          hiddenDiv.style.position = "absolute";
          hiddenDiv.style.left = "-9999px";
        }
      }
    }
  });

  bodyObserver.observe(document.body, {
    childList: true,
  });

  // Retrieves an HTML element with the ID "extensionId" and appends the extension's runtime ID to the text content of the element.
  const extensionIdElement = document.getElementById("extensionId");
  extensionIdElement.textContent += chrome.runtime.id;

  updateLastSentTimestamp();
});
