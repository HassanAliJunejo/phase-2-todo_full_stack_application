import React from 'react';
import { InputProps } from '@/lib/types';

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', error, helperText, prefix, suffix, ...props }, ref) => {
    const baseClasses = 'flex h-10 w-full rounded-lg border border-slate-300 bg-white/20 backdrop-blur-sm px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300';
    
    const errorClasses = error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : '';
    
    const classes = `${baseClasses} ${errorClasses} ${className}`;
    
    return (
      <div className="w-full">
        <div className="relative">
          {prefix && <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">{prefix}</span>}
          <input
            ref={ref}
            className={`${classes} ${prefix ? 'pl-10' : ''} ${suffix ? 'pr-10' : ''}`}
            aria-invalid={!!error}
            aria-describedby={error ? 'input-error' : undefined}
            {...props}
          />
          {suffix && <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400">{suffix}</span>}
        </div>
        {helperText && !error && <p className="mt-1 text-xs text-slate-400">{helperText}</p>}
        {error && <p id="input-error" className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;