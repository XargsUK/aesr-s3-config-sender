import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
const elById = (id) => document.getElementById(id);

async function saveProfile() {
  const profileName = elById("profileName").value.trim();
  if (!profileName) {
    return;
  }

  const profileData = {
    accessKeyId: elById("awsAccessKey").value,
    secretAccessKey: elById("awsSecretKey").value,
    region: elById("awsRegion").value,
    bucket: elById("bucketName").value,
    key: elById("fileKey").value,
    aesrId: elById("aesrIdText").value
  };

  await new Promise((resolve) =>
    chrome.storage.sync.set({ [profileName]: profileData }, resolve)
  );

  loadProfiles();
}

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

    const inputIds = ["profileName","awsAccessKey", "awsSecretKey", "awsRegion", "bucketName", "fileKey", "aesrIdText"];
    inputIds.forEach((id) => {
      const input = elById(id);
      if (input.value) {
        const label = document.querySelector(`label[for="${id}"]`);
        if (label) {
          label.classList.add("active");
        }
      }
    });
  }
}

async function deleteProfile(profileName) {
  await new Promise((resolve) => chrome.storage.sync.remove(profileName, resolve));
  loadProfiles();
}

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
    profileList.value = defaultProfileName; // Set the default profile as selected in the dropdown
    loadProfile(defaultProfileName);
  } else {
    profileList.selectedIndex = 0; // Set the 'Select a Profile' option as selected if there's no default profile
  }
}




window.onload = function () {
  const textArea = elById('awsConfigTextArea');
  const msgSpan = elById('msgSpan');
  const saveButton = elById('saveButton');
  const pullS3ConfigButton = elById('pullS3ConfigButton');

  // set the rows attribute and overflow-y property
  textArea.setAttribute('rows', '20');
  textArea.style.overflowY = 'scroll';

  saveButton.onclick = function () {
    const aesrSenderId = elById('aesrIdText').value;

    chrome.runtime.sendMessage(aesrSenderId, {
      action: 'updateConfig',
      dataType: 'ini',
      data: textArea.value,
    }, function (response) {
      if (response) {
        localStorage.setItem('lastSentTimestamp', new Date().toISOString());
        updateLastSentTimestamp(Date.now());
      } else {
        showErrorBanner('Failed to send data' + error.message);
      }
    });
  };

  pullS3ConfigButton.onclick = async function () {
    const accessKeyId = elById('awsAccessKey').value;
    const secretAccessKey = elById('awsSecretKey').value;
    const region = elById('awsRegion').value;
    const bucket = elById('bucketName').value;
    const key = elById('fileKey').value;
  
    try {
      const content = await fetchS3FileContent(accessKeyId, secretAccessKey, region, bucket, key);
      textArea.value = content;
      M.textareaAutoResize(textArea);
      window.getComputedStyle(document.body).height;
  
      const label = textArea.nextElementSibling;
      label.classList.add('active');
    } catch (error) {
      showErrorBanner('Error fetching S3 file content: ' + error.message);
    }
  };
  

  elById("saveProfileButton").onclick = saveProfile;
  // elById("loadProfileButton").onclick = () => loadProfile(elById("profileList").value);
  elById("deleteProfileButton").onclick = () => deleteProfile(elById("profileList").value);
  elById("profileList").onchange = () => loadProfile(elById("profileList").value);
  elById("setDefaultProfileButton").onclick = setDefaultProfile;

  loadProfiles(); // Load the saved profiles initially
};


function updateMessage(el, msg, color) {
  console.log('updateMessage called with', el, msg, color);
  const span = document.createElement('span');
  span.style.color = color;
  span.textContent = msg;
  const child = el.firstChild;
  if (child) {
    el.replaceChild(span, child);
  } else {
    el.appendChild(span);
  }
}

async function fetchS3FileContent(accessKeyId, secretAccessKey, region, bucket, key) {
  try {
    // Create a new S3 client
    const s3Client = new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });

    // Create the GetObjectCommand with the required parameters
    const getObjectCommand = new GetObjectCommand({
      Bucket: bucket,
      Key: key,
    });

    // Send the command and get the response
    const response = await s3Client.send(getObjectCommand);

    // Check the response status and throw an error if needed
    if (response.$metadata.httpStatusCode === 403) {
      throw new Error('Failed to load resource: the server responded with a status of 403 (Forbidden)');
    }

    const content = new TextDecoder("utf-8").decode(await new Response(response.Body).arrayBuffer());
    return content;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function setDefaultProfile() {
  let selectedProfile = profileList.options[profileList.selectedIndex].text;
  if (selectedProfile) {
    chrome.storage.sync.set({ defaultProfile: selectedProfile }, function () {
      M.toast({ html: 'Default profile set to: ' + selectedProfile });
      refreshSelect();
      selectDefaultProfile();
    });
  } else {
    M.toast({ html: 'Please select a profile first!' });
  }
};


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
document.addEventListener('DOMContentLoaded', function () {
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

  bodyObserver.observe(document.body, { childList: true });
});
document.addEventListener('DOMContentLoaded', function () {
  const extensionIdElement = document.getElementById('extensionId');
  extensionIdElement.textContent += chrome.runtime.id;
});

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

function updateLastSentTimestamp(timestamp) {
  if (timestamp) {
    chrome.storage.local.set({ lastSentTimestamp: timestamp }, () => {
      console.log('Last sent timestamp saved:', timestamp);
    });
  }

  chrome.storage.local.get(['lastSentTimestamp'], (result) => {
    const lastSentElement = document.getElementById('lastSent');
    if (result.lastSentTimestamp) {
      lastSentElement.textContent = 'Last sent: ' + new Date(Number(result.lastSentTimestamp)).toLocaleString();
    } else {
      lastSentElement.textContent = 'Last sent: Never';
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  // Initialize tooltips
  var elems = document.querySelectorAll('.tooltipped');
  var instances = M.Tooltip.init(elems);

  // Initialize collapsible elements
  var elems = document.querySelectorAll('.collapsible');
  var instances = M.Collapsible.init(elems);

  // Update the last sent timestamp
  updateLastSentTimestamp();
});

