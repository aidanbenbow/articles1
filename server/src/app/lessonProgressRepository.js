
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

        this.validateIds(progress.userId, progress.lessonId);

        const {
            userId,
            lessonId,
            status,
            progressPercent,
            currentActivityId,
            completedActivityIds,
            quizAnswers,
            quizScore,
            totalScore,
            surveyResponses,
            orderingAnswers,
            completedAt,
            startedAt,
            activeTimeSeconds
        } = progress;

        const item = {
            PK: `USER#${userId}`,
            SK: `LESSON#${lessonId}`,
            userId,
            lessonId,
            updatedAt: new Date().toISOString()
        };

        const fields = {
            status,
            progressPercent,
            currentActivityId,
            completedActivityIds,
            quizAnswers,
            quizScore,
            totalScore,
            surveyResponses,
            orderingAnswers,
            completedAt,
            startedAt,
            activeTimeSeconds
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
}
