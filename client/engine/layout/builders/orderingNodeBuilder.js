
import { createOrderingNode } from '../nodeFactories/orderingNode.js'
import { resolveValue } from './resolveValue.js'

export function buildOrderingNode(config, context) {
    const { metrics, owner, currentY } = context
    const ordering = metrics.ordering

    const x = resolveValue(config.x, context) ?? context.contentX
    const worldY = resolveValue(config.worldY, context) ?? currentY

    const width = resolveValue(config.width, context)
        ?? context.contentWidth

    const height = resolveValue(config.height, context)
        ?? ordering.defaultHeight

    const node = createOrderingNode({
        id: config.id,
        owner: config.owner ?? owner,
        sectionId: context.section?.id,
        orderingId: context.section?.id,
        x,
        worldY,
        width,
        height,
        padding: resolveValue(config.padding, context)
            ?? ordering.padding,
        color: resolveValue(config.color, context)
            ?? '#e0e0e0',
    })

    return {
        node,
        currentY: node.worldY + node.height + ordering.sectionGap,
    }
}
