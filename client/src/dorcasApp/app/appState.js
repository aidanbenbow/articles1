export class AppState {

    constructor() {
        this.screen = 'home'
        this.activeLessonId = null
    }

    openLesson(lessonId) {
        this.activeLessonId = lessonId
        this.screen = 'lesson'
    }

    openLessonBrowser() {
        this.activeLessonId = null
        this.screen = 'lessonBrowser'


    }

    goHome() {
        this.activeLessonId = null
        this.screen = 'home'
    }
}