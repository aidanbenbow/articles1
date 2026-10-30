import { compileLayout } from "../general/compileLayout.js"

export class BaseScreenLayout {

    constructor(engine, layout, owner) {
        this.engine = engine
        this.layout = layout
        this.owner = owner
    }

    clear() {
        for (const [id, node] of this.layout.layoutNodes) {
            if (node.owner === this.owner) {
                this.layout.layoutNodes.delete(id)
            }
        }
    }

    compile(config, context) {
        this.clear()

        compileLayout(config, {
            ...context,
            layout: this.layout,
            engine: this.engine,
            owner: this.owner
        })

        this.layout.computeScrollBounds(
            this.layout.layoutNodes
        )
    }
}