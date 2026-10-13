
import {  drawTextBlock } from "../../draw/drawHelpers.js"
import { getScreenPosition } from "../../modules/renderUtils.js"

export function renderParagraph(ctx, node, viewport, context) {
    console.log("[renderParagraph]", {
        type: node.type,
        text: node.text,
        x: node.x,
        worldY: node.worldY,
        width: node.width,
        height: node.height,
        typography: node.typography,
    })
    const rect = getScreenPosition(node, viewport)
const padding = node.padding || 0
    const typography = context.typography?.[node.typography] || context.typography.body
    const font = `${typography.fontWeight} ${typography.fontSize}px ${typography.fontFamily}`
ctx.save()
    drawTextBlock(ctx, node.text, rect.x + padding, rect.y + padding, node.width - padding * 2, 22, font, typography.color)
ctx.restore()
}