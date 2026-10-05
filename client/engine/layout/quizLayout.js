import { createTextNode } from "./nodeFactories/textNode.js"
import { createQuizOptionNode } from "./nodeFactories/quizOptionNode.js"
import { createCardNode } from "./nodeFactories/cardNode.js"

export function layoutQuizSection(layout,articleNode, section, currentY, x, width, padding, color, lesson, responsive) {
    const questionHeight = responsive.quiz.questionHeight || 60
    const optionHeight = responsive.quiz.optionHeight || 40
    const optionGap = responsive.quiz.optionGap || 10
    const quizTop = currentY
    
   
    const feedbackHeight = responsive.quiz.feedbackHeight || 0
    const feedbackGap = responsive.quiz.feedbackGap || 0

    const activity =
        lesson.activities?.[section.id] ?? null

    const answers =
        activity?.getAnswers?.() ??
        activity?.answers ??
        {}

    const feedback =
        activity?.getFeedback?.() ??
        activity?.feedback ??
        null

   const hasAnswered =
    activity?.hasAnswered?.(section.id) ?? false

const hasFeedback =
    hasAnswered && Boolean(feedback)

    const children = {
        question: null,
        options: [],
        feedback: null
    }
    
children.question = createTextNode({
        id: `${articleNode.id}-${section.id}-question`,
        sectionId: section.id,
        owner: articleNode.id,
        quizId: section.id,
        x: x + padding,
        worldY: quizTop + padding,
        width: width - padding * 2,
        height: questionHeight,
        color: '#cbb2b2',
        text: section.question,
        padding: 0,
        
        kind: 'lessonSection',
        sectionType: 'quizQuestion',
        typography: 'body'
    })

    let optionY = quizTop + padding + questionHeight + optionGap

    for (let i = 0; i < section.options.length; i++) {
        const option = createQuizOptionNode({
            id: `${articleNode.id}-${section.id}-option-${i}`,
            sectionId: section.id,
            owner: articleNode.id,
            quizId: section.id,
            optionIndex: i,
            x: x + padding,
            worldY: optionY,
            width: width - padding * 2,
            height: optionHeight,
            color: '#d0d0d0',
            text: section.options[i],
            answer: section.answer,
            padding: 0,
            typography: 'body',
            kind: 'lessonSection',
            sectionType: 'quizOption'
        })
        children.options.push(option)
        optionY += optionHeight + optionGap
    }

let quizHeight =
    padding * 2 +
    questionHeight +
    section.options.length * optionHeight
    + Math.max(0, (section.options.length - 1) * optionGap)

    if(hasFeedback) {
        children.feedback = createTextNode({
            id: `${articleNode.id}-${section.id}-feedback`,
            sectionId: section.id,
            owner: articleNode.id,
            quizId: section.id,
            x: x + padding,
            worldY: quizTop + padding + questionHeight + section.options.length * (optionHeight + optionGap) + feedbackGap,
            width: width - padding * 2,
            height: feedbackHeight,
            color: '#635454',
            text: feedback,
            padding: 0,
            kind: 'lessonSection',
            sectionType: 'quizFeedback',
            typography: 'body'
        })
        quizHeight += feedbackGap + feedbackHeight
    }


    const quizNode = createCardNode({
        id: `${articleNode.id}-${section.id}-quiz`,
        sectionId: section.id,
        owner: articleNode.id,
        type: 'quiz',
        x,
        worldY: quizTop,
        width,
        height: quizHeight,
        color: '#ffffff',
        padding,
        kind: 'lessonSection',
        sectionType: 'quiz',
        children,
        style: {
            radius: 8,
            shadowBlur: 4,
            shadowOffsetY: 2,
            borderWidth: 1,
            colors: {
                background: '#ffffff',
                border: '#cccccc',
                shadow: 'rgba(0, 0, 0, 0.1)'
            }
        }
    })
    layout.layoutNodes.set(quizNode.id, quizNode)

    return currentY + quizHeight + 10
}