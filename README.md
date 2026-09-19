# A Versatile AWS Cognito Identity Pool in SST

A Cognito Identity Pool setup in SST — useful when you just want to share the same identity across several stacks or apps.
To use in your consumer / api / client:

For threat modeling, everything has to be protected. The idea here is to split the idendity pool from any consumer.
You can replace the identity pool at any time. 

Follow does an example on how to integrate into your API / Client with AWS SSM Parameter.
- The ID provider publishes its data with parameter on its SST stage
- The consumers can pick it up - if integrated into this very SST stage. To adapt change the prefix.


```JS
    const prefix = `/identity/identity-pool-budget/${$app.stage}`;

    // Read SSM parameters (outputs resolve to Pulumi outputs)
    const userPoolId = aws.ssm.getParameterOutput({ name: `${prefix}/COGNITO_USER_POOL_ID` }).value;
    const clientId = aws.ssm.getParameterOutput({ name: `${prefix}/COGNITO_CLIENT_ID` }).value;
    const identityPid = aws.ssm.getParameterOutput({ name: `${prefix}/COGNITO_IDENTITY_POOL_ID` }).value;



    const api = new sst.aws.ApiGatewayV2("MyApi",
        {
            ...
        }
    );

    const authorizer = api.addAuthorizer({
        name: "myCognitoAuthorizer",
        jwt: {
            issuer: $interpolate`https://cognito-idp.${aws.getRegionOutput().name}.amazonaws.com/${userPoolId}`,
            audiences: [clientId]
        }
    });

    const auth = { jwt: { authorizer: authorizer.id } }

    ...

    // restricted
    api.route("POST /api/v1/expenses", {
        handler: "api/v1/expenses/create.handler",
    }, { auth });

```

## user relatedness

We are currently using sub as uuid. There are several more save examples as login + audit place a crucial role. See the full content of your access token or identity token for review.

## Token lifetimes and the deploy hazard

The app client this stack creates is shared by every FinWise surface, and its
three token lifetimes are set in `sst.config.ts`:

| Token | Lives | Who holds it |
|-------|-------|--------------|
| Access token | 5 minutes | `aws-remix`, React Native, `fast-track-app` |
| ID token | 1 hour | only `finwise-mcp`, and only server-side |
| Refresh token | 30 days | all of them |

`finwise-mcp` no longer hands Cognito tokens to a connector — it issues its own
opaque session tokens and keeps these on the server. That is why the ID token
is an hour rather than a day: nobody has to re-authenticate when it expires,
the MCP server just renews it.

The refresh token is the only long-lived credential in the system, and it is
the ceiling on an MCP session. Revoking it, and what that does **not** reach —
a JWT already issued keeps working against api1/api2 until it expires, because
their authorizers never ask Cognito — is written up in `finwise-mcp/README.md`,
section "Runbook — revoking access".

> ⚠️ **Every deploy of this app needs `MCP_CALLBACK_URLS`.** Without it the
> hosted-UI code flow is stripped off the client and every MCP connector
> breaks. The config now refuses to deploy rather than let that happen; pass
> `MCP_OAUTH_OFF=1` for a stage that genuinely has no MCP server.
