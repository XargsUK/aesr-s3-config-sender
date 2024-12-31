import { logDebugMessage } from './debug';
import { showToastMessage } from './toast';

export function setButtonLoading(button: HTMLButtonElement, loading: boolean): void {
  if (loading) {
    button.classList.add('loading');
    button.disabled = true;
  } else {
    button.classList.remove('loading');
    button.disabled = false;
  }
}

export function showConfigSuccess(): void {
  const configStatus = document.querySelector('.config-status');
  configStatus?.classList.add('show');
  setTimeout(() => {
    configStatus?.classList.remove('show');
  }, 3000);
}

export function showProfileSetup(show: boolean): void {
  const profileSetup = document.getElementById('profileSetup');
  const configSection = document.getElementById('configSection');
  if (show) {
    profileSetup?.classList.add('show');
    configSection?.classList.remove('show');
  } else {
    profileSetup?.classList.remove('show');
    configSection?.classList.add('show');
  }
}

export function clearProfileForm(): void {
  (document.getElementById('profileName') as HTMLInputElement).value = '';
  (document.getElementById('awsRegion') as HTMLInputElement).value = '';
  (document.getElementById('bucketName') as HTMLInputElement).value = '';
  (document.getElementById('fileKey') as HTMLInputElement).value = '';
}

export function showEmptyState(show: boolean): void {
  const emptyState = document.getElementById('emptyState');
  const mainContent = document.getElementById('mainContent');

  if (show) {
    emptyState?.classList.add('show');
    mainContent?.classList.remove('show');
  } else {
    emptyState?.classList.remove('show');
    mainContent?.classList.add('show');
  }
}

export function toggleSettings(): void {
  const settingsModal = document.getElementById('settingsModal');
  settingsModal?.classList.toggle('show');
}

export function getThisExtensionId(): string {
  return chrome.runtime.id;
}

export async function copyToClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
    showToastMessage('success', 'Copied to clipboard');
  } catch (error) {
    showToastMessage('danger', 'Failed to copy to clipboard');
    logDebugMessage('Failed to copy to clipboard:', error);
  }
}
