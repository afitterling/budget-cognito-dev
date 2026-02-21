/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "identity-pool",
      home: "aws",
      removal: input?.stage === "production" ? "retain" : "remove",
    };
  },

  async run() {
    // 1) Cognito User Pool
    const userPool = new sst.aws.CognitoUserPool("MyUserPool", {
      transform: {
        userPool: {
          autoVerifiedAttributes: ["email"],
          verificationMessageTemplate: {
            defaultEmailOption: "CONFIRM_WITH_CODE",
          },
        },
      },
    });

    const userPoolClient = new aws.cognito.UserPoolClient("MyUserPoolClient", {
      userPoolId: userPool.id,
      generateSecret: false, // must be false for USER_PASSWORD_AUTH
      explicitAuthFlows: [
        "ALLOW_USER_PASSWORD_AUTH",
        "ALLOW_REFRESH_TOKEN_AUTH",
        "ALLOW_USER_SRP_AUTH",
      ],
      //allowedOauthFlows: ["password"],
      //allowedOAuthScopes: ["openid", "email", "profile"],
      supportedIdentityProviders: ["COGNITO"],
      tokenValidityUnits: {
        accessToken: "minutes",
        idToken: "hours",
        refreshToken: "hours",
      },
      accessTokenValidity: 5,
      idTokenValidity: 24,
      refreshTokenValidity: 24
    });

    // 2) User Pool Client with password & refresh flows
    //const client = userPool.addClient("Web",);

    // 3) Identity Pool
    const identityPool = new sst.aws.CognitoIdentityPool("MyIdentityPool", {
      userPools: [{ userPool: userPool.id, client: userPoolClient.id }],
    });
    // optional domain
    const domain = new aws.cognito.UserPoolDomain("UserPoolDomain", {
      domain: `identity-pool-budget-${$app.stage}`,
      userPoolId: userPool.id,
    });

    // 4) SSM prefix per app/stage
    //const prefix = `/identity/${$app.name}/${$app.stage}`;
    const prefix = `/identity/identity-pool-budget/${$app.stage}`;

    // 5) Write parameters to SSM
    new aws.ssm.Parameter("CognitoUserPoolIdParam", {
      name: `${prefix}/COGNITO_USER_POOL_ID`,
      type: "String",
      value: userPool.id,
      overwrite: true,
    });

    new aws.ssm.Parameter("CognitoUserPoolArnParam", {
      name: `${prefix}/COGNITO_USER_POOL_ARN`,
      type: "String",
      value: userPool.arn,
      overwrite: true,
    });

    new aws.ssm.Parameter("CognitoClientIdParam", {
      name: `${prefix}/COGNITO_CLIENT_ID`,
      type: "String",
      value: userPoolClient.id,
      overwrite: true,
    });

    new aws.ssm.Parameter("CognitoIdentityPoolIdParam", {
      name: `${prefix}/COGNITO_IDENTITY_POOL_ID`,
      type: "String",
      value: identityPool.id,
      overwrite: true,
    });

    // IdentityPool ARN is optional, safer to skip

    // 6) Return for console visibility
    return {
      SSMPrefix: prefix,
      UserPool: userPool.id,
      Client: userPoolClient.id,
      IdentityPool: identityPool.id,
      Domain: domain.domain,
      //url: `https://STAGE.auth.${REGION}.amazoncognito.com/oauth2/token`
    };
  },
});
