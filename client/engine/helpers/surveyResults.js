export function getSurveyResult( survey, optionIndex) {
    const results = survey.getResults() || {}

    const responses = results.responses || {}

    const total = results.totalResponses || 0

    const votes =responses[optionIndex] || 0

    const percentage = total > 0
            ? Math.round((votes / total) * 100)
            : 0

    return {
        total,
        votes,
        percentage
    }
}