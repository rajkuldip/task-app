const base = {
    spacing: {
        xsmall: '4px',
        small: '8px',
        medium: '16px',
        large: '24px',
        xlarge: '32px',
    },
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    breakpoints: {
        mobile: '576px',
        tablet: '768px',
        desktop: '992px',
    },
};

const lightColors = {
    background: '#f8f9fa',
    surface: '#ffffff',
    text: '#343a40',
    lightText: '#6c757d',
    primary: '#007bff',
    secondary: '#6c757d',
    success: '#28a745',
    danger: '#dc3545',
    warning: '#ffc107',
    info: '#17a2b8',
    border: '#dee2e6',
};

const darkColors = {
    background: '#212529',
    surface: '#343a40',
    text: '#f8f9fa',
    lightText: '#ced4da',
    primary: '#8ec9ff',
    secondary: '#adb5bd',
    success: '#7be39e',
    danger: '#ff7085',
    warning: '#ffe48d',
    info: '#66d9ef',
    border: '#495057',
};

export interface Theme {
    colors: typeof lightColors;
    spacing: typeof base.spacing;
    borderRadius: string;
    boxShadow: string;
    breakpoints: typeof base.breakpoints;
}

export const lightTheme: Theme = {
    ...base,
    colors: lightColors,
};

export const darkTheme: Theme = {
    ...base,
    colors: darkColors,
};

export const themes = {
    light: lightTheme,
    dark: darkTheme,
};