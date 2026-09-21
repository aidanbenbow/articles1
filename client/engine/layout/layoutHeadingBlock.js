import { createHeadingNode } from "./nodeFactories/headingNode.js"

export function layoutHeadingBlock(
    layout,
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
    console.log(responsive)
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

    layout.layoutNodes.set(
        node.id,
        node
    )

    return currentY + height + 10
}