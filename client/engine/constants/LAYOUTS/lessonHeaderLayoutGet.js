export function getLessonHeaderLayout(compact, mobile) {
    return {
        height: compact
            ? 68
            : mobile
                ? 74
                : 80,

        paddingX: compact
            ? 12
            : mobile
                ? 16
                : 20,

        paddingY: compact
            ? 10
            : 12,

        titleSize: compact
            ? 13
            : mobile
                ? 14
                : 16,

        stepSize: compact
            ? 11
            : 12,

        scoreSize: compact
            ? 13
            : 16,

        progressHeight: compact
            ? 6
            : 8,

        progressGap: compact
            ? 8
            : 10,

        bottomGap: compact
            ? 12
            : 20
    }
}