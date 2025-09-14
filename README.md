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
