const DEFAULT_FILL_COLOR = '#791e1e';
const TEXT_COLOR = '#000000';
const SELECTION_COLOR = '#ff0000';
const FONT = '16px Arial';
const TEXT_OFFSET_X = 10;
const TEXT_OFFSET_Y = 30;
const LINE_HEIGHT = 20;

export function renderReportsToDo(ctx, node) {
    drawRectLabel(ctx, node, {showSelection: true})
}

export function renderBackground(ctx, width, height, bgColor) {
   
    ctx.clearRect(0, 0, width, height)
    ctx.fillStyle = bgColor || DEFAULT_FILL_COLOR
    ctx.fillRect(0, 0, width, height)
}

export function renderButtons(ctx, nodes) {
    nodes.forEach(node => {
        drawRectLabel(ctx, node, {showSelection: true})
    })
}

export function renderInputBoxes(ctx, nodes) {
    nodes.forEach(node => {
        drawRectLabel(ctx, node, {showSelection: true})
        drawTextBlock(ctx, node.text || '', node.x, node.y, node.width, LINE_HEIGHT)
    })
}

export function renderReports(ctx, nodes) {
    nodes.forEach(node => {
        drawRectLabel(ctx, node, {showSelection: true})
    })
}


export function drawRectLabel(ctx, node, options = {}) {
    drawRect(ctx, node, options)
    drawSingleLineText(ctx, node.text || '', node.x, node.y)
}

export function drawRect(ctx, node, {showSelection = false} = {}) {
   
    ctx.fillStyle = node.color || DEFAULT_FILL_COLOR
    const x = node.x
    const y = node.y
    const width = node.width
    const height = node.height

    ctx.fillRect(x, y, width, height)

    if (showSelection && node.selected) {
        ctx.strokeStyle = SELECTION_COLOR
        ctx.lineWidth = 2
        ctx.strokeRect(x, y, width, height)
    }
}

export function drawSingleLineText(ctx, text,x, y) {
    ctx.fillStyle = TEXT_COLOR
    ctx.font = FONT
    ctx.fillText(text || '', x + TEXT_OFFSET_X, y + TEXT_OFFSET_Y)
}


export function drawTextBlock(ctx, text, x, y, maxWidth, lineHeight) {
    ctx.fillStyle = TEXT_COLOR
    ctx.font = FONT
    wrapText(ctx, text || '', x + TEXT_OFFSET_X, y + TEXT_OFFSET_Y, maxWidth - 20, lineHeight)
}


export function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
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

export function renderArticle(ctx, node) {
    drawRectLabel(ctx, node, {showSelection: true})
   drawSingleLineText(ctx, node.text || '', node.x, node.y)
   drawTextBlockClipped(ctx, node.content || '', node.x, node.y + 50, node.width, node.height - 50, LINE_HEIGHT, node.contentOffsetY || 0)
}

export function drawTextBlockClipped(ctx, text, x, y, maxWidth, maxHeight, lineHeight, offsetY = 0) {
    // clip to rect bounds so text doesn't bleed outside
    ctx.save()
    ctx.beginPath()
    ctx.rect(x, y + TEXT_OFFSET_Y, maxWidth, maxHeight - TEXT_OFFSET_Y)
    ctx.clip()

    ctx.fillStyle = TEXT_COLOR
    ctx.font = FONT

    // shift text up by scrollY offset
    wrapText(ctx, text || '', x + TEXT_OFFSET_X, y + TEXT_OFFSET_Y - offsetY, maxWidth - 20, lineHeight)

    ctx.restore()
}

// function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
//     const words = text.split(' ')
//     let line = ''
//     for (let n = 0; n < words.length; n++) {
//         const testLine = line + words[n] + ' '
//         const metrics = ctx.measureText(testLine)
//         const testWidth = metrics.width
        
//         if (testWidth > maxWidth && n > 0) {
//             ctx.fillText(line, x, y)
//             line = words[n] + ' '
//             y += lineHeight
//         } else {
//             line = testLine
//         }
//     }
//     ctx.fillText(line, x, y)
// }

