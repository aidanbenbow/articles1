import { nodeRenderers } from "./nodeRenderers.js"

export function renderNode(ctx, node, viewport, context) {
    if (!node) return

    const renderer = nodeRenderers[node.type]

    if (renderer) {
        renderer(ctx, node, viewport, context)
    }

    renderNodeChildren(
        ctx,
        node,
        viewport,
        context
    )
}

function renderNodeChildren(ctx, node, viewport, context) {
    if (!node.children) return

    const children = Array.isArray(node.children)
        ? node.children
        : Object.values(node.children).flat()

    for (const child of children) {
        if (!child) continue

        renderNode(
            ctx,
            child,
            viewport,
            context
        )
    }
}