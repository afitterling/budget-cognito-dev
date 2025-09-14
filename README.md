# A Versatile AWS Cognito Identity Pool in SST

A minimal Cognito Identity Pool setup in SST — useful when you just want to share the same identity across several stacks or apps.
To use in your consumer / api / client:

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
