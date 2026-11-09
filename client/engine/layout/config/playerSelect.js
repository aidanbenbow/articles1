import {
    getProgressText,
    getWelcomeTitle
} from "../../helpers/homeText.js";

export const PLAYER_SELECT_LAYOUT = {
    screen: 'playerSelect',

    nodes: (context) => {
        const groupedArticles = context.groupedArticles || {};
const categoryNodes = Object.entries(groupedArticles)
    .filter(([category, articles]) => articles.length > 0)
    .map(([category, articles]) => ({
        id: `category-${category}`,
        type: 'button',
        kind: 'lessonOption',
        action: 'openCategory',
        text: `${category} (${articles.length})`,
                category
    }));

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
            ...categoryNodes
        ];
    }
};