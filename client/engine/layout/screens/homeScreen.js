import { HOME_LAYOUT } from "../config/homeButtons.js"
import { BaseScreenLayout } from "./basicScreenLayout.js"

export class HomeLayout extends BaseScreenLayout {

    constructor(engine, layout) {
        super(engine, layout, 'home')
    }

    build(context) {
        const { articleNodes, appState } = context

        const availableLessons = articleNodes
            .map(node => node.props?.articleData)
            .filter(article => article?.articleId)

        this.compile(HOME_LAYOUT, {
            ...context,
            availableLessons,
            appState
        })
    }
}