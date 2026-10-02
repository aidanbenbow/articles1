import { LAYOUT } from "../constants/layoutConstants.js"
import { measureText } from "../helpers/textMeasure.js"
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
    function placeItem(itemWidth) { if (cursorX > x && cursorX + itemWidth > rightEdge) { moveToNextLine() } }

    for (const part of parts) {
        if (part.type === 'text') {
            const words = part.text.split(/(\s+)/)
for (const word of words) {
const isWhitespace = /^\s+$/.test(word) 
if (isWhitespace) { 
    if (cursorX > x) { const spaceWidth = measureText(" ", LAYOUT.typography.body)
        if (cursorX + spaceWidth <= rightEdge) { cursorX += spaceWidth } } continue }
                const wordWidth = measureText(word, LAYOUT.typography.body)
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
const gapPaddingX = 10
            const currentAnswer = answers?.[part.gapIndex] ?? ''

const correctAnswer = section.answers?.[part.gapIndex] ?? ''

const answerWidth = measureText(correctAnswer, LAYOUT.typography.body)

const actualGapWidth = Math.max(
    48,  answerWidth + gapPaddingX*2)
            const totalGapWidth = actualGapWidth + 5
            placeItem(totalGapWidth)

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
                correctAnswer,
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