import React, { useState } from 'react';
import { Task } from '@/lib/types';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';

interface TaskFormProps {
  task?: Partial<Task>;
  onSubmit: (task: Partial<Task>) => Promise<void>; // Update to support async operations
  onCancel: () => void;
  submitting?: boolean; // Add a prop to indicate submission status
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSubmit, onCancel, submitting = false }) => {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [dueDate, setDueDate] = useState(task?.dueDate || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await onSubmit({
        id: task?.id,
        title,
        description,
        dueDate,
        completed: task?.completed || false,
      });

      // Clear form after successful submission for new tasks
      if (!task?.id) {
        setTitle('');
        setDescription('');
        setDueDate('');
      }
    } catch (error) {
      console.error('Error submitting task:', error);
      // Optionally show an error message to the user
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title *
        </label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          disabled={submitting}
          placeholder="Enter task title"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <Input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={submitting}
          placeholder="Enter task description"
        />
      </div>

      <div>
        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
          Due Date
        </label>
        <Input
          id="dueDate"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          disabled={submitting}
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={submitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={submitting}
        >
          {submitting ? 'Saving...' : (task?.id ? 'Update Task' : 'Create Task')}
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;