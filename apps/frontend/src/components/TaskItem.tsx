'use client';

import React from 'react';
import styled from 'styled-components';
import { Task, TaskStatus } from '@/types/task';
import { FaPen, FaTrash, FaCheck, FaHourglassHalf, FaCircle } from 'react-icons/fa6';

interface TaskCardProps {
    $status: TaskStatus;
}


const TaskCard = styled.div<TaskCardProps>`
  background-color: ${({ theme }) => theme.colors.surface};;
  padding: ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.boxShadow};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.small};
  border-left: 5px solid;

  ${({ $status, theme }: { $status: TaskStatus, theme: any }) => {
        switch ($status) {
            case 'pending': return `border-color: ${theme.colors.warning};`;
            case 'in progress': return `border-color: ${theme.colors.info};`;
            case 'completed': return `border-color: ${theme.colors.success};`;
            default: return `border-color: ${theme.colors.border};`;
        }
    }}
`;

const TaskHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TaskTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.25rem;
`;

const TaskDescription = styled.p`
  color: ${({ theme }) => theme.colors.lightText};
  font-size: 0.95rem;
`;

const TaskDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.small};
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
`;

const DetailItem = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border}; 
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.small};
`;

const ActionButton = styled.button<{ $variant?: 'edit' | 'delete' }>`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: ${({ theme }) => theme.borderRadius};
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;

  ${({ $variant, theme }) => {
        switch ($variant) {
            case 'edit':
                return `
          color: ${theme.colors.primary};
          &:hover {
            background-color: ${theme.colors.border};
          }
        `;
            case 'delete':
                return `
          color: ${theme.colors.danger};
          &:hover {
            background-color: ${theme.colors.border}; 
          }
        `;
            default:
                return `color: ${theme.colors.text};`;
        }
    }}
`;

const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
        case 'pending': return <FaHourglassHalf color="#ffc107" />;
        case 'in progress': return <FaCircle color="#17a2b8" />;
        case 'completed': return <FaCheck color="#28a745" />;
        default: return <FaCircle />;
    }
};

interface TaskItemProps {
    task: Task;
    onEdit: (task: Task) => void;
    onDelete: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete }) => {
    return (
        <TaskCard $status={task.status}>
            <TaskHeader>
                <TaskTitle>{task.title}</TaskTitle>
                <ActionButtons>
                    <ActionButton onClick={() => onEdit(task)} $variant="edit" title="Edit Task" aria-label="Edit task">
                        <FaPen />
                    </ActionButton>
                    <ActionButton onClick={() => onDelete(task.id)} $variant="delete" title="Delete Task" aria-label="Delete task">
                        <FaTrash />
                    </ActionButton>
                </ActionButtons>
            </TaskHeader>
            {task.description && <TaskDescription>{task.description}</TaskDescription>}
            <TaskDetails>
                {task.dueDate && (
                    <DetailItem>
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                    </DetailItem>
                )}
                {task.priority && (
                    <DetailItem>
                        Priority: {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                    </DetailItem>
                )}
                <DetailItem>
                    {getStatusIcon(task.status)} Status: {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                </DetailItem>
            </TaskDetails>
            <TaskDetails>
                <DetailItem>Created: {new Date(task.createdAt).toLocaleDateString()}</DetailItem>
            </TaskDetails>
        </TaskCard>
    );
};