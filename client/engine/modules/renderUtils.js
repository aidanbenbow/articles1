

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

function getScreenRect(node, viewportOrScrollY) {
    const scrollY = resolveScrollY(viewportOrScrollY)
    return {
        x: node.x,
        y: node.worldY - scrollY,
        width: node.width,
        height: node.height,
        color: node.color,
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

        const hasThumbnail = !!rect.thumbnail
        if (hasThumbnail) {
            drawThumbnail(ctx, rect, assetManager)
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

            drawSingleLineText(ctx, { ...rect, x: textX })
            
        drawTextBlock(ctx, node.excerpt || '', textX, rect.y + TEXT_OFFSET_Y, textWidth, LINE_HEIGHT)
        ctx.restore()
    })
}

export function renderLesson(ctx, sections, viewport, answers) {

    for (const section of sections) {

        switch (section.sectionType) {

            case 'heading':
                renderHeading(ctx, section, viewport)
                break

            case 'paragraph':
                renderParagraph(ctx, section, viewport)
                break

            case 'quiz':
                renderQuiz(ctx, section, viewport, answers.quizAnswers, answers.quizScore)
                break
            case 'quizOption':
                renderQuizOption(ctx, section, viewport, answers.quizAnswers)
                break
                case 'survey':
    renderSurvey(ctx, section, viewport, answers.surveyResponses, answers.surveyResults)
    break
    case 'surveyOption':
    renderSurveyOption(ctx, section, viewport, answers.surveyResponses, answers.surveyResults)
    break
        }

    }
}

export function renderSurvey(ctx, section, viewport, responses, results) {

    switch (section.surveyType) {

        case 'single':
            renderSurveySingleChoice(ctx, section, viewport, responses,results)
            break

        // case 'multiple':
        //     renderSurveyMultipleChoice(ctx, section, viewport, responses)
        //     break

       
    }

}

export function renderSurveySingleChoice(
    ctx,
    section,
    viewport,
    responses,
    results
) {

    const rect = getScreenRect(section, viewport)


    const survey =
        results?.[section.surveyId] || {}


    const total =
        survey.totalResponses || 0


    drawRect(ctx, rect, {
        showSelection: true
    })


    drawTextBlock(
        ctx,
        section.question,
        rect.x + 20,
        rect.y + 20,
        rect.width - 40,
        22
    )


    drawTextBlock(
        ctx,
        `${total} responses`,
        rect.x + 20,
        rect.y + 45,
        rect.width - 40,
        16
    )
}

export function renderSurveyOption(
    ctx,
    section,
    viewport,
    responses,
    results
) {

    const rect = getScreenRect(section, viewport)


    const selected =
        responses?.[section.surveyId] === section.optionIndex


    const survey =
        results?.[section.surveyId] || {}


    const surveyResults =
        survey.responses || {}


    const total =
        survey.totalResponses || 0


    const votes =
        surveyResults[section.optionIndex] || 0


    const percentage =
        total > 0
            ? Math.round((votes / total) * 100)
            : 0


    drawRect(ctx, {
        ...rect,
        color: selected
            ? '#b8f5b8'
            : '#d0d0d0'
    })


    drawTextBlock(
        ctx,
        `${section.text}   ${percentage}%`,
        rect.x + 10,
        rect.y ,
        rect.width - 20,
        20
    )
}



export function renderLessonTitle(ctx, node, viewport) {
    const rect = getScreenRect(node, viewport)
    drawRect(ctx, rect, {showSelection: true})
    ctx.fillStyle = TEXT_COLOR
    ctx.font = 'bold 24px Arial'
    ctx.fillText(
        node.text || 'Lesson Title',
        rect.x + 20,
        rect.y + 10
    )
}

function renderHeading(ctx, node, viewport) {

    const rect = getScreenRect(node, viewport)

    ctx.font = 'bold 24px Arial'
    ctx.fillText(
        node.text,
        rect.x + 15,
        rect.y + 20
    )
}

function renderParagraph(ctx, node, viewport) {

    const rect = getScreenRect(node, viewport)

    drawTextBlock(
        ctx,
        node.text,
        rect.x,
        rect.y,
        rect.width,
        22
    )
}

export function renderQuiz(ctx, node, viewport, answers, quizScore) {
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

    const answer = answers?.[node.quizId]

    if (answer) {
        const isCorrect = answer.selected === node.answer
        const resultText = isCorrect
            ? 'Correct!'
            : `Incorrect. Correct answer: ${node.answer}`

        ctx.fillStyle = isCorrect ? '#00aa00' : '#aa0000'
        ctx.font = '16px Arial'
        ctx.fillText(
            resultText,
            rect.x + padding,
            rect.y + padding + 30
        )
         ctx.fillText(
            `Score: ${quizScore}`,
            rect.x + rect.width - 100,
            rect.y + 50
        )
    }
}
export function renderQuizOption(ctx, node, viewport, answers) {

    const rect = getScreenRect(node, viewport)

    const answer = answers?.[node.quizId]

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


function drawThumbnail(ctx, rect, assetManager) {

    if (!rect.thumbnail) return

    const img = assetManager.loadImage(rect.thumbnail)

    if (!img.complete|| img.naturalWidth === 0) return

    const size = rect.thumbnailSize || 80

    ctx.drawImage(
        img,
        rect.x + 15,
        rect.y + 15,
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

export function drawSingleLineText(ctx, rect) {
    ctx.fillStyle = TEXT_COLOR
    ctx.font = FONT
    ctx.fillText(rect.text || '', rect.x + TEXT_OFFSET_X, rect.y + TEXT_OFFSET_Y)
}


export function drawTextBlock(ctx, text, x, y, maxWidth, lineHeight) {
    ctx.fillStyle = TEXT_COLOR
    ctx.font = FONT
    wrapText(ctx, text || '', x + TEXT_OFFSET_X, y + TEXT_OFFSET_Y, maxWidth - 20, lineHeight)
}


export function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
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



