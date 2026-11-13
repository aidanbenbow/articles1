import { createButtonNode } from "../nodeFactories/buttonNode.js"
import { resolveValue } from "./resolveValue.js"

export function buildButtonNode(config, context) {
    const {
        layout,
        metrics,
        owner,
        currentY,
        contentX,
        parent
    } = context
    const node = createButtonNode({
        id: config.id,
        owner: config.owner?? owner,
        articleId: resolveValue( config.articleId, context ),

articleData: resolveValue(
        config.articleData,
        context
    ),
        kind: config.kind ?? 'button',
        x: config.x ?? contentX?? metrics.padding,
        worldY: config.worldY ?? context.currentY,
        width: 
            config.width ??
            metrics.contentWidth,
        height: resolveValue(config.height, context) ?? metrics.button.height,
        color:
            resolveValue(
                config.color,
                context
            ),
        text: 
            resolveValue(
                config.text,
                context
            ),
            action: config.action ?? null,
        typography: config.typography ?? 'body',
        sectionId: resolveValue(
    config.sectionId ?? (({ section }) => section?.id),
    context
),
itemIndex: resolveValue(
    config.itemIndex ?? (({ index }) => index),
    context
),
direction: resolveValue(
    config.direction ?? (({ direction }) => direction),
    context
),
disabled: resolveValue(
    config.disabled ?? (({ disabled }) => disabled),
    context
),
category: config.category,
    })

   if (!parent) {
        layout.layoutNodes.set(
            node.id,
            node
        )
    }

    return {node,
        currentY: node.worldY + node.height + metrics.padding
    }
}