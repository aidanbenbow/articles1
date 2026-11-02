import { createOrderingItemNode } from '../nodeFactories/orderingItemNode.js'
import { resolveValue } from './resolveValue.js'
import { compileNode } from '../general/nodeComplier.js'

export function buildOrderingItemNode(config, context) {
    const { metrics, owner, currentY } = context
    const ordering = metrics.ordering

    const text = String(
        resolveValue(config.text ?? config.value, context) ?? ''
    )

    const itemIndex = resolveValue(config.itemIndex, context) ?? context.index
    const items = context.activity?.getItems?.() ?? []

    const width = resolveValue(config.width, context)
        ?? context.contentWidth

    const height = resolveValue(config.height, context)
        ?? ordering.itemHeight

    const buttonWidth = ordering.buttonWidth
    const buttonGap = ordering.buttonGap

    const x = resolveValue(config.x, context)
        ?? context.contentX

    const worldY = resolveValue(config.worldY, context)
        ?? currentY

    const node = createOrderingItemNode({
        id: config.id,
        owner: config.owner ?? owner,
        sectionId: context.section?.id,
        orderingId: context.section?.id,
        itemIndex,
        text,
        x,
        worldY,
        width,
        height,
        padding: ordering.itemPaddingX,
        color: resolveValue(config.color, context) ?? '#ffffff',
    })

    const createControl = (direction, buttonX, disabled) => {
        const result = compileNode({
            id: `${config.id}-${direction}`,
            type: 'button',
            kind: 'lessonSection',
            sectionType: 'orderingControl',
            text: direction === 'up' ? '↑' : '↓',
            action: 'moveOrderingItem',
            sectionId: context.section?.id,
            itemIndex,
            direction,
            disabled,
            x: buttonX,
            worldY,
            width: buttonWidth,
            height,
            color: disabled ? '#cccccc' : '#23979d',
        }, {
            ...context,
            currentY: worldY,
            parent: node,
        })

        return result?.nodes ?? []
    }

    const upButtonNodes = createControl(
        'up',
        x + width - buttonWidth * 2 - buttonGap,
        itemIndex === 0
    )

    const downButtonNodes = createControl(
        'down',
        x + width - buttonWidth,
        itemIndex === items.length - 1
    )

    return {
        nodes: [
            node,
            ...upButtonNodes,
            ...downButtonNodes,
        ],
        currentY: worldY + height + ordering.itemGap,
    }
}