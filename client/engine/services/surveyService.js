import { SurveyApi } from "../api/surveyApi.js"

export class SurveyService {

    constructor() {
        this.results = {}
        this.api = new SurveyApi()
    
    }


    async getResults(surveyId) {
      const results = await this.api.getSurveyResults(surveyId)
     this.results[surveyId] = results
        return this.results[surveyId] || {}
    }



    async recordResponse(surveyId, optionIndex) {
        const updatedResults = await this.api.recordSurveyResponse(surveyId, optionIndex)
        
        this.results[surveyId] = updatedResults
        return updatedResults
    }

}