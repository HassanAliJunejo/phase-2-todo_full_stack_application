# API Contract: Task Management Endpoints with Auth

## Overview
This document specifies the API contract for the task management endpoints with authentication, following the RESTful pattern `/api/{user_id}/tasks` and requiring JWT authentication.

## Base URL
```
https://api.example.com/api/{user_id}/
```

## Common Headers
- `Content-Type: application/json`
- `Authorization: Bearer <jwt_token>` (required for all endpoints)

## Authentication Requirements
- All endpoints require a valid JWT token in the Authorization header
- The user_id in the URL must match the user_id in the JWT payload
- Invalid or missing tokens will result in 401 Unauthorized responses

## Endpoints

### 1. List Tasks
- **Method**: `GET`
- **Path**: `/tasks`
- **Description**: Retrieve all tasks for a specific user
- **Parameters**:
  - `user_id` (path, integer, required): The ID of the user whose tasks to retrieve
- **Headers**:
  - `Authorization: Bearer <valid_jwt_token>` (required)
- **Responses**:
  - `200 OK`: Successfully retrieved tasks
    ```json
    [
      {
        "id": 1,
        "title": "Sample task",
        "description": "Sample description",
        "completed": false,
        "user_id": 123,
        "created_at": "2023-01-01T10:00:00Z",
        "updated_at": "2023-01-01T10:00:00Z"
      }
    ]
    ```
  - `401 Unauthorized`: Invalid or missing JWT token
  - `403 Forbidden`: User_id in URL doesn't match JWT payload
  - `404 Not Found`: User not found
  - `500 Internal Server Error`: Server error

### 2. Create Task
- **Method**: `POST`
- **Path**: `/tasks`
- **Description**: Create a new task for a specific user
- **Parameters**:
  - `user_id` (path, integer, required): The ID of the user to create the task for
- **Headers**:
  - `Authorization: Bearer <valid_jwt_token>` (required)
- **Request Body**:
  ```json
  {
    "title": "New task title",
    "description": "Task description (optional)",
    "completed": false
  }
  ```
- **Responses**:
  - `201 Created`: Task successfully created
    ```json
    {
      "id": 1,
      "title": "New task title",
      "description": "Task description (optional)",
      "completed": false,
      "user_id": 123,
      "created_at": "2023-01-01T10:00:00Z",
      "updated_at": "2023-01-01T10:00:00Z"
    }
    ```
  - `400 Bad Request`: Invalid input data
  - `401 Unauthorized`: Invalid or missing JWT token
  - `403 Forbidden`: User_id in URL doesn't match JWT payload
  - `404 Not Found`: User not found
  - `500 Internal Server Error`: Server error

### 3. Get Task
- **Method**: `GET`
- **Path**: `/tasks/{id}`
- **Description**: Retrieve a specific task for a user
- **Parameters**:
  - `user_id` (path, integer, required): The ID of the user
  - `id` (path, integer, required): The ID of the task to retrieve
- **Headers**:
  - `Authorization: Bearer <valid_jwt_token>` (required)
- **Responses**:
  - `200 OK`: Task successfully retrieved
    ```json
    {
      "id": 1,
      "title": "Sample task",
      "description": "Sample description",
      "completed": false,
      "user_id": 123,
      "created_at": "2023-01-01T10:00:00Z",
      "updated_at": "2023-01-01T10:00:00Z"
    }
    ```
  - `401 Unauthorized`: Invalid or missing JWT token
  - `403 Forbidden`: User_id in URL doesn't match JWT payload
  - `404 Not Found`: Task or user not found
  - `500 Internal Server Error`: Server error

### 4. Update Task
- **Method**: `PUT`
- **Path**: `/tasks/{id}`
- **Description**: Update a specific task for a user
- **Parameters**:
  - `user_id` (path, integer, required): The ID of the user
  - `id` (path, integer, required): The ID of the task to update
- **Headers**:
  - `Authorization: Bearer <valid_jwt_token>` (required)
- **Request Body**:
  ```json
  {
    "title": "Updated task title",
    "description": "Updated description",
    "completed": true
  }
  ```
- **Responses**:
  - `200 OK`: Task successfully updated
    ```json
    {
      "id": 1,
      "title": "Updated task title",
      "description": "Updated description",
      "completed": true,
      "user_id": 123,
      "created_at": "2023-01-01T10:00:00Z",
      "updated_at": "2023-01-01T11:00:00Z"
    }
    ```
  - `400 Bad Request`: Invalid input data
  - `401 Unauthorized`: Invalid or missing JWT token
  - `403 Forbidden`: User_id in URL doesn't match JWT payload
  - `404 Not Found`: Task or user not found
  - `500 Internal Server Error`: Server error

### 5. Delete Task
- **Method**: `DELETE`
- **Path**: `/tasks/{id}`
- **Description**: Delete a specific task for a user
- **Parameters**:
  - `user_id` (path, integer, required): The ID of the user
  - `id` (path, integer, required): The ID of the task to delete
- **Headers**:
  - `Authorization: Bearer <valid_jwt_token>` (required)
- **Responses**:
  - `204 No Content`: Task successfully deleted
  - `401 Unauthorized`: Invalid or missing JWT token
  - `403 Forbidden`: User_id in URL doesn't match JWT payload
  - `404 Not Found`: Task or user not found
  - `500 Internal Server Error`: Server error

## Error Response Format
For all error responses (4xx, 5xx), the format will be:
```json
{
  "detail": "Human-readable error message"
}
```

## Validation Rules
- All string fields are trimmed of leading/trailing whitespace
- Title must be 1-200 characters
- Description, if provided, must be less than 1000 characters
- Boolean values must be true or false
- Numeric IDs must be positive integers
- JWT token must be valid and not expired
- User_id in URL must match the user_id in the JWT payload