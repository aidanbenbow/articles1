export function getDragDropLayout(compact) {
    return {
          instructionHeight: compact ? 22 : 26,

            wordHeight: compact ? 24 : 28,

            wordGap: compact ? 2 : 4,

            wordPaddingX: compact ? 8 : 12,

            wordMinWidth: compact ? 65 : 80,

            paragraphLineHeight: compact ? 19 : 21,

            paragraphGap: compact ? 3 : 5,

            gapWidth: compact ? 90 : 110,

            gapHeight: compact ? 20 : 24,

            checkButtonHeight: compact ? 36 : 40,

            checkButtonGap: compact ? 12 : 15,

            feedbackHeight: compact ? 36 : 40,

            feedbackGap: compact ? 8 : 10,

            sectionGap: compact ? 16 : 25
        }
    }
