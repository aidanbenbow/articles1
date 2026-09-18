import { getScreenPosition } from "../../modules/renderUtils.js"
export function renderDragDrop(ctx, node, viewport, assetManager, lesson) {

    const rect = getScreenPosition(node, viewport)
    const { x, y } = rect

    ctx.fillStyle = node.color || '#e0e0e0'

    ctx.fillRect(
        x,
        y,
        node.width,
        node.height
    )
}