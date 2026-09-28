export function createSurveyOptionNode({
    id,
    owner = null,
    sectionId = null,
    surveyId = null,
interactive = true,
    x,
    worldY,
    width,
    height,

    optionIndex,
  

    padding = 0,
    color = null,

    children = {},

    style = {}
}) {
    return {
        id,
        type: 'surveyOption',

        owner,
        sectionId,
        surveyId,
interactive,
        x,
        worldY,
        width,
        height,

        optionIndex,
     

        padding,
        color,

        style,
        children,
        action: 'answerSurvey'
    };
}