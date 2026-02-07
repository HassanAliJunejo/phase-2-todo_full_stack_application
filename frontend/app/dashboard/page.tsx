'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { apiClient } from '@/lib/api';
import {
  TaskCompletionChart,
  CategoryChart,
  StatusDonutChart
} from '@/components/ui/chart';
import StatCard from '@/components/ui/stat-card';
import { KanbanBoard } from '@/components/ui/kanban-board';
import { FilterBar } from '@/components/ui/filter-bar';
import { ProgressBar, CircularProgress, MiniProgress } from '@/components/ui/progress-bar';
import { EmptyState } from '@/components/ui/empty-state';
import { Skeleton, StatCardSkeleton } from '@/components/ui/skeleton';
import { Task } from '@/components/ui/kanban-board'; // Import the Task type
import { useDebounce } from '@/hooks/use-debounce';

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading: authLoading, initialized } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    inProgress: 0
  });
  const [filters, setFilters] = useState<any>({});

  // Load actual data from API
  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch actual tasks from the API
        const tasksData = await apiClient.getTasks();

        // Convert API response to Task type
        const fetchedTasks: Task[] = tasksData.map((task: any) => ({
          id: task.id.toString(),
          title: task.title,
          description: task.description || '',
          status: task.completed ? 'completed' : task.status || 'todo',
          priority: task.priority || 'medium'
        }));

        setTasks(fetchedTasks);
        setStats({
          total: fetchedTasks.length,
          completed: fetchedTasks.filter(t => t.status === 'completed').length,
          pending: fetchedTasks.filter(t => t.status === 'todo').length,
          inProgress: fetchedTasks.filter(t => t.status === 'inprogress').length
        });
      } catch (error: any) {
        console.error('Error loading dashboard data:', error);
        toast.error('Failed to load dashboard data', 'Please try again later');
        // Still set loading to false even if there's an error
        setLoading(false);
      } finally {
        // Ensure loading is set to false in the finally block
        if (loading) {
          setLoading(false);
        }
      }
    };

    if (user) {
      loadData();
    }
  }, [user, toast, loading]);

  const handleCreateTask = () => {
    router.push('/dashboard/tasks/new');
  };

  const handleDeleteTask = async (id: string) => {
    try {
      // Optimistically update UI first
      setTasks(prev => prev.filter(t => t.id !== id));
      setStats(prev => ({
        ...prev,
        total: prev.total - 1
      }));
      
      // Then call API
      await apiClient.deleteTask(id);
      toast.success('Task deleted', 'Task has been deleted successfully');
    } catch (error) {
      toast.error('Delete failed', 'Failed to delete task');
      // Reload tasks on error
      const tasksData = await apiClient.getTasks();
      const fetchedTasks: Task[] = tasksData.map((task: any) => ({
        id: task.id.toString(),
        title: task.title,
        description: task.description || '',
        status: task.completed ? 'completed' : task.status || 'todo',
        priority: task.priority || 'medium'
      }));
      setTasks(fetchedTasks);
    }
  };

  const handleFiltersChange = useCallback((newFilters: any) => {
    setFilters(newFilters);
    toast.info('Filters applied', 'Filter settings have been updated');
  }, [toast]);

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
    return null; // The redirect happens in the ProtectedDashboardLayout
  }

  // Show skeleton loading while data loads
  if (loading) {
    return (
      <div className="p-6">
        <div className="mb-6">
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
        </div>

        <div className="mb-8">
          <Skeleton className="h-64 w-full mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton className="h-80 w-full" />
            <Skeleton className="h-80 w-full" />
          </div>
        </div>

        <div className="mb-8">
          <Skeleton className="h-12 w-full mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-60 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Show empty state if no tasks
  if (tasks.length === 0) {
    return (
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back, {user?.email}. Get started by creating your first task.
          </p>
        </div>

        <div className="flex justify-center">
          <EmptyState
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-30 h-30">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            }
            title="No tasks yet"
            description="Create your first task to get started with your productivity journey"
            actionLabel="Create Task"
            onAction={handleCreateTask}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Welcome back, {user?.email}. Here&apos;s what&apos;s happening with your tasks today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard
          title="Total Tasks"
          value={stats.total.toString()}
          icon={
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          }
          color="bg-primary-500"
        />
        <StatCard
          title="Completed"
          value={stats.completed.toString()}
          icon={
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          color="bg-green-500"
        />
        <StatCard
          title="In Progress"
          value={stats.inProgress.toString()}
          icon={
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          color="bg-blue-500"
        />
        <StatCard
          title="Pending"
          value={stats.pending.toString()}
          icon={
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          }
          color="bg-amber-500"
        />
      </div>

      {/* Charts Section */}
      <div className="mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TaskCompletionChart />
          <div className="space-y-6">
            <CategoryChart />
            <StatusDonutChart
              data={[
                { name: 'Completed', value: stats.completed, color: '#10B981' },
                { name: 'In Progress', value: stats.inProgress, color: '#3B82F6' },
                { name: 'Pending', value: stats.pending, color: '#F59E0B' },
              ]}
            />
          </div>
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Overall Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <CircularProgress 
              percentage={Math.round((stats.completed / stats.total) * 100) || 0} 
              size={100} 
              label="Completed" 
            />
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <ProgressBar 
              percentage={Math.round((stats.completed / stats.total) * 100) || 0} 
              label="Task Completion Rate" 
            />
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-center">
            <MiniProgress 
              percentage={Math.round((stats.inProgress / stats.total) * 100) || 0} 
            />
          </div>
        </div>
      </div>

      {/* Advanced Filter Bar */}
      <FilterBar 
        onFiltersChange={handleFiltersChange} 
      />

      {/* Kanban Board */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Task Board</h2>
          <button
            onClick={handleCreateTask}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Add Task
          </button>
        </div>
        <KanbanBoard initialTasks={tasks} onDeleteTask={handleDeleteTask} />
      </div>
    </div>
  );
}