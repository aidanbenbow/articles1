import { createButtonNode } from "../nodeFactories/buttonNode.js"
import { resolveValue } from "./resolveValue.js"

export function buildButtonNode(config, context) {
    const {
        layout,
        metrics,
        owner,
        currentY,
        parent
    } = context
    const node = createButtonNode({
        id: config.id,
        owner: config.owner?? owner,
        articleId:
    resolveValue(
        config.articleId,
        context
    ),

articleData:
    resolveValue(
        config.articleData,
        context
    ),
        kind: config.kind ?? 'button',
        x: config.x ?? metrics.padding,
        worldY: config.worldY ?? context.currentY,
        width: 
            config.width ??
            metrics.contentWidth,
        height: 
            config.height ??
            metrics.button.height,
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
        typography:
            config.typography ?? 'body'
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