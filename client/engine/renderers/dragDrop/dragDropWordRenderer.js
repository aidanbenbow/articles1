import { getScreenPosition } from "../../modules/renderUtils.js"

export function renderDragDropWord(ctx, node, state, viewport, lesson, assetManager, animations, dragState) {
    const activity = lesson.getCurrentSectionState?.()
    const answers = activity?.getAnswers?.() || {}

    const isPlaced = Object.values(answers).includes(node.word)

    if (isPlaced && dragState?.wordNode !== node) {
        return
    }
    const rect = getScreenPosition(node, viewport)
    let { x, y } = rect

    if(dragState?.wordNode === node) {
        x = dragState.x - node.width / 2
        y = dragState.y - node.height / 2
    }

    ctx.fillStyle = node.color || '#d0d0d0'

    ctx.fillRect(
        x,
        y,
        node.width,
        node.height
    )

    ctx.strokeStyle = '#999'
    ctx.strokeRect(
        x,
        y,
        node.width,
        node.height
    )

    ctx.fillStyle = '#222'
    ctx.font = '16px sans-serif'
    ctx.textBaseline = 'middle'

    ctx.fillText(
        node.word || '',
        x + (node.padding || 10),
        y + node.height / 2
    )
}