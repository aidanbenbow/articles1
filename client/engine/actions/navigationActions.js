export class NavigationActions {

    constructor(engine) {
        this.engine = engine

        this.handlers = {
            openLesson: node => this.openLesson(node),
            openCategory: node => this.openCategory(node),
            returnToCategory: () => this.returnToCategory(),
            openAnalytics: () => this.openAnalytics(),
            browseLessons: () => this.browseLessons(),
            goHome: () => this.goHome(),
            // Authentication navigation
            showRegister: () => this.showRegister(),
            showLogin: () => this.showLogin(),

            // Cognito authentication
            register: () => this.register(),
            verifyEmail: () => this.verifyEmail(),
            login: () => this.login(),
            logout: () => this.logout(),
        }
    }
   getInteractionState() {
        return this.engine.context
            .getInteractionManager()
            ?.getInteractionState() ?? {};
    }

    getApp() {
        return this.engine.context.app;
    }

    showRegister() {
        this.getApp()?.navigate('register');
    }

    showLogin() {
        this.getApp()?.navigate('login');
    }

    async register() {
        const { email, password } = this.getInteractionState();
        const app = this.getApp();

        if (!email?.trim() || !password) {
            console.warn('Please enter your email and password.');
            return;
        }

        try {
            const result = await app.register(email, password);

            if (result?.nextStep?.signUpStep === 'CONFIRM_SIGN_UP') {
                app.navigate('verifyEmail');
            } else {
                console.log('Registration result:', result);
            }

            return result;
        } catch (error) {
            console.error('Registration failed:', error);
        }
    }

    async verifyEmail() {
        const { email, confirmationCode } = this.getInteractionState();
        const app = this.getApp();

        if (!email?.trim() || !confirmationCode?.trim()) {
            console.warn('Please enter your email and verification code.');
            return;
        }

        try {
            const result = await app.verifyEmail(email, confirmationCode);

            if (result?.isSignUpComplete) {
                app.navigate('login');
            }

            return result;
        } catch (error) {
            console.error('Email verification failed:', error);
        }
    }

    async login() {
        const { email, password } = this.getInteractionState();
        const app = this.getApp();

        if (!email?.trim() || !password) {
            console.warn('Please enter your email and password.');
            return;
        }

        try {
            const result = await app.login(email, password);

            if (result?.isSignedIn) {
                app.goHome();
            } else {
                console.log('Additional sign-in step required:', result?.nextStep);
            }

            return result;
        } catch (error) {
            console.error('Login failed:', error);
        }
    }

    async logout() {
        try {
            await this.getApp()?.logout();
            this.goHome();
        } catch (error) {
            console.error('Logout failed:', error);
        }
    }
openCategory(node) {
   
    this.engine.context.app.openCategory(node.category);
}
openAnalytics() {
    this.engine.context.app.openAnalytics();
}
returnToCategory() {
    this.engine.context.app.returnToCategory();
}
    openLesson(node) {
        const article = this.engine.context.getArticleById(node.articleId) || node
        if (!article) {
            console.log('No article found for node', node)
            return
        }
        this.engine.context.app.openLesson( article)
    }

    browseLessons() {
        this.engine.context.app.openLessonBrowser()
    }

    goHome() {
        this.engine.context.app.goHome()
    }
}