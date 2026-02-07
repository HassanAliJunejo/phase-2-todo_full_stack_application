import './globals.css';
import type { Metadata } from 'next';
import AuthProviderWrapper from '@/components/auth-provider-wrapper';
import SkipNavLink from '@/components/layout/skip-nav-link';
import ToastContainer from '@/components/ui/toast-container';

export const metadata: Metadata = {
  title: 'Secure Todo Application',
  description: 'A premium, professional todo application with secure authentication',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-pattern">
        <SkipNavLink />
        <AuthProviderWrapper>
          {children}
          <ToastContainer />
        </AuthProviderWrapper>
      </body>
    </html>
  );
}