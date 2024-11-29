import { logDebugMessage, logErrorMessage } from "./debug";

interface RequiredPermissions {
  permissions: string[];
  origins: string[];
}

declare const browser: any;
declare const chrome: any;

const requiredPermissions: RequiredPermissions = {
  permissions: ["webRequest", "webRequestBlocking", "storage"],
  origins: ["https://signin.aws.amazon.com/saml"],
};

export function checkPermissions(): void {
  const permissionsApi =
    typeof browser !== "undefined" ? browser.permissions : chrome.permissions;

  permissionsApi
    .contains(requiredPermissions)
    .then((hasPermissions: boolean) => {
      if (hasPermissions) {
        logDebugMessage("DEBUG: The extension has the required permissions.");
        addOnBeforeRequestEventListener();
      } else {
        logDebugMessage(
          "DEBUG: The extension does not have the required permissions."
        );
        requestPermissions(requiredPermissions);
      }
    })
    .catch((error: Error) => {
      console.error("Error checking permissions:", error);
    });
}

export function requestPermissions(permissions: RequiredPermissions): void {
  const permissionsApi =
    typeof browser !== "undefined" ? browser.permissions : chrome.permissions;

  permissionsApi
    .request(permissions)
    .then((granted: boolean) => {
      if (granted) {
        logDebugMessage("DEBUG: The required permissions have been granted.");
        addOnBeforeRequestEventListener();
      } else {
        logDebugMessage(
          "DEBUG: The required permissions have not been granted."
        );
      }
    })
    .catch((error: Error) => {
      console.error("Error requesting permissions:", error);
    });
}

// This function should be imported from background.ts
declare function addOnBeforeRequestEventListener(): void; 