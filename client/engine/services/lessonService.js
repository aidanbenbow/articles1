import { LessonState } from "../state/lessonState.js"

export class LessonService {

    constructor(surveyApi) {
        this.surveyApi = surveyApi
        this.lesson = new LessonState()
    }

    startLesson(lessonData) {

        this.lesson = new LessonState(lessonData.articleId, lessonData.title, lessonData.sections)

this.lesson.start()
        return this.lesson
    }
    startPhase() {
        this.lesson.startPhase()
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
        
        this.lesson.advanceSection()
        return {
            currentSection: this.lesson.currentSectionId,
            correct,
            score: this.lesson.quizScore,
            progress: this.lesson.getProgress()
        }
    }
      completeSection(sectionId) {

        this.lesson.completeSection(sectionId)

    }
      async answerSurvey(surveyId, optionIndex) {

        // Already answered?
        if (surveyId in this.lesson.surveyResponses) {
            return
        }

        // Remember this user's answer
        this.lesson.surveyResponses[surveyId] = optionIndex

        this.completeSection(surveyId)
        this.lesson.advanceSection()
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
}