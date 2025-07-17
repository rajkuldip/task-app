import { create } from 'zustand';
import { fetchTasksApi, createTaskApi, updateTaskApi, deleteTaskApi } from '@/lib/api';
import { Task, TaskInput, TaskFilter } from '@/types/task';

interface TaskState {
    tasks: Task[];
    loading: boolean;
    error: string | null;
    filters: TaskFilter;

    fetchTasks: (filters?: TaskFilter) => Promise<void>;
    setFilter: (filter: Partial<TaskFilter>) => void;

    createTask: (task: TaskInput) => Promise<void>;
    updateTask: (id: string, task: Partial<TaskInput>) => Promise<void>;
    deleteTask: (id: string) => Promise<void>;
}

export const useTaskStore = create<TaskState>((set, get) => ({
    tasks: [],
    loading: false,
    error: null,
    filters: {},

    fetchTasks: async (filters) => {
        set({ loading: true, error: null });
        try {
            const currentFilters = filters !== undefined ? filters : get().filters;
            const data = await fetchTasksApi(currentFilters);
            set({ tasks: data, loading: false });
        } catch (error: any) {
            console.error('Failed to fetch tasks:', error);
            set({ error: error.message || 'Failed to fetch tasks', loading: false });
        }
    },

    setFilter: (newFilter: Partial<TaskFilter>) => {
        set(state => ({
            filters: { ...state.filters, ...newFilter },
        }));
        get().fetchTasks(get().filters);
    },

    createTask: async (task: TaskInput) => {
        set({ loading: true, error: null });
        try {
            const newTask = await createTaskApi(task);
            set(state => ({
                tasks: [...state.tasks, newTask],
                loading: false,
            }));
        } catch (error: any) {
            console.error('Failed to create task:', error);
            set({ error: error.message || 'Failed to create task', loading: false });
            throw error;
        }
    },

    updateTask: async (id: string, task: Partial<TaskInput>) => {
        set({ loading: true, error: null });
        try {
            const updatedTask = await updateTaskApi(id, task);
            set(state => ({
                tasks: state.tasks.map(t => (t.id === id ? updatedTask : t)),
                loading: false,
            }));
        } catch (error: any) {
            console.error('Failed to update task:', error);
            set({ error: error.message || 'Failed to update task', loading: false });
            throw error;
        }
    },

    deleteTask: async (id: string) => {
        set({ loading: true, error: null });
        try {
            await deleteTaskApi(id);
            set(state => ({
                tasks: state.tasks.filter(t => t.id !== id),
                loading: false,
            }));
        } catch (error: any) {
            console.error('Failed to delete task:', error);
            set({ error: error.message || 'Failed to delete task', loading: false });
            throw error;
        }
    },
}));