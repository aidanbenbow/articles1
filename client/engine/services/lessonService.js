

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
        console.log('Saved progress:', savedProgress)
        console.log('Starting lesson with data:', this.lesson)

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

            quizAnswers:
                { ...this.lesson.quizAnswers },

            quizScore:
                this.lesson.quizScore,

            surveyResponses:
                { ...this.lesson.surveyResponses },

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
    const result = this.lesson.answerQuiz(
        sectionId,
        quizId,
        optionIndex,
        answer
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
}