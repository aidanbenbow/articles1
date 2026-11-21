export class AppController {

    constructor(appState, engine) {
        this.appState = appState
   
        this.engine = engine
    }
    async initializeAuth() {
        try {
            const user = await this.appState.initializeAuth();

            if (user) {
                await this.engine.context.ensureProgressLoaded();
            }

            this.emitStateChanged();
            return user;
        } catch (error) {
            console.error('Authentication initialization failed:', error);
            this.emitStateChanged();
            return null;
        }
    }

    async register(email, password) {
        const result = await this.appState.register(email, password);
        this.emitStateChanged();
        return result;
    }

    async verifyEmail(email, code) {
        const result = await this.appState.verifyEmail(email, code);
        this.emitStateChanged();
        return result;
    }

    async login(email, password) {
        const result = await this.appState.login(email, password);

        if (result.isSignedIn && this.appState.user) {
            await this.engine.context.ensureProgressLoaded();
        }

        this.emitStateChanged();
        return result;
    }

    async logout() {
        const userId = this.appState.user?.id;
         try {
        // Save the current learner's lesson before signing out.
        await this.engine.context.saveAndPauseLesson();

        // Only sign out after the save succeeds.
        await this.appState.logout();
this.engine.context.invalidateProgressForUser(userId);
        this.emitStateChanged();
    } catch (error) {
        console.error('Logout could not complete:', error);

        // Keep the learner signed in if saving failed.
        throw error;
    }
    }
     navigate(screen, data = {}) {
        
        this.appState.navigate(screen, data)

        this.engine.context.resetScroll()

        this.emitStateChanged()
    }


  async openLesson(article) {
    const articleId = article.articleId || article.id

    await this.engine.context.ensureProgressLoaded()
await this.engine.context.saveAndPauseLesson();
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
    openCategory(category) {
        this.appState.openCategory(category)
        this.engine.context.resetScroll()
        this.emitStateChanged()
    }

    returnToCategory() {
        this.appState.returnToCategory()
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