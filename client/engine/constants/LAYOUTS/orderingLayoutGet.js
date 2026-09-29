export function getOrderingLayout(compact) {
    return {
        questionHeight: compact ? 32 : 36,
        itemHeight: compact ? 32 : 36,
        itemGap: compact ? 6 : 8,
        itemPaddingX: compact ? 8 : 12,
        itemMinWidth: compact ? 65 : 80,
        paragraphLineHeight: compact ? 38 : 42,
        paragraphGap: compact ? 3 : 5,
        gapWidth: compact ? 90 : 110,
        gapHeight: compact ? 28 : 32,
        checkButtonHeight: compact ? 36 : 40,
        checkButtonGap: compact ? 12 : 15,
        feedbackHeight: compact ? 36 : 40,
        feedbackGap: compact ? 8 : 10,
        sectionGap: compact ? 16 : 25,
        buttonWidth: compact ? 60 : 80,
        buttonGap: compact ? 8 : 10,
        buttonSize: compact ? 16 : 20,
    }
}