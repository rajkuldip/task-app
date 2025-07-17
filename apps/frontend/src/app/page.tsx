'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTaskStore } from '@/lib/store/taskStore';
import { Task, TaskInput, TaskFilter } from '@/types/task';
import { Modal } from '@/components/Modal';
import { TaskForm } from '@/components/TaskForm';
import { TaskList } from '@/components/TaskList';
import { FilterSortControls } from '@/components/FilterSortControls';
import { FaPlus } from 'react-icons/fa6';
import { ThemeToggle } from '@/components/ThemeToggle';

const PageContainer = styled.div`
  max-width: 900px;
  margin: ${({ theme }) => theme.spacing.xlarge} auto;
  padding: ${({ theme }) => theme.spacing.medium};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.large};
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.medium};
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
`;

const RightControls = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.medium};
  align-items: center;
  flex-wrap: wrap;
`;

const AddTaskButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

export default function HomePage() {
    const { tasks, fetchTasks, createTask, updateTask, deleteTask } = useTaskStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [filters, setFilters] = useState<TaskFilter>({});

    useEffect(() => {
        fetchTasks(filters);
    }, [filters, fetchTasks]);

    const handleAddTaskClick = () => {
        setEditingTask(undefined);
        setIsModalOpen(true);
    };

    const handleEditTask = (task: Task) => {
        setEditingTask(task);
        setIsModalOpen(true);
    };

    const handleDeleteTask = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            await deleteTask(id);
            fetchTasks(filters);
        }
    };

    const handleSubmit = async (taskInput: TaskInput) => {
        setIsSubmitting(true);
        try {
            if (editingTask) {
                await updateTask(editingTask.id, taskInput);
            } else {
                await createTask(taskInput);
            }
            setIsModalOpen(false);
            fetchTasks(filters);
        } catch (error) {
            console.error('Failed to save task:', error);
            alert('Failed to save task. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setEditingTask(undefined);
    };

    const handleFilterChange = (newFilters: Partial<TaskFilter>) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
    };

    const handleClearFilters = () => {
        setFilters({});
    };

    return (
        <PageContainer>
            <Header>
                <Title>My Tasks</Title>
                <RightControls>
                    <AddTaskButton onClick={handleAddTaskClick}>
                        <FaPlus /> Add New Task
                    </AddTaskButton>
                    <ThemeToggle />
                </RightControls>
            </Header>

            <FilterSortControls
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
            />

            <TaskList tasks={tasks} onEdit={handleEditTask} onDelete={handleDeleteTask} />

            <Modal isOpen={isModalOpen} onClose={handleCancel} title={editingTask ? 'Edit Task' : 'Add New Task'} testId="task-form-modal">
                <TaskForm
                    initialData={editingTask}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    isSubmitting={isSubmitting}
                />
            </Modal>
        </PageContainer>
    );
}