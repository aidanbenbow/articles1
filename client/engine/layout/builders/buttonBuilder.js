import { createButtonNode } from "../nodeFactories/buttonNode.js"
import { resolveValue } from "./resolveValue.js"

export function buildButtonNode(config, context) {
    const {
       
        metrics,
        owner,
        currentY,
        contentX,
        parent
    } = context

const completed = resolveValue(config.completed, context)

const buttonStyle = completed
    ? metrics.buttonStyles.completed
    : metrics.buttonStyles.default

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
        color:  buttonStyle.background,
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
console.log(node, 'button node')

    return {node,
        currentY: node.worldY + node.height + metrics.padding
    }
}