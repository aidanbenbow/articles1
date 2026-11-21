
export class UserService {

    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async getOrCreateProfile(userId) {
       if (!userId) {
            throw new Error("A userId is required");
        }

        const existing =
            await this.userRepository.getProfile(userId);

        if (existing) {
            return existing;
        }

        return this.userRepository.createProfile(userId, {
            displayName: "Learner"
        });
    }

    async getProfile(userId) {
        return this.userRepository.getProfile(userId);
    }
}
