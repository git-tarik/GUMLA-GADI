const config = {
    API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
    AI_API_URL: import.meta.env.VITE_AI_API_URL || 'http://localhost:8000',
};

export default config;
