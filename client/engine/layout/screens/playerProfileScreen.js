

import { Player_Profile_LAYOUT } from "../config/playerProfileConfig.js"
import { BaseScreenLayout } from "./basicScreenLayout.js"

export class PlayerProfileLayout extends BaseScreenLayout {

    constructor(engine, layout) {
        super(engine, layout, "playerProfile")
    }

    build(context) {
        const { appState, articleNodes = [] } = context
const userId = appState?.user?.id
        const availableLessons = articleNodes
            .map(node => node.props?.articleData)
            .filter(article => article?.articleId)

        const weeklyLeaderboard =
            this.engine.context.getWeeklyLeaderboard?.() ?? {
                players: []
            }

        const playerStats =
            this.engine.context.getPlayerStats?.(userId) ?? {}
const playerProgress = userId
        ? this.engine.context.getPlayerProgress(userId)
        : []
        this.compile(Player_Profile_LAYOUT, {
            ...context,
            appState,
            availableLessons,
            weeklyLeaderboard,
            playerStats,
            playerProgress
        })
    }
}
