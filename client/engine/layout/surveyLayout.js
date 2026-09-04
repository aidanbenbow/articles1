export function layoutSurveySection(layout,articleNode, section, currentY, x, width, padding, color, lesson) {
    const questionHeight = 30
    const responseHeight = 20
    const optionHeight = 30
    const optionGap = 10
    const surveyTop = currentY

    const survey = lesson.activities[section.id]
    const answered = survey.getResponse() !== null ? survey.getResponse() : null
    const feedbackHeight = answered !== null && section.feedback ? 30 : 0
    const feedbackGap = feedbackHeight > 0 ? 10 : 0

const surveyHeight =
    padding * 2 +
    questionHeight +
    responseHeight +
    section.options.length * optionHeight
    + (section.options.length - 1) * optionGap 
    + feedbackHeight + feedbackGap

    const feedbackY = surveyTop + padding + questionHeight + responseHeight + section.options.length * (optionHeight + optionGap) + feedbackGap

     const questionX = x + padding
    const questionY = surveyTop + padding
    const responseX = x + width - width/4 - padding
    const responseY = questionY 
    const questionWidth = width - padding * 2
    const responseWidth = 100

    const surveyRect = {
        id: `${articleNode.id}-${section.id}`,
        sectionId: section.id,
        x,
        worldY: surveyTop,
        width,
        height: surveyHeight,
        padding,
        color: '#e0e0e0',
        selected: false,
        question: section.question,
        type: 'survey',
        surveyType: section.surveyType,
        kind: 'lessonSection',
        sectionType: 'survey',
        options: section.options,
        surveyId: section.id,

        questionX,
        questionY,
        questionWidth,
        responseX,
        responseY,
        responseWidth,

        feedback: section.feedback || '',
        feedbackHeight,
        feedbackY,
        feedbackX: x + padding,
        feedbackWidth: width - padding * 2
    }
    layout.layoutNodes.set(surveyRect.id, surveyRect)
    for (let i = 0; i < section.options.length; i++) {
        const optionY =
    surveyTop +
    padding +
    questionHeight +
    responseHeight +
    i * (optionHeight + optionGap)

        const optionRect = {
            id: `${articleNode.id}-${section.id}-option-${i}`,
            sectionId: section.id,
            x: x + padding,
            worldY: optionY,
            width: width - padding * 2,
            height: optionHeight,
            padding,
            color: '#d0d0d0',
            selected: false,
            text: section.options[i],
            type: 'text',
            kind: 'lessonSection',
            sectionType: 'surveyOption',
            surveyId: section.id,
            optionIndex: i,
            action: 'answerSurvey'
        }
        layout.layoutNodes.set(optionRect.id, optionRect)
    }
    return currentY + surveyHeight + 10
}
