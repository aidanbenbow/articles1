import { LAYOUT } from "../constants/layoutConstants.js"
import { layoutHeadingBlock } from "./layoutHeadingBlock.js"
import { layoutParagraphBlock } from "./layoutParagraphBlock.js"
import { createLessonSectionNode } from "./nodeFactories/lessonSectionNode.js"

export function layoutLessonSection(
    
    articleNode,
    layout,
    section,
    currentY,
    x,
    width,
    padding,
    color,
    lesson,
    responsive
) {
    const blocks =
        section.blocks ||
        section.text ||
        []

    const children = []

    let y = currentY

    for (const block of blocks) {
        if (block.type === 'heading') {
            const result =
                layoutHeadingBlock(
                    articleNode,
                    section,
                    block,
                    y,
                    x,
                    width,
                    padding,
                    color,
                    responsive
                )

            children.push(result.node)
            y = result.nextY
        }

        else if (block.type === 'paragraph') {
            const result =
                layoutParagraphBlock(
                    articleNode,
                    section,
                    block,
                    y,
                    x,
                    width,
                    padding,
                    color,
                    responsive,
                    LAYOUT.typography
                )

            children.push(result.node)
            y = result.nextY
        }
    }

    const sectionNode =
        createLessonSectionNode({
            id:
                `${articleNode.id}-` +
                `${section.id}`,

            owner: articleNode.id,
            sectionId: section.id,

            x,
            worldY: currentY,

            width,
            height:
                Math.max(0, y - currentY),

            color,

            children
        })

    layout.layoutNodes.set(
        sectionNode.id,
        sectionNode
    )

    return y + 20
}