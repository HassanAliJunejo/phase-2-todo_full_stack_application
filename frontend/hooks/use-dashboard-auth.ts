'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Custom hook to protect dashboard routes
 * Checks if user is authenticated and redirects to sign-in if not
 */
export const useDashboardAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('auth-token');
      if (!token) {
        // Redirect to sign-in page if not authenticated
        router.push('/auth/sign-in');
      }
    };

    // Check authentication on mount
    checkAuth();
  }, [router]);

  return { isAuthenticated: !!localStorage.getItem('auth-token') };
};