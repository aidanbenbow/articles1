import { LAYOUT } from "../constants/layoutConstants.js";
import { getScreenPosition } from "../modules/renderUtils.js";
import { getWrappedLines } from "./renderLessonIntro.js";

export function renderText(ctx, node, viewport, typography) {

    const rect = getScreenPosition(node, viewport);

    if (!rect) return;
console.log("renderText", node, rect, typography)
    const padding = node.padding ?? 10;
const typo = typography[node.typography]
    ctx.save();

    ctx.fillStyle = node.color;
    ctx.font = `${typo.weight} ${typo.size}px ${typo.family}`;
    ctx.textBaseline = 'top';

    const lines = getWrappedLines(
        ctx,
        node.text ?? '',
        node.width - padding * 2
    );

    let y = rect.y + padding;

    for (const line of lines) {

        if (y + node.lineHeight > rect.y + node.height) {
            break;
        }

        ctx.fillText(
            line,
            rect.x + padding,
            y
        );

        y += node.lineHeight ?? 20;
    }

    ctx.restore();
}