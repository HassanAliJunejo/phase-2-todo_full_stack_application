import { Task } from '@/lib/types'; // Assuming Task type exists
import TaskCompletionToggle from './task-completion-toggle';

interface TaskCardProps {
  task: Task;
  onToggleCompletion?: (id: number | string) => void;
  onEdit?: (task: Task) => void;
  onDelete?: (id: number | string) => void;
}

const TaskCard = ({ task, onToggleCompletion, onEdit, onDelete }: TaskCardProps) => {
  // Derive status from completed property
  const status = task.completed ? 'completed' : 'pending';

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-900/30 text-green-400 border border-green-800';
      case 'pending':
        return 'bg-orange-900/30 text-orange-400 border border-orange-800';
      case 'in progress':
        return 'bg-cyan-900/30 text-cyan-400 border border-cyan-800';
      default:
        return 'bg-slate-700 text-slate-300';
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 hover:scale-[1.02] transition-all duration-300 ease-in-out border border-white/20 hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <TaskCompletionToggle
            checked={task.completed}
            onToggle={() => onToggleCompletion && onToggleCompletion(task.id)}
          />
          <p className={`text-base font-medium ml-2 truncate ${
            task.completed ? 'text-slate-700 line-through' : 'text-slate-800'
          }`}>
            {task.title}
          </p>
        </div>
        <div className="ml-2 flex-shrink-0 flex">
          <p className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(status)}`}>
            {status}
          </p>
        </div>
      </div>

      {task.description && (
        <div className="mt-2 text-sm text-slate-600">
          {task.description}
        </div>
      )}

      <div className="mt-2 sm:flex sm:justify-between">
        <div className="sm:flex">
          <p className="flex items-center text-sm text-slate-500">
            <svg className="mr-1.5 h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Due: {task.dueDate || 'No due date'}
          </p>
        </div>
        <div className="mt-2 flex items-center text-sm text-slate-500 sm:mt-0">
          <svg className="mr-1.5 h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          Created: {task.createdAt}
        </div>
      </div>

      {/* Action buttons */}
      <div className="mt-3 flex justify-end space-x-2">
        {onEdit && (
          <button
            onClick={() => onEdit(task)}
            className="text-sm text-blue-400 hover:text-blue-300 px-2 py-1 rounded hover:bg-blue-900/30"
          >
            Edit
          </button>
        )}
        {onDelete && (
          <button
            onClick={() => onDelete(task.id)}
            className="text-sm text-red-400 hover:text-red-300 px-2 py-1 rounded hover:bg-red-900/30"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskCard;