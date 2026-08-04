import { LessonState } from "../state/lessonState.js"

export class LessonService {

    constructor(surveyApi) {
        this.surveyApi = surveyApi
        this.lesson = new LessonState()
    }

    startLesson(articleId, sections) {

        this.lesson = new LessonState(articleId, sections)


        return this.lesson
    }

    getLesson() {
        return this.lesson
    }
    answerQuiz(quizId, optionIndex, answer) {

        if (quizId in this.lesson.quizAnswers) {
            return this.lesson.quizAnswers[quizId]
        }

        const correct = optionIndex === answer

        this.lesson.quizAnswers[quizId] = {
            selected: optionIndex,
            correctAnswer: answer,
            correct
        }

        if (correct) {
            this.lesson.quizScore++
        }
        return {
            correct,
            score: this.lesson.quizScore
        }
    }
      async answerSurvey(surveyId, optionIndex) {

        // Already answered?
        if (surveyId in this.lesson.surveyResponses) {
            return
        }

        // Remember this user's answer
        this.lesson.surveyResponses[surveyId] = optionIndex

        // Save to server
        const results =
            await this.surveyApi.recordSurveyResponse(
                surveyId,
                optionIndex
            )

        // Cache updated totals
        this.lesson.surveyResults[surveyId] = results
    }
    completeSection(sectionId) {

    if (
        !this.lesson.completedSections.includes(sectionId)
    ) {
        this.lesson.completedSections.push(sectionId)
    }

}
}