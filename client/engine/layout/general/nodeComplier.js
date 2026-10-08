import { resolveValue } from "../builders/resolveValue.js"
import { nodeBuilders } from "./nodeBuilders.js"

export function compileNode(config, context) {
    if (
        config.visible != null &&
        !resolveValue(config.visible, context)
    ) {
        return null
    }
    const builder = nodeBuilders[config.type]

    if (!builder) {
        throw new Error(
            `No layout builder for ${config.type}`
        )
    }
const result = builder(config, context)
if(!result) return null
    return {
        nodes: result.nodes ?? (result.node ? [result.node] : []),
        currentY: result.currentY
    }
}