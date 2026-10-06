
import { renderNode } from "./general/renderNode.js"

export function renderHome(
    ctx,
    nodes,
    viewport,
    context
) {
 
    for (const node of nodes) {
        renderNode(
            ctx,
            node,
            viewport,
            context
        )
    }
}