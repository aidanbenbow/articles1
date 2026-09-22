import { DRAWING_CONSTANTS } from "../../constants/drawingConstants.js"
import { drawRect, drawText } from "../../draw/drawHelpers.js"
import { getScreenPosition } from "../../modules/renderUtils.js"

export function renderButton(ctx, node, viewport,) {
        
const rect = getScreenPosition(node, viewport)
if (!rect) return

const { x,y,} = rect
const width = node.width || 120
const height = node.height || 40

drawRect(ctx, { x, y, width, height, color: DRAWING_CONSTANTS.colors.primary, borderColor: node.borderColor || DRAWING_CONSTANTS.colors.primary, borderRadius: node.borderRadius || 4, borderWidth: node.borderWidth || 1 })

ctx.save()
drawText(ctx, node.text || 'Button', x + width / 2, y + height / 2, node.font || '16px Arial', node.textColor || '#fff')

    ctx.restore()
 }