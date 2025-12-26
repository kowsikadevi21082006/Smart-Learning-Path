import axios from 'axios';

/**
 * API Service
 * 
 * Centralized API communication layer with error handling.
 * Currently uses mock data but ready for backend integration.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/v1';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 30000, // 30 seconds
});

// Request interceptor
apiClient.interceptors.request.use(
    (config) => {
        // Add auth token if available
        const token = localStorage.getItem('auth_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
apiClient.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const message = error.response?.data?.message || error.message || 'An error occurred';
        return Promise.reject(new Error(message));
    }
);

/**
 * Generate learning roadmap from user input
 */
export const generateLearningPath = async (userData) => {
    try {
        // Transform camelCase keys to snake_case for backend
        const backendPayload = {
            current_skills: Array.isArray(userData.currentSkills)
                ? userData.currentSkills.join(', ')
                : userData.currentSkills || '',
            target_goal: userData.targetGoal,
            hours_per_week: parseInt(userData.hoursPerWeek),
            duration_weeks: parseInt(userData.durationWeeks),
            preferred_learning_style: userData.preferredLearningStyle || 'hands-on'
        };

        const response = await apiClient.post('/learning-paths/generate', backendPayload);
        return response;
    } catch (error) {
        console.error('Error generating learning path:', error);
        throw error;
    }
};

/**
 * Generate quiz for a specific week
 */
export const generateQuiz = async (weekId, topics) => {
    try {
        const response = await apiClient.post('/quiz/generate', {
            week_number: parseInt(weekId),
            topics,
        });
        return response;
    } catch (error) {
        console.error('Error generating quiz:', error);
        throw error;
    }
};

/**
 * Save user progress
 */
export const saveProgress = async (progressData) => {
    try {
        // ENDPOINT NOT YET IMPLEMENTED IN BACKEND
        console.warn('saveProgress endpoint not implemented in backend');
        // const response = await apiClient.post('/save-progress', progressData);
        // return response;
        return { success: true };
    } catch (error) {
        console.error('Error saving progress:', error);
        throw error;
    }
};

/**
 * Get user progress
 */
export const getProgress = async (userId) => {
    try {
        // ENDPOINT NOT YET IMPLEMENTED IN BACKEND
        console.warn('getProgress endpoint not implemented in backend');
        // const response = await apiClient.get(`/progress/${userId}`);
        // return response;
        return { success: true, progress: [] };
    } catch (error) {
        console.error('Error fetching progress:', error);
        throw error;
    }
};

export default apiClient;
