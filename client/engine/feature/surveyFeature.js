import { SurveyService } from "../services/surveyService.js"

export class SurveyFeature {

    constructor(engine) {
        this.engine = engine
        this.service = new SurveyService()
    }


    contextExports() {
        return {
            getSurveyResults:
                (id) => this.service.getResults(id),

            recordSurveyResponse:
                (id, option) =>
                    this.service.recordResponse(id, option),
                getAllSurveyResults: () => this.service.results
        }
    }
}