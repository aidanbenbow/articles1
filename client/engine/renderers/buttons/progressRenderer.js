import { getScreenPosition } from "../../modules/renderUtils.js"

export function renderProgress(ctx, node, viewport, context) {
    const rect = getScreenPosition(node, viewport)
    if (!rect) return

    const { x, y } = rect

    const width = node.width ?? 200
    const height = node.height ?? 12

    const responsive = context.responsive ?? context
    const colors = responsive.colors ?? {}

    const value = Math.max(
        0,
        Math.min(100, Number(node.value) || 0)
    )

    const radius = node.radius ?? height / 2

    const trackColor =
        node.trackColor ?? colors.border ?? "#e5e7eb"

    const fillColor =
        node.fillColor ?? colors.primary ?? "#9481ed"

    ctx.save()

    try {
        // Track
        ctx.beginPath()
        ctx.roundRect(x, y, width, height, radius)
        ctx.fillStyle = trackColor
        ctx.fill()

        // Progress
        const progressWidth = width * value / 100

        if (progressWidth > 0) {
            ctx.beginPath()
            ctx.roundRect(
                x,
                y,
                progressWidth,
                height,
                radius
            )
            ctx.fillStyle = fillColor
            ctx.fill()
        }
    } finally {
        ctx.restore()
    }
}