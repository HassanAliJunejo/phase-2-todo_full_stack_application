'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { apiClient } from '../lib/api';

interface User {
  id: number;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
  initialized: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false,
  register: async (email: string, password: string, name: string) => false,
  logout: () => {},
  loading: true,
  initialized: false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Function to validate token and get user data
  const validateToken = async (): Promise<boolean> => {
    try {
      // Use the API client to get user info with the stored token
      const data = await apiClient.getUserInfo();

      if (data) {
        // Create a minimal user object based on the backend response
        setUser({
          id: data.id || 1, // Use the ID from the backend or default to 1
          email: data.email || 'user@example.com' // Use the email from the backend
        });
        return true;
      }
    } catch (error) {
      console.error('Error validating token:', error);

      // Check if this is a network error indicating the server is not accessible
      if (error instanceof Error && error.message.includes('Server is not accessible')) {
        // Server is not accessible - don't remove the token, just return false
        console.warn('Backend server is not accessible, but keeping auth token for when it becomes available');
        return false;
      } else if (error instanceof Error && error.message.includes('HTTP error! status: 401')) {
        // Token is invalid/expired, remove it and return false
        console.warn('Token is invalid or expired, removing from storage');
        localStorage.removeItem('auth-token');
        // Clear the API client cache
        apiClient.clearCache();
        return false;
      } else {
        // For other errors, remove the token as well to prevent repeated failed requests
        console.warn('Other error occurred, removing token to prevent repeated failures');
        localStorage.removeItem('auth-token');
        // Clear the API client cache
        apiClient.clearCache();
      }
    }
    return false;
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        setLoading(true);
        const isValid = await validateToken();
        if (!isValid) {
          setUser(null);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        setUser(null);
      } finally {
        setLoading(false);
        setInitialized(true);
      }
    };

    // Only initialize once when the component mounts
    if (!initialized) {
      initAuth();
    }
  }, [initialized]); // Only run once when initialized is false

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Use the API client to log in the user
      const data = await apiClient.login(email, password);
      if (data.access_token) { // Backend returns 'access_token' not 'token'
        localStorage.setItem('auth-token', data.access_token);
        const isValid = await validateToken();
        if (isValid) {
          // Navigate to dashboard after successful login
          router.push('/dashboard');
          router.refresh(); // Force refresh to update the UI
          return true;
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      // If there's an error during login, make sure to clean up any partial state
      localStorage.removeItem('auth-token');
      throw error;
    }
    return false;
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      // Use the API client to register the user
      const data = await apiClient.register(email, password, name);
      if (data.access_token) { // Backend returns 'access_token' not 'token'
        localStorage.setItem('auth-token', data.access_token);
        const isValid = await validateToken();
        if (isValid) {
          // Navigate to dashboard after successful registration
          router.push('/dashboard');
          router.refresh(); // Force refresh to update the UI
          return true;
        }
      }
    } catch (error) {
      console.error('Registration error:', error);
      // If there's an error during registration, make sure to clean up any partial state
      localStorage.removeItem('auth-token');
      throw error;
    }
    return false;
  };

  const logout = async () => {
    try {
      // Call the backend logout endpoint using the API client
      await apiClient.request('/api/v1/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Logout error:', error);

      // Check if this is a network error indicating the server is not accessible
      if (!(error instanceof Error && error.message.includes('Server is not accessible'))) {
        // Only log if it's not a server accessibility issue
        console.error('Could not reach logout endpoint, but proceeding with client-side logout');
      }
    } finally {
      // Clear the stored token regardless of API response
      localStorage.removeItem('auth-token');
      // Clear the API client cache
      apiClient.clearCache();
      setUser(null);
      router.push('/sign-in');
      router.refresh(); // Force refresh to update the UI
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    initialized,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}