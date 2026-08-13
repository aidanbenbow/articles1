export function getSurveyResult(lesson, surveyId, optionIndex) {
    const survey =
        lesson.surveyResults?.[surveyId] || {}

    const responses =
        survey.responses || {}

    const total =
        survey.totalResponses || 0

    const votes =
        responses[optionIndex] || 0

    const percentage =
        total > 0
            ? Math.round((votes / total) * 100)
            : 0

    return {
        total,
        votes,
        percentage
    }
}