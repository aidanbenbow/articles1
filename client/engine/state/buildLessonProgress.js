
export function buildLessonProgress({
    userId,
    displayName = "Learner",
    lessonId,
    status = 'not_started',
    progressPercent = 0,
    currentActivityId = null,
    completedActivityIds = [],
    quizAnswers = {},
    quizScore = 0,
    surveyResponses = {},
    orderingAnswers = {},
    dragDropAnswers = {},
    totalScore = 0,
    maxPossibleScore = 0,
    scorePercentage = null,
    scoringVersion = 1,
    activeTimeSeconds = 0,
    startedAt = null,
    completedAt = null,
    lastAccessedAt = new Date().toISOString(),
}) {
    const now = new Date().toISOString()

    const progress = Math.max(
        0,
        Math.min(100, Math.round(progressPercent))
    )

    // Preserve explicit completion status.
    const resolvedStatus =
        status === 'completed' || progress >= 100
            ? 'completed'
            : status === 'in_progress' || progress > 0
                ? 'in_progress'
                : 'not_started'

    return {
        PK: `USER#${userId}`,
        SK: `LESSON#${lessonId}`,

        GSI1PK: `LESSON#${lessonId}`,
        GSI1SK: `USER#${userId}`,

        userId,
        displayName,
        lessonId,

        status: resolvedStatus,
        progressPercent: progress,

        currentActivityId,
        completedActivityIds,

        quizAnswers,
        quizScore,
        surveyResponses,
        orderingAnswers,
        dragDropAnswers,

        totalScore,
        maxPossibleScore,
        scorePercentage,
        scoringVersion,

        activeTimeSeconds,

        startedAt: startedAt ?? (
            progress > 0 ? now : null
        ),

        completedAt: completedAt ?? (
            resolvedStatus === 'completed' ? now : null
        ),

        lastAccessedAt,
        updatedAt: now,
    }
}
