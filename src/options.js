import * as bootstrap from 'bootstrap';
import './options.css';
import { loadProfile, loadProfiles, setDefaultProfile, loadDefaultProfile, importProfile, exportProfile, deleteProfile, saveProfile  } from './library/profile.js';
import { showToastMessage } from './library/toast.js';
import { signInWithCognito } from "./library/cognito.js";
import { getS3FileContent } from "./library/s3.js";
import { setLastSentTimestamp, getLastSentTimestamp } from './library/timestamp.js';
import { logDebugMessage } from './library/debug.js';
import { elById } from './library/utils';



window.bootstrap = bootstrap;

// Tooltips for buttons, only show on hover
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltips = []; 

tooltipTriggerList.forEach(tooltipTriggerEl => {
  const tooltip = new bootstrap.Tooltip(tooltipTriggerEl, {
    trigger: 'hover' // Show tooltip only on hover
  });
  tooltips.push(tooltip);
});


// PROFILE MANAGEMENT
// Saves profile to Chrome storage and refreshes the profiles list on the page.
async function saveProfileAndUpdateUI() {
  const profileName = elById("profileName").value.trim();
  if (!profileName) {
    return;
  }

  const cognitoFilled =
    elById("cognitoUsername").value &&
    elById("cognitoPassword").value &&
    elById("cognitoUserPoolId").value &&
    elById("cognitoClientAppId").value &&
    elById("cognitoIdentityPoolId").value &&
    elById("cognitoRegion").value;

  const profileData = {
    accessKeyId: cognitoFilled ? "" : elById("awsAccessKey").value,
    secretAccessKey: cognitoFilled ? "" : elById("awsSecretKey").value,
    sessionToken: cognitoFilled ? "" : elById("awsSessionToken").value,
    region: elById("awsRegion").value,
    bucket: elById("bucketName").value,
    key: elById("fileKey").value,
    aesrId: elById("aesrIdText").value,
    cognitoUsername: elById("cognitoUsername").value,
    cognitoPassword: elById("cognitoPassword").value,
    cognitoUserPoolId: elById("cognitoUserPoolId").value,
    cognitoClientAppId: elById("cognitoClientAppId").value,
    cognitoIdentityPoolId: elById("cognitoIdentityPoolId").value,
    cognitoRegion: elById("cognitoRegion").value,
  };

  try {
    const { profiles } = await loadProfiles();

    await saveProfile(profileName, profileData);

    if (!profiles.defaultProfile) {
      await setDefaultProfile(profileName);
    }

    loadProfilesAndUpdateUI(profileName);
    showToastMessage('green', 'Profile Saved');
  } catch (error) {
    showToastMessage('red', 'Failed to save profile');
    logDebugMessage('Failed to save profile:', error);
  }
}

// Deletes a profile from Chrome storage and refreshes the profiles list on the page.
async function deleteProfileAndUpdateUI(profileName) {
  try {
    const { profiles, defaultProfileName } = await loadProfiles();

    const isDefaultProfile = profileName === defaultProfileName;

    await deleteProfile(profileName);

    if (isDefaultProfile) {
      const newDefaultProfile = Object.keys(profiles).find(p => p !== profileName && p !== 'defaultProfile');

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
    showToastMessage('red', 'Failed to delete profile');
    logDebugMessage('Failed to delete profile:', error);
  }
}

// Loads a profile from Chrome storage and populates the form with the profile data.
async function loadProfileAndUpdateUI(profileName) {
  const profileData = await loadProfile(profileName);

  if (profileData) {
    elById("profileName").value = profileName;
    elById("awsAccessKey").value = profileData.accessKeyId;
    elById("awsSecretKey").value = profileData.secretAccessKey;
    elById("awsSessionToken").value = profileData.sessionToken;
    elById("awsRegion").value = profileData.region;
    elById("bucketName").value = profileData.bucket;
    elById("fileKey").value = profileData.key;
    elById("aesrIdText").value = profileData.aesrId;
    elById("cognitoUsername").value = profileData.cognitoUsername;
    elById("cognitoPassword").value = profileData.cognitoPassword;
    elById("cognitoUserPoolId").value = profileData.cognitoUserPoolId;
    elById("cognitoClientAppId").value = profileData.cognitoClientAppId;
    elById("cognitoIdentityPoolId").value = profileData.cognitoIdentityPoolId;
    elById("cognitoRegion").value = profileData.cognitoRegion;
  }
}

// Loads all profiles saved in Chrome storage and creates a dropdown list of profiles, setting the default profile if it exists.
async function loadProfilesAndUpdateUI(selectedProfileName) {
  const { profiles, defaultProfileName } = await loadProfiles();

  const profileList = document.getElementById("profileList");
  profileList.innerHTML = '<option value="" disabled>Select a Profile</option>';

  for (const profileName in profiles) {
    if (profileName === "defaultProfile") continue;

    const option = document.createElement("option");
    option.value = profileName;
    option.textContent = profileName === defaultProfileName ? `${profileName} (default)` : profileName;

    if (profileName === defaultProfileName) {
      option.style.fontWeight = "bold";
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

// Sets the user's default profile to the currently selected profile in the dropdown list.
async function setDefaultProfileAndUpdateUI() {
  const profileList = elById("profileList");
  let selectedProfile = profileList.options[profileList.selectedIndex].text;
  
  try {
    const profileName = await setDefaultProfile(selectedProfile);
    showToastMessage('green', 'Default profile set to: ' + profileName);
    loadProfilesAndUpdateUI();
  }
  catch (error) {
    showToastMessage('yellow', error.message);
  }
};

// Loads the user's default profile from Chrome storage.
async function loadDefaultProfileAndUpdateUI() {
  const defaultProfile = await loadDefaultProfile();

  if (defaultProfile) {
    elById("profileList").value = defaultProfile;
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

    importProfile(file).then(profileName => {
      showToastMessage('green', 'Profile imported successfully');
      loadProfilesAndUpdateUI();
      setTimeout(() => {
        loadProfileAndUpdateUI(profileName); 
        elById("profileList").value = profileName;
      }, 100);
    }).catch(error => {
      showToastMessage('red', 'Invalid profile JSON file');
    }).finally(() => {
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
  const profileName = elById("profileList").value;
  if (!profileName) {
    showToastMessage('yellow', 'Select a profile to export first!');
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
    showToastMessage('green', 'Profile exported successfully');
  } catch (error) {
    showToastMessage('red', 'Failed to export profile');
  }
}

// Handles user sign-in using Cognito authentication service
async function handleCognitoSignIn(event) {
  logDebugMessage("Cognito sign in button clicked.");
  event.preventDefault();
  logDebugMessage("Processing Cognito sign in...");

  const username = elById("cognitoUsername").value.trim();
  const password = elById("cognitoPassword").value.trim();
  const userPoolId = elById("cognitoUserPoolId").value.trim();
  const identityPoolId = elById("cognitoIdentityPoolId").value.trim();
  const clientAppId = elById("cognitoClientAppId").value.trim();
  const region = elById("cognitoRegion").value.trim();

  if (!username || !password || !userPoolId || !identityPoolId || !clientAppId || !region) {
    showToastMessage('red', 'Please fill in all required fields.')
    return;
  }

  try {
    const { accessKeyId, secretAccessKey, sessionToken } = await signInWithCognito(
      username, password, userPoolId, identityPoolId, clientAppId, region
    );

    logDebugMessage("Fetched credentials:", accessKeyId, secretAccessKey, sessionToken);

    elById("awsAccessKey").value = accessKeyId;
    elById("awsSecretKey").value = secretAccessKey;
    elById("awsSessionToken").value = sessionToken; 
    const inputIds = ["awsAccessKey", "awsSecretKey", "awsSessionToken"];
    inputIds.forEach((id) => {
      const input = elById(id);
      if (input.value) {
        const label = document.querySelector(`label[for="${id}"]`);
        if (label) {
          label.classList.add("active");
        }
      }
    });

    logDebugMessage("Populated input fields with credentials:", accessKeyId, secretAccessKey, sessionToken);
    showToastMessage('green', 'Credentials stored from Cognito!')
  } catch (error) {
    showToastMessage('red', 'Error during Cognito sign in: ' + error.message)
  }
  logDebugMessage("handleCognitoSignIn function finished.");
}

// Fetches the content of an S3 file using AWS credentials and returns it as a string.
async function fetchS3FileContent(accessKeyId, secretAccessKey, sessionToken, region, bucket, key) {
  try {
    // Log the credentials being used
    logDebugMessage('Using credentials for S3 fetch:', accessKeyId, secretAccessKey, sessionToken);

    const content = await getS3FileContent(accessKeyId, secretAccessKey, sessionToken, region, bucket, key);
    
    return content;
  } catch (error) {
    logDebugMessage('Error fetching file from S3:', error);
    showToastMessage('red', 'Error fetching file from S3: ' + error.message);
  }
}

// Saves a timestamp to local storage as the last time data was sent.
function updateLastSentTimestamp(timestamp) {
  setLastSentTimestamp(timestamp);
  getLastSentTimestamp();
}


window.onload = function() {
  const textArea = elById('awsConfigTextArea');
  const saveButton = elById('saveButton');
  const pullS3ConfigButton = elById('pullS3ConfigButton');

  saveButton.onclick = function() {
    const aesrSenderId = elById('aesrIdText').value;

    chrome.runtime.sendMessage(aesrSenderId, {
      action: 'updateConfig',
      dataType: 'ini',
      data: textArea.value,
    }, function(response) {
      if (response) {
        setLastSentTimestamp(Date.now());
        getLastSentTimestamp();
      } else {
        logDebugMessage('Failed to send data' + error.message);
      }
    });
};

// Pulls AWS config data from S3 and updates the AWS config text area on the page.
pullS3ConfigButton.onclick = async function() {
  const accessKeyId = elById('awsAccessKey').value;
  const secretAccessKey = elById('awsSecretKey').value;
  const sessionToken = elById('awsSessionToken').value;
  const region = elById('awsRegion').value;
  const bucket = elById('bucketName').value;
  const key = elById('fileKey').value;

  if (!accessKeyId || !secretAccessKey || !region || !bucket || !key) {
    logDebugMessage("Please fill in all required fields.");
    return;
  }

  try {
    const content = await fetchS3FileContent(accessKeyId, secretAccessKey, sessionToken, region, bucket, key);
    textArea.value = content;
    showToastMessage('green', 'Config downloaded')
  } catch (error) {
    showToastMessage('red', 'Error fetching S3 file content: ' + error.message)
  }
};
  


  elById("saveProfileButton").onclick = saveProfileAndUpdateUI;
  elById("deleteProfileButton").onclick = () => deleteProfileAndUpdateUI(elById("profileList").value);
  elById("profileList").onchange = () => loadProfileAndUpdateUI(elById("profileList").value);
  elById("setDefaultProfileButton").onclick = setDefaultProfileAndUpdateUI;
  elById("cognitoSignInButton").onclick = handleCognitoSignIn;
  elById("exportProfileButton").onclick = exportProfileAndUpdateUI;
  elById("importProfileButton").onclick = importProfileAndUpdateUI;
  loadProfilesAndUpdateUI(); // Load the saved profiles initially
  loadDefaultProfileAndUpdateUI(); // Load the default profile initially

};

document.addEventListener("DOMContentLoaded", function () {
  // const importProfileButton = document.getElementById("importProfileButton");

  // if (importProfileButton) {
  //   importProfileButton.addEventListener("click", importProfile);
  //   console.log("EventListener added for importProfileButton");
  // } else {
  //   console.error("Import profile button not found.");
  // }

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
