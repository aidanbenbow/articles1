import { getScreenPosition } from "../../modules/renderUtils.js"

export function renderDragDropGap(ctx, node, state, viewport, lesson) {
    const rect = getScreenPosition(node, viewport)
    const { x, y } = rect

    const activity = lesson.getCurrentSectionState?.()
    const answers = activity?.getAnswers?.() || []
    
    const answer = answers[node.gapIndex] || null
        console.log('GAP RENDER', {
        gapIndex: node.gapIndex,
        answers,
        answer: answers[node.gapIndex]
    })

    ctx.fillStyle = '#ffffff'

    ctx.fillRect(
        x,
        y,
        node.width,
        node.height
    )

    ctx.strokeStyle = '#777'
    ctx.lineWidth = 1

    ctx.strokeRect(
        x,
        y,
        node.width,
        node.height
    )

    if (answer) {
        ctx.fillStyle = '#222'
        ctx.font = '16px sans-serif'
        ctx.textBaseline = 'middle'

        ctx.fillText(
            answer,
            x + 8,
            y + node.height / 2
        )
    }
}