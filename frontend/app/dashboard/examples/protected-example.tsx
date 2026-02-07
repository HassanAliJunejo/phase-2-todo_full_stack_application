'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';

// Example of a properly protected page component
export default function ProtectedExamplePage() {
  const router = useRouter();
  const { user, loading: authLoading, initialized } = useAuth();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProtectedData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/protected-data', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
          'Content-Type': 'application/json',
        },
      });

      // Check if response is actually JSON before parsing
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        // If the response is not JSON, it might be HTML due to an error
        // This could happen if the server redirects to an HTML login page
        localStorage.removeItem('auth-token'); // Clear invalid token
        router.push('/auth/sign-in'); // Redirect to login
        return;
      }

      if (response.ok) {
        const result = await response.json();
        setData(result);
      } else if (response.status === 401) {
        // Unauthorized - token is invalid/expired
        localStorage.removeItem('auth-token');
        router.push('/auth/sign-in');
      } else {
        // Other error status
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (err) {
      console.error('Error fetching protected data:', err);
      setError('Failed to load data. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [router]); // Add router to dependencies

  useEffect(() => {
    // Wait for auth to be initialized before checking authentication
    if (initialized) {
      if (!user && !authLoading) {
        // Redirect to sign-in page if not authenticated
        router.push('/auth-sign-in');
        return;
      }

      if (user) {
        // Fetch protected data only after confirming user is authenticated
        fetchProtectedData();
      }
    }
  }, [user, authLoading, initialized, fetchProtectedData]);

  // Show loading state while checking authentication
  if (authLoading || !initialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Checking authentication...</div>
      </div>
    );
  }

  // Don't render anything if user is not authenticated
  if (!user) {
    return null; // The redirect happens in the useEffect
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Protected Example Page</h1>
        <p className="text-gray-600">
          This page demonstrates proper authentication protection in Next.js App Router
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6"></div>
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Protected Data</h2>
          {data ? (
            <div className="space-y-2">
              <p><span className="font-medium">User:</span> {user?.email}</p>
              <p><span className="font-medium">Sample Data:</span> {JSON.stringify(data)}</p>
            </div>
          ) : (
            <p>No data available</p>
          )}
        </div>
      )}

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-md p-4">
        <h3 className="font-medium text-blue-800 mb-2">Best Practices Demonstrated:</h3>
        <ul className="list-disc pl-5 space-y-1 text-blue-700">
          <li>Always wait for auth to be initialized before checking authentication status</li>
          <li>Check Content-Type header before parsing JSON responses</li>
          <li>Handle 401 responses by clearing tokens and redirecting</li>
          <li>Show appropriate loading states during auth checks</li>
          <li>Proper error handling for network and server errors</li>
        </ul>
      </div>
    </div>
  );
}