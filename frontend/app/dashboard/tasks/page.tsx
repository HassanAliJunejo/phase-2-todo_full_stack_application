'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import TaskList from '@/components/tasks/task-list';
import { useAuth } from '@/hooks/use-auth';
import { useTaskContext } from '@/contexts/task-context';

export default function TasksPage() {
  const router = useRouter();
  const { user, loading: authLoading, initialized } = useAuth();
  const { tasks, loading, error, refetch } = useTaskContext();

  // Wait for auth to be initialized before checking authentication
  if (authLoading || !initialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Checking authentication...</div>
      </div>
    );
  }

  // Redirect to sign-in page if not authenticated
  if (!user) {
    router.push('/auth/sign-in');
    return null;
  }

  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Tasks</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your tasks efficiently
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link
            href="/dashboard/tasks/new"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Add Task
          </Link>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}. <button
            onClick={refetch}
            className="underline ml-2"
          >
            Retry
          </button>
        </div>
      )}

      <TaskList tasks={tasks} loading={loading} />
    </div>
  );
}