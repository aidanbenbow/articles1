import { createHeadingNode } from "./nodeFactories/headingNode.js"

export function layoutHeadingBlock(
    
    articleNode,
    section,
    block,
    currentY,
    x,
    width,
    padding,
    color,
    responsive
) {
    
    const { height, gap } = responsive.heading

    const node = createHeadingNode(
        `${articleNode.id}-${section.id}-heading-${currentY}`,
        section.id,
        x,
        currentY,
        width,
        height,
        color,
        block.text,
        padding
    )

    node.owner = articleNode.id
    node.type = 'heading'
    node.sectionType = 'lessonHeading'

    return {
        node,
        nextY: currentY + height + gap
    }
}