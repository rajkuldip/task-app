'use client';

import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from '../styles/GlobalStyles';
import { lightTheme, darkTheme } from '../styles/theme';
import { useThemeStore } from '@/lib/store/themeStore';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const themeMode = useThemeStore((state) => state.themeMode);

  const currentTheme = themeMode === 'light' ? lightTheme : darkTheme;

  return (
    <html lang="en">
      <head>
        <title>Task Management App</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <ThemeProvider theme={currentTheme}>
          <GlobalStyles theme={currentTheme} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}