# Roadmap: Library Management System

## Phase 1: Core Inventory & Database (Foundation)

**Goal:** Establish the database schema, backend API, and librarian management interface.
**Plans:** 6 plans
Plans:
**Wave 1**

- [ ] 01-01-PLAN.md — Monorepo & Scaffolding
- [ ] 01-02-PLAN.md — Database Schema & Seed

**Wave 2** *(blocked on Wave 1 completion)*

- [ ] 01-03-PLAN.md — Auth & Security

**Wave 3** *(blocked on Wave 2 completion)*

- [ ] 01-04-PLAN.md — Inventory API

**Wave 4** *(blocked on Wave 3 completion)*

- [ ] 01-05-PLAN.md — Librarian Inventory UI

**Wave 5** *(blocked on Wave 4 completion)*

- [ ] 01-06-PLAN.md — Member Management

- **Task 1.1:** Project setup (Express + Prisma + React + TypeScript).
- **Task 1.2:** Implement PostgreSQL schema (Books, Authors, Members, BookCopies).
- **Task 1.3:** CRUD API for Books and Authors.
- **Task 1.4:** Librarian UI: Manage Book Inventory.
- **Task 1.5:** Librarian UI: Member Registration.

## Phase 2: Search & Circulation (Core Workflows)

**Goal:** Enable students to find books and librarians to manage borrowing.

- **Task 2.1:** Student UI: Catalog Search (PostgreSQL Full-Text Search).
- **Task 2.2:** Borrowing API with concurrency protection (Pessimistic Locking).
- **Task 2.3:** Student UI: My Borrowed Books.
- **Task 2.4:** Librarian UI: Process Returns and view loan history.

## Phase 3: Automation & Notifications (Business Logic)

**Goal:** Automate overdue tracking and fine management.

- **Task 3.1:** Setup BullMQ for background job processing.
- **Task 3.2:** Implement daily overdue check job.
- **Task 3.3:** Fine calculation logic and "Account Status" for students.
- **Task 3.4:** Basic notification system (UI-based alerts).

## Phase 4: Polish & Advanced Features (Refinement)

**Goal:** Enhance usability and add professional touches.

- **Task 4.1:** Mobile responsiveness audit and CSS polish.
- **Task 4.2:** Barcode scanning support for inventory and returns (Frontend-based).
- **Task 4.3:** Dashboard analytics for librarians (Most borrowed books, overdue trends).
- **Task 4.4:** Deployment configuration (Docker/Production readiness).
