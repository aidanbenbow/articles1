
import { renderNode } from "./general/renderNode.js"

export function renderLessonScreen(
    ctx,
    viewport,
    context
) {
 
    if (!context.lesson)   return

    for(const node of context.layout) {
        renderNode(
            ctx,
            node,
            viewport,
            context
        )
    }
}