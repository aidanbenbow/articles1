import { AppController } from "./appController.js"
import { AppState } from "./appState.js"

export class AppFeature {

    constructor(engine) {
        this.engine = engine

        this.appState =
            new AppState()

        this.appController =
            new AppController(
                this.appState,
                engine
            )
    }

    contextExports() {
        return {
            app: {
                getState: () =>
                    this.appController.getState(),

                openLesson: (articleId) =>
                    this.appController.openLesson(
                        articleId
                    ),
openLessonBrowser: () =>
                    this.appController.openLessonBrowser(),

                goHome: () =>
                    this.appController.goHome()
            }
        }
    }
}