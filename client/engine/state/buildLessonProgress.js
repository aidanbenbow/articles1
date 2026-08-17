export function buildLessonProgress({
    userId,
    lessonId,
    status = 'not_started',
    progressPercent = 0,
    currentActivityId = null,
    completedActivityIds = [],
    quizAnswers = {},
    quizScore = 0,
    surveyResponses = {},
    startedAt = null,
    completedAt = null,
    lastAccessedAt = new Date().toISOString(),
}) {
    const now = new Date().toISOString()

    const progress = Math.max(
        0,
        Math.min(100, Math.round(progressPercent))
    )

    const resolvedStatus =
        progress >= 100
            ? 'completed'
            : progress > 0
                ? 'in_progress'
                : 'not_started'

    return {
        PK: `USER#${userId}`,
        SK: `LESSON#${lessonId}`,

        GSI1PK: `LESSON#${lessonId}`,
        GSI1SK: `USER#${userId}`,

        userId,
        lessonId,

        status: resolvedStatus,
        progressPercent: progress,

        currentActivityId,
        completedActivityIds,

        quizAnswers,
        quizScore,
        surveyResponses,

        startedAt:
            startedAt ??
            (progress > 0 ? now : null),

        completedAt:
            completedAt ??
            (resolvedStatus === 'completed'
                ? now
                : null),

        lastAccessedAt,
        updatedAt: now,
    }
}