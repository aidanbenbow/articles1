
import { createCardNode } from "../nodeFactories/cardNode.js"
import { createQuizOptionNode } from "../nodeFactories/quizOptionNode.js"
import { createTextNode } from "../nodeFactories/textNode.js"

export function buildQuizSectionNode( context) {
const {
    layout,
    metrics,
    articleNode,
    section,
    lesson,
    currentY
} = context

const quiz = metrics.quiz
const questionHeight = quiz.questionHeight
const optionHeight = quiz.optionHeight
const optionGap = quiz.optionGap
const feedbackHeight = quiz.feedbackHeight
const feedbackGap = quiz.feedbackGap
const padding = metrics.padding
const x = padding
const width = metrics.contentWidth
const quizTop = currentY 
const activity = lesson.activities?.[section.id] ?? null
const answers = activity?.getAnswers?.() ?? activity?.answers ?? {}
const feedback = activity?.getFeedback?.() ?? activity?.feedback ?? null
const hasAnswered = activity?.hasAnswered?.(section.id) ?? false
const hasFeedback = Boolean(feedback) && hasAnswered
const children = {
    question: null,
    options: [],
    feedback: null
}

children.question = createTextNode({
    id: `${articleNode.id}-${section.id}-question`,
    sectionId: section.id,
    owner: 'lesson',
    quizId: section.id,

    x: x+padding,
    worldY: quizTop+padding,
    width: width-padding*2,
    height: questionHeight,
    color: '#cbb2b2',
    text: section.question,
    padding: 0,
    kind: 'lessonSection',
    sectionType: 'quizQuestion',
    typography: 'body',
    
})

let optionY = quizTop + padding + questionHeight + optionGap

for(let i=0; i<section.options.length; i++) {
    const option = createQuizOptionNode({
        id: `${articleNode.id}-${section.id}-option-${i}`,
        sectionId: section.id,
        owner: 'lesson',
        quizId: section.id,
        optionIndex: i,
        x: x+padding,
        worldY: optionY,
        width: width-padding*2,
        height: optionHeight,
        color: '#d0d0d0',
        text: section.options[i],
        answer: section.answer,
        padding: 0,
        kind: 'lessonSection',
        sectionType: 'quizOption',
        typography: 'body',
    })
    children.options.push(option)
    optionY += optionHeight + optionGap
}

let quizHeight = padding * 2 + questionHeight +
 section.options.length * optionHeight + Math.max( 0,
            (section.options.length - 1) * optionGap)
        
      if(hasFeedback) {
        children.feedback = createTextNode({
            id: `${articleNode.id}-${section.id}-feedback`,
            sectionId: section.id,
            owner: 'lesson',
            quizId: section.id, 
            x: x+padding,
            worldY: optionY + feedbackGap,
            width: width-padding*2,
            height: feedbackHeight,
            color: '#cbb2b2',
            text: feedback,
            padding: 0,
            kind: 'lessonSection',
            sectionType: 'quizFeedback',
            typography: 'body',
        })
        quizHeight += feedbackGap + feedbackHeight
    }

    const quizNode = createCardNode({
        id: `${articleNode.id}-${section.id}-quiz`,
        sectionId: section.id,
        owner: 'lesson',
        type: 'quiz',
        x: x,
        worldY: quizTop,
        width: width,
        height: quizHeight,
        color: '#f0f0f0',
        padding: 0,
        kind: 'lessonSection',
        sectionType: 'quiz',
        children,
        style: {
                radius: 8,
                shadowBlur: 4,
                shadowOffsetY: 2,
                borderWidth: 1,

                colors: {
                    surface: '#ffffff',
                    border: '#cccccc',
                    shadow:
                        'rgba(0, 0, 0, 0.1)'
                }
            }
        })

        layout.layoutNodes.set(
            quizNode.id,
            quizNode
        )
const nextY = quizTop + quizHeight + metrics.gap
        return {
            node: quizNode,
            currentY: nextY
        }
    }
        
        