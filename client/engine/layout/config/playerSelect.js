import { getProgressText, getWelcomeTitle } from "../../helpers/homeText.js";

export const PLAYER_SELECT_LAYOUT = {
    screen: 'playerSelect',
    nodes: [
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
            id: 'first-lesson-button',
            type: 'button',
            kind: 'lessonOption',
            action: 'openLesson',
            text: 'Start First Lesson',
            articleId: 'tofu',
        },
    ]
}
