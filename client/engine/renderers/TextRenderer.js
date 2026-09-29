import { LAYOUT } from "../constants/layoutConstants.js";
import { getScreenPosition } from "../modules/renderUtils.js";
import { getWrappedLines } from "./renderLessonIntro.js";

export function renderText(ctx, node, viewport,context) {

    const rect = getScreenPosition(node, viewport);

    if (!rect) return;
const typography = context?.typography
    const padding = node.padding ?? 10;
const typo = typography[node.typography]
const text =node.text ?? '';
    ctx.save();

    ctx.fillStyle = node.color;
    ctx.font = `${typo.weight} ${typo.size}px ${typo.family}`;
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
    20
    for (const line of lines) {

        if (y + lineHeight > rect.y + node.height) {
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