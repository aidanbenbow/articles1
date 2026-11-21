
export const VERIFY_EMAIL_LAYOUT = {
    screen: 'verifyEmail',

    nodes: () => [
        {
            id: 'verify-card',
            type: 'card',
            owner: 'verifyEmail',
            layout: 'content',
            children: [
                {
                    id: 'verify-title',
                    type: 'text',
                    typography: 'title',
                    value: 'Verify Your Email'
                },
                {
                    id: 'verify-instructions',
                    type: 'text',
                    value: 'Enter the verification code sent to your email.'
                },
                {
                    id: 'verification-code',
                    type: 'confirmationCodeInput',
                    placeholder: 'Verification code',
                    action: 'focusInput',
                    interactive: true
                },
                {
                    id: 'verify-submit',
                    type: 'button',
                    action: 'verifyEmail',
                    text: 'Verify Email',
                    width: 200
                },
                {
                    id: 'verify-back',
                    type: 'button',
                    action: 'goHome',
                    text: 'Back',
                    width: 200
                }
            ]
        }
    ]
};
