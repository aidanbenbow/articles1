import { LAYOUT } from "../constants/layoutConstants.js"
import { createTextNode } from "./nodeFactories/textNode.js"


export function layoutSurveySection(layout,articleNode, section, currentY, x, width, padding, color, lesson, responsive) {
    
    const r = responsive.survey

    const survey = lesson.activities[section.id]
    const answered = survey.getResponse() !== null ? survey.getResponse() : null
    const feedback = answered !== null ? survey.getFeedback() : null
    
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
    
    const surveyRect = {
        id: `${articleNode.id}-${section.id}`,
        sectionId: section.id,
        surveyId: section.id,
        x,
        worldY: surveyTop,
        width,
        height: surveyHeight,
        padding: r.padding,
        color: '#e0e0e0',
        selected: false,
        question: section.question,
        type: 'survey',
        surveyType: section.surveyType,
        kind: 'lessonSection',
        sectionType: 'survey',
        options: section.options,
        surveyId: section.id,
        feedback,
        style: {
            radius: 8,
            shadowBlur: 4,
            shadowOffsetX: 0,
            borderWidth: 1,
            colors: LAYOUT.colors,
        }
    }
    layout.layoutNodes.set(surveyRect.id, surveyRect)

// const questionNode = {
//         id: `${articleNode.id}-${section.id}-question`,
//         sectionId: section.id,
//         surveyId: section.id,
//         x: contentX,
//         worldY: surveyTop + r.padding,
//         width: contentWidth,
//         height: r.questionHeight,
//         text: section.question,
//         padding: 0,
//         color: '#000000',
//         type: 'text',
//         kind: 'lessonSection',
//         sectionType: 'surveyQuestion',
//         typography: 'surveyQuestion'
//     }
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
    layout.layoutNodes.set(questionNode.id, questionNode)

    const responseNode = {
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
    }
    layout.layoutNodes.set(responseNode.id, responseNode)

    const optionsTop = surveyTop + r.padding + r.questionHeight + r.responseHeight
    for (let i = 0; i < section.options.length; i++) {
       
        const optionRect = {
            id: `${articleNode.id}-${section.id}-option-${i}`,
            sectionId: section.id,
            surveyId: section.id,
            x: contentX,
            worldY: optionsTop + i * (r.optionHeight + r.optionGap),
            width: contentWidth,
            height: r.optionHeight,
            padding,
            color: '#d0d0d0',
            selected: false,
            text: section.options[i],
            type: 'text',
            kind: 'lessonSection',
            sectionType: 'surveyOption',
            
            optionIndex: i,
            action: 'answerSurvey'
        }
        layout.layoutNodes.set(optionRect.id, optionRect)

       
    }
     if( feedback) {
            const feedbackY = optionsTop + optionsHeight + feedbackGap
            const feedbackNode = {
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
            }
            layout.layoutNodes.set(feedbackNode.id, feedbackNode)
        }
        return currentY + surveyHeight + r.sectionGap
    }
