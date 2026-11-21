
import {
    GetCommand,
    PutCommand
} from "@aws-sdk/lib-dynamodb";

export class UserRepository {

    constructor(docClient) {
        this.docClient = docClient;
        this.tableName =
            process.env.DYNAMODB_TABLE || "LearningApp";
    }

    async getProfile(userId) {
        const result = await this.docClient.send(
            new GetCommand({
                TableName: this.tableName,
                Key: {
                    PK: `USER#${userId}`,
                    SK: "PROFILE"
                }
            })
        );

        return result.Item || null;
    }

    async createProfile(userId, profile={}) {
        const item = {
            PK: `USER#${userId}`,
            SK: "PROFILE",
            userId,
            displayName: profile.displayName || "Learner",
            createdAt: new Date().toISOString()
        };

        if (profile.email) {
            item.email = profile.email;
        }

        try {
            await this.docClient.send(
                new PutCommand({
                    TableName: this.tableName,
                    Item: item,
                    ConditionExpression:
                        "attribute_not_exists(PK) AND attribute_not_exists(SK)"
                })
            );

            return item;
        } catch (error) {
            if (error.name === "ConditionalCheckFailedException") {
                // Another request created this profile first.
                const existing = await this.getProfile(userId);

                if (existing) {
                    return existing;
                }
            }

            throw error;
        }
    
    }
}
