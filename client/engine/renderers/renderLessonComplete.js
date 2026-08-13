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
    ctx.fillRect(
        0,
        0,
        viewport.width,
        viewport.height
    )

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

function renderBackButton(ctx, backButtonNode, viewport) {
    if (!backButtonNode) return

    const buttonWidth = 120
    const buttonHeight = 40
    const buttonX = (viewport.width - buttonWidth) / 2
    const buttonY = viewport.height - 80

    ctx.fillStyle = backButtonNode.props?.color || '#23979d'
    ctx.fillRect(
        buttonX,
        buttonY,
        buttonWidth,
        buttonHeight
    )

    ctx.font = '16px Arial'
    ctx.fillStyle = '#fff'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(
        backButtonNode.props?.text || 'Back',
        buttonX + buttonWidth / 2,
        buttonY + buttonHeight / 2
    )

}