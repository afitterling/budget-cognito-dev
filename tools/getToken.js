const {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
} = require("@aws-sdk/client-cognito-identity-provider");

const client = new CognitoIdentityProviderClient({});

async function getToken() {
  const command = new InitiateAuthCommand({
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: process.env.COGNITO_CLIENT_ID, // your App Client ID
    AuthParameters: {
      USERNAME: "newuser@example.com",
      PASSWORD: "Password123!",
    },
  });

  const response = await client.send(command);

  console.log("ID token:", response.AuthenticationResult?.IdToken);
  console.log("Access token:", response.AuthenticationResult?.AccessToken);
  console.log("Refresh token:", response.AuthenticationResult?.RefreshToken);
}

getToken();
