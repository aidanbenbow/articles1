import { AppController } from "./appController.js"
import { AppState } from "./appState.js"

export class AppFeature {

    constructor(engine) {
        this.engine = engine

        this.appState = new AppState()
        this.engine.on('lessonCompleted', (data) => {
           this.appState.completeLesson(data)
        })

        this.appController =  new AppController(  this.appState,  engine)
    }

    contextExports() {
        return {
            app: {
                getState: () => this.appController.getState(),
                openPlayerSelect: (name) => this.appController.openPlayerSelect(name),
                openCategory: (category) => this.appController.openCategory(category),
                openLesson: (articleId) =>this.appController.openLesson(   articleId ),
openLessonBrowser: () => this.appController.openLessonBrowser(),
openAnalytics: () => this.appController.navigate('analytics'),
returnToCategory: () => this.appController.returnToCategory(),
                goHome: () => this.appController.goHome()
            }
        }
    }
}