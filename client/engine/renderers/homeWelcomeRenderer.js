import { drawWrappedText } from "../draw/drawHelpers.js"
import { getScreenPosition } from "../modules/renderUtils.js"

export function renderHomeWelcome(
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
    const radius = 20

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
        'rgba(0, 0, 0, 0.08)'

    ctx.shadowBlur = 16
    ctx.shadowOffsetY = 5

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
     * LEFT ACCENT
     * ==================================================
     */

    ctx.save()

    ctx.beginPath()

    ctx.roundRect(
        x,
        y,
        7,
        height,
        radius
    )

    ctx.fillStyle =
        '#9481ed'

    ctx.fill()

    ctx.restore()


    /*
     * ==================================================
     * CONTENT
     * ==================================================
     */

    const padding = 28

    const contentX =
        x + padding + 8

    const contentWidth =
        width - padding * 2 - 8


    /*
     * ==================================================
     * EYEBROW
     * ==================================================
     */

    ctx.textAlign =
        'left'

    ctx.textBaseline =
        'top'

    ctx.font =
        '600 11px sans-serif'

    ctx.fillStyle =
        '#9481ed'

    ctx.fillText(
        'WELCOME',
        contentX,
        y + 23
    )


    /*
     * ==================================================
     * TITLE
     * ==================================================
     */

    ctx.font =
        '700 26px sans-serif'

    ctx.fillStyle =
        '#171717'

    ctx.fillText(
        node.title || 'Welcome',
        contentX,
        y + 45
    )


    /*
     * ==================================================
     * DESCRIPTION
     * ==================================================
     */

    ctx.font =
        '400 14px sans-serif'

    ctx.fillStyle =
        '#6b7280'

    drawWrappedText(
        ctx,
        node.text ||
            'Learn through interactive lessons.',
        contentX,
        y + 82,
        contentWidth,
        20,
        2
    )


    /*
     * ==================================================
     * LEARNING FLOW
     * ==================================================
     */

    const steps = [
        'Read',
        'Think',
        'Answer',
        'Complete'
    ]

    const stepY =
        y + height - 48

    const gap = 18

    const stepWidth =
        (
            contentWidth -
            gap * (steps.length - 1)
        ) /
        steps.length

    steps.forEach(
        (step, index) => {

            const stepX =
                contentX +
                index *
                (stepWidth + gap)

            /*
             * Number
             */

            ctx.beginPath()

            ctx.arc(
                stepX + 12,
                stepY + 10,
                12,
                0,
                Math.PI * 2
            )

            ctx.fillStyle =
                index === 0
                    ? '#9481ed'
                    : '#f0eefc'

            ctx.fill()


            ctx.font =
                '700 11px sans-serif'

            ctx.fillStyle =
                index === 0
                    ? '#ffffff'
                    : '#9481ed'

            ctx.textAlign =
                'center'

            ctx.textBaseline =
                'middle'

            ctx.fillText(
                String(index + 1),
                stepX + 12,
                stepY + 10
            )


            /*
             * Label
             */

            ctx.font =
                '600 12px sans-serif'

            ctx.fillStyle =
                '#4b5563'

            ctx.textAlign =
                'left'

            ctx.textBaseline =
                'middle'

            ctx.fillText(
                step,
                stepX + 30,
                stepY + 10
            )


            /*
             * Connector
             */

            if (
                index <
                steps.length - 1
            ) {

                const connectorX =
                    stepX +
                    stepWidth +
                    2

                ctx.beginPath()

                ctx.moveTo(
                    connectorX,
                    stepY + 10
                )

                ctx.lineTo(
                    connectorX + gap - 8,
                    stepY + 10
                )

                ctx.strokeStyle =
                    '#e5e7eb'

                ctx.lineWidth = 2

                ctx.stroke()
            }
        }
    )

    ctx.restore()
}


