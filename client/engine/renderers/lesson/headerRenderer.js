import { DRAWING_CONSTANTS } from "../../constants/drawingConstants.js"
import { drawText } from "../../draw/drawHelpers.js"
import { getScreenPosition } from "../../modules/renderUtils.js"

export function renderHeading( ctx, node, state, viewport) {
    const rect = getScreenPosition(  node,viewport)

    let icon = ''

switch (state) {
    case 'completed':
        icon = '✓'
        break
    case 'current':
        icon = '▶'
        break
    case 'locked':
        icon = '○'
        break
}ctx.save()
 
    // Draw the text
    drawText(ctx, 
         `${icon} ${node.text}`,
        rect.x+15, rect.y + 20,
         'bold 20px sans-serif',
         DRAWING_CONSTANTS.colors.text,
            'left',
    )

ctx.restore()
}