import { UserService } from "../../../engine/services/userServices.js"
import { users } from "./users.js"

export class AppState {

    constructor() {
        this.screen = 'home'
        this.activeLessonId = null
        this.user = null
        this.userService = new UserService()
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
    completeLesson(data) {
        
        if (!data.lessonId) {
            throw new Error('No active lesson to complete')
        }
        console.log(this.user)
     this.user =   this.userService.completeLesson(this.user.id, data.lessonId, data.score)
     console.log(this.user)
        this.goHome()
    }
}