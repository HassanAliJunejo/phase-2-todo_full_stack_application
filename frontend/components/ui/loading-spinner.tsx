import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  label = 'Loading...' 
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  const spinnerSize = {
    sm: 16,
    md: 24,
    lg: 32,
  };

  return (
    <div className="flex items-center justify-center">
      <svg
        className={`animate-spin ${sizeClasses[size]} text-primary-600`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox={`0 0 ${spinnerSize[size]} ${spinnerSize[size]}`}
        role="status"
        aria-label={label}
      >
        <circle
          className="opacity-25"
          cx={spinnerSize[size] / 2}
          cy={spinnerSize[size] / 2}
          r={(spinnerSize[size] / 2) - 2}
          stroke="currentColor"
          strokeWidth="3"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d={`M${spinnerSize[size] / 8},${spinnerSize[size] / 2} A ${(spinnerSize[size] / 2) - 2},${(spinnerSize[size] / 2) - 2} 0 1,1 ${(spinnerSize[size] * 7) / 8},${spinnerSize[size] / 2}`}
        ></path>
      </svg>
      <span className="sr-only">{label}</span>
    </div>
  );
};

export default LoadingSpinner;