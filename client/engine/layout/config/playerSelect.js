import {
    getProgressText,
    getWelcomeTitle
} from "../../helpers/homeText.js";

export const PLAYER_SELECT_LAYOUT = {
    screen: 'playerSelect',

    nodes: (context) => {
        const groupedArticles = context.groupedArticles || {};
const categoryMetadata = context.categoryMetadata || {};
        const defaultMetadata = context.defaultCategoryMetadata || {};

        const categoryNodes = Object.entries(groupedArticles)
            .filter(([category, articles]) => articles.length > 0)
            .map(([category, articles]) => {
                const metadata = categoryMetadata[category] || defaultMetadata;

                return {
                    id: `category-card-${category}`,
                    type: 'card',
                    kind: 'categoryCard',
                    color: metadata.color,
                    padding: 12,
                    children: [
                        {
                            id: `category-icon-${category}`,
                            type: 'text',
                            typography: 'categoryTitle',
                            color: 'heading',
                            value: metadata.icon
                        },
                        {
                            id: `category-title-${category}`,
                            type: 'text',
                                typography: "categoryTitle",
    paragraphGap: 2,
                            color: 'heading',
                            value: category
                        },
                        {
                            id: `category-description-${category}`,
                            type: 'text',
                           typography: "categoryDescription",
    paragraphGap: 2,
                            color: 'text',
                            value: metadata.description
                        },
                        {
                            id: `category-count-${category}`,
                            type: 'text',
                            typography: "categoryMeta",
    paragraphGap: 2,
                            color: 'muted',
                            value: `${articles.length} lessons available`
                        },
                        {
                            id: `category-button-${category}`,
                            type: 'button',
                            kind: 'lessonOption',
                            action: 'openCategory',
                            category,
                            text: 'Explore category'
                        }
                    ]
                };
            });

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
                id: 'category-heading',
                type: 'text',
                typography: 'heading',
                color: 'heading',
                value: 'Explore your topics'
            },
            {
                id: 'category-description',
                type: 'text',
                typography: 'body',
                color: 'muted',
                value: 'Choose a topic and continue your learning journey.'
            },
            ...categoryNodes,
            {
                id: 'analytics-button',
                type: 'button',
                kind: 'lessonOption',
                action: 'openAnalytics',
                text: '📊 View Learning Analytics'
            }
        ];
    }
};