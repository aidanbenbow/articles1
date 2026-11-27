
export function enrichLessonsWithAnalytics(
    articles,
    analyticsByLessonId = {}
) {
    return articles.map(article => ({
        ...article,
        analytics: analyticsByLessonId[article.articleId] ?? {
            available: false
        }
    }))
}
