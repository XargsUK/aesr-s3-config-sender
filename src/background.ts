import { STSClient, AssumeRoleWithSAMLCommand } from '@aws-sdk/client-sts';
import { XMLParser } from 'fast-xml-parser';

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

const DebugLogs = true;

type LogValue = string | number | boolean | null | undefined | object;

function formatError(error: unknown): object {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
    };
  }
  return { error: String(error) };
}

function debugLog(message: string, ...args: LogValue[]): void {
  if (DebugLogs) {
    console.log(`[SAML Debug] ${message}`, ...args);
  }
}

chrome.runtime.onInstalled.addListener(function (details: chrome.runtime.InstalledDetails) {
  if (details.reason === 'install') {
    debugLog('Extension installed. Permissions for capturing SAML are granted.');
  }
});

addWebRequestListeners();

function addWebRequestListeners(): void {
  const webRequest = typeof browser !== 'undefined' ? browser.webRequest : chrome.webRequest;
  debugLog('Extension is activated');

  // SAML endpoint listener
  if (!webRequest.onBeforeRequest.hasListener(onBeforeRequestEvent)) {
    webRequest.onBeforeRequest.addListener(
      onBeforeRequestEvent,
      { urls: ['https://signin.aws.amazon.com/saml'] },
      ['requestBody'],
    );
    debugLog('SAML listener added successfully');
  }

  // Identity Center endpoint listener
  if (!webRequest.onBeforeRequest.hasListener(onIdentityCenterRequest)) {
    webRequest.onBeforeRequest.addListener(
      onIdentityCenterRequest,
      {
        urls: [
          'https://*.awsapps.com/start/credentials',
          'https://signin.aws.amazon.com/federation',
        ],
      },
      ['requestBody'],
    );
    debugLog('Identity Center listener added successfully');
  }
}

async function onIdentityCenterRequest(
  details: chrome.webRequest.WebRequestBodyDetails,
): Promise<void> {
  debugLog('Identity Center request intercepted', { url: details.url });

  try {
    // Check if this is a credentials response
    if (details.url.includes('/credentials')) {
      const decoder = new TextDecoder('utf-8');
      let credentialsData = '';

      if (details.requestBody?.raw) {
        const buffer = details.requestBody.raw.reduce((acc, chunk) => {
          if (chunk.bytes) {
            const tmp = new Uint8Array(acc.byteLength + chunk.bytes.byteLength);
            tmp.set(new Uint8Array(acc), 0);
            tmp.set(new Uint8Array(chunk.bytes), acc.byteLength);
            return tmp.buffer;
          }
          return acc;
        }, new ArrayBuffer(0));

        credentialsData = decoder.decode(buffer);
      }

      if (credentialsData) {
        try {
          const credentials = JSON.parse(credentialsData);
          debugLog('Parsed Identity Center credentials', {
            accessKeyId: credentials.accessKeyId,
            expiration: credentials.expiration,
          });

          const awsCredentials: AWSCredentials = {
            accessKeyId: credentials.accessKeyId,
            secretAccessKey: credentials.secretAccessKey,
            sessionToken: credentials.sessionToken,
            expiration: new Date(credentials.expiration),
          };

          const storage = typeof browser !== 'undefined' ? browser.storage : chrome.storage;
          await storage.local.set({ awsCredentials });
          debugLog('Successfully saved Identity Center credentials to storage');
        } catch (error) {
          debugLog('Error parsing Identity Center credentials', formatError(error));
        }
      }
    }
  } catch (error) {
    debugLog('Error processing Identity Center request', formatError(error));
  }
}

async function onBeforeRequestEvent(
  details: chrome.webRequest.WebRequestBodyDetails,
): Promise<void> {
  debugLog('SAML request intercepted', { url: details.url });
  let samlXmlDoc = '';
  let formDataPayload: URLSearchParams | undefined;

  try {
    if (details.requestBody?.formData) {
      debugLog('Found SAML response in formData');
      samlXmlDoc = decodeURIComponent(unescape(atob(details.requestBody.formData.SAMLResponse[0])));
    } else if (details.requestBody?.raw) {
      debugLog('Found SAML response in raw data');
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
      debugLog('No SAML document found in request');
      return;
    }

    debugLog('Successfully decoded SAML document');

    // Parse the SAML XML document
    const options = {
      ignoreAttributes: false,
      attributeNamePrefix: '__',
      removeNSPrefix: true,
      alwaysCreateTextNode: true,
    };

    debugLog('Parsing SAML XML document');
    const parser = new XMLParser(options);
    const jsObj = parser.parse(samlXmlDoc);
    debugLog('Successfully parsed SAML XML');

    // Extract the roles
    const attributes = jsObj['Response'].Assertion.AttributeStatement.Attribute as SAMLAttribute[];
    let roleClaimValue: string | undefined;

    debugLog('Searching for role claim in SAML attributes');
    for (const attr of attributes) {
      if (attr.__Name === 'https://aws.amazon.com/SAML/Attributes/Role') {
        const attributeValue = attr.AttributeValue;
        if (Array.isArray(attributeValue)) {
          roleClaimValue = attributeValue[0]['#text'];
          debugLog('Found role claim in array', roleClaimValue);
        } else {
          roleClaimValue = attributeValue['#text'];
          debugLog('Found role claim in single value', roleClaimValue);
        }
        break;
      }
    }

    if (!roleClaimValue) {
      debugLog('No role claim value found in SAML response');
      throw new Error('No role claim value found in SAML response');
    }

    // Use the STS assumeRoleWithSAML function to get the temporary credentials
    try {
      const samlResponse = details.requestBody?.formData?.SAMLResponse?.[0];
      if (!samlResponse) {
        debugLog('No SAML response found in request body');
        throw new Error('No SAML response found in request body');
      }

      debugLog('Attempting to assume role with SAML');
      const keys = await assumeRoleWithSAML(roleClaimValue, samlResponse);
      debugLog('Successfully assumed role with SAML', {
        accessKeyId: keys.accessKeyId,
        expiration: keys.expiration,
        // Don't log secret values
      });

      const storage = typeof browser !== 'undefined' ? browser.storage : chrome.storage;
      try {
        await storage.local.set({ awsCredentials: keys });
        debugLog('Successfully saved credentials to storage');
      } catch (error) {
        console.error('Error saving credentials:', error);
        debugLog('Failed to save credentials to storage', formatError(error));
      }
    } catch (err) {
      console.error('ERROR: Error when trying to assume the IAM Role with the SAML Assertion.');
      debugLog('Failed to assume role with SAML', formatError(err));
      console.error(err);
    }
  } catch (error) {
    console.error('Error processing SAML request:', error);
    debugLog('Error in SAML processing', formatError(error));
  }
}

async function assumeRoleWithSAML(
  roleClaimValue: string,
  SAMLAssertion: string,
  SessionDuration?: number,
): Promise<AWSCredentials> {
  debugLog('Starting assumeRoleWithSAML', { roleClaimValue, SessionDuration });

  if (typeof roleClaimValue !== 'string') {
    debugLog('Invalid roleClaimValue type', typeof roleClaimValue);
    throw new TypeError('roleClaimValue must be a string');
  }

  const reRole = /arn:aws:iam:[^:]*:[0-9]+:role\/[^,]+/i;
  const rePrincipal = /arn:aws:iam:[^:]*:[0-9]+:saml-provider\/[^,]+/i;

  const roleMatch = roleClaimValue.match(reRole);
  const principalMatch = roleClaimValue.match(rePrincipal);

  if (!roleMatch || !principalMatch) {
    debugLog('Invalid role claim format', { roleMatch, principalMatch });
    throw new Error('Invalid role claim value format');
  }

  const RoleArn = roleMatch[0];
  const PrincipalArn = principalMatch[0];

  debugLog('Extracted ARNs', { RoleArn, PrincipalArn });

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

  debugLog('Executing AssumeRoleWithSAMLCommand');
  try {
    const response = await client.send(command);
    debugLog('Successfully received response from AWS STS');

    if (!response.Credentials) {
      debugLog('No credentials in AWS response');
      throw new Error('No credentials returned from AWS');
    }

    const keys: AWSCredentials = {
      accessKeyId: response.Credentials.AccessKeyId!,
      secretAccessKey: response.Credentials.SecretAccessKey!,
      sessionToken: response.Credentials.SessionToken!,
      expiration: response.Credentials.Expiration!,
    };

    debugLog('Successfully created AWS credentials object', {
      accessKeyId: keys.accessKeyId,
      expiration: keys.expiration,
    });

    return keys;
  } catch (error) {
    debugLog('Error in assumeRoleWithSAML', formatError(error));
    throw error;
  }
}
