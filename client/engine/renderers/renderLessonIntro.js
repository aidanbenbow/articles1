import { getScreenRect, renderButtons, renderLessonTitle, wrapText } from "../modules/renderUtils.js"

export function renderLessonIntro(ctx, view, viewport) {

   const titleNode = view.lessonTitleNodes[0]
   const introNode = view.lessonIntroNodes[0]
   const buttonNode = view.buttonNodes.find(node => node.kind === 'startLessonButton')
console.log("title node", titleNode)
   if(titleNode) {
       renderLessonTitle(ctx, titleNode, viewport)
   }
    if(introNode) {
        renderLessonIntroText(ctx, introNode, viewport)
    }
    if(buttonNode) {
        renderButtons(ctx, [buttonNode], viewport)
    }
}

function renderLessonIntroText(ctx, node, viewport) {

    const rect = getScreenRect(node, viewport)

    ctx.fillStyle = node.color
    ctx.fillRect(
        rect.x,
        rect.y,
        rect.width,
        rect.height
    )

    ctx.fillStyle = '#000'
    ctx.font = '16px Arial'
   // ctx.textBaseline = 'top'

    const lines = getWrappedLines(ctx, node.text || '', rect.width - 2 * node.padding)
    let y = rect.y + node.padding

    for(const line of lines) {
        ctx.fillText(
            line,
            rect.x + node.padding,
            y
        )

        y += 20
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