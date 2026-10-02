import { LAYOUT } from "../constants/layoutConstants.js"
import { measureText } from "../helpers/textMeasure.js"
import { layoutDragDropParagraph } from "./dragDropParagraphLayout.js"
import { createButtonNode } from "./nodeFactories/buttonNode.js"
import { createDragDropNode } from "./nodeFactories/dragDropNode.js"
import { createDragDropWordNode } from "./nodeFactories/dragDropWordNode.js"
import { createTextNode } from "./nodeFactories/textNode.js"

export function layoutDragDropSection( articleNode,layout,section,currentY,x,width, padding, color, lesson, responsive
) {
    const {
        instructionHeight,
        wordHeight,
        wordGap,
        wordPaddingX,
        wordMinWidth,
       
        paragraphLineHeight,
        paragraphGap,
        gapWidth,
        gapHeight,
        checkButtonHeight,
        checkButtonGap,
        feedbackHeight,
        feedbackGap,
        sectionGap
    } = responsive.dragDrop

    const dragDropTop = currentY
const children = {
    instruction: null,
    wordbank: [],
    paragraphs: [],
    checkButton: null,
    feedback: null
}
    // --------------------------------
    // State
    // --------------------------------

    const state = lesson.activities?.[section.id] || null

    const wordbank = state?.getWordbank?.() ?? state.getWordbank() ?? section.wordbank ?? []

    const answers =state?.getAnswers?.() ?? state?.answers ?? {}

    // --------------------------------
    // Calculate paragraph height
    // --------------------------------

    const paragraphs = section.paragraphs || []

    // --------------------------------
    // Feedback
    // --------------------------------

    const feedback =state?.getFeedback?.() ?? null

    const actualFeedbackHeight =feedback ? feedbackHeight : 0

    const actualFeedbackGap =feedback ? feedbackGap : 0

    // --------------------------------
    // Instruction
    // --------------------------------

    const instructionY = dragDropTop + padding

   children.instruction = createTextNode({
        id: `${articleNode.id}-${section.id}-instruction`,
        sectionId: section.id,
        x: x + padding,
        worldY: instructionY,
        width: width - padding * 2,
        height: instructionHeight,
        text: section.instruction,
        color: '#000000',
        
        kind: 'lessonSection',
        sectionType: 'dragDropInstruction',
        typography: 'body'
    })

    // --------------------------------
    // Word bank
    // --------------------------------

    const wordbankTop = instructionY + instructionHeight + 8

        const availableWidth = width - padding * 2
        let wordX = x + padding
        let wordY = wordbankTop
        let wordRows = 1
        const wordTyporaphy = LAYOUT.typography.body

    for (let i = 0; i < wordbank.length; i++) {

        const word = wordbank[i]
        const textWidth = measureText(word, wordTyporaphy)

        const wordWidth = Math.max(
            wordMinWidth,
            textWidth + wordPaddingX * 2
        )

if (
        wordX !== x + padding &&
        wordX + wordWidth >
            x + padding + availableWidth
    ) {
        wordX = x + padding
        wordY += wordHeight + wordGap
        wordRows++
    }

        const wordNode = createDragDropWordNode({
            id: `${articleNode.id}-${section.id}-word-${i}`,
            sectionId: section.id,
            dragDropId: section.id,
            wordIndex: i,
            x: wordX,
            worldY: wordY,
            width: wordWidth,
            height: wordHeight,
            color: '#23979d',
            text: word,
            kind: 'lessonSection',
            sectionType: 'dragDropWord',
            type: 'dragDropWord',
            interactive: true,
        })
        children.wordbank.push(wordNode)
        wordX += wordWidth + wordGap
    }

    const wordbankHeight =
        wordRows * wordHeight +
        Math.max(0, wordRows - 1) * wordGap

    // --------------------------------
    // Paragraphs
    // --------------------------------

    const paragraphsTop =  wordbankTop +  wordbankHeight +  25

        let paragraphY = paragraphsTop
        let paragraphsHeight = 0

    for (let p = 0; p < paragraphs.length; p++) {
        const result = layoutDragDropParagraph(
            articleNode,      
            section,
            paragraphs[p],
            p,
            paragraphY,
            x + padding,
            width - padding * 2,
            gapWidth,
            gapHeight,
            answers,
            responsive
        )
        children.paragraphs.push(result.node)
        paragraphY += result.height

        if(p < paragraphs.length - 1) {
            paragraphY += paragraphGap
        }
        paragraphsHeight += result.height

        if(p < paragraphs.length - 1) {
            paragraphsHeight += paragraphGap
        }
    }

    // --------------------------------
    // Check button
    // --------------------------------

    const checkY = paragraphsTop + paragraphsHeight + checkButtonGap

    children.checkButton = createButtonNode({
        id: `${articleNode.id}-${section.id}-checkButton`,
        sectionId: section.id,
        x: x + padding,
        worldY: checkY,
        width: 120,
        height: checkButtonHeight,
        text: 'Check',
        color: '#000000',
        kind: 'lessonSection',
        sectionType: 'dragDropCheckButton',
        dragDropId: section.id,
        typography: 'body',
        action: 'checkDragDrop'
    })

    // --------------------------------
    // Feedback
    // --------------------------------

    if (feedback) {
        const feedbackY = checkY + checkButtonHeight + feedbackGap

        children.feedback = createTextNode({
            id: `${articleNode.id}-${section.id}-feedback`,
            sectionId: section.id,
            x: x + padding,
            worldY: feedbackY,
            width: width - padding * 2,
            height: feedbackHeight,
            text: feedback,
            color: '#000000',
            kind: 'lessonSection',
            sectionType: 'dragDropFeedback',
            dragDropId: section.id,
            typography: 'body'
        })
    }

    // --------------------------------
    // Total height
    // --------------------------------

    const dragDropHeight =
        padding * 2 +
        instructionHeight +
        15 +
        wordbankHeight +
        25 +
        paragraphsHeight +
        checkButtonGap +
        checkButtonHeight +
        actualFeedbackGap +
        actualFeedbackHeight

     const dragDropNode = createDragDropNode({
        id: `${articleNode.id}-${section.id}`,
        sectionId: section.id,
        dragDropId: section.id,

        x,
        worldY: dragDropTop,
        width,
        height: dragDropHeight,

        padding,
        color: color || '#e0e0e0',

        wordbank,
        answers,

        children
    })

    layout.layoutNodes.set(
        dragDropNode.id,
        dragDropNode
    )

    return dragDropTop + dragDropHeight + sectionGap
}