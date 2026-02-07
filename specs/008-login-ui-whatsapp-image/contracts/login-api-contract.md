# API Contract: Login Authentication

## Overview
This document specifies the API contract for the login functionality that will be preserved while implementing the new reference image UI design.

## Authentication Endpoint

### POST /api/auth/login
Authenticate user with email and password credentials.

#### Request
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Headers:**
- Content-Type: application/json

#### Response
**Success (200 OK):**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "User Name"
  }
}
```

**Error (401 Unauthorized):**
```json
{
  "error": "Invalid credentials"
}
```

**Error (400 Bad Request):**
```json
{
  "error": "Missing required fields"
}
```

## Social Authentication Endpoints

### GET /api/auth/google
Initiate Google OAuth flow.

#### Response
**Redirect (302):**
Redirects to Google OAuth consent screen.

### GET /api/auth/facebook
Initiate Facebook OAuth flow.

#### Response
**Redirect (302):**
Redirects to Facebook OAuth consent screen.

## Form Validation Requirements

The UI implementation must validate:
- Email format: Must be a valid email address
- Password: Minimum 8 characters with at least one uppercase, lowercase, and number
- Required fields: Both email and password must be provided

## Integration Points

The new UI components must integrate with:
- Existing authentication service
- Better Auth library
- JWT token management
- Error handling system
- Loading states