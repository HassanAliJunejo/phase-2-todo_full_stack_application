'use client';

import { useState, useEffect } from 'react';

export type ToastType = 'info' | 'success' | 'warning' | 'error';

export interface Toast {
  id: string;
  title: string;
  message?: string;
  type: ToastType;
  duration?: number;
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (params: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: Toast = { ...params, id, duration: params.duration || 5000 };

    // Limit to 3 toasts at a time
    setToasts((prevToasts) => [...prevToasts.slice(-2), newToast]);
  };

  const removeToast = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter(toast => toast.id !== id));
  };

  const clearToasts = () => {
    setToasts([]);
  };

  // Auto-remove toasts after their duration
  useEffect(() => {
    if (toasts.length === 0) return;

    const timers = toasts.map(toast => {
      const timer = setTimeout(() => {
        removeToast(toast.id);
      }, toast.duration);
      return timer;
    });

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [toasts]);

  return {
    toasts,
    toast: {
      success: (title: string, message?: string, duration?: number) =>
        addToast({ type: 'success', title, message, duration }),
      error: (title: string, message?: string, duration?: number) =>
        addToast({ type: 'error', title, message, duration }),
      warning: (title: string, message?: string, duration?: number) =>
        addToast({ type: 'warning', title, message, duration }),
      info: (title: string, message?: string, duration?: number) =>
        addToast({ type: 'info', title, message, duration }),
    },
    removeToast,
    clearToasts,
  };
}