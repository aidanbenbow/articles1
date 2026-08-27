import { drawRect } from "../../draw/drawHelpers.js";
import { getScreenRect } from "../../modules/renderUtils.js";


// filepath: d:/articles1/client/engine/renderers/buttons/finishButton.js

export function renderFinishButton(ctx, node, viewport) {
    const rect = getScreenRect(node, viewport)
    
    drawRect(ctx, rect, { showSelection: true })
    
    ctx.fillStyle = '#000000'
    ctx.font = 'bold 18px Arial'
    
    const textWidth = ctx.measureText(node.text || '').width
    const textX = rect.x + rect.width / 2 - textWidth / 2
    
    ctx.fillText(
        node.text || 'Finish',
        textX,
        rect.y + 25
    )
}