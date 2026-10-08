export const SURVEY_LAYOUT = {
    id: 'survey',
    type: 'card',
    kind: 'survey',
    sectionType: 'survey',

    padding: ({ metrics }) =>
        metrics.survey.padding,

    layout: {
        gap: ({ metrics }) =>
            metrics.survey.optionGap
    },

    style: {
        radius: 8,
        shadowBlur: 4,
        shadowOffsetX: 0,
        borderWidth: 1
    },

    children: [

        // ─────────────────────────────
        // Question
        // ─────────────────────────────

        {
            id: 'question',

            type: 'text',

            kind: 'lessonSection',
            sectionType: 'surveyQuestion',

            typography: 'question',

            color: '#8e4141',

            value: ({ section }) =>
                section.question
        },

        // ─────────────────────────────
        // Response count
        // ─────────────────────────────

        {
            id: 'response',

            type: 'text',

            kind: 'lessonSection',
            sectionType: 'surveyResponse',

            typography: 'body',

            value: ({ activity }) => {
                const results =
                    activity?.getResults?.() ?? null

                const total =
                    results?.totalResponses ?? 0

                return `Responses: ${total}`
            }
        },

        // ─────────────────────────────
        // Survey options
        // ─────────────────────────────

        {
            id: 'options',

            type: 'collection',

            source: ({ section }) =>
                section.options ?? [],

            item: {

                type: 'surveyOption',

                kind: 'surveyOption',

                sectionType: 'surveyOption',

                text: ({ item }) =>
                    item,

                optionIndex: ({ index }) =>
                    index
            }
        },

        // ─────────────────────────────
        // Feedback
        // ─────────────────────────────

        {
            id: 'feedback',

            type: 'text',

            kind: 'lessonSection',
            sectionType: 'surveyFeedback',

            typography: 'body',

            color: '#9d2929',

            visible: ({ activity }) =>
                activity?.getResponse?.() !== null,

            value: ({ activity }) =>
                activity?.getFeedback?.() ?? ''
        }
    ]
}