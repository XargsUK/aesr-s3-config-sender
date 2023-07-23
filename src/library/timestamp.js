function setLastSentTimestamp(timestamp) {
    if (timestamp) {
      chrome.storage.local.set({
        lastSentTimestamp: timestamp
      }, () => {
        console.log('Last sent timestamp saved:', timestamp);
      });
    }
  }

function getLastSentTimestamp() {
    chrome.storage.local.get(['lastSentTimestamp'], (result) => {
      const lastSentElement = document.getElementById('lastSent');
      if (result.lastSentTimestamp) {
        lastSentElement.textContent = 'Last sent: ' + new Date(Number(result.lastSentTimestamp)).toLocaleString();
      } else {
        lastSentElement.textContent = 'Last sent: Never';
      }
    });
}

export { setLastSentTimestamp, getLastSentTimestamp };