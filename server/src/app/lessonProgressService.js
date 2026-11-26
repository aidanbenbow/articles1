
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

getMedian(values) {
    if (!values.length) return 0;

    const sorted = [...values].sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);

    return sorted.length % 2
        ? sorted[middle]
        : Math.round(
            (sorted[middle - 1] + sorted[middle]) / 2
        );
}

async getLessonAnalytics(lessonId) {
    if (
        typeof lessonId !== "string" ||
        !lessonId.trim() ||
        lessonId.length > 200
    ) {
        throw new Error("A valid lessonId is required");
    }

    const allRecords =
        await this.lessonProgressRepo.getAllProgress();

    // Only records belonging to this lesson.
    const records = allRecords.filter(
        record => record.lessonId === lessonId
    );
 // Learners who actually participated.
    const participants = records.filter(
        record =>
            record.status === "in_progress" ||
            record.status === "completed"
    );
     // Learners who completed the lesson.
    const completed = participants.filter(
        record => record.status === "completed"
    );

    // Completed records with valid recorded active time.
    const timedRecords = completed.filter(
        record =>
            Number.isFinite(Number(record.activeTimeSeconds)) &&
            Number(record.activeTimeSeconds) > 0
    );

    const durations = timedRecords.map(
        record => Number(record.activeTimeSeconds)
    );

    const medianDurationSeconds =
        this.getMedian(durations);

    const completionRate = participants.length
    ? Math.round(
        (completed.length / participants.length) * 100
    )
    : 0

    return {
        lessonId,
         participantCount: participants.length,
        completedCount: completed.length,
        sampleSize: timedRecords.length,
        completionRate,
        medianDurationSeconds,
        estimatedDurationMinutes:
            medianDurationSeconds
                ? Math.max(
                    1,
                    Math.round(medianDurationSeconds / 60)
                )
                : 0,
        updatedAt: new Date().toISOString()
    };
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
        if (!userId || !lessonId) {
        throw new Error(
            'Both userId and lessonId are required'
        )
    }
        return this.lessonProgressRepo.deleteProgress(
            userId,
            lessonId
        );
    }
}
