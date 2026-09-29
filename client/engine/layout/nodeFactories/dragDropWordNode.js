export function createDragDropWordNode(
   { id,
    sectionId = null,
    dragDropId = null,
    wordIndex = null,
    x,
    worldY,
    width,
    height = 40,
    color = '#23979d',
    text,
    padding = 0,
    action = null,
    kind = 'dragDropWord',
    sectionType = 'dragDropWord',
    type = 'dragDropWord',
    interactive = true,
    
    ...extra}
) {
    return {
        id,
        sectionId,
        dragDropId,
        wordIndex,
        x,
        interactive,
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
    }
}