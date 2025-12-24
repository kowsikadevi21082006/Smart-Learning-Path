import { useState } from 'react';
import PropTypes from 'prop-types';
import WeekCard from './WeekCard';
import QuizModal from './QuizModal';
import { useApp } from '../context/AppContext';

/**
 * TimelineView Component
 * 
 * Vertical timeline visualization of the learning path.
 * Shows connected week cards with progress indicators.
 */
const TimelineView = () => {
    const { learningPath } = useApp();
    const [quizModalOpen, setQuizModalOpen] = useState(false);
    const [selectedWeek, setSelectedWeek] = useState(null);

    if (!learningPath || !learningPath.weeks) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-400">No learning path available</p>
            </div>
        );
    }

    const handleGenerateQuiz = (week) => {
        setSelectedWeek(week);
        setQuizModalOpen(true);
    };

    return (
        <>
            <div className="relative max-w-4xl mx-auto">
                {/* Timeline Line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 gradient-bg-primary opacity-30 hidden md:block" />

                {/* Week Cards */}
                <div className="space-y-8">
                    {learningPath.weeks.map((week, index) => (
                        <div
                            key={week.id}
                            className="relative pl-0 md:pl-20 animate-slide-up"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Timeline Dot */}
                            <div className="hidden md:flex absolute left-6 top-6 w-5 h-5 gradient-bg-primary rounded-full shadow-glow border-4 border-gray-900" />

                            {/* Week Number Badge (Mobile) */}
                            <div className="md:hidden mb-3">
                                <span className="inline-block glass px-4 py-1 rounded-full text-sm font-semibold gradient-text">
                                    Week {week.weekNumber}
                                </span>
                            </div>

                            <WeekCard
                                week={week}
                                onGenerateQuiz={handleGenerateQuiz}
                            />
                        </div>
                    ))}
                </div>

                {/* Completion Message */}
                <div className="mt-12 text-center glass p-8 rounded-xl animate-slide-up">
                    <h3 className="text-2xl font-bold gradient-text mb-2">
                        🎯 You're on the right path!
                    </h3>
                    <p className="text-gray-400">
                        Complete all weeks to achieve your goal: {learningPath.goal}
                    </p>
                </div>
            </div>

            {/* Quiz Modal */}
            <QuizModal
                isOpen={quizModalOpen}
                onClose={() => {
                    setQuizModalOpen(false);
                    setSelectedWeek(null);
                }}
                week={selectedWeek}
            />
        </>
    );
};

TimelineView.propTypes = {};

export default TimelineView;
