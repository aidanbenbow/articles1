export function createTextNode({
    id,
    owner=null,
    sectionId = null,
    x,
    worldY,
    width,
    height,
    color,
    text,
    padding = 0,
    kind,
    sectionType = null,
    typography = null,
}) {
    return {
        id,
        owner,
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
        padding,
        typography
    };
}