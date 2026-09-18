import { getScreenPosition } from "../../modules/renderUtils.js"

export function renderDragDropWord(ctx, node, state, viewport, lesson) {
    const rect = getScreenPosition(node, viewport)
    const { x, y } = rect

    ctx.fillStyle = node.color || '#d0d0d0'

    ctx.fillRect(
        x,
        y,
        node.width,
        node.height
    )

    ctx.strokeStyle = '#999'
    ctx.strokeRect(
        x,
        y,
        node.width,
        node.height
    )

    ctx.fillStyle = '#222'
    ctx.font = '16px sans-serif'
    ctx.textBaseline = 'middle'

    ctx.fillText(
        node.word || '',
        x + (node.padding || 10),
        y + node.height / 2
    )
}