
import { AuthService } from "../../services/authServices.js"

export class AppState {

    constructor() {
        this.screen = 'home'
        this.articleId = null
        this.activeLessonId = null
        this.selectedCategory = null

        this.user = null
       this.authLoading = false;
        this.authError = null;
this.registrationEmail = null;
        this.authService = new AuthService();
       
    }
    async loadProfile() {
        const token = await this.authService.getAccessToken();

        if (!token) {
            throw new Error("No authenticated session found");
        }

        const response = await fetch('/api/users/me', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(
                `Failed to load learner profile: ${response.status}`
            );
        }

        const profile = await response.json();
console.log('PROFILE FROM API:', profile);
        // Keep the existing app's user.id convention.
        this.user = {
            ...profile,
            id: profile.userId
        };

        return this.user;
    }

    async initializeAuth() {
        this.authLoading = true;
        this.authError = null;

        try {
            const authenticated =
                await this.authService.isAuthenticated();

            if (!authenticated) {
                this.user = null;
                return null;
            }

            return await this.loadProfile();
        } catch (error) {
            this.user = null;
            this.authError = error.message;
            throw error;
        } finally {
            this.authLoading = false;
        }
    }

    async register(email, password) {
        this.authError = null;

        try {
            const result = await this.authService.register(email, password);
            this.registrationEmail = email;
            return result;
        } catch (error) {
            this.authError = error.message;
            throw error;
        }
    }

    async verifyEmail(email, confirmationCode) {
        this.authError = null;

        try {
            return await this.authService.verifyEmail(
                email,
                confirmationCode
            );
        } catch (error) {
            this.authError = error.message;
            throw error;
        }
    }
async resendVerificationCode(email) {
    this.authError = null;

    try {
        return await this.authService.resendVerificationCode(email);
    } catch (error) {
        this.authError = error.message;
        throw error;
    }
}
    async login(email, password) {
        this.authError = null;

        try {
            const result = await this.authService.login(email, password);

            // Cognito may require another step before sign-in completes.
            if (!result.isSignedIn) {
                return result;
            }

            await this.loadProfile();

            return {
                ...result,
                user: this.user
            };
        } catch (error) {
            this.user = null;
            this.authError = error.message;
            throw error;
        }
    }

    async logout() {
        try {
            await this.authService.logout();
        } finally {
            this.user = null;
            this.activeLessonId = null;
            this.articleId = null;
            this.selectedCategory = null;
            this.authError = null;
            this.screen = 'home';
        }
    }
     navigate(screen, data = {}) {
        this.screen = screen

        if ('articleId' in data) {
            this.articleId = data.articleId
        }
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
//     completeLesson(data) {
//        if (!this.user) {
//         throw new Error('No user is currently logged in');
//     } 
//         if (!data.lessonId) {
//             throw new Error('No active lesson to complete')
//         }
//      this.user =   this.userService.completeLesson(this.user.id, data)
//    return this.user
//     }
}