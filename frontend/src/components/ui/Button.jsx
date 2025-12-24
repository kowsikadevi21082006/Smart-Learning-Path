import PropTypes from 'prop-types';

/**
 * Button Component
 * 
 * A versatile, accessible button with multiple variants and states.
 * Supports icons, loading state, and keyboard navigation.
 */
const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    icon,
    iconPosition = 'left',
    loading = false,
    disabled = false,
    className = '',
    onClick,
    type = 'button',
    ...rest
}) => {
    // Variant styles
    const variants = {
        primary: 'gradient-bg-primary text-white shadow-lg hover:shadow-xl hover:shadow-purple-500/20',
        secondary: 'border-2 border-purple-500 text-purple-400 hover:bg-purple-500/10',
        ghost: 'text-purple-400 hover:bg-purple-500/10',
        danger: 'bg-red-500 text-white hover:bg-red-600',
    };

    // Size styles
    const sizes = {
        sm: 'text-xs py-2 px-3',
        md: 'text-sm py-2.5 px-6',
        lg: 'text-base py-3 px-8',
    };

    const baseClasses = 'btn transition-all duration-300 transform active:scale-95';
    const variantClasses = variants[variant] || variants.primary;
    const sizeClasses = sizes[size] || sizes.md;
    const disabledClasses = (disabled || loading) ? 'opacity-50 cursor-not-allowed' : 'hover:-translate-y-0.5';

    return (
        <button
            type={type}
            className={`${baseClasses} ${variantClasses} ${sizeClasses} ${disabledClasses} ${className}`}
            onClick={onClick}
            disabled={disabled || loading}
            {...rest}
        >
            {loading ? (
                <>
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Loading...</span>
                </>
            ) : (
                <>
                    {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
                    <span>{children}</span>
                    {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
                </>
            )}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['primary', 'secondary', 'ghost', 'danger']),
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    icon: PropTypes.node,
    iconPosition: PropTypes.oneOf(['left', 'right']),
    loading: PropTypes.bool,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    onClick: PropTypes.func,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

export default Button;
