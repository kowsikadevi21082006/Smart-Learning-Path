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
                        <h1 className="text-4xl md:text-5xl font-bold gradient-text-vibrant mb-3">
                            Let's Build Your Path
                        </h1>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Answer a few quick questions and let our AI craft a learning roadmap designed specifically for you
                        </p>
                    </div>
                    <OnboardingForm onComplete={handleComplete} />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Hero Section */}
            <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
                <div className="max-w-5xl mx-auto">
                    {/* Logo Section - Perfectly Centered and Flexible */}
                    <div className="flex flex-col items-center justify-center mb-12 animate-slide-down">
                        <div className="relative group">
                            {/* Glow effect behind logo */}
                            <div className="absolute inset-0 gradient-bg-primary rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>

                            {/* Main Logo Container */}
                            <div className="relative inline-flex items-center justify-center w-28 h-28 md:w-32 md:h-32 gradient-bg-primary rounded-3xl shadow-glow animate-float">
                                <Sparkles size={56} className="animate-glow-pulse text-white" />
                            </div>
                        </div>

                        {/* Brand Name Under Logo */}
                        <div className="mt-6 text-center">
                            <div className="inline-block px-6 py-2 glass rounded-full">
                                <p className="text-sm font-semibold gradient-text-vibrant tracking-wide">
                                    SMART LEARNING PATH
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Main Headline - Centered and Beautiful */}
                    <div className="text-center mb-8 animate-slide-up">
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
                            <span className="block text-white mb-2">Your Personal</span>
                            <span className="block gradient-text-vibrant">Learning Journey</span>
                            <span className="block text-white text-3xl md:text-4xl lg:text-5xl mt-4 font-semibold">
                                Starts Here
                            </span>
                        </h1>
                    </div>

                    {/* Subheadline - Enhanced Description */}
                    <div className="text-center mb-12 animate-slide-up" style={{ animationDelay: '100ms' }}>
                        <p className="text-lg md:text-2xl text-gray-300 mb-6 max-w-4xl mx-auto leading-relaxed font-light">
                            Transform your learning journey with <span className="gradient-text font-semibold">AI-powered personalization</span>.
                            Get a comprehensive, week-by-week roadmap tailored to your goals,
                            current skill level, and available time—like having a personal academic advisor
                            available 24/7.
                        </p>

                        {/* Trust Indicators */}
                        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400 mt-8">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                <span>AI-Powered</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                                <span>100% Personalized</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
                                <span>Free Forever</span>
                            </div>
                        </div>
                    </div>

                    {/* CTA Button - Enhanced and Centered */}
                    <div className="flex justify-center mb-20 animate-slide-up" style={{ animationDelay: '200ms' }}>
                        <Button
                            onClick={() => setShowForm(true)}
                            variant="primary"
                            size="lg"
                            icon={<Sparkles size={24} />}
                            className="text-xl px-12 py-6 shadow-glow-hover transform hover:scale-105 transition-all duration-300 font-bold"
                        >
                            Start Your Journey Free
                        </Button>
                    </div>

                    {/* Features Grid - Beautiful Cards */}
                    <div className="grid md:grid-cols-3 gap-6 mb-24">
                        {[
                            {
                                icon: <Target size={40} />,
                                title: 'Goal-Oriented Learning',
                                description: 'Personalized roadmaps designed around your unique career aspirations, current expertise, and learning pace—no two paths are the same',
                                color: 'from-purple-500 to-blue-500',
                            },
                            {
                                icon: <Zap size={40} />,
                                title: 'Smart Resource Curation',
                                description: 'Handpicked learning materials with precise search strings and actionable resources—skip the endless Googling and focus on learning',
                                color: 'from-blue-500 to-cyan-500',
                            },
                            {
                                icon: <TrendingUp size={40} />,
                                title: 'Prerequisite Reasoning',
                                description: 'Every topic is sequenced logically with clear explanations of why it matters—stay motivated by understanding the "why" behind each step',
                                color: 'from-pink-500 to-purple-500',
                            },
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="glass-strong glass-hover p-8 rounded-2xl animate-slide-up group"
                                style={{ animationDelay: `${300 + index * 100}ms` }}
                            >
                                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.color} mb-6 shadow-glow group-hover:scale-110 transition-transform duration-300`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-3 text-white">{feature.title}</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* How It Works Section - Enhanced */}
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl md:text-5xl font-bold gradient-text-vibrant mb-4">
                                How It Works
                            </h2>
                            <p className="text-gray-400 text-lg">
                                Three simple steps to your personalized learning path
                            </p>
                        </div>

                        <div className="space-y-8">
                            {[
                                {
                                    step: 1,
                                    title: 'Tell Us About You',
                                    description: 'Share your current skill level, learning goals, and the time you can dedicate—takes just 2 minutes',
                                },
                                {
                                    step: 2,
                                    title: 'AI Generates Your Path',
                                    description: 'Our advanced AI analyzes your input and creates a customized, week-by-week learning roadmap with clear milestones',
                                },
                                {
                                    step: 3,
                                    title: 'Learn & Track Progress',
                                    description: 'Follow your personalized timeline, access curated resources, take knowledge checks, and watch your skills grow week by week',
                                },
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="flex gap-6 items-start glass-strong p-6 rounded-2xl animate-slide-up hover:scale-[1.02] transition-transform duration-300"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className="flex-shrink-0 w-16 h-16 gradient-bg-primary rounded-2xl flex items-center justify-center font-black text-2xl shadow-glow">
                                        {item.step}
                                    </div>
                                    <div className="flex-1 pt-2">
                                        <h4 className="text-xl font-bold mb-2 text-white">{item.title}</h4>
                                        <p className="text-gray-400 leading-relaxed">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Onboarding;
