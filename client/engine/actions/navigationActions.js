export class NavigationActions {

    constructor(engine) {
        this.engine = engine

        this.handlers = {
            openLesson: node => this.openLesson(node),
            openCategory: node => this.openCategory(node),
            returnToCategory: () => this.returnToCategory(),
            openAnalytics: () => this.openAnalytics(),
            browseLessons: () => this.browseLessons(),
            goHome: () => this.goHome(),
            openPlayerSelect: node => this.openPlayerSelect(node),
        }
    }
    openPlayerSelect(node) {
    

    const nameNode = this.engine.context.getNode?.('name');
    //const playerName = nameNode?.value?.trim();
const playerName = this.engine.context.getInteractionManager()?.getInteractionState()?.playerName?.trim();
    

    const app = this.engine.context.app;

    if (!playerName) {
        console.warn('Please enter your name first');
        return;
    }

    if (typeof app?.openPlayerSelect !== 'function') {
        console.error('openPlayerSelect is not available on app');
        return;
    }

    app.openPlayerSelect(playerName);

}
openCategory(node) {
   
    this.engine.context.app.openCategory(node.category);
}
openAnalytics() {
    this.engine.context.app.openAnalytics();
}
returnToCategory() {
    this.engine.context.app.returnToCategory();
}
    openLesson(node) {
        const article = this.engine.context.getArticleById(node.articleId) || node
        if (!article) {
            console.log('No article found for node', node)
            return
        }
        this.engine.context.app.openLesson( article)
    }

    browseLessons() {
        this.engine.context.app.openLessonBrowser()
    }

    goHome() {
        this.engine.context.app.goHome()
    }
}