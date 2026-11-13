import { getTextMeasurementContext } from "../../draw/textMeasurement.js"
import { getWrappedLines} from "../../draw/textWrapping.js"
import { getCanvasFont, getTypography } from "../../draw/typographyHelpers.js"
import { resolveValue } from "./resolveValue.js"

export function resolveTextHeight(config, context) {
    const { metrics } = context

    if (config.height!=null) {
        return config.height
    }
const role = config.typography ?? "body";
    const typo = getTypography(context, role);
    const font = getCanvasFont(context, role);

    const text = config.value ?? config.text ?? "";
    const padding = config.padding ?? 0;
    
    const width = Math.max(1, config.width - padding * 2);

    const ctx = getTextMeasurementContext()
      ctx.font = font

    const lines = getWrappedLines(
        ctx,
        text,
        width
    )
 
const lineHeight =
        config.lineHeight ??
        typo.lineHeight ??
        20;
console.log("TEXT MEASUREMENT", {
    text,
    width,
    font,
    lineHeight,
    lines: lines.length,
    measuredLines: lines
});
    return Math.max(1, lines.length) * lineHeight + padding * 2;
}