import { layoutDragDropParagraph } from "./dragDropParagraphLayout.js"

export function layoutDragDropSection(
    articleNode,
    layout,
    section,
    currentY,
    x,
    width,
    padding,
    color,
    lesson
) {
    const instructionHeight = 40

    const wordHeight = 40
    const wordGap = 8

    const paragraphLineHeight = 42
    const paragraphGap = 15

    const gapWidth = 110
    const gapHeight = 32

    const checkButtonHeight = 40
    const checkButtonGap = 15

    const feedbackHeight = 40
    const feedbackGap = 10

    const dragDropTop = currentY

    // --------------------------------
    // State
    // --------------------------------

    const state = lesson.getCurrentSectionState?.() || {}

    const wordbank =
        state?.getWordbank?.() ||
        section.wordbank ||
        []

    const answers =
        state?.getAnswers?.() ||
        {}

    // --------------------------------
    // Calculate wordbank height
    // --------------------------------

    const wordbankHeight =
        wordbank.length * wordHeight +
        Math.max(0, wordbank.length - 1) * wordGap

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

    const feedback =
        state?.getFeedback?.() || ''

    const actualFeedbackHeight =
        feedback ? feedbackHeight : 0

    const actualFeedbackGap =
        feedback ? feedbackGap : 0

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

    // --------------------------------
    // Main container
    // --------------------------------

    const dragDropRect = {
        id: `${articleNode.id}-${section.id}`,

        sectionId: section.id,

        x,
        worldY: dragDropTop,
        width,
        height: dragDropHeight,

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

    for (let i = 0; i < wordbank.length; i++) {

        const wordY =
            wordbankTop +
            i * (wordHeight + wordGap)

        const wordNode = {
            id: `${articleNode.id}-${section.id}-word-${i}`,

            sectionId: section.id,

            x: x + padding,
            worldY: wordY,

            width: width - padding * 2,
            height: wordHeight,

            padding: 10,

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
    }

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

    return dragDropTop + dragDropHeight + 10
}