import { createProgressNode } from "../nodeFactories/progressNode.js"
import { resolveValue } from "./resolveValue.js"

export function buildProgressNode(config, context) {
    const {
        metrics,
        owner,
        contentX,
    } = context

    const value = resolveValue(config.value, context)

    const node = createProgressNode({
        id: config.id,
        owner: config.owner ?? owner,

        x: config.x ?? contentX ?? metrics.padding,
        worldY: config.worldY ?? context.currentY,

        width: config.width ?? metrics.contentWidth,
        height: config.height ?? 12,

        value,

        trackColor:
            config.trackColor ??
            metrics.colors.border,

        fillColor:
            config.fillColor ??
            metrics.colors.primary,

        radius: config.radius ?? 6,
    })

    return {
        node,
        currentY: node.worldY + node.height + metrics.padding
    }
}