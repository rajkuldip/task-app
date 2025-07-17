import { NextRequest, NextResponse } from 'next/server';
import { GetCommand, UpdateCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDocClient } from '@/lib/dynamodb';
import { Task, TaskInput } from '@/types/task';

const USER_ID = "kuldip_raj";
const TABLE_NAME = "Tasks";

// GET /api/tasks/{id} 
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;

        const { Item } = await ddbDocClient.send(new GetCommand({
            TableName: TABLE_NAME,
            Key: {
                userId: USER_ID,
                taskId: id,
            },
        }));

        if (!Item) {
            return NextResponse.json({ error: "Task not found" }, { status: 404 });
        }

        const taskResponse: Task = {
            id: Item.taskId,
            userId: Item.userId,
            title: Item.title,
            description: Item.description,
            dueDate: Item.dueDate,
            priority: Item.priority,
            status: Item.status,
            createdAt: Item.createdAt,
            updatedAt: Item.updatedAt,
        };

        return NextResponse.json(taskResponse, { status: 200 });

    } catch (error) {
        console.error("Error fetching task by ID:", error);
        return NextResponse.json({ error: "Failed to fetch task" }, { status: 500 });
    }
}

// PUT /api/tasks/{id}
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;
        const taskInput: Partial<TaskInput> = await request.json();

        if (Object.keys(taskInput).length === 0) {
            return NextResponse.json({ error: "No fields provided for update" }, { status: 400 });
        }

        const now = new Date().toISOString();

        let updateExpression = "SET ";
        const expressionAttributeValues: { [key: string]: any } = {};
        const expressionAttributeNames: { [key: string]: string } = {};
        let i = 0;

        for (const key in taskInput) {
            if (taskInput.hasOwnProperty(key)) {
                if (key === 'id' || key === 'taskId') continue;

                const attributeValue = (taskInput as any)[key];
                if (attributeValue !== undefined) {
                    const valueKey = `:val${i}`;
                    const nameKey = `#key${i}`;
                    updateExpression += `${nameKey} = ${valueKey}, `;
                    expressionAttributeValues[valueKey] = attributeValue;
                    expressionAttributeNames[nameKey] = key;
                    i++;
                }
            }
        }

        updateExpression += `#updatedAt = :updatedAt`;
        expressionAttributeValues[':updatedAt'] = now;
        expressionAttributeNames['#updatedAt'] = 'updatedAt';

        const { Attributes } = await ddbDocClient.send(new UpdateCommand({
            TableName: TABLE_NAME,
            Key: {
                userId: USER_ID,
                taskId: id,
            },
            UpdateExpression: updateExpression,
            ExpressionAttributeValues: expressionAttributeValues,
            ExpressionAttributeNames: expressionAttributeNames,
            ReturnValues: "ALL_NEW",
        }));

        if (!Attributes) {
            return NextResponse.json({ error: "Task not found for update" }, { status: 404 });
        }

        const updatedTaskResponse: Task = {
            id: Attributes.taskId,
            userId: Attributes.userId,
            title: Attributes.title,
            description: Attributes.description,
            dueDate: Attributes.dueDate,
            priority: Attributes.priority,
            status: Attributes.status,
            createdAt: Attributes.createdAt,
            updatedAt: Attributes.updatedAt,
        };

        return NextResponse.json(updatedTaskResponse, { status: 200 });

    } catch (error: any) {
        console.error("Error updating task:", error);
        if (error.name === 'ValidationException' && error.message.includes('The provided key element does not match the schema')) {
            return NextResponse.json({ error: "Task not found or invalid ID" }, { status: 404 });
        }
        return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
    }
}

// DELETE /api/tasks/{id}
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;

        const { Attributes } = await ddbDocClient.send(new DeleteCommand({
            TableName: TABLE_NAME,
            Key: {
                userId: USER_ID,
                taskId: id,
            },
            ReturnValues: "ALL_OLD",
        }));

        if (!Attributes) {
            return NextResponse.json({ error: "Task not found" }, { status: 404 });
        }

        return new NextResponse(null, { status: 204 });

    } catch (error) {
        console.error("Error deleting task:", error);
        return NextResponse.json({ error: "Failed to delete task" }, { status: 500 });
    }
}