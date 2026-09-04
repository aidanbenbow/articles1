import { DRAWING_CONSTANTS } from "../../constants/drawingConstants.js"
import { drawRect, drawText } from "../../draw/drawHelpers.js"
import { getScreenPosition } from "../../modules/renderUtils.js"

export function renderLessonTitle(ctx, node, viewport) {
    const rect = getScreenPosition(node, viewport)
    const width = node.width || 400
    const height = node.height || 60
    drawRect(ctx, { x: rect.x, y: rect.y, width, height }, {showSelection: true})
    drawText(ctx, node.text || 'Lesson Title', rect.x + 20, rect.y + height - 10, 'bold 24px Arial', DRAWING_CONSTANTS.colors.text, 'left')
   
}