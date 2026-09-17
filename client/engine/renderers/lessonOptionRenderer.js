import { getScreenPosition } from "../modules/renderUtils.js"

export function renderLessonOption(ctx, node, viewport) {
    const rect = getScreenPosition(node, viewport)
    if (!rect) return
    
    ctx.fillStyle = 'lightgray'
    ctx.fillRect(rect.x, rect.y, node.width, node.height)
    ctx.fillStyle = 'black'
    ctx.fillText(node.title, rect.x + 5, rect.y + node.height / 2)
}