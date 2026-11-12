import { DESIGN_TOKENS } from "../constants/designTokens.js"
import { DRAWING_CONSTANTS } from "../constants/drawingConstants.js"
import { getWrappedLines } from "./textWrapping.js"

export function drawTextBlock(ctx, text, x, y, maxWidth,lineHeight,font,color) {
   ctx.save()

    ctx.fillStyle = color
    ctx.font = font
    ctx.textAlign = 'left'
    ctx.textBaseline = 'top'

    const lines = getWrappedLines( ctx, text,maxWidth)

    lines.forEach((line, index) => { ctx.fillText( line, x, y + index * lineHeight)
    })

    ctx.restore()
}


export function drawText(ctx, text, x, y, font = DRAWING_CONSTANTS.fonts.body, color = DRAWING_CONSTANTS.colors.text, align = 'center', baseline = 'middle') {
    ctx.fillStyle = color
    ctx.font = font
    ctx.textAlign = align
    ctx.textBaseline = baseline
    ctx.fillText(text, x, y)
}

export function drawRect(
    ctx,
    rect,
    { showSelection = false } = {}
) {
    const {
        x,
        y,
        width,
        height,
        color,
        borderColor,
        borderWidth = 1,
        borderRadius = 12,
        shadow,
        selected
    } = rect;

    const colors = DESIGN_TOKENS.colors;

    ctx.save();

    try {
        if (shadow) {
            ctx.shadowColor = colors.shadow;
            ctx.shadowBlur = 12;
            ctx.shadowOffsetY = 4;
        }

        ctx.beginPath();
        ctx.roundRect(x, y, width, height, borderRadius);

        ctx.fillStyle = color ?? colors.surface;
        ctx.fill();

        const resolvedBorderColor = borderColor ?? colors.border;

        if (resolvedBorderColor) {
            ctx.shadowColor = "transparent";
            ctx.strokeStyle = resolvedBorderColor;
            ctx.lineWidth = borderWidth;
            ctx.stroke();
        }

        if (showSelection && selected) {
            ctx.shadowColor = "transparent";
            ctx.strokeStyle = colors.primary;
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    } finally {
        ctx.restore();
    }
}

export function drawButton(ctx, text,x,y,width,height) {

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

    ctx.fillText( text, x + width / 2, y + height / 2
    )
}

export function drawLessonCard(ctx,lesson,progress,x,y,width
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

export function drawWrappedText(ctx,text,x,y,maxWidth,lineHeight,maxLines = 2) {

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


export function drawImage(ctx,image,x,y,width,height,radius) {
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

    ctx.drawImage(image,drawX,drawY,drawWidth,drawHeight)

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


export function drawImagePlaceholder(ctx,x,y,size) {

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

export function drawContinueContent( ctx, node, x, y, width, height, compact = false) {


    /*
     * EYEBROW
     */

    ctx.font ='600 11px sans-serif'

    ctx.fillStyle ='#9481ed'

    ctx.textAlign ='left'

    ctx.textBaseline ='top'

    ctx.fillText(
        'CONTINUE LEARNING', x,y)

    /*
     * TITLE
     */

    ctx.font ='700 23px sans-serif'

    ctx.fillStyle ='#171717'

    drawWrappedText(ctx,node.title || '',x,
        y + 22, width,27, 2
    )

    /*
     * DESCRIPTION
     */

        ctx.font ='400 13px sans-serif'

        ctx.fillStyle ='#6b7280'

        drawWrappedText(
            ctx,
            node.description || '',
            x,
            y + 81,
            width,
            20,
            2
        )

    /*
     * PROGRESS
     */

    const progress =
        Math.max(
            0,
            Math.min(
                100,
                node.progressPercent || 0
            )
        )

    const progressHeight = 7

    const progressY = y + height - 53
    /*
     * Track
     */

    ctx.beginPath()

    ctx.roundRect(
        x,
        progressY,
        width,
        progressHeight,
        4
    )

    ctx.fillStyle ='#e5e7eb'
 ctx.fill()


    /*
     * Filled
     */

    const filledWidth = width * progress / 100

    if (filledWidth > 0) {

        ctx.beginPath()

        ctx.roundRect(
            x,
            progressY,
            filledWidth,
            progressHeight,
            4
        )

        ctx.fillStyle ='#9481ed'

        ctx.fill()
    }


    /*
     * Percentage
     */

    ctx.font ='600 11px sans-serif'

    ctx.fillStyle ='#6b7280'

    ctx.textAlign ='right'

    ctx.textBaseline ='bottom'

    ctx.fillText(
        `${progress}%`,
        x + width,
        progressY - 5
    )
}