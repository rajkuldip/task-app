import { create } from 'zustand';

type ThemeMode = 'light' | 'dark';

interface ThemeState {
    themeMode: ThemeMode;
    toggleTheme: () => void;
    setTheme: (mode: ThemeMode) => void;
}

const getInitialTheme = (): ThemeMode => {
    if (typeof window !== 'undefined') {
        const storedTheme = localStorage.getItem('themeMode');
        if (storedTheme === 'light' || storedTheme === 'dark') {
            return storedTheme;
        }
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
    }
    return 'light';
};

export const useThemeStore = create<ThemeState>((set) => ({
    themeMode: getInitialTheme(),

    toggleTheme: () =>
        set((state) => {
            const newMode = state.themeMode === 'light' ? 'dark' : 'light';
            if (typeof window !== 'undefined') {
                localStorage.setItem('themeMode', newMode);
            }
            return { themeMode: newMode };
        }),

    setTheme: (mode) =>
        set(() => {
            if (typeof window !== 'undefined') {
                localStorage.setItem('themeMode', mode);
            }
            return { themeMode: mode };
        }),
}));