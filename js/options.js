const elById = (id) => document.getElementById(id);

window.onload = function () {
  const textArea = elById('awsConfigTextArea');
  const msgSpan = elById('msgSpan');
  const saveButton = elById('saveButton');
  const pullS3ConfigButton = elById('pullS3ConfigButton');

  saveButton.onclick = function () {
    const aesrSenderId = elById('aesrIdText').value;

    chrome.runtime.sendMessage(aesrSenderId, {
      action: 'updateConfig',
      dataType: 'ini',
      data: textArea.value,
    }, function (response) {
      if (response) {
        updateMessage(msgSpan, 'Succeeded to send data', '#1111dd');
      } else {
        updateMessage(msgSpan, 'Failed to send data', '#dd1111');
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
      updateMessage(msgSpan, 'Succeeded in fetching S3 file content', '#1111dd');
    } catch (error) {
      console.error('Error fetching S3 file content:', error);
      updateMessage(msgSpan, 'Failed to fetch S3 file content', '#dd1111');
    }
  };
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
