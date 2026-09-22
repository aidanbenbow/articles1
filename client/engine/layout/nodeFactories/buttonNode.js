export function createButtonNode({
    id,
    sectionId = null,
    x,
    worldY,
    width,
    height = 40,
    color = '#23979d',
    text,
    padding = 0,
    action,
    kind = 'button',
    sectionType = 'button',
    type = 'button',
    ...extra
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
        padding,
        action,
        kind,
        type,
        sectionType,
        selected: false,
        ...extra
    };
}