
import { drawRect } from "../../draw/drawHelpers.js"
import { getScreenRect } from "../../modules/renderUtils.js"

export function renderQuizOption(ctx, node, viewport, context) {

    const rect = getScreenRect(node, viewport)

const answered = node.answered
const isSelected = node.selected
const isCorrect = node.correct

    let color = '#d0d0d0'

    if (answered) {

        if (isCorrect) {
            color = '#b8f5b8'
        }

        if (isSelected && !isCorrect) {
            color = '#f5b8b8'
        }

    }

    drawRect(ctx, {
        ...rect,
        color
    })


    // radio
    ctx.save()
    const centerX = rect.x + 12
    const centerY = rect.y + rect.height / 2
    ctx.fillStyle = '#ffffff'
    ctx.strokeStyle = '#000000'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.arc( centerX, centerY, 6, 0, Math.PI * 2)
    ctx.stroke()

    if (isSelected) {
        ctx.beginPath()
        ctx.arc(
            rect.x + 12,
            rect.y + rect.height / 2,
            3,
            0,
            Math.PI * 2
        )
        ctx.fill()
    }

    // Typography
    const typography = context.metrics.typography;

    const typo =
        typography?.[node.typography] ??
        typography?.body;

    if (!typo) {
        ctx.restore();
        return;
    }

    const family =
        typo.family ??
        typography.family ??
        "sans-serif";

    ctx.font = `${typo.weight ?? 400} ${typo.size ?? 14}px ${family}`;
ctx.fillStyle = typo.color
ctx.textBaseline = 'middle'
ctx.textAlign = 'left'
    ctx.fillText( node.text, rect.x + 28, centerY)

     if (answered) {
        let marker = null

        if (isCorrect) {
            marker = '✓'
        } else if (
            isSelected &&
            !isCorrect
        ) {
            marker = '✗'
        }

        if (marker) {
            ctx.textAlign = 'right'

            ctx.fillText(
                marker,
                rect.x +
                    rect.width -
                    15,
                centerY
            )
        }
    }

    ctx.restore()
}