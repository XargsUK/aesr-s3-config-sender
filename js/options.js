const elById = (id) => document.getElementById(id);

window.onload = function() {
  const textArea = elById('awsConfigTextArea');
  const msgSpan = elById('msgSpan');
  const saveButton = elById('saveButton');

  saveButton.onclick = function() {
    const aesrSenderId = elById('aesrIdText').value;

    chrome.runtime.sendMessage(aesrSenderId, {
      action: 'updateConfig',
      dataType: 'ini',
      data: textArea.value,
    }, function(response) {
      if (response) {
        updateMessage(msgSpan, 'Succeeded to send data', '#1111dd');
      } else {
        updateMessage(msgSpan, 'Failed to send data', '#dd1111');
      }
    });
  }
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
