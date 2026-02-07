'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import TaskList from '@/components/tasks/task-list';
import { useAuth } from '@/hooks/use-auth';
import LoadingSpinner from '@/components/ui/loading-spinner';

export default function TasksPage() {
  const router = useRouter();
  const { user, loading: authLoading, initialized } = useAuth();
  const [tasks, setTasks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Wait for auth to be initialized before checking authentication
    if (initialized) {
      if (!user && !authLoading) {
        // Redirect to sign-in page if not authenticated
        router.push('/auth/sign-in');
        return;
      }

      if (user) {
        // Simulate fetching tasks from an API
        setTimeout(() => {
          setTasks([
            {
              id: 1,
              title: 'Complete project proposal',
              completed: true,
              createdAt: '2026-01-15',
              dueDate: '2026-01-31',
            },
            {
              id: 2,
              title: 'Schedule team meeting',
              completed: false,
              createdAt: '2026-01-20',
              dueDate: '2026-02-01',
            },
            {
              id: 3,
              title: 'Review quarterly reports',
              completed: false,
              createdAt: '2026-01-25',
              dueDate: '2026-02-05',
            },
          ]);
          setIsLoading(false);
        }, 500);
      }
    }
  }, [user, authLoading, initialized, router]);

  // Show loading state while checking authentication
  if (authLoading || !initialized) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="flex flex-col items-center">
          <LoadingSpinner size="lg" label="Checking authentication..." />
          <p className="mt-4 text-lg text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Don't render anything if user is not authenticated
  if (!user) {
    return null;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Tasks</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your tasks efficiently
          </p>
        </div>
        <div className="mt-2 sm:mt-0">
          <Link
            href="/dashboard/tasks/new"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            aria-label="Add new task"
          >
            Add Task
          </Link>
        </div>
      </div>

      <TaskList tasks={tasks} loading={isLoading} />
    </div>
  );
}