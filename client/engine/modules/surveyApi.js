export class SurveyApi {

    async getSurveyResults(surveyId) {

        const response = await fetch(
            `/api/surveys/${surveyId}`
        )

        return await response.json()
    }


    async recordSurveyResponse(
        surveyId,
        optionIndex
    ) {

        const response = await fetch(
            `/api/surveys/${surveyId}/response`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    optionIndex
                })
            }
        )

        return await response.json()
    }
}