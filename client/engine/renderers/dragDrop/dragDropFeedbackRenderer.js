import { getScreenPosition } from "../../modules/renderUtils.js"

export function renderDragDropFeedback(ctx, node, viewport, lesson) {
    const activity = lesson.getCurrentSectionState?.()
    if(!activity.getChecked?.()) {return}
    const feedback = activity?.getFeedback?.() || null
    if(!feedback) {return}
    const rect = getScreenPosition(node, viewport)
    const { x, y } = rect

    ctx.fillStyle = '#222'
    ctx.font = '16px sans-serif'
    ctx.textBaseline = 'middle'

    ctx.fillText(
        feedback || '',
        x,
        y + node.height / 2
    )
}