import { XMLParser } from "fast-xml-parser";
import { STSClient, AssumeRoleWithSAMLCommand } from "@aws-sdk/client-sts";
import { logDebugMessage } from "./library/debug.js";

chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason === "install") {
    logDebugMessage(
      "Extension installed. Permissions for capturing SAML are granted."
    );
  }
});

addOnBeforeRequestEventListener();

function addOnBeforeRequestEventListener() {
  const webRequest =
    typeof browser !== "undefined" ? browser.webRequest : chrome.webRequest;
  logDebugMessage("DEBUG: Extension is activated");

  if (webRequest.onBeforeRequest.hasListener(onBeforeRequestEvent)) {
    logDebugMessage(
      "ERROR: onBeforeRequest EventListener could not be added, because onBeforeRequest already has an EventListener."
    );
  } else {
    webRequest.onBeforeRequest.addListener(
      onBeforeRequestEvent,
      { urls: ["https://signin.aws.amazon.com/saml"] },
      ["requestBody"]
    );
    logDebugMessage("DEBUG: onBeforeRequest Listener added");
  }
}

async function onBeforeRequestEvent(details) {
  logDebugMessage("DEBUG: onBeforeRequest event hit!");
  let samlXmlDoc = "";
  let formDataPayload = undefined;
  if (details.requestBody.formData) {
    samlXmlDoc = decodeURIComponent(
      unescape(atob(details.requestBody.formData.SAMLResponse[0]))
    );
  } else if (details.requestBody.raw) {
    let combined = new ArrayBuffer(0);
    details.requestBody.raw.forEach(function (element) {
      let tmp = new Uint8Array(combined.byteLength + element.bytes.byteLength);
      tmp.set(new Uint8Array(combined), 0);
      tmp.set(new Uint8Array(element.bytes), combined.byteLength);
      combined = tmp.buffer;
    });
    let combinedView = new DataView(combined);
    let decoder = new TextDecoder("utf-8");
    formDataPayload = new URLSearchParams(decoder.decode(combinedView));
    samlXmlDoc = decodeURIComponent(
      unescape(atob(formDataPayload.get("SAMLResponse")))
    );
  }
    logDebugMessage("onBeforeRequestEvent samlXmlDoc: roleClaimValue:");
    logDebugMessage(roleClaimValue);

  // Parse the SAML XML document
  let options = {
    ignoreAttributes: false,
    attributeNamePrefix: "__",
    removeNSPrefix: true,
    alwaysCreateTextNode: true,
  };
  let parser = new XMLParser(options);
  let jsObj = parser.parse(samlXmlDoc);

  // Extract the roles
  let attributes = jsObj["Response"].Assertion.AttributeStatement.Attribute;
  let roleClaimValue;
  for (let i in attributes) {
    if (
      attributes[i].__Name === "https://aws.amazon.com/SAML/Attributes/Role"
    ) {
      // Check if AttributeValue is an array and if so, take the first element
      let attributeValue = attributes[i].AttributeValue;
      if (Array.isArray(attributeValue)) {
        // If it's an array, assume each entry is a role and we take the first one
        roleClaimValue = attributeValue[0]["#text"];
      } else {
        // If it's not an array, just take the value as it is
        roleClaimValue = attributeValue["#text"] || attributeValue;
      }
      break; // stop after the first role
    }
  }

  // Use the STS assumeRoleWithSAML function to get the temporary credentials
  let keys;
  try {
    keys = await assumeRoleWithSAML(
      roleClaimValue,
      details.requestBody.formData.SAMLResponse[0]
    );
    logDebugMessage("DEBUG: AssumeRoleWithSAML response:");
    logDebugMessage(keys);
    const storage =
      typeof browser !== "undefined" ? browser.storage : chrome.storage;
    storage.local.set({ awsCredentials: keys }, function () {
      if (typeof chrome !== "undefined" && chrome.runtime.lastError) {
        logDebugMessage("Error saving credentials:", chrome.runtime.lastError);
      } else {
        logDebugMessage("Credentials are saved to storage");
      }
    });
  } catch (err) {
    logDebugMessage(
      "ERROR: Error when trying to assume the IAM Role with the SAML Assertion."
    );
    logDebugMessage(err);
  }
}

async function assumeRoleWithSAML(
  roleClaimValue,
  SAMLAssertion,
  SessionDuration
) {
  // First, ensure that roleClaimValue is a string
  if (typeof roleClaimValue !== "string") {
    logDebugMessage("roleClaimValue is not a string:", roleClaimValue);
    throw new TypeError("roleClaimValue must be a string");
  }

  // Pattern for Role
  let reRole = /arn:aws:iam:[^:]*:[0-9]+:role\/[^,]+/i;
  // Pattern for Principal (SAML Provider)
  let rePrincipal = /arn:aws:iam:[^:]*:[0-9]+:saml-provider\/[^,]+/i;
  // Extract both regex patterns from the roleClaimValue (which is a SAMLAssertion attribute)
  let RoleArn = roleClaimValue.match(reRole)[0];
  let PrincipalArn = roleClaimValue.match(rePrincipal)[0];

  // Set parameters needed for AWS STS assumeRoleWithSAML API method
  let params = {
    PrincipalArn: PrincipalArn,
    RoleArn: RoleArn,
    SAMLAssertion: SAMLAssertion,
    // Include DurationSeconds only if SessionDuration is provided
    ...(SessionDuration && { DurationSeconds: SessionDuration }),
  };

  // Create a new STS client
  const client = new STSClient({
    region: "us-east-1", // Specify the region
  });

  // Create a new command with the parameters
  const command = new AssumeRoleWithSAMLCommand(params);

  logDebugMessage(
    "INFO: AWSAssumeRoleWithSAMLCommand client.send will now be executed"
  );
  try {
    // Send the command to the STS client
    const response = await client.send(command);
    logDebugMessage("INFO: AWSAssumeRoleWithSAMLCommand client.send is done!");

    // Extract credentials from the response
    let keys = {
      accessKeyId: response.Credentials.AccessKeyId,
      secretAccessKey: response.Credentials.SecretAccessKey,
      sessionToken: response.Credentials.SessionToken,
      expiration: response.Credentials.Expiration, // Added to retrieve the expiration of the session token
    };

    logDebugMessage("DEBUG: AssumeRoleWithSAML response:");
    logDebugMessage(keys);
    return keys;
  } catch (error) {
    logDebugMessage("Error assuming role with SAML", error);
    throw error;
  }
}
