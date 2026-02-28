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

    // 6) Return for console visibility
    //return {
    //  SSMPrefix: prefix,
    //  UserPool: userPool.id,
    //  Client: userPoolClient.id,
    //  IdentityPool: identityPool.id,
    //  Domain: domain.domain,
    //  //url: `https://STAGE.auth.${REGION}.amazoncognito.com/oauth2/token`
    //};

    // WAF Web ACL (REGIONAL, eu-central-1)
    const waf = new aws.wafv2.WebAcl("FinWiseWAF", {
      scope: "REGIONAL", // für API Gateway (nicht V2!)
      defaultAction: { allow: {} },
      visibilityConfig: {
        cloudwatchMetricsEnabled: true,
        metricName: "FinWiseWAF",
        sampledRequestsEnabled: true,
      },
      rules: [
        // 1. AWS Managed – Common Rule Set (SQLi, XSS, etc.)
        {
          name: "AWSManagedCommon",
          priority: 1,
          overrideAction: { none: {} },
          statement: {
            managedRuleGroupStatement: {
              vendorName: "AWS",
              name: "AWSManagedRulesCommonRuleSet",
            },
          },
          visibilityConfig: {
            cloudwatchMetricsEnabled: true,
            metricName: "AWSManagedCommon",
            sampledRequestsEnabled: true,
          },
        },
        // 2. AWS Managed – Known Bad Inputs (Log4j, etc.)
        {
          name: "AWSManagedBadInputs",
          priority: 2,
          overrideAction: { none: {} },
          statement: {
            managedRuleGroupStatement: {
              vendorName: "AWS",
              name: "AWSManagedRulesKnownBadInputsRuleSet",
            },
          },
          visibilityConfig: {
            cloudwatchMetricsEnabled: true,
            metricName: "AWSManagedBadInputs",
            sampledRequestsEnabled: true,
          },
        },
        // 3. AWS Managed – IP Reputation (bekannte Angreifer-IPs)
        {
          name: "AWSManagedIPReputation",
          priority: 3,
          overrideAction: { none: {} },
          statement: {
            managedRuleGroupStatement: {
              vendorName: "AWS",
              name: "AWSManagedRulesAmazonIpReputationList",
            },
          },
          visibilityConfig: {
            cloudwatchMetricsEnabled: true,
            metricName: "AWSManagedIPReputation",
            sampledRequestsEnabled: true,
          },
        },
        // 4. AWS Managed – Anonymous IP (VPN/TOR)
        {
          name: "AWSManagedAnonymousIP",
          priority: 4,
          overrideAction: { none: {} },
          statement: {
            managedRuleGroupStatement: {
              vendorName: "AWS",
              name: "AWSManagedRulesAnonymousIpList",
            },
          },
          visibilityConfig: {
            cloudwatchMetricsEnabled: true,
            metricName: "AWSManagedAnonymousIP",
            sampledRequestsEnabled: true,
          },
        },
        // 5. Rate Limit – Auth Endpunkte (10 req / 5 min)
        {
          name: "RateLimitAuth",
          priority: 5,
          action: { block: {} },
          statement: {
            rateBasedStatement: {
              limit: 10,
              aggregateKeyType: "IP",
              evaluationWindowSec: 300,
              scopeDownStatement: {
                byteMatchStatement: {
                  fieldToMatch: { uriPath: {} },
                  positionalConstraint: "STARTS_WITH",
                  searchString: "/api/v1/auth/",
                  textTransformations: [{ priority: 0, type: "LOWERCASE" }],
                },
              },
            },
          },
          visibilityConfig: {
            cloudwatchMetricsEnabled: true,
            metricName: "RateLimitAuth",
            sampledRequestsEnabled: true,
          },
        },
        // 6. Rate Limit – Allgemeine API (1000 req / 5 min)
        {
          name: "RateLimitGeneral",
          priority: 6,
          action: { block: {} },
          statement: {
            rateBasedStatement: {
              limit: 1000,
              aggregateKeyType: "IP",
              evaluationWindowSec: 300,
            },
          },
          visibilityConfig: {
            cloudwatchMetricsEnabled: true,
            metricName: "RateLimitGeneral",
            sampledRequestsEnabled: true,
          },
        },
      ],
    });

    // ❌ WebAclAssociation entfernt - API Gateway V2 unterstützt WAF nicht direkt

    return {
      SSMPrefix: prefix,
      UserPool: userPool.id,
      Client: userPoolClient.id,
      IdentityPool: identityPool.id,
      Domain: domain.domain,
      WAF: waf.arn,  // ✅ WAF ARN für Monitoring
    };
  },
});
