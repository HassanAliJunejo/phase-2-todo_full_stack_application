# Quickstart Guide: Todo App UI/UX Implementation

## Overview
This guide provides instructions for setting up and implementing the UI/UX design for the Todo App Hackathon project with Modern SaaS aesthetic, Glassmorphism effects, and responsive design.

## Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Basic knowledge of React, Next.js, and Tailwind CSS
- Understanding of the project's constitution and architecture

## Setup Instructions

### 1. Environment Setup
```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install
# or
yarn install

# Install additional required packages
npm install lucide-react framer-motion
# or
yarn add lucide-react framer-motion
```

### 2. Configure Tailwind CSS
Ensure your `tailwind.config.js` includes the indigo color and any custom configurations:

```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        indigo: {
          500: '#4F46E5',
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
```

### 3. Add Global Styles
Include the Glassmorphism styles in your global CSS file:

```css
/* src/app/globals.css */
.glassmorphism {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
}

.glassmorphism-dark {
  background: rgba(31, 39, 56, 0.35);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
}
```

## Implementation Steps

### 1. Create Base UI Components
Start by implementing the reusable UI components:

#### Button Component
```tsx
// src/components/ui/Button.tsx
import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none',
          {
            'bg-indigo-500 text-white hover:bg-indigo-600': variant === 'primary',
            'bg-gray-100 text-gray-900 hover:bg-gray-200': variant === 'secondary',
            'bg-red-500 text-white hover:bg-red-600': variant === 'danger',
            'bg-transparent text-indigo-500 hover:bg-indigo-50': variant === 'ghost',
          },
          {
            'h-9 px-3 py-2 text-sm': size === 'sm',
            'h-10 px-4 py-2': size === 'md',
            'h-12 px-6 py-3 text-lg': size === 'lg',
          },
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button };
```

#### Card Component (with Glassmorphism)
```tsx
// src/components/ui/Card.tsx
import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'glassmorphism rounded-xl border bg-card text-card-foreground shadow',
        className
      )}
      {...props}
    />
  )
);

Card.displayName = 'Card';

export { Card };
```

### 2. Implement Authentication Pages
Create the login and signup pages with centered card-based layouts:

```tsx
// src/app/(auth)/login/page.tsx
'use client';

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { InputField } from '@/components/ui/InputField';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white p-4">
      <Card className="w-full max-w-md p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-gray-500 mt-2">Sign in to your account</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
          />
          
          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
          
          <Button type="submit" className="w-full mt-4">
            Sign In
          </Button>
        </form>
        
        <div className="text-center text-sm text-gray-500">
          <p>
            Don't have an account?{' '}
            <a href="/signup" className="font-medium text-indigo-500 hover:text-indigo-600">
              Sign up
            </a>
          </p>
        </div>
      </Card>
    </div>
  );
}
```

### 3. Create Dashboard Layout
Implement the split-view dashboard with sidebar navigation:

```tsx
// src/app/dashboard/layout.tsx
import { Sidebar } from '@/components/layout/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 md:p-8 bg-gray-50">
        {children}
      </main>
    </div>
  );
}
```

### 4. Implement Task Components
Create the task display with Glassmorphism cards and priority badges:

```tsx
// src/components/tasks/TaskCard.tsx
import React from 'react';
import { Card } from '@/components/ui/Card';
import { Checkbox } from '@/components/ui/Checkbox';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  id: string;
  title: string;
  description?: string;
  priority: 'Low' | 'Medium' | 'High';
  completed: boolean;
  onToggle: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  id,
  title,
  description,
  priority,
  completed,
  onToggle,
  onEdit,
  onDelete,
}) => {
  return (
    <Card className="p-4 flex items-start gap-4">
      <Checkbox 
        checked={completed} 
        onChange={onToggle} 
        aria-label={`Mark task "${title}" as ${completed ? 'incomplete' : 'complete'}`}
      />
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className={cn('font-medium truncate', completed && 'line-through text-gray-500')}>
            {title}
          </h3>
          <Badge variant={priority.toLowerCase() as any}>
            {priority}
          </Badge>
        </div>
        
        {description && (
          <p className={cn('text-sm text-gray-600', completed && 'line-through')}>
            {description}
          </p>
        )}
      </div>
      
      <div className="flex gap-2">
        {onEdit && (
          <button 
            onClick={onEdit}
            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Edit task"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
            </svg>
          </button>
        )}
        
        {onDelete && (
          <button 
            onClick={onDelete}
            className="p-1.5 rounded-full hover:bg-red-50 transition-colors text-red-500"
            aria-label="Delete task"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18"/>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
            </svg>
          </button>
        )}
      </div>
    </Card>
  );
};

export { TaskCard };
```

### 5. Add Empty State Component
Create an engaging empty state for when there are no tasks:

```tsx
// src/components/tasks/EmptyState.tsx
import { Button } from '@/components/ui/Button';
import { Plus } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  onAddTask: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ 
  title, 
  description, 
  onAddTask 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-6 w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center">
        <div className="text-indigo-500">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="16"/>
            <line x1="8" y1="12" x2="16" y2="12"/>
          </svg>
        </div>
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 mb-6 max-w-md">{description}</p>
      
      <Button onClick={onAddTask}>
        <Plus className="mr-2 h-4 w-4" /> Add Your First Task
      </Button>
    </div>
  );
};
```

## Running the Application
```bash
# Start the development server
npm run dev
# or
yarn dev

# The application will be available at http://localhost:3000
```

## Testing the UI Components
```bash
# Run component tests
npm run test
# or
yarn test

# Run end-to-end tests
npm run test:e2e
# or
yarn test:e2e
```

## Key Implementation Notes
1. Use Tailwind CSS utility classes for styling to maintain consistency with the Modern SaaS aesthetic
2. Implement responsive design using Tailwind's responsive prefixes (sm:, md:, lg:, etc.)
3. Use Framer Motion for smooth animations, especially for checkbox transitions
4. Ensure all interactive elements have proper focus states for accessibility
5. Use Lucide React icons consistently throughout the UI as specified in requirements
6. Implement proper error handling and loading states for all async operations
7. Follow the project's constitution for security and data isolation requirements