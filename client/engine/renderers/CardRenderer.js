import { getScreenPosition } from "../modules/renderUtils.js"

export function renderCard(ctx, node, viewport, context) {
    const rect = getScreenPosition(node, viewport)
    if (!rect) return
    const style = {
        ...context.style?.card,
        ...node.style?.card
    }
const radius =
        style.radius ?? 12

    const shadowBlur =
        style.shadowBlur ?? 0

    const shadowOffsetY =
        style.shadowOffsetY ?? 0

    const borderWidth =
        style.borderWidth ?? 1

    const colors =
        style.colors ?? {
            surface: node.color ?? '#ffffff',
            shadow: 'rgba(0, 0, 0, 0.15)',
            border: 'rgba(0, 0, 0, 0.1)'
        }
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
