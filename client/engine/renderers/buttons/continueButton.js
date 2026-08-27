import { DRAWING_CONSTANTS } from "../../constants/drawingConstants.js"
import { drawRect } from "../../draw/drawHelpers.js"
import { getScreenPosition } from "../../modules/renderUtils.js"

export function renderContinueButton(
    ctx,
    node,
    viewport
) {

    const rect = getScreenPosition(node, viewport)
    const {x, y} = rect
    const width = node.width || 200
    const height = node.height || 50
    const radius = 8

    drawRect(ctx, {x, y, width, height, radius}, {showSelection: true})

    ctx.fillStyle = DRAWING_CONSTANTS.colors.text
    ctx.font = 'bold 18px Arial'

    const textWidth = ctx.measureText(node.text || '').width
    const textX = x + width / 2 - textWidth / 2

    ctx.fillText(
        node.text || 'Continue',
        textX,
        y + 20
    )
}
