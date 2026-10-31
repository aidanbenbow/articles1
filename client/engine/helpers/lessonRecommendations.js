const MAX_RECOMMENDED_LESSONS = 5

const DIFFICULTY_RANK = {
    beginner: 0,
    intermediate: 1,
    advanced: 2
}

export function getRecommendedLessons(context) {
    const sortedLessons = getSortedLessons(context)

    if (!sortedLessons.length) {
        return []
    }

    const completedIds = getCompletedLessonIds(context)
    const pendingLessons = sortedLessons.filter(
        lesson => !completedIds.has(lesson.articleId)
    )

    if (!pendingLessons.length) {
        return sortedLessons.slice(0, MAX_RECOMMENDED_LESSONS)
    }

    const preferredCategory = getPreferredCategory(
        sortedLessons,
        completedIds
    )

    const targetDifficulty = getTargetDifficulty(context)

    return pendingLessons
        .map((lesson, index) => ({
            lesson,
            score: scoreLesson(
                lesson,
                preferredCategory,
                targetDifficulty,
                index
            )
        }))
        .sort((a, b) => {
            if (b.score !== a.score) {
                return b.score - a.score
            }

            if ((a.lesson.lessonOrder ?? 0) !== (b.lesson.lessonOrder ?? 0)) {
                return (a.lesson.lessonOrder ?? 0) - (b.lesson.lessonOrder ?? 0)
            }

            return String(a.lesson.title || '').localeCompare(
                String(b.lesson.title || '')
            )
        })
        .slice(0, MAX_RECOMMENDED_LESSONS)
        .map(item => item.lesson)
}

export function getPlayerRecommendationText(context) {
    const userName = context?.appState?.user?.name || 'Guest'
    const recommendations = getRecommendedLessons(context)

    if (!recommendations.length) {
        return `Hi ${userName}, there are no lessons available yet.`
    }

    const topLesson = recommendations[0]

    return [
        `Recommended for ${userName}:`,
        `${topLesson.title}`,
        `${topLesson.lessonCategory} • ${toLabel(topLesson.lessonDifficulty)}`
    ].join('\n')
}

export function getLessonCategorySummary(context) {
    const lessons = getSortedLessons(context)

    if (!lessons.length) {
        return 'Categories: none yet'
    }

    const counts = new Map()

    for (const lesson of lessons) {
        const category = lesson.lessonCategory || 'General'

        counts.set(category, (counts.get(category) || 0) + 1)
    }

    const summary = [...counts.entries()]
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
        .map(([category, count]) => `${category} (${count})`)
        .join(', ')

    return `Categories: ${summary}`
}

function getSortedLessons(context) {
    return getArticleData(context).sort((a, b) => {
        if ((a.lessonOrder ?? 0) !== (b.lessonOrder ?? 0)) {
            return (a.lessonOrder ?? 0) - (b.lessonOrder ?? 0)
        }

        return String(a.title || '').localeCompare(String(b.title || ''))
    })
}

function getArticleData(context) {
    const articleNodes = context?.articleNodes || []

    return articleNodes
        .map(node => node?.props?.articleData)
        .filter(article => article && article.articleId)
}

function getCompletedLessonIds(context) {
    const completed = context?.appState?.user?.completedLessons || []

    return new Set(completed)
}

function getPreferredCategory(sortedLessons, completedIds) {
    const completedLessons = sortedLessons.filter(lesson =>
        completedIds.has(lesson.articleId)
    )

    if (!completedLessons.length) {
        return null
    }

    return completedLessons[completedLessons.length - 1].lessonCategory || null
}

function getTargetDifficulty(context) {
    const completedCount = context?.appState?.user?.lessonsCompleted || 0

    if (completedCount >= 6) {
        return 'advanced'
    }

    if (completedCount >= 2) {
        return 'intermediate'
    }

    return 'beginner'
}

function scoreLesson(lesson, preferredCategory, targetDifficulty, index) {
    let score = 1000

    if (preferredCategory && lesson.lessonCategory === preferredCategory) {
        score += 250
    }

    const lessonDifficulty = normalizeDifficulty(lesson.lessonDifficulty)
    const targetRank = DIFFICULTY_RANK[targetDifficulty] ?? 0
    const lessonRank = DIFFICULTY_RANK[lessonDifficulty] ?? 0

    score -= Math.abs(lessonRank - targetRank) * 50
    score -= index * 2

    return score
}

function normalizeDifficulty(difficulty) {
    const value = String(difficulty || 'beginner').toLowerCase()

    if (value.includes('advanced')) return 'advanced'
    if (value.includes('intermediate')) return 'intermediate'

    return 'beginner'
}

function toLabel(value) {
    const text = String(value || '').trim()

    if (!text) {
        return 'Beginner'
    }

    return text[0].toUpperCase() + text.slice(1)
}