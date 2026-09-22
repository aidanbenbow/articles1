export function createTextNode({
    id,
    sectionId = null,
    x,
    worldY,
    width,
    height,
    color,
    text,
    padding = 0,
    kind,
    sectionType = null
}) {
    return {
        id,
        sectionId,
        x,
        worldY,
        width,
        height,
        color,
        text,
        kind,
        type: 'text',
        sectionType,
        padding
    };
}