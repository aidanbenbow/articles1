import { drawRect, drawTextBlock } from "../../draw/drawHelpers.js"
import { getScreenRect } from "../../modules/renderUtils.js"

export function renderSurveySingleChoice(
    ctx,
    section,
    state,
    viewport,
   lesson
) {

    const rect = getScreenRect(section, viewport)

     const survey = lesson.activities?.[section.surveyId]

    const response = survey?.getResponse() || null
    const results = survey?.getResults() || {}

    const total = results.totalResponses || 0
        
    drawRect(ctx, rect, {
        showSelection: true
    })


    drawTextBlock(
        ctx,
        section.question,
        section.questionX,
        section.questionY,
        section.questionWidth,
        22
    )


    drawTextBlock(
        ctx,
        `${total} responses`,
        section.responseX,
        section.responseY,
        section.responseWidth,
        16
    )

    if (response) {
        drawTextBlock(
            ctx,
            response.feedback,
            section.feedbackX,
            section.feedbackY,
            section.feedbackWidth,
            16
        )
    }
}