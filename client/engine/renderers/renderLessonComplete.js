import { getScreenPosition } from "../modules/renderUtils.js"

export function renderLessonComplete(ctx, view, viewport) {
   const backButtonNode = view.buttonNodes.find(node => node.sectionType === 'backButton')
    ctx.clearRect(0, 0, viewport.width, viewport.height)
    renderLessonCompleteScreen(ctx,view, viewport)
    renderBackButton(ctx, backButtonNode, viewport)
}

function renderLessonCompleteScreen(ctx, view, viewport) {
    const centerX = viewport.width / 2
    const centerY = viewport.height / 2

    // Background
    ctx.fillStyle = '#f7fafb'
    ctx.fillRect(  0,  0,  viewport.width,  viewport.height)

    // Completion circle
    const circleRadius = 42

    ctx.beginPath()
    ctx.arc(
        centerX,
        centerY - 90,
        circleRadius,
        0,
        Math.PI * 2
    )

    ctx.fillStyle = '#23979d'
    ctx.fill()

    // Checkmark
    ctx.beginPath()
    ctx.moveTo(centerX - 16, centerY - 90)
    ctx.lineTo(centerX - 5, centerY - 78)
    ctx.lineTo(centerX + 18, centerY - 103)

    ctx.strokeStyle = '#fff'
    ctx.lineWidth = 5
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.stroke()

    // Heading
    ctx.font = 'bold 28px Arial'
    ctx.fillStyle = '#1f2933'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
const title = view.lessonTitle || 'Lesson Complete!'
    ctx.fillText(
        title,
        centerX,
        centerY - 20
    )

    // Subtitle
    ctx.font = '16px Arial'
    ctx.fillStyle = '#667085'
const sectionCount = view.completedSections.length || 0
    ctx.fillText(
        `You completed ${sectionCount} section${sectionCount !== 1 ? 's' : ''}.`,
        centerX,
        centerY + 10
    )

    const quizScore = view.quizScore
    const quizTotal = view.quizTotal
    if (quizTotal > 0) {
        ctx.fillText(
            `Quiz Score: ${quizScore} / ${quizTotal}`,
            centerX,
            centerY + 40
        )
    }

    ctx.fillText(
        'Great work! You finished this lesson.',
        centerX,
        centerY + 20
    )
}

function renderBackButton(
    ctx,
    node,
    viewport
) {

    if (!node) {
        console.warn(
            'No back button node available'
        )
        return
    }

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

    const width = node.width || 120
    const height = node.height || 40
    const radius = 10

    ctx.save()

    ctx.beginPath()

    ctx.roundRect(
        x,
        y,
        width,
        height,
        radius
    )

    ctx.fillStyle =
        node.color || '#23979d'

    ctx.fill()

    ctx.font =
        '600 15px Arial'

    ctx.fillStyle =
        '#fff'

    ctx.textAlign =
        'center'

    ctx.textBaseline =
        'middle'

    ctx.fillText(
        node.text || 'Back',
        x + width / 2,
        y + height / 2
    )

    ctx.restore()
}