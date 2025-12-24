import PropTypes from 'prop-types';

/**
 * Card Component
 * 
 * A glassmorphic card with hover effects and optional header/footer.
 * Perfect for displaying content with premium aesthetics.
 */
const Card = ({
    children,
    header,
    footer,
    hoverable = true,
    className = '',
    onClick,
    ...rest
}) => {
    const baseClasses = 'card glass';
    const hoverClasses = hoverable ? 'glass-hover cursor-pointer' : '';
    const clickableClasses = onClick ? 'cursor-pointer' : '';

    return (
        <div
            className={`${baseClasses} ${hoverClasses} ${clickableClasses} ${className}`}
            onClick={onClick}
            {...rest}
        >
            {/* Header */}
            {header && (
                <div className="border-b border-white/10 pb-4 mb-4">
                    {header}
                </div>
            )}

            {/* Main Content */}
            <div className="flex-1">
                {children}
            </div>

            {/* Footer */}
            {footer && (
                <div className="border-t border-white/10 pt-4 mt-4">
                    {footer}
                </div>
            )}
        </div>
    );
};

Card.propTypes = {
    children: PropTypes.node.isRequired,
    header: PropTypes.node,
    footer: PropTypes.node,
    hoverable: PropTypes.bool,
    className: PropTypes.string,
    onClick: PropTypes.func,
};

export default Card;
