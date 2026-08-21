import { renderHomeWelcome } from "./homeWelcomeRenderer.js"


export function renderHome(
    ctx,
    nodes,
    viewport,
    assetManager
) {
  for(const node of nodes) {
    switch(node.kind) {
        case 'homeWelcome':
            renderHomeWelcome(ctx, node, viewport)
            break
            case 'continueLessonCard':
            renderContinueLessonCard(ctx, node, viewport)
            break
            case 'lessonCard':
            renderLessonCard(ctx, node, viewport)
            break
    }
}
}