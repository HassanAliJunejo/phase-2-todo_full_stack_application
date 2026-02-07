# Data Model: Frontend Next.js Integration with Secure Backend

## Overview
This document defines the data models for the Frontend Next.js Integration with Secure Backend feature, specifically focusing on the frontend representation of backend entities and how they're used in the UI layer.

## Entity: User
- **Fields**:
  - id (string, primary identifier from backend)
  - email (string, unique, required)
  - name (string, required)
  - createdAt (datetime, from backend)
  - updatedAt (datetime, from backend)

- **Validation Rules**:
  - Email must be a valid email format
  - Name must be between 1 and 100 characters

- **Frontend State**:
  - isAuthenticated (boolean, tracks login status)
  - jwtToken (string, stored in secure session/storage)

## Entity: Task
- **Fields**:
  - id (string, primary identifier from backend)
  - title (string, required)
  - description (string, optional)
  - completed (boolean, default false)
  - userId (string, foreign key to User.id, required)
  - createdAt (datetime, from backend)
  - updatedAt (datetime, from backend)

- **Validation Rules**:
  - Title must be between 1 and 200 characters
  - Description, if provided, must be less than 1000 characters
  - UserId must reference an existing user
  - Completed field must be a boolean value

- **UI State**:
  - isEditing (boolean, tracks edit mode)
  - isDeleting (boolean, tracks deletion state)
  - optimisticUpdate (boolean, tracks optimistic UI updates)

## State Transitions
- **Task**:
  - Status can transition from false (incomplete) to true (completed)
  - Once completed, a task can be marked as incomplete again (toggle functionality)
  - Can transition to "deleting" state during removal process

## Frontend Components State
- **LoginForm**:
  - email (string, user input)
  - password (string, user input)
  - isLoading (boolean, during submission)
  - error (string, error message display)

- **TaskForm**:
  - title (string, user input)
  - description (string, user input)
  - completed (boolean, user input)
  - isLoading (boolean, during submission)
  - error (string, validation/error display)

- **TaskList**:
  - tasks (array of Task entities)
  - filter (string, for filtering tasks)
  - isLoading (boolean, during data fetching)
  - error (string, error message display)

## API Request/Response Models
- **LoginRequest**:
  - email (string, required)
  - password (string, required)

- **LoginResponse**:
  - user (User entity)
  - token (string, JWT token)

- **TaskRequest**:
  - title (string, required)
  - description (string, optional)
  - completed (boolean, optional)

- **TaskResponse**:
  - task (Task entity)
  - message (string, success/error message)