import { layoutDragDropParagraph } from "./dragDropParagraphLayout.js"

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

    // --------------------------------
    // State
    // --------------------------------

    const state = lesson.getCurrentSectionState?.() || {}

    const wordbank = state?.getWordbank?.() || section.wordbank || []

    const answers =state?.getAnswers?.() || {}

   

    // --------------------------------
    // Calculate paragraph height
    // --------------------------------

    const paragraphs = section.paragraphs || []

    const paragraphsHeight =
        paragraphs.length * paragraphLineHeight +
        Math.max(0, paragraphs.length - 1) * paragraphGap

    // --------------------------------
    // Feedback
    // --------------------------------

    const feedback =state?.getFeedback?.() || ''

    const actualFeedbackHeight =feedback ? feedbackHeight : 0

    const actualFeedbackGap =feedback ? feedbackGap : 0

    

       // --------------------------------
    // Main container
    // --------------------------------

    const dragDropRect = {
        id: `${articleNode.id}-${section.id}`,

        sectionId: section.id,

        x,
        worldY: dragDropTop,
        width,
        height: 0,

        padding,

        color: color || '#e0e0e0',

        type: 'dragdrop',
        kind: 'lessonSection',
        sectionType: 'dragdrop',

        dragDropId: section.id,

        instruction: section.instruction,

        wordbank,
        answers
    }

    layout.layoutNodes.set(
        dragDropRect.id,
        dragDropRect
    )

    // --------------------------------
    // Instruction
    // --------------------------------

    const instructionY =
        dragDropTop + padding

    const instructionNode = {
        id: `${articleNode.id}-${section.id}-instruction`,

        sectionId: section.id,

        x: x + padding,
        worldY: instructionY,

        width: width - padding * 2,
        height: instructionHeight,

        text: section.instruction,

        type: 'text',
        kind: 'lessonSection',
        sectionType: 'dragDropInstruction',

        dragDropId: section.id
    }

    layout.layoutNodes.set(
        instructionNode.id,
        instructionNode
    )

    // --------------------------------
    // Word bank
    // --------------------------------

    const wordbankTop =
        instructionY +
        instructionHeight +
        15

        const availableWidth = width - padding * 2
        let wordX = x + padding
        let wordY = wordbankTop
        let wordRows = 1

    for (let i = 0; i < wordbank.length; i++) {

        const word = wordbank[i]

        const wordWidth = Math.max(
            wordMinWidth,
            word.length * 8 + wordPaddingX * 2
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

        const wordNode = {
            id: `${articleNode.id}-${section.id}-word-${i}`,

            sectionId: section.id,

            x: wordX,
            worldY: wordY,

            width: wordWidth,
            height: wordHeight,

            padding: wordPaddingX,

            color: '#d0d0d0',

            text: wordbank[i],
            word: wordbank[i],

            type: 'draggable',
            kind: 'lessonSection',

            sectionType: 'dragDropWord',

            dragDropId: section.id,

            wordIndex: i,

            action: 'dragDropWord'
        }

        layout.layoutNodes.set(
            wordNode.id,
            wordNode
        )
        wordX += wordWidth + wordGap
    }

    const wordbankHeight =
        wordRows * wordHeight +
        Math.max(0, wordRows - 1) * wordGap

    // --------------------------------
    // Paragraphs
    // --------------------------------

    const paragraphsTop =
        wordbankTop +
        wordbankHeight +
        25

    for (let p = 0; p < paragraphs.length; p++) {

        const paragraph = paragraphs[p]

        const paragraphY =
            paragraphsTop +
            p * (paragraphLineHeight + paragraphGap)

        layoutDragDropParagraph(
            articleNode,
            layout,
            section,
            paragraph,
            p,
            paragraphY,
            x + padding,
            width - padding * 2,
            gapWidth,
            gapHeight,
            answers
        )
    }

    // --------------------------------
    // Check button
    // --------------------------------

    const checkY =
        paragraphsTop +
        paragraphsHeight +
        checkButtonGap

    const checkNode = {
        id: `${articleNode.id}-${section.id}-check`,

        sectionId: section.id,

        x: x + padding,
        worldY: checkY,

        width: width - padding * 2,
        height: checkButtonHeight,

        color: '#b0b0b0',

        type: 'button',
        kind: 'lessonSection',

        sectionType: 'dragDropCheck',

        dragDropId: section.id,

        action: 'checkDragDrop',

        text: 'Check answer'
    }

    layout.layoutNodes.set(
        checkNode.id,
        checkNode
    )

    // --------------------------------
    // Feedback
    // --------------------------------

    if (feedback) {

        const feedbackY =
            checkY +
            checkButtonHeight +
            feedbackGap

        const feedbackNode = {
            id: `${articleNode.id}-${section.id}-feedback`,

            sectionId: section.id,

            x: x + padding,
            worldY: feedbackY,

            width: width - padding * 2,
            height: feedbackHeight,

            text: feedback,

            type: 'text',
            kind: 'lessonSection',

            sectionType: 'dragDropFeedback',

            dragDropId: section.id
        }

        layout.layoutNodes.set(
            feedbackNode.id,
            feedbackNode
        )
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

     dragDropRect.height = dragDropHeight

    return dragDropTop + dragDropHeight + sectionGap
}