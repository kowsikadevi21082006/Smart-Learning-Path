import { useState } from 'react';
import PropTypes from 'prop-types';
import { Sparkles, Target, Clock, ArrowRight, ArrowLeft, X } from 'lucide-react';
import { Button, Input, Card } from './ui';

/**
 * OnboardingForm Component
 * 
 * Multi-step form for collecting user data: skills, goals, and time commitment.
 * Features smooth animations, validation, and progress tracking.
 */
const OnboardingForm = ({ onComplete }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        currentSkills: [],
        targetGoal: '',
        hoursPerWeek: '',
        durationWeeks: '',
    });
    const [skillInput, setSkillInput] = useState('');
    const [errors, setErrors] = useState({});

    const steps = [
        {
            id: 0,
            title: 'Current Skills',
            description: 'Tell us what you already know',
            icon: <Sparkles className="w-6 h-6" />,
        },
        {
            id: 1,
            title: 'Target Goal',
            description: 'What do you want to achieve?',
            icon: <Target className="w-6 h-6" />,
        },
        {
            id: 2,
            title: 'Time Commitment',
            description: 'How much time can you dedicate?',
            icon: <Clock className="w-6 h-6" />,
        },
    ];

    // Add skill tag
    const addSkill = () => {
        if (skillInput.trim() && !formData.currentSkills.includes(skillInput.trim())) {
            setFormData({
                ...formData,
                currentSkills: [...formData.currentSkills, skillInput.trim()],
            });
            setSkillInput('');
            setErrors({ ...errors, currentSkills: '' });
        }
    };

    // Remove skill tag
    const removeSkill = (skillToRemove) => {
        setFormData({
            ...formData,
            currentSkills: formData.currentSkills.filter(skill => skill !== skillToRemove),
        });
    };

    // Validate current step
    const validateStep = () => {
        const newErrors = {};

        if (currentStep === 0 && formData.currentSkills.length === 0) {
            newErrors.currentSkills = 'Please add at least one skill';
        }

        if (currentStep === 1 && !formData.targetGoal.trim()) {
            newErrors.targetGoal = 'Please describe your target goal';
        }

        if (currentStep === 2) {
            if (!formData.hoursPerWeek || formData.hoursPerWeek <= 0) {
                newErrors.hoursPerWeek = 'Please enter valid hours per week';
            }
            if (!formData.durationWeeks || formData.durationWeeks <= 0) {
                newErrors.durationWeeks = 'Please enter valid duration';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle next button
    const handleNext = () => {
        if (validateStep()) {
            if (currentStep < steps.length - 1) {
                setCurrentStep(currentStep + 1);
            } else {
                handleSubmit();
            }
        }
    };

    // Handle submit
    const handleSubmit = () => {
        onComplete({
            ...formData,
            hoursPerWeek: parseInt(formData.hoursPerWeek),
            durationWeeks: parseInt(formData.durationWeeks),
        });
    };

    // Handle Enter key for skill input
    const handleSkillKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addSkill();
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            {/* Progress Indicator */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    {steps.map((step, index) => (
                        <div
                            key={step.id}
                            className="flex items-center"
                        >
                            <div
                                className={`
                  flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300
                  ${index <= currentStep
                                        ? 'gradient-bg-primary text-white shadow-glow'
                                        : 'glass text-gray-400'
                                    }
                `}
                            >
                                {index < currentStep ? (
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    step.icon
                                )}
                            </div>
                            {index < steps.length - 1 && (
                                <div
                                    className={`
                    w-20 h-1 mx-2 rounded transition-all duration-300
                    ${index < currentStep ? 'gradient-bg-primary' : 'bg-gray-700'}
                  `}
                                />
                            )}
                        </div>
                    ))}
                </div>
                <div className="text-center">
                    <h3 className="text-xl font-bold gradient-text mb-2">
                        {steps[currentStep].title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                        {steps[currentStep].description}
                    </p>
                </div>
            </div>

            {/* Form Content */}
            <Card className="p-8 animate-fade-in">
                {/* Step 0: Current Skills */}
                {currentStep === 0 && (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-300">
                                What skills do you already have?
                            </label>
                            <div className="flex gap-2">
                                <Input
                                    type="text"
                                    value={skillInput}
                                    onChange={(e) => setSkillInput(e.target.value)}
                                    onKeyPress={handleSkillKeyPress}
                                    placeholder="e.g., HTML, CSS, JavaScript"
                                    className="flex-1"
                                />
                                <Button onClick={addSkill} variant="secondary" size="md">
                                    Add
                                </Button>
                            </div>
                            {errors.currentSkills && (
                                <p className="text-red-400 text-sm mt-2">{errors.currentSkills}</p>
                            )}
                        </div>

                        {/* Skills Tags */}
                        {formData.currentSkills.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {formData.currentSkills.map((skill, index) => (
                                    <div
                                        key={index}
                                        className="glass px-3 py-2 rounded-lg flex items-center gap-2 animate-scale-in"
                                    >
                                        <span className="text-sm">{skill}</span>
                                        <button
                                            onClick={() => removeSkill(skill)}
                                            className="text-gray-400 hover:text-red-400 transition-colors"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Step 1: Target Goal */}
                {currentStep === 1 && (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-300">
                                What's your learning goal?
                            </label>
                            <textarea
                                value={formData.targetGoal}
                                onChange={(e) => setFormData({ ...formData, targetGoal: e.target.value })}
                                placeholder="e.g., I want to build a full-stack SaaS application"
                                rows="4"
                                className="input w-full resize-none"
                            />
                            {errors.targetGoal && (
                                <p className="text-red-400 text-sm mt-2">{errors.targetGoal}</p>
                            )}
                        </div>
                        <div className="glass p-4 rounded-lg">
                            <p className="text-sm text-gray-400">
                                💡 <strong>Tip:</strong> Be specific! Instead of "learn React", try "build an e-commerce website with React and Node.js"
                            </p>
                        </div>
                    </div>
                )}

                {/* Step 2: Time Commitment */}
                {currentStep === 2 && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-300">
                                    Hours per week
                                </label>
                                <Input
                                    type="number"
                                    min="1"
                                    max="40"
                                    value={formData.hoursPerWeek}
                                    onChange={(e) => setFormData({ ...formData, hoursPerWeek: e.target.value })}
                                    placeholder="e.g., 6"
                                    error={errors.hoursPerWeek}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-300">
                                    Duration (weeks)
                                </label>
                                <Input
                                    type="number"
                                    min="1"
                                    max="52"
                                    value={formData.durationWeeks}
                                    onChange={(e) => setFormData({ ...formData, durationWeeks: e.target.value })}
                                    placeholder="e.g., 4"
                                    error={errors.durationWeeks}
                                />
                            </div>
                        </div>

                        {formData.hoursPerWeek && formData.durationWeeks && (
                            <div className="glass p-4 rounded-lg">
                                <p className="text-sm text-gray-300">
                                    📊 Total learning time: <span className="font-bold gradient-text">
                                        {formData.hoursPerWeek * formData.durationWeeks} hours
                                    </span> over {formData.durationWeeks} weeks
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
                    <Button
                        onClick={() => setCurrentStep(currentStep - 1)}
                        variant="ghost"
                        disabled={currentStep === 0}
                        icon={<ArrowLeft size={18} />}
                        iconPosition="left"
                    >
                        Previous
                    </Button>

                    <Button
                        onClick={handleNext}
                        variant="primary"
                        icon={currentStep === steps.length - 1 ? <Sparkles size={18} /> : <ArrowRight size={18} />}
                        iconPosition="right"
                    >
                        {currentStep === steps.length - 1 ? 'Generate Path' : 'Next'}
                    </Button>
                </div>
            </Card>
        </div>
    );
};

OnboardingForm.propTypes = {
    onComplete: PropTypes.func.isRequired,
};

export default OnboardingForm;
