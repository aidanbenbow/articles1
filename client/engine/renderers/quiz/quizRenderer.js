import { drawRect, drawTextBlock } from "../../draw/drawHelpers.js"
import { getScreenRect } from "../../modules/renderUtils.js"

export function renderQuiz(ctx, node,state, viewport, lesson) {
    const rect = getScreenRect(node, viewport)

    drawRect(ctx, rect, { showSelection: true })

    const padding = node.padding || 20

    ctx.fillStyle = '#000'
    ctx.font = 'bold 18px Arial'

    ctx.fillText(
        node.question,
        rect.x + padding,
        rect.y + padding
    )

     const quiz =
        lesson.activities?.[node.sectionId]

    const answer =
        quiz?.getAnswer(node.sectionId) ?? null

    // console.log('Quiz:', quiz)
    // console.log('Answer:', answer)

    if (answer !== null) {
        const isCorrect = answer.isCorrect
       
        ctx.fillStyle = isCorrect ? '#00aa00' : '#aa0000'
        
        const scoreText = `Score: ${quiz.getScore(node.sectionId)} / ${lesson.quizTotal}`
ctx.save()
        ctx.font = 'bold 16px Arial'
        ctx.fillStyle = '#000'
        ctx.textAlign = 'right'
        ctx.textBaseline = 'top'
         ctx.fillText(
    scoreText,
    rect.x + rect.width - padding,
    rect.y + padding
)
ctx.restore()
ctx.save()
        ctx.font = 'italic 14px Arial'
        ctx.fillStyle = '#000'
        ctx.textAlign = 'left'
        ctx.textBaseline = 'top'
        
drawTextBlock(
    ctx,
    node.feedback || '',
    node.feedbackX,
    node.feedbackY,
    node.feedbackWidth,
    20
)
ctx.restore()
    }
}