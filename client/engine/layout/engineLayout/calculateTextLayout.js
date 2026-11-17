import { getTextMeasurementContext } from "../../draw/textMeasurement.js";
import { getWrappedLines } from "../../draw/textWrapping.js";
import { getCanvasFont, getTypography } from "../../draw/typographyHelpers.js";

export function calculateTextLayout(config, context, width) {
    const role = config.typography ?? "body";
    const typo = getTypography(context, role);
    const font = getCanvasFont(context, role);

    const padding = config.padding ?? 0;
    const availableWidth = Math.max(1, width - padding * 2);

    const text = config.value ?? config.text ?? "";
    const ctx = getTextMeasurementContext();

    ctx.font = font;

    const lines = getWrappedLines(ctx, text, availableWidth);

    const lineHeight =
        config.lineHeight ??
        typo.lineHeight ??
        20;

    const height =
        Math.max(1, lines.length) * lineHeight +
        padding * 2;

    return {
        lines,
        height,
        lineHeight,
        font,
        availableWidth
    };
}