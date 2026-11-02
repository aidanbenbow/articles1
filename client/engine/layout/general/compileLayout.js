import { getResponsiveLayout } from "../../constants/layoutConstants.js"
import { compileNode } from "./nodeComplier.js"

export function compileLayout(config, context) {
    
    const metrics = getResponsiveLayout(
        context.layout.width,
        context.layout.height
    )

    const compileContext = {
        ...context,
        metrics
    }
// Support both static and dynamic node configurations
    const nodes = typeof config.nodes === 'function'
        ? config.nodes(compileContext)
        : config.nodes || []
    let currentY = Math.max(  40, metrics.screenHeight * 0.05)

    for (const child of nodes) {
        const result = compileNode(
            child,
            {   ...compileContext,  currentY}
        )

        if (!result) continue
        currentY = result.currentY
    }

    return {
        currentY
    }
}