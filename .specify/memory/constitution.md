<!-- SYNC IMPACT REPORT
Version change: N/A -> 1.0.0
Modified principles: None (new constitution)
Added sections: All sections
Removed sections: None
Templates requiring updates:
- .specify/templates/plan-template.md ✅ updated
- .specify/templates/spec-template.md ✅ updated
- .specify/templates/tasks-template.md ✅ updated
- .specify/templates/commands/*.md ✅ reviewed
- README.md ⚠ pending
Follow-up TODOs: None
-->

# Todo Full-Stack Web Application Constitution

## Core Principles

### I. Security-First Design
All features must implement authentication and authorization from the outset; User data must be isolated at the application and database level; Every endpoint must validate user identity and permissions before processing requests.

### II. Correctness of Business Logic
Task ownership must be validated on every operation; State transitions must follow defined rules; Data integrity must be maintained across all operations.

### III. Spec-Driven Development (NON-NEGOTIABLE)
API behavior must be defined in specifications before implementation; All endpoints must have clear request/response schemas documented; Contracts must be agreed upon before development begins.

### IV. Maintainability and Scalability
Code must follow clean architecture principles with clear separation of concerns; Modules must be loosely coupled and highly cohesive; System must support horizontal scaling and evolving requirements.

### V. Full-Stack Consistency
Frontend and backend must adhere to the same data models and API contracts; Shared types and schemas must be maintained across client and server; UI behavior must reflect backend capabilities accurately.

### VI. Quality Assurance

All code must include appropriate unit and integration tests; Error handling must be explicit and consistent across the application; Code must be readable, well-documented, and maintainable.

## Technology Standards

### Tech Stack Requirements
- Frontend: Next.js 16+ with App Router
- Backend: Python FastAPI
- ORM: SQLModel
- Database: Neon Serverless PostgreSQL
- Authentication: Better Auth (JWT-based)
- API style: REST (no GraphQL)

### Implementation Requirements
- All API endpoints must require a valid JWT token
- JWT signature must be verified using shared secret
- Database schema must be normalized and migration-ready
- Frontend must consume APIs strictly according to spec
- Error handling must be explicit and consistent (401, 403, 404, 422)

## Development Workflow

### Security Constraints
- User identity must be extracted from token, not request body
- User ID in URL must match authenticated user
- No cross-user data access under any condition
- Tokens must support expiration and invalid access handling

### Functional Requirements
- Must implement all 5 Basic Level Todo features
- Persistent storage required (no in-memory state)
- Multi-user support required
- Task completion state must be toggleable
- CRUD operations must be idempotent where applicable

### Operational Requirements
- Environment-based configuration (secrets via env vars)
- Shared JWT secret across frontend and backend
- Backend must be stateless
- API must be deployable independently of frontend

## Governance

This constitution governs all development activities for the Todo Full-Stack Web Application. All code reviews, architectural decisions, and feature implementations must comply with these principles. Amendments to this constitution require explicit approval and documentation of the changes and their impact on existing code.

**All API behavior must be defined before implementation. Every endpoint must enforce authenticated user ownership. JWT authentication must be verified on every protected request. RESTful API design with clear request/response schemas is mandatory.**

**Version**: 1.0.0 | **Ratified**: 2026-01-31 | **Last Amended**: 2026-01-31
