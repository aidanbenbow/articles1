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
const typography = responsive.typography
const colors = responsive.colors ?? {};
const rect = getScreenRect(node, viewport)
const { x, y } = rect
const width = node.width
const height = node.height
const actualScore = lesson.getScoreTotal()
const animatedScore = context.animations.getValue(
   'lesson-score')??actualScore
    
const totalScore = lesson.quizTotal
const section = lesson.sections[lesson.currentSectionIndex]
const sectionIndex = lesson.currentSectionIndex
const sectionCount = lesson.sections.length
const progress = Math.max(0, Math.min(1, lesson.getProgress() / 100))
const px = layout.paddingX || 20
const py = layout.paddingY || 20
const family = responsive.typography?.family ?? "sans-serif";

const stageTypography = typography.heading;
const stepTypography = typography.step;
const scoreTypography = typography.heading;
ctx.save();

  try {
    // Header background
    ctx.fillStyle = colors.surface ?? "#ffffff";
    ctx.fillRect(x, y, width, height);

    // Header bottom border
    ctx.fillStyle = colors.border ?? "#e5e7eb";
    ctx.fillRect(x, y + height, width, 1);

    // Current stage
    ctx.fillStyle = colors.heading ?? "#171717";
    ctx.font = `${stageTypography.weight} ${stageTypography.size}px ${family}`;
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";

    ctx.fillText(
      section?.id ?? "The Investigation",
      x + px,
      y + py
    );

    // Step counter
    ctx.fillStyle = colors.muted ?? "#6b7280";
    ctx.font = `${stepTypography.weight} ${stepTypography.size}px ${family}`;
    ctx.textAlign = "left";

    ctx.fillText(
      `${sectionIndex + 1} / ${sectionCount}`,
      x + width / 2,
      y + py + 1
    );

    // Score
    ctx.fillStyle = colors.text ?? "#4b5563";
    ctx.font = `700 ${scoreTypography.size}px ${family}`;
    ctx.textAlign = "right";

    ctx.fillText(
      `${Math.round(animatedScore)}/${totalScore}`,
      x + width - px,
      y + py
    );

    // Progress bar
    const barX = x + px;
    const barY =
      y + height -
      (layout.progressHeight ?? 4) -
      (layout.progressGap ?? 8);

    const barWidth = Math.max(0, width - 2 * px);
    const barHeight = layout.progressHeight ?? 4;

    // Track
    ctx.fillStyle = colors.border ?? "#e5e7eb";
    ctx.fillRect(barX, barY, barWidth, barHeight);

    // Filled progress
    ctx.fillStyle = colors.primary ?? "#9481ed";
    ctx.fillRect(barX, barY, barWidth * progress, barHeight);
  } finally {
    ctx.restore();
  }
}