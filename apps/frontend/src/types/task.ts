export type TaskStatus = 'pending' | 'in progress' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
    id: string;
    userId: string;
    title: string;
    description?: string;
    dueDate?: string;
    priority?: TaskPriority;
    status: TaskStatus
    createdAt: string;
    updatedAt: string;
}

export interface TaskInput {
    title: string;
    description?: string;
    dueDate?: string;
    priority?: TaskPriority;
    status: TaskStatus;
}

export interface TaskFilter {
    status?: TaskStatus;
    priority?: TaskPriority;
    dueDate?: string;
}