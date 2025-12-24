import { createContext, useContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

/**
 * App Context
 * 
 * Global state management for user data, learning path, and UI state.
 * Provides centralized state accessible throughout the application.
 */
const AppContext = createContext();

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within AppProvider');
    }
    return context;
};

export const AppProvider = ({ children }) => {
    // User onboarding data
    const [userData, setUserData] = useState({
        currentSkills: [],
        targetGoal: '',
        hoursPerWeek: 0,
        durationWeeks: 0,
    });

    // Generated learning path
    const [learningPath, setLearningPath] = useState(null);

    // UI State
    const [viewMode, setViewMode] = useState('timeline'); // 'timeline' or 'kanban'
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Progress tracking
    const [completedWeeks, setCompletedWeeks] = useState(new Set());

    // Update user data
    const updateUserData = useCallback((data) => {
        setUserData(prev => ({ ...prev, ...data }));
    }, []);

    // Toggle week completion
    const toggleWeekCompletion = useCallback((weekId) => {
        setCompletedWeeks(prev => {
            const newSet = new Set(prev);
            if (newSet.has(weekId)) {
                newSet.delete(weekId);
            } else {
                newSet.add(weekId);
            }
            return newSet;
        });
    }, []);

    // Calculate progress percentage
    const calculateProgress = useCallback(() => {
        if (!learningPath || !learningPath.weeks) return 0;
        const totalWeeks = learningPath.weeks.length;
        return totalWeeks > 0 ? (completedWeeks.size / totalWeeks) * 100 : 0;
    }, [learningPath, completedWeeks]);

    // Reset everything
    const reset = useCallback(() => {
        setUserData({
            currentSkills: [],
            targetGoal: '',
            hoursPerWeek: 0,
            durationWeeks: 0,
        });
        setLearningPath(null);
        setCompletedWeeks(new Set());
        setViewMode('timeline');
        setError(null);
    }, []);

    const value = {
        // State
        userData,
        learningPath,
        viewMode,
        loading,
        error,
        completedWeeks,

        // Actions
        setUserData: updateUserData,
        setLearningPath,
        setViewMode,
        setLoading,
        setError,
        toggleWeekCompletion,
        calculateProgress,
        reset,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

AppProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
