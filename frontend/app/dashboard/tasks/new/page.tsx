'use client';

import { useRouter } from 'next/navigation';
import TaskForm from '@/components/tasks/task-form';
import { Task } from '@/lib/types';
import { useTaskContext } from '@/contexts/task-context';

export default function NewTaskPage() {
  const router = useRouter();
  const { addTask } = useTaskContext();

  const handleSubmit = async (task: Partial<Task>) => {
    try {
      await addTask({
        title: task.title || '',
        description: task.description,
        completed: task.completed || false,
      });

      // Redirect back to tasks page after creating task
      router.push('/dashboard/tasks');
    } catch (error) {
      console.error('Error creating task:', error);
      // Error is handled in the context, so we don't need to show an additional error here
    }
  };

  const handleCancel = () => {
    router.push('/dashboard/tasks');
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Create New Task</h1>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
        <TaskForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
}