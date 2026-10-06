import { resolveValue } from "../builders/resolveValue.js"
import { compileNode } from "../general/nodeComplier.js"

export function buildCollectionNode(config, context) {
    const {
        layout,
        currentY
    } = context

    const items = resolveValue(
        config.source,
        context
    ) ?? []
     
    let nextY = currentY

    for (let i = 0; i < items.length; i++) {
        const item = items[i]

        const itemConfig = {
            ...config.item,

            id:
                `${config.id}-${i}`
        }

        const result = compileNode(
            itemConfig,
            {
                ...context,

                currentY:
                    nextY,

                item,

                index: i
            }
        )
      
   
        if (!result) continue

        nextY =
            result.currentY
    }

    return {
        node: null,
        currentY: nextY
    }
}