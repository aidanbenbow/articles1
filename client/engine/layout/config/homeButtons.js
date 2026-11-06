
import { getInstructions, getProgressText, getPromptText, getWelcomeTitle } from "../../helpers/homeText.js";

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
...(appState.user
                    ? [
                        {
                            id: 'returning-user',
                            type: 'text',
                            typography: 'body',
                            color: 'text',
                            value: `Welcome back, ${appState.user.name}!`
                        },
                        {
                            id: 'continue-button',
                            type: 'button',
                            kind: 'setPlayerState',
                            action: 'browseLessons',
                            text: 'Continue'
                        }
                    ]
                    : [
                {
                    id: 'prompt',
                    type: 'text',
                    typography: 'body',
                    color: 'text',
                    value: getPromptText,
                },

                {
                    id: 'instructions',
                    type: 'text',
                    typography: 'step',
                    color: 'text',
                    value: getInstructions
                },
                {
    id: 'name',
    type: 'nameInput',
    placeholder: 'Enter your name...',
    action: 'focusNameInput',
},
                {
                    id: 'start-button',
                    type: 'button',
                    kind: 'setPlayerState',
                    action: 'openPlayerSelect',
                    text: 'Get Started'
                },
                
            ])]
        },

    ]
}