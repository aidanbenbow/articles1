import { DRAWING_CONSTANTS } from "../../constants/drawingConstants.js"
import { drawText, drawTextBlock } from "../../draw/drawHelpers.js"
import { getScreenPosition } from "../../modules/renderUtils.js"

export function renderParagraph(ctx, node,state, viewport, lesson) {
    const rect = getScreenPosition(node, viewport)

    drawTextBlock(ctx,node.text, rect.x + 20, rect.y + 20, node.width - 40,22 )

}