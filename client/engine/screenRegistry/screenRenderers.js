import { renderHome } from "../renderers/homeRenderer.js";
import { renderLessonScreen } from "../renderers/lessonScreenRenderer.js";

export const screenRenderers = {
    home: renderHome,
    lesson: renderLessonScreen,
    lessonBrowser: renderLessonBrowser
}