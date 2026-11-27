
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
            user.totalActiveTime += Number(record.activeTimeSeconds) || 0;
        user.totalScore += Number(record.totalScore) || 0;
        }

        
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

    // Only records belonging to this lesson.
    const records = await this.lessonProgressRepo.getProgressByLesson(lessonId);
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
const MINIMUM_COHORT_SIZE = 1;
    const MINIMUM_ACTIVITY_SAMPLE = 1;

    if (completed.length < MINIMUM_COHORT_SIZE) {
        return {
            available: false,
            reason: "insufficient_cohort_size",
            lessonId,
            participantCount: participants.length,
            completedCount: completed.length,
            minimumSampleSize: MINIMUM_COHORT_SIZE
        };
    }

    const rawActivityStats =
        this.aggregateActivityAnalytics(completed);
        // Suppress individual activity metrics with small samples.
    const activityStats = {};

    for (const [type, stats] of Object.entries(rawActivityStats)) {
        activityStats[type] =
            stats.attempted >= MINIMUM_ACTIVITY_SAMPLE
                ? stats
                : {
                    attempted: null,
                    correct: null,
                    incorrect: null,
                    accuracy: null,
                    suppressed: true
                };
    }

    const empiricalDifficulty =
        this.calculateEmpiricalDifficulty(activityStats);
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
        available: true,
        lessonId,
         participantCount: participants.length,
        completedCount: completed.length,
        sampleSize: timedRecords.length,
        completionRate,
        activityStats,

        empiricalDifficulty,

        duration: {
            sampleSize: timedRecords.length,
            medianSeconds: medianDurationSeconds,
            estimatedMinutes: medianDurationSeconds
                ? Math.max(
                    1,
                    Math.round(medianDurationSeconds / 60)
                )
                : 0
        },
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

getQuizAnswerEntries(quizAnswers = {}) {
    const entries = [];

    for (const [sectionId, sectionData] of Object.entries(quizAnswers)) {
        if (!sectionData || typeof sectionData !== "object") continue;

        const answerData = sectionData[sectionId];

        if (
            !answerData ||
            typeof answerData !== "object" ||
            typeof answerData.isCorrect !== "boolean"
        ) {
            continue;
        }

        entries.push({
            sectionId,
            isCorrect: answerData.isCorrect
        });
    }

    return entries;
}

aggregateQuizAnalytics(records) {
    let attempted = 0;
    let correct = 0;

    for (const record of records) {
        const answers = this.getQuizAnswerEntries(
            record.quizAnswers
        );

        for (const answer of answers) {
            attempted++;

            if (answer.isCorrect) {
                correct++;
            }
        }
    }

    return {
        attempted,
        correct,
        incorrect: attempted - correct,
        accuracy: attempted
            ? Math.round((correct / attempted) * 100)
            : null
    };
}

aggregateDragDropAnalytics(records) {
    let attempted = 0;
    let correct = 0;

    for (const record of records) {
        const activities = record.dragDropAnswers ?? {};

        for (const activity of Object.values(activities)) {
            if (
                !activity ||
                activity.checked !== true ||
                typeof activity.correctCount !== "number" &&
!Number.isFinite(activity.correctCount)
            ) {
                continue;
            }

            const total = Number(
                activity.totalCount ??
                Object.keys(activity.answers ?? {}).length
            );

            if (!Number.isFinite(total) || total <= 0) continue;

            const activityCorrect = Math.max(
                0,
                Math.min(total, Number(activity.correctCount))
            );

            attempted += total;
            correct += activityCorrect;
        }
    }

    return {
        attempted,
        correct,
        incorrect: attempted - correct,
        accuracy: attempted
            ? Math.round((correct / attempted) * 100)
            : null
    };
}

aggregateOrderingAnalytics(records) {
    let attempted = 0;
    let correct = 0;

    for (const record of records) {
        const activities = record.orderingAnswers ?? {};

        for (const activity of Object.values(activities)) {
            if (
                !activity ||
                activity.checked !== true ||
                typeof activity.correctCount !== "number" &&
!Number.isFinite(activity.correctCount) ||
                typeof activity.totalCount !== "number" &&
!Number.isFinite(activity.totalCount)
            ) {
                continue;
            }

            const total = Number(activity.totalCount);

            if (total <= 0) continue;

            const activityCorrect = Math.max(
                0,
                Math.min(total, Number(activity.correctCount))
            );

            attempted += total;
            correct += activityCorrect;
        }
    }

    return {
        attempted,
        correct,
        incorrect: attempted - correct,
        accuracy: attempted
            ? Math.round((correct / attempted) * 100)
            : null
    };
}

aggregateActivityAnalytics(records) {
    return {
        quiz: this.aggregateQuizAnalytics(records),
        dragdrop: this.aggregateDragDropAnalytics(records),
        ordering: this.aggregateOrderingAnalytics(records)
    };
}

calculateEmpiricalDifficulty(activityStats) {
    const weights = {
        quiz: 0.4,
        dragdrop: 0.3,
        ordering: 0.3
    };

    let weightedError = 0;
    let totalWeight = 0;

    for (const [type, weight] of Object.entries(weights)) {
        const stats = activityStats[type];

        if (
            !stats ||
            stats.accuracy === null ||
            stats.attempted <= 0
        ) {
            continue;
        }

        weightedError += (100 - stats.accuracy) * weight;
        totalWeight += weight;
    }

    if (totalWeight === 0) {
        return {
            score: null,
            label: "unknown"
        };
    }

    const score = Math.round(weightedError / totalWeight);

    return {
        score,
        label:
            score < 30 ? "easy" :
            score < 65 ? "medium" :
            "hard"
    };
}

}
