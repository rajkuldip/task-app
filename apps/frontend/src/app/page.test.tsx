import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import HomePage from './page';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '@/styles/theme';
import { useTaskStore } from '@/lib/store/taskStore';
import { Task } from '@/types/task';

jest.mock('@/lib/api');
jest.mock('@/lib/store/taskStore');

const mockedUseTaskStore = useTaskStore as jest.MockedFunction<typeof useTaskStore>;

let mockSetFilter: jest.Mock;
let mockFetchTasks: jest.Mock;
let mockCreateTask: jest.Mock;
let mockUpdateTask: jest.Mock;
let mockDeleteTask: jest.Mock;

describe('HomePage', () => {
    const MOCK_TASKS: Task[] = [
        { id: '1', userId: 'kuldip', title: 'Buy Groceries', description: 'Milk, Eggs, Bread', status: 'pending', priority: 'high', dueDate: '2025-07-20T00:00:00.000Z', createdAt: '2025-07-15T00:00:00.000Z', updatedAt: '2025-07-15T00:00:00.000Z' },
        { id: '2', userId: 'kuldip', title: 'Walk the Dog', description: 'Take for a long walk in the park', status: 'completed', priority: 'medium', dueDate: '2025-07-18T00:00:00.000Z', createdAt: '2025-07-16T00:00:00.000Z', updatedAt: '2025-07-16T00:00:00.000Z' },
        { id: '3', userId: 'kuldip', title: 'Pay Bills', description: 'Rent, Electricity', status: 'in progress', priority: 'high', dueDate: '2025-07-19T00:00:00.000Z', createdAt: '2025-07-17T00:00:00.000Z', updatedAt: '2025-07-17T00:00:00.000Z' },
    ];

    const defaultStoreMockValue = {
        tasks: [],
        loading: false,
        error: null,
        filters: {},
        fetchTasks: null as any,
        createTask: null as any,
        updateTask: null as any,
        deleteTask: null as any,
        setFilter: null as any,
    };

    beforeEach(() => {
        mockSetFilter = jest.fn();
        mockFetchTasks = jest.fn();
        mockCreateTask = jest.fn();
        mockUpdateTask = jest.fn();
        mockDeleteTask = jest.fn();

        mockedUseTaskStore.mockClear();
        mockedUseTaskStore.mockReturnValue({
            ...defaultStoreMockValue,
            fetchTasks: mockFetchTasks,
            createTask: mockCreateTask,
            updateTask: mockUpdateTask,
            deleteTask: mockDeleteTask,
            setFilter: mockSetFilter,
        });
    });

    it('renders the application title and the add task button upon initial load', () => {
        render(
            <ThemeProvider theme={lightTheme}>
                <HomePage />
            </ThemeProvider>
        );

        expect(screen.getByText(/my tasks/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /add new task/i })).toBeInTheDocument();
        expect(screen.getByText(/no tasks found\. create a new one!/i)).toBeInTheDocument();
    });

    it('displays tasks when they are successfully fetched', () => {
        mockedUseTaskStore.mockReturnValue({
            ...defaultStoreMockValue,
            tasks: MOCK_TASKS,
            loading: false,
            error: null,
            fetchTasks: mockFetchTasks,
            createTask: mockCreateTask,
            updateTask: mockUpdateTask,
            deleteTask: mockDeleteTask,
            setFilter: mockSetFilter,
        });

        render(
            <ThemeProvider theme={lightTheme}>
                <HomePage />
            </ThemeProvider>
        );

        expect(screen.getByText('Buy Groceries')).toBeInTheDocument();
        expect(screen.getByText('Walk the Dog')).toBeInTheDocument();
        expect(screen.queryByText(/no tasks found/i)).not.toBeInTheDocument();
    });

    it('can sort tasks by status', async () => {
        render(
            <ThemeProvider theme={lightTheme}>
                <HomePage />
            </ThemeProvider>
        );

        const select = screen.getByRole('combobox', { name: /status/i });
        fireEvent.change(select, { target: { value: 'completed' } });

        await waitFor(() => {
            expect(mockFetchTasks).toHaveBeenCalledWith(
                expect.objectContaining({ status: 'completed' })
            );
        });
    });

    it('can sort tasks by priority', async () => {
        render(
            <ThemeProvider theme={lightTheme}>
                <HomePage />
            </ThemeProvider>
        );

        const select = screen.getByRole('combobox', { name: /priority/i });

        fireEvent.change(select, { target: { value: 'high' } });

        await waitFor(() => {
            expect(mockFetchTasks).toHaveBeenCalledWith(
                expect.objectContaining({ priority: 'high' })
            );
        });
    });

    it('can sort tasks by due date', async () => {
        render(
            <ThemeProvider theme={lightTheme}>
                <HomePage />
            </ThemeProvider>
        );

        const dateInput = screen.getByLabelText(/due date/i);

        const testDate = '2025-07-20';
        fireEvent.change(dateInput, { target: { value: testDate } });

        await waitFor(() => {
            expect(mockFetchTasks).toHaveBeenCalledWith(
                expect.objectContaining({ dueDate: testDate })
            );
        });
    });
    it('can clear filters', async () => {
        render(
            <ThemeProvider theme={lightTheme}>
                <HomePage />
            </ThemeProvider>
        );

        const statusSelect = screen.getByRole('combobox', { name: /status/i });
        const prioritySelect = screen.getByRole('combobox', { name: /priority/i });
        const dateInput = screen.getByLabelText(/due date/i);

        fireEvent.change(statusSelect, { target: { value: 'completed' } });
        fireEvent.change(prioritySelect, { target: { value: 'high' } });
        fireEvent.change(dateInput, { target: { value: '2025-07-20' } });

        await waitFor(() => {
            expect(mockFetchTasks).toHaveBeenCalledWith(
                expect.objectContaining({
                    status: 'completed',
                    priority: 'high',
                    dueDate: '2025-07-20'
                })
            );
        });

        const clearButton = screen.getByRole('button', { name: /clear filters/i });
        fireEvent.click(clearButton);

        await waitFor(() => {
            expect(mockFetchTasks).toHaveBeenCalledWith({});
        });
    });
    it('can add a new task', async () => {
        mockCreateTask.mockResolvedValueOnce({ success: true });

        render(
            <ThemeProvider theme={lightTheme}>
                <HomePage />
            </ThemeProvider>
        );

        const addButton = screen.getByRole('button', {
            name: /add new task/i
        });
        fireEvent.click(addButton);

        await waitFor(() => {
            expect(screen.getByRole('heading', { name: /add new task/i })).toBeInTheDocument();
        });

        const modal = await screen.findByTestId('task-form-modal');

        const titleInput = within(modal).getByRole('textbox', { name: /title/i });
        const descriptionInput = within(modal).getByRole('textbox', { name: /description/i });
        const dueDateInput = within(modal).getByLabelText(/due date/i);
        const prioritySelect = within(modal).getByRole('combobox', { name: /priority/i });
        const statusSelect = within(modal).getByRole('combobox', { name: /status/i });

        const submitButton = within(modal).getByRole('button', {
            name: /create task/i
        });

        fireEvent.change(titleInput, { target: { value: 'New Test Task' } });
        fireEvent.change(descriptionInput, { target: { value: 'Test description' } });
        fireEvent.change(dueDateInput, { target: { value: '2025-12-31' } });
        fireEvent.change(prioritySelect, { target: { value: 'high' } });
        fireEvent.change(statusSelect, { target: { value: 'pending' } });

        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(mockCreateTask).toHaveBeenCalledWith({
                title: 'New Test Task',
                description: 'Test description',
                dueDate: '2025-12-31',
                priority: 'high',
                status: 'pending'
            });
        });

        expect(mockFetchTasks).toHaveBeenCalledTimes(2);
    });
});