import React from 'react';
import { CardProps } from '@/lib/types';

const Card: React.FC<CardProps> = ({ title, subtitle, children, className = '', role = 'region', ...props }) => {
  // ✅ useId() top-level pe call
  const titleId = React.useId();

  return (
    <div
      className={`bg-white shadow rounded-lg border border-gray-200 overflow-hidden ${className}`}
      role={role}
      {...props}
    >
      {(title || subtitle) && (
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          {title && (
            <h3 className="text-lg leading-6 font-medium text-gray-900" id={titleId}>
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="mt-1 text-sm text-gray-500">
              {subtitle}
            </p>
          )}
        </div>
      )}
      <div className="px-4 py-5 sm:p-6">
        {children}
      </div>
    </div>
  );
};

export default Card;
