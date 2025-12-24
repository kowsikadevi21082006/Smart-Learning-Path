import { Heart, Github, Linkedin, Mail, Globe, Sparkles } from 'lucide-react';

/**
 * Footer Component
 * 
 * Elegant footer with creator attribution and social links.
 * Uses glassmorphism design to match app aesthetic.
 */
const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerStyle = {
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0.05) 100%)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    };

    return (
        <footer className="mt-auto" style={footerStyle}>
            <div className="container mx-auto px-4 py-10">
                {/* Main Footer Content */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-8">
                    {/* Left Side - Creator Info with Enhanced Design */}
                    <div className="flex flex-col items-center lg:items-start gap-3">
                        <div className="flex items-center gap-3">
                            <div className="p-2 gradient-bg-primary rounded-lg shadow-glow">
                                <Sparkles size={20} className="animate-pulse" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 text-base mb-1">
                                    <span className="text-gray-400">Crafted with</span>
                                    <Heart
                                        size={18}
                                        className="text-pink-500 animate-pulse"
                                        fill="currentColor"
                                    />
                                    <span className="text-gray-400">by</span>
                                    <span className="font-bold gradient-text-vibrant text-xl">Kowsika</span>
                                </div>
                                <p className="text-xs text-gray-500 text-center lg:text-left">
                                    © {currentYear} Smart Learning Path Generator
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Center - Tagline with Better Styling */}
                    <div className="text-center max-w-md">
                        <p className="text-sm text-gray-300 italic leading-relaxed">
                            "Empowering learners worldwide with intelligent,
                            personalized education pathways"
                        </p>
                        <div className="flex items-center justify-center gap-2 mt-2">
                            <div className="h-px w-8 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
                            <span className="text-xs text-purple-400">✨</span>
                            <div className="h-px w-8 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
                        </div>
                    </div>

                    {/* Right Side - Social Links with Enhanced Styling */}
                    <div className="flex flex-col items-center lg:items-end gap-3">
                        <p className="text-sm text-gray-400 font-medium">Let's Connect</p>
                        <div className="flex gap-3">
                            {[
                                { icon: Github, label: 'GitHub', href: '#', color: 'hover:bg-purple-500/20' },
                                { icon: Linkedin, label: 'LinkedIn', href: '#', color: 'hover:bg-blue-500/20' },
                                { icon: Mail, label: 'Email', href: 'mailto:kowsika@example.com', color: 'hover:bg-pink-500/20' },
                                { icon: Globe, label: 'Website', href: '#', color: 'hover:bg-cyan-500/20' },
                            ].map((social, index) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={index}
                                        href={social.href}
                                        aria-label={social.label}
                                        className={`p-3 glass rounded-xl transition-all duration-300 hover:scale-110 hover:-translate-y-1 group ${social.color}`}
                                        target={social.href.startsWith('http') ? '_blank' : undefined}
                                        rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    >
                                        <Icon
                                            size={20}
                                            className="text-gray-400 group-hover:text-white transition-colors"
                                        />
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/10"></div>
                    </div>
                    <div className="relative flex justify-center">
                        <span className="px-4 text-xs text-gray-600 glass rounded-full py-1">
                            All Rights Reserved
                        </span>
                    </div>
                </div>

                {/* Bottom Links */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-xs text-gray-500">
                    <a href="#" className="hover:text-purple-400 transition-colors hover:underline">Privacy Policy</a>
                    <span className="hidden sm:inline text-gray-700">|</span>
                    <a href="#" className="hover:text-purple-400 transition-colors hover:underline">Terms of Service</a>
                    <span className="hidden sm:inline text-gray-700">|</span>
                    <a href="#" className="hover:text-purple-400 transition-colors hover:underline">About Us</a>
                    <span className="hidden sm:inline text-gray-700">|</span>
                    <a href="#" className="hover:text-purple-400 transition-colors hover:underline">Contact</a>
                </div>

                {/* Small Print */}
                <div className="mt-6 text-center">
                    <p className="text-xs text-gray-600">
                        Built with React, Vite, and TailwindCSS • Powered by AI
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

