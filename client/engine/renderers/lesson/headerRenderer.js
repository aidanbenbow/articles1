
import { drawText } from "../../draw/drawHelpers.js"
import { getCanvasFont, getTextColor, getTypography } from "../../draw/typographyHelpers.js"
import { getScreenPosition } from "../../modules/renderUtils.js"

export function renderHeading( ctx, node, viewport, context) {
    const rect = getScreenPosition(  node,viewport)

 ctx.save()
 const text = node.text
 const role = node.typography ?? 'heading'
 const typography = getTypography(context, role)
 const font =getCanvasFont(context, role)
 const color = node.color ??getTextColor(context, role)
 const padding = node.padding ?? 10
     ctx.save();

  try {
    drawText(
      ctx,
      text,
      rect.x + padding,
      rect.y + padding,
      font,
      color,
      "left",
      "top"
    );
  } finally {
    ctx.restore();
  }
}