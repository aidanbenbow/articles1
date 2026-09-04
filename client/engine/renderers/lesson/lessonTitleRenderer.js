export function renderLessonTitle(ctx, node, viewport) {
    const rect = getScreenRect(node, viewport)
    drawRect(ctx, rect, {showSelection: true})
    ctx.fillStyle = TEXT_COLOR
    ctx.font = 'bold 24px Arial'
    ctx.fillText(
        node.text || 'Lesson Title',
        rect.x + 20,
        rect.y + rect.height - 10
    )
}