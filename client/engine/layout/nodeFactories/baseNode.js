
export function createBaseNode({
    id,
    owner = null,
    surveyId = null,
    sectionId = null,

    x,
    worldY,
    width,
    height,

    color = null,
    text = null,
    padding = 0,

    interactive = false,
    selected = false,

    kind = "node",
    type = "node",
    sectionType = null,

    ...extra
}) {
    return {
        id,
        owner,
        surveyId,
        sectionId,

        x,
        worldY,
        width,
        height,

        color,
        text,
        padding,

        interactive,
        selected,

        kind,
        type,
        sectionType,

        ...extra
    };
}
