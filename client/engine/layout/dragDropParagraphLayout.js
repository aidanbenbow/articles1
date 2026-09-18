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
    answers
) {
    const parts = parseDragDropText(paragraph)

    let cursorX = x

    for (const part of parts) {

        if (part.type === 'text') {

            const textNode = {
                id: `${articleNode.id}-${section.id}-text-${paragraphIndex}-${cursorX}`,

                sectionId: section.id,

                x: cursorX,
                worldY: y,

                width: part.text.length * 8,
                height: 32,

                text: part.text,

                type: 'text',
                kind: 'lessonSection',

                sectionType: 'dragDropText',

                dragDropId: section.id
            }

            layout.layoutNodes.set(
                textNode.id,
                textNode
            )

            cursorX += textNode.width

        } else if (part.type === 'gap') {

            const answer =
                answers?.[part.gapIndex] || ''

            const gapNode = {
                id: `${articleNode.id}-${section.id}-gap-${part.gapIndex}`,

                sectionId: section.id,

                x: cursorX,
                worldY: y,

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

            cursorX += gapWidth + 5
        }
    }
}