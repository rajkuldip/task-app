require('dotenv').config({ path: '../.env' });

const { DynamoDBClient, CreateTableCommand } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");

const dbClient = new DynamoDBClient({
    region: process.env.AWS_REGION || 'ap-southeast-2',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    },
    endpoint: process.env.DYNAMODB_ENDPOINT || 'http://localhost:8000',
});

const ddbDocClient = DynamoDBDocumentClient.from(dbClient);

async function createTasksTable() {
    const params = {
        TableName: "Tasks",
        KeySchema: [
            { AttributeName: "userId", KeyType: "HASH" },
            { AttributeName: "taskId", KeyType: "RANGE" }
        ],
        AttributeDefinitions: [
            { AttributeName: "userId", AttributeType: "S" },
            { AttributeName: "taskId", AttributeType: "S" }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
        }
    };

    try {
        const data = await dbClient.send(new CreateTableCommand(params));
        await ddbDocClient.send(new PutCommand({
            TableName: "Tasks",
            Item: {
                userId: "kuldip_raj",
                taskId: "task_001",
                title: "Create base structure",
                status: "completed"
            }
        }));
        await ddbDocClient.send(new PutCommand({
            TableName: "Tasks",
            Item: {
                userId: "kuldip_raj",
                taskId: "task_002",
                title: "Create tasks",
                status: "in-progress"
            }
        }));

    } catch (err) {
        if (err.name === 'ResourceInUseException') {
            console.log("Table 'Tasks' already exists.");
        } else {
            console.error("An unexpected error occurred during table creation or data insertion.");
            console.error("Error details:", JSON.stringify(err, Object.getOwnPropertyNames(err), 2));
        }
    }
}

createTasksTable();