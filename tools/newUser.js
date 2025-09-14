const {
    CognitoIdentityProviderClient,
    AdminSetUserPasswordCommand,
    AdminCreateUserCommand,
    InitiateAuthCommand,
} = require("@aws-sdk/client-cognito-identity-provider");

const client = new CognitoIdentityProviderClient({});

async function createUser() {
    const command = new AdminCreateUserCommand({
        UserPoolId: process.env.USER_POOL_ID,
        Username: "newuser@example.com",
        TemporaryPassword: process.env.password, // must meet Cognito password policy
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
        UserPoolId: process.env.USER_POOL_ID,
        Username: "newuser@example.com",
        Password: process.env.password,
        Permanent: true, // prevents requiring reset on first login
    });
    await client.send(command);
    console.log("Password set!");
}

setPassword();
