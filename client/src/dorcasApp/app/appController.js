export class AppController {

    constructor(appState, engine) {
        this.appState = appState
   
        this.engine = engine
    }

   openLesson(article) {

    const articleId =
        article.articleId ||
        article.id

    this.engine.context
        .startLessonFromArticle(article)

        this.engine.context.incrementArticleViews(articleId)

    this.appState.openLesson(
        articleId
    )
    this.engine.context.resetScroll()

    this.emitStateChanged()
}
    openLessonBrowser() {
        this.appState.openLessonBrowser()
        this.engine.context.resetScroll()
        this.emitStateChanged()
    }

    goHome() {
        this.appState.goHome()
        this.engine.context.resetScroll()
        this.emitStateChanged()
    }

    getState() {
        return this.appState
    }
    emitStateChanged() {
        this.engine.emit('appStateChanged', this.appState)
    }
}