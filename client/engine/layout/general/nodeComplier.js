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

    return builder(config, context)
}