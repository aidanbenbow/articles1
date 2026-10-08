import { createSurveyOptionNode } from "../nodeFactories/surveyOptionNode.js"
import { resolveValue } from "./resolveValue.js"

export function buildSurveyOptionNode(config, context) {
    const {
        metrics,
        owner,
        currentY,
        section,
        activity
    } = context

    const optionIndex = resolveValue(config.optionIndex, context)
    const response = activity?.getResponse?.(section.id)
    const node = createSurveyOptionNode({
        id: config.id,
        owner: config.owner ?? owner,
        sectionId: section.id,
        surveyId: section.id,
        optionIndex,
        x: config.x ?? context.contentX,
        worldY: config.worldY ?? currentY,
        width: config.width ?? context.contentWidth,
        height: config.height ?? metrics.survey.optionHeight,
        text: resolveValue(config.text, context),
        response: resolveValue(config.response, context),
        answered: Boolean(response),
        selected: response?.selected === optionIndex,
        color: resolveValue(config.color, context),
        padding: config.padding ?? 0,
        kind: config.kind ?? 'surveyOption',
        sectionType: 'surveyOption'
    })

    return {
        node,
        currentY: node.worldY + node.height + metrics.survey.optionGap
    }
}