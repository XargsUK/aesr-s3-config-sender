export async function logDebugMessage(...messages: unknown[]): Promise<void> {
  const data = (await chrome.storage.sync.get('debugMode')) as { debugMode?: boolean };
  if (data.debugMode) {
    console.log(...messages);
  }
}

export async function logErrorMessage(...messages: unknown[]): Promise<void> {
  const data = (await chrome.storage.sync.get('debugMode')) as { debugMode?: boolean };
  if (data.debugMode) {
    console.error(...messages);
  }
}

export async function saveDebugModeSetting(): Promise<void> {
  const debugModeCheckbox = document.getElementById('debugModeCheckbox') as HTMLInputElement;
  if (!debugModeCheckbox) {
    throw new Error('Debug mode checkbox not found');
  }

  const debugMode = debugModeCheckbox.checked;
  await chrome.storage.sync.set({ debugMode });
  console.log('Debug mode is ' + (debugMode ? 'on' : 'off') + '.');
}

export async function restoreDebugModeSetting(): Promise<void> {
  const data = (await chrome.storage.sync.get('debugMode')) as { debugMode?: boolean };
  const debugModeCheckbox = document.getElementById('debugModeCheckbox') as HTMLInputElement;
  if (!debugModeCheckbox) {
    throw new Error('Debug mode checkbox not found');
  }
  debugModeCheckbox.checked = !!data.debugMode;
}
