'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { apiClient } from '@/lib/api';

export default function ProfilePage() {
  const router = useRouter();
  const { user: authUser, loading: authLoading, initialized } = useAuth();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Wait for auth to be initialized before checking authentication
    if (initialized) {
      if (!authUser && !authLoading) {
        // Redirect to sign-in page if not authenticated
        router.push('/auth/sign-in');
        return;
      }

      if (authUser) {
        // Fetch user data from the API
        const fetchUserData = async () => {
          try {
            setLoading(true);
            const userData = await apiClient.getUserInfo();
            setUser(userData);
          } catch (err) {
            console.error('Error fetching user data:', err);
            setError('Failed to load user profile data');
          } finally {
            setLoading(false);
          }
        };

        fetchUserData();
      }
    }
  }, [authUser, authLoading, initialized, router]);

  // Show loading state while checking authentication
  if (authLoading || loading || !initialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading profile...</div>
      </div>
    );
  }

  // Don't render anything if user is not authenticated
  if (!authUser) {
    return null;
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Profile</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your personal information
        </p>
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Personal Information</h3>
          <p className="mt-1 text-sm text-gray-500">
            Your profile details
          </p>

          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <div className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100 text-gray-700 sm:text-sm">
                {user?.firstName || user?.name?.split(' ')[0] || 'Not provided'}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <div className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100 text-gray-700 sm:text-sm">
                {user?.lastName || user?.name?.split(' ').slice(1).join(' ') || 'Not provided'}
              </div>
            </div>

            <div className="sm:col-span-4">
              <label className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100 text-gray-700 sm:text-sm">
                {user?.email || 'Not provided'}
              </div>
            </div>

            <div className="sm:col-span-4">
              <label className="block text-sm font-medium text-gray-700">
                Account ID
              </label>
              <div className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100 text-gray-700 sm:text-sm">
                {user?.id || 'Not provided'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}