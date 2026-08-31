import { getScreenPosition } from "../../modules/renderUtils.js"

export function renderOrdering(
    ctx,
    section,
    state,
    viewport,
    lesson
) {
    const rect = getScreenPosition(
        section,
        viewport
    )
    
    const { x, y } = rect
    const width = section.width || 600
    const height = section.height || 160

    ctx.fillStyle = section.color || '#e0e0e0'

    ctx.fillRect(x, y, width, height)

    ctx.fillStyle = '#222'

    ctx.font = 'bold 18px sans-serif'

    ctx.fillText(
        section.question,
        x + section.padding,
        y + section.padding + 20
    )

      // Feedback
    if (section.feedback) {
        ctx.fillStyle = '#c62828'
        ctx.font = '16px sans-serif'

        ctx.fillText(
            section.feedback,
            section.feedbackX,
            section.feedbackY + 24
        )
    }
}