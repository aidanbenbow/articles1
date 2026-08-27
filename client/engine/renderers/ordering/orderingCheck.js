import { getScreenPosition } from "../../modules/renderUtils.js"

export function renderOrderingCheck(
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

    ctx.font = 'bold 14px sans-serif'

    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    ctx.fillText(
        'Check answer',
        x + width / 2,
        y + height / 2
    )

    ctx.textAlign = 'left'
    ctx.textBaseline = 'alphabetic'
}
