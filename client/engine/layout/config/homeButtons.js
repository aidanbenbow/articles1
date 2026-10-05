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
                    value: getWelcomeTitle
                },

                {
                    id: 'progress',
                    type: 'text',
                    typography: 'body',
                    color: 'text',
                    value: getProgressText
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
                }
            ]
        },

        {
            id: 'lesson-options',
            type: 'collection',
            owner: 'home',

            source: 'availableLessons',

            item: {
                type: 'button',
                kind: 'lessonOption',
                action: 'openLesson',

                text: ({ item }) =>
                    `Learn about ${item.title}`,

                articleId: ({ item }) =>
                    item.articleId,

                articleData: ({ item }) =>
                    item
            }
        }
    ]
}