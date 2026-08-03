import { SurveyApi } from "./surveyApi.js"

export class SurveyService {

    constructor() {
        this.results = {}
        this.api = new SurveyApi()
    }


    async getResults(surveyId) {
      const results = await this.api.getSurveyResults(surveyId)
      console.log(`Fetched survey results for survey ${surveyId}:`, results)
        return this.results[surveyId] || {}
    }



    async recordResponse(surveyId, optionIndex) {
        const updatedResults = await this.api.recordSurveyResponse(surveyId, optionIndex)
        
        this.results[surveyId] = updatedResults
        return updatedResults
    }

}