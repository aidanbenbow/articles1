import { SECTION_LAYOUTS } from "../general/compileSection.js"
import { compileNode } from "../general/nodeComplier.js"

export function buildDynamicSectionNode(config, context) {
    const { section } = context

    const sectionLayout = SECTION_LAYOUTS[section.type]
console.log('SECTION LAYOUT:', sectionLayout, 'SECTION TYPE:', section.type)
    if (!sectionLayout) {
        throw new Error(
            `No layout config for section type: ${section.type}`
        )
    }

    return compileNode(
        sectionLayout,
        context
    )
}