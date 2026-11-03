import { UserService } from "../../../engine/services/userServices.js"
import { createUser, users } from "./users.js"

export class AppState {

    constructor() {
        this.screen = 'home'
        this.articleId = null
        this.activeLessonId = null
        this.user = null
        this.userService = new UserService()
       // this.login(users[0]) 
    }
    login(user) {
        this.user = user
        console.log(`User ${user.name} logged in`)
        console.log(`Current user:`, this.user)
    }
    logout() {
        this.user = null
    }
     navigate(screen, data = {}) {
        this.screen = screen

        if ('articleId' in data) {
            this.articleId = data.articleId
        }
    }
    openPlayerSelect(name) {
        
        if (!name?.trim()) {
        console.warn("Please enter your name first");
        return;
    }

    const user = createUser(name);

    this.login(user);

    this.navigate("playerSelect");

    return user;
    
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