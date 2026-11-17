
import { getCanvasFont, getTypography, resolveNodeColor } from "../draw/typographyHelpers.js";
import { getScreenPosition } from "../modules/renderUtils.js";


export function renderText(ctx, node, viewport,context) {
 
    const rect = getScreenPosition(node, viewport);

    if (!rect) return;

const role = node.typography ?? 'body'
    const padding = node.padding ?? 0;
  
const typo = getTypography(context, role);
const font = node.font ?? getCanvasFont(context, role);

const color= resolveNodeColor(node.color, context, role) 

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

    const isDragDropParagraphText =
    node.sectionType === 'dragDropParagraphText';

const lines = isDragDropParagraphText
    ? [text]
    : node.lines

    let y = rect.y + padding;
const lineHeight = isDragDropParagraphText
    ? node.height
    : node.lineHeight ?? typo.lineHeight ?? 20;

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