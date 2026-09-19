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

    // Callback URLs for the hosted-UI authorization-code flow, which only the
    // MCP server uses: the web and mobile clients authenticate with
    // USER_PASSWORD_AUTH and never see the hosted UI.
    //
    // Set MCP_CALLBACK_URLS to finwise-mcp's `callbackUrl` output before
    // deploying (comma-separated for several stages). While it is unset the
    // OAuth flow stays switched off and this client is byte-identical to what
    // it was before — deploying without the variable changes nothing.
    const mcpCallbackUrls = (process.env.MCP_CALLBACK_URLS ?? "")
      .split(",")
      .map((u) => u.trim())
      .filter(Boolean);
    const oauthEnabled = mcpCallbackUrls.length > 0;

    // Deploying without the variable used to be survivable — while the flow
    // was off, omitting it changed nothing. Now that it is on, omitting it
    // strips allowedOauthFlows and callbackUrls back off the client and every
    // MCP connector dies, with no error anywhere to explain why. Refuse
    // instead. MCP_OAUTH_OFF=1 is the way out for a stage that genuinely has
    // no MCP server.
    if (!oauthEnabled && !process.env.MCP_OAUTH_OFF) {
      throw new Error(
        `MCP_CALLBACK_URLS is unset for stage ${$app.stage}. Deploying now would ` +
        `disable the hosted-UI code flow and break every MCP connector. Set it ` +
        `(finwise-mcp/README.md, "Deploying") or pass MCP_OAUTH_OFF=1 to confirm ` +
        `this stage has no MCP server.`
      );
    }

    const userPoolClient = new aws.cognito.UserPoolClient("MyUserPoolClient", {
      userPoolId: userPool.id,
      generateSecret: false, // must be false for USER_PASSWORD_AUTH
      explicitAuthFlows: [
        "ALLOW_USER_PASSWORD_AUTH",
        "ALLOW_REFRESH_TOKEN_AUTH",
        "ALLOW_USER_SRP_AUTH",
      ],
      supportedIdentityProviders: ["COGNITO"],
      // Additive: the code flow runs alongside the existing auth flows rather
      // than replacing them. PKCE is enforced by the MCP server on both legs;
      // this client has no secret to fall back on.
      ...(oauthEnabled
        ? {
          allowedOauthFlowsUserPoolClient: true,
          allowedOauthFlows: ["code"],
          allowedOauthScopes: ["openid", "email", "profile"],
          callbackUrls: mcpCallbackUrls,
          logoutUrls: mcpCallbackUrls,
        }
        : {}),
      // Three tokens, three jobs.
      //
      // The access token (5 min) is what aws-remix, the React Native client
      // and fast-track-app actually send to api1/api2 — they store it and
      // refresh on expiry, so it is short by design.
      //
      // The ID token no longer reaches an MCP connector at all: finwise-mcp
      // issues its own opaque session tokens and keeps Cognito's on the
      // server, replaying them upstream. So this number now only bounds one
      // thing — how stale a stored ID token in the MCP session table can be —
      // and an hour is as short as is useful, since the server renews it
      // transparently between tool calls. It used to be 24 because the
      // connector held it and every expiry meant a visible re-login.
      //
      // The refresh token is the only long-lived credential here, and it is
      // the ceiling on an MCP session: the server's own sliding window cannot
      // outlive it. 30 days also matches aws-remix's COOKIE_LIFETIME, which
      // the previous 24 hours contradicted — the web app intended month-long
      // sessions and got daily logouts. Revoke it with
      // `admin-user-global-sign-out`, or per-connector via /oauth/revoke.
      tokenValidityUnits: {
        accessToken: "minutes",
        idToken: "hours",
        refreshToken: "days",
      },
      accessTokenValidity: 5,
      idTokenValidity: 1,
      refreshTokenValidity: 30
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

    // ── Cognito user-event alerts MOVED OUT ───────────────────────────────────
    // The CognitoNewUserRule / CognitoUserRemovedRule (+ targets) now live in the
    // standalone "identity-alerts" app: AWS-Admin/identity/cognito-alerts.ts.
    // The shared alertsTopic + ALERTS_SNS_ARN SSM param above intentionally stay
    // here because aws-api1 / aws-api2 publish to this topic.
    // Deploy order: 1) deploy identity-alerts (you'll briefly get 2 emails per
    // signup while both exist), 2) deploy this stack to drop the old rules.

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
