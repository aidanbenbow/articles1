import { DRAWING_CONSTANTS } from "../../constants/drawingConstants.js"
import { drawRect } from "../../draw/drawHelpers.js"
import { getScreenPosition } from "../../modules/renderUtils.js"

export function renderLessonTitle(ctx, node, viewport) {
    const rect = getScreenPosition(node, viewport)
    drawRect(ctx, rect, {showSelection: true})
    ctx.fillStyle = DRAWING_CONSTANTS.colors.text
    ctx.font = 'bold 24px Arial'
    ctx.fillText(
        node.text || 'Lesson Title',
        rect.x + 20,
        rect.y + rect.height - 10
    )
}