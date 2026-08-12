export function layoutParagraphBlock(
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
    const lineHeight = 22
    const textWidth = width - padding * 2

    // Approximate height.
    // Ideally use the same wrapping logic as the renderer.
    const words = block.text.split(' ')
    const lines = []

    let line = ''

    for (const word of words) {
        const test =
            line
                ? `${line} ${word}`
                : word

        // Rough estimate for layout.
        const estimatedWidth =
            test.length * 8

        if (
            estimatedWidth > textWidth &&
            line
        ) {
            lines.push(line)
            line = word
        } else {
            line = test
        }
    }

    if (line) {
        lines.push(line)
    }

    const height =
        Math.max(lines.length, 1) *
        lineHeight +
        padding * 2

    const node = {
        id: `${articleNode.id}-${section.id}-paragraph-${currentY}`,
        sectionId: section.id,
        x,
        worldY: currentY,
        width,
        height,
        color,
        text: block.text,
        kind: 'lessonSection',
        type: 'text',
        sectionType: 'lessonParagraph',
        padding
    }

    layout.layoutNodes.set(
        node.id,
        node
    )

    return currentY + height + 12
}