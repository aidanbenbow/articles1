export function layoutHeadingBlock(
    layout,
    articleNode,
    section,
    block,
    currentY,
    x,
    width,
    padding,
    color
) {
    const height = 45

    const node = {
        id: `${articleNode.id}-${section.id}-heading-${currentY}`,
        sectionId: section.id,
        x,
        worldY: currentY,
        width,
        height,
        color,
        text: block.text,
        kind: 'lessonSection',
        type: 'text',
        sectionType: 'lessonHeading',
        padding
    }

    layout.layoutNodes.set(
        node.id,
        node
    )

    return currentY + height + 10
}