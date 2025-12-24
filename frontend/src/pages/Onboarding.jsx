import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Zap, Target, TrendingUp } from 'lucide-react';
import OnboardingForm from '../components/OnboardingForm';
import { Button, Loader } from '../components/ui';
import { useApp } from '../context/AppContext';
import { mockLearningPath } from '../utils/mockData';

/**
 * Onboarding Page
 * 
 * Landing page with hero section and onboarding form.
 * Collects user data and generates personalized learning path.
 */
const Onboarding = () => {
    const navigate = useNavigate();
    const { setUserData, setLearningPath, setLoading, loading } = useApp();
    const [showForm, setShowForm] = useState(false);

    const handleComplete = async (userData) => {
        setUserData(userData);
        setLoading(true);

        try {
            // Simulate API call to generate learning path
            // In production, replace with: await generateLearningPath(userData);
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Use mock data for now
            setLearningPath(mockLearningPath);

            // Navigate to dashboard
            navigate('/dashboard');
        } catch (error) {
            console.error('Error generating learning path:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader
                    fullScreen
                    size="lg"
                    text="Generating your personalized learning path..."
                />
            </div>
        );
    }

    if (showForm) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="w-full max-w-4xl py-12">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold gradient-text mb-3">
                            Let's Build Your Path
                        </h1>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Answer a few questions to get your personalized learning roadmap
                        </p>
                    </div>
                    <OnboardingForm onComplete={handleComplete} />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="container mx-auto px-4 py-20">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Logo/Icon */}
                    <div className="mb-8 animate-slide-down">
                        <div className="inline-flex items-center justify-center w-20 h-20 gradient-bg-primary rounded-2xl shadow-glow">
                            <Sparkles size={40} />
                        </div>
                    </div>

                    {/* Headline */}
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-slide-up">
                        Smart Learning Path
                        <span className="block gradient-text mt-2">Generator</span>
                    </h1>

                    {/* Subheadline */}
                    <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '100ms' }}>
                        Move beyond static syllabi. Get a dynamic, time-bound roadmap that acts as your academic counselor,
                        understanding your goals and time constraints.
                    </p>

                    {/* CTA Button */}
                    <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
                        <Button
                            onClick={() => setShowForm(true)}
                            variant="primary"
                            size="lg"
                            icon={<Sparkles size={20} />}
                            className="text-lg px-8 py-4"
                        >
                            Start Your Journey
                        </Button>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-3 gap-6 mt-20 max-w-5xl mx-auto">
                    {[
                        {
                            icon: <Target size={32} />,
                            title: 'Goal-Oriented',
                            description: 'Paths tailored to your specific career goals and current skill level',
                            color: 'from-purple-500 to-blue-500',
                        },
                        {
                            icon: <Zap size={32} />,
                            title: 'Smart Resources',
                            description: 'Curated learning materials with specific search strings, not generic links',
                            color: 'from-blue-500 to-cyan-500',
                        },
                        {
                            icon: <TrendingUp size={32} />,
                            title: 'Prerequisite Reasoning',
                            description: 'Understand why each topic comes in a specific order to stay motivated',
                            color: 'from-pink-500 to-purple-500',
                        },
                    ].map((feature, index) => (
                        <div
                            key={index}
                            className="glass glass-hover p-6 rounded-xl animate-slide-up"
                            style={{ animationDelay: `${300 + index * 100}ms` }}
                        >
                            <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${feature.color} mb-4`}>
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* How It Works */}
                <div className="mt-24 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12 gradient-text">
                        How It Works
                    </h2>

                    <div className="space-y-6">
                        {[
                            {
                                step: 1,
                                title: 'Tell Us About You',
                                description: 'Share your current skills, target goal, and available time',
                            },
                            {
                                step: 2,
                                title: 'AI Generates Your Path',
                                description: 'Our AI creates a structured, week-by-week learning roadmap',
                            },
                            {
                                step: 3,
                                title: 'Learn & Track Progress',
                                description: 'Follow your timeline, access resources, and test your knowledge',
                            },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="flex gap-6 items-start animate-slide-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="flex-shrink-0 w-12 h-12 gradient-bg-primary rounded-full flex items-center justify-center font-bold text-lg shadow-glow">
                                    {item.step}
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-lg font-bold mb-1">{item.title}</h4>
                                    <p className="text-gray-400 text-sm">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Onboarding;
