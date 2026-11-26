
export function getLessonStats({ lesson, analytics }) {

    const lessonTotal = lesson.lessonTotal || 0
    const quizCount = lesson.quizTotal || 0
    const surveyCount = lesson.surveyTotal || 0

    const duration =
        analytics?.available &&
        analytics.estimatedDurationMinutes > 0
            ? `${analytics.estimatedDurationMinutes} min (learner data)`
            : `${lesson.duration || '—'} min (estimated)`

    const participation =
        analytics?.available
            ? `${analytics.participantCount} learners participated`
            : 'Participation data accumulating'

    return [
        `${lessonTotal} activities`,
        `${quizCount} quizzes`,
        `${surveyCount} surveys`,
        participation,
        duration
    ].join(' • ')
}
