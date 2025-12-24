import PropTypes from 'prop-types';

/**
 * Loader Component
 * 
 * Beautiful loading spinner with gradient colors and animations.
 * Supports both full-page and inline variants.
 */
const Loader = ({ size = 'md', fullScreen = false, text = '' }) => {
    const sizes = {
        sm: 'w-6 h-6 border-2',
        md: 'w-10 h-10 border-3',
        lg: 'w-16 h-16 border-4',
    };

    const spinnerClasses = `
    ${sizes[size]}
    rounded-full
    border-t-purple-500
    border-r-blue-500
    border-b-pink-500
    border-l-transparent
    animate-spin
  `;

    const content = (
        <div className="flex flex-col items-center justify-center gap-4">
            <div className={spinnerClasses} />
            {text && (
                <p className="text-sm text-gray-400 animate-pulse">
                    {text}
                </p>
            )}
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                {content}
            </div>
        );
    }

    return content;
};

Loader.propTypes = {
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    fullScreen: PropTypes.bool,
    text: PropTypes.string,
};

export default Loader;
