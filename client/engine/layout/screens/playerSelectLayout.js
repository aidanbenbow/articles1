import { PLAYER_SELECT_LAYOUT } from "../config/playerSelect.js"
import { BaseScreenLayout } from "./basicScreenLayout.js"

export class PlayerSelectLayout extends BaseScreenLayout {

    constructor(engine, layout) {
        super(engine, layout, 'playerSelect')
    }

    build(context) {
        const { appState } = context

        this.compile(PLAYER_SELECT_LAYOUT, {
            ...context,
            appState
        })
    }
}