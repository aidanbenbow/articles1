export const QUIZ_LAYOUT = {
    type: 'card',
    kind: 'quiz',
    sectionType: 'quiz',

    layout: {
        padding: ({ metrics }) => metrics.quiz.padding
    },

    children: [
        {
            id: 'question',
            type: 'text',
            typography: 'body',
            sectionType: 'quizQuestion',

            value: ({ section }) =>
                section.question
        },

        {
            id: 'options',
            type: 'collection',

            source: ({ section }) =>
                section.options,

            item: {
                type: 'quizOption',
                sectionType: 'quizOption',

                text: ({ item }) =>
                    item,

                optionIndex: ({ index }) =>
                    index,

                answer: ({ section }) =>
                    section.answer
            }
        },

        {
            id: 'feedback',
            type: 'text',
            typography: 'body',
            sectionType: 'quizFeedback',

           visible: ({ activity, section }) =>
        activity?.hasAnswered?.(section.id) ?? false,

    value: ({ activity, section }) =>
        activity?.getAnswer?.(section.id)?.feedback
        ?? activity?.feedback
        ?? ''}
    ]
}