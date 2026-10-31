import {
    getLessonCategorySummary,
    getPlayerRecommendationText,
    getRecommendedLessons
} from "../../helpers/lessonRecommendations.js"
import { getProgressText, getWelcomeTitle } from "../../helpers/homeText.js"

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
            id: 'recommendation-text',
            type: 'text',
            typography: 'body',
            color: 'text',
            value: getPlayerRecommendationText
        },
        {
            id: 'category-summary',
            type: 'text',
            typography: 'body',
            color: 'text',
            value: getLessonCategorySummary
        },
        {
            id: 'recommended-lessons',
            type: 'collection',
            source: getRecommendedLessons,
            item: {
                type: 'button',
                kind: 'lessonOption',
                action: 'openLesson',
                height: 48,
                text: ({ item, index }) => `${index + 1}. ${item.title} • ${item.lessonCategory}`,
                articleId: ({ item }) => item.articleId,
                articleData: ({ item }) => item
            }
        }
    ]
}
