
import { calculateTextLayout } from "../engineLayout/calculateTextLayout.js"
import { createTextNode } from "../nodeFactories/textNode.js"

import { resolveValue } from "./resolveValue.js"

export function buildTextNode(config, context) {
    const {
   
        metrics,
        owner,
        currentY,
        
        contentX,
        contentWidth
    } = context
   
    const reading = metrics?.reading ?? {}
const type = resolveValue(config.type, context) ?? "text"
const x = resolveValue(config.x, context) ?? contentX ?? metrics.padding
const worldY = resolveValue(config.worldY, context) ?? 
currentY
const baseWidth =
        resolveValue(config.width, context) ?? contentWidth ?? metrics.contentWidth
    const maxReadableWidth =
        resolveValue(config.maxReadableWidth, context) ?? reading.maxReadableWidth ?? baseWidth
    const width = Math.min(baseWidth, maxReadableWidth)
const typography = resolveValue(config.typography, context) ?? (type === "heading" ? "heading" : "body")

const text = resolveValue(config.value ?? config.text, context)

const textLayout = calculateTextLayout({...config, width, typography, value:text, text}, context, width)
const configuredHeight = resolveValue(config.height, context);

    const height = configuredHeight == null
        ? textLayout.height
        : Math.max(configuredHeight, textLayout.height);

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
        typography,
        lines: textLayout.lines,
        lineHeight: textLayout.lineHeight,
        font: textLayout.font,
    })
node.type = resolveValue(config.type, context) ?? "text"


    const paragraphGap = resolveValue(config.paragraphGap, context) ??reading.paragraphGap ?? 3
    return {node,
        currentY: node.worldY + node.height + paragraphGap
    }
}