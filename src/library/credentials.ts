export interface AWSCredentials {
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken: string;
  expiration: string;
}

const EXPIRED_TOKEN_ERROR_NAMES = ['ExpiredToken', 'ExpiredTokenException'];

export const EXPIRED_SESSION_MESSAGE =
  'Your AWS session has expired. Sign in to AWS again to capture fresh credentials, then retry.';

export function areCredentialsExpired(expiration: string | Date): boolean {
  const time = new Date(expiration).getTime();
  if (isNaN(time)) {
    return true;
  }
  return time <= Date.now();
}

export function isExpiredTokenError(error: unknown): boolean {
  if (!(error instanceof Error)) {
    return false;
  }
  return (
    EXPIRED_TOKEN_ERROR_NAMES.includes(error.name) || /token (has )?expired/i.test(error.message)
  );
}

export async function getValidCredentials(): Promise<AWSCredentials | null> {
  const data = await chrome.storage.local.get(['awsCredentials']);
  const credentials = data.awsCredentials as AWSCredentials | undefined;

  if (!credentials) {
    return null;
  }

  if (!credentials.accessKeyId || !credentials.secretAccessKey || !credentials.sessionToken) {
    return null;
  }

  return credentials;
}

export async function clearCredentials(): Promise<void> {
  await chrome.storage.local.remove('awsCredentials');
}

export async function clearExpiredCredentials(): Promise<void> {
  const data = await chrome.storage.local.get(['awsCredentials']);
  const credentials = data.awsCredentials as AWSCredentials | undefined;

  if (credentials?.expiration && areCredentialsExpired(credentials.expiration)) {
    await clearCredentials();
  }
}
