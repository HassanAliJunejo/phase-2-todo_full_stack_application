# Auth Skill

## Objective
Implement and manage secure user authentication and authorization flows across the full stack application.

## Domain
Authentication & Authorization

## Capabilities

### 1. Authentication Implementation
- Set up Better Auth on the Next.js frontend to issue JWT tokens
- Configure JWT plugins and token management
- Implement secure signup and signin flows

### 2. Token Management
- Issue JWTs on the client side
- Extract and decode Bearer tokens on the FastAPI backend
- Handle token expiry and refresh mechanisms (7-day default)

### 3. Session Handling
- Manage session persistence across application
- Implement secure logout functionality
- Handle token storage and retrieval

### 4. Credential Security
- Ensure proper password hashing (handled by Better Auth)
- Secure transport of secrets via environment variables
- Validate and sanitize all authentication inputs

### 5. Authorization Enforcement
- Implement JWT verification middleware on the backend
- Ensure users can only access or modify their own data
- Map tasks strictly to the decoded JWT payload

## Integration Requirements
- Share `BETTER_AUTH_SECRET` between frontend and backend
- Ensure all API requests include proper Authorization headers
- Filter all data access by authenticated user's ID

## Security Standards
- Follow industry-standard practices for JWT implementation
- Ensure secure transmission of tokens over HTTPS
- Implement proper error handling for authentication failures