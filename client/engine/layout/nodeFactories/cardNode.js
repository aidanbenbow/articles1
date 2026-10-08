export function createCardNode({
    id,
    owner = null,
    type = 'card',
    sectionId = null,
    surveyId = null,
    x,
    worldY,
    width,
    height,
    selected = false,
    color=null,
    padding = 0,
    kind=null,
    sectionType = null,
    style ={},
    children = []
}) {
    return {
        id,
        type,
        surveyId,
        owner,
        sectionId,

        x,
        worldY,
        width,
        height,

        selected,
        color,
        padding,

        kind,
        sectionType,

        style,
        children
    };
}