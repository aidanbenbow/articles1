import { createCardNode } from "./cardNode.js";

export function createSurveyNode({
    id,
    owner = null,
    sectionId,
    surveyId,
interactive = false,
    x,
    worldY,
    width,
    height,

    padding = 0,
    color = '#e0e0e0',

    surveyType = 'single',

    kind = 'lessonSection',
    sectionType = 'survey',

    style = {},
    children = {}
}) {
    return {
        ...createCardNode({
            id,
            type: 'survey',

            owner,
            sectionId,
            surveyId,

            x,
            worldY,
            width,
            height,

            padding,
            color,

            kind,
            sectionType,

            style,
            children
        }),

        surveyType,
        interactive
    };
}