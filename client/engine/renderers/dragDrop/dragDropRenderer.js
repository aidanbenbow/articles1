import { getScreenPosition } from "../../modules/renderUtils.js"

export function renderDragDrop(
    ctx,
    node,
    viewport,
    context
) {
    const rect = getScreenPosition(node, viewport)

    if (!rect) return

    ctx.save()

    ctx.fillStyle =
        node.color || '#e0e0e0'

    ctx.fillRect(
        rect.x,
        rect.y,
        rect.width,
        rect.height
    )

    ctx.restore()
}