import { renderSurveySingleChoice } from "./surveySingleChoice.js"

export function renderSurvey(ctx, node, viewport, context) {
    switch (node.surveyType) {
        case 'single':
            renderSurveySingleChoice(
                ctx,
                node,
                viewport,
                context
            )
            break

        case 'multiple':
            renderSurveyMultipleChoice(
                ctx,
                node,
                viewport,
                context
            )
            break

        default:
            console.warn(
                'Unknown survey type:',
                node.surveyType
            )
    }
}