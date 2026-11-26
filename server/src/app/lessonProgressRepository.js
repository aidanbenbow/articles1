
import {
    PutCommand,
    ScanCommand,
    QueryCommand,
    DeleteCommand,
  GetCommand
} from "@aws-sdk/lib-dynamodb";

export class LessonProgressRepository {
    constructor(docClient) {
        this.docClient = docClient;
        this.tableName =
            process.env.DYNAMODB_TABLE || "LearningApp";
    }
validateIds(userId, lessonId = null) {
        if (
            typeof userId !== "string" ||
            !userId.trim()
        ) {
            throw new Error("A valid userId is required");
        }

        if (
            lessonId !== null &&
            (
                typeof lessonId !== "string" ||
                !lessonId.trim() ||
                lessonId.length > 200
            )
        ) {
            throw new Error("A valid lessonId is required");
        }
    }
    // Retrieve all lesson progress for one learner
    async getProgress(userId) {
        this.validateIds(userId);

        const items = [];
        let ExclusiveStartKey;

        do {
            const result = await this.docClient.send(
                new QueryCommand({
                    TableName: this.tableName,

                    KeyConditionExpression:
                        "PK = :pk AND begins_with(SK, :sk)",

                    ExpressionAttributeValues: {
                        ":pk": `USER#${userId}`,
                        ":sk": "LESSON#"
                    },

                    ExclusiveStartKey
                })
            );

            items.push(...(result.Items || []));
            ExclusiveStartKey = result.LastEvaluatedKey;

        } while (ExclusiveStartKey);

        return items;
    }
    async getAllProgress() {
    const items = [];
    let ExclusiveStartKey;

    do {
        const result = await this.docClient.send(
            new ScanCommand({
                TableName: this.tableName,
                FilterExpression: "begins_with(SK, :sk)",
                ExpressionAttributeValues: {
                    ":sk": "LESSON#"
                },
                ExclusiveStartKey
            })
        );

        items.push(...(result.Items || []));
        ExclusiveStartKey = result.LastEvaluatedKey;

    } while (ExclusiveStartKey);

    return items;
}
    async saveLeaderboard(leaderboard) {
    const item = {
        PK: 'LEADERBOARD',
        SK: 'SNAPSHOT',
        players: leaderboard.map((player, index) => ({
            ...player,
            rank: index + 1
        })),
        updatedAt: new Date().toISOString()
    };

    await this.docClient.send(
        new PutCommand({
            TableName: this.tableName,
            Item: item
        })
    );

    return item;
}
async getLeaderboardSnapshot() {
    const result = await this.docClient.send(
        new GetCommand({
            TableName: this.tableName,
            Key: {
                PK: 'LEADERBOARD',
                SK: 'SNAPSHOT'
            }
        })
    );

    return result.Item || null;
}
    // Save or update one lesson's progress
    async saveProgress(progress) {
       if (!progress || typeof progress !== "object") {
            throw new Error("Progress data is required");
        }
const now = new Date().toISOString();
        this.validateIds(progress.userId, progress.lessonId);

        const {
            userId,
            lessonId,
            displayName,
            status,
            progressPercent,
            currentActivityId,
            completedActivityIds,
            quizAnswers,
            quizScore,
            totalScore,
            maxPossibleScore,
        scorePercentage,
        scoringVersion,
            surveyResponses,
            orderingAnswers,
            dragDropAnswers,
            completedAt,
            startedAt,
            activeTimeSeconds,
            lastAccessedAt
        } = progress;

        const item = {
            PK: `USER#${userId}`,
            SK: `LESSON#${lessonId}`,
            GSI1PK: `LESSON#${lessonId}`,
    GSI1SK: `USER#${userId}`,
            userId,
            lessonId,
            displayName,
            updatedAt: now
        };

        const fields = {
            status,
            progressPercent,
            currentActivityId,
            completedActivityIds,
            quizAnswers,
            quizScore,
            surveyResponses,
            orderingAnswers,
            dragDropAnswers,
            totalScore,
            maxPossibleScore,
            scorePercentage,
            scoringVersion,
            
            
            completedAt,
            startedAt,
            activeTimeSeconds,
            lastAccessedAt: lastAccessedAt ?? now
        };

        for (const [key, value] of Object.entries(fields)) {
            if (value !== undefined) {
                item[key] = value;
            }
        }

        await this.docClient.send(
            new PutCommand({
                TableName: this.tableName,
                Item: item
            })
        );

        return item;
    }

    // Delete one lesson's progress
    async deleteProgress(userId, lessonId) {
        this.validateIds(userId, lessonId);

        await this.docClient.send(
            new DeleteCommand({
                TableName: this.tableName,
                Key: {
                    PK: `USER#${userId}`,
                    SK: `LESSON#${lessonId}`
                }
            })
        );

        return true;
    }
    // Get the ISO week information (Monday-Sunday)
    getWeekInfo(date = new Date()) {
        const current = new Date(Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate()
        ));

        const day = (current.getUTCDay() + 6) % 7;

        const start = new Date(current);
        start.setUTCDate(current.getUTCDate() - day);

        const end = new Date(start);
        end.setUTCDate(start.getUTCDate() + 7);

        const thursday = new Date(start);
        thursday.setUTCDate(start.getUTCDate() + 3);

        const year = thursday.getUTCFullYear();

        const jan4 = new Date(Date.UTC(year, 0, 4));

        const firstMonday = new Date(jan4);
        firstMonday.setUTCDate(
            jan4.getUTCDate() -
            ((jan4.getUTCDay() + 6) % 7)
        );

        const weekNumber = 1 + Math.round(
            (start - firstMonday) / (7 * 24 * 60 * 60 * 1000)
        );

        const weekKey =
            `${year}-W${String(weekNumber).padStart(2, "0")}`;

        return {
            weekKey,
            start: start.toISOString(),
            end: end.toISOString()
        };
    }

    // Calculate weekly leaderboard
    async calculateWeeklyLeaderboard(date = new Date()) {
        const week = this.getWeekInfo(date);

        const allProgress = await this.getAllProgress();

        const players = {};

        for (const record of allProgress) {
            if (
                record.status !== "completed" ||
                !record.completedAt ||
                !record.userId
            ) {
                continue;
            }

            const completedDate = new Date(record.completedAt);

            if (Number.isNaN(completedDate.getTime())) {
                continue;
            }

            if (
                completedDate < new Date(week.start) ||
                completedDate >= new Date(week.end)
            ) {
                continue;
            }

            const userId = record.userId;

            if (!players[userId]) {
                players[userId] = {
                    userId,
                    weeklyScore: 0,
                    completedLessons: 0,
                    totalActiveTime: 0
                };
            }

            players[userId].weeklyScore +=
                Number(record.totalScore || 0);

            players[userId].completedLessons += 1;

            players[userId].totalActiveTime +=
                Number(record.activeTimeSeconds || 0);
        }

        const rankedPlayers = Object.values(players)
            .sort((a, b) =>
                b.weeklyScore - a.weeklyScore ||
                b.completedLessons - a.completedLessons
            )
            .map((player, index) => ({
                ...player,
                rank: index + 1
            }));

        return {
            weekKey: week.weekKey,
            start: week.start,
            end: week.end,
            players: rankedPlayers
        };
    }

    // Save weekly leaderboard
    async saveWeeklyLeaderboard(leaderboard) {
        const item = {
            PK: "LEADERBOARD",
            SK: `WEEK#${leaderboard.weekKey}`,
            weekKey: leaderboard.weekKey,
            start: leaderboard.start,
            end: leaderboard.end,
            players: leaderboard.players,
            updatedAt: new Date().toISOString()
        };

        await this.docClient.send(
            new PutCommand({
                TableName: this.tableName,
                Item: item
            })
        );

        return item;
    }

    // Retrieve weekly leaderboard
    async getWeeklyLeaderboardSnapshot(weekKey) {
        const result = await this.docClient.send(
            new GetCommand({
                TableName: this.tableName,
                Key: {
                    PK: "LEADERBOARD",
                    SK: `WEEK#${weekKey}`
                }
            })
        );

        return result.Item || null;
    }

    // Refresh current weekly leaderboard
    async refreshWeeklyLeaderboard() {
        const leaderboard =
            await this.calculateWeeklyLeaderboard();

        return await this.saveWeeklyLeaderboard(leaderboard);
    }

    // Get current weekly leaderboard
    async getCurrentWeeklyLeaderboard() {
        const week = this.getWeekInfo();

        const snapshot =
            await this.getWeeklyLeaderboardSnapshot(week.weekKey);

        if (snapshot) {
            return snapshot;
        }

        return await this.refreshWeeklyLeaderboard();
    }

}
