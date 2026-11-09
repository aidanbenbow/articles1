import { UserService } from "../../../engine/services/userServices.js"
import { createUser, users, saveUsers} from "./users.js"

export class AppState {

    constructor() {
        this.screen = 'home'
        this.articleId = null
        this.activeLessonId = null
        this.selectedCategory = null
        const savedUserId = localStorage.getItem('currentUserId')

this.user = users.find(user => user.id === savedUserId) ?? null
        this.userService = new UserService(users, saveUsers)
       
    }
    login(user) {
        this.user = user
        localStorage.setItem('currentUserId', user.id)
    }
    logout() {
        this.user = null
        localStorage.removeItem('currentUserId')
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
        this.screen = 'playerSelect'
    }
    openCategory(category) {
        this.activeLessonId = null
        this.screen = 'category'
        this.selectedCategory = category
    }
    returnToCategory() {
        this.activeLessonId = null
        this.screen = 'category'
    }
    goHome() {
        this.activeLessonId = null
        this.selectedCategory = null
        this.screen = 'home'
    }
    completeLesson(data) {
       if (!this.user) {
        throw new Error('No user is currently logged in');
    } 
        if (!data.lessonId) {
            throw new Error('No active lesson to complete')
        }
     this.user =   this.userService.completeLesson(this.user.id, data)
   return this.user
    }
}