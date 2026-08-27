import { drawRect, drawTextBlock } from "../../draw/drawHelpers.js"
import { getSurveyResult } from "../../helpers/surveyResults.js"
import { getScreenRect } from "../../modules/renderUtils.js"

export function renderSurveyOption(
    ctx,
    section,
    viewport,
    lesson
) {

    const rect = getScreenRect(section, viewport)


    const selected =
        lesson.surveyResponses?.[section.surveyId] === section.optionIndex

    const { votes, percentage } = getSurveyResult(
        lesson,
        section.surveyId,
        section.optionIndex
    )


    drawRect(ctx, {
        ...rect,
        color: selected
            ? '#b8f5b8'
            : '#d0d0d0'
    })

    // Percentage bar
    const barHeight = 6
    const barWidth =
        rect.width * (percentage / 100)

    ctx.fillStyle = '#23979d'

    ctx.fillRect(
        rect.x,
        rect.y + rect.height - barHeight,
        barWidth,
        barHeight
    )
    ctx.save()
if (selected) {
    ctx.font = 'bold 18px Arial'
    ctx.fillStyle = '#23979d'
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'

    ctx.fillText(
        '✓',
        rect.x + 12,
        rect.y + rect.height / 2
    )
}
    drawTextBlock(
        ctx,
        section.text,
        rect.x + 10,
        rect.y ,
        rect.width - 20,
        20
    )

      // Percentage
    ctx.font = 'bold 16px Arial'
    ctx.fillStyle = '#333'
    ctx.textAlign = 'right'
    ctx.textBaseline = 'middle'

    ctx.fillText(
        `${percentage}%`,
        rect.x + rect.width - 15,
        rect.y + rect.height / 2
    )

    // Vote count
    ctx.font = '12px Arial'
    ctx.fillStyle = '#777'

    ctx.fillText(
        `${votes} ${votes === 1 ? 'response' : 'responses'}`,
        rect.x + rect.width - 15,
        rect.y + rect.height / 2 + 18
    )
    ctx.restore()
}
