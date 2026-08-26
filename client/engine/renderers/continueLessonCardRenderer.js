import { drawImage, drawWrappedText } from "../draw/drawHelpers.js"
import { getScreenPosition } from "../modules/renderUtils.js"

export function renderContinueLessonCard(ctx, node, viewport, assetManager) {

    const rect =
        getScreenPosition(node, viewport)

    

    const {
        x,
        y,
        
    } = rect
    const width = node.width || 600
    const height = node.height || 160

    const radius = 18

    ctx.save()

    /*
     * ================================================
     * CARD
     * ================================================
     */

    ctx.beginPath()

    ctx.roundRect(
        x,
        y,
        width,
        height,
        radius
    )

    // Shadow
    ctx.shadowColor =
        'rgba(0, 0, 0, 0.10)'

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


    /*
     * ================================================
     * IMAGE
     * ================================================
     */

    const imageWidth = 190
const image = assetManager.getImage(node.thumbnail)
  
    if (
    image &&
    image.complete &&
    image.naturalWidth > 0
) {
    drawImage(
        ctx,
        image,
        x,
        y,
        imageWidth,
        height,
        radius
    )

} else {
    ctx.beginPath()

    ctx.roundRect(
        x,
        y,
        imageWidth,
        height,
        radius
    )

    ctx.fillStyle = '#f1f3f5'

    ctx.fill()
}


    /*
     * ================================================
     * CONTENT
     * ================================================
     */

    const contentX =
        x + imageWidth + 28

    const contentWidth =
        width - imageWidth - 52


    /*
     * Eyebrow
     */

    ctx.font =
        '600 11px sans-serif'

    ctx.fillStyle =
        '#9481ed'

    ctx.textAlign =
        'left'

    ctx.textBaseline =
        'top'

    ctx.fillText(
        'CONTINUE LEARNING',
        contentX,
        y + 22
    )


    /*
     * Title
     */

    ctx.font =
        '700 23px sans-serif'

    ctx.fillStyle =
        '#171717'

    drawWrappedText(
        ctx,
        node.title,
        contentX,
        y + 45,
        contentWidth,
        28,
        2
    )


    /*
     * Description
     */

    ctx.font =
        '400 14px sans-serif'

    ctx.fillStyle =
        '#6b7280'

    drawWrappedText(
        ctx,
        node.description,
        contentX,
        y + 103,
        contentWidth,
        20,
        2
    )


    /*
     * ================================================
     * PROGRESS
     * ================================================
     */

    const progress =
        Math.max(
            0,
            Math.min(
                100,
                node.progressPercent || 0
            )
        )

    const progressWidth =
        contentWidth

    const progressHeight = 7

    const progressY =
        y + height - 31


    // Track

    ctx.beginPath()

    ctx.roundRect(
        contentX,
        progressY,
        progressWidth,
        progressHeight,
        4
    )

    ctx.fillStyle =
        '#e5e7eb'

    ctx.fill()


    // Progress

    const filledWidth =
        progressWidth *
        progress / 100

    if (filledWidth > 0) {

        ctx.beginPath()

        ctx.roundRect(
            contentX,
            progressY,
            filledWidth,
            progressHeight,
            4
        )

        ctx.fillStyle =
            '#9481ed'

        ctx.fill()
    }


    /*
     * Percentage
     */

    ctx.font =
        '600 12px sans-serif'

    ctx.fillStyle =
        '#6b7280'

    ctx.textAlign =
        'right'

    ctx.fillText(
        `${progress}%`,
        contentX + progressWidth,
        progressY - 18
    )


    ctx.restore()
}
