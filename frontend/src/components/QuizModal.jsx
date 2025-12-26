import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Loader } from './ui';

/**
 * QuizModal Component
 * 
 * Interactive quiz interface with multiple-choice questions.
 * Shows immediate feedback and final score.
 */
import { generateQuiz } from '../services/apiService';

/**
 * QuizModal Component
 * 
 * Interactive quiz interface with multiple-choice questions.
 * Shows immediate feedback and final score.
 */
const QuizModal = ({ isOpen, onClose, week }) => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [loading, setLoading] = useState(false);

    // Fetch quiz questions when modal opens
    useEffect(() => {
        const fetchQuiz = async () => {
            if (isOpen && week) {
                setLoading(true);
                try {
                    const response = await generateQuiz(week.weekNumber, week.topics);
                    // Map backend response to frontend format
                    if (response.questions) {
                        const mappedQuestions = response.questions.map((q, index) => ({
                            id: `q-${index}`,
                            question: q.question,
                            options: q.options.map(o => o.text),
                            correctAnswer: q.options.findIndex(o => o.is_correct),
                            explanation: q.explanation
                        }));
                        setQuestions(mappedQuestions);
                    }
                } catch (error) {
                    console.error("Failed to generate quiz:", error);
                    // Fallback to empty or error state
                } finally {
                    setLoading(false);
                    // Reset state
                    setCurrentQuestion(0);
                    setSelectedAnswers({});
                    setShowResults(false);
                }
            }
        };

        fetchQuiz();
    }, [isOpen, week]);

    // Handle answer selection
    const selectAnswer = (questionId, answerIndex) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [questionId]: answerIndex,
        });
    };

    // Navigate to next question
    const nextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    // Navigate to previous question
    const previousQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    // Calculate score
    const calculateScore = () => {
        let correct = 0;
        questions.forEach((q) => {
            if (selectedAnswers[q.id] === q.correctAnswer) {
                correct++;
            }
        });
        return correct;
    };

    // Submit quiz
    const submitQuiz = () => {
        setShowResults(true);
    };

    // Reset quiz
    const resetQuiz = () => {
        setCurrentQuestion(0);
        setSelectedAnswers({});
        setShowResults(false);
    };

    // Close and reset
    const handleClose = () => {
        resetQuiz();
        onClose();
    };

    if (!week || questions.length === 0) {
        return (
            <Modal isOpen={isOpen} onClose={onClose} title="Quiz Generator" size="md">
                <div className="text-center py-8">
                    <p className="text-gray-400">No quiz available for this week yet.</p>
                </div>
            </Modal>
        );
    }

    const currentQ = questions[currentQuestion];
    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title={`Week ${week.weekNumber} Quiz`}
            size="lg"
            showCloseButton={!loading}
        >
            {loading ? (
                <div className="py-12">
                    <Loader size="lg" text="Generating quiz questions..." />
                </div>
            ) : showResults ? (
                /* Results View */
                <div className="text-center py-8">
                    <div className="mb-6">
                        <div className={`
              inline-flex items-center justify-center
              w-32 h-32 rounded-full
              ${percentage >= 70 ? 'gradient-bg-primary' : 'glass'}
              shadow-glow
            `}>
                            <div className="text-center">
                                <div className="text-4xl font-bold">{percentage}%</div>
                                <div className="text-sm text-gray-300">Score</div>
                            </div>
                        </div>
                    </div>

                    <h3 className="text-2xl font-bold mb-2">
                        {percentage >= 80 ? '🎉 Excellent!' : percentage >= 60 ? '👍 Good Job!' : '💪 Keep Learning!'}
                    </h3>
                    <p className="text-gray-400 mb-6">
                        You got {score} out of {questions.length} questions correct
                    </p>

                    {/* Answer Review */}
                    <div className="text-left space-y-4 mb-6">
                        {questions.map((q, index) => {
                            const userAnswer = selectedAnswers[q.id];
                            const isCorrect = userAnswer === q.correctAnswer;

                            return (
                                <div key={q.id} className="glass p-4 rounded-lg">
                                    <div className="flex items-start gap-2 mb-2">
                                        <span className={`
                      flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                      ${isCorrect ? 'bg-green-500' : 'bg-red-500'}
                    `}>
                                            {isCorrect ? '✓' : '✗'}
                                        </span>
                                        <p className="text-sm font-semibold flex-1">{q.question}</p>
                                    </div>

                                    <div className="ml-8 space-y-1">
                                        <p className="text-xs text-gray-400">
                                            Your answer: <span className={isCorrect ? 'text-green-400' : 'text-red-400'}>
                                                {q.options[userAnswer]}
                                            </span>
                                        </p>
                                        {!isCorrect && (
                                            <p className="text-xs text-gray-400">
                                                Correct answer: <span className="text-green-400">
                                                    {q.options[q.correctAnswer]}
                                                </span>
                                            </p>
                                        )}
                                        {q.explanation && (
                                            <p className="text-xs text-gray-300 mt-2 italic">
                                                💡 {q.explanation}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="flex gap-3 justify-center">
                        <Button onClick={resetQuiz} variant="secondary">
                            Retry Quiz
                        </Button>
                        <Button onClick={handleClose} variant="primary">
                            Close
                        </Button>
                    </div>
                </div>
            ) : (
                /* Quiz View */
                <div>
                    {/* Progress */}
                    <div className="mb-6">
                        <div className="flex justify-between text-sm text-gray-400 mb-2">
                            <span>Question {currentQuestion + 1} of {questions.length}</span>
                            <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete</span>
                        </div>
                        <div className="w-full h-2 glass rounded-full overflow-hidden">
                            <div
                                className="h-full gradient-bg-primary transition-all duration-300"
                                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                            />
                        </div>
                    </div>

                    {/* Question */}
                    <div className="mb-6">
                        <h3 className="text-lg font-bold mb-4">{currentQ.question}</h3>

                        <div className="space-y-3">
                            {currentQ.options.map((option, index) => {
                                const isSelected = selectedAnswers[currentQ.id] === index;

                                return (
                                    <button
                                        key={index}
                                        onClick={() => selectAnswer(currentQ.id, index)}
                                        className={`
                      w-full p-4 rounded-lg text-left transition-all
                      ${isSelected
                                                ? 'glass-hover gradient-bg-primary text-white'
                                                : 'glass hover:glass-hover'
                                            }
                    `}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`
                        w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0
                        ${isSelected ? 'border-white' : 'border-gray-400'}
                      `}>
                                                {isSelected && <div className="w-3 h-3 rounded-full bg-white" />}
                                            </div>
                                            <span className="text-sm">{option}</span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-between pt-4 border-t border-white/10">
                        <Button
                            onClick={previousQuestion}
                            variant="ghost"
                            disabled={currentQuestion === 0}
                        >
                            Previous
                        </Button>

                        {currentQuestion === questions.length - 1 ? (
                            <Button
                                onClick={submitQuiz}
                                variant="primary"
                                disabled={Object.keys(selectedAnswers).length < questions.length}
                            >
                                Submit Quiz
                            </Button>
                        ) : (
                            <Button
                                onClick={nextQuestion}
                                variant="primary"
                            >
                                Next
                            </Button>
                        )}
                    </div>
                </div>
            )}
        </Modal>
    );
};

QuizModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    week: PropTypes.shape({
        id: PropTypes.string,
        weekNumber: PropTypes.number,
    }),
};

export default QuizModal;
