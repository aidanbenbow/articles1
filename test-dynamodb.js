
import 'dotenv/config';

import {
    PutCommand,
    GetCommand,
    DeleteCommand
} from '@aws-sdk/lib-dynamodb';

import { docClient } from './server/src/http/db.js';

const tableName = process.env.DYNAMODB_TABLE || 'LearningApp';

const testKey = {
    PK: 'SYSTEM#CONNECTION_TEST',
    SK: 'TEST'
};

async function testConnection() {
    try {
        console.log('Testing DynamoDB connection...');

        // 1. Write a temporary item
        await docClient.send(new PutCommand({
            TableName: tableName,
            Item: {
                ...testKey,
                message: 'DynamoDB connection successful',
                createdAt: new Date().toISOString()
            }
        }));

        console.log('Write successful.');

        // 2. Read the item back
        const result = await docClient.send(new GetCommand({
            TableName: tableName,
            Key: testKey,
            ConsistentRead: true
        }));

        if (!result.Item) {
            throw new Error('Test item could not be found.');
        }

        console.log('Read successful.');
        console.log(result.Item.message);

        // 3. Delete the temporary item
        await docClient.send(new DeleteCommand({
            TableName: tableName,
            Key: testKey
        }));

        console.log('Delete successful.');
        console.log('DynamoDB connection test PASSED.');

    } catch (error) {
        console.error('DynamoDB connection test FAILED.');
        console.error(error);
        process.exitCode = 1;
    }
}

await testConnection();
