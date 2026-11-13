
import { getWrappedLines } from "../draw/textWrapping.js";
import { getCanvasFont, getTextColor, getTypography } from "../draw/typographyHelpers.js";
import { getScreenPosition } from "../modules/renderUtils.js";


export function renderText(ctx, node, viewport,context) {
 
    const rect = getScreenPosition(node, viewport);

    if (!rect) return;

const role = node.typography ?? 'body'
    const padding = node.padding ?? 10;
    console.log('padding', padding, 'text', node.text, 'width', node.width, 'height', node.height, 'rect', rect)
const typo = getTypography(context, role);
const font = getCanvasFont(context, role);

const color= node.color ?? getTextColor(context, role);
const text =
    Array.isArray(node.text)
        ? node.text.join(' • ')
        : node.text == null
            ? ''
            : typeof node.text === 'string'
                ? node.text
                : String(node.text);

    ctx.save();

    ctx.fillStyle = color;
    ctx.font = font
   
    ctx.textBaseline = 'top';

    const lines = getWrappedLines(
        ctx,
        text,
        node.width - padding * 2
    );

    let y = rect.y + padding;
const lineHeight =
    node.lineHeight ??
    typo.lineHeight ??
    20;
    
    for (const line of lines) {
        if (y + lineHeight > rect.y + node.height) {
            break;
        }

        ctx.fillText(
            line,
            rect.x + padding,
            y
        );

        y += lineHeight
    }

    ctx.restore();
}