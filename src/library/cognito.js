import {
    CognitoIdentityProviderClient,
    InitiateAuthCommand
  } from "@aws-sdk/client-cognito-identity-provider";
  
  import {
    CognitoIdentityClient,
    GetIdCommand,
    GetCredentialsForIdentityCommand
  } from "@aws-sdk/client-cognito-identity";
  
  async function signInWithCognito(
    username, password, userPoolId, identityPoolId, clientAppId, region
  ) {
    const cognitoProvider = new CognitoIdentityProviderClient({ region });
    const authResult = await cognitoProvider.send(
      new InitiateAuthCommand({
        ClientId: clientAppId,
        AuthFlow: "USER_PASSWORD_AUTH",
        AuthParameters: {
          USERNAME: username,
          PASSWORD: password,
        },
      })
    );
  
    const idToken = authResult.AuthenticationResult.IdToken;
  
    const cognitoIdentityClient = new CognitoIdentityClient({ region });
  
    const identityResult = await cognitoIdentityClient.send(
      new GetIdCommand({
        IdentityPoolId: identityPoolId,
        Logins: {
          [`cognito-idp.${region}.amazonaws.com/${userPoolId}`]: idToken,
        },
      })
    );
  
    const credentialsResult = await cognitoIdentityClient.send(
      new GetCredentialsForIdentityCommand({
        IdentityId: identityResult.IdentityId,
        Logins: {
          [`cognito-idp.${region}.amazonaws.com/${userPoolId}`]: idToken,
        },
      })
    );
  
    const {
      AccessKeyId: accessKeyId,
      SecretKey: secretAccessKey,
      SessionToken: sessionToken,
    } = credentialsResult.Credentials;
  
    return {
      accessKeyId,
      secretAccessKey,
      sessionToken
    }
  }
  
export { signInWithCognito };