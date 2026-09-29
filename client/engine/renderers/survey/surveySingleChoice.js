
import { getScreenRect } from "../../modules/renderUtils.js"
import { renderCard } from "../CardRenderer.js"
import { renderText } from "../TextRenderer.js"
import { renderSurveyOption } from "./surveyOption.js"

export function renderSurveySingleChoice(
    ctx,
    node,
    viewport,
    context
) {
     const surveyNode = node  
     const questionNode = surveyNode.children.question
     const responseNode = surveyNode.children.response
     const feedbackNode = surveyNode.children.feedback
    renderCard(ctx, surveyNode,viewport,surveyNode.style  )
renderText(ctx, questionNode, viewport, context)
  
    renderText(ctx, responseNode, viewport, context)

    for(const optionNode of surveyNode.children.options) {
        renderSurveyOption(ctx, optionNode, viewport, context)
    }
    if(feedbackNode) {
        renderText(ctx, feedbackNode, viewport, context)
    }
}