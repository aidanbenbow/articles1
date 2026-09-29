
import { renderNode } from "./general/renderNode.js"

export function renderLessonScreen(
    ctx,
    viewport,
    renderContext
) {
       
    if (!renderContext.lesson)   return

    for(const node of renderContext.layout) {
        renderNode(
            ctx,
            node,
            viewport,
            renderContext
        )
    }
}