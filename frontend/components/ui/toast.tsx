import React, { useEffect, useState } from 'react';
import { Toast as ToastType } from '@/hooks/use-toast';

interface ToastProps {
  toast: ToastType;
  onDismiss: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ toast, onDismiss }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(100);

  // Handle progress bar animation
  useEffect(() => {
    if (isHovered) return; // Pause when hovered

    const startTime = Date.now();
    const duration = toast.duration || 5000;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, duration - elapsed);
      const newProgress = (remaining / duration) * 100;

      setProgress(newProgress);

      if (newProgress <= 0) {
        clearInterval(interval);
        onDismiss(toast.id);
      }
    }, 50); // Update every 50ms for smooth animation

    return () => clearInterval(interval);
  }, [toast.id, toast.duration, isHovered, onDismiss]);

  const getToastStyles = () => {
    switch (toast.type) {
      case 'success':
        return 'from-green-500 to-green-600 border-l-4 border-green-700';
      case 'error':
        return 'from-red-500 to-red-600 border-l-4 border-red-700';
      case 'warning':
        return 'from-amber-500 to-amber-600 border-l-4 border-amber-700';
      case 'info':
      default:
        return 'from-blue-500 to-blue-600 border-l-4 border-blue-700';
    }
  };

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        );
      case 'error':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
        );
      case 'info':
      default:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        );
    }
  };

  const getToastRole = () => {
    switch (toast.type) {
      case 'error':
        return 'alert';
      default:
        return 'status';
    }
  };

  return (
    <div
      className={`toast bg-gradient-to-r ${getToastStyles()} text-white p-4 rounded-xl shadow-2xl flex items-start gap-3 max-w-sm border-l-4 relative overflow-hidden`}
      role={getToastRole()}
      aria-live={toast.type === 'error' ? 'assertive' : 'polite'}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex-shrink-0 text-white">
        {getIcon()}
      </div>
      <div className="flex-1">
        <div className="font-semibold">{toast.title || toast.message}</div>
        {toast.message && toast.title && <div className="text-sm opacity-90 mt-1">{toast.message}</div>}
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="flex-shrink-0 text-white opacity-70 hover:opacity-100"
        aria-label="Dismiss notification"
      >
        ×
      </button>
      <div
        className="toast-progress absolute bottom-0 left-0 h-1 bg-white bg-opacity-30"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

// Define the toast animations in a style component
const ToastStyles = () => (
  <style jsx global>{`
    @keyframes slideInRight {
      from { transform: translateX(400px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }

    @keyframes slideOutRight {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(400px); opacity: 0; }
    }

    .toast {
      animation: slideInRight 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
    }

    .toast.exiting {
      animation: slideOutRight 0.2s ease-out;
    }

    .toast-progress {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 3px;
      background: rgba(255, 255, 255, 0.5);
    }
  `}</style>
);

export { Toast, ToastStyles };