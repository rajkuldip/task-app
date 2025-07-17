'use client';

import React from 'react';
import styled from 'styled-components';
import { TaskFilter, TaskPriority, TaskStatus } from '@/types/task';
import { FaFilter, FaRegCalendar, FaXmark } from 'react-icons/fa6';

const ControlsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.medium};
  // --- CHANGE ---
  background-color: ${({ theme }) => theme.colors.surface}; // Use themed surface color
  // --------------
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
  color: ${({ theme }) => theme.colors.text}; // Already correctly themed
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Select = styled.select`
  padding: ${({ theme }) => theme.spacing.small};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: 1rem;
  // --- CHANGE ---
  background-color: ${({ theme }) => theme.colors.surface}; // Use themed surface color
  color: ${({ theme }) => theme.colors.text}; // Ensure text color changes
  // --------------
  cursor: pointer;
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    // --- CHANGE ---
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}40; // Use theme color with opacity
    // --------------
  }
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.small};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: 1rem;
  // --- ADD ---
  background-color: ${({ theme }) => theme.colors.surface}; // Use themed surface color
  color: ${({ theme }) => theme.colors.text}; // Ensure text color changes
  // -----------
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    // --- CHANGE ---
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}40; // Use theme color with opacity
    // --------------
  }
`;

const ClearButton = styled.button`
  // --- CHANGE ---
  background-color: ${({ theme }) => theme.colors.border}; // Use theme.colors.border for a neutral background
  color: ${({ theme }) => theme.colors.text}; // Ensure text color changes
  // --------------
  padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: 1rem;
  font-weight: 600;
  transition: background-color 0.2s ease-in-out;
  margin-top: auto; /* Push to bottom */
  align-self: flex-end; /* Align with other inputs */
  cursor: pointer; /* Ensure it's clickable */
  border: none; /* Remove default button border */
  display: flex;
  align-items: center;
  svg {
  margin-right: 5px;
  }
  &:hover {
    // --- CHANGE ---
    background-color: ${({ theme }) => theme.colors.lightText}; // Use a slightly darker/different themed color for hover
    // --------------
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
        <Label htmlFor="statusFilter"><FaFilter /> Status</Label>
        <Select
          id="statusFilter"
          name="status"
          value={filters.status || ''}
          onChange={handleSelectChange}
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

      <ClearButton onClick={onClearFilters}>
        <FaXmark /> Clear Filters
      </ClearButton>
    </ControlsContainer>
  );
};