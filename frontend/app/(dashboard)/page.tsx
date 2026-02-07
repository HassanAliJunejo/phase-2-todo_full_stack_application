'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import LoadingSpinner from '@/components/ui/loading-spinner';
import StatCard from '@/components/ui/stat-card';
import TaskList from '@/components/tasks/task-list';
import { Task } from '@/lib/types';

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading: authLoading, initialized } = useAuth();

  const handleCreateTask = () => {
    router.push('/dashboard/tasks/new');
  };

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

  if (!user) return null; // Redirect handled by ProtectedDashboardLayout

  // Mock tasks for demonstration
  const mockTasks: Task[] = [
    { id: 1, title: 'Complete project proposal', description: 'Finish the proposal document for the new client', completed: true, createdAt: 'Jan 15, 2026', dueDate: 'Today' },
    { id: 2, title: 'Schedule team meeting', description: 'Organize the weekly sync with the development team', completed: false, createdAt: 'Jan 20, 2026', dueDate: 'Tomorrow' },
    { id: 3, title: 'Prepare quarterly report', description: 'Compile data and create the Q1 report', completed: false, createdAt: 'Jan 25, 2026', dueDate: 'Feb 10, 2026' },
    { id: 4, title: 'Review design mockups', description: 'Provide feedback on the new UI designs', completed: false, createdAt: 'Jan 28, 2026', dueDate: 'Feb 5, 2026' },
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Dashboard Header */}
      <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] rounded-2xl p-6 text-white shadow-lg">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-2 text-slate-300">
          Welcome back, {user?.email}. Here&apos;s what&apos;s happening with your tasks today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Tasks"
          value="12"
          color="blue"
          icon={
            <svg className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          }
          description="+2 from last week"
        />

        <StatCard
          title="Completed"
          value="5"
          color="green"
          icon={
            <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          description="42% completion rate"
        />

        <StatCard
          title="Pending"
          value="7"
          color="orange"
          icon={
            <svg className="h-6 w-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          description="3 due this week"
        />
      </div>

      {/* Recent Tasks Section */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <h3 className="text-xl font-bold text-white">Recent Tasks</h3>
          <button
            onClick={handleCreateTask}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-colors duration-300 hover:scale-105 transform"
            aria-label="Add new task"
          >
            <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Task
          </button>
        </div>

        <div className="overflow-hidden rounded-xl">
          <TaskList tasks={mockTasks} />
        </div>
      </div>
    </div>
  );
}
