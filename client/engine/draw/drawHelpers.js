export function drawTextBlock(ctx, text, x, y, maxWidth, lineHeight) {
    ctx.fillStyle = TEXT_COLOR
    ctx.font = FONT
    wrapText(ctx, text || '', x + TEXT_OFFSET_X, y + TEXT_OFFSET_Y, maxWidth - 20, lineHeight)
}


function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ')
    let line = ''

    for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' '
        const metrics = ctx.measureText(testLine)
        const testWidth = metrics.width

        if (testWidth > maxWidth && n > 0) {
            ctx.fillText(line, x, y)
            line = words[n] + ' '
            y += lineHeight
        } else {
            line = testLine
        }
    }
    ctx.fillText(line, x, y)
}

export function drawButton(
    ctx,
    text,
    x,
    y,
    width,
    height
) {

    ctx.fillStyle = '#333'

    ctx.fillRect(
        x,
        y,
        width,
        height
    )

    ctx.fillStyle = '#fff'
    ctx.font = '16px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    ctx.fillText(
        text,
        x + width / 2,
        y + height / 2
    )
}

export function drawLessonCard(
    ctx,
    lesson,
    progress,
    x,
    y,
    width
) {

    ctx.fillStyle = '#e0e0e0'

    ctx.fillRect(
        x,
        y,
        width,
        110
    )

    drawTextBlock(
        ctx,
        lesson.title,
        x + 20,
        y + 20,
        width - 40,
        22
    )

    drawTextBlock(
        ctx,
        lesson.description || '',
        x + 20,
        y + 50,
        width - 40,
        16
    )

    const status =
        progress?.status === 'completed'
            ? 'Completed'
            : progress?.status === 'in_progress'
                ? `${progress.progressPercent || 0}% complete`
                : 'Not started'

    drawTextBlock(
        ctx,
        status,
        x + 20,
        y + 85,
        width - 40,
        14
    )
}