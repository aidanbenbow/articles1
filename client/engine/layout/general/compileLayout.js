import { getResponsiveLayout } from "../../constants/layoutConstants.js"
import { compileNode } from "./nodeComplier.js"
import { normalizeNodeConfig } from "./normalizeNodeConfig.js"

export function compileLayout(config, context) {
    const normalizedConfig = normalizeNodeConfig(config)
    const metrics = getResponsiveLayout(
        context.layout.width,
        context.layout.height
    )

    const compileContext = {
        ...context,
        metrics
    }

    let currentY = Math.max(
        40,
        metrics.screenHeight * 0.05
    )

    for (const child of normalizedConfig.nodes || normalizedConfig.children || []) {
        const result = compileNode(
            child,
            {
                ...compileContext,
                currentY
            }
        )

        if (!result) continue

        currentY = result.currentY
    }

    return {
        currentY
    }
}