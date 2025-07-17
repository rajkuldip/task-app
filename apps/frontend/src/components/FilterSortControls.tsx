'use client';

import React from 'react';
import styled from 'styled-components';
import { TaskFilter, TaskPriority, TaskStatus } from '@/types/task';
import { FaFilter, FaRegCalendar, FaXmark } from 'react-icons/fa6';

const ControlsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.medium};
  background-color: ${({ theme }) => theme.colors.surface}; 
  padding: ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.boxShadow};
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing.large};
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 150px;
`;

const Label = styled.label`
  margin-bottom: ${({ theme }) => theme.spacing.small};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text}; 
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Select = styled.select`
  padding: ${({ theme }) => theme.spacing.small};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: 1rem;
  background-color: ${({ theme }) => theme.colors.surface}; 
  color: ${({ theme }) => theme.colors.text}; 
  cursor: pointer;
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary};
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.small};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: 1rem;
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text}; 
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary};
  }
`;

const ClearButton = styled.button`
  background-color: ${({ theme }) => theme.colors.border}; 
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: 1rem;
  font-weight: 600;
  transition: background-color 0.2s ease-in-out;
  margin-top: auto;
  align-self: flex-end; 
  cursor: pointer; 
  border: none; 
  display: flex;
  align-items: center;
  svg {
  margin-right: 5px;
  }
  &:hover {
    background-color: ${({ theme }) => theme.colors.lightText};
  }
`;

interface FilterSortControlsProps {
  filters: TaskFilter;
  onFilterChange: (filters: Partial<TaskFilter>) => void;
  onClearFilters: () => void;
}

export const FilterSortControls: React.FC<FilterSortControlsProps> = ({ filters, onFilterChange, onClearFilters }) => {
  const statusOptions: TaskStatus[] = ['pending', 'in progress', 'completed'];
  const priorityOptions: TaskPriority[] = ['low', 'medium', 'high'];

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    onFilterChange({ [name]: value === '' ? undefined : value });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onFilterChange({ [name]: value === '' ? undefined : value });
  };

  return (
    <ControlsContainer>
      <FilterGroup>
        <Label htmlFor="statusFilter"><FaFilter />Status</Label>
        <Select
          id="statusFilter"
          name="status"
          value={filters.status || ''}
          onChange={handleSelectChange}
          aria-label="Status filter"
        >
          <option value="">All</option>
          {statusOptions.map(option => (
            <option key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
          ))}
        </Select>
      </FilterGroup>

      <FilterGroup>
        <Label htmlFor="priorityFilter"><FaFilter /> Priority</Label>
        <Select
          id="priorityFilter"
          name="priority"
          value={filters.priority || ''}
          onChange={handleSelectChange}
          aria-label="Priority filter"
        >
          <option value="">All</option>
          {priorityOptions.map(option => (
            <option key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
          ))}
        </Select>
      </FilterGroup>

      <FilterGroup>
        <Label htmlFor="dueDateFilter"><FaRegCalendar /> Due Date</Label>
        <Input
          type="date"
          id="dueDateFilter"
          name="dueDate"
          value={filters.dueDate || ''}
          onChange={handleDateChange}
        />
      </FilterGroup>

      <ClearButton onClick={onClearFilters} aria-label="Clear all filters">
        <FaXmark /> Clear Filters
      </ClearButton>
    </ControlsContainer>
  );
};