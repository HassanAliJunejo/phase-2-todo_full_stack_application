---

description: "Actionable tasks for Frontend Next.js Integration with Secure Backend"
---

# Tasks: Frontend Next.js Integration with Secure Backend

**Input**: Design documents from `/specs/003-frontend-nextjs-integration/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `frontend/` at repository root
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

- [X] T001 Create frontend directory structure
- [X] T002 [P] Create package.json with Next.js 16+, React 19+, Tailwind CSS dependencies
- [X] T003 [P] Create tsconfig.json with proper TypeScript configuration
- [X] T004 [P] Create next.config.mjs with App Router configuration
- [X] T005 [P] Create tailwind.config.js with proper configuration
- [X] T006 Create .env.local file with placeholder for NEXT_PUBLIC_API_BASE_URL and NEXT_PUBLIC_BETTER_AUTH_SECRET

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T007 Create lib/auth.ts with Better Auth configuration
- [X] T008 Create lib/api.ts with centralized API client and JWT interceptor
- [X] T009 Create middleware.ts for route protection
- [X] T010 Create components/providers/auth-provider.tsx for authentication context
- [X] T011 Create app/layout.tsx with proper providers and styling
- [X] T012 Create app/globals.css with Tailwind directives
- [X] T013 Create types definition files for User and Task entities

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Authenticate and Access Tasks (Priority: P1) 🎯 MVP

**Goal**: Enable users to log in securely and access their personal task list so that they can manage their daily activities efficiently.

**Independent Test**: Can be fully tested by logging in with valid credentials and verifying that the user sees their personal task list without being able to access other users' tasks.

### Implementation for User Story 1

- [X] T014 [US1] Create app/login/page.tsx with login form using Better Auth hooks
- [X] T015 [US1] Create app/signup/page.tsx with signup form using Better Auth hooks
- [X] T016 [US1] Create components/ui/auth-components.tsx with reusable auth UI elements
- [X] T017 [US1] Create app/dashboard/page.tsx to list user's tasks
- [X] T018 [US1] Create components/ui/task-list.tsx to display tasks with user isolation
- [X] T019 [US1] Implement GET /api/{user_id}/tasks API call in dashboard page
- [X] T020 [US1] Add proper error handling for 401/403 (Unauthorized/Forbidden)
- [X] T021 [US1] Verify user sees only their own tasks and not others' tasks
- [X] T022 [US1] Test login with valid credentials redirects to dashboard

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Create and Manage Tasks (Priority: P2)

**Goal**: Allow authenticated users to create, update, and delete their tasks so that they can keep their task list current and accurate.

**Independent Test**: Can be fully tested by creating, updating, and deleting tasks as an authenticated user and verifying that changes are persisted and reflected in the UI.

### Implementation for User Story 2

- [X] T023 [US2] Create components/ui/task-form.tsx for task creation and editing
- [X] T024 [US2] Implement POST /api/{user_id}/tasks API call for creating tasks
- [X] T025 [US2] Implement PUT /api/{user_id}/tasks/{id} API call for updating tasks
- [X] T026 [US2] Implement DELETE /api/{user_id}/tasks/{id} API call for deleting tasks
- [X] T027 [US2] Add optimistic UI updates for task interactions
- [X] T028 [US2] Implement form validation matching backend constraints (Title 1-200 chars, Description <1000)
- [X] T029 [US2] Test task creation, update, and deletion functionality
- [X] T030 [US2] Verify changes are persisted and reflected in the UI

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Handle Authentication Errors (Priority: P3)

**Goal**: Provide clear feedback when authentication fails so that users can correct their credentials or understand why they can't access the application.

**Independent Test**: Can be tested by attempting to log in with invalid credentials and verifying that appropriate error messages are displayed.

### Implementation for User Story 3

- [X] T031 [US3] Enhance login form with error message display for authentication failures
- [X] T032 [US3] Implement session expiration handling and redirect to login
- [X] T033 [US3] Add user-friendly error messages for 401 (Unauthorized) responses
- [X] T034 [US3] Add user-friendly error messages for 400 (Validation) responses
- [X] T035 [US3] Create error boundary components for graceful error handling
- [X] T036 [US3] Test login with invalid credentials shows appropriate error message
- [X] T037 [US3] Test session expiration redirects to login page with notification
- [X] T038 [US3] Verify all error scenarios display user-friendly messages

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T039 [P] Add comprehensive API documentation with example requests/responses
- [X] T040 Create basic integration tests covering all CRUD operations with auth
- [X] T041 Verify API requests include proper JWT authorization headers with 99% success rate
- [X] T042 Test that users can create, read, update, and delete tasks with 99% success rate
- [X] T043 Verify all UI components are responsive on mobile, tablet, and desktop
- [X] T044 Verify error handling displays appropriate user-friendly messages with 100% accuracy
- [X] T045 Update README.md with setup and usage instructions for frontend
- [X] T046 Run code through formatter (prettier) and linter (eslint)
- [X] T47 Perform final verification that all functional requirements from spec are met

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
# Launch all auth components for User Story 1 together:
Task: "Create app/login/page.tsx with login form using Better Auth hooks"
Task: "Create app/signup/page.tsx with signup form using Better Auth hooks"
Task: "Create components/ui/auth-components.tsx with reusable auth UI elements"

# Launch all dashboard components for User Story 1 together:
Task: "Create app/dashboard/page.tsx to list user's tasks"
Task: "Create components/ui/task-list.tsx to display tasks with user isolation"
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