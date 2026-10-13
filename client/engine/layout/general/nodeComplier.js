import { resolveValue } from "../builders/resolveValue.js"
import { nodeBuilders } from "./nodeBuilders.js"

export function compileNode(config, context) {
    if (
        config.visible != null &&
        !resolveValue(config.visible, context)
    ) {
        return null
    }
    // Resolve dynamic types before looking up the builder.
    const type = resolveValue(config.type, context)
    const resolvedConfig = { ...config, type }
    const builder = nodeBuilders[type]

    if (!builder) {
        throw new Error(
            `No layout builder for ${type}`
        )
    }
    
const result = builder(resolvedConfig, context)
console.log(result)
if(!result) return null
    return {
        nodes: result.nodes ?? (result.node ? [result.node] : []),
        currentY: result.currentY
    }
}