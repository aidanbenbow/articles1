import { Amplify } from 'aws-amplify';

const amplifyConfig = {
    Auth: {
        Cognito: {
            userPoolId: 'eu-central-1_B7ADNmSRu',
            userPoolClientId: '5o125c1dsme7mn55oenkkf3re5',

            loginWith: {
                email: true
            },

            signUpVerificationMethod: 'code',

            userAttributes: {
                email: {
                    required: true
                }
            }
        }
    }
};

Amplify.configure(amplifyConfig);

export default Amplify;