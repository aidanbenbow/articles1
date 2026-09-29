export function createDragDropGapNode({
    id,
    sectionId = null,
    dragDropId = null,
    paragraphIndex = null,
    gapIndex = null,

    x,
    worldY,
    width,
    height,

    color = '#ffffff',
    text = '',
    answer = '',

    action = 'dropDragDropWord',
    interactive = true,

    kind = 'dragDropGap',
    sectionType = 'dragDropGap',
    type = 'dragDropGap',

    ...extra
}) {
    return {
        id,

        sectionId,
        dragDropId,
        paragraphIndex,
        gapIndex,

        x,
        worldY,
        width,
        height,

        color,
        text,
        answer,

        type,
        kind,
        sectionType,

        interactive,
        action,

        selected: false,

        ...extra
    }
}