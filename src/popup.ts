import './styles/modern.css';
import { createIcons, icons } from 'lucide';

import { logDebugMessage, logErrorMessage } from './library/debug';
import { loadProfilesIntoDropdown, loadProfile } from './library/profile';
import { getS3FileContent } from './library/s3';
import { getCurrentProfileData, setCurrentProfileData, setGlobalSettings } from './library/state';
import { getLastSentTimestamp, setLastSentTimestamp } from './library/timestamp';
import { showToastMessage } from './library/toast';

// Initialize Lucide icons
createIcons({
  icons: {
    Settings: icons.Settings,
    RefreshCw: icons.RefreshCw,
    FileText: icons.FileText,
    Heart: icons.Heart,
    Github: icons.Github,
  },
});

// Basic console log to verify script loading
console.log('Popup script starting...');

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
  // Initialize the icon
  createIcons({
    icons: {
      Heart: icons.Heart,
    },
  });

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
      const settings = data.globalSettings;
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
      createIcons({ icons });

      try {
        // Step 1: Pull from S3
        const data = await chrome.storage.local.get(['awsCredentials']);
        const awsCredentials = data.awsCredentials;

        if (!awsCredentials) {
          showToastMessage('warning', 'No AWS credentials found. Please sign in to AWS first.');
          return;
        }

        if (
          !awsCredentials.accessKeyId ||
          !awsCredentials.secretAccessKey ||
          !awsCredentials.sessionToken
        ) {
          showToastMessage(
            'warning',
            'AWS credentials are incomplete. Please sign in to AWS again.',
          );
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

        const messageData = {
          action: 'updateConfig',
          dataType: 'ini',
          data: configContent,
        };

        await new Promise<void>((resolve, reject) => {
          // Add timeout
          const timeout = setTimeout(() => {
            reject(new Error('Timeout waiting for AESR response'));
          }, 10000); // 10 second timeout

          chrome.runtime.sendMessage(settings.aesrId, messageData, function () {
            clearTimeout(timeout);
            if (chrome.runtime.lastError) {
              reject(new Error(chrome.runtime.lastError.message));
              return;
            }
            setLastSentTimestamp(Date.now());
            getLastSentTimestamp();
            resolve();
          });
        });

        showToastMessage('success', 'Configuration synced successfully');
      } catch (error) {
        logErrorMessage('Sync failed:', error);
        showToastMessage('danger', 'Failed to sync configuration: ' + (error as Error).message);
      } finally {
        // Reset button state
        syncButton.disabled = false;
        syncButton.innerHTML = originalContent;
        createIcons({ icons });
      }
    } finally {
      syncInProgress = false;
    }
  });
}

function initialize(): void {
  getLastSentTimestamp();
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
