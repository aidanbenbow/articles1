export function getQuizLayout(compact) {
    return {
        questionHeight: compact ? 32 : 36,
        optionHeight: compact ? 32 : 36,    
    optionGap: compact ? 6 : 8,
        feedbackHeight: compact ? 36 : 40,
        feedbackGap: compact ? 8 : 10,
        sectionGap: compact ? 16 : 25,
        buttonWidth: compact ? 60 : 80,
        buttonGap: compact ? 8 : 10,
        buttonSize: compact ? 16 : 20,
    }
}