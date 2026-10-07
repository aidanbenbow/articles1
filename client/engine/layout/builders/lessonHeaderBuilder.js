import { createLessonHeaderNode } from "../nodeFactories/lessonHeaderNode.js"

export function buildLessonHeaderNode(config, context) {
    const {
        layout,
        metrics,
        owner,
        currentY
    } = context

    const header = metrics.lessonHeader

    const node = createLessonHeaderNode({
        id: config.id,
        owner: config.owner ?? owner,
        x: config.x ?? metrics.padding,
        worldY: config.worldY ?? currentY,
        width: config.width ?? metrics.contentWidth,
        height: config.height ?? header.height,
        sectionId: config.sectionId ?? null
    })
    
    layout.layoutNodes.set(
        node.id,
        node
    )

    return {
        node,

        currentY:
            node.worldY +
            node.height +
            header.bottomGap
    }
}