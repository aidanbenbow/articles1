import { buildQuizSectionNode } from "../builders/quizBuilder.js"

const sectionBuilders = {
    quiz: buildQuizSectionNode
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