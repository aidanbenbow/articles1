import { compileNode } from "../general/nodeComplier.js"
import { createCardNode } from "../nodeFactories/cardNode.js"

export function buildLessonIntroNode(config, context) {
const {
        layout,
        metrics,
        lesson,
        articleNode,
        owner,
        currentY
    } = context

    const intro = metrics.lessonIntro
const x = config.x ?? metrics.padding
    const width = config.width ?? metrics.contentWidth
    const color = articleNode?.props?.color ?? '#ffffff'

    const node = createCardNode({
        id: config.id,
        owner: config.owner ?? owner,
        type: 'card',
        sectionId: articleNode.id,
        x,
        worldY: config.worldY ?? currentY,
        width,
        height: intro.height,
        color,
        kind: 'lessonIntro',
        children: {}
    })

    let childY = node.worldY 

    for (const childConfig of config.children ?? []) {
        const result = compileNode(
            childConfig,
            {
                ...context,
                currentY: childY,
                
                parent: node,
                contentX: x,
                contentWidth: width,
                color
            }
        )
        if(!result?.node) continue
        node.children[result.node.id] = result.node
        childY = result.node.worldY + result.node.height + intro.gap
    
    }

    if(config.height == null){
        node.height = childY - node.worldY 
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