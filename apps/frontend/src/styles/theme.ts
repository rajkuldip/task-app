export const theme = {
    colors: {
        primary: '#0070f3',
        secondary: '#1a73e8',
        background: '#f0f2f5',
        text: '#333',
        lightText: '#666',
        border: '#ddd',
        success: '#28a745',
        danger: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8',
    },
    spacing: {
        small: '8px',
        medium: '16px',
        large: '24px',
        xlarge: '32px',
    },
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
};

export type Theme = typeof theme;