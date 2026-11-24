import { AppController } from "./appController.js"
import { AppState } from "./appState.js"

export class AppFeature {

    constructor(engine) {
        this.engine = engine

        this.appState = new AppState()
        // this.engine.on('lessonCompleted', (data) => {
        //    this.appState.completeLesson(data)
        // })

        this.appController =  new AppController(  this.appState,  engine)
    }

    contextExports() {
        return {
            app: {
                getState: () => this.appController.getState(),
                navigate: (screen,data) => this.appController.navigate(screen,data),
                 initializeAuth: () =>
                this.appController.initializeAuth(),

            register: (email, password) =>
                this.appController.register(email, password),

            verifyEmail: (email, code) =>
                this.appController.verifyEmail(email, code),

            login: (email, password) =>
                this.appController.login(email, password),

            logout: () =>
                this.appController.logout(),

                openCategory: (category) => this.appController.openCategory(category),
                openLesson: article =>
                this.appController.openLesson(article),

openLessonBrowser: () => this.appController.openLessonBrowser(),
openAnalytics: async () => {
    await this.engine.context.ensureProgressLoaded();
    this.appController.navigate('analytics');
},
returnToCategory: () => this.appController.returnToCategory(),
                goHome: () => this.appController.goHome()
            }
        }
    }
}