'use client';

import { useState, useEffect, useCallback } from 'react';
import { Task } from '@/lib/types';
import { apiClient } from '@/lib/api';

// Store the mapping between converted IDs and original UUIDs
let idMap: Map<number, string> = new Map();

export function useTaskState() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch tasks from the API
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      idMap.clear(); // Clear the ID map before fetching new tasks
      const response = await apiClient.getTasks();
      const mappedTasks = response?.map((todo: any) => {
        const convertedId = typeof todo.id === 'string' ?
          todo.id.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0) * 1000 +
          (new Date(todo.created_at || todo.createdAt || Date.now()).getTime() % 1000) :
          todo.id;

        if (typeof todo.id === 'string') {
          idMap.set(convertedId, todo.id);
        }

        return {
          id: convertedId,
          title: todo.title,
          description: todo.description,
          completed: todo.completed,
          createdAt: todo.created_at || todo.createdAt || new Date().toISOString(),
          dueDate: todo.dueDate || todo.due_date,
        };
      }) || [];
      setTasks(mappedTasks);
      setError(null);
    } catch (err: any) {
      if (err.message.includes('401')) {
        setError('Authentication required. Please log in.');
        // Note: Avoid direct window.location manipulation in React components
        // Instead, consider using router.push from next/navigation
      } else {
        setError('Failed to fetch tasks');
      }
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Initialize by fetching tasks
    fetchTasks();
  }, [fetchTasks]);

  const addTask = useCallback(async (task: Omit<Task, 'id' | 'createdAt'>) => {
    try {
      const response = await apiClient.createTask({
        title: task.title,
        description: task.description,
        completed: task.completed || false,
      });

      const convertedId = typeof response.id === 'string' ?
        response.id.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0) * 1000 +
        (new Date(response.created_at || response.createdAt || Date.now()).getTime() % 1000) :
        response.id;

      if (typeof response.id === 'string') {
        idMap.set(convertedId, response.id);
      }

      const newTask: Task = {
        ...task,
        id: convertedId,
        createdAt: response.created_at || response.createdAt || new Date().toISOString(),
      };

      setTasks(prev => [...prev, newTask]);
      return newTask;
    } catch (err: any) {
      if (err.message.includes('401')) {
        setError('Authentication required. Please log in.');
        // Handle authentication error appropriately
        throw err;
      } else {
        setError('Failed to add task');
        console.error('Error adding task:', err);
        throw err;
      }
    }
  }, []);

  const updateTask = useCallback(async (updatedTask: Task) => {
    try {
      // Handle both string and number IDs
      const originalId = typeof updatedTask.id === 'string'
        ? updatedTask.id
        : idMap.get(updatedTask.id);

      if (!originalId) {
        console.warn(`Original ID not found for converted ID: ${updatedTask.id}. Cannot update task on server.`);
        setTasks(prev => prev.map(task =>
          task.id === updatedTask.id ? { ...updatedTask } : task
        ));
        return { ...updatedTask, id: originalId || updatedTask.id };
      }

      const response = await apiClient.updateTask(originalId, {
        title: updatedTask.title,
        description: updatedTask.description,
        completed: updatedTask.completed,
      });

      setTasks(prev => prev.map(task =>
        task.id === updatedTask.id ? { ...updatedTask } : task
      ));
      return response;
    } catch (err: any) {
      if (err.message.includes('401')) {
        setError('Authentication required. Please log in.');
        throw err;
      } else {
        setError('Failed to update task');
        console.error('Error updating task:', err);
        throw err;
      }
    }
  }, []);

  const deleteTask = useCallback(async (id: number | string) => {
    try {
      // If id is a string, use it directly; if it's a number, look up the original ID
      const originalId = typeof id === 'string' ? id : idMap.get(id);
      if (!originalId) {
        console.warn(`Original ID not found for converted ID: ${id}. Removing from local state.`);
        setTasks(prev => prev.filter(task => task.id !== id));
        if (typeof id === 'number') {
          idMap.delete(id);
        }
        return;
      }

      await apiClient.deleteTask(originalId);

      setTasks(prev => prev.filter(task => task.id !== id));

      if (typeof id === 'number') {
        idMap.delete(id);
      }
    } catch (err: any) {
      if (err.message.includes('401')) {
        setError('Authentication required. Please log in.');
        throw err;
      } else {
        setError('Failed to delete task');
        console.error('Error deleting task:', err);
        throw err;
      }
    }
  }, []);

  const toggleTaskCompletion = useCallback(async (id: number | string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    try {
      // If id is a string, use it directly; if it's a number, look up the original ID
      const originalId = typeof id === 'string' ? id : idMap.get(id);
      if (!originalId) {
        console.warn(`Original ID not found for converted ID: ${id}. Cannot update task on server.`);
        setTasks(prev => prev.map(t =>
          t.id === id ? { ...t, completed: !t.completed } : t
        ));
        return;
      }

      await apiClient.updateTask(originalId, {
        completed: !task.completed
      });

      setTasks(prev => prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ));
    } catch (err: any) {
      if (err.message.includes('401')) {
        setError('Authentication required. Please log in.');
        throw err;
      } else {
        setError('Failed to update task status');
        console.error('Error toggling task completion:', err);
        throw err;
      }
    }
  }, [tasks]);

  return {
    tasks,
    loading,
    error,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    refetch: fetchTasks,
  };
}