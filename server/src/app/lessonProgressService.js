
export class LessonProgressService {
    constructor(lessonProgressRepo, userRepository=null) {
        this.lessonProgressRepo = lessonProgressRepo;
        this.userRepository = userRepository;
    }

    getProgress(userId) {
         if (!userId) {
            throw new Error("A userId is required");
        }
        return this.lessonProgressRepo.getProgress(userId);
    }
async refreshLeaderboard() {
    const records = await this.lessonProgressRepo.getAllProgress();

    const users = new Map();

    for (const record of records) {
        const userId = record.userId;

        if (!userId) continue;

        if (!users.has(userId)) {
            users.set(userId, {
                userId,
                completedLessons: 0,
                totalActiveTime: 0,
                totalScore: 0
            });
        }

        const user = users.get(userId);

        if (record.status === 'completed') {
            user.completedLessons += 1;
        }

        user.totalActiveTime += Number(record.activeTimeSeconds) || 0;
        user.totalScore += Number(record.totalScore) || 0;
    }

    // Add display names from learner profiles, if available.
        const leaderboard = await Promise.all(
            [...users.values()].map(async user => {
                let displayName = user.name || user.displayName || "Learner";

                if (this.userRepository) {
                    try {
                        const profile =
                            await this.userRepository.getProfile(user.userId);

                        displayName =
                            profile?.displayName || "Learner";
                    } catch (error) {
                        console.error(
                            "Could not retrieve leaderboard profile:",
                            error.message
                        );
                    }
                }

                return {
                    displayName,
                    completedLessons: user.completedLessons,
                    totalActiveTime: user.totalActiveTime,
                    totalScore: user.totalScore
                };
            })
        );

        leaderboard.sort((a, b) =>
            b.completedLessons - a.completedLessons ||
            b.totalScore - a.totalScore ||
            b.totalActiveTime - a.totalActiveTime
        );

    return this.lessonProgressRepo.saveLeaderboard(leaderboard);
}

async getLeaderboard() {
    return this.lessonProgressRepo.getLeaderboardSnapshot();
}

async refreshWeeklyLeaderboard() {
        // Calculate this week's scores
        const weeklyData =
            await this.lessonProgressRepo
                .calculateWeeklyLeaderboard();

        // Add learner display names
        const players = await Promise.all(
            weeklyData.players.map(async player => {
                let displayName = "Learner";

                if (this.userRepository) {
                    try {
                        const profile =
                            await this.userRepository.getProfile(
                                player.userId
                            );

                        displayName =
                            profile?.displayName || "Learner";
                    } catch (error) {
                        console.error(
                            "Could not retrieve weekly leaderboard profile:",
                            error.message
                        );
                    }
                }

                return {
                    ...player,
                    displayName
                };
            })
        );

        // Save weekly rankings
        return this.lessonProgressRepo.saveWeeklyLeaderboard({
            ...weeklyData,
            players
        });
    }

    async getWeeklyLeaderboard() {
        const week =
            this.lessonProgressRepo.getWeekInfo();

        // Retrieve saved rankings for this week
        const snapshot =
            await this.lessonProgressRepo
                .getWeeklyLeaderboardSnapshot(week.weekKey);

        // Create the first snapshot if one doesn't exist
        if (snapshot) {
            return snapshot;
        }

        return this.refreshWeeklyLeaderboard();
    }
    saveProgress(progress) {
        if (!progress?.userId || !progress?.lessonId) {
            throw new Error(
                "Both userId and lessonId are required"
            );
        }
        return this.lessonProgressRepo.saveProgress(progress);
    }

    deleteProgress(userId, lessonId) {
        if (!progress?.userId || !progress?.lessonId) {
            throw new Error(
                "Both userId and lessonId are required"
            );
        }
        return this.lessonProgressRepo.deleteProgress(
            userId,
            lessonId
        );
    }
}
