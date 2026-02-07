# Backend Skill

## Objective
Develop and maintain the FastAPI backend services, including API architecture, request/response handling, and database connectivity.

## Domain
API Architecture & Database Connectivity

## Capabilities

### 1. API Development
- Create RESTful FastAPI endpoints following the /api/{user_id}/tasks structure
- Implement proper HTTP status codes and error handling
- Design consistent API response formats

### 2. Request/Response Handling
- Use Pydantic models for strict type-checking of incoming payloads
- Validate and sanitize all incoming data
- Format outgoing JSON responses consistently
- Implement proper error responses and messaging

### 3. Database Connectivity
- Establish and manage asynchronous connections to Neon Serverless PostgreSQL
- Use SQLModel ORM for database operations
- Implement connection pooling and error handling
- Handle database transactions appropriately

### 4. CRUD Operations
- Implement Create, Read, Update, Delete operations for all entities
- Ensure all database queries enforce user-level filtering
- Implement proper data validation before database operations
- Handle database errors gracefully

### 5. Security Implementation
- Implement JWT verification middleware
- Ensure all endpoints verify user identity before processing data
- Filter all database queries by the authenticated user's ID
- Protect against common security vulnerabilities (SQL injection, etc.)

### 6. Business Logic
- Implement application-specific business rules
- Handle complex data relationships and constraints
- Ensure data consistency across operations
- Implement proper logging and monitoring

## Integration Requirements
- Integrate seamlessly with frontend API calls
- Maintain consistent data models with the database schema
- Follow security protocols for authentication and authorization
- Support proper error handling and debugging

## Performance Standards
- Optimize database queries for performance
- Implement caching where appropriate
- Ensure efficient resource utilization
- Monitor and address performance bottlenecks