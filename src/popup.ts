import './styles/modern.css';
import { createIcons, icons } from 'lucide';

import { logDebugMessage, logErrorMessage } from './library/debug';
import { loadProfilesIntoDropdown, loadProfile } from './library/profile';
import { getS3FileContent } from './library/s3';
import { getCurrentProfileData, setCurrentProfileData } from './library/state';
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
  document.getElementById('syncButton')?.addEventListener('click', async function () {
    if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
      const hasPermission = await checkHostPermission();
      hasPermission ? handleSyncButtonClick() : showRequestPermissionButton();
    } else {
      handleSyncButtonClick();
    }
  });
}

function initialize(): void {
  getLastSentTimestamp();
  loadProfilesIntoDropdown(null, 'profileList');
}

async function handleSyncButtonClick(): Promise<void> {
  const profileData = getCurrentProfileData();
  if (profileData) {
    try {
      const data = await (isFirefox()
        ? (browser.storage.local.get(['awsCredentials']) as Promise<{
            awsCredentials: {
              accessKeyId: string;
              secretAccessKey: string;
              sessionToken: string;
            };
          }>)
        : chrome.storage.local.get(['awsCredentials']));
      const awsCredentials = data.awsCredentials;
      if (awsCredentials) {
        const bucket = profileData.bucket;
        const key = profileData.key;
        const region = profileData.region;
        const configContent = await getS3FileContent(
          awsCredentials.accessKeyId,
          awsCredentials.secretAccessKey,
          awsCredentials.sessionToken,
          region,
          bucket,
          key,
        );

        logDebugMessage('S3 file content: ', configContent);

        const aesrSenderId = profileData.aesrId;
        const messageData = {
          action: 'updateConfig',
          dataType: 'ini',
          data: configContent,
        };

        if (isFirefox()) {
          try {
            await browser.runtime.sendMessage(aesrSenderId, messageData);
            setLastSentTimestamp(Date.now());
            getLastSentTimestamp();
            showToastMessage('success', 'Sync successful!');
          } catch (error) {
            logErrorMessage('Failed to send data: ' + (error as Error).message);
            showToastMessage('danger', 'Failed to send data');
          }
        } else {
          chrome.runtime.sendMessage(aesrSenderId, messageData, function (_response) {
            if (chrome.runtime.lastError) {
              logErrorMessage('Failed to send data: ' + chrome.runtime.lastError.message);
              showToastMessage('danger', 'Failed to send data');
              return;
            }
            setLastSentTimestamp(Date.now());
            getLastSentTimestamp();
            showToastMessage('success', 'Sync successful!');
          });
        }
      } else {
        logDebugMessage('No AWS credentials found');
        showToastMessage('warning', 'No AWS credentials found');
      }
    } catch (error) {
      logErrorMessage('An error occurred', error);
      showToastMessage('danger', 'An error occurred: ' + (error as Error).message);
    }
  } else {
    logDebugMessage('No profile selected');
    showToastMessage('warning', 'No profile selected');
  }
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
