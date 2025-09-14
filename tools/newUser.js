const {
    CognitoIdentityProviderClient,
    AdminSetUserPasswordCommand,
    AdminCreateUserCommand,
    InitiateAuthCommand,
} = require("@aws-sdk/client-cognito-identity-provider");

const client = new CognitoIdentityProviderClient({});

async function createUser() {
    const command = new AdminCreateUserCommand({
        UserPoolId: "eu-central-1_lBH9g2x2D",
        Username: "newuser@example.com",
        TemporaryPassword: "TempPass123!", // must meet Cognito password policy
        MessageAction: "SUPPRESS", // don't send invitation email
        UserAttributes: [
            { Name: "email", Value: "newuser@example.com" },
            { Name: "email_verified", Value: "true" },
        ],
    });

    await client.send(command);
    console.log("✅ User created");
}

createUser().catch(console.error);

async function setPassword() {
    const command = new AdminSetUserPasswordCommand({
        UserPoolId: "eu-central-1_lBH9g2x2D",
        Username: "newuser@example.com",
        Password: "Password123!",
        Permanent: true, // prevents requiring reset on first login
    });
    await client.send(command);
    console.log("Password set!");
}

setPassword();
