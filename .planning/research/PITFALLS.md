# Domain Pitfalls

**Domain:** Library Management System
**Researched:** 2026-06-13

## Critical Pitfalls

Mistakes that cause rewrites or major issues.

### Pitfall 1: Book vs. BookCopy Confusion
**What goes wrong:** Designing the schema so a "Loan" references a "Book" (Title) instead of a specific "BookCopy" (Physical item).
**Why it happens:** Simplistic thinking that "one title = one book".
**Consequences:** Impossible to track which physical copy was lost or damaged if the library has multiple copies of the same title.
**Prevention:** Use a 1:N relationship between Books and BookCopies.

### Pitfall 2: Reservation Race Conditions
**What goes wrong:** Two users click "Reserve" at the same time for the last copy, and both are told they got it.
**Why it happens:** Lack of database transactions or locking.
**Consequences:** Physical conflict at the library desk; loss of user trust.
**Prevention:** Use `SELECT ... FOR UPDATE` or serializable transactions in the reservation logic.

## Moderate Pitfalls

### Pitfall 1: Timezone Inconsistency in Fines
**What goes wrong:** Fines being calculated differently based on whether the server or client is in UTC vs. Local Time.
**Prevention:** Store all loan/due dates in UTC and normalize calculations in the backend.

### Pitfall 2: ISBN Formatting
**What goes wrong:** Searching fails because one record has dashes (978-0-...) and another doesn't.
**Prevention:** Sanitize ISBNs on entry (remove dashes/spaces) and store them as raw strings.

## Minor Pitfalls

### Pitfall 1: Brittle Barcode Scanning
**What goes wrong:** Frontend scanner failing on older laptop cameras or under low light.
**Prevention:** Use a library that supports Web Workers (ZBar WASM) for faster decoding and provide a manual entry fallback.

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Cataloging | Missing Many-to-Many for Authors | Use a junction table `BookAuthors` from day one. |
| Circulation | Overdue logic performance | Use an indexed `due_date` column; don't calculate "overdue" status on the fly for thousands of records. |
| Reservations | Deadlocks | Ensure a consistent ordering of locks (e.g., always lock Member then BookCopy). |

## Sources

- [Post-mortem: Library Concurrency Issues (designgurus.io)](https://designgurus.io)
- [Common SQL Schema Mistakes in LMS](https://dev.to)
