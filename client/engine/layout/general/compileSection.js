import { buildQuizSectionNode } from "../builders/quizBuilder.js"
import { buildSurveySectionNode } from "../builders/surveyBuilder.js"

const sectionBuilders = {
    quiz: buildQuizSectionNode,
    survey: buildSurveySectionNode
}

export function compileSection(section, context) {
    const builder =
        sectionBuilders[section.type]

    if (!builder) {
        throw new Error(
            `No section builder for ${section.type}`
        )
    }

    return builder(
        context
    )
}