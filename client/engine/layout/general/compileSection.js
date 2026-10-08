
import { QUIZ_LAYOUT } from "../config/quizConfig.js"
import { SURVEY_LAYOUT } from "../config/surveyConfig.js"

export const SECTION_LAYOUTS = {
    quiz: QUIZ_LAYOUT,
     survey: SURVEY_LAYOUT,
    // ordering: ORDERING_LAYOUT,
    // dragdrop: DRAGDROP_LAYOUT
}

// const sectionBuilders = {
//     quiz: buildQuizSectionNode,
//     survey: buildSurveySectionNode
// }

// export function compileSection(section, context) {
//     const builder =
//         sectionBuilders[section.type]

//     if (!builder) {
//         throw new Error(
//             `No section builder for ${section.type}`
//         )
//     }

//     return builder(
//         context
//     )
// }