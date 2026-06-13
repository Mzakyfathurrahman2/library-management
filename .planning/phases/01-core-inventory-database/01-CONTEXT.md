# Phase 1: Core Inventory & Database (Foundation) - Context

**Gathered:** 2026-06-13
**Status:** Ready for planning

<domain>
## Phase Boundary

This phase establishes the foundational infrastructure for the Library Management System. It delivers the relational database schema (PostgreSQL/Prisma), the backend API (Node/Express), and the librarian's administrative dashboard for book inventory and member management.

</domain>

<decisions>
## Implementation Decisions

### Authentication Strategy
- **D-01:** Implement Email/Password login using JWT tokens.
- **D-02:** Store JWTs in secure, HTTP-only cookies to ensure security suitable for a university environment.

### Copy Tracking Detail
- **D-03:** Keep `BookCopies` simple for now with only a `status` field (Available/Borrowed).
- **D-04:** Defer unique `barcode_id` and physical `condition` fields to Phase 4 (Polish & Advanced Features).

### API Design Standards
- **D-05:** Follow strict RESTful patterns (e.g., `POST /books`, `GET /books/:id`) with standard HTTP status codes.
- **D-06:** Prioritize long-term maintainability and potential future mobile integration in API structure.

### Librarian UI Layout
- **D-07:** Use a high-density data table for the inventory management screen.
- **D-08:** Include sortable and filterable columns to allow efficient management of large book and member datasets.

### Claude's Discretion
- Database naming conventions and specific table relationships (e.g., intermediate tables for Many-to-Many).
- Exact Express middleware configuration (CORS, logging, error handling) following industry best practices.
- Frontend component architecture for the data table (reusability vs. specialized views).

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Standards
- `.planning/PROJECT.md` — Core vision and tech stack (React 19, Node, Postgres).
- `.planning/REQUIREMENTS.md` — Functional requirements for User Management (FR-1) and Cataloging (FR-2).
- `.planning/ROADMAP.md` — Phase 1 task breakdown and goals.

### Domain Context
- `.planning/research/ARCHITECTURE.md` — Recommended relational schema and concurrency patterns.
- `.planning/research/STACK.md` — Technology choices (Prisma, BullMQ).

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- None (Fresh project initialization).

### Established Patterns
- None (Phase 1 establishes the patterns for the entire project).

### Integration Points
- This phase is the root integration point for all future UI and API work.

</code_context>

<specifics>
## Specific Ideas
- High-density table should feel "spreadsheet-like" for librarian efficiency.

</specifics>

<deferred>
## Deferred Ideas
- Barcode/QR code tracking (Phase 4).
- Physical condition tracking for books (Phase 4).
- Advanced search facets (Phase 4).

</deferred>

---

*Phase: 1-Core Inventory & Database (Foundation)*
*Context gathered: 2026-06-13*
