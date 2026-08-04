import { LessonState } from "../state/lessonState.js"

export class LessonService {

    constructor() {
        this.lesson = {
            articleId: null,
            quizAnswers: {},
            quizScore: 0,
            surveyResponses: {},
            completed: false
        }
    }

    startLesson(articleId) {

        this.lesson = new LessonState(articleId)

        return this.lesson
    }

    getLesson() {
        return this.lesson
    }
    answerQuiz(quizId, optionIndex, answer) {

        if (quizId in this.lesson.quizAnswers) {
            return
        }

        const correct = optionIndex === answer

        this.lesson.quizAnswers[quizId] = {
            selected: optionIndex,
            correct
        }

        if (correct) {
            this.lesson.quizScore++
        }
    }
}