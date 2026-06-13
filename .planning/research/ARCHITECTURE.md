# Architecture Patterns

**Domain:** Library Management System
**Researched:** 2026-06-13

## Recommended Architecture

A tiered web architecture with a central relational database.

### Component Boundaries

| Component | Responsibility | Communicates With |
|-----------|---------------|-------------------|
| React Frontend | Student Catalog, Librarian Dashboard | Node API |
| Node.js API | Business Logic (Loans, Reservations), Auth | PostgreSQL, Redis |
| PostgreSQL | Source of Truth (Books, Members, Loans) | Node API |
| Redis | Job Queue State, Session Store | Node API, BullMQ Worker |
| BullMQ Worker | Background Tasks (Overdue checks, Email) | Redis, PostgreSQL |

### Data Flow

1. **Borrowing:** Student selects book → Frontend calls API → API checks availability (Atomic Transaction) → If available, creates Loan record + Updates Book Copy status to 'borrowed'.
2. **Returning:** Librarian scans barcode → Frontend calls API → API closes Loan record + Calculates potential fine → Updates Book Copy status to 'available'.
3. **Overdue Check:** Daily Cron (BullMQ) → Queries 'active' loans where `due_date < now` → Updates status to 'overdue' → Triggers notification email.

## Patterns to Follow

### Pattern 1: Atomic Reservation (Pessimistic Locking)
**What:** Use database-level locks when updating book availability.
**When:** During the "Reserve" or "Checkout" process to prevent double-booking.
**Example:**
```typescript
// Using Prisma for transaction-level locking
await prisma.$transaction(async (tx) => {
  const copy = await tx.bookCopy.findFirst({
    where: { bookId, status: 'available' },
    // Lock the row so others cannot select it until we finish
    forUpdate: true, 
  });

  if (!copy) throw new Error('No copies available');

  await tx.loan.create({ ... });
  await tx.bookCopy.update({ ... });
});
```

### Pattern 2: Multi-Copy Representation
**What:** Split "Book" (bibliographic info like Title/ISBN) from "BookCopy" (physical item with Status/Barcode).
**Why:** Libraries often have 10 copies of one book. You borrow a *copy*, not the title metadata.

## Anti-Patterns to Avoid

### Anti-Pattern 1: Hard-Coding Fine Logic in Frontend
**What:** Calculating fines in the React UI based on current date.
**Why bad:** Students could bypass fines by spoofing their system clock.
**Instead:** API must be the source of truth for all calculations.

### Anti-Pattern 2: Frequent `SELECT COUNT(*)` for Availability
**Why bad:** Slow as the database grows.
**Instead:** Denormalize an `availableCount` field on the `Books` table and update it via triggers or transactions.

## Scalability Considerations

| Concern | At 100 users | At 10K users | At 1M users |
|---------|--------------|--------------|-------------|
| Search | Standard SQL | GIN Index (Postgres) | Elasticsearch/Meilisearch |
| Loan Logic | Simple API calls | Redis Queueing | Microservices (Circulation Svc) |
| Fine Processing | Daily Cron | Distributed BullMQ | Streaming Event Bus (Kafka) |

## Sources

- [Relational Database Design for Libraries (red-gate.com)](https://red-gate.com)
- [Distributed Task Processing with BullMQ](https://docs.bullmq.io)
