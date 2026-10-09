import { LAYOUT } from "../constants/layoutConstants.js"
import { measureText } from "../helpers/textMeasure.js"
import { parseDragDropText } from "../parsers/dragDropText.js"
import { createDragDropGapNode } from "./nodeFactories/dragDropGapNode.js"
import { createTextNode } from "./nodeFactories/textNode.js"

export function layoutDragDropParagraph({
    id,
    owner,
    section,
    paragraph,
    paragraphIndex,
    x,
    y,
    width,
    gapHeight,
    answers={},
    metrics,
}
) {
    const {paragraphLineHeight:lineHeight, paragraphGap} = metrics.dragDrop
    const parts = parseDragDropText(paragraph)

    let cursorX = x
    let cursorY = y
    let lineCount = 1
    const rightEdge = x + width
    const horizontalGap = 4 
    const actualGapHeight = gapHeight ?? 32
const children = []
    function moveToNextLine() {
        cursorX = x
        cursorY += lineHeight + paragraphGap
        lineCount++
    }
    function placeItem(itemWidth) { if (cursorX > x && cursorX + itemWidth > rightEdge) { moveToNextLine() } }

   function addText(word) {
        const wordWidth = measureText(word, LAYOUT.typography.body)
         placeItem(wordWidth)
            const textNode = createTextNode({
                id: `${id}-${section.id}-text-${children.length}`,
                owner: owner,
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
        function addGap(gapIndex) {
const gapPaddingX = 10
            const currentAnswer = answers?.[gapIndex] ?? ''

const correctAnswer = section.answers?.[gapIndex] ?? ''

const answerWidth = measureText(correctAnswer, LAYOUT.typography.body)

const actualGapWidth = Math.max(
    48,  answerWidth + gapPaddingX*2)
            placeItem(actualGapWidth)

placeItem(actualGapWidth + horizontalGap+actualGapHeight)
            const gapNode =createDragDropGapNode({
                id: `${id}-${id}-gap-${gapIndex}`,
                owner: owner,
                sectionId: section.id,
                dragDropId: section.id,
                paragraphIndex,
                gapIndex,
                x: cursorX,
                worldY: cursorY,
                width: actualGapWidth,
                height: gapHeight,
                color: '#ffffff',
                text: currentAnswer,
                correctAnswer,
                kind: 'lessonSection',
                sectionType: 'dragDropGap'
            })
           children.push(gapNode)

            cursorX += actualGapWidth
        }
    for (const part of parts) {
        if (part.type === "gap") {
            addGap(part.gapIndex)
            continue
        }

        const words = part.text.split(/(\s+)/)

        for (const word of words) {
            if (/^\s+$/.test(word)) {
                if (cursorX > x) {
                    const spaceWidth = measureText(
                        " ",
                        LAYOUT.typography.body
                    )

                    if (cursorX + spaceWidth <= rightEdge) {
                        cursorX += spaceWidth
                    }
                }

                continue
            }

            if (word) addText(word)
        }
    }

    const bottom = children.reduce( (maxY, child) => Math.max(maxY, child.worldY + child.height), y ) 
    const height = bottom - y

    const node = {
        id: `${id}-${section.id}-paragraph-${paragraphIndex}`,
owner,
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
    console.log('layoutDragDropParagraph', node)
    return {
        node,
        height,
        lineCount
    }
}