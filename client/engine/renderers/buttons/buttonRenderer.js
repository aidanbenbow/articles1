import { DRAWING_CONSTANTS } from "../../constants/drawingConstants.js"
import { drawRect, drawText } from "../../draw/drawHelpers.js"
import { getScreenPosition } from "../../modules/renderUtils.js"

export function renderButton(ctx, node, viewport, { defaultText='Button', font= DRAWING_CONSTANTS.fonts.button,
    textColor= DRAWING_CONSTANTS.colors.buttonText, backgroundColor= DRAWING_CONSTANTS.colors.button, borderColor= DRAWING_CONSTANTS.colors.button, borderWidth=1, borderRadius=8, showSelection=false } = {}) {
const rect = getScreenPosition(node, viewport)

if (!rect) return

const { x,y,} = rect
const width = node.width || 120
const height = node.height || 40

drawRect(ctx, { x, y, width, height, backgroundColor, borderColor, borderWidth, borderRadius }, { showSelection })

ctx.save()
drawText(ctx, node.text || defaultText, x + width / 2, y + height / 2, font, textColor)

    ctx.restore()
 }