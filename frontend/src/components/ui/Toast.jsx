import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

/**
 * Toast Component
 * 
 * Non-intrusive notification component with auto-dismiss.
 * Supports success, error, and info variants.
 */
const Toast = ({ type = 'info', message, onClose, duration = 3000 }) => {
    useEffect(() => {
        if (duration && duration > 0) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [duration, onClose]);

    const types = {
        success: {
            icon: <CheckCircle size={20} />,
            bgClass: 'bg-green-500/20 border-green-500/50',
            iconClass: 'text-green-400',
        },
        error: {
            icon: <AlertCircle size={20} />,
            bgClass: 'bg-red-500/20 border-red-500/50',
            iconClass: 'text-red-400',
        },
        info: {
            icon: <Info size={20} />,
            bgClass: 'bg-blue-500/20 border-blue-500/50',
            iconClass: 'text-blue-400',
        },
    };

    const config = types[type] || types.info;

    return (
        <div
            className={`
        fixed top-4 right-4 z-50
        glass ${config.bgClass}
        rounded-lg p-4 pr-12
        shadow-xl
        animate-slide-down
        min-w-[300px] max-w-md
      `}
        >
            <div className="flex items-start gap-3">
                <div className={config.iconClass}>
                    {config.icon}
                </div>
                <p className="text-sm text-white flex-1">
                    {message}
                </p>
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 p-1 rounded hover:bg-white/10 transition-colors"
                    aria-label="Close notification"
                >
                    <X size={16} />
                </button>
            </div>
        </div>
    );
};

Toast.propTypes = {
    type: PropTypes.oneOf(['success', 'error', 'info']),
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    duration: PropTypes.number,
};

export default Toast;
