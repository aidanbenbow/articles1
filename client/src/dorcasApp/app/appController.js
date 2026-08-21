export class AppController {

    constructor(appState, lessonController) {
        this.appState = appState
        this.lessonController = lessonController
    }

    openLesson(articleId, sections) {

        this.appState.openLesson(articleId)

        return this.lessonController.start(
            articleId,
            sections
        )
    }

    goHome() {
        this.appState.goHome()
    }

    getState() {
        return this.appState
    }
}