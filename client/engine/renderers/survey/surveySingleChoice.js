import { LAYOUT } from "../../constants/layoutConstants.js"
import { drawRect, drawTextBlock } from "../../draw/drawHelpers.js"
import { getScreenRect } from "../../modules/renderUtils.js"
import { renderCard } from "../CardRenderer.js"
import { renderText } from "../TextRenderer.js"
import { renderSurveyOption } from "./surveyOption.js"

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
    
     const surveyNode = section  
     const questionNode = surveyNode.children.question
     const responseNode = surveyNode.children.response
     const feedbackNode = surveyNode.children.feedback
    renderCard(ctx, surveyNode,viewport,surveyNode.style  )
renderText(ctx, questionNode, viewport, LAYOUT.typography)
  
    renderText(ctx, responseNode, viewport, LAYOUT.typography, `Responses: ${total}`)

    for(const optionNode of surveyNode.children.options) {
        renderSurveyOption(ctx, optionNode, viewport, lesson, assetManager, animations)
    }
    if(feedbackNode) {
        renderText(ctx, feedbackNode, viewport, LAYOUT.typography)
    }
}