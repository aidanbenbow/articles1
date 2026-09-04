export const lessonProgressStatus = {
    NOT_STARTED: 'not_started',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed',
}

export class LessonProgress {

    constructor(data = {}) {

        this.lessonId = data.lessonId ?? null

        this.status =data.status ?? lessonProgressStatus.NOT_STARTED

        this.progressPercent = data.progressPercent ?? 0

        this.currentActivityId = data.currentActivityId ?? null

        this.completedActivityIds = data.completedActivityIds ?? []

        this.quizAnswers = data.quizAnswers ?? {}

        this.quizScore = data.quizScore ?? 0

        this.surveyResponses = data.surveyResponses ?? {}

            this.orderingAnswers = data.orderingAnswers ?? {}

        this.startedAt = data.startedAt ?? null

        this.completedAt =data.completedAt ?? null

        this.lastAccessedAt = data.lastAccessedAt ?? null
    }

    get completed() {
        return this.status === lessonProgressStatus.COMPLETED
    }

    get inProgress() {
        return this.status === lessonProgressStatus.IN_PROGRESS
    }
}