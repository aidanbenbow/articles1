import { DRAWING_CONSTANTS } from "../../constants/drawingConstants.js"
import { drawText, drawTextBlock } from "../../draw/drawHelpers.js"
import { getScreenPosition } from "../../modules/renderUtils.js"

export function renderParagraph(ctx, node,state, viewport, lesson) {
    const rect = getScreenPosition(node, viewport)

    const sectionState =   lesson.getSectionState(node.sectionId)

    // if (sectionState === 'locked') {
    //     drawRect(ctx, {
    //         ...rect,
    //         color: '#eeeeee'
    //     })
    //     ctx.fillStyle = '#999'
    //     ctx.fillText(
    //         'Complete previous sections',
    //         rect.x + 20,
    //         rect.y + 30
    //     )
       
    //     return
    // }

    drawTextBlock(ctx,node.text, rect.x + 20, rect.y + 20, node.width - 40,22 )

    // if(sectionState === 'current') {
    //     ctx.strokeStyle = '#00aa00'
    //     ctx.strokeRect(  rect.x,  rect.y,  rect.width,  rect.height)
    // }
}