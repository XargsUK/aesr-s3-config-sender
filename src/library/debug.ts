interface GlobalSettings {
  aesrId: string;
  debugMode: boolean;
}

export async function logDebugMessage(...messages: unknown[]): Promise<void> {
  const data = (await chrome.storage.local.get('globalSettings')) as {
    globalSettings?: GlobalSettings;
  };
  if (data.globalSettings?.debugMode) {
    console.log(...messages);
  }
}

export async function logErrorMessage(...messages: unknown[]): Promise<void> {
  const data = (await chrome.storage.local.get('globalSettings')) as {
    globalSettings?: GlobalSettings;
  };
  if (data.globalSettings?.debugMode) {
    console.error(...messages);
  }
}

export async function saveDebugModeSetting(): Promise<void> {
  const debugModeCheckbox = document.getElementById('debugModeCheckbox') as HTMLInputElement;
  if (!debugModeCheckbox) {
    throw new Error('Debug mode checkbox not found');
  }

  const debugMode = debugModeCheckbox.checked;
  const data = (await chrome.storage.local.get('globalSettings')) as {
    globalSettings?: GlobalSettings;
  };
  const settings: GlobalSettings = { aesrId: '', ...data.globalSettings, debugMode };
  await chrome.storage.local.set({ globalSettings: settings });
  console.log('Debug mode is ' + (debugMode ? 'on' : 'off') + '.');
}

export async function restoreDebugModeSetting(): Promise<void> {
  const data = (await chrome.storage.local.get('globalSettings')) as {
    globalSettings?: GlobalSettings;
  };
  const debugModeCheckbox = document.getElementById('debugModeCheckbox') as HTMLInputElement;
  if (!debugModeCheckbox) {
    throw new Error('Debug mode checkbox not found');
  }
  debugModeCheckbox.checked = !!data.globalSettings?.debugMode;
}
