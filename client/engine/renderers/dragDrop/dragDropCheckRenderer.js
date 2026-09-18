import { getScreenPosition } from "../../modules/renderUtils.js"

export function renderDragDropCheck(ctx, node, state, viewport, lesson) {
    const rect = getScreenPosition(node, viewport)
    const { x, y } = rect

    const checkedState = lesson.getCurrentSectionState?.() || {}
    const checked = checkedState.getDragDropChecked?.()?.[node.id] || null

    let color = '#b0b0b0'

    if (checked) {
        color = checked.isCorrect
            ? '#9ccc9c'
            : '#d9a0a0'
    }

    ctx.fillStyle = color

    ctx.fillRect(
        x,
        y,
        node.width,
        node.height
    )

    ctx.strokeStyle = '#888'

    ctx.strokeRect(
        x,
        y,
        node.width,
        node.height
    )

    ctx.fillStyle = '#222'
    ctx.font = '16px sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    let text = 'Check answer'

    if (checked) {
        text = checked.isCorrect
            ? 'Correct!'
            : 'Try again'
    }

    ctx.fillText(
        text,
        x + node.width / 2,
        y + node.height / 2
    )

    ctx.textAlign = 'left'
}