import { getLessonStats } from "../../helpers/lessonStats.js";

export const LESSON_INTRO_LAYOUT = {
    
        
            id: 'intro',
            type: 'card',
            kind: 'lessonIntro',
            padding: 0,
 layout: {
        gap: ({ metrics }) => metrics.lessonIntro.gap,
        
    },

            children: [
                {
                    id: 'title',
                    type: 'text',
                    kind: 'lessonTitle',
                    typography: 'title',
                    value: ({ lesson }) => lesson.title
                },

                {
                    id: 'description',
                    type: 'text',
                    kind: 'lessonDescription',
                    typography: 'body',
                    value: ({ lesson }) => lesson.description,
                    visible: ({ lesson }) => Boolean(lesson.description)
                },

                {
                    id: 'stats',
                    type: 'text',
                    kind: 'lessonStats',
                    typography: 'body',
                    value: getLessonStats
                },

                {
                    id: 'start-button',
                    type: 'button',
                    kind: 'lessonStartButton',
                    typography: 'button',
                    text: 'Start Lesson',
                    action: 'startLessonPhase'
                }
            ]
        
    
}