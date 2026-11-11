import { getScreenPosition } from "../modules/renderUtils.js"

export function renderCard(ctx, node, viewport, context) {
    const rect = getScreenPosition(node, viewport)
    if (!rect) return
    const responsive = context.responsive ?? context;
  const tokenColors = responsive.colors ?? {};
    const style = {
        ...context.style?.card,
        ...node.style?.card
    }
const radius =  style.radius ?? 12
    const shadowBlur =  style.shadowBlur ?? 0
    const shadowOffsetY =  style.shadowOffsetY ?? 0
  const borderWidth =style.borderWidth ?? 1

   const surface = style.surface ?? node.color ?? tokenColors.surface ?? "#ffffff";
  const shadow = style.shadow ?? tokenColors.shadow ?? "rgba(0, 0, 0, 0.08)";
  const border = style.borderColor ?? tokenColors.border ?? "#e5e7eb";
    const { x, y } = rect
    const width = node.width || 200
    const height = node.height || 300

try {
    ctx.beginPath();
    ctx.roundRect(x, y, width, height, radius);

    ctx.fillStyle = surface;
    ctx.shadowColor = shadow;
    ctx.shadowBlur = shadowBlur;
    ctx.shadowOffsetY = shadowOffsetY;
    ctx.fill();

    // Reset shadow before drawing border
    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;

    ctx.strokeStyle = border;
    ctx.lineWidth = borderWidth;
    ctx.stroke();
  } finally {
    ctx.restore();
  }
}
