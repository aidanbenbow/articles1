
import { initializeLessonProgress, fetchLeaderboard, fetchWeeklyLeaderboard } from "../api/initialiseLessonProgress.js"
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
        this.weeklyLeaderboard = { players: [], weekKey: null, updatedAt: null };
        this.loadedProgressUsers = new Set();
this.progressLoadPromises = new Map();
        this.lessonAnalyticsService = new LessonAnalyticsService(this.lessonProgressStore,{
get articles() {
                return engine.context.getArticles?.() ?? []
            }
        } )
        this.lessonService = new LessonService(
    new SurveyApi(),
    this.lessonProgressStore,
    () => this.engine.context.app?.getState()?.user?.id, () => this.engine.context.app?.getState()?.authService?.getAccessToken()
 )

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
            startLesson: (articleId) => this.lessonController.start(articleId),
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
            getWeeklyLeaderboard: () => this.weeklyLeaderboard,
            loadWeeklyLeaderBoard: () => this.loadWeeklyLeaderboard(),

getPlayerProgress: (userId) =>
    this.lessonProgressStore.getAllForUser(userId),

getPlayerStats: (userId) =>
    this.lessonProgressStore.getPlayerStats(userId),

            startLessonFromArticle: (article) => this.startLessonFromArticle(article),
            moveOrderingItem: (sectionId, itemIndex,direction) =>
    this.lessonController.moveOrderingItem(sectionId,itemIndex,direction),
checkOrdering: (sectionId) => this.lessonController.checkOrdering(sectionId),
checkDragDrop: (sectionId) => this.lessonController.checkDragDrop(sectionId),
ensureProgressLoaded: () => this.ensureProgressLoaded(),
saveAndPauseLesson: () => this.saveAndPauseLesson(),
invalidateProgressForUser: (userId) => this.invalidateProgressForUser(userId),
        }
    }
    startLessonFromArticle(article) {
        const lesson = parseArticle(article)

        this.lessonController.start(lesson)
        return lesson
    }

async ensureProgressLoaded() {
    const userId =
        this.engine.context.app?.getState()?.user?.id;

    if (!userId) {
        console.warn(
            'Cannot load lesson progress: no authenticated learner'
        );
        return;
    }

    // This learner's progress has already been loaded.
    if (this.loadedProgressUsers.has(userId)) {
        return;
    }

    // Avoid duplicate requests for the same learner.
    const existingRequest = this.progressLoadPromises.get(userId);

    if (existingRequest) {
        return existingRequest;
    }

    const loadPromise = (async () => {
        try {
            await initializeLessonProgress(
                this.lessonProgressStore,
                userId
            );
const currentUserId =
    this.engine.context.app?.getState()?.user?.id;

if (currentUserId !== userId) {
    throw new Error(
        "Learner changed while progress was loading"
    );
}
            this.loadedProgressUsers.add(userId);

            try {
                this.leaderboard = await fetchLeaderboard();
                console.log('Leaderboard loaded successfully');
            } catch (error) {
                console.error(
                    'Error loading leaderboard:',
                    error
                );
            }
await this.loadWeeklyLeaderboard();
            console.log(
                `Progress ready for learner ${userId}`
            );
        } catch (error) {
            console.error(
                `Failed to load progress for ${userId}:`,
                error
            );

            // Don't mark this learner as loaded.
            // A later attempt can retry.
            throw error;
        } finally {
            this.progressLoadPromises.delete(userId);
        }
    })();

    this.progressLoadPromises.set(userId, loadPromise);

    return loadPromise;
}
async saveAndPauseLesson() {
    await this.lessonService.saveAndPauseLesson();
}
invalidateProgressForUser(userId) {
    if (!userId) return;

    this.loadedProgressUsers.delete(userId);
}
handleVisibilityChange() {
    const lesson = this.lessonService.lesson;

    if (!lesson || lesson.phase !== 'active') {
        return;
    }

    if (document.visibilityState === 'hidden') {
        lesson.stopActiveSession();
        this.lessonService.syncProgress();
        return;
    }

    if (document.visibilityState === 'visible') {
        lesson.startActiveSession();
    }
}
async loadWeeklyLeaderboard() {
    try {
        this.weeklyLeaderboard = await fetchWeeklyLeaderboard();

        this.engine.emit(
            'appStateChanged',
            this.engine.context.app?.getState()
        );

        return this.weeklyLeaderboard;
    } catch (error) {
        console.error('Failed to load weekly leaderboard:', error);

        this.weeklyLeaderboard = {
            players: [],
            weekKey: null,
            updatedAt: null
        };

        return this.weeklyLeaderboard;
    }
}
}