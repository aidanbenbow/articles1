export function getSurveyLayout(compact) {
    return {
        padding: compact ? 14 : 20,

        questionHeight: compact ? 42 : 50,
        responseHeight: compact ? 24 : 30,

        optionHeight: compact ? 36 : 42,
        optionGap: compact ? 8 : 10,

        feedbackHeight: compact ? 36 : 40,
        feedbackGap: compact ? 8 : 10,

        responseWidth: compact ? 80 : 100,

        sectionGap: compact ? 12 : 16
    };
}