
import {  drawTextBlock } from "../../draw/drawHelpers.js"
import { getCanvasFont, getTextColor, getTypography } from "../../draw/typographyHelpers.js";
import { getScreenPosition } from "../../modules/renderUtils.js"

export function renderParagraph(ctx, node, viewport, context) {
console.log('renderParagraph', {node})
    const rect = getScreenPosition(node, viewport)
    const role = node.typography ?? "body";
const padding = node.padding || 0

    const typo = getTypography(context, role);
    const font = node.font 
    const color = node.color ?? getTextColor(context, role);

    const textWidth = Math.max(1, node.width - padding * 2);

    const lineHeight =
        node.lineHeight ??
        typo.lineHeight ??
        20;

ctx.save()
ctx.font = font
    drawTextBlock(ctx, node.text, rect.x + padding, rect.y + padding, textWidth, lineHeight, font, color)
ctx.restore()
}