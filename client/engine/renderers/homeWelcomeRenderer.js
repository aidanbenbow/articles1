import { drawTextBlock } from "../draw/drawHelpers.js"
import { getScreenPosition } from "../modules/renderUtils.js"

export function renderHomeWelcome(
    ctx,
    node,
    viewport
) {

    const rect =
        getScreenPosition(node, viewport)

    drawTextBlock(
        ctx,
        node.title,
        rect.x,
        rect.y,
        rect.width,
        32
    )

    drawTextBlock(
        ctx,
        node.text,
        rect.x,
        rect.y + 50,
        rect.width,
        20
    )

    drawTextBlock(
        ctx,
        node.instructions,
        rect.x,
        rect.y + 85,
        rect.width,
        18
    )
}