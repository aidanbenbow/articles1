export function createQuizOptionNode({
    id,
    owner = null,
    sectionId = null,
    quizId = null,
    optionIndex = null,

    x,
    worldY,
    width,
    height,

    color = '#d0d0d0',
    text = '',

    answer = null,

    interactive = true,
    action = 'answerQuiz',

    padding = 10,
    typography = 'body',

    kind = 'lessonSection',
    sectionType = 'quizOption'
}) {
    return {
        id,

        owner,
        sectionId,
        quizId,
        optionIndex,

        x,
        worldY,
        width,
        height,

        color,
        text,
        answer,

        padding,

        type: 'quizOption',
        kind,
        sectionType,

        interactive,
        action,

        typography,

        selected: false
    }
}