let debugMode = true;

function logDebugMessage(...messages) {
    if (debugMode) {
      console.log(...messages);
    }
  }

export { logDebugMessage };