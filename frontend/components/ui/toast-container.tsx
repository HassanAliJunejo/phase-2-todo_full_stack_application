'use client';

import { useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Toast, ToastStyles } from '@/components/ui/toast';

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();
  const containerRef = useRef<HTMLDivElement>(null);

  // Close toast when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        // Only close if the click wasn't on a toast element
        const target = event.target as HTMLElement;
        if (!target.closest('[role="alert"], [role="status"]')) {
          // We don't close all toasts on outside click, just handle individual dismissals
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <ToastStyles />
      <div
        ref={containerRef}
        aria-live="polite"
        aria-label="Notifications"
        className="fixed top-4 right-4 z-[9999] flex flex-col items-end gap-3 pointer-events-none"
      >
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast
              toast={toast}
              onDismiss={removeToast}
            />
          </div>
        ))}
      </div>
    </>
  );
}