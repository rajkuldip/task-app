import { Task, TaskInput, TaskFilter } from '@/types/task';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

const buildQueryString = (filters: TaskFilter) => {
    const params = new URLSearchParams();
    if (filters.status) params.append('status', filters.status);
    if (filters.priority) params.append('priority', filters.priority);
    if (filters.dueDate) params.append('dueDate', filters.dueDate);
    return params.toString();
};

export const fetchTasksApi = async (filters: TaskFilter = {}): Promise<Task[]> => {
    const queryString = buildQueryString(filters);
    const url = `${BACKEND_URL}/api/tasks${queryString ? `?${queryString}` : ''}`;
    console.log(`Fetching tasks from: ${url}`);
    try {
        const response = await fetch(url);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`HTTP error! Status: ${response.status}, Details: ${errorData.error}`);
        }
        const data: Task[] = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
};

export const fetchTaskByIdApi = async (id: string): Promise<Task> => {
    try {
        const response = await fetch(`${BACKEND_URL}/api/tasks/${id}`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`HTTP error! Status: ${response.status}, Details: ${errorData.error}`);
        }
        const data: Task = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching task with ID ${id}:`, error);
        throw error;
    }
};

export const createTaskApi = async (task: TaskInput): Promise<Task> => {
    try {
        const response = await fetch(`${BACKEND_URL}/api/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`HTTP error! Status: ${response.status}, Details: ${errorData.error}`);
        }
        const data: Task = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating task:', error);
        throw error;
    }
};

export const updateTaskApi = async (id: string, task: Partial<TaskInput>): Promise<Task> => {
    try {
        const response = await fetch(`${BACKEND_URL}/api/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`HTTP error! Status: ${response.status}, Details: ${errorData.error}`);
        }
        const data: Task = await response.json();
        return data;
    } catch (error) {
        console.error(`Error updating task with ID ${id}:`, error);
        throw error;
    }
};

export const deleteTaskApi = async (id: string): Promise<void> => {
    try {
        const response = await fetch(`${BACKEND_URL}/api/tasks/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`HTTP error! Status: ${response.status}, Details: ${errorData.error}`);
        }
    } catch (error) {
        console.error(`Error deleting task with ID ${id}:`, error);
        throw error;
    }
};