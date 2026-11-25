
import { compileNode } from "./nodeComplier.js"

export function compileLayout(config, context) {
    
    const metrics = context.engine.context.getResponsiveMetrics()

    const compileContext = {
        ...context,
        metrics
    }
// Support both static and dynamic node configurations
    const nodes = typeof config.nodes === 'function'
        ? config.nodes(compileContext)
        : config.nodes || []
        const rootNodes = []
    let currentY = Math.max(  40, metrics.screenHeight * 0.05)

    for (const child of nodes) {
        const result = compileNode(
            child,
            {   ...compileContext,  currentY}
        )

        if (!result) continue
        rootNodes.push(...result.nodes)

        if (result.currentY != null) {
            currentY = result.currentY
        }
    }

    return {
        nodes: rootNodes,
        currentY
    }
}