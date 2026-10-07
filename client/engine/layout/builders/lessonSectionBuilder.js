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
const result = compileSection(
        section,
        {
            ...context,
            section,
            currentY
        }
    )
  
    
    return result
}