import { useState } from 'react';
import PropTypes from 'prop-types';
import { ChevronDown, ChevronUp, Check, BookOpen, Youtube, FileText, Globe, Sparkles } from 'lucide-react';
import { Card, Button } from './ui';
import { useApp } from '../context/AppContext';

/**
 * WeekCard Component
 * 
 * Displays week information with expandable resources and quiz generation.
 * Shows topics, rationale, resources, and completion status.
 */
const WeekCard = ({ week, onGenerateQuiz }) => {
    const { completedWeeks, toggleWeekCompletion } = useApp();
    const [isExpanded, setIsExpanded] = useState(false);

    const isCompleted = completedWeeks.has(week.id);

    // Get icon for resource type
    const getResourceIcon = (type) => {
        const icons = {
            youtube: <Youtube size={16} className="text-red-400" />,
            article: <FileText size={16} className="text-blue-400" />,
            documentation: <BookOpen size={16} className="text-green-400" />,
            default: <Globe size={16} className="text-purple-400" />,
        };
        return icons[type] || icons.default;
    };

    return (
        <Card
            className={`
        relative
        transition-all duration-300
        ${isCompleted ? 'border-green-500/30 bg-green-500/5' : ''}
      `}
        >
            {/* Completion Badge */}
            <div className="absolute -top-3 -right-3">
                <button
                    onClick={() => toggleWeekCompletion(week.id)}
                    className={`
            w-10 h-10 rounded-full
            flex items-center justify-center
            transition-all duration-300
            ${isCompleted
                            ? 'gradient-bg-primary shadow-glow'
                            : 'glass hover:glass-hover'
                        }
          `}
                    aria-label={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
                >
                    {isCompleted && <Check size={20} />}
                </button>
            </div>

            {/* Header */}
            <div className="mb-4">
                <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-semibold glass px-3 py-1 rounded-full gradient-text">
                        Week {week.weekNumber}
                    </span>
                    <span className="text-xs text-gray-400">
                        ~{week.estimatedHours} hours
                    </span>
                </div>
                <h3 className="text-xl font-bold mb-2">{week.title}</h3>
            </div>

            {/* Topics */}
            <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-400 mb-2">Topics Covered:</h4>
                <ul className="space-y-2">
                    {week.topics.map((topic, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                            <span className="text-purple-400 mt-1">•</span>
                            <span className="text-gray-300">{topic}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Why This First? */}
            <div className="glass p-4 rounded-lg mb-4">
                <div className="flex items-start gap-2">
                    <Sparkles size={16} className="text-yellow-400 mt-1 flex-shrink-0" />
                    <div>
                        <h4 className="text-sm font-semibold text-yellow-400 mb-1">
                            Why this first?
                        </h4>
                        <p className="text-sm text-gray-300 leading-relaxed">
                            {week.whyThisFirst}
                        </p>
                    </div>
                </div>
            </div>

            {/* Resources Section */}
            <div className="border-t border-white/10 pt-4">
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="w-full flex items-center justify-between text-sm font-semibold hover:text-purple-400 transition-colors mb-3"
                >
                    <span>Learning Resources ({week.resources.length})</span>
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>

                {isExpanded && (
                    <div className="space-y-3 animate-slide-down">
                        {week.resources.map((resource) => (
                            <a
                                key={resource.id}
                                href={resource.url || `https://google.com/search?q=${encodeURIComponent(resource.searchString)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block glass p-3 rounded-lg hover:glass-hover transition-all"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="mt-1">
                                        {getResourceIcon(resource.type)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h5 className="text-sm font-semibold mb-1 truncate">
                                            {resource.title}
                                        </h5>
                                        <p className="text-xs text-gray-400 mb-2">
                                            🔍 {resource.searchString || 'Direct link'}
                                        </p>
                                        {resource.estimatedTime && (
                                            <span className="text-xs text-gray-500">
                                                ⏱️ {resource.estimatedTime}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                )}
            </div>

            {/* Quiz Button */}
            <div className="mt-4 pt-4 border-t border-white/10">
                <Button
                    onClick={() => onGenerateQuiz(week)}
                    variant="secondary"
                    size="sm"
                    className="w-full"
                    icon={<BookOpen size={16} />}
                >
                    Generate Quiz
                </Button>
            </div>
        </Card>
    );
};

WeekCard.propTypes = {
    week: PropTypes.shape({
        id: PropTypes.string.isRequired,
        weekNumber: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        topics: PropTypes.arrayOf(PropTypes.string).isRequired,
        whyThisFirst: PropTypes.string.isRequired,
        estimatedHours: PropTypes.number.isRequired,
        resources: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                type: PropTypes.string.isRequired,
                title: PropTypes.string.isRequired,
                searchString: PropTypes.string,
                estimatedTime: PropTypes.string,
                url: PropTypes.string,
            })
        ).isRequired,
    }).isRequired,
    onGenerateQuiz: PropTypes.func.isRequired,
};

export default WeekCard;
