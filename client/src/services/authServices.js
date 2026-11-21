
import {
    signUp,
    confirmSignUp,
    signIn,
    signOut,
    getCurrentUser,
    fetchAuthSession
} from 'aws-amplify/auth';

export class AuthService {

    async register(email, password) {
        const result = await signUp({
            username: email.trim().toLowerCase(),
            password,
            options: {
                userAttributes: {
                    email: email.trim().toLowerCase()
                }
            }
        });

        return result;
    }

    async verifyEmail(email, confirmationCode) {
        const result = await confirmSignUp({
            username: email.trim().toLowerCase(),
            confirmationCode: confirmationCode.trim()
        });

        return result;
    }

    async login(email, password) {
        const result = await signIn({
            username: email.trim().toLowerCase(),
            password
        });

        return result;
    }

    async logout() {
        await signOut();
    }

    async getAuthenticatedUser() {
        return getCurrentUser();
    }

    async getAccessToken() {
        const session = await fetchAuthSession();

        return session.tokens?.accessToken?.toString() ?? null;
    }

    async getIdToken() {
        const session = await fetchAuthSession();

        return session.tokens?.idToken?.toString() ?? null;
    }

    async isAuthenticated() {
        try {
            await getCurrentUser();
            return true;
        } catch {
            return false;
        }
    }
}
