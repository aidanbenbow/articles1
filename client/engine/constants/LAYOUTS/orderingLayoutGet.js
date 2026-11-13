export function getOrderingLayout(compact) {
    return {
        questionHeight: compact ? 32 : 36,

        itemHeight: compact ? 42 : 52,
        itemGap: compact ? 8 : 10,
        itemPaddingX: compact ? 12 : 16,
        itemPaddingY: compact ? 8 : 10,
        itemMinWidth: compact ? 65 : 80,

        // Reordering controls
        buttonWidth: compact ? 30 : 34,
        buttonHeight: compact ? 30 : 34,
        buttonGap: compact ? 6 : 8,
        buttonSize: compact ? 16 : 18,
        controlPadding: compact ? 8 : 12,

        paragraphLineHeight: compact ? 38 : 42,
        paragraphGap: compact ? 3 : 5,
        gapWidth: compact ? 90 : 110,
        gapHeight: compact ? 28 : 32,

        checkButtonHeight: compact ? 36 : 40,
        checkButtonGap: compact ? 12 : 15,

        feedbackHeight: compact ? 36 : 40,
        feedbackGap: compact ? 8 : 10,

        sectionGap: compact ? 16 : 25,
        
    }
}