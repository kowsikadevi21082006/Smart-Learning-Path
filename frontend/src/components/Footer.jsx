import { Heart, Github, Linkedin, Mail, Globe } from 'lucide-react';

/**
 * Footer Component
 * 
 * Clean and simple footer with creator attribution.
 */
const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="mt-auto border-t border-white/10">
            <div className="container mx-auto px-4 py-8">
                {/* Main Footer - Single Row */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
                    {/* Left - Creator Attribution */}
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400">Created with</span>
                        <Heart
                            size={16}
                            className="text-pink-500"
                            fill="currentColor"
                        />
                        <span className="text-sm text-gray-400">by</span>
                        <span className="font-bold gradient-text text-lg">Kowsika</span>
                    </div>

                    {/* Center - Copyright */}
                    <div className="text-center">
                        <p className="text-xs text-gray-500">
                            © {currentYear} Smart Learning Path Generator
                        </p>
                    </div>

                    {/* Right - Social Links */}
                    <div className="flex items-center gap-3">
                        {[
                            { icon: Github, label: 'GitHub', href: '#' },
                            { icon: Linkedin, label: 'LinkedIn', href: '#' },
                            { icon: Mail, label: 'Email', href: 'mailto:kowsika@example.com' },
                            { icon: Globe, label: 'Website', href: '#' },
                        ].map((social, index) => {
                            const Icon = social.icon;
                            return (
                                <a
                                    key={index}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="p-2 glass-hover rounded-lg transition-all duration-300 hover:scale-110"
                                    target={social.href.startsWith('http') ? '_blank' : undefined}
                                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                >
                                    <Icon
                                        size={18}
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                    />
                                </a>
                            );
                        })}
                    </div>
                </div>

                {/* Bottom Links */}
                <div className="text-center border-t border-white/5 pt-4">
                    <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500">
                        <a href="#" className="hover:text-purple-400 transition-colors">Privacy</a>
                        <span>•</span>
                        <a href="#" className="hover:text-purple-400 transition-colors">Terms</a>
                        <span>•</span>
                        <a href="#" className="hover:text-purple-400 transition-colors">Contact</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

