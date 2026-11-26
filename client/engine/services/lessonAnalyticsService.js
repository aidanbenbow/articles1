import { fetchLessonAnalytics } from "../api/lessonAnalyticsApi"

export class LessonAnalyticsService {

    constructor(lessonProgressStore, dataStore) {
        this.lessonProgressStore = lessonProgressStore
        this.dataStore = dataStore

        // Backend cohort analytics cache
        this.lessonAnalyticsCache = new Map()
        this.analyticsRequests = new Map()
    }

    getAllProgress() {
        return [...this.lessonProgressStore.progress.values()]
    }
    getCompletionRate() {
    const records = this.getAllProgress()

    if (!records.length) return 0

    const completed = records.filter(
        record => record.status === 'completed'
    ).length

    return Math.round(
        (completed / records.length) * 100
    )
}getAverageActiveTime() {
    const completedLessons = this.getAllProgress().filter(
        record =>
            record.status === 'completed' &&
            record.activeTimeSeconds > 0
    )

    if (!completedLessons.length) return 0

    const totalTime = completedLessons.reduce(
        (total, record) => total + record.activeTimeSeconds,
        0
    )

    return Math.round(totalTime / completedLessons.length)
}
getAverageEstimatedDuration() {
    const articles = (this.dataStore?.articles ?? []).filter(
        article => Number(article.duration) > 0
    )

    if (!articles.length) return 0

    const totalDuration = articles.reduce(
        (total, article) => total + (Number(article.duration) || 0),
        0
    )

    return Math.round(totalDuration / articles.length)
}
getDifficultyDistribution() {
    const articles = this.dataStore?.articles ?? []

    return articles.reduce((distribution, article) => {
        const difficulty = article.difficulty || 'medium'

        distribution[difficulty] =
            (distribution[difficulty] || 0) + 1

        return distribution
    }, {})
}
getCompletedLessonIds(userId) {
    if (!userId) return []

    return this.lessonProgressStore
        .getAllForUser(userId)
        .filter(record => record.completed)
        .map(record => record.lessonId)
}
getCachedAnalytics(lessonId) {
        return this.lessonAnalyticsCache.get(lessonId) ?? null
    }
    async loadLessonAnalytics(lessonId) {
        if (!lessonId) return null

        // Return cached data if already loaded
        if (this.lessonAnalyticsCache.has(lessonId)) {
            return this.lessonAnalyticsCache.get(lessonId)
        }

        // Avoid duplicate requests
        if (this.analyticsRequests.has(lessonId)) {
            return this.analyticsRequests.get(lessonId)
        }

        const request = this.fetchLessonAnalytics(lessonId)

        this.analyticsRequests.set(lessonId, request)

        try {
            return await request
        } finally {
            this.analyticsRequests.delete(lessonId)
        }
    }

async fetchLessonAnalytics(lessonId) {
    try {
        const analytics = await fetchLessonAnalytics(lessonId)

        this.lessonAnalyticsCache.set(
            lessonId,
            analytics
        )

        return analytics
    } catch (error) {
        console.error(
            'Lesson analytics fetch failed:',
            error
        )

        return null
    }
}


    invalidateAnalytics(lessonId) {
        this.lessonAnalyticsCache.delete(lessonId)
    }

    clearAnalyticsCache() {
        this.lessonAnalyticsCache.clear()
    }
}