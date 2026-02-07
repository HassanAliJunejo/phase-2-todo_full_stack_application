---
id: "002"
title: "Backend Modular Auth Planning"
stage: "plan"
date_iso: "2026-01-27"
surface: "agent"
model: "openai/gpt-4"
feature: "002-db-schema-crud-api"
branch: "modular-backend-auth"
user: "user"
command: "/sp.plan Objective: Restructure the backend into a modular 'src' directory pattern and implement Auth logic."
labels: ["backend", "auth", "restructure", "modular", "jwt", "security"]
links:
  spec: "specs/002-db-schema-crud-api/spec.md"
  ticket: null
  adr: null
  pr: null
files_yaml:
  - "specs/002-db-schema-crud-api/plan.md"
  - "specs/002-db-schema-crud-api/research.md"
  - "specs/002-db-schema-crud-api/data-model.md"
  - "specs/002-db-schema-crud-api/quickstart.md"
  - "specs/002-db-schema-crud-api/contracts/task-api-contract.md"
tests_yaml: []
prompt_text: |
  /sp.plan Objective: Restructure the backend into a modular 'src' directory pattern and implement Auth logic.

  Steps:
  1. **Restructure Folders:** - Move existing `models.py`, `main.py`, and `db.py` into a new `backend/src/` directory.
     - Create `backend/src/api/routes/` and move endpoint logic there.
  2. **Setup Alembic:** Initialize migrations folder as seen in the reference image.
  3. **Environment Setup:** Ensure `.env` is updated with `BETTER_AUTH_SECRET` and `DATABASE_URL`.
  4. **Auth Integration:** - Create `backend/src/auth.py` for JWT verification.
     - Add security dependencies to all routes in `src/api/routes/tasks.py`.

  Verification: 
  - Verify the server starts using `uvicorn src.main:app --reload`.
response_text: |
  Successfully executed the implementation planning workflow for restructuring the backend into a modular 'src' directory pattern and implementing Auth logic.
  
  Created the following design artifacts:
  - plan.md: Detailed implementation plan with technical context and project structure
  - research.md: Research summary with technical decisions and rationale
  - data-model.md: Updated data model with authentication considerations
  - quickstart.md: Setup instructions for the restructured backend
  - contracts/task-api-contract.md: API contract with authentication requirements
outcome: "Planning phase completed successfully with all required design artifacts created"
evaluation: "The plan addresses all requirements from the user input, including modular structure, auth integration, Alembic setup, and proper security measures"
---

## Planning Summary

Successfully executed the implementation planning workflow for restructuring the backend into a modular 'src' directory pattern and implementing Auth logic.

### Created Design Artifacts:

1. **plan.md**: Detailed implementation plan outlining the technical context, constitution check, and new project structure with modular 'src' directory and auth integration.

2. **research.md**: Research summary documenting technical decisions including:
   - Modular directory structure rationale
   - Alembic for database migrations
   - JWT authentication with Better Auth
   - Security dependencies in FastAPI
   - Environment configuration for auth secrets

3. **data-model.md**: Updated data model with authentication considerations, specifying how JWT tokens will contain user_id to enforce data isolation.

4. **quickstart.md**: Setup instructions for the restructured backend, including environment configuration with auth secrets and running the application.

5. **contracts/task-api-contract.md**: API contract specifying authentication requirements for all endpoints, requiring valid JWT tokens in Authorization headers.

### Key Planning Decisions:

- **Modular Structure**: Organizing code in `backend/src/` with dedicated route files and centralized auth logic
- **Security-First**: All endpoints will require JWT verification using `BETTER_AUTH_SECRET`
- **Data Isolation**: User_id in URL must match JWT payload to prevent cross-user access
- **Migration Support**: Alembic integration for database schema versioning
- **Clean Architecture**: Clear separation of concerns with dedicated route files

The plan is ready for the task breakdown phase, where these high-level requirements will be converted into specific implementation tasks.