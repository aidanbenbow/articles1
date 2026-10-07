
import { HOME_LAYOUT } from "./config/homeButtons.js"
import { compileLayout } from "./general/compileLayout.js"


export class HomeLayout {
    constructor(engine, layout) {
        this.engine = engine
        this.layout = layout
    }

    build(context) {
        const { articleNodes, appState } = context
        this.clear()
const availableLessons = articleNodes
        .map(node => node.props?.articleData)
        .filter(article => article?.articleId)
        compileLayout(
            HOME_LAYOUT,
            {
                layout: this.layout,
                engine: this.engine,
                articleNodes,
                appState,
                availableLessons,
                owner: 'home'
            }
        )

        this.layout.computeScrollBounds(
            this.layout.layoutNodes
        )
    }

    clear() {
        for (const [id, node] of this.layout.layoutNodes) {
            if (node.owner === 'home') {
                this.layout.layoutNodes.delete(id)
            }
        }
    }
}
