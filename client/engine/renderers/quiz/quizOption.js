
import { drawRect } from "../../draw/drawHelpers.js"
import { getCanvasFont, getTextColor, getTypography } from "../../draw/typographyHelpers.js";
import { getScreenRect } from "../../modules/renderUtils.js"

export function renderQuizOption(ctx, node, viewport, context) {

    const rect = getScreenRect(node, viewport)

const answered = Boolean(node.answered);
  const isSelected = Boolean(node.selected);
  
  const isCorrect = Boolean(node.correct);
  
const colors =
    context?.colors ??
    context?.responsive?.colors ??
    context?.metrics?.colors ??
    {};
   // Shared typography helpers
  const role = node.typography ?? "body";
  const typo = getTypography(context, role);
  const font = getCanvasFont(context, role);
  const textColor = node.textColor ?? getTextColor(context, role);

  // Option background
  let background = colors.surface ?? "#ffffff";
if (answered && isCorrect) {
    background = colors.success ?? "#b8f5b8";
  } else if (answered && isSelected) {
    
    background = colors.error ?? "#f5b8b8";
  }

  const centerX = rect.x + 12;
  const centerY = rect.y + rect.height / 2;

  ctx.save();

  try {
   drawRect(ctx, {
      ...rect,
      color: background,
      borderColor: colors.border ?? "#e5e7eb",
      borderWidth: 1,
      borderRadius: 8
    }, { showSelection: true });

    // Radio outline
    ctx.beginPath();
    ctx.arc(centerX, centerY, 6, 0, Math.PI * 2);
    ctx.fillStyle = colors.surface ?? "#ffffff";
    ctx.fill();
    ctx.strokeStyle = colors.text ?? "#4b5563";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Selected radio indicator
    if (isSelected) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, 3, 0, Math.PI * 2);
      ctx.fillStyle = colors.primary ?? "#9481ed";
      ctx.fill();
    }

    // Option text
    ctx.font = font;
    ctx.fillStyle = textColor;
    ctx.textBaseline = "middle";
    ctx.textAlign = "left";

    ctx.fillText(
      node.text ?? "",
      rect.x + 28,
      centerY
    );

    // Answer marker
    if (answered) {
      let marker = null;

      if (isCorrect) {
        marker = "✓";
      } else if (isSelected) {
        marker = "✗";
      }

      if (marker) {
        ctx.textAlign = "right";
        ctx.fillStyle = isCorrect
          ? colors.text ?? "#4b5563"
          : colors.errorText ?? "#991b1b";

        ctx.fillText(
          marker,
          rect.x + rect.width - 15,
          centerY
        );
      }
    }
  } finally {
    ctx.restore();
  }
}