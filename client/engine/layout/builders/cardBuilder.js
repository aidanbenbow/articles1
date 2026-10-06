import { createCardNode } from "../nodeFactories/cardNode.js"
import { compileNode } from "../general/nodeComplier.js"

export function buildCardNode(config, context) {
    const {
        layout,
        metrics,
        owner,
        currentY
    } = context
const welcome = metrics.welcome
    const x =config.x ?? metrics.padding

    const width = config.width ?? metrics.contentWidth

    const contentX = x + welcome.padding +welcome.accentWidth
    const contentWidth = width - welcome.padding*2 - welcome.accentWidth
    const contentTop = welcome.padding +welcome.titleTop
 const node = createCardNode({
        id: config.id,
        owner: config.owner ?? owner,
        type: 'card',
        x,
        worldY: config.worldY ?? currentY,
        width,
        height: config.height?? welcome.height,
        color:  config.color ?? null,
        padding:  config.padding ??  metrics.welcome.padding,
        kind:  config.kind ??'card',
        sectionType:   config.sectionType ?? null,
        style:    config.style ?? {},
        children: {}
    })
   

    let childY = node.worldY + contentTop
     
    for (const childConfig of config.children ?? []) {
        const result = compileNode(
            childConfig,
            {
                ...context,
                currentY: childY,
                owner: config.owner ?? owner,
                parent: node,
                contentX,
                contentWidth
            }
        )

        if (!result?.node) continue

        node.children[result.node.id] =
            result.node

        childY = result.currentY
    }
     
const contentBottom = childY - metrics.gap
const requiredHeight = contentBottom - node.worldY + welcome.padding 
    if(config.height == null){
        node.height = Math.max(requiredHeight, welcome.height)
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