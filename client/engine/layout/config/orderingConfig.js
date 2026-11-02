
export const ORDERING_LAYOUT = {
    id: 'ordering',
    type: 'card',
    kind: 'ordering',
    sectionType: 'ordering',

    padding: ({ metrics }) => metrics.ordering.padding,

    style: {
        radius: 8,
        shadowBlur: 4,
        shadowOffsetX: 0,
        borderWidth: 1,
    },

    children: [
        {
            id: 'instruction',
            type: 'text',
            kind: 'lessonSection',
            sectionType: 'ordering',
            typography: 'step',
            color: '#000',
            value: ({ section }) => section.question ?? 'Please order the items below:',
        },

        {
            id: 'items',
            type: 'collection',

            source: ({ activity }) =>
                activity?.getItems?.() ?? [],

            layout: {
                gap: ({ metrics }) => metrics.ordering.itemGap,
            },

            item: {
                type: 'orderingItem',
                kind: 'lessonSection',
                sectionType: 'orderingItem',

                text: ({ item }) => item,
                itemIndex: ({ index }) => index,
                sectionId: ({ section }) => section.id,
                orderingId: ({ section }) => section.id,
            },
        },

        {
            id: 'check',
            type: 'button',
            kind: 'lessonSection',
            sectionType: 'ordering',
            text: 'Check Answers',
            action: 'checkOrdering',
            sectionId: ({ section }) => section.id,
            width: 120,
        },

        {
            id: 'feedback',
            type: 'text',
            kind: 'lessonSection',
            sectionType: 'ordering',
            typography: 'step',
            color: '#000',

            value: ({ activity }) =>
                activity?.getFeedback?.() ?? '',

            visible: ({ activity }) =>
                activity?.getChecked?.() === true,
        },
    ],
}
