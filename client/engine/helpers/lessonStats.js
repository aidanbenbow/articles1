export function getLessonStats({ lesson }) {
    const lessonTotal = lesson.lessonTotal || 0
    const quizCount = lesson.quizTotal || 0
    const surveyCount = lesson.surveyTotal || 0

    return [
        `${lessonTotal} learning blocks`,
        `${quizCount} quizzes`,
        `${surveyCount} surveys`
    ].join(' • ')
}