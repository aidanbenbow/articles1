import { LESSON_INTRO_LAYOUT } from "./lessonIntro.js";

export const LESSON_LAYOUT = {
    screen: 'lesson',

    nodes: [
        {
            id: 'lesson-header',
            type: 'lessonHeader'
        },

        {
            ...LESSON_INTRO_LAYOUT,
            visible: ({ lesson }) =>
                lesson.phase === 'intro'
        },

        // {
        //     id: 'lesson-section',
        //     type: 'lessonSection',
        //     visible: ({ lesson }) =>
        //         lesson.phase !== 'intro'
        // },
        {
    id: 'lesson-section',
    type: 'dynamicSection',
    visible: ({ lesson }) => lesson.phase !== 'intro'
},

        {id: 'lesson-navigation',
            type: 'lessonNavigation',
            visible: ({ lesson }) =>
                lesson.phase !== 'intro'
        }
    ]
}