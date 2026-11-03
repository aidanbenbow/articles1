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
        this.compile(PLAYER_SELECT_LAYOUT, {
            ...context,
            availableLessons,
            groupedArticles,
            appState
        })
    }
}