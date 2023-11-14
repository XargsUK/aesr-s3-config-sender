// Functions to check/request permissions

function checkPermissions() {
  const requiredPermissions = {
    permissions: ["webRequest", "webRequestBlocking", "storage"],
    origins: ["https://signin.aws.amazon.com/saml"],
  };

  const permissionsApi =
    typeof browser !== "undefined" ? browser.permissions : chrome.permissions;

  permissionsApi
    .contains(requiredPermissions)
    .then((hasPermissions) => {
      if (hasPermissions) {
        if (DebugLogs)
          console.log("DEBUG: The extension has the required permissions.");
        addOnBeforeRequestEventListener();
      } else {
        if (DebugLogs)
          console.log(
            "DEBUG: The extension does not have the required permissions."
          );
        requestPermissions(requiredPermissions);
      }
    })
    .catch((error) => {
      console.error("Error checking permissions:", error);
    });
}

function requestPermissions(requiredPermissions) {
  const permissionsApi =
    typeof browser !== "undefined" ? browser.permissions : chrome.permissions;

  permissionsApi
    .request(requiredPermissions)
    .then((granted) => {
      if (granted) {
        if (DebugLogs)
          console.log("DEBUG: The required permissions have been granted.");
        addOnBeforeRequestEventListener();
      } else {
        if (DebugLogs)
          console.log("DEBUG: The required permissions have not been granted.");
      }
    })
    .catch((error) => {
      console.error("Error requesting permissions:", error);
    });
}

export { checkPermissions, requestPermissions };
