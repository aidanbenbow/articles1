import { nodeBuilders } from "./nodeBuilders.js"

export function compileNode(config, context) {
    const builder = nodeBuilders[config.type]

    if (!builder) {
        throw new Error(
            `No layout builder for ${config.type}`
        )
    }

    return builder(config, context)
}