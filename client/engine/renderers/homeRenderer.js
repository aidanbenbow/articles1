import { LAYOUT } from "../constants/layoutConstants.js"
import { renderBrowseAllLessons } from "./buttons/browseAllButton.js"
import { renderButton } from "./buttons/buttonRenderer.js"
import { renderContinueLessonCard } from "./continueLessonCardRenderer.js"
import { renderHomeWelcome } from "./homeWelcomeRenderer.js"
import { renderLessonCard } from "./lessonCardRenderer.js"
import { renderLessonOption } from "./lessonOptionRenderer.js"
import { renderText } from "./TextRenderer.js"


export function renderHome(  ctx, nodes, viewport, assetManager) {
    
  for(const node of nodes) {
    
    switch(node.kind) {
      
        case 'homeWelcome':
            renderHomeWelcome(ctx, node, viewport)
            break
            case 'text':
              renderText(ctx, node, viewport, LAYOUT.typography)
              break
            case 'lessonOption':
            renderButton(ctx, node, viewport, assetManager)
            break
         
    }
}
}