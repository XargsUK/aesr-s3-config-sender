import {
  S3Client,
  GetObjectCommand
} from "@aws-sdk/client-s3";
import './materialize';
import { CognitoIdentityClient, GetIdCommand, GetCredentialsForIdentityCommand } from "@aws-sdk/client-cognito-identity";
import { CognitoIdentityProviderClient, InitiateAuthCommand } from "@aws-sdk/client-cognito-identity-provider";


const elById = (id) => document.getElementById(id);

// Saves profile to Chrome storage and refreshes the profiles list on the page.
async function saveProfile() {
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

  await new Promise((resolve) =>
    chrome.storage.sync.set({
      [profileName]: profileData
    }, resolve)
  );

  loadProfiles();
  showToastMessage('green', 'Profile Saved')
}

// Deletes a profile from Chrome storage and refreshes the profiles list on the page.
async function deleteProfile(profileName) {
  await new Promise((resolve) => chrome.storage.sync.remove(profileName, resolve));
  loadProfiles();
}

// Loads a profile from Chrome storage and populates the form with the profile data.
async function loadProfile(profileName) {
  const profileData = await new Promise((resolve) =>
    chrome.storage.sync.get(profileName, (result) => resolve(result[profileName]))
  );

  if (profileData) {
    elById("profileName").value = profileName;
    elById("awsAccessKey").value = profileData.accessKeyId;
    elById("awsSecretKey").value = profileData.secretAccessKey;
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

    const inputIds = ["profileName", "awsAccessKey", "awsSecretKey", "awsRegion", "bucketName", "fileKey", "aesrIdText", "cognitoUsername", "cognitoPassword", "cognitoUserPoolId", "cognitoClientAppId", "cognitoIdentityPoolId", "cognitoRegion"];
    activateLabels(inputIds);
  }
  showToastMessage('green', 'Profile Loaded')
}

// Loads all profiles saved in Chrome storage and creates a dropdown list of profiles, setting the default profile if it exists.
async function loadProfiles() {
  const profiles = await new Promise((resolve) =>
    chrome.storage.sync.get(null, (items) => resolve(items))
  );

  const defaultProfileName = await new Promise((resolve) =>
    chrome.storage.sync.get('defaultProfile', (result) => resolve(result.defaultProfile))
  );

  const profileList = elById("profileList");
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
  }

  if (defaultProfileName) {
    profileList.value = defaultProfileName;
    loadProfile(defaultProfileName);
  } else {
    profileList.selectedIndex = 0;
  }
}


// Sets the user's default profile to the currently selected profile in the dropdown list.
async function setDefaultProfile() {
  let selectedProfile = profileList.options[profileList.selectedIndex].text;
  if (selectedProfile) {
    chrome.storage.sync.set({
      defaultProfile: selectedProfile
    }, function() {
      showToastMessage('green', 'Default profile set to: ' + selectedProfile)
      refreshSelect();
      selectDefaultProfile();
    });
  } else {
      showToastMessage('yellow', 'Select a profile first!')
  }
};

// Loads the user's default profile from Chrome storage.
async function loadDefaultProfile() {
  const defaultProfile = await new Promise((resolve) =>
    chrome.storage.sync.get("defaultProfile", (result) =>
      resolve(result.defaultProfile)
    )
  );

  if (defaultProfile) {
    elById("profileList").value = defaultProfile;
    loadProfile(defaultProfile);
  }
}

// Initializes page elements and sends updated config data to the background script.
window.onload = function() {
  const textArea = elById('awsConfigTextArea');
  const msgSpan = elById('msgSpan');
  const saveButton = elById('saveButton');
  const pullS3ConfigButton = elById('pullS3ConfigButton');

  // set the rows attribute and overflow-y property
  textArea.setAttribute('rows', '20');
  textArea.style.overflowY = 'scroll';

  saveButton.onclick = function() {
    const aesrSenderId = elById('aesrIdText').value;

    chrome.runtime.sendMessage(aesrSenderId, {
      action: 'updateConfig',
      dataType: 'ini',
      data: textArea.value,
    }, function(response) {
      if (response) {
        localStorage.setItem('lastSentTimestamp', new Date().toISOString());
        updateLastSentTimestamp(Date.now());
      } else {
        showErrorBanner('Failed to send data' + error.message);
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
      showErrorBanner("Please fill in all required fields.");
      return;
    }
  
    try {
      const content = await fetchS3FileContent(accessKeyId, secretAccessKey, sessionToken, region, bucket, key);
      textArea.value = content;
      activateLabel("awsConfigTextArea");
      showToastMessage('green', 'Config downloaded')
    } catch (error) {
      showToastMessage('red', 'Error fetching S3 file content: ' + error.message)
    }
  };
  


  elById("saveProfileButton").onclick = saveProfile;
  elById("deleteProfileButton").onclick = () => deleteProfile(elById("profileList").value);
  elById("profileList").onchange = () => loadProfile(elById("profileList").value);
  elById("setDefaultProfileButton").onclick = setDefaultProfile;
  elById("cognitoSignInButton").onclick = handleCognitoSignIn;

  loadProfiles(); // Load the saved profiles initially
  loadDefaultProfile(); // Load the default profile initially

};

async function handleCognitoSignIn(event) {
  console.log("Cognito sign in button clicked.");
  event.preventDefault();
  console.log("Processing Cognito sign in...");

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
    const cognitoProvider = new CognitoIdentityProviderClient({ region });
    const authResult = await cognitoProvider.send(
      new InitiateAuthCommand({
        ClientId: clientAppId,
        AuthFlow: "USER_PASSWORD_AUTH",
        AuthParameters: {
          USERNAME: username,
          PASSWORD: password,
        },
      })
    );

    console.log("Auth result:", authResult);
    const idToken = authResult.AuthenticationResult.IdToken;

    const cognitoIdentityClient = new CognitoIdentityClient({ region });

    const identityResult = await cognitoIdentityClient.send(
      new GetIdCommand({
        IdentityPoolId: identityPoolId,
        Logins: {
          [`cognito-idp.${region}.amazonaws.com/${userPoolId}`]: idToken,
        },
      })
    );
    console.log("Identity result:", identityResult);

    const credentialsResult = await cognitoIdentityClient.send(
      new GetCredentialsForIdentityCommand({
        IdentityId: identityResult.IdentityId,
        Logins: {
          [`cognito-idp.${region}.amazonaws.com/${userPoolId}`]: idToken,
        },
      })
    );

    const {
      AccessKeyId: accessKeyId,
      SecretKey: secretAccessKey,
      SessionToken: sessionToken,
    } = credentialsResult.Credentials;

    console.log("Fetched credentials:", accessKeyId, secretAccessKey, sessionToken);

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
    }
  );
    console.log("Populated input fields with credentials:", accessKeyId, secretAccessKey, sessionToken);
    showToastMessage('green', 'Credentials stored from Cognito!')
  } catch (error) {
    showToastMessage('red', 'Error during Cognito sign in: ' + error.message)
  }
  console.log("handleCognitoSignIn function finished.");
}

// Fetches the content of an S3 file using AWS credentials and returns it as a string.
async function fetchS3FileContent(accessKeyId, secretAccessKey, sessionToken, region, bucket, key) {
  try {
    // Log the credentials being used
    console.log('Using credentials for S3 fetch:', accessKeyId, secretAccessKey, sessionToken);

    // Create a new S3 client
    const s3Client = new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
        sessionToken,
      },
    });

    console.log('S3 Client:', s3Client);

    // Create the GetObjectCommand with the required parameters
    const getObjectCommand = new GetObjectCommand({
      Bucket: bucket,
      Key: key,
    });

    // Send the command and get the response
    const response = await s3Client.send(getObjectCommand);
    const content = new TextDecoder("utf-8").decode(await new Response(response.Body).arrayBuffer());
    return content;
  } catch (error) {
    console.error('Error fetching file from S3:', error);
  }
}


// Creates a MutationObserver to hide a .hiddendiv.common on the page when a childList mutation occurs.
document.addEventListener('DOMContentLoaded', function() {
  const bodyObserver = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'childList') {
        const hiddenDiv = document.querySelector('.hiddendiv.common');
        if (hiddenDiv) {
          hiddenDiv.style.position = 'absolute';
          hiddenDiv.style.left = '-9999px';
        }
      }
    }
  });

  bodyObserver.observe(document.body, {
    childList: true
  });
});

// Retrieves an HTML element with the ID "extensionId" and appends the extension's runtime ID to the text content of the element.
document.addEventListener('DOMContentLoaded', function() {
  const extensionIdElement = document.getElementById('extensionId');
  extensionIdElement.textContent += chrome.runtime.id;
});

// Displays an error banner on the page with the specified message.
function showErrorBanner(message) {
  const errorBanner = document.getElementById("errorBanner");
  const errorMessage = document.getElementById("errorMessage");
  const errorClose = document.getElementById("errorClose");

  errorMessage.textContent = message;
  errorBanner.style.display = "block";

  errorClose.onclick = () => {
    errorBanner.style.display = "none";
  };
}

// Saves a timestamp to local storage as the last time data was sent.
function updateLastSentTimestamp(timestamp) {
  if (timestamp) {
    chrome.storage.local.set({
      lastSentTimestamp: timestamp
    }, () => {
      console.log('Last sent timestamp saved:', timestamp);
    });
  }

  // Retrieves a timestamp from local storage and displays it on the page as "Last sent: [date and time]" or "Last sent: Never".
  chrome.storage.local.get(['lastSentTimestamp'], (result) => {
    const lastSentElement = document.getElementById('lastSent');
    if (result.lastSentTimestamp) {
      lastSentElement.textContent = 'Last sent: ' + new Date(Number(result.lastSentTimestamp)).toLocaleString();
    } else {
      lastSentElement.textContent = 'Last sent: Never';
    }
  });
}

// Initializes Materialize tooltips and collapsibles and updates the last sent timestamp displayed on the page.
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.tooltipped');
  var instances = M.Tooltip.init(elems);

  var elems = document.querySelectorAll('.collapsible');
  var instances = M.Collapsible.init(elems);

  updateLastSentTimestamp();
});

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.tooltipped');
  var instances = M.Tooltip.init(elems, {
  });
});

function showToastMessage(color, message) {
  const toastWrapper = document.createElement('div');
  toastWrapper.style.position = 'fixed';
  toastWrapper.style.top = '10px';
  toastWrapper.style.left = '50%';
  toastWrapper.style.transform = 'translateX(-50%)';
  toastWrapper.style.zIndex = 10000;
  toastWrapper.style.opacity = 1;
  toastWrapper.style.transition = 'opacity 0.5s';

  const toastElement = document.createElement('div');
  toastElement.className = `toast ${color}`;
  toastElement.textContent = message;

  toastWrapper.appendChild(toastElement);
  document.body.appendChild(toastWrapper);

  setTimeout(() => {
    toastWrapper.style.opacity = 0;
  }, 5500); // Start fading out after 5.5 seconds

  setTimeout(() => {
    toastWrapper.remove();
  }, 6000);  // Remove the element after 6 seconds
}

function activateLabel(inputId) {
  const input = elById(inputId);
  if (input && input.value) {
    const label = document.querySelector(`label[for="${inputId}"]`);
    if (label) {
      label.classList.add("active");
    }
  }
}

function activateLabels(inputIds) {
  inputIds.forEach((id) => {
    activateLabel(id);
  });
}