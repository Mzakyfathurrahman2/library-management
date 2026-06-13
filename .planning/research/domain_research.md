# Domain Research: University Library Management System

This document summarizes the research findings for the development of a modern Library Management System (LMS) using React and Node.js.

## 1. Standard Features of Modern LMS

### Librarian Functions
- **Cataloging & Metadata:** Managing bibliographic data (MARC21/Dublin Core), ISBN, and physical inventory.
- **Circulation Management:** Handling check-ins, check-outs, and physical returns.
- **User Management:** Onboarding students, managing borrowing limits, and integrating with university SSO.
- **Acquisition & Reports:** Tracking new book purchases and library usage analytics.

### Student Functions (OPAC - Online Public Access Catalog)
- **Advanced Search:** Filtering by title, author, genre, and availability.
- **Personal Dashboard:** Viewing active loans, borrowing history, and pending fines.
- **Reservations:** Placing holds on currently borrowed books.

## 2. Common Data Schema (Relational)

A relational database (PostgreSQL) is recommended to maintain consistency across complex relationships.

### Core Tables
- `Books`: ID, Title, ISBN, Genre, PublishedYear.
- `Authors`: ID, Name, Bio.
- `BookAuthors`: Junction table for Many-to-Many relationship.
- `BookCopies`: ID, BookID, Status (Available/Borrowed/Lost/Reserved), Location.
- `Members`: ID, Name, Email, SSO_ID, JoinDate.
- `Loans`: ID, CopyID, MemberID, LoanDate, DueDate, ReturnDate, Status (Active/Returned/Overdue).
- `Fines`: ID, LoanID, Amount, Status (Paid/Unpaid).
- `Holds`: ID, BookID, MemberID, RequestDate, Status (Pending/Fulfilled/Expired).

## 3. Best Practices for Book Indexing and Searching

- **PostgreSQL Full-Text Search (FTS):** Use `tsvector` and `GIN` indexes. This is sufficient for catalogs up to 1-2 million books and avoids the overhead of Elasticsearch.
- **Faceted Search:** Implement filtering (facets) using Postgres `JSONB` or indexed columns to allow students to narrow results quickly.
- **Relevance Scoring:** Use `ts_rank` to ensure the most relevant books appear first.
- **Normalization:** Strip dashes and spaces from ISBNs before storage and search to ensure consistency.

## 4. Potential Challenges & Logic

### Overdue & Fines
- **Logic:** Daily background jobs (e.g., via BullMQ/Redis) should scan for overdue loans.
- **Calculation:** Fines should be calculated at the point of return or periodically on the backend—never on the frontend.

### Reservation Logic (Hold Queue)
- **First-In-First-Out (FIFO):** Use a `Holds` table with timestamps to manage the queue.
- **Concurrency:** Use `Pessimistic Locking` (`SELECT FOR UPDATE`) in database transactions to prevent two students from reserving the last copy of a book simultaneously.
- **Transitions:** When a book is returned, the system should automatically check the hold queue and notify the first person in line, changing the book status to `OnHold`.

## 5. Tech Considerations (React + Node Stack)

- **Barcode Scanning:** Use `modern-barcode-scanner` (React) which utilizes Web Workers for non-blocking UI during scanning.
- **Background Jobs:** Use `BullMQ` with `Redis` for reliable task scheduling (fines, notifications).
- **Authentication:** `Better Auth` is recommended for handling standard student logins and University SSO (SAML/OpenID).
- **PDF Receipts:** Use `Puppeteer` for generating high-quality return receipts or library cards from HTML templates.
- **Real-time Updates:** Use `React Query` (TanStack Query) for auto-refreshing book availability status in the student catalog.

---
*For more detailed specifications, refer to the individual research files in this directory:*
- `SUMMARY.md`: Executive summary and roadmap implications.
- `STACK.md`: Detailed library and version recommendations.
- `FEATURES.md`: Competitive landscape and MVP prioritization.
- `ARCHITECTURE.md`: System structure and design patterns.
- `PITFALLS.md`: Known risks and prevention strategies.
