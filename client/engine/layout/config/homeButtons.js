


export const HOME_LAYOUT = {
    screen: 'home',

    nodes:({ appState, weeklyLeaderboard }) => [
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
                        ? `Welcome back, ${appState.user.displayName || appState.user.email || ''}!`
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
        },
        {
            id: 'weekly-leaderboard',
                type: 'card',
                owner: 'home',
                layout: 'content',
                children: [
                     {
                        id: 'weekly-title',
                        type: 'text',
                        typography: 'title',
                        color: 'heading',
                        value: '🏆 Weekly Leaderboard'
                    },
                    {
            id: 'weekly-week',
            type: 'text',
            typography: 'body',
            color: 'text',
            value: `Week ${weeklyLeaderboard?.weekKey || ''}`
        },
             ...(weeklyLeaderboard?.players?.length
            ? weeklyLeaderboard.players.slice(0, 5).map((player, index) => ({
                id: `weekly-player-${player.userId}`,
                type: 'text',
                typography: 'body',
                color: 'text',
                value: `${player.rank || index + 1}. ${player.displayName || 'Learner'} — ${player.weeklyScore} points`
            }))
            : [{
                id: 'weekly-empty',
                type: 'text',
                typography: 'body',
                color: 'text',
                value: 'No weekly rankings yet. Complete a lesson to appear here!'
            }])   ]   


        }
    ]
}