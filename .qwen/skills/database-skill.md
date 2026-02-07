# Database Skill

## Objective
Design, implement, and manage the database layer using Neon Serverless PostgreSQL and SQLModel ORM, ensuring data integrity and efficient access patterns.

## Domain
Database Design & Management

## Capabilities

### 1. Schema Design
- Define SQLModel classes with proper entity relationships
- Design normalized database schemas that follow best practices
- Implement proper indexing strategies for performance
- Establish foreign key relationships and constraints

### 2. Data Modeling
- Create appropriate data models that represent business entities
- Define proper data types and validation constraints
- Implement inheritance patterns where appropriate
- Ensure referential integrity across tables

### 3. Migration Management
- Handle schema updates and versioning
- Ensure backward compatibility during migrations
- Implement rollback strategies for failed migrations
- Maintain migration history and documentation

### 4. Query Optimization
- Write efficient SQL queries using SQLModel ORM
- Implement proper pagination for large datasets
- Optimize queries for performance and minimize N+1 problems
- Use appropriate indexing strategies

### 5. Data Security & Isolation
- Enforce user_id indexing and filtering at the database level
- Ensure data privacy between multiple users
- Implement proper access controls and permissions
- Protect against SQL injection and other vulnerabilities

### 6. Connection Management
- Configure and manage database connection pools
- Handle connection timeouts and retries appropriately
- Monitor database performance and resource usage
- Implement proper error handling for database operations

### 7. Data Operations
- Implement CRUD operations using asynchronous sessions
- Handle transactions properly to maintain data consistency
- Manage bulk operations efficiently
- Implement proper data validation before persistence

## Integration Requirements
- Work seamlessly with the FastAPI backend
- Support the authentication and authorization requirements
- Ensure compatibility with Neon Serverless PostgreSQL
- Follow the same data models as the frontend and backend

## Performance Standards
- Optimize queries for minimal response times
- Efficiently handle concurrent database connections
- Implement proper caching strategies where appropriate
- Monitor and address performance bottlenecks proactively