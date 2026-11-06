export class AppController {

    constructor(appState, engine) {
        this.appState = appState
   
        this.engine = engine
    }
     navigate(screen, data = {}) {
        
        this.appState.navigate(screen, data)

        this.engine.context.resetScroll()

        this.emitStateChanged()
    }
    openPlayerSelect(name) {
   
    const user = this.appState.openPlayerSelect(name);

    if (!user) return;

   
    this.engine.context.resetScroll();
    this.emitStateChanged();

    return user;
}

  async openLesson(article) {
    const articleId = article.articleId || article.id

    await this.engine.context.ensureProgressLoaded()

    this.engine.context.getTransitionManager().transition(() => {
        this.engine.context.startLessonFromArticle(article)

        this.engine.context.incrementArticleViews(articleId)

        this.appState.openLesson(articleId)
        this.engine.context.resetScroll()

        this.emitStateChanged()
    })
}
    openLessonBrowser() {
        this.navigate('playerSelect')
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