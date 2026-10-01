import { LAYOUT } from "../constants/layoutConstants.js"
import { getScreenRect } from "../modules/renderUtils.js"

export function renderLessonHeader(
    ctx,
    node,
    viewport,
    context
){
     
    const lesson = context.lesson
    if(!lesson) return
const responsive = context.responsive

const layout = responsive.lessonHeader

const rect = getScreenRect(node, viewport)
const { x, y } = rect
const width = node.width
const height = node.height
const score = lesson.getScoreTotal()
const totalScore = lesson.quizTotal
const section = lesson.sections[lesson.currentSectionIndex]
const sectionIndex = lesson.currentSectionIndex
const sectionCount = lesson.sections.length
const progress = Math.max(0, Math.min(1, lesson.getProgress() / 100))
const px = layout.paddingX || 20
const py = layout.paddingY || 20
ctx.save()
    ctx.fillStyle = '#f8fafc'

    ctx.fillRect( x, y, width, height)

    ctx.fillStyle = '#e2e8f0'

ctx.fillRect(x,y + height,width,1)

/*
     * Header bottom border
     */
    ctx.fillStyle = '#e2e8f0'

    ctx.fillRect(
        x,
        y + height,
        width,
        1
    )

    /*
     * Current stage
     */
    ctx.fillStyle = '#111827'
    ctx.font = `700 ${layout.stageFontSize}px ${LAYOUT.typography.family}`
    ctx.textAlign = 'left'
    ctx.textBaseline = 'alphabetic'

    ctx.fillText(
        section?.id ||
        'The Investigation',
        x + px,
        y + py
    )

    /*
     * Step counter
     */
    ctx.fillStyle = '#64748b'
    ctx.font = `${layout.stepFontSize}px ${LAYOUT.typography.family}`
    ctx.textAlign = 'left'

    ctx.fillText(
        `${sectionIndex + 1} / ${sectionCount}`,
        x + width / 2,
        y + py+1
    )

    /*
     * Score
     */
    ctx.fillStyle = '#000000'
    ctx.font = `700 ${layout.scoreFontSize}px ${LAYOUT.typography.family}`
    ctx.textAlign = 'right'

    ctx.fillText(
        `${score}/${totalScore}`,
        x + width - px,
        y + py
    )

    /*
     * Progress bar
     */
    const barX = x + px
    const barY = y + height - layout.progressHeight - layout.progressGap
    const barWidth = width - 2 * px
    const barHeight = layout.progressHeight

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

    ctx.restore()

}