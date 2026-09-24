import { LAYOUT } from "../../constants/layoutConstants.js"
import { drawRect, drawTextBlock } from "../../draw/drawHelpers.js"
import { getScreenRect } from "../../modules/renderUtils.js"
import { renderCard } from "../CardRenderer.js"
import { renderText } from "../TextRenderer.js"

export function renderSurveySingleChoice(
    ctx,
    section,
    state,
    viewport,
   lesson, assetManager, animations, surveys
) {
    const rect = getScreenRect(section, viewport)
     const survey = lesson.activities?.[section.surveyId]
    const response = survey?.getResponse() || null
    const results = survey?.getResults() || {}
    const total = results.totalResponses || 0
    const feedback = survey?.getFeedback() || null
    
     const surveyBack = surveys[0].survey  
     const surveyQuestion = surveys[0].question
     console.log(surveys)
    renderCard(ctx, surveyBack,viewport,surveyBack.style  )
renderText(ctx, surveyQuestion, viewport, LAYOUT.typography)
  
    drawTextBlock(  ctx,  `${total} responses`,  section.responseX, section.responseY, section.responseWidth, 16)
    

    if (response) {
        drawTextBlock(  ctx, feedback,  section.feedbackX, section.feedbackY, section.feedbackWidth, 16)
    }
}