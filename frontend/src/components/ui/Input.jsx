import { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Input Component
 * 
 * A beautiful input field with floating label, icons, and validation support.
 * Features smooth animations and glassmorphism design.
 */
const Input = ({
    label,
    type = 'text',
    value,
    onChange,
    placeholder = '',
    error = '',
    icon,
    disabled = false,
    maxLength,
    className = '',
    ...rest
}) => {
    const [isFocused, setIsFocused] = useState(false);

    const hasValue = value && value.length > 0;

    return (
        <div className={`relative w-full ${className}`}>
            {/* Input Field */}
            <div className="relative">
                {icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                        {icon}
                    </div>
                )}

                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    disabled={disabled}
                    maxLength={maxLength}
                    placeholder={!label ? placeholder : ''}
                    className={`
            input w-full
            ${icon ? 'pl-10' : 'pl-4'}
            ${error ? 'border-red-500 focus:border-red-500' : ''}
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            transition-all duration-300
          `}
                    {...rest}
                />

                {/* Floating Label */}
                {label && (
                    <label
                        className={`
              absolute left-4 transition-all duration-300 pointer-events-none
              ${icon ? 'left-10' : 'left-4'}
              ${isFocused || hasValue
                                ? '-top-2.5 text-xs bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent font-semibold'
                                : 'top-1/2 -translate-y-1/2 text-gray-400'
                            }
            `}
                    >
                        {label}
                    </label>
                )}
            </div>

            {/* Character Counter */}
            {maxLength && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                    {value?.length || 0}/{maxLength}
                </div>
            )}

            {/* Error Message */}
            {error && (
                <p className="mt-1 text-xs text-red-400 animate-slide-down">
                    {error}
                </p>
            )}
        </div>
    );
};

Input.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    error: PropTypes.string,
    icon: PropTypes.node,
    disabled: PropTypes.bool,
    maxLength: PropTypes.number,
    className: PropTypes.string,
};

export default Input;
