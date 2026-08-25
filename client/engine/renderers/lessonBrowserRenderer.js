import { renderLessonListCard } from "./lessonListCardRenderer.js";

export function renderLessonBrowser(
    ctx,
    nodes,
    viewport,
    assetManager
) {
  for (const node of nodes) {

        renderLessonListCard(
            ctx,
            node,
            viewport,
            assetManager
        )
    }
   
}