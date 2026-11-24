import {
    CognitoIdentityProviderClient,
    GetUserCommand
} from "@aws-sdk/client-cognito-identity-provider";

const cognitoClient = new CognitoIdentityProviderClient({
    region: "eu-central-1"
});

export async function getCognitoUserAttributes(accessToken) {
    const result = await cognitoClient.send(
        new GetUserCommand({
            AccessToken: accessToken
        })
    );

    return Object.fromEntries(
        (result.UserAttributes || []).map(attribute => [
            attribute.Name,
            attribute.Value
        ])
    );
}