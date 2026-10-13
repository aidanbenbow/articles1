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
const type = resolveValue(config.type, context) ?? "text"
const x = resolveValue(config.x, context) ?? contentX ?? metrics.padding
const worldY = resolveValue(config.worldY, context) ?? 
currentY
const width = resolveValue(config.width, context) ?? contentWidth ?? metrics.contentWidth
const typography = resolveValue(config.typography, context) ?? (type === "heading" ? "heading" : "body")
const text = resolveValue(config.value ?? config.text, context)
const height = resolveValue(config.height, context) ?? resolveTextHeight({...config, typography, value:text, text}, context)
    const node = createTextNode({
        id: config.id,
        owner: config.owner ?? owner,
        kind: config.kind ?? 'text',

        x,
        worldY,

        width,
        height,
           
        color: resolveValue( config.color, context),

        text,

        typography
    })
node.type = resolveValue(config.type, context) ?? "text"
 // Register standalone text nodes, just as standalone buttons are registered.
    // Collection children are registered by their parent/layout compilation.
    if (!parent && layout?.layoutNodes instanceof Map) {
        layout.layoutNodes.set(node.id, node)
    }
    return {node,
        currentY: node.worldY + node.height + metrics.padding
    }
}