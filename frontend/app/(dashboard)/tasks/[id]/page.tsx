'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';

export default function TaskDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, loading: authLoading, initialized } = useAuth();
  const [task, setTask] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    // Wait for auth to be initialized before checking authentication
    if (initialized) {
      if (!user && !authLoading) {
        // Redirect to sign-in page if not authenticated
        router.push('/auth/sign-in');
        return;
      }

      if (user) {
        // Simulate fetching task from an API
        setTimeout(() => {
          if (id === 'new') {
            // For new task, initialize with empty values
            setTitle('');
            setDescription('');
            setCompleted(false);
            setDueDate('');
          } else {
            // For existing task, load the task data
            setTask({
              id: parseInt(id as string),
              title: 'Complete project proposal',
              description: 'Finish the project proposal document and submit to stakeholders.',
              completed: true,
              createdAt: '2026-01-15',
              dueDate: '2026-01-31',
            });
            setTitle('Complete project proposal');
            setDescription('Finish the project proposal document and submit to stakeholders.');
            setCompleted(true);
            setDueDate('2026-01-31');
          }
          setIsLoading(false);
        }, 500);
      }
    }
  }, [user, authLoading, initialized, id, router]);

  // Show loading state while checking authentication
  if (authLoading || !initialized) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="py-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
            <div className="space-y-4">
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Don't render anything if user is not authenticated
  if (!user) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real application, this would be an API call to create/update the task
    // For now, we'll simulate the API call
    try {
      if (id === 'new') {
        // Create new task
        console.log('Creating new task:', { title, description, completed, dueDate });
      } else {
        // Update existing task
        console.log('Updating task:', { id, title, description, completed, dueDate });
      }
      
      // Redirect back to tasks list
      router.push('/dashboard/tasks');
    } catch (err) {
      console.error('Error saving task:', err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }
    
    // In a real application, this would be an API call to delete the task
    // For now, we'll simulate the API call
    try {
      console.log('Deleting task:', id);
      // Redirect back to tasks list
      router.push('/dashboard/tasks');
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="py-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
            <div className="space-y-4">
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            {id === 'new' ? 'Create New Task' : 'Edit Task'}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {id === 'new' ? 'Create a new task' : 'Update your task details'}
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link
            href="/dashboard/tasks"
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Back to Tasks
          </Link>
        </div>
      </div>

      <div className="mt-6 max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="shadow sm:rounded-md sm:overflow-hidden">
            <div className="bg-white py-6 px-4 sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
                    Due Date
                  </label>
                  <input
                    type="date"
                    id="dueDate"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3 flex items-center">
                  <div className="flex items-center h-5">
                    <input
                      id="completed"
                      type="checkbox"
                      checked={completed}
                      onChange={(e) => setCompleted(e.target.checked)}
                      className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="completed" className="font-medium text-gray-700">
                      Mark as completed
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <div className="flex justify-between">
                {id !== 'new' && (
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Delete
                  </button>
                )}
                <div>
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    {id === 'new' ? 'Create Task' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}