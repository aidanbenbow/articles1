import { getScreenPosition } from "../modules/renderUtils.js"

export function renderBrowseAllLessons(
    ctx,
    node,
    viewport
) {

    const rect =
        getScreenPosition(
            node,
            viewport
        )

    if (!rect) {
        return
    }

    const {
        x,
        y,
        
    } = rect
const width = node.width || 600
const height = node.height || 160
    const radius = 16

    ctx.save()

    /*
     * Card
     */

    ctx.beginPath()

    ctx.roundRect(
        x,
        y,
        width,
        height,
        radius
    )

    ctx.fillStyle =
        '#f8f7ff'

    ctx.fill()

    ctx.strokeStyle =
        '#ded9f7'

    ctx.lineWidth = 1

    ctx.stroke()


    /*
     * Text
     */

    ctx.font =
        '600 15px sans-serif'

    ctx.fillStyle =
        '#4c4670'

    ctx.textAlign =
        'left'

    ctx.textBaseline =
        'middle'

    ctx.fillText(
        node.title ||
            'Browse all lessons',
        x + 22,
        y + height / 2
    )


    /*
     * Arrow
     */

    ctx.font =
        '600 20px sans-serif'

    ctx.fillStyle =
        '#9481ed'

    ctx.textAlign =
        'right'

    ctx.fillText(
        '→',
        x + width - 22,
        y + height / 2
    )

    ctx.restore()
}