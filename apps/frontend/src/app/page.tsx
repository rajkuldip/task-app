'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTaskStore } from '@/lib/store/taskStore';
import { Task, TaskInput } from '@/types/task';
import { Modal } from '@/components/Modal';
import { TaskForm } from '@/components/TaskForm';
import { TaskList } from '@/components/TaskList';
import { FilterSortControls } from '@/components/FilterSortControls';
import { FaPlus } from 'react-icons/fa6';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xlarge};
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Header = styled.header`
  width: 100%;
  max-width: 700px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
`;

const AddTaskButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: ${({ theme }) => theme.spacing.medium} ${({ theme }) => theme.spacing.large};
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const ErrorMessage = styled.div`
  background-color: ${({ theme }) => theme.colors.danger};
  color: white;
  padding: ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.borderRadius};
  margin-top: ${({ theme }) => theme.spacing.medium};
  text-align: center;
  width: 100%;
  max-width: 700px;
`;

export default function HomePage() {
    const { tasks, loading, error, filters, fetchTasks, setFilter, addTask, editTask, removeTask } = useTaskStore();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [isSubmittingForm, setIsSubmittingForm] = useState(false);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks, filters]);

    const handleAddTaskClick = () => {
        setEditingTask(null);
        setIsModalOpen(true);
    };

    const handleEditTaskClick = (task: Task) => {
        setEditingTask(task);
        setIsModalOpen(true);
    };

    const handleDeleteTask = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await removeTask(id);
            } catch (err) {
                console.log('Error deleting task');
            }
        }
    };

    const handleFormSubmit = async (taskInput: TaskInput) => {
        setIsSubmittingForm(true);
        try {
            if (editingTask) {
                await editTask(editingTask.id, taskInput);
            } else {
                await addTask(taskInput);
            }
            setIsModalOpen(false);
        } catch (err) {
        } finally {
            setIsSubmittingForm(false);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingTask(null);
    };

    const handleClearFilters = () => {
        setFilter({ status: undefined, priority: undefined, dueDate: undefined });
    };

    return (
        <PageContainer>
            <Header>
                <Title>My Tasks</Title>
                <AddTaskButton onClick={handleAddTaskClick}>
                    <FaPlus /> Add New Task
                </AddTaskButton>
            </Header>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <FilterSortControls
                filters={filters}
                onFilterChange={setFilter}
                onClearFilters={handleClearFilters}
            />

            <TaskList
                tasks={tasks}
                onEditTask={handleEditTaskClick}
                onDeleteTask={handleDeleteTask}
                loading={loading}
                error={error}
            />

            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <h2>{editingTask ? 'Edit Task' : 'Create New Task'}</h2>
                <TaskForm
                    initialData={editingTask || undefined}
                    onSubmit={handleFormSubmit}
                    onCancel={handleCloseModal}
                    isSubmitting={isSubmittingForm}
                />
            </Modal>
        </PageContainer>
    );
}