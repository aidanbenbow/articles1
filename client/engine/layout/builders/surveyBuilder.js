
import { LAYOUT } from "../../constants/layoutConstants.js"
import { createSurveyNode } from "../nodeFactories/surveyNode.js"
import { createSurveyOptionNode } from "../nodeFactories/surveyOptionNode.js"
import { createTextNode } from "../nodeFactories/textNode.js"

export function buildSurveySectionNode(context) {
const {
        layout,
        metrics,
        articleNode,
        lesson,
        section,
        currentY
    } = context

    const r = metrics.survey
    const survey = lesson.activities?.[section.id]

    if (!survey) {
        return {
            node: null,
            currentY
        }
    }

    const answered = survey.getResponse?.()!==null? survey.getResponse() : null
    const feedback = answered !== null ? survey.getFeedback?.() : null
    const results = survey.getResults?.() ?? null
    const total =results?.totalResponses ?? 0
    const feedbackHeight = feedback ? r.feedbackHeight : 0
    const feedbackGap = feedback ? r.feedbackGap : 0
    const optionsCount = section.options.length
    const optionHeight = optionsCount * r.optionHeight + Math.max(0, optionsCount - 1) * r.optionGap
    const surveyHeight = r.padding*2+r.questionHeight + r.responseHeight + optionHeight + feedbackGap + feedbackHeight


    const surveyTop = currentY
    const x = metrics.padding
    const width = metrics.contentWidth
    const contentX = x + r.padding
    const contentWidth = width - r.padding*2
    const children = {
        question: null,
        response: null,
        options: [],
        feedback: null
    }

    const surveyNode = createSurveyNode({
        id: `${articleNode.id}-${section.id}`,
        sectionId: section.id,
        owner: 'lesson',
        surveyId: section.id,
        x,
        worldY: surveyTop,
        width,
        height: surveyHeight,
        padding: r.padding,
        color: '#cbb2b2',
        surveyType: section.surveyType,
        style:{
             radius: 8,
                shadowBlur: 4,
                shadowOffsetX: 0,
                borderWidth: 1,

                colors:
                    LAYOUT.colors 
        },
        children
    })

    const questionNode = createTextNode({
        id: `${articleNode.id}-${section.id}-question`,
        sectionId: section.id,
        owner: 'lesson',
        surveyId: section.id,
        x: contentX,
        worldY: surveyTop + r.padding,
        width: contentWidth,
        height: r.questionHeight,
        color: '#8e4141',
        text: section.question,
        padding: 0,
        kind: 'lessonSection',
        sectionType: 'surveyQuestion',
        typography: 'question',
    })
    children.question = questionNode

    const responseNode = createTextNode({
        id: `${articleNode.id}-${section.id}-response`,
        sectionId: section.id,
        owner: 'lesson',
        surveyId: section.id,
        x: contentX,
        worldY: surveyTop + r.padding + r.questionHeight,
        width: contentWidth,
        height: r.responseHeight,
        type:'surveyResponse',
        kind: 'lessonSection',
        sectionType: 'surveyResponse',
        typography: 'body',
        text: `Responses: ${total}`,
    })
    children.response = responseNode

    const optionsTop = surveyTop + r.padding + r.questionHeight + r.responseHeight

    children.options = section.options.map((option, index) => {
    const optionY =
        optionsTop +
        index * (r.optionHeight + r.optionGap)

    return createSurveyOptionNode({
        id: `${surveyNode.id}-option-${index}`,
        owner: 'lesson',
        sectionId: section.id,
        surveyId: section.id,
        x: contentX,
        worldY: optionY,
        width: contentWidth,
        height: r.optionHeight,
        optionIndex: index,

        children: {
            text: createTextNode({
                id: `${surveyNode.id}-option-${index}-text`,
                owner: 'lesson',
                sectionId: section.id,
                surveyId: section.id,
                x: contentX + 10,
                worldY: optionY,
                width: contentWidth - 20,
                height: r.optionHeight,
                text: option,
                kind: 'surveyOptionText',
                sectionType: 'surveyOptionText',
                typography: 'body'
            })
        }
    })
})

    if (feedback) {
        const feedbackY = optionsTop + optionHeight + feedbackGap
        children.feedback = createTextNode({
            id: `${articleNode.id}-${section.id}-feedback`,
            sectionId: section.id,
            owner: 'lesson',
            surveyId: section.id,
            x: contentX,
            worldY: feedbackY,
            width: contentWidth,
            height: feedbackHeight,
            color: '#9d2929',
            text: feedback,
            padding: 0,
            kind: 'lessonSection',
            sectionType: 'surveyFeedback',
            typography: 'body',
        })
    }

    layout.layoutNodes.set(
        surveyNode.id,
        surveyNode
    )
    const nexty= surveyNode.worldY + surveyNode.height + r.sectionGap
    return {
        node: surveyNode,
        currentY: nexty
    }
}