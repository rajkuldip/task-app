import { NextResponse } from 'next/server';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

const client = new DynamoDBClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    },
    endpoint: process.env.DYNAMODB_ENDPOINT,
});

const ddbDocClient = DynamoDBDocumentClient.from(client);

export async function GET() {
    try {
        const params = {
            TableName: 'Tasks',
        };

        const data = await ddbDocClient.send(new ScanCommand(params));
        const tasks = data.Items || [
            { userId: 'user1', taskId: 'task123', description: 'Sample Task 1' },
            { userId: 'user2', taskId: 'task456', description: 'Sample Task 2' },
        ];

        return NextResponse.json(tasks);
    } catch (error) {
        console.error('Error fetching tasks from DynamoDB:', error);

        if (process.env.NODE_ENV === 'development') {
            return NextResponse.json({ error: 'Failed to fetch tasks', details: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
    }
}