# Quickstart: Premium Aesthetic UI Implementation

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Existing project with Next.js, Tailwind CSS, and the components referenced in the plan

## Setup Steps

### 1. Install Required Dependencies

Most dependencies should already be present in your project, but verify you have:

```bash
npm install lucide-react framer-motion
# If using Sonner for toasts:
npm install sonner
```

### 2. Configure Tailwind CSS for Glassmorphism

Update your `tailwind.config.js` to include glassmorphism utilities:

```javascript
module.exports = {
  theme: {
    extend: {
      backdropBlur: {
        xs: '2px',
      },
      backgroundColor: {
        'glass': 'rgba(255, 255, 255, 0.1)',
        'glass-hover': 'rgba(255, 255, 255, 0.2)',
      }
    }
  }
}
```

### 3. Add Glassmorphism Utility Classes

In your `globals.css` or relevant CSS file, add:

```css
.glass-card {
  @apply bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg;
}

.auth-glass-card {
  @apply glass-card p-8 sm:p-10 w-full max-w-md;
}

.task-glass-card {
  @apply glass-card p-6 mb-4;
}
```

### 4. Create Animated Mesh Gradient Background

Add the animated background to your global styles:

```css
.mesh-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
}

.mesh-bg::before,
.mesh-bg::after {
  content: '';
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  filter: blur(60px);
}

.mesh-bg::before {
  background: linear-gradient(180deg, #6366f1, #8b5cf6);
  top: -20%;
  left: -20%;
  animation: float 12s infinite ease-in-out;
}

.mesh-bg::after {
  background: linear-gradient(180deg, #ec4899, #f43f5e);
  bottom: -20%;
  right: -20%;
  animation: float 15s infinite ease-in-out reverse;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(-50px, -50px) rotate(90deg); }
  50% { transform: translate(30px, -70px) rotate(180deg); }
  75% { transform: translate(-70px, 40px) rotate(270deg); }
}
```

### 5. Create Priority Badge Component

Create `components/ui/PriorityBadge.tsx`:

```tsx
import React from 'react';

interface PriorityBadgeProps {
  priority: 'high' | 'medium' | 'low';
  className?: string;
}

const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority, className = '' }) => {
  const priorityStyles = {
    high: 'bg-red-500/20 text-red-300 border border-red-500/30',
    medium: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
    low: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
  };

  const priorityText = {
    high: 'High',
    medium: 'Medium',
    low: 'Low',
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityStyles[priority]} ${className}`}>
      {priorityText[priority]}
    </span>
  );
};

export { PriorityBadge };
```

### 6. Create Toast Hook

Create `hooks/use-toast.ts`:

```tsx
import { toast } from 'sonner';

export const useToast = () => {
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    switch (type) {
      case 'success':
        toast.success(message);
        break;
      case 'error':
        toast.error(message);
        break;
      default:
        toast(message);
    }
  };

  return { showToast };
};
```

### 7. Update Task Card Component

Modify your `components/tasks/TaskCard.tsx` to include priority badges and timestamps:

```tsx
import React from 'react';
import { Card } from '@/components/ui/Card';
import { PriorityBadge } from '@/components/ui/PriorityBadge';
import { formatDate } from '@/lib/utils';

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    description?: string;
    priority: 'high' | 'medium' | 'low';
    completed: boolean;
    createdAt: string;
    // ... other fields
  };
  onToggleComplete: (id: string) => void;
  onEdit: (task: any) => void;
  onDelete: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onToggleComplete, onEdit, onDelete }) => {
  return (
    <Card className="task-glass-card">
      <div className="flex items-start gap-4">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
          className="mt-1 w-5 h-5 rounded-full"
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className={`font-medium truncate ${task.completed ? 'line-through text-gray-500' : ''}`}>
              {task.title}
            </h3>
            <PriorityBadge priority={task.priority} />
          </div>

          {task.description && (
            <p className={`text-sm text-gray-300 mb-2 ${task.completed ? 'line-through' : ''}`}>
              {task.description}
            </p>
          )}

          <div className="flex items-center text-xs text-gray-400 mt-2">
            <span>Created: {formatDate(task.createdAt)}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={() => onEdit(task)}
            className="p-1.5 rounded-full hover:bg-gray-100/20 transition-colors"
            aria-label="Edit task"
          >
            ✏️
          </button>
          
          <button
            onClick={() => onDelete(task.id)}
            className="p-1.5 rounded-full hover:bg-red-500/20 transition-colors text-red-300"
            aria-label="Delete task"
          >
            🗑️
          </button>
        </div>
      </div>
    </Card>
  );
};

export { TaskCard };
```

### 8. Update Task Form Component

Modify your task form to include priority selection:

```tsx
import React, { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { InputField } from '@/components/ui/InputField';
import { PriorityBadge } from '@/components/ui/PriorityBadge';

interface TaskFormProps {
  onTaskCreated: (task: any) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newTask = {
      title,
      description,
      priority,
      completed: false,
      createdAt: new Date().toISOString(),
      // ... other required fields
    };
    
    onTaskCreated(newTask);
    
    // Reset form
    setTitle('');
    setDescription('');
    setPriority('medium');
  };

  return (
    <GlassCard className="p-6 mb-8">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <InputField
              id="task-title"
              name="title"
              type="text"
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="md:col-span-2">
            <textarea
              id="task-description"
              placeholder="Task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows={2}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Priority</label>
            <div className="flex gap-2">
              {(['high', 'medium', 'low'] as const).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setPriority(level)}
                  className={`flex-1 py-2 rounded-lg border ${
                    priority === level
                      ? 'bg-white/20 border-white/40'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <PriorityBadge priority={level} className="mx-auto" />
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-end">
            <Button type="submit" className="w-full">
              Add Task
            </Button>
          </div>
        </div>
      </form>
    </GlassCard>
  );
};

export { TaskForm };
```

### 9. Implement Session Guard

Update your middleware or authentication provider to handle token expiration:

```tsx
// In your auth provider or middleware
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const useSessionGuard = (isLoggedIn: boolean, tokenExpiry: Date | null) => {
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }

    if (tokenExpiry && new Date() > tokenExpiry) {
      // Token expired, redirect to login
      router.push('/login');
    }

    // Set up interval to check token expiry every minute
    const interval = setInterval(() => {
      if (tokenExpiry && new Date() > tokenExpiry) {
        router.push('/login');
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [isLoggedIn, tokenExpiry, router]);
};

export default useSessionGuard;
```

That's it! You now have all the components needed for the premium aesthetic UI upgrade. Remember to test thoroughly across different browsers and devices to ensure the glassmorphism effects and animations perform well.