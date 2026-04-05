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

    // ── Shared Alerts SNS Topic ───────────────────────────────────────────────
    const alertsTopic = new aws.sns.Topic("FinwiseAlertsTopic", {
      displayName: `FinWise Alerts (${$app.stage})`,
    });
    new aws.sns.TopicSubscription("AlertsEmailSub", {
      topic: alertsTopic.arn,
      protocol: "email",
      endpoint: "info@sp33c.tech",
    });
    // Allow EventBridge to publish to this SNS topic
    new aws.sns.TopicPolicy("AlertsTopicPolicy", {
      arn: alertsTopic.arn,
      policy: alertsTopic.arn.apply(arn => JSON.stringify({
        Version: "2012-10-17",
        Statement: [{
          Effect: "Allow",
          Principal: { Service: "events.amazonaws.com" },
          Action: "sns:Publish",
          Resource: arn,
        }],
      })),
    });
    // Store ARN in SSM so api1 + api2 stacks can read it
    new aws.ssm.Parameter("AlertsSnsArnParam", {
      name: `${prefix}/ALERTS_SNS_ARN`,
      type: "String",
      value: alertsTopic.arn,
      overwrite: true,
    });

    // ── Cognito: New User Registered ──────────────────────────────────────────
    const newUserRule = new aws.cloudwatch.EventRule("CognitoNewUserRule", {
      description: "FinWise: New Cognito user registered or created",
      eventPattern: JSON.stringify({
        source: ["aws.cognito-idp"],
        "detail-type": ["AWS API Call via CloudTrail"],
        detail: { eventName: ["SignUp", "ConfirmSignUp", "AdminCreateUser"] },
      }),
    });
    new aws.cloudwatch.EventTarget("CognitoNewUserTarget", {
      rule: newUserRule.name,
      arn: alertsTopic.arn,
      inputTransformer: {
        inputPaths: {
          eventName: "$.detail.eventName",
          user: "$.detail.requestParameters.username",
        },
        inputTemplate: '"FinWise: New user event [<eventName>] – user: <user>"',
      },
    });

    // ── Cognito: User Disabled or Deleted ─────────────────────────────────────
    const userRemovedRule = new aws.cloudwatch.EventRule("CognitoUserRemovedRule", {
      description: "FinWise: Cognito user disabled or deleted",
      eventPattern: JSON.stringify({
        source: ["aws.cognito-idp"],
        "detail-type": ["AWS API Call via CloudTrail"],
        detail: { eventName: ["AdminDisableUser", "AdminDeleteUser", "DeleteUser"] },
      }),
    });
    new aws.cloudwatch.EventTarget("CognitoUserRemovedTarget", {
      rule: userRemovedRule.name,
      arn: alertsTopic.arn,
      inputTransformer: {
        inputPaths: {
          eventName: "$.detail.eventName",
          user: "$.detail.requestParameters.username",
        },
        inputTemplate: '"FinWise: User event [<eventName>] – user: <user>"',
      },
    });

    // 6) Return for console visibility
    //return {
    //  SSMPrefix: prefix,
    //  UserPool: userPool.id,
    //  Client: userPoolClient.id,
    //  IdentityPool: identityPool.id,
    //  Domain: domain.domain,
    //  //url: `https://STAGE.auth.${REGION}.amazoncognito.com/oauth2/token`
    //};

    return {
      SSMPrefix: prefix,
      UserPool: userPool.id,
      Client: userPoolClient.id,
      IdentityPool: identityPool.id,
      Domain: domain.domain,
      alertsTopic: alertsTopic.arn,
      waf: "no WAF",
    };
  },
});
