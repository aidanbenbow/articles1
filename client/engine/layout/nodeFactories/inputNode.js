
import { createBaseNode } from "./baseNode.js";

export function createNameInputNode({
    id,
    owner = null,
    surveyId = null,
    sectionId = null,

    x,
    worldY,
    width,
    height = 55,

    color = "#ffffff",
    text = "",
    placeholder = "Enter your name...",

    value = "",
    padding = 8,

    action = "focusNameInput",

    kind = "nameInput",
    sectionType = "input",
    type = "nameInput",

    disabled = false,

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
        text: value || text,
        padding,

        interactive: true,
        selected: false,

        kind,
        type,
        sectionType,

        placeholder,
        value,
        action,
        disabled,

        ...extra
    });
}
