import './styles/modern.css';
import { createIcons, Settings, RefreshCw, FileText, Heart, Github } from 'lucide';

import { getValidCredentials } from './library/credentials';
import { logDebugMessage, logErrorMessage } from './library/debug';
import { sendConfigToAesr } from './library/messaging';
import { loadProfilesIntoDropdown, loadProfile } from './library/profile';
import { getS3FileContent } from './library/s3';
import {
  GlobalSettings,
  getCurrentProfileData,
  setCurrentProfileData,
  setGlobalSettings,
} from './library/state';
import { getLastSentTimestamp } from './library/timestamp';
import { showToastMessage } from './library/toast';

// Initialize Lucide icons
createIcons({
  icons: { Settings, RefreshCw, FileText, Heart, Github },
});

logDebugMessage('Popup script starting...');

document.addEventListener('DOMContentLoaded', () => {
  setupOptionsLink();
  setupEventListeners();
  initialize();
});

function setupOptionsLink(): void {
  const optionsLink = document.getElementById('openOptionsLink');
  if (optionsLink) {
    optionsLink.onclick = function (e: MouseEvent): boolean {
      e.preventDefault();
      chrome.runtime.openOptionsPage();
      return false;
    };
  }
}

function createFloatingHeart(x: number, y: number): void {
  const heart = document.createElement('div');
  heart.className = 'floating-heart';
  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;

  // Create Lucide heart icon instead of emoji
  const icon = document.createElement('i');
  icon.setAttribute('data-lucide', 'heart');
  icon.style.color = '#ff4444'; // Red color for the heart
  heart.appendChild(icon);

  document.body.appendChild(heart);
  createIcons({ icons: { Heart } });

  heart.addEventListener('animationend', () => heart.remove());
}

function setupEventListeners(): void {
  // Credits link handler
  document.getElementById('openCreditsLink')?.addEventListener('click', (e) => {
    e.preventDefault();
    const creditsUrl = chrome.runtime.getURL('credits.html');
    chrome.tabs.create({ url: creditsUrl });
    return false;
  });

  // Profile change handler
  const profileListElement = document.getElementById('profileList') as HTMLSelectElement;
  if (profileListElement) {
    profileListElement.addEventListener('change', async function () {
      const profileData = await loadProfile(this.value);
      setCurrentProfileData(profileData);
      logDebugMessage(
        'Profile changed to: ',
        this.value,
        ' Current profile data is: ',
        getCurrentProfileData(),
      );
    });
  }

  // Sync button handler
  let syncInProgress = false;
  document.getElementById('syncButton')?.addEventListener('click', async function (e) {
    if (syncInProgress) {
      showToastMessage('warning', 'Sync already in progress');
      return;
    }

    syncInProgress = true;
    try {
      const profileData = getCurrentProfileData();

      // Load settings from storage first
      const data = await chrome.storage.local.get(['globalSettings']);
      const settings = (data.globalSettings as GlobalSettings) ?? null;
      setGlobalSettings(settings);

      if (!profileData) {
        showToastMessage('warning', 'Please select a profile first');
        return;
      }

      if (!settings?.aesrId) {
        showToastMessage('warning', 'Please set your AESR Extension ID in Settings');
        return;
      }

      // For Firefox, check permissions first
      if (isFirefox()) {
        const hasPermission = await checkHostPermission();
        if (!hasPermission) {
          showRequestPermissionButton();
          return;
        }
      }

      // Easter egg
      if (profileData.key.toLowerCase().includes('ans')) {
        for (let i = 0; i < 5; i++) {
          setTimeout(() => {
            const rect = (e.target as HTMLElement).getBoundingClientRect();
            const x = rect.left + Math.random() * rect.width;
            const y = rect.top + Math.random() * rect.height;
            createFloatingHeart(x, y);
          }, i * 200);
        }
      }

      // Set button to loading state
      const syncButton = document.getElementById('syncButton') as HTMLButtonElement;
      const originalContent = syncButton.innerHTML;
      syncButton.disabled = true;
      syncButton.innerHTML = '<i data-lucide="refresh-cw"></i> Syncing...';
      createIcons({ icons: { RefreshCw } });

      try {
        const awsCredentials = await getValidCredentials();

        if (!awsCredentials) {
          showToastMessage('warning', 'Session expired — please sign in to AWS again.');
          return;
        }

        const configContent = await getS3FileContent(
          awsCredentials.accessKeyId,
          awsCredentials.secretAccessKey,
          awsCredentials.sessionToken,
          profileData.region,
          profileData.bucket,
          profileData.key,
        );

        if (!configContent || configContent.trim() === '') {
          showToastMessage('warning', 'Retrieved configuration is empty');
          return;
        }

        await sendConfigToAesr(settings.aesrId, configContent);
        await getLastSentTimestamp();

        showToastMessage('success', 'Configuration synced successfully');
      } catch (error) {
        logErrorMessage('Sync failed:', error);
        showToastMessage('danger', 'Failed to sync configuration: ' + (error as Error).message);
      } finally {
        // Reset button state
        syncButton.disabled = false;
        syncButton.innerHTML = originalContent;
        createIcons({ icons: { RefreshCw } });
      }
    } finally {
      syncInProgress = false;
    }
  });
}

function initialize(): void {
  getLastSentTimestamp().catch(logErrorMessage);
  loadProfilesIntoDropdown(null, 'profileList');
}

function isFirefox(): boolean {
  return typeof InstallTrigger !== 'undefined';
}

function checkHostPermission(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const permissionsToCheck = {
      origins: ['https://signin.aws.amazon.com/saml'],
    };
    browser.permissions
      .contains(permissionsToCheck)
      .then((hasPermission: boolean) => {
        resolve(hasPermission);
      })
      .catch((error: Error) => {
        logErrorMessage('Error checking permissions:', error);
        reject(error);
      });
  });
}

function showRequestPermissionButton(): void {
  const requestButton = document.createElement('button');
  requestButton.textContent = 'Give Permissions to Sync';
  requestButton.addEventListener('click', function () {
    requestPermissions();
    window.close();
  });
  document.body.appendChild(requestButton);
}

function requestPermissions(): void {
  const permissionsToRequest = {
    origins: ['https://signin.aws.amazon.com/saml'],
  };
  browser.permissions
    .request(permissionsToRequest)
    .then((granted: boolean) => {
      if (granted) {
        logDebugMessage('Permission was granted');
      } else {
        logDebugMessage('Permission was refused');
      }
    })
    .catch((error: Error) => {
      logErrorMessage('Error requesting permissions:', error);
    });
}
