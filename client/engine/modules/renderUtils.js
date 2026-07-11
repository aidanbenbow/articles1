

const DEFAULT_FILL_COLOR = '#791e1e';
const TEXT_COLOR = '#000000';
const SELECTION_COLOR = '#ff0000';
//const FONT = '16px Arial';
const FONT = '16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
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
        excerpt: node.excerpt,
        content: node.content,
        thumbnail: node.thumbnail,
        thumbnailSize: node.thumbnailSize,
        contentOffsetY: node.contentOffsetY,
        lineHeight: node.lineHeight,
        padding: node.padding,
        borderRadius: node.borderRadius,
        shadow: node.shadow,
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

export function renderInputBoxes(ctx, nodes, viewport, searchTerm) {
    nodes.forEach(node => {
        
        const rect = getScreenRect(node, viewport)
     
       drawRect(ctx, rect, {showSelection: true})
        drawTextBlock(ctx, searchTerm || '', rect.x, rect.y, rect.width, LINE_HEIGHT)
    })
}

export function renderReports(ctx, nodes, viewport, assetManager) {
    nodes.forEach(node => {
        const rect = getScreenRect(node, viewport)
        drawRect(ctx, rect, {showSelection: true})

        const hasThumbnail = !!rect.thumbnail
        if (hasThumbnail) {
            drawThumbnail(ctx, rect, assetManager)
        }

        const textX = hasThumbnail
            ? rect.x + rect.thumbnailSize + 30
            : rect.x

       const textWidth = rect.thumbnail
    ? rect.width - rect.thumbnailSize - 50
    : rect.width - 20

    ctx.save()
    ctx.beginPath()
    ctx.rect(rect.x, rect.y, rect.width, rect.height)
    ctx.clip()

            drawSingleLineText(ctx, { ...rect, x: textX })
            
        drawTextBlock(ctx, node.excerpt || '', textX, rect.y + TEXT_OFFSET_Y, textWidth, LINE_HEIGHT)
        ctx.restore()
    })
}

function drawThumbnail(ctx, rect, assetManager) {

    if (!rect.thumbnail) return

    const img = assetManager.loadImage(rect.thumbnail)

    if (!img.complete|| img.naturalWidth === 0) return

    const size = rect.thumbnailSize || 80

    ctx.drawImage(
        img,
        rect.x + 15,
        rect.y + 15,
        size,
        size
    )
}

export function drawRectLabel(ctx, rect, options = {}) {
    drawRect(ctx, rect, options)
    drawSingleLineText(ctx, rect)
}

export function drawRect(ctx, rect, { showSelection = false } = {}) {
    const { x, y, width, height } = rect
    const radius = rect.borderRadius ?? 12

    ctx.save()

    if (rect.shadow) {
        ctx.shadowColor = 'rgba(0,0,0,0.12)'
        ctx.shadowBlur = 12
        ctx.shadowOffsetY = 4
    }

    ctx.fillStyle = rect.color || DEFAULT_FILL_COLOR
    roundRect(ctx, x, y, width, height, radius)
    ctx.fill()

    if (showSelection && rect.selected) {
        ctx.shadowColor = 'transparent'
        ctx.strokeStyle = SELECTION_COLOR
        ctx.lineWidth = 2
        roundRect(ctx, x, y, width, height, radius)
        ctx.stroke()
    }

    ctx.restore()
}

function roundRect(ctx, x, y, width, height, radius) {
    const r = Math.min(radius, width / 2, height / 2)
    ctx.beginPath()
    ctx.moveTo(x + r, y)
    ctx.arcTo(x + width, y, x + width, y + height, r)
    ctx.arcTo(x + width, y + height, x, y + height, r)
    ctx.arcTo(x, y + height, x, y, r)
    ctx.arcTo(x, y, x + width, y, r)
    ctx.closePath()
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
    ctx.save()
    ctx.textBaseline = 'top'
    const rect = getScreenRect(node, viewport)

    drawRect(ctx, rect, { showSelection: true })

    const padding = node.padding ?? 20
    const titleFontSize = 20
    const titleHeight = titleFontSize + 12
    const bodyY = rect.y + padding + titleHeight
    const bodyHeight = rect.height - titleHeight - padding * 2

    // Draw title with stronger styling
    ctx.fillStyle = TEXT_COLOR
    ctx.font = `bold ${titleFontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
    ctx.fillText(
        node.text || 'Article',
        rect.x + padding,
        rect.y + padding
    )

    // Draw body content with wrapping
    drawTextBlockClipped(
        ctx,
        node.content || '',
        rect.x + padding,
        bodyY,
        rect.width - padding * 2,
        bodyHeight,
        node.lineHeight || 24,
        node.contentOffsetY || 0
    )

    // Reset font for other renders
    ctx.font = FONT
    ctx.restore()
}


export function drawTextBlockClipped(ctx, text, x, y, maxWidth, maxHeight, lineHeight, offsetY = 0) {
    // clip to rect bounds so text doesn't bleed outside
    ctx.save()
    ctx.beginPath()
    ctx.rect(x, y + TEXT_OFFSET_Y, maxWidth, maxHeight)
    ctx.clip()

    ctx.fillStyle = TEXT_COLOR
    ctx.font = FONT

    // shift text up by scrollY offset
    wrapText(ctx, text || '', x + TEXT_OFFSET_X, y + TEXT_OFFSET_Y - offsetY, maxWidth - 20, lineHeight)

    ctx.restore()
}



