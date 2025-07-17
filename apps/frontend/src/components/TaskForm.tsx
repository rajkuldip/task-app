'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Task, TaskInput, TaskPriority, TaskStatus } from '@/types/task';
import { FaCross } from 'react-icons/fa6';
import { MdSave } from 'react-icons/md';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
  width: 100%;
  max-width: 500px;
  margin-top: ${({ theme }) => theme.spacing.large};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: ${({ theme }) => theme.spacing.small};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.small};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(0, 112, 243, 0.2);
  }
`;

const TextArea = styled.textarea`
  padding: ${({ theme }) => theme.spacing.small};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: 1rem;
  min-height: 80px;
  resize: vertical;
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(0, 112, 243, 0.2);
  }
`;

const Select = styled.select`
  padding: ${({ theme }) => theme.spacing.small};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: 1rem;
  background-color: white;
  cursor: pointer;
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(0, 112, 243, 0.2);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.medium};
  margin-top: ${({ theme }) => theme.spacing.medium};
`;

const StyledButton = styled.button<{ $variant?: 'primary' | 'secondary' | 'danger' }>`
  padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;

  ${({ $variant, theme }) => {
        switch ($variant) {
            case 'primary':
                return `
          background-color: ${theme.colors.primary};
          color: white;
          &:hover {
            background-color: ${theme.colors.secondary};
          }
        `;
            case 'danger':
                return `
          background-color: ${theme.colors.danger};
          color: white;
          &:hover {
            background-color: #c82333; /* Darker red */
          }
        `;
            case 'secondary':
            default:
                return `
          background-color: #e0e0e0;
          color: ${theme.colors.text};
          &:hover {
            background-color: #d0d0d0;
          }
        `;
        }
    }}
`;

interface TaskFormProps {
    initialData?: Task;
    onSubmit: (task: TaskInput) => void;
    onCancel: () => void;
    isSubmitting?: boolean;
}

export const TaskForm: React.FC<TaskFormProps> = ({ initialData, onSubmit, onCancel, isSubmitting }) => {
    const [formData, setFormData] = useState<TaskInput>({
        title: '',
        description: '',
        dueDate: '',
        priority: 'medium',
        status: 'pending',
        ...initialData,
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title,
                description: initialData.description || '',
                dueDate: initialData.dueDate || '',
                priority: initialData.priority || 'medium',
                status: initialData.status,
            });
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const statusOptions: TaskStatus[] = ['pending', 'in progress', 'completed'];
    const priorityOptions: TaskPriority[] = ['low', 'medium', 'high'];

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label htmlFor="title">Title</Label>
                <Input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Buy groceries"
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="description">Description</Label>
                <TextArea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="e.g., Milk, eggs, bread..."
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="priority">Priority</Label>
                <Select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                >
                    {priorityOptions.map(option => (
                        <option key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
                    ))}
                </Select>
            </FormGroup>
            <FormGroup>
                <Label htmlFor="status">Status</Label>
                <Select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                >
                    {statusOptions.map(option => (
                        <option key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
                    ))}
                </Select>
            </FormGroup>
            <ButtonGroup>
                <StyledButton type="button" onClick={onCancel} $variant="secondary" disabled={isSubmitting}>
                    <FaCross /> Cancel
                </StyledButton>
                <StyledButton type="submit" $variant="primary" disabled={isSubmitting}>
                    <MdSave /> {isSubmitting ? 'Saving...' : (initialData ? 'Update Task' : 'Create Task')}
                </StyledButton>
            </ButtonGroup>
        </Form>
    );
};