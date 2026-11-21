
export const LOGIN_LAYOUT = {
    screen: 'login',

    nodes: () => [
        {
            id: 'login-card',
            type: 'card',
            owner: 'login',
            layout: 'content',
            children: [
                {
                    id: 'login-title',
                    type: 'text',
                    typography: 'title',
                    value: 'Log In'
                },
                {
                    id: 'login-email',
                    type: 'emailInput',
                    placeholder: 'Email address',
                    action: 'focusInput',
                    interactive: true
                },
                {
                    id: 'login-password',
                    type: 'passwordInput',
                    placeholder: 'Password',
                    action: 'focusInput',
                    interactive: true
                },
                {
                    id: 'login-submit',
                    type: 'button',
                    action: 'login',
                    text: 'Log In',
                    width: 200
                },
                {
                    id: 'login-back',
                    type: 'button',
                    action: 'goHome',
                    text: 'Back',
                    width: 200
                }
            ]
        }
    ]
};
