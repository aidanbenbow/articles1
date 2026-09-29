export function createOrderingItemNode({
    id,
    sectionId,
    orderingId,
    itemIndex,
    x,
    worldY,
    width,
    height,
    text,
    padding = 0,
    color = '#d0d0d0',
    children = {}
}) {
    return {
        id,
        type: 'orderingItem',
        kind: 'lessonSection',
        sectionType: 'orderingItem',

        sectionId,
        orderingId,
        itemIndex,

        x,
        worldY,
        width,
        height,

        padding,
        color,
        text,

        children,

        interactive: false
    };
}