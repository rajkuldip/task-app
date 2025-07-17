'use client';

import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from '../styles/GlobalStyles';
import { lightTheme, darkTheme } from '../styles/theme';
import { useThemeStore } from '@/lib/store/themeStore';
import Head from 'next/head';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const themeMode = useThemeStore((state) => state.themeMode);
  const currentTheme = themeMode === 'light' ? lightTheme : darkTheme;

  return (
    <html lang="en">
      <Head>
        <title>Task Management App</title>
        <meta name="description" content="Accessible task management application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content={currentTheme.colors.primary} />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />

        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      <body>
        <a
          href="#main-content"
          className="skip-link"
          style={{
            position: 'absolute',
            top: '-40px',
            left: '0',
            background: currentTheme.colors.primary,
            color: 'white',
            padding: '8px',
            zIndex: '100',
            transition: 'top 0.3s',
            textDecoration: 'none',
          }}
          onFocus={() => {
            const element = document.querySelector('.skip-link');
            if (element) {
              (element as HTMLElement).style.top = '0';
            }
          }}
          onBlur={() => {
            const element = document.querySelector('.skip-link');
            if (element) {
              (element as HTMLElement).style.top = '-40px';
            }
          }}
        >
          Skip to content
        </a>

        <ThemeProvider theme={currentTheme}>
          <GlobalStyles theme={currentTheme} />

          <main id="main-content" role="main">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}