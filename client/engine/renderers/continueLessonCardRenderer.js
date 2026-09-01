import { getResponsiveLayout } from "../constants/layoutConstants.js"
import { drawContinueContent, drawImage, drawWrappedText } from "../draw/drawHelpers.js"
import { getScreenPosition } from "../modules/renderUtils.js"

export function renderContinueLessonCard(ctx, node, viewport, assetManager) {

    const rect =
        getScreenPosition(node, viewport)

    const {x, y,} = rect
    const width = node.width || 600
    const height = node.height || 160
 const radius = 18

 const metrics = getResponsiveLayout(viewport.width, viewport.height)
 const compact = metrics.compact
 const mobile = metrics.mobile

    ctx.save()

    // CARD
    ctx.beginPath()

    ctx.roundRect( x,y,width,height,radius)

    // Shadow
    ctx.shadowColor ='rgba(0, 0, 0, 0.10)'

    ctx.shadowBlur = 14
    ctx.shadowOffsetY = 5

    ctx.fillStyle = '#ffffff'

    ctx.fill()

    // Remove shadow before border
    ctx.shadowColor = 'transparent'
    ctx.shadowBlur = 0
    ctx.shadowOffsetY = 0

    ctx.strokeStyle = '#e5e7eb'
    ctx.lineWidth = 1

    ctx.stroke()

    if (compact||mobile) {
        renderCompactCard(ctx,node, x,y,width,height,radius,assetManager, metrics)
    } else {
        renderWideCard(ctx,node,x,y,width,height,radius,assetManager, metrics)
    }

    ctx.restore()
}


function renderWideCard(
    ctx,
    node,
    x,
    y,
    width,
    height,
    radius,
    assetManager,
    metrics
) {

    const imageWidth = Math.min(190,Math.max(0.25 * width, 120))
    const gap = 28

    const contentX =
        x + imageWidth + gap

    const contentWidth =
        width - imageWidth - gap-24

    const image =
        assetManager?.getImage(node.thumbnail)

    /*
     * IMAGE
     */

    if (
        image &&
        image.complete &&
        image.naturalWidth > 0
    ) {

        drawImage(ctx,image,x,y,imageWidth,height,radius)

    } else {

        ctx.beginPath()

        ctx.roundRect( x,y,imageWidth,height,radius)

        ctx.fillStyle =
            '#f1f3f5'

        ctx.fill()
    }

    /*
     * CONTENT
     */
    const contentY = y + 20

    drawContinueContent(ctx,node,contentX,contentY,contentWidth,height)
}


/*
 * ====================================================
 * COMPACT CARD
 * ====================================================
 */

function renderCompactCard(ctx,node,x,y,width,height,radius,assetManager, metrics) {

    const padding = metrics.compact?16:20

    /*
     * Smaller image at the top.
     *
     * This is intentionally NOT full card height.
     */

    const imageHeight = metrics.continueCard?.imageHeight || 90

    const image =
        assetManager?.getImage(node.thumbnail)

    /*
     * IMAGE
     */

    if (image && image.complete &&image.naturalWidth > 0) {

        drawImage(ctx,image,x,y,width,imageHeight,radius)

    } else {

        ctx.beginPath()
        ctx.roundRect(x,y,width,imageHeight,radius)
        ctx.fillStyle =
            '#f1f3f5'
        ctx.fill()
    }

    /*
     * CONTENT
     */

    const contentX = x + padding

    const contentY = y + imageHeight + 15

    const contentWidth =width - padding * 2

    const contentHeight = height - imageHeight - 15

    ctx.font = metrics.compact
        ? '600 9px sans-serif'
        : '600 10px sans-serif'
    ctx.fillStyle = '#9481ed'
    ctx.textAlign = 'left'
    ctx.textBaseline = 'top'
    ctx.fillText(
        'CONTINUE LEARNING',
        contentX,
        contentY
    )

    ctx.font = metrics.compact
        ? '700 17px sans-serif'
        : '700 19px sans-serif'
    ctx.fillStyle = '#171717'

    drawWrappedText(
        ctx,
        node.title,
        contentX,
        contentY + 18,
        contentWidth,
        23,
        2
    )

    ctx.font = metrics.compact
        ? '400 11px sans-serif'
        : '400 12px sans-serif'
    ctx.fillStyle = '#6b7280'

    drawWrappedText(
        ctx,
        node.description,
        contentX,
        contentY + 18 + 23 + 8,
        contentWidth,
        18,
        2
    )

    const progress = Math.max(0,Math.min(100,node.progressPercent || 0))

    const progressHeight = 6

    const progressY = y + height - 30

    ctx.beginPath()
    ctx.roundRect(
        contentX,
        progressY,
        contentWidth,
        progressHeight,
        3
    )
    ctx.fillStyle = '#e5e7eb'
    ctx.fill()

    const filledWidth = (progress / 100) * contentWidth

    if(filledWidth > 0) {

        ctx.beginPath()
        ctx.roundRect(
            contentX,
            progressY,
            filledWidth,
            progressHeight,
            3
        )
        ctx.fillStyle = '#9481ed'
        ctx.fill()
    }

    ctx.font = metrics.compact
        ? '600 9px sans-serif'
        : '600 10px sans-serif'
    ctx.fillStyle = '#6b7280'
    ctx.textAlign = 'right'
    ctx.textBaseline = 'bottom'
    ctx.fillText(
        `${progress}% completed`,
        contentX + contentWidth,
        progressY - 4
    )
}

 