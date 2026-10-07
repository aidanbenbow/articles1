
import { drawRect } from "../../draw/drawHelpers.js"
import { getSurveyResult } from "../../helpers/surveyResults.js"
import { getScreenRect } from "../../modules/renderUtils.js"


export function renderSurveyOption( ctx, node, viewport, context) {
    const rect = getScreenRect(node, viewport)
    const survey = context.lesson.activities?.[node.surveyId]
    const response = survey?.getResponse() || null
    const selected = response?.selected === node.optionIndex
    const { votes, percentage } = getSurveyResult( survey, node.optionIndex)
const progress =  context.animations?.getValue(`survey-answer-${node.surveyId}`) ?? 1
const animatedPercentage = percentage * progress

    drawRect(ctx, { ...rect, color: selected ? '#b8f5b8' : '#d0d0d0'})

    // Percentage bar
    const barHeight = 6
    const barWidth = rect.width * (animatedPercentage / 100)

    ctx.fillStyle = '#23979d'

    ctx.fillRect(rect.x, rect.y + rect.height - barHeight,barWidth,barHeight)
   
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
   
      // Percentage
    ctx.font = 'bold 16px Arial'
    ctx.fillStyle = '#333'
    ctx.textAlign = 'right'
    ctx.textBaseline = 'middle'

    ctx.fillText(
        `${Math.round(animatedPercentage)}%`,
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
