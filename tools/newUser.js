const {
    CognitoIdentityProviderClient,
    AdminSetUserPasswordCommand,
    AdminCreateUserCommand,
    InitiateAuthCommand,
} = require("@aws-sdk/client-cognito-identity-provider");

const client = new CognitoIdentityProviderClient({});

async function createUser() {
    try {
        const command = new AdminCreateUserCommand({
            UserPoolId: process.env.USER_POOL_ID,
            Username: process.env.USER_EMAIL,
            TemporaryPassword: process.env.PASSWORD, // must meet Cognito password policy
            MessageAction: "SUPPRESS", // don't send invitation email
            UserAttributes: [
                { Name: "email", Value: process.env.USER_EMAIL },
                { Name: "email_verified", Value: "true" },
            ],
        });

        await client.send(command);
        console.log("✅ User created");
        console.log("re-run to set password!")
    } catch (e) {
        console.log("error occured", e.message);
    }
}

createUser().catch(console.error);

async function setPassword() {
    try {
        const command = new AdminSetUserPasswordCommand({
            UserPoolId: process.env.USER_POOL_ID,
            Username: process.env.USER_EMAIL,
            Password: process.env.PASSWORD,
            Permanent: true, // prevents requiring reset on first login
        });
        await client.send(command);
        console.log("Password set!");
    } catch (e) {
        console.log("error", e.message);
    }
}

setPassword();
