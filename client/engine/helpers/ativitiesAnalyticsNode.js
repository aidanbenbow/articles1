
export function createActivityAnalyticsNodes(article) {
    const analytics = article.analytics

    if (!analytics?.available || !analytics.activityStats) {
        return []
    }

    const activityLabels = {
        quiz: 'Quiz',
        dragdrop: 'Drag and drop',
        ordering: 'Ordering'
    }

    const activityStats = analytics.activityStats

    const activityNodes = Object.entries(activityLabels)
        .filter(([key]) => {
            const activity = activityStats[key]
            return activity && activity.attempted > 0
        })
        .map(([key, label]) => {
            const activity = activityStats[key]

            return {
                id: `lesson-${article.articleId}-${key}-accuracy`,
                type: 'text',
                typography: 'caption',
                color: 'muted',
                value: `${label}: ${activity.accuracy}% accuracy (${activity.correct}/${activity.attempted} correct)`
            }
        })

    if (activityNodes.length === 0) {
        return []
    }

    return [
        {
            id: `lesson-${article.articleId}-activity-heading`,
            type: 'text',
            typography: 'caption',
            color: 'muted',
            value: 'Cohort activity accuracy'
        },
        ...activityNodes
    ]
}
