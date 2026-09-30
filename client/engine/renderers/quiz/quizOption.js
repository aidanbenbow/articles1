
import { drawRect } from "../../draw/drawHelpers.js"
import { getScreenRect } from "../../modules/renderUtils.js"

export function renderQuizOption(ctx, node, viewport, context) {

    const rect = getScreenRect(node, viewport)
const lesson = context.lesson
    const quiz = lesson.activities?.[node.sectionId]
    const answer = quiz?.getAnswer(node.quizId)

const answered = !!answer
const isSelected = answer?.selected === node.optionIndex
const isCorrect = node.optionIndex === node.answer

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

    // text
    const typo = context.typography?.[node.typography] || context.typography.body
    ctx.font = `${typo.fontWeight} ${typo.fontSize}px ${typo.fontFamily}`
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