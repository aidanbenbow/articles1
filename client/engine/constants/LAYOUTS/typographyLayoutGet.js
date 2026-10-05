import { LAYOUT } from "../layoutConstants.js";

export function getResponsiveTypography(compact) {
    return {
        eyebrow: {
            ...LAYOUT.typography.eyebrow,
            size: compact
                ? 10
                : LAYOUT.typography.eyebrow.size
        },

        heading: {
            ...LAYOUT.typography.heading,
            size: compact
                ? 16
                : LAYOUT.typography.heading.size
        },

        paragraph: {
            ...LAYOUT.typography.paragraph
        },

        title: {
            ...LAYOUT.typography.title,
            size: compact
                ? 22
                : LAYOUT.typography.title.size
        },

        sectionHeading: {
            ...LAYOUT.typography.sectionHeading
        },

        body: {
            ...LAYOUT.typography.body
        },

        step: {
            ...LAYOUT.typography.step,
            size: compact
                ? 11
                : LAYOUT.typography.step.size
        },

        question: {
            ...LAYOUT.typography.question
        }
    }
}