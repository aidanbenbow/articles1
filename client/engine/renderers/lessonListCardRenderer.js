import {
    drawImagePlaceholder,
    drawWrappedText,
    getActionLabel,
    getProgressPercent
} from "../draw/drawHelpers.js"

import {
    getScreenPosition
} from "../modules/renderUtils.js"


export function renderLessonListCard(
    ctx,
    node,
    viewport,
    assetManager
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

    const radius = 14

    const padding = 14

    const imageSize =
        Math.min(
            height - padding * 2,
            100
        )


    ctx.save()


    /*
     * CARD
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
        '#ffffff'

    ctx.shadowColor =
        'rgba(0, 0, 0, 0.06)'

    ctx.shadowBlur = 10

    ctx.shadowOffsetY = 3

    ctx.fill()

    ctx.shadowColor =
        'transparent'

    ctx.shadowBlur = 0

    ctx.shadowOffsetY = 0

    ctx.strokeStyle =
        '#e5e7eb'

    ctx.lineWidth = 1

    ctx.stroke()


    /*
     * IMAGE
     */

    const imageX =
        x + padding

    const imageY =
        y + padding


    if (node.thumbnail) {

        const image =
            assetManager?.getImage?.(
                node.thumbnail
            )

        if (
            image &&
            image.complete
        ) {

            ctx.save()

            ctx.beginPath()

            ctx.roundRect(
                imageX,
                imageY,
                imageSize,
                imageSize,
                10
            )

            ctx.clip()

            ctx.drawImage(
                image,
                imageX,
                imageY,
                imageSize,
                imageSize
            )

            ctx.restore()

        } else {

            drawImagePlaceholder(
                ctx,
                imageX,
                imageY,
                imageSize
            )
        }

    } else {

        drawImagePlaceholder(
            ctx,
            imageX,
            imageY,
            imageSize
        )
    }


    /*
     * CONTENT
     */

    const contentX =
        imageX +
        imageSize +
        18

    const actionWidth = 90

    const contentWidth =
        width -
        imageSize -
        padding * 2 -
        18 -
        actionWidth


    /*
     * TITLE
     */

    ctx.textAlign =
        'left'

    ctx.textBaseline =
        'top'

    ctx.font =
        '700 17px sans-serif'

    ctx.fillStyle =
        '#171717'

    drawWrappedText(
        ctx,
        node.title || 'Untitled lesson',
        contentX,
        y + 17,
        contentWidth,
        22,
        2
    )


    /*
     * DESCRIPTION
     */

    if (node.description) {

        ctx.font =
            '400 12px sans-serif'

        ctx.fillStyle =
            '#6b7280'

        drawWrappedText(
            ctx,
            node.description,
            contentX,
            y + 60,
            contentWidth,
            17,
            2
        )
    }


    /*
     * PROGRESS
     */

    const progress =
        getProgressPercent(node)


    if (progress !== null) {

        const barWidth =
            Math.min(
                contentWidth,
                160
            )

        const barHeight = 5

        const progressY =
            y + height - 22


        ctx.beginPath()

        ctx.roundRect(
            contentX,
            progressY,
            barWidth,
            barHeight,
            3
        )

        ctx.fillStyle =
            '#e5e7eb'

        ctx.fill()


        if (progress > 0) {

            ctx.beginPath()

            ctx.roundRect(
                contentX,
                progressY,
                barWidth * progress / 100,
                barHeight,
                3
            )

            ctx.fillStyle =
                node.color ||
                '#9481ed'

            ctx.fill()
        }


        ctx.font =
            '600 10px sans-serif'

        ctx.fillStyle =
            '#6b7280'

        ctx.textBaseline =
            'bottom'

        ctx.fillText(
            `${progress}%`,
            contentX + barWidth + 8,
            progressY + 6
        )
    }


    /*
     * ACTION
     */

    const buttonWidth = 82
    const buttonHeight = 32

    const buttonX =
        x +
        width -
        buttonWidth -
        16

    const buttonY =
        y +
        height -
        buttonHeight -
        14


    ctx.beginPath()

    ctx.roundRect(
        buttonX,
        buttonY,
        buttonWidth,
        buttonHeight,
        9
    )

    ctx.fillStyle =
        node.color ||
        '#9481ed'

    ctx.fill()


    ctx.font =
        '600 11px sans-serif'

    ctx.fillStyle =
        '#ffffff'

    ctx.textAlign =
        'center'

    ctx.textBaseline =
        'middle'

    ctx.fillText(
        getActionLabel(node),
        buttonX + buttonWidth / 2,
        buttonY + buttonHeight / 2
    )


    ctx.restore()
}