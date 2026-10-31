export class NavigationActions {

    constructor(engine) {
        this.engine = engine

        this.handlers = {
            openLesson: node => this.openLesson(node),
            browseLessons: () => this.browseLessons(),
            goHome: () => this.goHome(),
            openPlayerSelect: node => this.openPlayerSelect(node),
        }
    }
    openPlayerSelect(node) {
        this.engine.context.app.openPlayerSelect()
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