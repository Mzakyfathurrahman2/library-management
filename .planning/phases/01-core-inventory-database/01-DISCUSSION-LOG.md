# Phase 1: Core Inventory & Database (Foundation) - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-13
**Phase:** 1-Core Inventory & Database (Foundation)
**Areas discussed:** Authentication Strategy, Copy Tracking Detail, API Design Standards, Librarian UI Layout

---

## Authentication Strategy

| Option | Description | Selected |
|--------|-------------|----------|
| JWT in HTTP-only Cookies | Suitable for university environment, secure. | ✓ |
| Session-based (express-session) | Traditional stateful sessions. | |
| Development Bypass | Skip auth temporarily to focus on schema. | |

**User's choice:** Email/Password login with JWT tokens stored in HTTP-only cookies.
**Notes:** User emphasized this is suitable for a university library system.

---

## Copy Tracking Detail

| Option | Description | Selected |
|--------|-------------|----------|
| Simple Status | Available/Borrowed only. | ✓ |
| Detailed (Barcode/Condition) | Include barcode_id and condition immediately. | |

**User's choice:** Keep it simple with just a status for now.
**Notes:** Barcode and condition fields deferred to a later phase.

---

## API Design Standards

| Option | Description | Selected |
|--------|-------------|----------|
| Strict RESTful | Standard resources and HTTP codes. | ✓ |
| Flexible/Action-based | Custom endpoints tailored to UI actions. | |

**User's choice:** Strict RESTful patterns with standard HTTP status codes.
**Notes:** Chosen for better long-term maintenance.

---

## Librarian UI Layout

| Option | Description | Selected |
|--------|-------------|----------|
| High-density Table | Sortable, filterable, spreadsheet-like. | ✓ |
| Visual Cards | Larger covers, more whitespace. | |

**User's choice:** High-density data table with sortable and filterable columns.
**Notes:** Efficient for librarians managing hundreds of books.

---

## Claude's Discretion
- Database schema naming and internal structures.
- API middleware and project folder structure.

## Deferred Ideas
- Barcode scanning and condition tracking (Phase 4).
