---
id: "001"
title: "Fix Build Error - Task Card ID Type Mismatch"
stage: "general"
date_iso: "2026-02-06"
surface: "agent"
model: "Qwen"
feature: "none"
branch: "main"
user: "user"
command: "fix-build-error"
labels:
  - "type-error"
  - "task-card"
  - "typescript"
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml:
  - "components/tasks/task-card.tsx"
  - "contexts/task-context.tsx"
  - "hooks/use-task-state.ts"
  - "components/tasks/task-list.tsx"
tests_yaml: []
prompt_text: |
  Fix the build error in the frontend where TaskCard component had a type mismatch.
  Error: Argument of type 'string | number' is not assignable to parameter of type 'number'.
  Occurred in ./components/tasks/task-card.tsx:34:70
response_text: |
  Fixed the type error by updating the interfaces and implementations to properly handle both
  number and string IDs as defined in the Task interface. Updated TaskCardProps, TaskContextType,
  and the corresponding hook implementations to accept both number | string for task IDs.
outcome: "Build error resolved, type compatibility improved across the task management system."
evaluation: "Verified that the type error is fixed by ensuring consistent typing across components."
---

# Fix Build Error - Task Card ID Type Mismatch

## Summary
Fixed a TypeScript build error where the TaskCard component had a type mismatch between the Task interface (which allows id as number | string) and the TaskCardProps interface (which only accepted number).

## Changes Made

### 1. Updated TaskCardProps Interface
Modified `components/tasks/task-card.tsx` to accept both number and string IDs:
```typescript
interface TaskCardProps {
  task: Task;
  onToggleCompletion?: (id: number | string) => void;  // Changed from (id: number) => void
  onEdit?: (task: Task) => void;
  onDelete?: (id: number | string) => void;            // Changed from (id: number) => void
}
```

### 2. Updated TaskContextType Interface
Modified `contexts/task-context.tsx` to reflect that functions accept both types:
```typescript
interface TaskContextType {
  // ... other properties
  deleteTask: (id: number | string) => Promise<void>;         // Changed from (id: number) => void
  toggleTaskCompletion: (id: number | string) => Promise<void>; // Changed from (id: number) => void
  // ... other properties
}
```

### 3. Updated Hook Implementation
Modified `hooks/use-task-state.ts` to handle both number and string IDs:
- Updated `deleteTask` function to accept `id: number | string`
- Updated `toggleTaskCompletion` function to accept `id: number | string`
- Added logic to handle both string and number IDs appropriately

### 4. Updated TaskList Component
Modified `components/tasks/task-list.tsx` to accept both number and string IDs in the handleDelete function.

## Result
The build error has been resolved. The application now properly handles both number and string IDs consistently across the task management system, which aligns with the Task interface definition.