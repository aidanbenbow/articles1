
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

    // Retrieve all lesson progress for one learner
    async getProgress(userId) {
        if (!userId) {
            throw new Error("A userId is required");
        }

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
        if (!progress.userId || !progress.lessonId) {
            throw new Error(
                "Both userId and lessonId are required"
            );
        }

        const item = {
            ...progress,
            PK: `USER#${progress.userId}`,
            SK: `LESSON#${progress.lessonId}`,
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

    // Delete one lesson's progress
    async deleteProgress(userId, lessonId) {
        if (!userId || !lessonId) {
            throw new Error(
                "Both userId and lessonId are required"
            );
        }

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
