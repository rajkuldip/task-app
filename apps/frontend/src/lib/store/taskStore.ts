import { create } from 'zustand';
import { fetchTasksApi, createTaskApi, updateTaskApi, deleteTaskApi } from '@/lib/api';
import { Task, TaskInput, TaskFilter } from '@/types/task';

interface TaskState {
    tasks: Task[];
    loading: boolean;
    error: string | null;
    filters: TaskFilter;
    fetchTasks: () => Promise<void>;
    setFilter: (filter: Partial<TaskFilter>) => void;
    addTask: (task: TaskInput) => Promise<void>;
    editTask: (id: string, task: Partial<TaskInput>) => Promise<void>;
    removeTask: (id: string) => Promise<void>;
}

export const useTaskStore = create<TaskState>((set, get) => ({
    tasks: [],
    loading: false,
    error: null,
    filters: {},

    fetchTasks: async () => {
        set({ loading: true, error: null });
        try {
            const currentFilters = get().filters;
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
        get().fetchTasks();
    },

    addTask: async (task: TaskInput) => {
        set({ loading: true, error: null });
        try {
            const newTask = await createTaskApi(task);
            set(state => ({
                tasks: [...state.tasks, newTask],
                loading: false,
            }));
        } catch (error: any) {
            console.error('Failed to add task:', error);
            set({ error: error.message || 'Failed to add task', loading: false });
            throw error;
        }
    },

    editTask: async (id: string, task: Partial<TaskInput>) => {
        set({ loading: true, error: null });
        try {
            const updatedTask = await updateTaskApi(id, task);
            set(state => ({
                tasks: state.tasks.map(t => (t.id === id ? updatedTask : t)),
                loading: false,
            }));
        } catch (error: any) {
            console.error('Failed to edit task:', error);
            set({ error: error.message || 'Failed to edit task', loading: false });
            throw error;
        }
    },

    removeTask: async (id: string) => {
        set({ loading: true, error: null });
        try {
            await deleteTaskApi(id);
            set(state => ({
                tasks: state.tasks.filter(t => t.id !== id),
                loading: false,
            }));
        } catch (error: any) {
            console.error('Failed to remove task:', error);
            set({ error: error.message || 'Failed to remove task', loading: false });
            throw error;
        }
    },
}));                    