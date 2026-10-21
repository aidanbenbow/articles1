import { resolveValue } from "../builders/resolveValue.js"
import { nodeBuilders } from "./nodeBuilders.js"
import { normalizeNodeConfig } from "./normalizeNodeConfig.js"

export function compileNode(config, context) {
    const normalizedConfig = normalizeNodeConfig(config)

    if (
        normalizedConfig.visible != null &&
        !resolveValue(normalizedConfig.visible, context)
    ) {
        return null
    }

    const type = resolveValue(normalizedConfig.type, context)
    const resolvedConfig = { ...normalizedConfig, type }
    const builder = nodeBuilders[type]

    if (!builder) {
        throw new Error(
            `No layout builder for ${type}`
        )
    }

    const result = builder(resolvedConfig, context)
    if (!result) return null

    return {
        nodes: result.nodes ?? (result.node ? [result.node] : []),
        currentY: result.currentY
    }
}