import { getTextMeasurementContext } from "../../draw/textMeasurement.js"
import { getWrappedTextLines } from "../../draw/textWrapping.js"
import { resolveValue } from "./resolveValue.js"

export function resolveTextHeight(config, context) {
    const { metrics } = context

    if (config.height!=null) {
        return config.height
    }

    const text = String(config.value ?? config.text ?? '')
    const typography = metrics.typography[config.typography ?? 'body']
   
        const lineHeight = typography.lineHeight
    const width = config.width ?? metrics.contentWidth
const font =
        `${typography.weight} ${typography.size}px ${typography.family}`

    const ctx = getTextMeasurementContext()
      ctx.font = font

    const lines = getWrappedTextLines(
        ctx,
        text,
        width
    )
 

    return Math.max(1, lines.length) * typography.lineHeight
}