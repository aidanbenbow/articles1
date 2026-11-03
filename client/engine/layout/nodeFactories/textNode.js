import { createBaseNode } from "./baseNode.js";

export function createTextNode({
    id,
    owner=null,
    sectionId = null,
    surveyId = null,
    interactive = false,
    x,
    worldY,
    width,
    height,
    color=null,
    text,
    padding = 0,
    kind='text',
    sectionType = null,
    typography = 'body',
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

        interactive,
        selected: false,

        kind,
        type: 'text',
        sectionType,
        
        typography,
        ...extra
    })
    };
