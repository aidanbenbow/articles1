import { createQuizOptionNode } from "../nodeFactories/quizOptionNode.js"
import { resolveValue } from "./resolveValue.js"


export function buildQuizOptionNode(config, context) {
    const {
        metrics,
        owner,
        currentY,
        section,
        activity
    } = context
const optionIndex = resolveValue(config.optionIndex, context)
const answer = activity?.getAnswer?.(section.id)
    const node = createQuizOptionNode({
        id: config.id,
        owner: config.owner ?? owner,
        sectionId: section.id,
        quizId: section.id,

        optionIndex,
        
        x: config.x ?? context.contentX,
        worldY: config.worldY ?? currentY,
        width: config.width ?? context.contentWidth,
        height: config.height ?? metrics.quiz.optionHeight,

        text: resolveValue(config.text, context),
        answer: resolveValue(config.answer, context),
answered: Boolean(answer),
correct: answer?.correct === optionIndex,
selected: answer?.selected === optionIndex,
        color: resolveValue(config.color, context),
        padding: config.padding ?? 0,

        kind: config.kind ?? 'quizOption',
        sectionType: 'quizOption'
    })

    return {
        node,
        currentY: node.worldY + node.height + metrics.quiz.optionGap
    }
}