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

  const profileList = elById("profileList");
  profileList.innerHTML = '<option value="" disabled selected>Select a Profile</option>';

  for (const profileName in profiles) {
    const option = document.createElement("option");
    option.value = profileName;
    option.textContent = profileName;
    profileList.appendChild(option);
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
      } else {
        console.error('Failed to send data');
      }
    });
  };

  pullS3ConfigButton.onclick = async function () {
    const accessKeyId = elById('awsAccessKey').value;
    const secretAccessKey = elById('awsSecretKey').value;
    const region = elById('awsRegion').value;
    const bucket = elById('bucketName').value;
    const key = elById('fileKey').value;

    const msgSpan = document.getElementById('message');

    try {
      const content = await fetchS3FileContent(accessKeyId, secretAccessKey, region, bucket, key);
      textArea.value = content;
      M.textareaAutoResize(textArea);
      const label = textArea.nextElementSibling;
      label.classList.add('active');
    } catch (error) {
      console.error('Error fetching S3 file content:', error);
    }
  };

  elById("saveProfileButton").onclick = saveProfile;
  elById("loadProfileButton").onclick = () => loadProfile(elById("profileList").value);
  elById("deleteProfileButton").onclick = () => deleteProfile(elById("profileList").value);
  elById("profileList").onchange = () => loadProfile(elById("profileList").value);

  loadProfiles(); // Load the saved profiles initially
};

function fetchS3FileContent(accessKeyId, secretAccessKey, region, bucket, key) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(
      {
        action: "fetchS3FileContent",
        accessKeyId,
        secretAccessKey,
        region,
        bucket,
        key,
      },
      (response) => {
        if (response.success) {
          console.log("Received S3 file content:", response.content);
          resolve(response.content);
        } else {
          console.error("Failed to fetch S3 file content:", response.error);
          reject(response.error);
        }
      }
    );
  });
}

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

function fetchS3FileContent(accessKeyId, secretAccessKey, region, bucket, key) {
  return new Promise(async (resolve, reject) => {
    try {
      AWS.config.update({
        accessKeyId,
        secretAccessKey,
        region,
      });

      const s3 = new AWS.S3();
      const params = {
        Bucket: bucket,
        Key: key,
      };

      s3.getObject(params, (err, data) => {
        if (err) {
          console.error("Failed to fetch S3 file content:", err);
          reject({ success: false, error: err.message });
        } else {
          const content = data.Body.toString("utf-8");
          console.log("Received S3 file content:", content);
          resolve(content);
        }
      });
    } catch (error) {
      reject({ success: false, error: error.message });
    }
  });
}
