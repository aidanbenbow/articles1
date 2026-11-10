export class LessonAnalyticsService {

    constructor(lessonProgressStore, dataStore) {
        this.lessonProgressStore = lessonProgressStore
        this.dataStore = dataStore
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
}