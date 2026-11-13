
export const ORDERING_ITEM_LAYOUT = {
    id: 'ordering-item',
    type: 'card',
    kind: 'orderingItem',
    sectionType: 'orderingItem',

    padding: 5,

    style: {
        radius: 8,
        borderWidth: 1,
    },

    children: [
        {
            id: 'text',
            type: 'text',
            kind: 'lessonSection',
            sectionType: 'orderingItem',
            value: ({ node }) => node.text,
        },

        {
            id: 'up',
            type: 'button',
            kind: 'lessonSection',
            sectionType: 'orderingItem',
            text: '↑',
            action: 'moveOrderingItem',
            direction: 'up',
        },

        {
            id: 'down',
            type: 'button',
            kind: 'lessonSection',
            sectionType: 'orderingItem',
            text: '↓',
            action: 'moveOrderingItem',
            direction: 'down',
        },
    ],
}
