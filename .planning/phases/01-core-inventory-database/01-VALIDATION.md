# Phase 1: Core Inventory & Database (Foundation) - Validation

## Test Strategy
Phase 1 focuses on infrastructure and core CRUD. Validation will combine database schema checks, API integration tests, and frontend component tests.

## Automated Test Suite
- **API Tests:** Vitest with Supertest for REST endpoint verification.
- **Database Tests:** Prisma CLI for schema validation and custom scripts for seed integrity.
- **Frontend Tests:** Vitest + React Testing Library for component rendering (specifically the inventory table).

## Requirements → Test Map

| Req ID | Description | Test Case | Automated Command |
|--------|-------------|-----------|-------------------|
| Task 1.1 | Project setup | Workspace linkage check | `npm query .workspace` |
| Task 1.2 | PostgreSQL schema | Prisma schema validation | `npx prisma validate` |
| Task 1.3 | CRUD API | CRUD integration tests | `npx vitest apps/api` |
| Task 1.4 | Librarian UI (Inventory) | Table rendering & density check | `npx vitest apps/web` |
| Task 1.5 | Librarian UI (Members) | Member form validation | `npx vitest apps/web` |

## Acceptance Criteria
- [ ] `npx prisma validate` returns success.
- [ ] API responds with 200 OK for valid REST requests and 401 Unauthorized for unauthenticated requests.
- [ ] JWT is correctly set in HttpOnly cookies upon login.
- [ ] Librarian UI renders the high-density table with sticky headers.
