import { parseDragDropText } from "../parsers/dragDropText.js"
import { createDragDropGapNode } from "./nodeFactories/dragDropGapNode.js"
import { createTextNode } from "./nodeFactories/textNode.js"

export function layoutDragDropParagraph(
    articleNode, 
    section,
    paragraph,
    paragraphIndex,
    y,
    x,
    width,
    gapWidth,
    gapHeight,
    answers,
    responsive
) {
    const parts = parseDragDropText(paragraph)

    const lineHeight = responsive.dragDrop.paragraphLineHeight
    const paragraphGap = responsive.dragDrop.paragraphGap
    let cursorX = x
    let cursorY = y
    let lineCount = 1
    const rightEdge = x + width
const children = []
    function moveToNextLine() {
        cursorX = x
        cursorY += lineHeight + paragraphGap
        lineCount++
    }

    for (const part of parts) {
        if (part.type === 'text') {
            const words = part.text.split(/(\s+)/)
for (const word of words) {

                const wordWidth = word.length * 8
                if (
                    cursorX > x &&
                    cursorX + wordWidth > rightEdge
                ) {
                    moveToNextLine()
                }

            const textNode = createTextNode({
                id: `${articleNode.id}-${section.id}-paragraph-${paragraphIndex}-text-${children.length}`,
                owner: articleNode.id,
                sectionId: section.id,
                x: cursorX,
                worldY: cursorY,
                width: wordWidth,
                height: lineHeight,
                color: '#000000',
                text: word,
                kind: 'lessonSection',
                sectionType: 'dragDropParagraphText',
                typography: 'body'
            })
            textNode.dragDropId = section.id
            textNode.paragraphIndex = paragraphIndex
            children.push(textNode)

            cursorX += wordWidth
        }
        } else if (part.type === 'gap') {
const gapPadding = 5
            const answer = answers?.[part.gapIndex] ?? ''
const answerWidth = answer.length * 8
const actualGapWidth = Math.max(
    48,
    Math.min(
        gapWidth,
        answerWidth + gapPadding
    )
)
            const totalGapWidth = actualGapWidth + 5
            if (
                cursorX > x &&
                cursorX + totalGapWidth > rightEdge
            ) {
                moveToNextLine()
            }

            const gapNode = createDragDropGapNode({
                id: `${articleNode.id}-${section.id}-paragraph-${paragraphIndex}-gap-${children.length}`,
                owner: articleNode.id,
                sectionId: section.id,
                dragDropId: section.id,
                paragraphIndex,
                gapIndex: part.gapIndex,
                x: cursorX,
                worldY: cursorY,
                width: actualGapWidth,
                height: gapHeight,
                color: '#ffffff',
                text: '',
                answer,
                kind: 'lessonSection',
                sectionType: 'dragDropGap'
            })
            children.push(gapNode)

            cursorX += totalGapWidth
        }
    }
    const height =
        lineCount * lineHeight +
        Math.max(0, lineCount - 1) * paragraphGap

    const node = {
        id:
            `${articleNode.id}-` +
            `${section.id}-` +
            `paragraph-${paragraphIndex}`,

        sectionId: section.id,
        dragDropId: section.id,
        paragraphIndex,

        x,
        worldY: y,
        width,
        height,

        type: 'dragDropParagraph',
        kind: 'lessonSection',
        sectionType: 'dragDropParagraph',

        interactive: false,

        children
    }
    return {
        node,
        height,
        lineCount
    }
}