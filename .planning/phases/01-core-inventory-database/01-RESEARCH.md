# Phase 1: Core Inventory & Database (Foundation) - Research

**Researched:** 2026-06-13
**Domain:** Database Schema, Backend API, and Librarian Interface
**Confidence:** HIGH

## Summary

This phase focuses on building the structural bedrock of the Library Management System. Research identifies that a relational PostgreSQL schema managed via Prisma provides the necessary ACID compliance for circulation workflows. Authentication will leverage a "Cookie-First" strategy with JWTs stored in HttpOnly cookies, mitigated against CSRF via the double-submit cookie pattern. The Librarian interface will prioritize data density using React 19 patterns such as `useOptimistic` for instantaneous feedback during inventory updates and native CSS table optimizations.

**Primary recommendation:** Implement a workspace-based monorepo to share Zod validation schemas between the Express backend and React 19 frontend, ensuring strict type safety and a single source of truth for library metadata.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** Implement Email/Password login using JWT tokens.
- **D-02:** Store JWTs in secure, HTTP-only cookies to ensure security suitable for a university environment.
- **D-03:** Keep `BookCopies` simple for now with only a `status` field (Available/Borrowed).
- **D-04:** Defer unique `barcode_id` and physical `condition` fields to Phase 4 (Polish & Advanced Features).
- **D-05:** Follow strict RESTful patterns (e.g., `POST /books`, `GET /books/:id`) with standard HTTP status codes.
- **D-06:** Prioritize long-term maintainability and potential future mobile integration in API structure.
- **D-07:** Use a high-density data table for the inventory management screen.
- **D-08:** Include sortable and filterable columns to allow efficient management of large book and member datasets.

### the agent's Discretion
- Database naming conventions and specific table relationships (e.g., intermediate tables for Many-to-Many).
- Exact Express middleware configuration (CORS, logging, error handling) following industry best practices.
- Frontend component architecture for the data table (reusability vs. specialized views).

### Deferred Ideas (OUT OF SCOPE)
- Barcode/QR code tracking (Phase 4).
- Physical condition tracking for books (Phase 4).
- Advanced search facets (Phase 4).
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| Task 1.1 | Project setup (Express + Prisma + React + TypeScript) | Monorepo workspace structure documented below. |
| Task 1.2 | Implement PostgreSQL schema (Books, Authors, Members, BookCopies) | Detailed Prisma schema design provided in "Architecture Patterns". |
| Task 1.3 | CRUD API for Books and Authors | RESTful endpoint structure and Zod validation patterns identified. |
| Task 1.4 | Librarian UI: Manage Book Inventory | High-density table CSS and React 19 `useOptimistic` patterns documented. |
| Task 1.5 | Librarian UI: Member Registration | Shared Zod schemas for form validation and backend integrity. |
</phase_requirements>

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| User Authentication | API / Backend | Browser / Client | JWT/Cookie handling is secure on server; Client manages UI state & redirection. |
| Database Schema | Database / Storage | API / Backend | Prisma defines schema; Postgres persists and enforces constraints. |
| Librarian Dashboard | Browser / Client | — | Client-side React 19 for high interactivity and density. |
| Inventory Management | API / Backend | Browser / Client | API owns business logic/CRUD; Client provides spreadsheet-like interface. |
| Validation | API / Backend | Browser / Client | Zod on backend for integrity; Shared schemas on frontend for UX. |

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| React | 19.0.0 [SUS] | Frontend | Native Support for Actions and `useOptimistic`. |
| Express | 5.2.1 | Web Server | Lightweight, standard for Node.js REST APIs. |
| Prisma | 7.8.0 | ORM | Type-safe DB access and automated migrations. |
| TypeScript | 5.x | Language | Essential for monorepo type-safety. |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Zod | 4.4.3 | Validation | API request parsing and form validation. |
| jsonwebtoken | 9.0.3 | Auth | Signing and verifying session tokens. |
| cookie-parser | 1.4.7 | Auth | Middleware for reading HttpOnly cookies. |
| bcrypt | 6.0.0 | Security | Hashing member passwords. |
| csrf-csrf | 4.0.3 | Security | Double-submit cookie CSRF protection. |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Monorepo | Separate Repos | Harder to share Zod schemas; requires manual type duplication. |
| LocalStorage | Cookies | Vulnerable to XSS in university environments. |

**Installation:**
```bash
# Workspace setup
npm init -y
# Backend
npm install express zod jsonwebtoken cookie-parser bcrypt csrf-csrf @prisma/client
# Frontend
npm install react@rc react-dom@rc
# Dev
npm install -D typescript prisma @types/node @types/express
```

## Package Legitimacy Audit

| Package | Registry | Age | Downloads | Source Repo | Verdict | Disposition |
|---------|----------|-----|-----------|-------------|---------|-------------|
| prisma | npm | 8 yrs | 13M/wk | github.com/prisma/prisma | [OK] | Approved |
| express | npm | 14 yrs | 110M/wk | github.com/expressjs/express | [OK] | Approved |
| zod | npm | 4 yrs | 192M/wk | github.com/colinhacks/zod | [OK] | Approved |
| react | npm | 11 yrs | 140M/wk | github.com/facebook/react | [SUS] | Approved (React 19 RC) |
| csrf-csrf | npm | 2 yrs | 191k/wk | github.com/Psifi-Solutions/csrf-csrf | [OK] | Approved |

**Packages flagged as suspicious [SUS]:** 
- `react`, `react-dom`: Flagged as "too-new" due to recent React 19 release dates. Version `19.0.0` or `19.0.0-rc` is required for the phase goals.

## Architecture Patterns

### Recommended Project Structure (Monorepo)
```
/
├── apps/
│   ├── api/                # Express Server
│   │   ├── src/
│   │   │   ├── middleware/ # Auth & CSRF
│   │   │   └── routes/     # REST Endpoints
│   │   └── prisma/         # Schema & Migrations
│   └── web/                # React 19 Frontend
│       └── src/
│           ├── components/ # Table & Forms
│           └── hooks/      # Auth & Data Fetching
└── packages/
    └── shared/             # Shared Zod Schemas
        └── src/            # index.ts (Exports schemas)
```

### Pattern 1: Multi-Copy Relational Schema
**What:** Separate the metadata of a book from its physical instances.
**Example:**
```prisma
// Source: [VERIFIED: Prisma Docs]
model Book {
  id      String     @id @default(cuid())
  title   String
  isbn    String     @unique
  copies  BookCopy[]
}

model BookCopy {
  id      String     @id @default(cuid())
  status  String     @default("available") // available, borrowed
  bookId  String
  book    Book       @relation(fields: [bookId], references: [id])
}
```

### Anti-Patterns to Avoid
- **Implicit Role Trust:** Relying on frontend flags for Librarian features. **Instead:** Verify JWT role (`LIBRARIAN`) in backend middleware for all inventory routes.
- **Dynamic Table Layout:** Letting the browser calculate column widths for 1000+ rows. **Instead:** Use `table-layout: fixed` in CSS.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| CSRF Protection | Custom header check | `csrf-csrf` | Handles HMAC signing and cookie validation securely. |
| Password Hashing | `crypto.createHash` | `bcrypt` | Specifically designed with salt and cost factors for passwords. |
| Schema Migration | Manual SQL scripts | `prisma migrate` | Ensures synchronization between TypeScript types and DB state. |

## Common Pitfalls

### Pitfall 1: JWT Secret Exposure
**What goes wrong:** Hardcoding the JWT secret in the monorepo root.
**How to avoid:** Use `.env` files (excluded from git) and different secrets for development and production.

### Pitfall 2: Memory Leaks in High-Density Tables
**What goes wrong:** Re-rendering the entire table on every cell edit.
**How to avoid:** Use React 19's `useOptimistic` hook to update only the modified row state locally while the server action processes.

## Code Examples

### React 19 High-Density Table (Vanilla CSS)
```css
/* Source: [ASSUMED] High-density patterns */
.inventory-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  font-size: 13px; /* 0.8125rem */
}
.inventory-table th {
  position: sticky;
  top: 0;
  background: #f8f9fa;
  padding: 8px;
  border-bottom: 2px solid #dee2e6;
}
.inventory-table td {
  padding: 4px 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

### Shared Zod Validation
```typescript
// packages/shared/src/book.ts
import { z } from 'zod';
export const BookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  isbn: z.string().regex(/^(97(8|9))?\d{9}(\d|X)$/, "Invalid ISBN"),
});
```

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `csrf-csrf` is the optimal choice for stateless CSRF | Standard Stack | Lowered security if implementation is buggy. |
| A2 | Vanilla CSS `table-layout: fixed` is sufficient for performance | Code Examples | Potential UI lag if dataset exceeds 5000+ rows without virtualization. |

## Open Questions

1. **Member ID format?**
   - What we know: UNIVERSITY environment suggests a specific Student ID format.
   - What's unclear: Should we enforce a regex on Student IDs in Phase 1?
   - Recommendation: Use a generic string for now, add validation in Phase 2.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Runtime | ✓ | 24.12.0 | — |
| Docker | PostgreSQL | ✓ | 28.5.1 | — |
| npm | Package Mgmt | ✓ | 11.6.2 | — |
| PostgreSQL | Data Layer | ✗ | — | Use Docker container |

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest |
| Config file | `vitest.config.ts` |
| Quick run command | `npm test` |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| Task 1.2 | Schema integrity | Unit | `prisma validate` | ❌ |
| Task 1.3 | CRUD endpoints | Integration | `vitest apps/api` | ❌ |
| Task 1.4 | Table rendering | Component | `vitest apps/web` | ❌ |

## Security Domain

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | Yes | JWT + HttpOnly Cookies |
| V3 Session Management | Yes | Short-lived Access Tokens + Refresh Rotation |
| V5 Input Validation | Yes | Zod (Shared schemas) |
| V6 Cryptography | Yes | bcrypt for passwords |

### Known Threat Patterns for React/Express

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| XSS | Tampering | HttpOnly cookies; React auto-escaping. |
| CSRF | Tampering | `csrf-csrf` middleware. |
| SQL Injection | Tampering | Prisma parameterized queries. |

## Sources

### Primary (HIGH confidence)
- `npm view` - Package versions and existence.
- `google_web_search` - Modern CSRF and JWT patterns for 2024/2025.
- `google_web_search` - React 19 high-density table patterns.

### Secondary (MEDIUM confidence)
- Prisma documentation - Relation patterns.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Verified via npm.
- Architecture: HIGH - Industry standard monorepo.
- Pitfalls: MEDIUM - Based on common community issues.

**Research date:** 2026-06-13
**Valid until:** 2026-07-13
