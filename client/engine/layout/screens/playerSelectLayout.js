import { CATEGORY_METADATA, DEFAULT_CATEGORY_METADATA } from "../config/categoryMetadata.js"
import { PLAYER_SELECT_LAYOUT } from "../config/playerSelect.js"
import { BaseScreenLayout } from "./basicScreenLayout.js"

export class PlayerSelectLayout extends BaseScreenLayout {

    constructor(engine, layout) {
        super(engine, layout, 'playerSelect')
    }

    build(context) {
        const {articleNodes, appState } = context
        const completedLessons = appState.user?.completedLessons || []
 const availableLessons = articleNodes
            .map(node => node.props?.articleData)
            .filter(article => article?.articleId && !completedLessons.includes(article.articleId))

        const groupedArticles = availableLessons.reduce((groups, article) => {
            const category = article.category || 'Uncategorized'

            if (!groups[category]) {
                groups[category] = []
            }

            groups[category].push(article)

            return groups
        }, {})
        const userId = appState?.user?.id
        const playerStats = this.engine.context.getPlayerStats(userId) || {}
    
        this.compile(PLAYER_SELECT_LAYOUT, {
            ...context,
            availableLessons,
            groupedArticles,
          categoryMetadata:  CATEGORY_METADATA,
            defaultCategoryMetadata: DEFAULT_CATEGORY_METADATA,
            appState,
            playerStats
        })
    }
}