import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, Calendar, Target, RotateCcw, Download } from 'lucide-react';
import { Button, Card } from '../components/ui';
import TimelineView from '../components/TimelineView';
import { useApp } from '../context/AppContext';

/**
 * Dashboard Page
 * 
 * Main view displaying the generated learning path.
 * Shows progress stats and timeline visualization.
 */
const Dashboard = () => {
    const navigate = useNavigate();
    const { learningPath, userData, calculateProgress, reset } = useApp();
    const [viewMode] = useState('timeline'); // Can add 'kanban' later

    // Redirect if no learning path
    if (!learningPath) {
        navigate('/');
        return null;
    }

    const progress = calculateProgress();

    const handleReset = () => {
        if (window.confirm('Are you sure you want to start over? This will clear your current progress.')) {
            reset();
            navigate('/');
        }
    };

    return (
        <div className="min-h-screen py-8">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                                Your Learning Path
                            </h1>
                            <p className="text-gray-400">
                                {learningPath.goal}
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <Button
                                variant="ghost"
                                size="sm"
                                icon={<Download size={16} />}
                                onClick={() => {
                                    // Export functionality can be added here
                                    alert('Export feature coming soon!');
                                }}
                            >
                                Export
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                icon={<RotateCcw size={16} />}
                                onClick={handleReset}
                            >
                                Start Over
                            </Button>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Progress */}
                        <Card className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 gradient-bg-primary rounded-lg">
                                    <BarChart3 size={24} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-400 mb-1">Progress</p>
                                    <div className="flex items-baseline gap-2">
                                        <p className="text-2xl font-bold gradient-text">
                                            {Math.round(progress)}%
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3 w-full h-2 glass rounded-full overflow-hidden">
                                <div
                                    className="h-full gradient-bg-primary transition-all duration-500"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </Card>

                        {/* Duration */}
                        <Card className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
                                    <Calendar size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400 mb-1">Duration</p>
                                    <p className="text-2xl font-bold">
                                        {learningPath.weeks.length} Weeks
                                    </p>
                                </div>
                            </div>
                        </Card>

                        {/* Total Hours */}
                        <Card className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg">
                                    <Target size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400 mb-1">Total Hours</p>
                                    <p className="text-2xl font-bold">
                                        {learningPath.totalHours || (userData.hoursPerWeek * userData.durationWeeks)}
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Prerequisites & Outcomes */}
                {(learningPath.prerequisites || learningPath.outcomes) && (
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        {learningPath.prerequisites && (
                            <Card className="p-6">
                                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                    <span className="text-2xl">📚</span>
                                    Prerequisites
                                </h3>
                                <ul className="space-y-2">
                                    {learningPath.prerequisites.map((item, index) => (
                                        <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                                            <span className="text-purple-400 mt-1">•</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </Card>
                        )}

                        {learningPath.outcomes && (
                            <Card className="p-6">
                                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                    <span className="text-2xl">🎯</span>
                                    What You'll Achieve
                                </h3>
                                <ul className="space-y-2">
                                    {learningPath.outcomes.map((item, index) => (
                                        <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                                            <span className="text-purple-400 mt-1">•</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </Card>
                        )}
                    </div>
                )}

                {/* Learning Path Content */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold">Your Roadmap</h2>
                        {/* View mode toggle can be added here for kanban/timeline */}
                    </div>

                    {viewMode === 'timeline' && <TimelineView />}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
