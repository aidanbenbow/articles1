import { LAYOUT } from "../constants/layoutConstants.js"
import { getScreenRect, } from "../modules/renderUtils.js"
import { renderButton } from "./buttons/buttonRenderer.js"
import { renderLessonTitle } from "./lesson/lessonTitleRenderer.js"
import { renderText } from "./TextRenderer.js"


export function renderLessonIntro(ctx, view, viewport) {

   const titleNode = view.lessonTitleNodes[0]
   const descriptionNode = view.lessonDescriptionNodes[0]
   const statsNode = view.lessonStatsNodes[0]
   const buttonNode = view.buttonNodes.find(node => node.kind === 'lessonStartButton')

   if(titleNode) {
       renderText(ctx, titleNode, viewport, LAYOUT.typography)
   }
    if(descriptionNode) {
        renderText(ctx, descriptionNode, viewport, LAYOUT.typography)
    }
    if(statsNode) {
        renderText(ctx, statsNode, viewport, LAYOUT.typography)
    }
    if(buttonNode) {
        renderButton(ctx, buttonNode, viewport)
    }
}


 
export function getWrappedLines(ctx, text, maxWidth) {

    const words = text.split(' ')
    const lines = []

    let line = ''

    for (let n = 0; n < words.length; n++) {

        const testLine = line + words[n] + ' '
        const testWidth = ctx.measureText(testLine).width

        if (testWidth > maxWidth && n > 0) {
            lines.push(line.trim())
            line = words[n] + ' '
        } else {
            line = testLine
        }
    }

    if (line) {
        lines.push(line.trim())
    }

    return lines
}