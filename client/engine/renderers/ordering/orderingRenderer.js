import { getScreenPosition } from "../../modules/renderUtils.js"

export function renderOrdering(ctx, node, viewport) {
    const rect = getScreenPosition(node, viewport)

    if (!rect) return

    if (node.color) {
        ctx.fillStyle = node.color
        ctx.fillRect(
            rect.x,
            rect.y,
            node.width,
            node.height
        )
    }
}