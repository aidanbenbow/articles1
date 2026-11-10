
export class LessonProgressService {
    constructor(lessonProgressRepo) {
        this.lessonProgressRepo = lessonProgressRepo;
    }

    getProgress(userId) {
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

    const leaderboard = [...users.values()].sort((a, b) =>
        b.completedLessons - a.completedLessons ||
        b.totalActiveTime - a.totalActiveTime
    );

    return this.lessonProgressRepo.saveLeaderboard(leaderboard);
}

async getLeaderboard() {
    return this.lessonProgressRepo.getLeaderboardSnapshot();
}
    saveProgress(progress) {
        return this.lessonProgressRepo.saveProgress(progress);
    }

    deleteProgress(userId, lessonId) {
        return this.lessonProgressRepo.deleteProgress(
            userId,
            lessonId
        );
    }
}
