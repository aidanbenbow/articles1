import { users } from "./users.js"

export class AppState {

    constructor() {
        this.screen = 'home'
        this.activeLessonId = null
        this.user = null
        this.login(users[0]) 
    }
    login(user) {
        this.user = user
    }
    logout() {
        this.user = null
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