const DEFAULT_FILL_COLOR = '#791e1e';
const TEXT_COLOR = '#000000';
const SELECTION_COLOR = '#ff0000';
const FONT = '16px Arial';
const TEXT_OFFSET_X = 10;
const TEXT_OFFSET_Y = 30;
const LINE_HEIGHT = 20;

function resolveScrollY(viewportOrScrollY) {
    if (typeof viewportOrScrollY === 'number') return viewportOrScrollY
    return viewportOrScrollY?.y || 0
}

function getScreenRect(node, viewportOrScrollY) {
    const scrollY = resolveScrollY(viewportOrScrollY)
    return {
        x: node.x,
        y: node.worldY - scrollY,
        width: node.width,
        height: node.height,
        color: node.color,
        selected: node.selected,
        type: node.type,
        kind: node.kind,
        text: node.text,
        content: node.content,
        contentOffsetY: node.contentOffsetY
    }
}

export function renderReportsToDo(ctx, node, viewport) {
    const rect = getScreenRect(node, viewport)
    drawRectLabel(ctx, rect, {showSelection: true})
}

export function renderBackground(ctx, width, height, bgColor) {
   
    ctx.clearRect(0, 0, width, height)
    ctx.fillStyle = bgColor || DEFAULT_FILL_COLOR
    ctx.fillRect(0, 0, width, height)
}

export function renderButtons(ctx, nodes, viewport) {
    nodes.forEach(node => {
        const rect = getScreenRect(node, viewport)
        drawRectLabel(ctx, rect, {showSelection: true})
    })
}

export function renderInputBoxes(ctx, nodes, viewport) {
    nodes.forEach(node => {
        const rect = getScreenRect(node, viewport)
        drawRectLabel(ctx, rect, {showSelection: true})
        drawTextBlock(ctx, node.text || '', rect.x, rect.y, rect.width, LINE_HEIGHT)
    })
}

export function renderReports(ctx, nodes, viewport) {
    nodes.forEach(node => {
        const rect = getScreenRect(node, viewport)
        drawRectLabel(ctx, rect, {showSelection: true})
    })
}


export function drawRectLabel(ctx, rect, options = {}) {
    drawRect(ctx, rect, options)
    drawSingleLineText(ctx, rect)
}

export function drawRect(ctx, rect, {showSelection = false} = {}) {
   
    ctx.fillStyle = rect.color || DEFAULT_FILL_COLOR
    const { x, y, width, height } = rect

    ctx.fillRect(x, y, width, height)

    if (showSelection && rect.selected) {
        ctx.strokeStyle = SELECTION_COLOR
        ctx.lineWidth = 2
        ctx.strokeRect(x, y, width, height)
    }
}

export function drawSingleLineText(ctx, rect) {
    ctx.fillStyle = TEXT_COLOR
    ctx.font = FONT
    ctx.fillText(rect.text || '', rect.x + TEXT_OFFSET_X, rect.y + TEXT_OFFSET_Y)
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

export function renderArticle(ctx, node, viewport) {
    ctx.textBaseline = "top";
    const rect = getScreenRect(node, viewport)
    
    drawRectLabel(ctx, rect, {showSelection: true})
   drawSingleLineText(ctx, rect)
   drawTextBlockClipped(ctx, node.content || '', rect.x, rect.y + 50, rect.width, rect.height - 50, LINE_HEIGHT, node.contentOffsetY || 0)
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

