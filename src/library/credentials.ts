export interface AWSCredentials {
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken: string;
  expiration: string;
}

export function areCredentialsExpired(expiration: string | Date): boolean {
  const time = new Date(expiration).getTime();
  if (isNaN(time)) {
    return true;
  }
  return time <= Date.now();
}

export async function getValidCredentials(): Promise<AWSCredentials | null> {
  const data = await chrome.storage.local.get(['awsCredentials']);
  const credentials = data.awsCredentials as AWSCredentials | undefined;

  if (!credentials) {
    return null;
  }

  if (
    !credentials.accessKeyId ||
    !credentials.secretAccessKey ||
    !credentials.sessionToken ||
    !credentials.expiration
  ) {
    return null;
  }

  if (areCredentialsExpired(credentials.expiration)) {
    await chrome.storage.local.remove('awsCredentials');
    return null;
  }

  return credentials;
}

export async function clearExpiredCredentials(): Promise<void> {
  const data = await chrome.storage.local.get(['awsCredentials']);
  const credentials = data.awsCredentials as AWSCredentials | undefined;

  if (credentials?.expiration && areCredentialsExpired(credentials.expiration)) {
    await chrome.storage.local.remove('awsCredentials');
  }
}
