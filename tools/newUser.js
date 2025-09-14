const {
    CognitoIdentityProviderClient,
    AdminSetUserPasswordCommand,
    AdminCreateUserCommand,
    InitiateAuthCommand,
} = require("@aws-sdk/client-cognito-identity-provider");

const client = new CognitoIdentityProviderClient({});

async function setPassword() {
    const command = new AdminSetUserPasswordCommand({
        UserPoolId: "eu-central-1_PZxzRMsX2",
        Username: "newuser@example.com",
        Password: "Password123!",
        Permanent: true, // prevents requiring reset on first login
    });
    await client.send(command);
    console.log("Password set!");
}

setPassword();
