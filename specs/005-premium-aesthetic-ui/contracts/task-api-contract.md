# API Contracts: Premium Aesthetic UI

## Overview
This document defines the API contracts required for the premium aesthetic UI implementation, focusing on task management with enhanced metadata and user isolation.

## Authentication
All endpoints require a valid JWT token in the Authorization header:
```
Authorization: Bearer {jwt_token}
```

## Endpoints

### GET /api/{user_id}/tasks
Retrieve all tasks for a specific user with enhanced metadata.

#### Request
- Method: GET
- Path: `/api/{user_id}/tasks`
- Headers:
  - `Authorization: Bearer {jwt_token}`
- Parameters:
  - `user_id` (path): The ID of the user whose tasks to retrieve

#### Response
- Success: 200 OK
- Body:
```json
{
  "data": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "priority": "high|medium|low",
      "completed": "boolean",
      "createdAt": "ISO 8601 datetime string",
      "updatedAt": "ISO 8601 datetime string",
      "userId": "string"
    }
  ],
  "error": "null or error message"
}
```

#### Error Responses
- 401 Unauthorized: Invalid or expired JWT token
- 403 Forbidden: User is trying to access another user's tasks
- 404 Not Found: User with specified ID does not exist
- 500 Internal Server Error: Unexpected server error

### POST /api/{user_id}/tasks
Create a new task for the specified user.

#### Request
- Method: POST
- Path: `/api/{user_id}/tasks`
- Headers:
  - `Authorization: Bearer {jwt_token}`
  - `Content-Type: application/json`
- Parameters:
  - `user_id` (path): The ID of the user to create task for
- Body:
```json
{
  "title": "string (required)",
  "description": "string (optional)",
  "priority": "high|medium|low (default: medium)",
  "completed": "boolean (default: false)"
}
```

#### Response
- Success: 201 Created
- Body:
```json
{
  "data": {
    "id": "string",
    "title": "string",
    "description": "string",
    "priority": "high|medium|low",
    "completed": "boolean",
    "createdAt": "ISO 8601 datetime string",
    "updatedAt": "ISO 8601 datetime string",
    "userId": "string"
  },
  "error": "null or error message"
}
```

#### Error Responses
- 400 Bad Request: Invalid request body
- 401 Unauthorized: Invalid or expired JWT token
- 403 Forbidden: User is trying to create task for another user
- 404 Not Found: User with specified ID does not exist
- 500 Internal Server Error: Unexpected server error

### PUT /api/{user_id}/tasks/{task_id}
Update an existing task.

#### Request
- Method: PUT
- Path: `/api/{user_id}/tasks/{task_id}`
- Headers:
  - `Authorization: Bearer {jwt_token}`
  - `Content-Type: application/json`
- Parameters:
  - `user_id` (path): The ID of the user
  - `task_id` (path): The ID of the task to update
- Body:
```json
{
  "title": "string (optional)",
  "description": "string (optional)",
  "priority": "high|medium|low (optional)",
  "completed": "boolean (optional)"
}
```

#### Response
- Success: 200 OK
- Body:
```json
{
  "data": {
    "id": "string",
    "title": "string",
    "description": "string",
    "priority": "high|medium|low",
    "completed": "boolean",
    "createdAt": "ISO 8601 datetime string",
    "updatedAt": "ISO 8601 datetime string",
    "userId": "string"
  },
  "error": "null or error message"
}
```

#### Error Responses
- 400 Bad Request: Invalid request body
- 401 Unauthorized: Invalid or expired JWT token
- 403 Forbidden: User is trying to update another user's task
- 404 Not Found: Task or user with specified IDs do not exist
- 500 Internal Server Error: Unexpected server error

### DELETE /api/{user_id}/tasks/{task_id}
Delete an existing task.

#### Request
- Method: DELETE
- Path: `/api/{user_id}/tasks/{task_id}`
- Headers:
  - `Authorization: Bearer {jwt_token}`
- Parameters:
  - `user_id` (path): The ID of the user
  - `task_id` (path): The ID of the task to delete

#### Response
- Success: 200 OK
- Body:
```json
{
  "data": "null",
  "error": "null or error message"
}
```

#### Error Responses
- 401 Unauthorized: Invalid or expired JWT token
- 403 Forbidden: User is trying to delete another user's task
- 404 Not Found: Task or user with specified IDs do not exist
- 500 Internal Server Error: Unexpected server error

## Notification Events
The UI should display toast notifications for the following events:

### Task Added
- Event: Successful POST to `/api/{user_id}/tasks`
- Toast Type: Success
- Message: "Task added successfully!"

### Task Updated
- Event: Successful PUT to `/api/{user_id}/tasks/{task_id}`
- Toast Type: Success
- Message: "Task updated successfully!"

### Task Deleted
- Event: Successful DELETE to `/api/{user_id}/tasks/{task_id}`
- Toast Type: Success
- Message: "Task deleted successfully!"

### Unauthorized Access
- Event: Any API request returns 401 or 403
- Toast Type: Error
- Message: "Access denied. Please log in again."
- Action: Redirect to login page

### General Error
- Event: Any API request returns 500
- Toast Type: Error
- Message: "An unexpected error occurred. Please try again."