
export class ActivityActions {
    constructor(engine) {
        this.engine = engine

        this.handlers = {
            moveOrderingItem: node => this.moveOrderingItem(node),
            checkOrdering: node => this.checkOrdering(node),
            checkDragDrop: node => this.checkDragDrop(node),
        }
    }

    moveOrderingItem(node) {
        this.engine.context.moveOrderingItem(
            node.sectionId,
            node.itemIndex,
            node.direction
        )

        this.emitLayoutChanged()
    }

    checkOrdering(node) {
         const result = this.engine.context.checkOrdering(node.sectionId)

        this.emitLayoutChanged()
    }

    checkDragDrop(node) {
        
        const sectionId = node.dragDropId || node.sectionId
        const result = this.engine.context.checkDragDrop(sectionId)

        if (!result) return

        if (result.scoreAwarded) {
            this.engine.context
                .getAnimationManager()
                .play('dragDropComplete', 'lesson-score', {
                    from: result.totalScore - result.score,
                    to: result.totalScore
                })
        }

        this.emitLayoutChanged()
    }

    emitLayoutChanged() {
        this.engine.emit('layoutChanged', {
            layout: this.engine.context.getLayout().layoutNodes
        })
    }
}
