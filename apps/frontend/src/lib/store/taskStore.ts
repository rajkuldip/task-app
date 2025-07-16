import { create } from 'zustand';
import { fetchTasksApi } from '../api';

interface Task {
    userId: string;
    taskId: string;
    title: string;
    status: string;
}

interface TaskState {
    tasks: Task[];
    fetchTasks: () => Promise<void>;
}

export const useTaskStore = create<TaskState>((set) => ({
    tasks: [],
    fetchTasks: async () => {
        try {
            const data = await fetchTasksApi();
            set({ tasks: data });
        } catch (error) {
            console.error('Failed to fetch tasks:', error);
            set({ tasks: [] });
        }
    },
}));