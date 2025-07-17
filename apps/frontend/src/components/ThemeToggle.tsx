'use client';

import React from 'react';
import styled from 'styled-components';
import { useThemeStore } from '@/lib/store/themeStore';
import { FaSun, FaMoon } from 'react-icons/fa6';

const ToggleButton = styled.button`
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out, border-color 0.2s ease-in-out;
  box-shadow: ${({ theme }) => theme.boxShadow};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  // Adjust icon size if needed
  svg {
    font-size: 1.2em;
  }
`;

export const ThemeToggle: React.FC = () => {
    const { themeMode, toggleTheme } = useThemeStore();

    return (
        <ToggleButton onClick={toggleTheme}>
            {themeMode === 'light' ? <FaMoon /> : <FaSun />}
        </ToggleButton>
    );
};