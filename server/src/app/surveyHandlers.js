export function registerSurveyHandlers(app, repository) {
    app.get('/api/surveys/:surveyId', async (req, res) => {
        const { surveyId } = req.params;
        console.log(`Received request to fetch survey results for survey ${surveyId}`);
        // Fetch survey results from your data source (e.g., database)
        const surveyResults = await repository.getSurveyResults(surveyId);
        res.json(surveyResults);
    });

    app.post('/api/surveys/:surveyId/response', async (req, res) => {
        const { surveyId } = req.params;
        const { optionIndex } = req.body;
        console.log(`Received request to record response for survey ${surveyId}, option ${optionIndex}`);
        // Record the survey response in your data source (e.g., database)
        const updatedResults = await repository.recordSurveyResponse(surveyId, optionIndex);
        res.json(updatedResults);
    });

}
