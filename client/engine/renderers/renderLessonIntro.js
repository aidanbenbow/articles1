import { getScreenRect, renderButtons, renderLessonTitle } from "../modules/renderUtils.js"

export function renderLessonIntro(ctx, view, viewport) {

   const titleNode = view.lessonTitleNodes[0]
   const descriptionNode = view.lessonDescriptionNodes[0]
   const statsNode = view.lessonStatsNodes[0]
   const buttonNode = view.buttonNodes.find(node => node.kind === 'lessonStartButton')

   if(titleNode) {
       renderLessonTitle(ctx, titleNode, viewport)
   }
    if(descriptionNode) {
        renderLessonDescription(ctx, descriptionNode, viewport, view)
    }
    if(statsNode) {
        renderLessonStats(ctx, statsNode, viewport, view)
    }
    if(buttonNode) {
        renderButtons(ctx, [buttonNode], viewport)
    }
}

function renderLessonDescription(ctx, node, viewport, view) {
    const rect = getScreenRect(node, viewport)
    const padding = node.padding || 10

    ctx.fillStyle = node.color
    ctx.fillRect(
        rect.x,
        rect.y,
        rect.width,
        rect.height
    )

    ctx.fillStyle = '#000'
    ctx.font = '16px Arial'
    const text = node.text || ''
    const lines = getWrappedLines(ctx, text, rect.width - 2 * padding)

    let y = rect.y + padding
    for(const line of lines) {
        ctx.fillText(
            line,
            rect.x + padding,
            y
        )
        y += 20
    }

}

function renderLessonStats(ctx, node, viewport)  {
    const rect = getScreenRect(node, viewport)
    const padding = node.padding || 10

    ctx.fillStyle = node.color
    ctx.font = '16px Arial'
    const text = node.text || ''
    ctx.fillText(
        text,
        rect.x + padding,
        rect.y + padding
    )
}

function renderLessonIntroText(ctx, node, viewport, view) {

    const rect = getScreenRect(node, viewport)

    ctx.fillStyle = node.color
    ctx.fillRect(
        rect.x,
        rect.y,
        rect.width,
        rect.height
    )

const padding = node.padding || 10
let y = rect.y + padding

    ctx.fillStyle = '#000'
    ctx.font = '16px Arial'
   // ctx.textBaseline = 'top'

   const description = view.lessonDescription || ''

    const lines = getWrappedLines(ctx, description, rect.width - 2 * node.padding)
    

    for(const line of lines) {
        ctx.fillText(
            line,
            rect.x + node.padding,
            y
        )

        y += 20
    }

    y += 10
    const stats = []
    if(view.lessonTotal>0) {
        stats.push(`${view.lessonTotal} lessons`)
    }
    if(view.quizTotal>0) {
        stats.push(`${view.quizTotal} quizzes`)
    }
    if(view.surveyTotal>0) {
        stats.push(`${view.surveyTotal} surveys`)
    }
    if(stats.length>0) {
        const statsText = stats.join(' • ')
        ctx.fillText(
            statsText,
            rect.x + node.padding,
            y
        )
    }
}
 
export function getWrappedLines(ctx, text, maxWidth) {

    const words = text.split(' ')
    const lines = []

    let line = ''

    for (let n = 0; n < words.length; n++) {

        const testLine = line + words[n] + ' '
        const testWidth = ctx.measureText(testLine).width

        if (testWidth > maxWidth && n > 0) {
            lines.push(line.trim())
            line = words[n] + ' '
        } else {
            line = testLine
        }
    }

    if (line) {
        lines.push(line.trim())
    }

    return lines
}