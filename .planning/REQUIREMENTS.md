# Requirements: Library Management System

## Functional Requirements

### 1. User Management (FR-1)
- **FR-1.1:** Librarian can register new student members with details: Name, Student ID, Email.
- **FR-1.2:** System supports two roles: Student and Librarian.
- **FR-1.3:** Login system for both roles (Auth to be detailed in Phase 1).

### 2. Catalog Management (FR-2)
- **FR-2.1:** Librarian can add, update, and delete books.
- **FR-2.2:** Metadata includes: Title, Author, ISBN, Genre, Publication Date.
- **FR-2.3:** System tracks physical copies (BookCopies) including status (Available, Borrowed, Reserved, Maintenance).

### 3. Search & Discovery (FR-3)
- **FR-3.1:** Students can search for books by Title, Author, or ISBN.
- **FR-3.2:** Search results show availability status of copies.
- **FR-3.3:** Basic filtering by Genre and Publication Date.

### 4. Circulation (FR-4)
- **FR-4.1:** Students can borrow available books (max 3 books per student).
- **FR-4.2:** System records Borrow Date and Due Date (default 14 days).
- **FR-4.3:** Librarians can process returns, updating copy status to Available.
- **FR-4.4:** Prevent borrowing if the student has overdue books or reached the limit.

### 5. Automation & Notifications (FR-5)
- **FR-5.1:** Daily background job to identify overdue loans.
- **FR-5.2:** Notification system for overdue books (placeholder for email/in-app).
- **FR-5.3:** Fine calculation logic for overdue books.

## Non-Functional Requirements

### 1. Performance (NFR-1)
- **NFR-1.1:** Catalog search should return results in < 1 second.
- **NFR-1.2:** System should handle up to 50 concurrent users.

### 2. Reliability (NFR-2)
- **NFR-2.1:** ACID compliance for borrowing/reservation transactions (PostgreSQL).
- **NFR-2.2:** No double-booking of physical copies.

### 3. Usability (NFR-3)
- **NFR-3.1:** Mobile-responsive web interface.
- **NFR-3.2:** Intuitive navigation for both students and librarians.

## Constraints
- Tech Stack: React 19 (Frontend), Node.js/Express (Backend), PostgreSQL + Prisma (Database).
- Styling: Vanilla CSS.
