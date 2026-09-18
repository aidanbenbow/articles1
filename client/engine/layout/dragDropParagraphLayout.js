import { parseDragDropText } from "../parsers/dragDropText.js"

export function layoutDragDropParagraph(
    articleNode,
    layout,
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

            const textNode = {
                id: `${articleNode.id}-${section.id}-text-${paragraphIndex}-${cursorY}-${cursorX}`,

                sectionId: section.id,

                x: cursorX,
                worldY: cursorY,

                width: wordWidth,
                height: lineHeight,

                text: word,

                type: 'text',
                kind: 'lessonSection',

                sectionType: 'dragDropText',

                dragDropId: section.id
            }

            layout.layoutNodes.set(
                textNode.id,
                textNode
            )

            cursorX += wordWidth
        }
        } else if (part.type === 'gap') {

            const answer = answers?.[part.gapIndex] || ''

            const totalGapWidth = gapWidth + 5
            if (
                cursorX > x &&
                cursorX + totalGapWidth > rightEdge
            ) {
                moveToNextLine()
            }

            const gapNode = {
                id: `${articleNode.id}-${section.id}-gap-${paragraphIndex}-${part.gapIndex}`,

                sectionId: section.id,

                x: cursorX,
                worldY: cursorY,

                width: gapWidth,
                height: gapHeight,

                color: '#ffffff',

                text: answer,

                type: 'dropzone',
                kind: 'lessonSection',

                sectionType: 'dragDropGap',

                dragDropId: section.id,

                gapIndex: part.gapIndex,

                answer,

                action: 'dropDragDropWord'
            }

            layout.layoutNodes.set(
                gapNode.id,
                gapNode
            )

            cursorX += totalGapWidth
        }
    }
    return {
        height: lineCount * lineHeight,
        lineCount
    }
}