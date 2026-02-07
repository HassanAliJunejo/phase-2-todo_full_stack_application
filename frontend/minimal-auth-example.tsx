// Minimal Working AuthProvider Example
// This is a simplified version that demonstrates the core concepts

'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  initialized: boolean;
}

// Create the context with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);
  const router = useRouter();

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        // Simulate checking for existing token
        const token = localStorage.getItem('auth-token');
        
        if (token) {
          // In a real app, you'd validate the token with your backend
          // For this example, we'll assume the token is valid
          const mockUser = { id: 1, email: 'user@example.com' };
          setUser(mockUser);
        }
      } catch (error) {
        console.error('Session check failed:', error);
      } finally {
        setLoading(false);
        setInitialized(true);
      }
    };

    checkSession();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    
    try {
      // In a real app, this would be an API call to your backend
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password }),
      // });
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock successful login
      const mockUser = { id: 1, email };
      localStorage.setItem('auth-token', 'mock-jwt-token');
      setUser(mockUser);
      
      // Redirect to dashboard
      router.push('/dashboard');
      router.refresh(); // Force refresh to update UI
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('auth-token');
    setUser(null);
    router.push('/sign-in');
    router.refresh(); // Force refresh to update UI
  };

  const value = {
    user,
    login,
    logout,
    loading,
    initialized,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}