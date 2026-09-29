import { getScreenPosition } from "../../modules/renderUtils.js"

export function renderOrderingItem(ctx, node, viewport) {
    const rect = getScreenPosition(node, viewport)

    if (!rect) return

    ctx.fillStyle = node.color || '#ffffff'

    ctx.fillRect(
        rect.x,
        rect.y,
        node.width,
        node.height
    )
}