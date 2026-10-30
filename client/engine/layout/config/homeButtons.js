import { getInstructions, getProgressText, getPromptText, getWelcomeTitle } from "../../helpers/homeText.js";

export const HOME_LAYOUT = {
    screen: 'home',

    nodes: [
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
                    id: 'start-button',
                    type: 'button',
                    kind: 'setPlayerState',
                    action: 'openPlayerSelect',
                    text: 'Get Started'
                },
                
            ]
        },

        // {
        //     id: 'lesson-options',
        //     type: 'collection',
        //     owner: 'home',

        //     source: 'availableLessons',

        //     item: {
        //         type: 'button',
        //         kind: 'lessonOption',
        //         action: 'openLesson',

        //         text: ({ item }) =>
        //             `Learn about ${item.title}`,

        //         articleId: ({ item }) =>
        //             item.articleId,

        //         articleData: ({ item }) =>
        //             item
        //     }
        // }
    ]
}