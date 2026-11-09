import { LessonState } from "../state/lessonState.js"
import { saveLessonProgress } from "../api/lessonProgressApi.js"
export class LessonService {
    constructor(surveyApi, lessonProgressStore,getUserId) {
        this.surveyApi = surveyApi
        this.lessonProgressStore = lessonProgressStore
        this.getUserId = getUserId
        this.lesson = new LessonState()
        this.progressSaveQueue = Promise.resolve()
    }
    startLesson(lessonData) {
        this.lesson = new LessonState(lessonData)
const userId = this.getUserId()
        const savedProgress = userId ? this.lessonProgressStore.get(userId, this.lesson.articleId) : null
      this.lesson.start()
if (savedProgress) {
        this.lesson.restoreProgress(savedProgress)
    } else if (userId) {
        this.lessonProgressStore.update(
            userId,
            this.lesson.articleId,
            {
                status: 'in_progress',
                progressPercent: 0,
                currentActivityId: this.lesson.currentSectionId,
                completedActivityIds: [],
                startedAt: this.lesson.startedAt
            }
            
        )
    }this.syncProgress()
        return this.lesson
    }
    startPhase() {
        this.lesson.startPhase()
        this.syncProgress()
    }
    finishLesson() {
        const current = this.lesson.getCurrentSection()

    if (current) {
        const activity = this.lesson.activities[current.id]

        if (!activity?.isComplete()) {
            console.warn('Cannot finish: current section is incomplete')
            return false
        }

        this.lesson.completeSection(current.id)
    }

    if (!this.lesson.completed) {
        this.lesson.end()
    }

    this.syncProgress()

    return this.lesson.getResults()
    }
   
    syncProgress() {
        const userId = this.getUserId()

if (!userId) {
    console.warn('Cannot save lesson progress: no logged-in user')
    return
}
    if (!this.lesson?.articleId) {
        return
    }

    const progress = this.lesson.getProgress()

        const quizAnswers = {}
         let quizScore = 0

    const surveyResponses = {}
    const orderingAnswers = {}

    for (const [sectionId, activity] of Object.entries(
        this.lesson.activities
    )) {
        if (activity.type === 'quiz') {
            quizAnswers[sectionId] = activity.getAnswers()

            quizScore += activity.getScore()
        }

        if (activity.type === 'survey') {
    const response = activity.getResponse()

    if (response) {
        surveyResponses[sectionId] = {
            response,
            results: activity.getResults()
        }
    }
}

        if (activity.type === 'ordering') {
            orderingAnswers[sectionId] = {
                items: activity.getItems(),
                checked: activity.getChecked(),
                correct: activity.isCorrect(),
                feedback: activity.getFeedback()
            }
        }
        if (activity.type === 'dragdrop') {
    orderingAnswers[sectionId] = {
        answers: activity.getAnswers(),
        wordbank: activity.getWordbank(),
        checked: activity.getChecked(),
        correct: activity.isCorrect(),
        feedback: activity.getFeedback(),
        scoreAwarded: activity.scoreAwarded
    }
}
    }

 const result =   this.lessonProgressStore.update(userId,
        this.lesson.articleId,
        {
            status: this.lesson.completed? 'completed': 'in_progress',

            progressPercent: progress,

            currentActivityId:this.lesson.currentSectionId,

            completedActivityIds:[...this.lesson.completedSections],

            quizAnswers,
            quizScore,
            surveyResponses,
            orderingAnswers,

            completedAt: this.lesson.completed? new Date().toISOString(): null
        }
    )
   this.progressSaveQueue = this.progressSaveQueue
    .then(() => saveLessonProgress(result))
    .catch(error => {
        console.error('Failed to save lesson progress to the server:', error)
    })

return result
}

    getLesson() {
        return this.lesson
    }
    
   setCurrentSection(sectionId) {
    if (!this.lesson)       return 
    this.lesson.setCurrentSection(sectionId)
    this.syncProgress()
}
 
    answerQuiz(sectionId, quizId, optionIndex, correctAnswerIndex) {
const quiz = this.lesson.activities[sectionId]

    if (!quiz) {
        console.warn( `No quiz found for sectionId: ${sectionId}`)
        return
    }
    const result = quiz.answerQuestion(quizId, optionIndex, correctAnswerIndex)
       
    this.syncProgress()

    return {
        result,
        score: quiz.getScore(),
        progress: this.lesson.getProgress(),
        currentSection: this.lesson.currentSectionId,
        total: quiz.getTotalQuestions(),
        complete: quiz.isComplete()
    }
}
      completeSection(sectionId) {
        this.lesson.completeSection(sectionId)
        this.syncProgress()
    }
      async answerSurvey(surveyId, optionIndex) {
        const survey = this.lesson.activities[surveyId]

        if (!survey || survey.type !== 'survey') {
            console.warn(
                `No survey found for surveyId: ${surveyId}`
            )
            return {
                success: false,
                reason: 'survey-not-found'
            }
        }
    const result = survey.answerQuestion(optionIndex)

    if (result.alreadyAnswered) {
        return result
    }

    const results =await this.surveyApi.recordSurveyResponse( surveyId, optionIndex)

    survey.setResults(results)

    this.syncProgress()

    return {
        ...result,
        results
    }
}
    updateCurrentSection(sectionId) {
    this.lesson.setCurrentSection(sectionId)
    this.syncProgress()
}
advanceSection() {
    const moved =this.lesson.advanceSection()
    if (!moved)return {
        success: true,
        completed: false
    }
        this.syncProgress()
    if (this.lesson.completed) {
        const results = this.finishLesson()
        return {
            success: true,
            completed: true,
            results
        }
    }
  return {
        success: true,
        completed: false
    }
  
}
moveOrderingItem( sectionId, itemIndex, direction
) {
    const activity =this.lesson.activities[sectionId]

    if (!activity || activity.type !== 'ordering') {
        return {
            success: false,
            reason: 'activity-not-found-or-not-ordering'
        }
    }

const result = activity.moveItem(itemIndex, direction)

        if (result)   this.syncProgress()
        return result
}
checkOrdering(sectionId) {
    const activity =this.lesson.activities[sectionId]

        const section = this.lesson.sections.find( section => section.id === sectionId)

    if (!activity || !section || activity.type !== 'ordering') {
        return {
            success: false,
            reason: 'activity-not-found-or-not-ordering'
        }
    }

    const result = activity.checkAnswer(section.items)

        this.syncProgress()

        return {
            result,
            feedback: activity.getFeedback()
        }

}
checkDragDrop(sectionId) {
    const activity = this.lesson.activities[sectionId]

    if (!activity || activity.type !== 'dragDrop') {
        return {
            success: false,
            reason: 'activity-not-found-or-not-dragdrop'
        }
    }

    const result = activity.checkAnswers()
      

    this.syncProgress()

    return {
        ...result,
        totalScore: this.lesson.getScoreTotal(),
        progress: this.lesson.getProgress(),
        complete: activity.isComplete(),
        feedback: activity.getFeedback()
    }
}
}