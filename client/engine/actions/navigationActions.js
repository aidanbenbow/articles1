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
        this.engine.context.app.openLesson(
            node.articleData || node
        )
    }

    browseLessons() {
        this.engine.context.app.openLessonBrowser()
    }

    goHome() {
        this.engine.context.app.goHome()
    }
}