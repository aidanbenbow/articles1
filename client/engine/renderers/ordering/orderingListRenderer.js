import { getScreenPosition } from "../../modules/renderUtils.js"

export function renderOrderingItem(ctx, node, viewport, context) {
    const rect = getScreenPosition(node, viewport)
    if (!rect) return

    ctx.save()

    ctx.fillStyle = node.color || '#ffffff'
    ctx.fillRect(rect.x, rect.y, node.width, node.height)

    ctx.fillStyle = '#000000'
    ctx.font = '16px sans-serif'
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'

    ctx.fillText(
        node.text ?? '',
        rect.x + (node.padding || 12),
        rect.y + node.height / 2
    )

    ctx.restore()
}