'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';

export default function ProtectedExamplePage() {
  const router = useRouter();
  const { user, loading: authLoading, initialized } = useAuth();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Wrap fetch in useCallback so useEffect dependency warning is gone
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

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        // Invalid response, redirect to login
        localStorage.removeItem('auth-token');
        router.push('/auth/sign-in');
        return;
      }

      if (response.ok) {
        const result = await response.json();
        setData(result);
      } else if (response.status === 401) {
        // Unauthorized
        localStorage.removeItem('auth-token');
        router.push('/auth/sign-in');
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (err) {
      console.error('Error fetching protected data:', err);
      setError('Failed to load data. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [router]);

  // ✅ useEffect with proper dependencies
  useEffect(() => {
    if (initialized) {
      if (!user && !authLoading) {
        router.push('/auth/sign-in');
        return;
      }
      if (user) fetchProtectedData();
    }
  }, [user, authLoading, initialized, fetchProtectedData, router]);

  if (authLoading || !initialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Checking authentication...</div>
      </div>
    );
  }

  if (!user) return null; // Redirect happens in useEffect

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
