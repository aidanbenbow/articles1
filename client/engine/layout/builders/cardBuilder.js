import { createCardNode } from "../nodeFactories/cardNode.js"
import { compileNode } from "../general/nodeComplier.js"
import { resolveValue } from "./resolveValue.js"

export function buildCardNode(config, context) {
    const {
        layout,
        metrics,
        owner,
        currentY
    } = context

const gap = resolveValue(
        config.layout?.gap,
        context
    ) ?? metrics.gap

    const padding = resolveValue(
        config.padding,
        context
    ) ?? 0


    const x =config.x ?? metrics.padding
    const width = config.width ?? metrics.contentWidth

 const node = createCardNode({
        id: config.id,
        owner: config.owner ?? owner,
        type: 'card',
        x,
        worldY: config.worldY ?? currentY,
        width,
        height: config.height?? 0,
        color:  config.color ?? null,
        padding,
        kind:  config.kind ??'card',
        sectionType:   config.sectionType ?? null,
        style:    config.style ?? {},
        children: []
    })
   

   const contentX = node.x + padding
    const contentWidth = node.width - (padding * 2)
    let childY = node.worldY + padding
     
    for (const childConfig of config.children ?? []) {
        const result = compileNode(
            childConfig,
            {
                ...context,
                currentY: childY,
                
                parent: node,
                contentX,
                contentWidth
            }
        )

        if (!result) continue
node.children.push(...result.nodes)
childY = result.currentY

    }
     
if(config.height == null){
        node.height = Math.max(0, childY - node.worldY-gap + padding)
    }

    layout.layoutNodes.set(
        node.id,
        node
    )

    return {
        node,

        currentY:
            node.worldY +
            node.height +
            metrics.gap
    }
}