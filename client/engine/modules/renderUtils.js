
import { getSurveyResult } from "../helpers/surveyResults.js";
import { renderFinishButton } from "../renderers/buttons/finishButton.js";
import { renderOrderingButton } from "../renderers/ordering/orderingButton.js";
import { renderOrderingCheck } from "../renderers/ordering/orderingCheck.js";
import { renderOrderingItem } from "../renderers/ordering/orderingListRenderer.js";
import { renderOrdering } from "../renderers/ordering/orderingRenderer.js";


const DEFAULT_FILL_COLOR = '#791e1e';
const TEXT_COLOR = '#000000';
const SELECTION_COLOR = '#ff0000';
//const FONT = '16px Arial';
const FONT = '16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
const TEXT_OFFSET_X = 10;
const TEXT_OFFSET_Y = 30;
const LINE_HEIGHT = 20;


function resolveScrollY(viewportOrScrollY) {
    if (typeof viewportOrScrollY === 'number') return viewportOrScrollY
    return viewportOrScrollY?.y || 0
}

export function getScreenRect(node, viewportOrScrollY) {
    const scrollY = resolveScrollY(viewportOrScrollY)
    return {
        x: node.x,
        y: node.worldY - scrollY,
        width: node.width,
        height: node.height,
        color: node.color,
        progress: node.progress,
        selected: node.selected,
        type: node.type,
        kind: node.kind,
        text: node.text,
        excerpt: node.excerpt,
        content: node.content,
        thumbnail: node.thumbnail,
        thumbnailSize: node.thumbnailSize,
        contentOffsetY: node.contentOffsetY,
        lineHeight: node.lineHeight,
        padding: node.padding,
        borderRadius: node.borderRadius,
        shadow: node.shadow,
    }
}

export function getScreenPosition(rect, viewportOrScrollY) {
    return {
        x: rect.x,
        y: rect.worldY - resolveScrollY(viewportOrScrollY)
    }
}

export function renderReportsToDo(ctx, node, viewport) {
    const rect = getScreenRect(node, viewport)
    drawRectLabel(ctx, rect, {showSelection: true})
}

export function renderBackground(ctx, width, height, bgColor) {
    ctx.clearRect(0, 0, width, height)
    ctx.fillStyle = bgColor || DEFAULT_FILL_COLOR
    ctx.fillRect(0, 0, width, height)
}

export function renderHeader(ctx, node, viewport) {
    const rect = getScreenRect(node, viewport)
    drawRect(ctx, rect, {showSelection: true})
    ctx.fillStyle = TEXT_COLOR
    ctx.font = FONT
    const halfWidth = rect.width / 2
    const textWidth = ctx.measureText(rect.text || '').width
    const textX = rect.x + halfWidth - textWidth / 2
    ctx.fillText(rect.text || '', textX, rect.y + TEXT_OFFSET_Y)
}

export function renderButtons(ctx, nodes, viewport) {
    nodes.forEach(node => {
        const rect = getScreenRect(node, viewport)
        drawRectLabel(ctx, rect, {showSelection: true})
    })
}

export function renderInputBoxes(ctx, nodes, viewport, searchTerm) {
    nodes.forEach(node => {
        
        const rect = getScreenRect(node, viewport)
     
       drawRect(ctx, rect, {showSelection: true})
        drawTextBlock(ctx, searchTerm || '', rect.x, rect.y, rect.width, LINE_HEIGHT)
    })
}

export function renderReports(ctx, nodes, viewport, assetManager) {
    nodes.forEach(node => {
        const rect = getScreenRect(node, viewport)
        drawRect(ctx, rect, {showSelection: true})

        const hasThumbnail = !!node.thumbnail
        if (hasThumbnail) { 
            drawThumbnail(ctx, node,rect, assetManager)
        }

        const textX = hasThumbnail
            ? rect.x + rect.thumbnailSize + 30
            : rect.x

       const textWidth = rect.thumbnail
    ? rect.width - rect.thumbnailSize - 50
    : rect.width - 20

    ctx.save()
    ctx.beginPath()
    ctx.rect(rect.x, rect.y, rect.width, rect.height)
    ctx.clip()

            drawSingleLineText(ctx, { ...rect, x: textX }, true)
            
        drawTextBlock(ctx, node.description, textX, rect.y + TEXT_OFFSET_Y, textWidth, LINE_HEIGHT)
        renderProgress(
            ctx,
            node.progress,
            textX,
            rect.y + rect.height - 15,
            textWidth
        )
        ctx.restore()
    })
}

function renderProgress(ctx, progress, x, y, width) {
    const percent = progress?.progressPercent || 0
    const status = progress?.status || 'not-started'

    const barHeight = 6
    ctx.save()
    ctx.fillStyle = '#d0d0d0'
    ctx.fillRect(x, y, width, barHeight)
    if(percent > 0) {
        ctx.fillStyle = '#23979d'
        ctx.fillRect(x, y, width * (percent / 100), barHeight)
    }
    const label = status === 'completed' ? 'Completed' : status === 'in_progress' ? `${percent}%` : 'Not Started'
    drawSingleLineText(ctx, { x: x + width - 80, y: y - 15, text: label }, true)
    ctx.restore()
}

export function renderLesson(ctx, sections, viewport, lesson) {
   //console.log('renderLesson', sections)
    for (const section of sections) {

        const state =
            lesson.getSectionState(
                section.sectionId
            )

        renderLessonSection(
            ctx,
            section,
            state,
            viewport,
            lesson
        )
    }
  
    }

    function renderLessonSection(
    ctx,
    section,
    state,
    viewport,
    lesson
) {

    switch (section.sectionType) {

        case 'lessonHeading':
            renderHeading(
                ctx,
                section,
                state,
                viewport
            )
            break

        case 'lessonParagraph':
            renderParagraph(
                ctx,
                section,
                state,
                viewport,
                lesson
            )
            break

        case 'quiz':
            renderQuiz(
                ctx,
                section,
                state,
                viewport,
                lesson
            )
            break

            case 'quizOption':
            renderQuizOption(
                ctx,
                section,
                viewport,
                lesson
            )
            break

        case 'survey':
            renderSurvey(
                ctx,
                section,
                state,
                viewport,
                lesson
            )
            break
            case 'surveyOption':
            renderSurveyOption(
                ctx,
                section,
                viewport,
                lesson
            )
            break
             case 'ordering':
            renderOrdering(
                ctx,
                section,
                state,
                viewport,
                lesson
            )
            break

        case 'orderingItem':
            renderOrderingItem(
                ctx,
                section,
                state,
                viewport,
                lesson
            )
            break

        case 'orderingButton':
            renderOrderingButton(
                ctx,
                section,
                state,
                viewport,
                lesson
            )
            break

        case 'orderingCheck':
            renderOrderingCheck(
                ctx,
                section,
                state,
                viewport,
                lesson
            )
            break
            case 'continueButton':
            renderContinueButton(
                ctx,
                section,
                viewport
            )
            break
            case 'finishButton':
            renderFinishButton(
                ctx,
                section,
                viewport
            )
            break
            
    }

}

function renderHeading(
    ctx,
    node,
    state,
    viewport
) {
    const rect = getScreenRect(node, viewport)

    let icon = ''

switch (state) {

    case 'completed':
        icon = '✓'
        break

    case 'current':
        icon = '▶'
        break

    case 'locked':
        icon = '○'
        break
}ctx.save()
 

    // Draw the text
    ctx.fillStyle = 'black'
    ctx.font = 'bold 20px sans-serif'
    ctx.textBaseline = 'top'
ctx.fillText(
    `${icon} ${node.text}`,
    rect.x + 15,
    rect.y + 20
)
ctx.restore()
}

function renderParagraph(ctx, node,state, viewport, lesson) {

    const rect = getScreenRect(node, viewport)

    const sectionState =
        lesson.getSectionState(node.sectionId)


    if (sectionState === 'locked') {

        drawRect(ctx, {
            ...rect,
            color: '#eeeeee'
        })

        ctx.fillStyle = '#999'
        ctx.fillText(
            'Complete previous sections',
            rect.x + 20,
            rect.y + 30
        )

        return
    }


    drawTextBlock(
        ctx,
        node.text,
        rect.x,
        rect.y,
        rect.width,
        22
    )


    if(sectionState === 'current') {

        ctx.strokeStyle = '#00aa00'
        ctx.strokeRect(
            rect.x,
            rect.y,
            rect.width,
            rect.height
        )

    }

}




export function renderLessonTitle(ctx, node, viewport) {
    const rect = getScreenRect(node, viewport)
    drawRect(ctx, rect, {showSelection: true})
    ctx.fillStyle = TEXT_COLOR
    ctx.font = 'bold 24px Arial'
    ctx.fillText(
        node.text || 'Lesson Title',
        rect.x + 20,
        rect.y + rect.height - 10
    )
}





export function renderQuiz(ctx, node,state, viewport, lesson) {
    const rect = getScreenRect(node, viewport)

    drawRect(ctx, rect)

    const padding = node.padding || 20

    ctx.fillStyle = '#000'
    ctx.font = 'bold 18px Arial'

    ctx.fillText(
        node.question,
        rect.x + padding,
        rect.y + padding
    )

    const answer = lesson.quizAnswers?.[node.quizId]

    if (answer) {
        const isCorrect = answer.selected === node.answer
       
        ctx.fillStyle = isCorrect ? '#00aa00' : '#aa0000'
        
        const scoreText = `Score: ${lesson.quizScore}`
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
    ctx.font = FONT

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

export function renderSurvey(ctx, section,state, viewport, lesson) {

    switch (section.surveyType) {

        case 'single':
            renderSurveySingleChoice(ctx, section,state, viewport, lesson)
            break

        case 'multiple':
            renderSurveySingleChoice(ctx, section,state, viewport, lesson)
            break

       
    }

}

export function renderSurveySingleChoice(
    ctx,
    section,
    state,
    viewport,
   lesson
) {

    const rect = getScreenRect(section, viewport)


    const response =
        lesson.surveyResponses?.[section.surveyId] || {}
const results = lesson.surveyResults?.[section.surveyId] || {}

    const total = results.totalResponses || 0
        


    drawRect(ctx, rect, {
        showSelection: true
    })


    drawTextBlock(
        ctx,
        section.question,
        section.questionX,
        section.questionY,
        section.questionWidth,
        22
    )


    drawTextBlock(
        ctx,
        `${total} responses`,
        section.responseX,
        section.responseY,
        section.responseWidth,
        16
    )

    if (response) {

        drawTextBlock(
            ctx,
            response.feedback,
            section.feedbackX,
            section.feedbackY,
            section.feedbackWidth,
            16
        )
    }
}


export function renderSurveyOption(
    ctx,
    section,
    viewport,
    lesson
) {

    const rect = getScreenRect(section, viewport)


    const selected =
        lesson.surveyResponses?.[section.surveyId] === section.optionIndex

    const { votes, percentage } = getSurveyResult(
        lesson,
        section.surveyId,
        section.optionIndex
    )


    drawRect(ctx, {
        ...rect,
        color: selected
            ? '#b8f5b8'
            : '#d0d0d0'
    })

    // Percentage bar
    const barHeight = 6
    const barWidth =
        rect.width * (percentage / 100)

    ctx.fillStyle = '#23979d'

    ctx.fillRect(
        rect.x,
        rect.y + rect.height - barHeight,
        barWidth,
        barHeight
    )
    ctx.save()
if (selected) {
    ctx.font = 'bold 18px Arial'
    ctx.fillStyle = '#23979d'
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'

    ctx.fillText(
        '✓',
        rect.x + 12,
        rect.y + rect.height / 2
    )
}
    drawTextBlock(
        ctx,
        section.text,
        rect.x + 10,
        rect.y ,
        rect.width - 20,
        20
    )

      // Percentage
    ctx.font = 'bold 16px Arial'
    ctx.fillStyle = '#333'
    ctx.textAlign = 'right'
    ctx.textBaseline = 'middle'

    ctx.fillText(
        `${percentage}%`,
        rect.x + rect.width - 15,
        rect.y + rect.height / 2
    )

    // Vote count
    ctx.font = '12px Arial'
    ctx.fillStyle = '#777'

    ctx.fillText(
        `${votes} ${votes === 1 ? 'response' : 'responses'}`,
        rect.x + rect.width - 15,
        rect.y + rect.height / 2 + 18
    )
    ctx.restore()
}

function renderContinueButton(
    ctx,
    node,
    viewport
) {

    const rect = getScreenRect(node, viewport)

    drawRect(ctx, rect, {showSelection: true})

    ctx.fillStyle = TEXT_COLOR
    ctx.font = 'bold 18px Arial'

    const textWidth = ctx.measureText(node.text || '').width
    const textX = rect.x + rect.width / 2 - textWidth / 2

    ctx.fillText(
        node.text || 'Continue',
        textX,
        rect.y + 20
    )
}


function drawThumbnail(ctx, node,pos, assetManager) {

    if (!node.thumbnail) return

    const img = assetManager.loadImage(node.thumbnail)
   

    if (!img.complete|| img.naturalWidth === 0) return

    const size = node.thumbnailSize || 80
   

    ctx.drawImage(
        img,
        node.x + 15,
        pos.y+15,
        size,
        size
    )
}

export function drawRectLabel(ctx, rect, options = {}) {
    drawRect(ctx, rect, options)
    drawSingleLineText(ctx, rect)
}

export function drawRect(ctx, rect, { showSelection = false } = {}) {
    const { x, y, width, height } = rect
    const radius = rect.borderRadius ?? 12

    ctx.save()

    if (rect.shadow) {
        ctx.shadowColor = 'rgba(0,0,0,0.12)'
        ctx.shadowBlur = 12
        ctx.shadowOffsetY = 4
    }

    ctx.fillStyle = rect.color || DEFAULT_FILL_COLOR
    roundRect(ctx, x, y, width, height, radius)
    ctx.fill()

    if (showSelection && rect.selected) {
        ctx.shadowColor = 'transparent'
        ctx.strokeStyle = SELECTION_COLOR
        ctx.lineWidth = 2
        roundRect(ctx, x, y, width, height, radius)
        ctx.stroke()
    }

    ctx.restore()
}

function roundRect(ctx, x, y, width, height, radius) {
    const r = Math.min(radius, width / 2, height / 2)
    ctx.beginPath()
    ctx.moveTo(x + r, y)
    ctx.arcTo(x + width, y, x + width, y + height, r)
    ctx.arcTo(x + width, y + height, x, y + height, r)
    ctx.arcTo(x, y + height, x, y, r)
    ctx.arcTo(x, y, x + width, y, r)
    ctx.closePath()
}

export function drawSingleLineText(ctx, rect, bold=false) {
    ctx.fillStyle = TEXT_COLOR
    ctx.font = bold ? `bold ${FONT}` : FONT
    ctx.fillText(rect.text || '', rect.x + TEXT_OFFSET_X, rect.y + TEXT_OFFSET_Y)
}


function drawTextBlock(ctx, text, x, y, maxWidth, lineHeight) {
    ctx.fillStyle = TEXT_COLOR
    ctx.font = FONT
    wrapText(ctx, text || '', x + TEXT_OFFSET_X, y + TEXT_OFFSET_Y, maxWidth - 20, lineHeight)
}


function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ')
    let line = ''

    for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' '
        const metrics = ctx.measureText(testLine)
        const testWidth = metrics.width

        if (testWidth > maxWidth && n > 0) {
            ctx.fillText(line, x, y)
            line = words[n] + ' '
            y += lineHeight
        } else {
            line = testLine
        }
    }
    ctx.fillText(line, x, y)
}

export function renderArticle(ctx, node, viewport) {
    ctx.save()
    ctx.textBaseline = 'top'
    const rect = getScreenRect(node, viewport)

    drawRect(ctx, rect, { showSelection: true })

    const padding = node.padding ?? 20
    const titleFontSize = 20
    const titleHeight = titleFontSize + 12
    const bodyY = rect.y + padding + titleHeight
    const bodyHeight = rect.height - titleHeight - padding * 2

    // Draw title with stronger styling
    ctx.fillStyle = TEXT_COLOR
    ctx.font = `bold ${titleFontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
    ctx.fillText(
        node.text || 'Article',
        rect.x + padding,
        rect.y + padding
    )

    // Draw body content with wrapping
    drawTextBlockClipped(
        ctx,
        node.content || '',
        rect.x + padding,
        bodyY,
        rect.width - padding * 2,
        bodyHeight,
        node.lineHeight || 24,
        node.contentOffsetY || 0
    )

    // Reset font for other renders
    ctx.font = FONT
    ctx.restore()
}


export function drawTextBlockClipped(ctx, text, x, y, maxWidth, maxHeight, lineHeight, offsetY = 0) {
    // clip to rect bounds so text doesn't bleed outside
    ctx.save()
    ctx.beginPath()
    ctx.rect(x, y + TEXT_OFFSET_Y, maxWidth, maxHeight)
    ctx.clip()

    ctx.fillStyle = TEXT_COLOR
    ctx.font = FONT

    // shift text up by scrollY offset
    wrapText(ctx, text || '', x + TEXT_OFFSET_X, y + TEXT_OFFSET_Y - offsetY, maxWidth - 20, lineHeight)

    ctx.restore()
}



