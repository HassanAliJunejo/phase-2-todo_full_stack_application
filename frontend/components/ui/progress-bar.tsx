import React from 'react';

interface ProgressBarProps {
  percentage: number;
  label?: string;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  percentage, 
  label, 
  showPercentage = true,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3'
  };

  const getColor = (pct: number) => {
    if (pct < 33) return 'from-red-500 to-orange-500';
    if (pct < 67) return 'from-orange-500 to-yellow-500';
    return 'from-yellow-500 to-green-500';
  };

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          {showPercentage && (
            <span className="text-sm font-semibold text-gray-900">{percentage}%</span>
          )}
        </div>
      )}
      <div className={`w-full ${sizeClasses[size]} bg-gray-200 rounded-full overflow-hidden`}>
        <div
          className={`h-full bg-gradient-to-r ${getColor(percentage)} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

interface CircularProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({ 
  percentage, 
  size = 120, 
  strokeWidth = 8,
  label = 'Complete'
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  const getColor = (pct: number) => {
    if (pct < 33) return '#EF4444';
    if (pct < 67) return '#F59E0B';
    if (pct < 100) return '#3B82F6';
    return '#10B981';
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          stroke="#E5E7EB"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Progress circle */}
        <circle
          stroke={getColor(percentage)}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          className="transition-all duration-500 ease-out"
        />
      </svg>
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-bold text-gray-900">{percentage}%</span>
        <span className="text-xs text-gray-500">{label}</span>
      </div>
    </div>
  );
};

interface MiniProgressProps {
  percentage: number;
  size?: 'sm' | 'md';
}

export const MiniProgress: React.FC<MiniProgressProps> = ({ percentage, size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2'
  };

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full">
      <div className={`w-16 ${sizeClasses[size]} bg-gray-300 rounded-full overflow-hidden`}>
        <div
          className="h-full bg-cyan-500 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-xs font-medium text-gray-700">{percentage}%</span>
    </div>
  );
};

interface StepProgressProps {
  steps: string[];
  currentStep: number;
}

export const StepProgress: React.FC<StepProgressProps> = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-between">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                index < currentStep
                  ? 'bg-green-500 border-green-500 text-white'
                  : index === currentStep
                  ? 'bg-cyan-500 border-cyan-500 text-white'
                  : 'bg-white border-gray-300 text-gray-400'
              }`}
            >
              {index < currentStep ? (
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              ) : (
                <span className="font-semibold text-sm">{index + 1}</span>
              )}
            </div>
            <span className="mt-2 text-xs text-gray-600">{step}</span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`w-16 h-1 mx-2 transition-all ${
                index < currentStep ? 'bg-green-500' : 'bg-gray-300'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

import { Confetti } from './confetti';

// Celebration animation component
interface ProgressWithCelebrationProps {
  percentage: number;
  children: React.ReactNode;
}

export const ProgressWithCelebration: React.FC<ProgressWithCelebrationProps> = ({
  percentage,
  children
}) => {
  const [showConfetti, setShowConfetti] = React.useState(false);

  React.useEffect(() => {
    if (percentage === 100) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [percentage]);

  return (
    <div className="relative">
      {children}
      {showConfetti && <Confetti />}
    </div>
  );
};