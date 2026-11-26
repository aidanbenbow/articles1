
/**
 * Central scoring configuration.
 *
 * All activity states and lesson-level calculations
 * should use these rules.
 */

export const SCORING_CONFIG = {
    version: 1,

    activities: {
        quiz: {
            pointsPerCorrectAnswer: 10,
            scored: true,
        },

        dragdrop: {
            pointsPerCorrectAnswer: 2,
            scored: true
        },

        ordering: {
            pointsPerCorrectPosition: 5,
            scored: true
        },

        survey: {
            pointsPerAnswer: 0,
            scored: false
        },

        lesson: {
            pointsPerActivity: 0,
            scored: false
        }
    },

    difficulty: {
        thresholds: {
            easy: 30,
            medium: 65
        },

        weights: {
            quiz: 0.4,
            dragdrop: 0.3,
            ordering: 0.3
        }
    }
}

/**
 * Get the maximum possible score for an activity.
 */
export function getActivityMaxScore(type, questionCount) {
    const rule = SCORING_CONFIG.activities[type]

     if (!rule?.scored) return 0

    const points =
        rule.pointsPerCorrectAnswer ??
        rule.pointsPerCorrectPosition ??
        0

    return Math.max(0, count) * points
}

/**
 * Convert activity performance into a difficulty score.
 *
 * 0 = easy
 * 100 = difficult
 */
export function calculateActivityDifficulty(correct, total) {
    if (!total || total <= 0) return null

    return Math.round(
        100 - (correct / total * 100)
    )
}

/**
 * Convert a numerical difficulty score into a label.
 */
export function getDifficultyLabel(score) {
    if (score == null) return 'unknown'

    const { easy, medium } =
        SCORING_CONFIG.difficulty.thresholds

    if (score < easy) return 'easy'
    if (score < medium) return 'medium'

    return 'hard'
}

/**
 * Calculate a weighted lesson difficulty.
 */
export function calculateLessonDifficulty(activityStats) {
    const weights = SCORING_CONFIG.difficulty.weights

    let weightedScore = 0
    let totalWeight = 0

    for (const [type, weight] of Object.entries(weights)) {
        const score = activityStats[type]?.difficulty

        if (score === null || score === undefined) {
            continue
        }

        weightedScore += score * weight
        totalWeight += weight
    }

    if (!totalWeight) return null

    const score = Math.round(weightedScore / totalWeight)

    return {
        score,
        label: getDifficultyLabel(score)
    }
}
