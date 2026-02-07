import React from 'react';
import { ButtonProps } from '@/lib/types';

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', size = 'md', loading, icon, className = '', ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

    const variantClasses = {
      primary: 'bg-cyan-600 text-white hover:bg-cyan-700 active:bg-cyan-800 shadow-md hover:shadow-lg',
      secondary: 'bg-slate-200 text-slate-800 hover:bg-slate-300 active:bg-slate-400',
      outline: 'border border-slate-300 bg-transparent text-slate-700 hover:bg-slate-50 active:bg-slate-100',
      ghost: 'hover:bg-slate-100 text-slate-700 active:bg-slate-200',
      destructive: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800',
      glass: 'bg-white/10 text-white backdrop-blur-sm border border-white/20 hover:bg-white/20 focus:ring-cyan-500 shadow-md hover:shadow-lg',
    };

    const sizeClasses = {
      sm: 'text-xs py-1.5 px-3 min-h-[2rem] rounded-lg',
      md: 'text-sm py-2 px-4 min-h-[2.5rem] rounded-lg',
      lg: 'text-base py-2.5 px-5 min-h-[3rem] rounded-lg',
    };

    const loadingClass = loading ? 'opacity-75 cursor-not-allowed' : '';

    const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${loadingClass} ${className}`;

    return (
      <button
        ref={ref}
        className={classes}
        disabled={loading || props.disabled}
        aria-disabled={loading || props.disabled}
        role="button"
        tabIndex={0}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden={!loading}
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {icon && !loading && <span className="mr-2">{icon}</span>}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;