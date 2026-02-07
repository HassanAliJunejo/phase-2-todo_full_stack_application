'use client';

import { createContext, useContext, ReactNode } from 'react';
import { Task } from '@/lib/types';
import { useTaskState } from '@/hooks/use-task-state';

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => Promise<Task>;
  updateTask: (task: Task) => Promise<any>;
  deleteTask: (id: number | string) => Promise<void>;
  toggleTaskCompletion: (id: number | string) => Promise<void>;
  refetch: () => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
  const taskState = useTaskState();

  return (
    <TaskContext.Provider value={taskState}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
}