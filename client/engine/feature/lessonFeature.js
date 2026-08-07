
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
            answerQuiz: (sectionId, quizId, optionIndex, answer) => this.lessonController.answerQuiz(sectionId, quizId, optionIndex, answer),
            answerSurvey: (surveyId, optionIndex) => this.lessonController.answerSurvey(surveyId, optionIndex),
            completeSection: (sectionId) => this.lessonController.completeSection(sectionId),
            setCurrentSection: (sectionId) => this.lessonController.setCurrentSection(sectionId),
            updateProgress: () => this.lessonController.updateProgress(),
            onViewPortChanged: () => this.lessonController.onViewPortChanged(), 
            advanceLessonSection: () => this.lessonController.advanceLesson(),
            startLessonPhase: () => this.lessonController.startPhase(),
        }
    }

}