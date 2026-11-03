import { getScreenPosition } from "../modules/renderUtils.js";


export function renderNameInput(ctx, node, viewport, context) {
    const rect = getScreenPosition(node, viewport);

    if (!rect) return;

    const x = rect.x;
    const y = rect.y;
    const width = node.width;
    const height = node.height;

    const padding = node.padding ?? 12;
    const focused =
    context?.getFocusedNode?.()?.id === node.id;
    const disabled = node.disabled ?? false;

    const value = node.value ?? "";
    const placeholder = node.placeholder ?? "Enter your name...";

    const typography = context?.typography ?? {};
    const typo = typography.body ?? {
        size: 16,
        weight: 400,
        family: "sans-serif"
    };

    ctx.save();

    // Input background
    ctx.fillStyle = disabled
        ? "#f3f4f6"
        : node.color ?? "#ffffff";

    ctx.beginPath();

    if (ctx.roundRect) {
        ctx.roundRect(
            x,
            y,
            width,
            height,
            node.borderRadius ?? 8
        );
    } else {
        ctx.rect(x, y, width, height);
    }

    ctx.fill();

    // Input border
    ctx.strokeStyle = focused
        ? node.focusColor ?? "#9481ed"
        : node.borderColor ?? "#d1d5db";

    ctx.lineWidth = focused
        ? 2
        : node.borderWidth ?? 1;

    ctx.stroke();

    // Input text
    ctx.font = `${typo.weight} ${node.fontSize ?? typo.size}px ${typo.family ?? "sans-serif"}`;
    ctx.textBaseline = "middle";

    ctx.fillStyle = value
        ? node.textColor ?? "#374151"
        : node.placeholderColor ?? "#9ca3af";

    ctx.fillText(
        value || placeholder,
        x + padding,
        y + height / 2,
        width - padding * 2
    );

    ctx.restore();
}