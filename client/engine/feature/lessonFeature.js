
import { initializeLessonProgress, fetchLeaderboard } from "../api/initialiseLessonProgress.js"
import { parseArticle } from "../constants/layoutParser.js"
import { LessonController } from "../controllers/lessonController.js"
import { SurveyApi } from "../api/surveyApi.js"
import { LessonService } from "../services/lessonService.js"
import { LessonProgressStore } from "../state/lessonProgressStore.js"
import { LessonAnalyticsService } from "../services/lessonAnalyticsService.js"



export class LessonFeature {

    constructor(engine) {
        this.engine = engine
        
        this.lessonProgressStore = new LessonProgressStore()
        this.leaderboard = { players: [], updatedAt: null };
        this.lessonAnalyticsService = new LessonAnalyticsService(this.lessonProgressStore,{
get articles() {
                return engine.context.getArticles?.() ?? []
            }
        } )
        this.lessonService = new LessonService(
    new SurveyApi(),
    this.lessonProgressStore,
    () => this.engine.context.app?.getState()?.user?.id )

        this.lessonController = new LessonController(this.lessonService, engine)
        this.handleVisibilityChange = this.handleVisibilityChange.bind(this) 
    }
    async attach() {
   document.addEventListener('visibilitychange', this.handleVisibilityChange)
    
    }
    detach() {
    document.removeEventListener(
        'visibilitychange',
        this.handleVisibilityChange
    )
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
            getLessonAnalyticsService: () => this.lessonAnalyticsService,
            getLeaderboard: () => this.leaderboard,
            startLessonFromArticle: (article) => this.startLessonFromArticle(article),
            moveOrderingItem: (sectionId, itemIndex,direction) =>
    this.lessonController.moveOrderingItem(sectionId,itemIndex,direction),
checkOrdering: (sectionId) => this.lessonController.checkOrdering(sectionId),
checkDragDrop: (sectionId) => this.lessonController.checkDragDrop(sectionId),
ensureProgressLoaded: () => this.ensureProgressLoaded()
        }
    }
    startLessonFromArticle(article) {
        const lesson = parseArticle(article)

        this.lessonController.start(lesson)
        return lesson
    }
async ensureProgressLoaded() {
    const userId = this.engine.context.app?.getState()?.user?.id

    if (!userId) {
        console.warn('Cannot load lesson progress: no selected user')
        return
    }

    await initializeLessonProgress(this.lessonProgressStore, userId)
    try {
    this.leaderboard = await fetchLeaderboard();
    console.log('Leaderboard loaded successfully');
} catch (error) {
    console.error('Error loading leaderboard:', error);
}
}
handleVisibilityChange() {
    const lesson = this.lessonService.lesson
    if(!lesson||lesson.phase !== 'active') return

if(document.visibilityState === 'hidden') {
        lesson.stopActiveSession()
        this.lessonService.syncProgress()
    } else {
        lesson.startActiveSession()
    }
}
}