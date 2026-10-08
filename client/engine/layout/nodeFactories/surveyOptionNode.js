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
  text='',
  selected = false,
  answered = false,

    padding = 0,
    color = null,

    children = [],

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
     text,
  selected,
  answered,

        padding,
        color,

        style,
        children,
        action: 'answerSurvey'
    };
}