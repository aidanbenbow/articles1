export class AppController {

    constructor(appState, engine) {
        this.appState = appState
   
        this.engine = engine
    }

    openLesson(articleId, sections) {

        this.appState.openLesson(articleId)
        this.emitStateChanged()


    }
    openLessonBrowser() {
        this.appState.openLessonBrowser()
        this.emitStateChanged()
    }

    goHome() {
        this.appState.goHome()
        this.emitStateChanged()
    }

    getState() {
        return this.appState
    }
    emitStateChanged() {
        this.engine.emit('appStateChanged', this.appState)
    }
}