import { DRAWING_CONSTANTS } from "../../constants/drawingConstants.js"
import { drawText } from "../../draw/drawHelpers.js"
import { getScreenPosition } from "../../modules/renderUtils.js"

export function renderHeading( ctx, node, viewport, context) {
    const rect = getScreenPosition(  node,viewport)

    let icon = ''

switch (node.state) {
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
 const text = icon ? `${icon} ${node.text}`: node.text
 const typography = context.typography.heading
 const font = `${typography.fontWeight} ${typography.fontSize}px ${typography.fontFamily}`
    // Draw the text
    drawText(
        ctx,
        text,
        rect.x + (node.padding || 0),
        rect.y + (node.padding || 0),
        font,
        typography.color,
        'left',
        'top'
    )

ctx.restore()
}