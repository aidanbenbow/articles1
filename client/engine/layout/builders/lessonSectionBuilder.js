import { compileSection } from "../general/compileSection.js"

export function buildLessonSectionNode(config, context) {
    const {
        lesson,
        currentY
    } = context

    const section =
        lesson.getCurrentSection()

    if (!section) {
        return {
            node: null,
            currentY
        }
    }

    return compileSection(
        section,
        {
            ...context,
            section,
            currentY
        }
    )
}