import { renderBrowseAllLessons } from "./buttons/browseAllButton.js"
import { renderContinueLessonCard } from "./continueLessonCardRenderer.js"
import { renderHomeWelcome } from "./homeWelcomeRenderer.js"
import { renderLessonCard } from "./lessonCardRenderer.js"


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
            renderContinueLessonCard(ctx, node, viewport, assetManager)
            break
            case 'lessonCard':
            renderLessonCard(ctx, node, viewport, assetManager)
            break
            case 'browseAllLessons':
            renderBrowseAllLessons(ctx, node, viewport)
            break
    }
}
}