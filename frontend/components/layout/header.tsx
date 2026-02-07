'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

export default function Header({ setSidebarOpen }: HeaderProps) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { logout } = useAuth();

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleProfileClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setUserMenuOpen(false);
    router.push('/dashboard/profile'); // Navigate to profile page
  };

  const handleSettingsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setUserMenuOpen(false);
    router.push('/dashboard/settings'); // Navigate to settings page
  };

  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault();
    setUserMenuOpen(false);

    try {
      await logout(); // Call the logout function from auth context
    } catch (error) {
      console.error('Error signing out:', error);
      // Even if there's an error, redirect to sign-in page
      router.push('/auth/sign-in');
    }
  };

  return (
    <header className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] border-b border-slate-700 shadow-lg" role="banner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex justify-between h-16">
        <div className="flex items-center">
          <button
            type="button"
            className="md:hidden text-slate-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 rounded-md p-1"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <span className="sr-only">Open sidebar</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="ml-4 md:ml-0 text-xl font-semibold text-white">Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative" ref={searchRef}>
            {!searchOpen ? (
              <button
                type="button"
                className="p-1 rounded-full text-slate-300 hover:text-cyan-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 transition-colors duration-300"
                onClick={toggleSearch}
                aria-label="Open search"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            ) : (
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search tasks, projects, contacts..."
                  className="pl-10 pr-4 py-2 rounded-lg bg-slate-800 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 w-48 md:w-64 border border-slate-600 shadow-inner"
                  autoFocus
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                  onClick={toggleSearch}
                  aria-label="Close search"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          <button
            type="button"
            className="p-1 rounded-full text-slate-300 hover:text-cyan-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 transition-colors duration-300"
            aria-label="View notifications"
          >
            <span className="sr-only">View notifications</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>

          {/* Profile dropdown */}
          <div className="relative" ref={userMenuRef}>
            <div>
              <button
                type="button"
                className="max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-transform duration-300 hover:scale-105"
                onClick={toggleUserMenu}
                aria-expanded={userMenuOpen}
                aria-haspopup="true"
                aria-label="Open user menu"
              >
                <span className="sr-only">Open user menu</span>
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center border border-slate-500 shadow-md">
                  <span className="text-white font-medium">JD</span>
                </div>
                <svg
                  className={`ml-1 h-4 w-4 text-slate-400 transform transition-transform ${userMenuOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {userMenuOpen && (
              <div
                className="origin-top-right absolute right-0 mt-2 w-48 rounded-xl shadow-xl bg-slate-800/90 backdrop-blur-md ring-1 ring-slate-700 z-50 border border-slate-700/50"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu"
              >
                <div className="py-1" role="none">
                  <button
                    className="block w-full text-left px-4 py-3 text-sm text-slate-300 hover:bg-slate-700/50 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 rounded-t-xl"
                    onClick={handleProfileClick}
                    role="menuitem"
                  >
                    Your Profile
                  </button>
                  <button
                    className="block w-full text-left px-4 py-3 text-sm text-slate-300 hover:bg-slate-700/50 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                    onClick={handleSettingsClick}
                    role="menuitem"
                  >
                    Settings
                  </button>
                  <button
                    className="block w-full text-left px-4 py-3 text-sm text-slate-300 hover:bg-slate-700/50 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 rounded-b-xl"
                    onClick={handleSignOut}
                    role="menuitem"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}