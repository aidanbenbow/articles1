import { DRAWING_CONSTANTS } from "../../constants/drawingConstants.js"
import { drawRect } from "../../draw/drawHelpers.js"
import { getScreenRect } from "../../modules/renderUtils.js"

export function renderQuizOption(ctx, node, viewport, lesson) {

    const rect = getScreenRect(node, viewport)

    const answer = lesson.quizAnswers?.[node.quizId]

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
    ctx.beginPath()
    ctx.arc(
        rect.x + 12,
        rect.y + rect.height / 2,
        6,
        0,
        Math.PI * 2
    )
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
    ctx.fillStyle = '#000'
    ctx.font = DRAWING_CONSTANTS.fonts.quizOption

    ctx.fillText(
        node.text,
        rect.x + 28,
        rect.y + rect.height / 2 + 5
    )

    // result marker
    if(answered) {
        if(isCorrect) {

            ctx.fillText(
                '✓',
                rect.x + rect.width - 25,
                rect.y + rect.height / 2 + 5
            )

        }

        if(isSelected && !isCorrect) {

            ctx.fillText(
                '✗',
                rect.x + rect.width - 25,
                rect.y + rect.height / 2 + 5
            )

        }
    }
}