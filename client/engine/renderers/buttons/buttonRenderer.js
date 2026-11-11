
import { drawRect, drawText } from "../../draw/drawHelpers.js"
import { getCanvasFont } from "../../draw/typographyHelpers.js"
import { getScreenPosition } from "../../modules/renderUtils.js"

export function renderButton(ctx, node, viewport,context) {
      
const rect = getScreenPosition(node, viewport)
if (!rect) return

const { x,y,} = rect
const width = node.width || 120
const height = node.height || 40
const colors = context?.responsive?.colors

const buttonStyle = context?.responsive?.buttonStyles?.[node.disabled ? 'disabled' : 'default']

 // Resolve button appearance.
    const background =
        node.background ??
        node.color ??
        buttonStyle.background ??
        colors.primary ??
        "#9481ed";

    const textColor =
        node.textColor ??
        buttonStyle.text ??
        colors.primaryText ??
        "#ffffff";

    const borderColor =
        node.borderColor ??
        background;

    const borderRadius =
        node.borderRadius ??
        buttonStyle.radius ??
        8;

    const borderWidth =
        node.borderWidth ??
        1;

    

    const font = getCanvasFont(context, 'button') 
 // Draw button background.
    drawRect(ctx, {
        x,
        y,
        width,
        height,
        color: background,
        borderColor,
        borderRadius,
        borderWidth
    });

    // Draw button label.
    ctx.save();

    try {
        drawText(
            ctx,
            node.text ?? "Button",
            x + width / 2,
            y + height / 2,
            font,
            textColor
        );
    } finally {
        ctx.restore();
    }
 }