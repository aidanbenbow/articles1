
import { initializeLessonProgress } from "../api/initialiseLessonProgress.js"
import { parseArticle } from "../constants/layoutParser.js"
import { LessonController } from "../controllers/lessonController.js"
import { SurveyApi } from "../api/surveyApi.js"
import { LessonService } from "../services/lessonService.js"
import { LessonProgressStore } from "../state/lessonProgressStore.js"


export class LessonFeature {

    constructor(engine) {
        this.engine = engine
        this.lessonProgressStore = new LessonProgressStore()
        this.lessonService = new LessonService(new SurveyApi(), this.lessonProgressStore)
        this.lessonController = new LessonController(this.lessonService, engine) 
    }
    async attach() {
    //  await initializeLessonProgress(this.lessonProgressStore)
    
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
            finishLesson: () => this.lessonController.finishLesson(),
            getLessonProgressStore: () => this.lessonProgressStore,
            startLessonFromArticle: (article) => this.startLessonFromArticle(article),
            moveOrderingItem: (sectionId, itemIndex,direction) =>
    this.lessonController.moveOrderingItem(sectionId,itemIndex,direction),
checkOrdering: (sectionId) => this.lessonController.checkOrdering(sectionId),
        }
    }
    startLessonFromArticle(article) {
        const lesson = parseArticle(article)

        this.lessonController.start(lesson)
        return lesson
    }

}