import { NextRequest, NextResponse } from 'next/server';
import { ScanCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDocClient } from '@/lib/dynamodb';
import { Task, TaskInput } from '@/types/task';
import { v4 as uuidv4 } from 'uuid';

const USER_ID = "kuldip_raj";
const TABLE_NAME = "Tasks";

// GET /api/tasks
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = request.nextUrl;
        const statusFilter = searchParams.get('status');
        const priorityFilter = searchParams.get('priority');
        const dueDateFilter = searchParams.get('dueDate');

        const params = {
            TableName: TABLE_NAME,
        };

        const { Items } = await ddbDocClient.send(new ScanCommand(params));

        let tasks: Task[] = (Items || []).map(item => ({
            id: item.taskId,
            userId: item.userId,
            title: item.title,
            description: item.description,
            dueDate: item.dueDate,
            priority: item.priority,
            status: item.status,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
        }));

        if (statusFilter) {
            tasks = tasks.filter(task => task.status === statusFilter);
        }
        if (priorityFilter) {
            tasks = tasks.filter(task => task.priority === priorityFilter);
        }
        if (dueDateFilter) {
            tasks = tasks.filter(task => task.dueDate === dueDateFilter);
        }

        return NextResponse.json(tasks, { status: 200 });

    } catch (error) {
        console.error("Error fetching tasks:", error);
        return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
    }
}

// POST /api/tasks
export async function POST(request: NextRequest) {
    try {
        const taskInput: TaskInput = await request.json();

        if (!taskInput.title || !taskInput.status) {
            return NextResponse.json({ error: "Title and Status are required" }, { status: 400 });
        }

        const now = new Date().toISOString();
        const generatedId = uuidv4();

        const dbItem = {
            userId: USER_ID,
            taskId: generatedId,
            title: taskInput.title,
            description: taskInput.description || '',
            dueDate: taskInput.dueDate || '',
            priority: taskInput.priority || 'medium',
            status: taskInput.status,
            createdAt: now,
            updatedAt: now,
        };

        const params = {
            TableName: TABLE_NAME,
            Item: dbItem,
        };

        await ddbDocClient.send(new PutCommand(params));

        const newTaskResponse: Task = {
            id: generatedId,
            userId: USER_ID,
            title: taskInput.title,
            description: taskInput.description,
            dueDate: taskInput.dueDate,
            priority: taskInput.priority,
            status: taskInput.status,
            createdAt: now,
            updatedAt: now,
        };

        return NextResponse.json(newTaskResponse, { status: 201 });

    } catch (error) {
        console.error("Error creating task:", error);
        return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
    }
}