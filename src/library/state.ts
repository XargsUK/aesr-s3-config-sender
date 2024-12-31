export interface ProfileData {
  bucket: string;
  key: string;
  region: string;
}

let currentProfileData: ProfileData | null = null;

export function getCurrentProfileData(): ProfileData | null {
  return currentProfileData;
}

export function setCurrentProfileData(data: ProfileData | null): void {
  currentProfileData = data;
}

// Global settings interface
export interface GlobalSettings {
  aesrId: string;
  debugMode: boolean;
}

let globalSettings: GlobalSettings | null = null;

export function getGlobalSettings(): GlobalSettings | null {
  return globalSettings;
}

export function setGlobalSettings(settings: GlobalSettings | null): void {
  globalSettings = settings;
}
