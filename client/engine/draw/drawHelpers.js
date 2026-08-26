import { DRAWING_CONSTANTS } from "../constants/drawingConstants.js"

export function drawTextBlock(ctx, text, x, y, maxWidth, lineHeight) {
    ctx.fillStyle = DRAWING_CONSTANTS.colors.text
    ctx.font = `${DRAWING_CONSTANTS.fontSizes.body}px Arial`
    wrapText(ctx, text || '', x + DRAWING_CONSTANTS.spacing.padding, y + DRAWING_CONSTANTS.spacing.padding, maxWidth - 20, lineHeight)
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

export function drawWrappedText(
    ctx,
    text,
    x,
    y,
    maxWidth,
    lineHeight,
    maxLines = 2
) {

    if (!text) {
        return
    }

    const words =
        String(text).split(/\s+/)

    const lines = []

    let line = ''

    for (const word of words) {

        const test =
            line
                ? `${line} ${word}`
                : word

        if (
            ctx.measureText(test).width >
                maxWidth &&
            line
        ) {
            lines.push(line)
            line = word
        } else {
            line = test
        }
    }

    if (line) {
        lines.push(line)
    }

    const visible =
        lines.slice(0, maxLines)

    if (lines.length > maxLines) {

        let last =
            visible[maxLines - 1]

        while (
            ctx.measureText(
                `${last}…`
            ).width > maxWidth &&
            last.length
        ) {
            last =
                last.slice(0, -1)
        }

        visible[
            maxLines - 1
        ] = `${last}…`
    }

    visible.forEach(
        (line, index) => {

            ctx.fillText(
                line,
                x,
                y + index * lineHeight
            )
        }
    )
}


export function drawImage(
    ctx,
    image,
    x,
    y,
    width,
    height,
    radius
) {
    if (!image || !image.complete || image.naturalWidth === 0) {
        return
    }

    ctx.save()

    ctx.beginPath()

    ctx.roundRect(
        x,
        y,
        width,
        height,
        radius
    )

    ctx.clip()

    const imageRatio =
        image.naturalWidth /
        image.naturalHeight

    const boxRatio =
        width / height

    let drawWidth
    let drawHeight
    let drawX
    let drawY

    if (imageRatio > boxRatio) {

        drawHeight = height

        drawWidth =
            height * imageRatio

        drawX =
            x + (width - drawWidth) / 2

        drawY = y

    } else {

        drawWidth = width

        drawHeight =
            width / imageRatio

        drawX = x

        drawY =
            y + (height - drawHeight) / 2
    }

    ctx.drawImage(
        image,
        drawX,
        drawY,
        drawWidth,
        drawHeight
    )

    ctx.restore()
}

export function getProgressPercent(node) {

    if (
        typeof node.progressPercent ===
        'number'
    ) {
        return Math.round(
            node.progressPercent
        )
    }

    if (
        typeof node.progress?.progressPercent ===
        'number'
    ) {
        return Math.round(
            node.progress.progressPercent
        )
    }

    return null
}


export function getActionLabel(node) {

    const progress =
        getProgressPercent(node)

    if (progress === 100) {
        return 'Review'
    }

    if (progress > 0) {
        return 'Continue'
    }

    return 'Start'
}


export function drawImagePlaceholder(
    ctx,
    x,
    y,
    size
) {

    ctx.beginPath()

    ctx.roundRect(
        x,
        y,
        size,
        size,
        10
    )

    ctx.fillStyle =
        '#f3f4f6'

    ctx.fill()
}