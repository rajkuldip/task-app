'use client';

import React from 'react';
import styled from 'styled-components';
import { Task } from '@/types/task';
import { TaskItem } from './TaskItem';

const ListContainer = styled.div`
  width: 100%;
  max-width: 700px;
  margin: ${({ theme }) => theme.spacing.large} 0;
`;

const EmptyState = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.lightText};
  font-style: italic;
  padding: ${({ theme }) => theme.spacing.xlarge};
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius};
`;

interface TaskListProps {
    tasks: Task[];
    onEditTask: (task: Task) => void;
    onDeleteTask: (id: string) => void;
    loading: boolean;
    error: string | null;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, onEditTask, onDeleteTask, loading, error }) => {
    if (loading) {
        return <EmptyState>Loading tasks...</EmptyState>;
    }

    if (error) {
        return <EmptyState style={{ color: 'red' }}>Error: {error}</EmptyState>;
    }

    if (tasks.length === 0) {
        return <EmptyState>No tasks found. Create a new one!</EmptyState>;
    }

    return (
        <ListContainer>
            {tasks.map((task, index) => (
                <TaskItem key={`${task.id}_${index}`} task={task} onEdit={onEditTask} onDelete={onDeleteTask} />
            ))}
        </ListContainer>
    );
};