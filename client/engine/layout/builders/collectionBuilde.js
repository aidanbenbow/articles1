import { resolveValue } from "../builders/resolveValue.js"
import { compileNode } from "../general/nodeComplier.js"

export function buildCollectionNode(config, context) {
    const { currentY} = context

    const items = resolveValue( config.source, context) ?? []
    const layout = config.layout ?? {}

    if(layout.mode === 'wrap'){
        return buildWrappedCollection(config, context, items, layout)
    }
     let nodes = []
    let nextY = currentY

    for (let i = 0; i < items.length; i++) {
        const item = items[i]

        const itemConfig = {...config.item,
            id: `${config.id}-${i}` }

        const result = compileNode(
            itemConfig,
            {
                ...context,
                currentY:  nextY,
                 item,
                index: i
            } )
      
        if (!result) continue
        if (result.nodes?.length) {
            nodes.push(...result.nodes)
        }
        nextY = result.currentY
    }

    return {
        nodes,
        currentY: nextY
    }
}

function buildWrappedCollection(config, context, items, layout) {
const nodes = []
const startX = context.contentX ?? context.metrics.padding
const availableWidth = context.contentWidth ?? context.metrics.contentWidth
const startY = context.currentY
const gap = resolveValue(layout.gap, context) ?? 8
const rowGap = resolveValue(layout.rowGap, context) ?? 12
const rightEdge = startX + availableWidth

let cursorX = startX
let rowY = startY
let rowHeight = 0

for (let i = 0; i < items.length; i++) {
    const result = compileNode(
        { ...config.item, id: `${config.id}-${i}` },
        {
            ...context,
            currentY: rowY,
            contentX: startX,
            contentWidth: availableWidth,
            item: items[i],
            index: i,
        }
    )

    if (!result) continue

    for (const node of result.nodes) {
        // Wrap only when the current row already has an item.
        if (cursorX > startX && cursorX + node.width > rightEdge) {
            rowY += rowHeight + rowGap
            cursorX = startX
            rowHeight = 0
        }

        node.x = cursorX
        node.worldY = rowY

        nodes.push(node)

        cursorX += node.width + gap
        rowHeight = Math.max(rowHeight, node.height)
    }
}

return {
    nodes,
    currentY: nodes.length ? rowY + rowHeight : startY,
}

}