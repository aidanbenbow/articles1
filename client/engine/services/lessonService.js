

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

        if (quizId in this.lesson.quizAnswers) {
            return this.lesson.quizAnswers[quizId]
        }


        const correct = optionIndex === answer

        this.lesson.quizAnswers[quizId] = {
            selected: optionIndex,
            correctAnswer: answer,
            correct
        }

        this.completeSection(sectionId)
     
        if (correct) {
            this.lesson.quizScore++
        }
        
      
        return {
            currentSection: this.lesson.currentSectionId,
            correct,
            score: this.lesson.quizScore,
            progress: this.lesson.getProgress()
        }
    }
      completeSection(sectionId) {
// LessonService

        this.lesson.completeSection(sectionId)
        this.syncProgress()

    }
      async answerSurvey(surveyId, optionIndex) {

        // Already answered?
        if (surveyId in this.lesson.surveyResponses) {
            return
        }

        // Remember this user's answer
        this.lesson.surveyResponses[surveyId] = optionIndex

        this.completeSection(surveyId)
       
        // Save to server
        const results =
            await this.surveyApi.recordSurveyResponse(
                surveyId,
                optionIndex
            )

        // Cache updated totals
        this.lesson.surveyResults[surveyId] = results
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