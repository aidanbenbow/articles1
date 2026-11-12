
import {  drawTextBlock } from "../../draw/drawHelpers.js"
import { getCanvasFont, getTextColor, getTypography } from "../../draw/typographyHelpers.js";
import { getScreenPosition } from "../../modules/renderUtils.js"

export function renderParagraph(ctx, node, viewport, context) {
  
    const rect = getScreenPosition(node, viewport)
    const role = node.typography ?? "body";
const padding = node.padding || 0
    const typo = getTypography(context, role);
    const font = getCanvasFont(context, role);
    const color = node.color ?? getTextColor(context, role);

    const textWidth = Math.max(1, rect.width - padding * 2);

    const lineHeight =
        node.lineHeight ??
        typo.lineHeight ??
        20;
    
ctx.save()
    drawTextBlock(ctx, node.text, rect.x + padding, rect.y + padding, textWidth, lineHeight, font, color)
ctx.restore()
}