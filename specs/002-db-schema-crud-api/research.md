# Research Summary: Backend Modular Restructure with Auth Integration

## Overview
This research document addresses the technical decisions and unknowns identified during the planning phase for restructuring the backend into a modular 'src' directory pattern and implementing Auth logic.

## Decision: Modular Directory Structure
**Rationale**: The modular 'src' structure improves maintainability, makes the codebase easier to navigate, and follows industry best practices. It separates concerns by placing API routes in dedicated files and centralizes authentication logic.

**Alternatives considered**:
- Flat structure: Would become unwieldy as the application grows
- Microservices: Premature for this application size
- Domain-driven design: Overkill for this simple application

## Decision: Alembic for Database Migrations
**Rationale**: Alembic is the standard migration tool for SQLAlchemy-based applications. It provides version control for database schemas and allows for safe, repeatable schema changes.

**Alternatives considered**:
- Manual migrations: Error-prone and difficult to manage across environments
- Raw SQL scripts: Less maintainable and harder to track changes
- Other ORMs: Would require significant refactoring from current SQLModel setup

## Decision: JWT Authentication with Better Auth
**Rationale**: JWT tokens provide stateless authentication that works well with REST APIs. Better Auth is already specified in the constitution and provides a robust authentication solution.

**Alternatives considered**:
- Session-based auth: Requires server-side state management
- OAuth providers only: Doesn't meet the requirement for custom user management
- API keys: Less secure and doesn't provide user identity claims

## Decision: Security Dependencies in FastAPI
**Rationale**: FastAPI's dependency injection system provides a clean way to add authentication checks to routes. Using Depends() allows for reusable security logic across all endpoints.

**Alternatives considered**:
- Decorators: Less flexible and harder to manage dependencies
- Manual verification in each endpoint: Repetitive and error-prone
- Middleware: Might be too broad for specific endpoint needs

## Decision: Environment Configuration for Auth Secrets
**Rationale**: Storing secrets in environment variables keeps sensitive information out of the codebase and allows for different configurations across environments.

**Alternatives considered**:
- Hardcoded values: Insecure and inflexible
- Configuration files: Risk of committing secrets to version control
- External secret stores: Overkill for this application size