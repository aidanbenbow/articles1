import { getProgressText, getWelcomeTitle } from "../../helpers/homeText.js"

export const CATEGORY_LESSONS_LAYOUT = {
    screen: 'category',

    nodes: (context) => {
        const { selectedCategory, availableLessons, appState } = context

        const lessonNodes = availableLessons.map(article => ({
            id: `lesson-${article.articleId}`,
            type: 'button',
            kind: 'lessonOption',
            action: 'openLesson',
            text: article.title,
            articleId: article.articleId
        }))

        return [
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
                id: 'category-title',
                type: 'text',
                typography: 'title',
                value: selectedCategory
            },
            ...lessonNodes,
            {
                id: 'back-to-categories',
                type: 'button',
                action: 'openLessonBrowser',
                text: 'Back to categories'
            }
        ]
    }
}