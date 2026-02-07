import React from 'react';
import Link from 'next/link';

interface AuthFormWrapperProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footerContent?: React.ReactNode;
}

const AuthFormWrapper: React.FC<AuthFormWrapperProps> = ({ 
  title, 
  subtitle, 
  children, 
  footerContent 
}) => {
  return (
    <div className="w-full max-w-md space-y-8">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {title}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {subtitle}
        </p>
      </div>
      <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        {children}
      </div>
      {footerContent && (
        <div className="mt-4 text-center text-sm text-gray-600">
          {footerContent}
        </div>
      )}
    </div>
  );
};

export default AuthFormWrapper;