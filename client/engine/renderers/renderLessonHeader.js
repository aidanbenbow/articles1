export function renderLessonHeader(
    ctx,
    lesson,
    viewport
){

    if(!lesson) return
const x = 20
const y = 20
const width = viewport.width - 40

    ctx.fillStyle = '#f8fafc'

    ctx.fillRect(
        x,
        y,
        width,
        78
    )

    ctx.fillStyle = '#e2e8f0'

ctx.fillRect(
    x,
    y + 78,
    width,
    1
)

// Current stage
    ctx.fillStyle = '#111827'
    ctx.font = 'bold 16px Arial'

    ctx.textAlign = 'left'

    ctx.fillText(
        lesson.sections[lesson.currentSectionIndex]?.id || 'The Investigation',
        x + 20,
        y + 30
    )

    // Step counter
    ctx.fillStyle = '#64748b'
    ctx.font = '14px Arial'

    ctx.textAlign = 'left'

    ctx.fillText(
        `${lesson.currentSectionIndex + 1} / ${lesson.sections.length}`,
        x + width/2,
        y + 30
    )

    ctx.textAlign = 'right'
ctx.fillStyle = '#000000'
ctx.font = 'bold 16px Arial'

ctx.fillText(
    `${lesson.quizScore}/${lesson.quizTotal}`,
    viewport.width - 40,
    50
)

ctx.textAlign = 'left'


    const progress = Math.max(
    0,
    Math.min(1, lesson.getProgress() / 100)
)

const barX = 40
const barY = 62
const barWidth = viewport.width - 80
const barHeight = 8

ctx.fillStyle = '#e5e7eb'
ctx.fillRect(
    barX,
    barY,
    barWidth,
    barHeight
)

ctx.fillStyle = '#2563eb'
ctx.fillRect(
    barX,
    barY,
    barWidth * progress,
    barHeight
)

}