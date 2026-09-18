import { getScreenPosition } from "../../modules/renderUtils.js"

export function renderDragDropFeedback(ctx, node, viewport) {
    const rect = getScreenPosition(node, viewport)
    const { x, y } = rect

    ctx.fillStyle = '#222'
    ctx.font = '16px sans-serif'
    ctx.textBaseline = 'middle'

    ctx.fillText(
        node.text || '',
        x,
        y + node.height / 2
    )
}