
import { LessonController } from "../controllers/lessonController.js"
import { SurveyApi } from "../modules/surveyApi.js"
import { LessonService } from "../services/lessonService.js"


export class LessonFeature {

    constructor(engine) {
        this.engine = engine
        this.lessonService = new LessonService(new SurveyApi())
        this.lessonController = new LessonController(this.lessonService, engine)
    }

    contextExports() {
        return {
           
            startLesson: (articleId, sections) => this.lessonController.start(articleId, sections),
            getLesson: () => this.lessonController.getState(),
            answerQuiz: (quizId, optionIndex, answer) => this.lessonController.answerQuiz(quizId, optionIndex, answer),
            answerSurvey: (surveyId, optionIndex) => this.lessonController.answerSurvey(surveyId, optionIndex),
            completeSection: (sectionId) => this.lessonController.completeSection(sectionId),
            updateProgress: () => this.lessonController.updateProgress()
        }
    }

}