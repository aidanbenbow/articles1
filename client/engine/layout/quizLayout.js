export function layoutQuizSection(layout,articleNode, section, currentY, x, width, padding, color, lesson) {
    const questionHeight = 30
    const optionHeight = 30
    const optionGap = 10
    const quizTop = currentY
    
    const answered = lesson.activities[section.id].answers || null
   const feedback = answered?.[section.id]?.feedback || null
   console.log('Layout quiz section:', section.id, 'Answered:', answered, 'Feedback:', feedback)
    const feedbackHeight = answered && feedback ? 30 : 0
    const feedbackGap = feedbackHeight > 0 ? 10 : 0
    
const quizHeight =
    padding * 2 +
    questionHeight +
    section.options.length * optionHeight
    + (section.options.length - 1) * optionGap
    + feedbackHeight + feedbackGap

    const feedbackY = quizTop + padding + questionHeight + section.options.length * (optionHeight + optionGap) + feedbackGap

    const quizRect = {
        id: `${articleNode.id}-${section.id}`,
        sectionId: section.id,
        x,
        worldY: quizTop,
        width,
        height: quizHeight,
        padding,
        color: '#e0e0e0',
        selected: false,
        question: section.question,
        type: 'quiz',
        kind: 'lessonSection',
        sectionType: 'quiz',
        options: section.options,
        answer: section.answer,
        quizId: section.id,

        feedback: feedback || '',
        feedbackHeight,
        feedbackY,
        feedbackX: x + padding,
        feedbackWidth: width - padding * 2
    }
    layout.layoutNodes.set(quizRect.id, quizRect)

    for (let i = 0; i < section.options.length; i++) {
        const optionRect = {
            id: `${articleNode.id}-${section.id}-option-${i}`,
            sectionId: section.id,
            x: x + padding,
            worldY: quizTop + padding + questionHeight + i * (optionHeight + optionGap),
            width: width - padding * 2,
            height: optionHeight,
            padding,
            color: '#d0d0d0',
            selected: false,
            text: section.options[i],
            type: 'text',
            kind: 'lessonSection',
            sectionType: 'quizOption',
            action: 'answerQuiz',
            quizId: section.id,
            optionIndex: i,
            answer: section.answer
        }
        layout.layoutNodes.set(optionRect.id, optionRect)
    }
    return currentY + quizHeight + 10
}