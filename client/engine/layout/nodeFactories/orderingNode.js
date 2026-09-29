export function createOrderingNode({
    id,
    sectionId,
    x,
    worldY,
    width,
    height,
    padding = 0,
    color = '#e0e0e0',
    orderingId,
    children = {}
}) {
    return {
        id,
        type: 'ordering',
        kind: 'lessonSection',
        sectionType: 'ordering',

        sectionId,
        orderingId,

        x,
        worldY,
        width,
        height,

        padding,
        color,
        selected: false,

        children
    };
}