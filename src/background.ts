import { STSClient, AssumeRoleWithSAMLCommand } from '@aws-sdk/client-sts';
import { XMLParser } from 'fast-xml-parser';
import { logDebugMessage } from './library/debug';

interface AWSCredentials {
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken: string;
  expiration: Date;
}

interface SAMLAttribute {
  __Name: string;
  AttributeValue:
    | {
        '#text': string;
      }
    | Array<{ '#text': string }>;
}

chrome.runtime.onInstalled.addListener(function (details: chrome.runtime.InstalledDetails): void {
  if (details.reason === 'install') {
    logDebugMessage('[SAML] Extension installed');
  }
});

addWebRequestListeners();

function addWebRequestListeners(): void {
  const webRequest = chrome.webRequest;
  logDebugMessage('[SAML] Extension is activated');

  // SAML endpoint listener
  if (!webRequest.onBeforeRequest.hasListener(onBeforeRequestEvent)) {
    webRequest.onBeforeRequest.addListener(
      onBeforeRequestEvent,
      { urls: ['https://signin.aws.amazon.com/saml'] },
      ['requestBody'],
    );
    logDebugMessage('[SAML] Listener added');
  }
}

function onBeforeRequestEvent(
  details: chrome.webRequest.WebRequestBodyDetails,
): void | chrome.webRequest.BlockingResponse {
  logDebugMessage('[SAML] Request intercepted');
  let samlXmlDoc = '';
  let formDataPayload: URLSearchParams | undefined;

  try {
    if (details.requestBody?.formData) {
      samlXmlDoc = decodeURIComponent(unescape(atob(details.requestBody.formData.SAMLResponse[0])));
    } else if (details.requestBody?.raw) {
      let combined = new ArrayBuffer(0);
      details.requestBody.raw.forEach((element) => {
        if (!element.bytes) return;
        const tmp = new Uint8Array(combined.byteLength + element.bytes.byteLength);
        tmp.set(new Uint8Array(combined), 0);
        tmp.set(new Uint8Array(element.bytes), combined.byteLength);
        combined = tmp.buffer;
      });
      const combinedView = new DataView(combined);
      const decoder = new TextDecoder('utf-8');
      formDataPayload = new URLSearchParams(decoder.decode(combinedView));
      const samlResponse = formDataPayload.get('SAMLResponse');
      if (samlResponse) {
        samlXmlDoc = decodeURIComponent(unescape(atob(samlResponse)));
      }
    }

    if (!samlXmlDoc) {
      logDebugMessage('[SAML] No SAML document found in request');
      return;
    }

    // Parse the SAML XML document
    const options = {
      ignoreAttributes: false,
      attributeNamePrefix: '__',
      removeNSPrefix: true,
      alwaysCreateTextNode: true,
    };

    logDebugMessage('[SAML] Parsing XML document');
    const parser = new XMLParser(options);
    const jsObj = parser.parse(samlXmlDoc);
    logDebugMessage('[SAML] Successfully parsed XML');

    // Extract the roles
    const attributes = jsObj['Response'].Assertion.AttributeStatement.Attribute as SAMLAttribute[];
    let roleClaimValue: string | undefined;

    logDebugMessage('[SAML] Searching for role claim in attributes');
    for (const attr of attributes) {
      if (attr.__Name === 'https://aws.amazon.com/SAML/Attributes/Role') {
        const attributeValue = attr.AttributeValue;
        if (Array.isArray(attributeValue)) {
          roleClaimValue = attributeValue[0]['#text'];
          logDebugMessage('[SAML] Found role claim (array format)');
        } else {
          roleClaimValue = attributeValue['#text'];
          logDebugMessage('[SAML] Found role claim (single value)');
        }
        break;
      }
    }

    if (!roleClaimValue) {
      logDebugMessage('[SAML] No role claim found in attributes');
      return;
    }

    // Extract principal ARN and role ARN
    const reRole = /arn:aws:iam:[^:]*:[0-9]+:role\/[^,]+/i;
    const rePrincipal = /arn:aws:iam:[^:]*:[0-9]+:saml-provider\/[^,]+/i;
    const roleMatch = roleClaimValue.match(reRole);
    const principalMatch = roleClaimValue.match(rePrincipal);

    if (!roleMatch || !principalMatch) {
      logDebugMessage('[SAML] Invalid role claim format');
      return;
    }

    const RoleArn = roleMatch[0];
    const PrincipalArn = principalMatch[0];

    // Create STS client
    const client = new STSClient({ region: 'us-east-1' });
    const command = new AssumeRoleWithSAMLCommand({
      PrincipalArn,
      RoleArn,
      SAMLAssertion: details.requestBody?.formData?.SAMLResponse[0],
    });

    // Assume role with SAML
    client
      .send(command)
      .then((response) => {
        if (
          response.Credentials?.AccessKeyId &&
          response.Credentials?.SecretAccessKey &&
          response.Credentials?.SessionToken &&
          response.Credentials?.Expiration
        ) {
          const awsCredentials: AWSCredentials = {
            accessKeyId: response.Credentials.AccessKeyId,
            secretAccessKey: response.Credentials.SecretAccessKey,
            sessionToken: response.Credentials.SessionToken,
            expiration: response.Credentials.Expiration,
          };

          chrome.storage.local.set({ awsCredentials }).catch(() => {
            logDebugMessage('[SAML] Error saving credentials to storage');
          });
          logDebugMessage('[SAML] Credentials saved to storage');
        }
      })
      .catch(() => {
        logDebugMessage('[SAML] Error assuming role');
      });
  } catch (error) {
    logDebugMessage('[SAML] Error processing request');
  }
}
