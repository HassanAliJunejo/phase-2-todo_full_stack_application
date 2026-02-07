import { Task } from '@/lib/types';
import TaskCard from './task-card';
import { useTaskContext } from '@/contexts/task-context';

interface TaskListProps {
  tasks: Task[];
  loading?: boolean;
  emptyMessage?: string;
}

const TaskList = ({ tasks, loading, emptyMessage = 'No tasks found' }: TaskListProps) => {
  const { toggleTaskCompletion, deleteTask } = useTaskContext();

  const handleDelete = async (id: number | string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(id);
      } catch (error) {
        console.error('Error deleting task:', error);
        // Error is handled in the context
      }
    }
  };

  if (loading && tasks.length === 0) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="animate-pulse flex flex-col space-y-4 px-4 py-6">
            <div className="h-4 bg-slate-700 rounded w-3/4"></div>
            <div className="h-4 bg-slate-700 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <svg className="mx-auto h-12 w-12 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-slate-400">{emptyMessage}</h3>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-slate-700">
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskCard
            task={task}
            onToggleCompletion={toggleTaskCompletion}
            onDelete={handleDelete}
          />
        </li>
      ))}
    </ul>
  );
};

export default TaskList;