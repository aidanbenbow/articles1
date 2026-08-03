import { docClient } from "../http/db.js";
import { registerSurveyHandlers } from "./surveyHandlers.js";
import { SurveyRepository } from "./surveyRepository.js";

export function registerSurvey(app) {
    const repo = new SurveyRepository(docClient);

    registerSurveyHandlers(app, repo);
}