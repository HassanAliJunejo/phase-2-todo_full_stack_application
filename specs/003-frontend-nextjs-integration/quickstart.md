# Quickstart Guide: Frontend Next.js Integration with Secure Backend

## Overview
This guide provides instructions to quickly set up and run the Frontend Next.js application that connects to the FastAPI backend using Better Auth for session management and JWT generation.

## Prerequisites
- Node.js 18+ and npm/yarn/pnpm
- Access to the FastAPI backend (running on localhost:8000 or other designated endpoint)
- Better Auth configured with JWT plugin on the backend
- Valid `BETTER_AUTH_SECRET` set in environment variables

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd <repository-directory>
```

### 2. Navigate to Frontend Directory
```bash
cd frontend
```

### 3. Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 4. Configure Environment Variables
Create a `.env.local` file in the frontend directory with your backend URL and auth settings:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:8000
NEXT_PUBLIC_BETTER_AUTH_SECRET=your_better_auth_secret_here
```

### 5. Run the Application
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The application will be available at `http://localhost:3000`

## Project Structure
```
frontend/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── login/
│   │   └── page.tsx
│   ├── signup/
│   │   └── page.tsx
│   └── dashboard/
│       └── page.tsx
├── lib/
│   ├── auth.ts          # Better Auth configuration
│   └── api.ts           # Centralized API client with JWT handling
├── components/
│   ├── ui/
│   │   ├── task-list.tsx
│   │   ├── task-form.tsx
│   │   └── auth-components.tsx
│   └── providers/
│       └── auth-provider.tsx
├── middleware.ts        # Route protection middleware
└── ...
```

## Key Features

### Authentication
- Better Auth integration for login/signup
- JWT token management
- Protected routes using middleware
- Session management

### API Integration
- Centralized API client in `lib/api.ts`
- Automatic JWT header attachment
- Error handling for 401/403 responses
- Response type safety

### UI Components
- Responsive task list component
- Task creation form
- Login and signup forms
- Error display components

## API Client Usage
The centralized API client in `lib/api.ts` handles all backend requests:

```typescript
import { apiClient } from '@/lib/api';

// Example: Get user's tasks
const tasks = await apiClient.get(`/api/${userId}/tasks`);

// Example: Create a new task
const newTask = await apiClient.post(`/api/${userId}/tasks`, {
  title: 'New task',
  description: 'Task description',
  completed: false
});
```

## Troubleshooting
- If authentication fails, verify that the `BETTER_AUTH_SECRET` matches the backend
- If API calls return 401, check that JWT tokens are being properly included in requests
- If routes are not protected, verify middleware.ts is properly configured
- Check browser console for client-side errors
- Verify backend is running and accessible at the configured URL