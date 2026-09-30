import { DRAWING_CONSTANTS } from "../../constants/drawingConstants.js"
import { drawRect, drawText } from "../../draw/drawHelpers.js"
import { getScreenPosition } from "../../modules/renderUtils.js"

export function renderLessonTitle(ctx, node, viewport, context) {
    const rect = getScreenPosition(node, viewport)
    const typography = context.typography?.[node.typography] || context.typography.heading
    const font = `${typography.fontWeight} ${typography.fontSize}px ${typography.fontFamily}`
    const width = node.width || 400
    const height = node.height || 60
    ctx.save()
    drawRect(ctx, { x: rect.x, y: rect.y, width, height }, {showSelection: false})
    drawText(ctx, node.text || 'Lesson Title', rect.x + 20, rect.y + height - 10, font, typography.color, 'left')
   ctx.restore()
}