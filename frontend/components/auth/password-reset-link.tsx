import React from 'react';
import Link from 'next/link';

interface PasswordResetLinkProps {
  href: string;
  children: React.ReactNode;
}

const PasswordResetLink: React.FC<PasswordResetLinkProps> = ({ 
  href, 
  children 
}) => {
  return (
    <div className="text-sm">
      <Link href={href} className="font-medium text-primary-600 hover:text-primary-500">
        {children}
      </Link>
    </div>
  );
};

export default PasswordResetLink;