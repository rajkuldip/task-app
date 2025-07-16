const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetchTasksApi = async () => {
    try {
        const response = await fetch(`${BACKEND_URL}/api/tasks`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
};