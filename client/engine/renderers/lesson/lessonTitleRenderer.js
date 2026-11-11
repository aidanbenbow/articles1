import { DRAWING_CONSTANTS } from "../../constants/drawingConstants.js"
import { drawRect, drawText } from "../../draw/drawHelpers.js"
import { getCanvasFont, getTextColor, getTypography } from "../../draw/typographyHelpers.js";
import { getScreenPosition } from "../../modules/renderUtils.js"

export function renderLessonTitle(ctx, node, viewport, context) {
    const rect = getScreenPosition(node, viewport)
    const role = node.typography ?? "title";
  const typography = getTypography(context, role);
  const font = getCanvasFont(context, role);
  const color = node.color ?? getTextColor(context, role);
    const width = node.width || 400
    const height = node.height || 60
    try {
    drawRect(
      ctx,
      { x: rect.x, y: rect.y, width, height },
      { showSelection: false }
    );

    drawText(
      ctx,
      node.text ?? "Lesson Title",
      rect.x + 20,
      rect.y + height - 10,
      font,
      color,
      "left"
    );
  } finally {
    ctx.restore();
  }
}