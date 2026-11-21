


export const HOME_LAYOUT = {
    screen: 'home',

    nodes:({ appState }) => [
        {
            id: 'welcome',
            type: 'card',
            owner: 'home',
            layout: 'content',

            children: [
                {
                    id: 'title',
                    type: 'text',       
                    typography: 'title',
                    color: 'heading',
                    value: 'Welcome to the Educational Lessons App'
                },
                {
                    id: 'prompt',
                    type: 'text',
                    typography: 'body',
                    color: 'text',
                    value: appState.user
                        ? `Welcome back, ${appState.user.name || appState.user.email || ''}!`
                        : 'Create an account or log in to continue.'
                },
...(appState.user
                    ? [
                        {
                            id: 'continue-button',
                            type: 'button',
                            action: 'browseLessons',
                            text: 'Continue',
                            width: 200
                        },
                        {
                            id: 'logout-button',
                            type: 'button',
                            action: 'logout',
                            text: 'Log Out',
                            width: 200
                        }
                    ]
                    : [
                        {
                            id: 'register-button',
                            type: 'button',
                            action: 'showRegister',
                            text: 'Create Account',
                            width: 200
                        },
                        {
                            id: 'login-button',
                            type: 'button',
                            action: 'showLogin',
                            text: 'Log In',
                            width: 200
                        }
                    ])
            ]
        }
    ]
}