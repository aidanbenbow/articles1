import { resolveValue } from "./resolveValue.js"

export function resolveTextHeight(config, context) {
    const { metrics } = context

    if (config.height!=null) {
        return config.height
    }

    const text = resolveValue(
        config.value,
        context
    )

    const typography = config.typography ?? 'body'
    const typographyMetrics =
        metrics.typography[typography] ?? {}

    const lineHeight =
        typographyMetrics.lineHeight ?? 20

   
    const lines =
        String(text ?? '').split('\n').length

    return lines * lineHeight
}