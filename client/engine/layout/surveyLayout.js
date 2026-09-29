import { LAYOUT } from "../constants/layoutConstants.js"
import { createSurveyNode } from "./nodeFactories/surveyNode.js"
import { createSurveyOptionNode } from "./nodeFactories/surveyOptionNode.js"
import { createTextNode } from "./nodeFactories/textNode.js"


export function layoutSurveySection(layout,articleNode, section, currentY, x, width, padding, color, lesson, responsive) {
    
    const r = responsive.survey

    const survey = lesson.activities[section.id]
    const answered = survey.getResponse() !== null ? survey.getResponse() : null
    const feedback = answered !== null ? survey.getFeedback() : null
    const total = survey.getResults()?.totalResponses || 0
    
    const feedbackHeight = feedback ? r.feedbackHeight : 0
    const feedbackGap = feedback ? r.feedbackGap : 0

    const optionsHeight = section.options.length * r.optionHeight + (section.options.length - 1) * r.optionGap
const surveyHeight =
     r.padding * 2 +
    r.questionHeight +
    r.responseHeight +
    optionsHeight
    + feedbackHeight + feedbackGap

    const surveyTop = currentY

     const contentX = x + r.padding
     const contentWidth = width - r.padding * 2    
    const children = {
        question: null,
        response: null,
        options: [],
        
    }
    const surveyNode = createSurveyNode({
    id: `${articleNode.id}-${section.id}`,
    owner: articleNode.id,

    sectionId: section.id,
    surveyId: section.id,

    x,
    worldY: surveyTop,
    width,
    height: surveyHeight,

    padding: r.padding,
    color: '#e0e0e0',

    surveyType: section.surveyType,

    style: {
        radius: 8,
        shadowBlur: 4,
        shadowOffsetX: 0,
        borderWidth: 1,
        colors: LAYOUT.colors
    },

    children
});
    layout.layoutNodes.set(surveyNode.id, surveyNode)

const questionNode = createTextNode({
        id: `${articleNode.id}-${section.id}-question`,
        sectionId: section.id,
        surveyId: section.id,
        x: contentX,
        worldY: surveyTop + r.padding,
        width: contentWidth,
        height: r.questionHeight,
        text: section.question,
        padding: 0,
        color: '#000000',
        type: 'text',
        kind: 'lessonSection',
        sectionType: 'surveyQuestion',
        typography: 'question'
    })
   // layout.layoutNodes.set(questionNode.id, questionNode)
children.question = questionNode

const responseNode = createTextNode({
        id: `${articleNode.id}-${section.id}-response`,
        sectionId: section.id,
        surveyId: section.id,
        x: contentX,
        worldY: surveyTop + r.padding + r.questionHeight,
        width: contentWidth,
        height: r.responseHeight,
        type: 'surveyResponse',
        kind: 'lessonSection',
        sectionType: 'surveyResponse',
        typography: 'body',
        text:`Responses: ${total}`
    })
   
   // layout.layoutNodes.set(responseNode.id, responseNode)
children.response = responseNode
    const optionsTop = surveyTop + r.padding + r.questionHeight + r.responseHeight

    const options = section.options.map((option, index) => {
    return createSurveyOptionNode({
        id: `${surveyNode.id}-option-${index}`,

        owner: surveyNode.id,
        sectionId: section.id,
        surveyId: section.id,

        x: x + padding,
        worldY: optionsTop + index * (r.optionHeight + r.optionGap),
        width: width - padding * 2,
        height: r.optionHeight,

        optionIndex: index,
       
        children: {
            text: createTextNode({
                id: `${surveyNode.id}-option-${index}-text`,
                owner: `${surveyNode.id}-option-${index}`,

                sectionId: section.id,
                surveyId: section.id,

                x: x + padding + 10,
                worldY: optionsTop + index * (r.optionHeight + r.optionGap),
                width: width - padding * 2 - 20,
                height: r.optionHeight,

                color: '#000',
                text: option,

                kind: 'surveyOptionText',
                sectionType: 'surveyOptionText',
                typography: 'body'
            })
        }
    });
});
children.options = options
   
     if( feedback) {
            const feedbackY = optionsTop + optionsHeight + feedbackGap

            const feedbackNode = createTextNode({
                id: `${articleNode.id}-${section.id}-feedback`,
                sectionId: section.id,
                surveyId: section.id,
                x: contentX,
                worldY: feedbackY,
                width: contentWidth,
                height: feedbackHeight,
                padding,
                color: '#f0f0f0',
                selected: false,
                text: feedback,
                type: 'text',
                kind: 'lessonSection',
                sectionType: 'surveyFeedback',
                typography: 'body',
            })
       
children.feedback = feedbackNode
        }
        return currentY + surveyHeight + r.sectionGap
    }
