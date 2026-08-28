import { DRAWING_CONSTANTS } from "../../constants/drawingConstants.js"
import { drawRect, drawText } from "../../draw/drawHelpers.js"
import { getScreenPosition } from "../../modules/renderUtils.js"

export function renderBrowseAllLessons(
    ctx,
    node,
    viewport
) {

    const rect = getScreenPosition(node,viewport)

    if (!rect)  return
    
    const { x,y,} = rect
const width = node.width || 600
const height = node.height || 160
    const radius = 16

    drawRect(
        ctx,
        { x, y, width, height, radius },
        { showSelection: true }
    )

    ctx.save()
   drawText( ctx, node.text || 'Browse All Lessons',
        x + width / 2,
        y + height / 2,
        DRAWING_CONSTANTS.fonts.button,
        DRAWING_CONSTANTS.colors.buttonText
    )


    /*
     * Arrow
     */
drawText(
        ctx,
        '→',
        x + width - 40,
        y + height / 2,
        DRAWING_CONSTANTS.fonts.button,
        DRAWING_CONSTANTS.colors.accent
    )

    ctx.restore()
}