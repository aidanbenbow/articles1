
export const REGISTER_LAYOUT = {
    screen: 'register',

    nodes: () => [
        {
            id: 'register-card',
            type: 'card',
            owner: 'register',
            layout: 'content',
            children: [
                {
                    id: 'register-title',
                    type: 'text',
                    typography: 'title',
                    value: 'Create Your Account'
                },
                {
                    id: 'register-email',
                    type: 'emailInput',
                    placeholder: 'Email address',
                    action: 'focusInput',
                    interactive: true
                },
                {
                    id: 'register-password',
                    type: 'passwordInput',
                    placeholder: 'Password',
                    action: 'focusInput',
                    interactive: true
                },
                {
                    id: 'register-submit',
                    type: 'button',
                    action: 'register',
                    text: 'Create Account',
                    width: 200
                },
                {
                    id: 'register-back',
                    type: 'button',
                    action: 'goHome',
                    text: 'Back',
                    width: 200
                }
            ]
        }
    ]
};
