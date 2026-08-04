export class LessonController {

    constructor(lessonService) {
        this.lessonService = lessonService
    }


    start(articleId, sections) {

        return this.lessonService.startLesson(articleId, sections)

    }


    answerQuiz(
        quizId,
        optionIndex,
        answer
    ) {

        this.lessonService.answerQuiz(
            quizId,
            optionIndex,
            answer
        )

    }


    async answerSurvey(
        surveyId,
        optionIndex
    ) {

        return await this.lessonService.answerSurvey(
            surveyId,
            optionIndex
        )

    }


    completeSection(sectionId) {

        this.lessonService.completeSection(
            sectionId
        )

    }


    getState() {

        return this.lessonService.getLesson()

    }

}