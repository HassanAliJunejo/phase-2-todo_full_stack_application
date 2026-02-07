import React from 'react';
import Button from '@/components/ui/button';

interface SocialLoginButtonsProps {
  providers: Array<{
    id: string;
    name: string;
    icon?: React.ReactNode;
  }>;
  onSocialLogin: (providerId: string) => void;
}

const SocialLoginButtons: React.FC<SocialLoginButtonsProps> = ({ 
  providers, 
  onSocialLogin 
}) => {
  return (
    <div>
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3">
          {providers.map((provider) => (
            <Button
              key={provider.id}
              variant="outline"
              className="w-full flex justify-center py-2 px-4"
              onClick={() => onSocialLogin(provider.id)}
            >
              {provider.icon && <span className="mr-2">{provider.icon}</span>}
              {provider.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialLoginButtons;