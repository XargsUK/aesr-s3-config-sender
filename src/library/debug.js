function logDebugMessage(...messages) {
  chrome.storage.sync.get('debugMode', function(data) {
    if (data.debugMode) {
      console.log(...messages);
    }
  });
}

function logErrorMessage(...messages) {
  chrome.storage.sync.get('debugMode', function(data) {
    if (data.debugMode) {
      console.error(...messages);
    }
  });
}

function saveDebugModeSetting() {
  const debugMode = document.getElementById("debugModeSwitch").selected ;
  chrome.storage.sync.set({ debugMode }, function() {
    console.log('Debug mode is ' + (debugMode ? 'on' : 'off') + '.');
  });
}

function restoreDebugModeSetting() {
  chrome.storage.sync.get('debugMode', function(data) {
    document.getElementById("debugModeSwitch").selected  = !!data.debugMode;
  });
}


export { logDebugMessage, saveDebugModeSetting, restoreDebugModeSetting, logErrorMessage };
