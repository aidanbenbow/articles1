
import {  drawTextBlock } from "../../draw/drawHelpers.js"
import { getScreenPosition } from "../../modules/renderUtils.js"

export function renderParagraph(ctx, node, viewport, context) {
  
    const rect = getScreenPosition(node, viewport)
const padding = node.padding || 0
    const typography =
        context.metrics.typography[node.typography] ??
        context.metrics.typography.body
    const font = `${typography.fontWeight} ${typography.fontSize}px ${typography.fontFamily}`
ctx.save()
    drawTextBlock(ctx, node.text, rect.x + padding, rect.y, node.width, typography.lineHeight, font, typography.color)
ctx.restore()
}