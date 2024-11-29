import { XMLParser } from 'fast-xml-parser';
import { STSClient, AssumeRoleWithSAMLCommand, Credentials } from "@aws-sdk/client-sts";

interface AWSCredentials {
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken: string;
  expiration: Date;
}

interface SAMLAttribute {
  __Name: string;
  AttributeValue: {
    '#text': string;
  } | Array<{ '#text': string }>;
}

let DebugLogs = true;

chrome.runtime.onInstalled.addListener(function(details: chrome.runtime.InstalledDetails) {
  if (details.reason === "install") {
    console.log("Extension installed. Permissions for capturing SAML are granted.");
  }
});

addOnBeforeRequestEventListener();

function addOnBeforeRequestEventListener(): void {
  const webRequest = (typeof browser !== 'undefined') ? browser.webRequest : chrome.webRequest;
  if (DebugLogs) console.log('DEBUG: Extension is activated');
  if (webRequest.onBeforeRequest.hasListener(onBeforeRequestEvent)) {
    console.log("ERROR: onBeforeRequest EventListener could not be added, because onBeforeRequest already has an EventListener.");
  } else {
    webRequest.onBeforeRequest.addListener(
      onBeforeRequestEvent,
      { urls: ["https://signin.aws.amazon.com/saml"] },
      ["requestBody"]
    );
    if (DebugLogs) console.log('DEBUG: onBeforeRequest Listener added');
  }
}

async function onBeforeRequestEvent(details: chrome.webRequest.WebRequestBodyDetails): Promise<void> {
  if (DebugLogs) console.log('DEBUG: onBeforeRequest event hit!');
  let samlXmlDoc = "";
  let formDataPayload: URLSearchParams | undefined;
  
  if (details.requestBody?.formData) {
    samlXmlDoc = decodeURIComponent(unescape(atob(details.requestBody.formData.SAMLResponse[0])));
  } else if (details.requestBody?.raw) {
    let combined = new ArrayBuffer(0);
    details.requestBody.raw.forEach(function(element: { bytes: ArrayBuffer }) {
      let tmp = new Uint8Array(combined.byteLength + element.bytes.byteLength);
      tmp.set(new Uint8Array(combined), 0);
      tmp.set(new Uint8Array(element.bytes), combined.byteLength);
      combined = tmp.buffer;
    });
    let combinedView = new DataView(combined);
    let decoder = new TextDecoder('utf-8');
    formDataPayload = new URLSearchParams(decoder.decode(combinedView));
    const samlResponse = formDataPayload.get('SAMLResponse');
    if (samlResponse) {
      samlXmlDoc = decodeURIComponent(unescape(atob(samlResponse)));
    }
  }

  if (DebugLogs) {
    console.log('DEBUG: samlXmlDoc:');
    console.log(samlXmlDoc);
  }

  // Parse the SAML XML document
  const options = {
    ignoreAttributes: false,
    attributeNamePrefix: "__",
    removeNSPrefix: true,
    alwaysCreateTextNode: true
  };
  const parser = new XMLParser(options);
  const jsObj = parser.parse(samlXmlDoc);

  // Extract the roles
  const attributes = jsObj["Response"].Assertion.AttributeStatement.Attribute as SAMLAttribute[];
  let roleClaimValue: string | undefined;
  
  for (const attr of attributes) {
    if (attr.__Name === "https://aws.amazon.com/SAML/Attributes/Role") {
      const attributeValue = attr.AttributeValue;
      if (Array.isArray(attributeValue)) {
        roleClaimValue = attributeValue[0]['#text'];
      } else {
        roleClaimValue = attributeValue['#text'];
      }
      if (DebugLogs) {
        console.log('DEBUG: roleClaimValue:');
        console.log(roleClaimValue);
      }
      break;
    }
  }

  if (!roleClaimValue) {
    throw new Error("No role claim value found in SAML response");
  }

  // Use the STS assumeRoleWithSAML function to get the temporary credentials
  try {
    const samlResponse = details.requestBody?.formData?.SAMLResponse?.[0];
    if (!samlResponse) {
      throw new Error("No SAML response found in request body");
    }
    
    const keys = await assumeRoleWithSAML(roleClaimValue, samlResponse);
    console.log('DEBUG: AssumeRoleWithSAML response:');
    console.log(keys);
    
    const storage = (typeof browser !== 'undefined') ? browser.storage : chrome.storage;
    try {
      await storage.local.set({ awsCredentials: keys });
      console.log('Credentials are saved to storage');
    } catch (error) {
      console.error('Error saving credentials:', error);
    }
  } catch(err) {
    console.error("ERROR: Error when trying to assume the IAM Role with the SAML Assertion.");
    console.error(err);
  }
}

async function assumeRoleWithSAML(
  roleClaimValue: string,
  SAMLAssertion: string,
  SessionDuration?: number
): Promise<AWSCredentials> {
  if (typeof roleClaimValue !== 'string') {
    console.error('roleClaimValue is not a string:', roleClaimValue);
    throw new TypeError('roleClaimValue must be a string');
  }

  const reRole = /arn:aws:iam:[^:]*:[0-9]+:role\/[^,]+/i;
  const rePrincipal = /arn:aws:iam:[^:]*:[0-9]+:saml-provider\/[^,]+/i;
  
  const roleMatch = roleClaimValue.match(reRole);
  const principalMatch = roleClaimValue.match(rePrincipal);
  
  if (!roleMatch || !principalMatch) {
    throw new Error("Invalid role claim value format");
  }

  const RoleArn = roleMatch[0];
  const PrincipalArn = principalMatch[0];

  const params = {
    PrincipalArn,
    RoleArn,
    SAMLAssertion,
    ...(SessionDuration && { DurationSeconds: SessionDuration }),
  };

  const client = new STSClient({
    region: 'us-east-1',
  });

  const command = new AssumeRoleWithSAMLCommand(params);

  console.log("INFO: AWSAssumeRoleWithSAMLCommand client.send will now be executed");
  try {
    const response = await client.send(command);
    console.log("INFO: AWSAssumeRoleWithSAMLCommand client.send is done!");

    if (!response.Credentials) {
      throw new Error("No credentials returned from AWS");
    }

    const keys: AWSCredentials = {
      accessKeyId: response.Credentials.AccessKeyId!,
      secretAccessKey: response.Credentials.SecretAccessKey!,
      sessionToken: response.Credentials.SessionToken!,
      expiration: response.Credentials.Expiration!
    };

    if (DebugLogs) {
      console.log('DEBUG: AssumeRoleWithSAML response:');
      console.log(keys);
    }
    return keys;
  } catch (error) {
    console.error("Error assuming role with SAML", error);
    throw error;
  }
} 