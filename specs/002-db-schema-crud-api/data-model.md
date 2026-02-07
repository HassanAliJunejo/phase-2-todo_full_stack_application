# Data Model: Backend Modular Restructure with Auth Integration

## Overview
This document defines the data models for the Backend Modular Restructure with Auth Integration feature, specifically the User and Task entities with their relationships and validation rules, along with authentication-related considerations.

## Entity: User
- **Fields**:
  - id (int, primary_key, autoincrement)
  - email (str, unique, required)
  - name (str, required)
  - created_at (datetime, default now)
  - updated_at (datetime, default now, auto-update)

- **Relationships**:
  - tasks (one-to-many with Task entity)

- **Validation Rules**:
  - Email must be a valid email format
  - Name must be between 1 and 100 characters
  - Email must be unique across all users

## Entity: Task
- **Fields**:
  - id (int, primary_key, autoincrement)
  - title (str, required)
  - description (str, optional)
  - completed (bool, default False)
  - user_id (int, foreign_key to User.id, required)
  - created_at (datetime, default now)
  - updated_at (datetime, default now, auto-update)

- **Relationships**:
  - user (many-to-one with User entity)

- **Validation Rules**:
  - Title must be between 1 and 200 characters
  - Description, if provided, must be less than 1000 characters
  - User_id must reference an existing user
  - Completed field must be a boolean value

## State Transitions
- **Task**:
  - Status can transition from False (incomplete) to True (completed)
  - Once completed, a task can be marked as incomplete again (toggle functionality)

## Indexes
- User.email: Unique index for fast lookup and uniqueness constraint
- Task.user_id: Index for efficient filtering by user
- Task.created_at: Index for chronological sorting of tasks

## Authentication Considerations
- JWT tokens will contain user_id to enforce data isolation
- All API requests will require valid JWT verification
- Database queries will be filtered by the authenticated user's ID