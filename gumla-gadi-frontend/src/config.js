const config = {
    API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
    AI_API_URL: import.meta.env.VITE_AI_API_URL || 'http://localhost:8000',
    GOOGLE_CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    TRUECALLER_CLIENT_ID: import.meta.env.VITE_TRUECALLER_CLIENT_ID,
};

export default config;
