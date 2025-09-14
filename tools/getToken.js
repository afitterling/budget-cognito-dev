const {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
} = require("@aws-sdk/client-cognito-identity-provider");

const client = new CognitoIdentityProviderClient({});

async function getToken() {
  const command = new InitiateAuthCommand({
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: "3jd04ql9m3q1ori2unf9a2tbte", // your App Client ID
    AuthParameters: {
      USERNAME: "afitterling@icloud.com",
      PASSWORD: "Fit5032!x",
    },
  });

  const response = await client.send(command);

  console.log("ID token:", response.AuthenticationResult?.IdToken);
  console.log("Access token:", response.AuthenticationResult?.AccessToken);
  console.log("Refresh token:", response.AuthenticationResult?.RefreshToken);
}

getToken();
