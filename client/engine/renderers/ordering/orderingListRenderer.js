import { getScreenPosition } from "../../modules/renderUtils.js"

export function renderOrderingItem(
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

    ctx.fillStyle =
        section.color || '#d0d0d0'

    ctx.fillRect(x, y, width, height)
      

    ctx.fillStyle = '#222'

    ctx.font = '16px sans-serif'

    ctx.textBaseline = 'middle'

    ctx.fillText(
        section.text,
        x + 12,
        y + height / 2
    )

    ctx.textBaseline = 'alphabetic'
}