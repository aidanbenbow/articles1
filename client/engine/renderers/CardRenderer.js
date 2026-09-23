import { getScreenPosition } from "../modules/renderUtils.js"

export function renderCard(ctx, node, viewport, style) {
    const rect = getScreenPosition(node, viewport)
    if (!rect) return
const { radius, shadowBlur, shadowOffsetY, borderWidth, colors } = style
    const { x, y } = rect
    const width = node.width || 200
    const height = node.height || 300

    ctx.save()
    ctx.beginPath()
    ctx.roundRect(  x, y, width, height, radius)
    ctx.fillStyle = colors.surface
    ctx.shadowColor = colors.shadow
    ctx.shadowBlur = shadowBlur
    ctx.shadowOffsetY = shadowOffsetY
    ctx.fill()
    ctx.shadowColor = 'transparent'
    ctx.shadowBlur = 0
    ctx.shadowOffsetY = 0
    ctx.strokeStyle = colors.border
    ctx.lineWidth = borderWidth
    ctx.stroke() 
    ctx.restore()
}
