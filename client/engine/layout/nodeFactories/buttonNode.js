import { createBaseNode } from "./baseNode.js"

export function createButtonNode({
    id,
    owner = null,
    surveyId = null,
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
    return createBaseNode({
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
        interactive: true,
        selected: false,
        action,
        kind,
        type,
        sectionType,
      
        ...extra
    })
}