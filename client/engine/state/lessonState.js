export class LessonState {

    constructor(articleId) {

        this.articleId = articleId

        this.quizAnswers = {}
        this.quizScore = 0

        this.surveyResponses = {}

        this.completed = false
    }

}