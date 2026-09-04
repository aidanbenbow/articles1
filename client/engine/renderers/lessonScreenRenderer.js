import { renderLesson } from "../modules/renderUtils.js"
import { renderLessonComplete } from "./renderLessonComplete.js"
import { renderLessonHeader } from "./renderLessonHeader.js"
import { renderLessonIntro } from "./renderLessonIntro.js"

export function renderLessonScreen(
    ctx,
    view,
    viewport,
    lessonState,
    assetManager
) {
    if (!lessonState)   return

    switch (lessonState.phase) {
        case 'intro':
            renderLessonIntro( ctx, view, viewport)
            break
        case 'active':
            renderLesson(ctx,view.lessonSectionNodes,viewport,lessonState)
            renderLessonHeader(ctx,lessonState,viewport)
            break
        case 'completed':
            renderLessonComplete(    ctx,   view,   viewport )
            break
    }
}