import { createTextNode } from "../nodeFactories/textNode.js"
import { resolveTextHeight } from "./resolveTextHeight.js"
import { resolveValue } from "./resolveValue.js"

export function buildTextNode(config, context) {
    const {
        layout,
        metrics,
        owner,
        currentY,
        parent,
        contentX,
        contentWidth
    } = context

    const node = createTextNode({
        id: config.id,
        owner: config.owner ?? owner,
        kind: config.kind ?? 'text',

        x: config.x ?? contentX ?? metrics.padding,
        worldY: config.worldY ?? currentY,

        width:
            config.width ?? contentWidth ?? 
            metrics.contentWidth,

        height:
            config.height ??
            resolveTextHeight(config,context),

        color:
            resolveValue(
                config.color,
                context
            ),

        text:
            resolveValue(
                config.value,
                context
            ),

        typography:
            config.typography ?? 'body'
    })

    return {node,
        currentY: node.worldY + node.height + metrics.padding
    }
}