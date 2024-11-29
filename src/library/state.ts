export interface ProfileData {
  bucket: string;
  key: string;
  region: string;
  aesrId: string;
}

let currentProfileData: ProfileData | null = null;

export function getCurrentProfileData(): ProfileData | null {
  return currentProfileData;
}

export function setCurrentProfileData(data: ProfileData | null): void {
  currentProfileData = data;
} 