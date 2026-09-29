export function getDragDropLayout(compact) {
    return {
          instructionHeight: compact ? 32 : 36,

            wordHeight: compact ? 32 : 36,

            wordGap: compact ? 6 : 8,

            wordPaddingX: compact ? 8 : 12,

            wordMinWidth: compact ? 65 : 80,

            paragraphLineHeight: compact ? 38 : 42,

            paragraphGap: compact ? 3 : 5,

            gapWidth: compact ? 90 : 110,

            gapHeight: compact ? 28 : 32,

            checkButtonHeight: compact ? 36 : 40,

            checkButtonGap: compact ? 12 : 15,

            feedbackHeight: compact ? 36 : 40,

            feedbackGap: compact ? 8 : 10,

            sectionGap: compact ? 16 : 25
        }
    }
