import { drawWrappedText } from "../draw/drawHelpers.js"
import { getScreenPosition } from "../modules/renderUtils.js"

export function renderLessonCard(
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
console.log(
        'LESSON CARD RECT',
        
    )
    const {
        x,
        y,
        
    } = rect
const width = node.width || 600
const height = node.height || 160
    const radius = 16

    ctx.save()


    /*
     * ==================================================
     * CARD
     * ==================================================
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
        'rgba(0, 0, 0, 0.07)'

    ctx.shadowBlur = 12
    ctx.shadowOffsetY = 4

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
     * ==================================================
     * ACCENT
     * ==================================================
     */

    const accent =
        node.color || '#9481ed'

    ctx.beginPath()

    ctx.roundRect(
        x,
        y,
        5,
        height,
        radius
    )

    ctx.fillStyle =
        accent

    ctx.fill()


    /*
     * ==================================================
     * CONTENT
     * ==================================================
     */

    const padding = 22

    const contentX =
        x + padding + 6

    const contentWidth =
        width -
        padding * 2 -
        6


    /*
     * ==================================================
     * LESSON NUMBER / LABEL
     * ==================================================
     */

    ctx.textAlign =
        'left'

    ctx.textBaseline =
        'top'

    ctx.font =
        '600 10px sans-serif'

    ctx.fillStyle =
        accent

    ctx.fillText(
        node.label ||
            'LESSON',
        contentX,
        y + 19
    )


    /*
     * ==================================================
     * TITLE
     * ==================================================
     */

    ctx.font =
        '700 20px sans-serif'

    ctx.fillStyle =
        '#171717'

    drawWrappedText(
        ctx,
        node.title ||
            'Lesson',
        contentX,
        y + 40,
        contentWidth,
        25,
        2
    )


    /*
     * ==================================================
     * DESCRIPTION
     * ==================================================
     */

    if (node.description) {

        ctx.font =
            '400 13px sans-serif'

        ctx.fillStyle =
            '#6b7280'

        drawWrappedText(
            ctx,
            node.description,
            contentX,
            y + 91,
            contentWidth,
            19,
            2
        )
    }


    /*
     * ==================================================
     * FOOTER
     * ==================================================
     */

    const footerY =
        y + height - 34


    /*
     * Progress
     */

    if (
        typeof node.progressPercent ===
        'number'
    ) {

        const progress =
            Math.max(
                0,
                Math.min(
                    100,
                    node.progressPercent
                )
            )

        const progressWidth =
            Math.min(
                150,
                contentWidth * 0.45
            )

        const progressHeight =
            6

        ctx.beginPath()

        ctx.roundRect(
            contentX,
            footerY,
            progressWidth,
            progressHeight,
            3
        )

        ctx.fillStyle =
            '#e5e7eb'

        ctx.fill()


        const fillWidth =
            progressWidth *
            progress /
            100

        if (fillWidth > 0) {

            ctx.beginPath()

            ctx.roundRect(
                contentX,
                footerY,
                fillWidth,
                progressHeight,
                3
            )

            ctx.fillStyle =
                accent

            ctx.fill()
        }


        ctx.font =
            '600 11px sans-serif'

        ctx.fillStyle =
            '#6b7280'

        ctx.textAlign =
            'left'

        ctx.textBaseline =
            'bottom'

        ctx.fillText(
            `${progress}%`,
            contentX +
                progressWidth +
                10,
            footerY + 7
        )
    }


    /*
     * ==================================================
     * ACTION
     * ==================================================
     */

    const buttonWidth = 76
    const buttonHeight = 30

    const buttonX =
        x +
        width -
        buttonWidth -
        18

    const buttonY =
        y +
        height -
        buttonHeight -
        18

    ctx.beginPath()

    ctx.roundRect(
        buttonX,
        buttonY,
        buttonWidth,
        buttonHeight,
        9
    )

    ctx.fillStyle =
        accent

    ctx.fill()


    ctx.font =
        '600 12px sans-serif'

    ctx.fillStyle =
        '#ffffff'

    ctx.textAlign =
        'center'

    ctx.textBaseline =
        'middle'

    ctx.fillText(
        node.actionLabel ||
            'Start',
        buttonX +
            buttonWidth / 2,
        buttonY +
            buttonHeight / 2
    )


    ctx.restore()
}