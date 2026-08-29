

import { LessonState } from "../state/lessonState.js"

export class LessonService {

    constructor(surveyApi, lessonProgressStore) {
        this.surveyApi = surveyApi
        this.lessonProgressStore = lessonProgressStore
        this.lesson = new LessonState()

    }

    startLesson(lessonData) {

        this.lesson = new LessonState(lessonData)

        const savedProgress = this.lessonProgressStore.get(
            this.lesson.articleId
        )
      
        if( savedProgress) {
            this.lesson.restoreProgress(savedProgress)
        } else {
this.lesson.start()

  this.lessonProgressStore.update(
        this.lesson.articleId,
        {
            status: 'in_progress',
            progressPercent: 0,
            currentActivityId:
                this.lesson.currentSectionId,
            startedAt:
                this.lesson.startedAt
        }
    )
}
        return this.lesson
    }
    startPhase() {
        this.lesson.startPhase()
        this.syncProgress()
    }
    finishLesson() {
        this.lesson.end()
        this.syncProgress()
    }
    syncProgress() {

    if (!this.lesson?.articleId) {
        return
    }

    const progress =
        this.lesson.getProgress()

        const quizAnswers = {}
    let quizScore = 0

    const surveyResponses = {}
    const orderingAnswers = {}

    for (const [sectionId, activity] of Object.entries(
        this.lesson.activities
    )) {
        if (activity.type === 'quiz') {
            Object.assign(
                quizAnswers,
                activity.getAnswers()
            )

            quizScore += activity.getScore()
        }

        if (activity.type === 'survey') {
            const response = activity.getResponse()

            if (response) {
                surveyResponses[sectionId] = response
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
    }

 const result =   this.lessonProgressStore.update(
        this.lesson.articleId,
        {
            status:
                this.lesson.completed
                    ? 'completed'
                    : 'in_progress',

            progressPercent:
                progress,

            currentActivityId:
                this.lesson.currentSectionId,

            completedActivityIds:
                [...this.lesson.completedSections],

            quizAnswers,
            quizScore,
            surveyResponses,
            orderingAnswers,

            completedAt:
                this.lesson.completed
                    ? new Date().toISOString()
                    : null
        }
    )
     console.log(
        'PROGRESS UPDATED:',
        result
    )
    
}

    getLesson() {
        return this.lesson
    }
    
   setCurrentSection(sectionId) {

    if (!this.lesson) {
        return
    }

    this.lesson.setCurrentSection(sectionId)

}
 
    answerQuiz(sectionId, quizId, optionIndex, answer) {
    const result = this.lesson.answerQuiz(sectionId,quizId,optionIndex,answer)
console.log(
    'ANSWER QUIZ RESULT:',
    result
)
    this.syncProgress()

    return result
}
      completeSection(sectionId) {
// LessonService
        this.lesson.completeSection(sectionId)
        this.syncProgress()

    }
      async answerSurvey(surveyId, optionIndex) {
    const result = this.lesson.answerSurvey(
        surveyId,
        optionIndex
    )

    if (result.alreadyAnswered) {
        return result
    }

    const results =
        await this.surveyApi.recordSurveyResponse(
            surveyId,
            optionIndex
        )

    this.lesson.setSurveyResults(
        surveyId,
        results
    )

    this.syncProgress()

    return {
        ...result,
        results
    }
}
    updateCurrentSection(sectionId) {

    this.lesson.setCurrentSection(sectionId)

}
advanceSection() {

    const moved =
        this.lesson.advanceSection()

    if (moved) {
        this.syncProgress()
    }

    return moved
}
moveOrderingItem(
    sectionId,
    itemIndex,
    direction
) {
    const result =
        this.lesson.moveOrderingItem(
            sectionId,
            itemIndex,
            direction
        )

    this.syncProgress()

    return result
}
checkOrdering(sectionId) {
    const result =
        this.lesson.checkOrdering(sectionId)

    this.syncProgress()

    return result
}
}