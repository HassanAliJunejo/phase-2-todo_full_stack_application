---

description: "Actionable tasks for Backend Modular Restructure with Auth Integration"
---

# Tasks: Backend Modular Restructure with Auth Integration

**Input**: Design documents from `/specs/002-db-schema-crud-api/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `backend/` at repository root
- Paths shown below assume web app structure based on plan.md

<!--
  ============================================================================
  IMPORTANT: The tasks below are ACTUAL TASKS based on the design artifacts:
  - User stories from spec.md (with their priorities P1, P2, P3...)
  - Feature requirements from plan.md
  - Entities from data-model.md
  - Endpoints from contracts/
  ============================================================================
-->

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create backend/src directory structure
- [X] T002 [P] Create backend/src/api/ directory
- [X] T003 [P] Create backend/src/api/routes/ directory
- [X] T004 Update backend/requirements.txt with auth dependencies (python-jose, passlib, bcrypt)
- [X] T005 Initialize alembic migrations in backend/alembic/
- [X] T006 Update backend/.env with BETTER_AUTH_SECRET variable

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T007 Move existing backend/models.py to backend/src/models.py
- [X] T008 Move existing backend/db.py to backend/src/db.py
- [X] T009 Create backend/src/auth.py with JWT verification utilities
- [X] T010 Create backend/src/api/routes/__init__.py
- [X] T011 Create backend/src/__init__.py
- [X] T012 Update backend/src/models.py with proper imports for new structure
- [X] T013 Update backend/src/db.py with proper imports for new structure
- [X] T014 Create database initialization function in backend/src/db.py for Alembic

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Create and Manage Personal Tasks (Priority: P1) 🎯 MVP

**Goal**: Enable users to create, view, update, and delete their personal tasks through a RESTful API with authentication.

**Independent Test**: Can be fully tested by calling the CRUD endpoints directly with valid user credentials and JWT tokens, verifying that tasks are properly stored and retrieved from the database.

### Implementation for User Story 1

- [X] T015 [US1] Create backend/src/api/routes/tasks.py with security dependencies
- [X] T016 [US1] Move existing endpoint logic to backend/src/api/routes/tasks.py
- [X] T017 [US1] Create GET /api/{user_id}/tasks endpoint with JWT verification
- [X] T018 [US1] Create POST /api/{user_id}/tasks endpoint with JWT verification
- [X] T019 [US1] Create GET /api/{user_id}/tasks/{id} endpoint with JWT verification
- [X] T020 [US1] Create PUT /api/{user_id}/tasks/{id} endpoint with JWT verification
- [X] T021 [US1] Create DELETE /api/{user_id}/tasks/{id} endpoint with JWT verification
- [X] T022 [US1] Implement basic error handling for 401/403 (Unauthorized/Forbidden)
- [X] T023 [US1] Update backend/src/main.py to include new route structure
- [X] T024 [US1] Verify endpoints follow the /api/{user_id}/tasks pattern with auth as specified

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Data Validation and Error Handling (Priority: P2)

**Goal**: Validate input data and provide clear error messages when invalid data is submitted, with proper authentication.

**Independent Test**: Can be tested by submitting various invalid data formats to the API endpoints with valid JWT tokens and verifying that appropriate error responses are returned.

### Implementation for User Story 2

- [X] T025 [US2] Enhance Task model with Pydantic validation for title length (1-200 chars)
- [X] T026 [US2] Enhance Task model with Pydantic validation for description length (<1000 chars)
- [X] T027 [US2] Enhance User model with Pydantic validation for email format
- [X] T028 [US2] Enhance User model with Pydantic validation for name length (1-100 chars)
- [X] T029 [US2] Add validation to POST endpoint to reject invalid task data
- [X] T030 [US2] Add validation to PUT endpoint to reject invalid task updates
- [X] T031 [US2] Ensure all validation errors return appropriate 400 responses with details
- [X] T032 [US2] Test validation with various invalid inputs and verify error responses

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Secure Data Isolation (Priority: P3)

**Goal**: Ensure users can only access their own tasks and not other users' tasks, with proper JWT verification.

**Independent Test**: Can be tested by having multiple users with tasks and verifying that each user can only access their own tasks through the API with valid JWT tokens.

### Implementation for User Story 3

- [X] T033 [US3] Enhance JWT verification in backend/src/auth.py to extract user_id
- [X] T034 [US3] Add user_id validation in GET /api/{user_id}/tasks to verify JWT matches URL
- [X] T035 [US3] Add user_id validation in POST /api/{user_id}/tasks to ensure task belongs to correct user
- [X] T036 [US3] Add user_id validation in GET /api/{user_id}/tasks/{id} to verify ownership and JWT
- [X] T037 [US3] Add user_id validation in PUT /api/{user_id}/tasks/{id} to verify ownership and JWT
- [X] T038 [US3] Add user_id validation in DELETE /api/{user_id}/tasks/{id} to verify ownership and JWT
- [X] T039 [US3] Add database-level indexes for efficient user_id filtering
- [X] T040 [US3] Test data isolation with multiple users and verify no cross-user access
- [X] T041 [US3] Verify that all queries properly filter by authenticated user's ID

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T042 [P] Add comprehensive API documentation with example requests/responses
- [X] T043 Create basic integration tests covering all CRUD operations with auth
- [X] T044 Verify database connection to Neon PostgreSQL establishes within 10 seconds
- [X] T045 Test API endpoints to ensure responses are within 2 seconds for 95% of calls
- [X] T046 Verify all endpoints return appropriate HTTP status codes (200, 201, 400, 401, 403, 404, 204, 500)
- [X] T047 Test that users can create, read, update, and delete tasks with 99% success rate
- [X] T048 Verify 0% cross-user data leakage during testing
- [X] T049 Update README.md with setup and usage instructions for new structure
- [X] T050 Run code through formatter (black) and linter (flake8 or pylint)
- [X] T051 Perform final verification that all functional requirements from spec are met

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable

### Within Each User Story

- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- Models within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all models for User Story 1 together:
Task: "Update backend/src/models.py with proper imports for new structure"

# Launch all endpoints for User Story 1 together:
Task: "Create GET /api/{user_id}/tasks endpoint with JWT verification"
Task: "Create POST /api/{user_id}/tasks endpoint with JWT verification"
Task: "Create GET /api/{user_id}/tasks/{id} endpoint with JWT verification"
Task: "Create PUT /api/{user_id}/tasks/{id} endpoint with JWT verification"
Task: "Create DELETE /api/{user_id}/tasks/{id} endpoint with JWT verification"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T042 [P] Add comprehensive API documentation with example requests/responses
- [X] T043 Create basic integration tests covering all CRUD operations with auth
- [X] T044 Verify database connection to Neon PostgreSQL establishes within 10 seconds
- [X] T045 Test API endpoints to ensure responses are within 2 seconds for 95% of calls
- [X] T046 Verify all endpoints return appropriate HTTP status codes (200, 201, 400, 401, 403, 404, 204, 500)
- [X] T047 Test that users can create, read, update, and delete tasks with 99% success rate
- [X] T048 Verify 0% cross-user data leakage during testing
- [X] T049 Update README.md with setup and usage instructions for new structure
- [X] T050 Run code through formatter (black) and linter (flake8 or pylint)
- [X] T051 Perform final verification that all functional requirements from spec are met

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable

### Within Each User Story

- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- Models within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all models for User Story 1 together:
Task: "Update backend/src/models.py with proper imports for new structure"

# Launch all endpoints for User Story 1 together:
Task: "Create GET /api/{user_id}/tasks endpoint with JWT verification"
Task: "Create POST /api/{user_id}/tasks endpoint with JWT verification"
Task: "Create GET /api/{user_id}/tasks/{id} endpoint with JWT verification"
Task: "Create PUT /api/{user_id}/tasks/{id} endpoint with JWT verification"
Task: "Create DELETE /api/{user_id}/tasks/{id} endpoint with JWT verification"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence