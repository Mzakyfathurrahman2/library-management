# Feature Landscape

**Domain:** Library Management System
**Researched:** 2026-06-13

## Table Stakes

Features users expect. Missing = product feels incomplete.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Catalog Search | Basic utility to find books. | Medium | Needs to support Title, Author, ISBN. |
| Check-in/Check-out | Core function of any library. | Medium | Requires barcode scanning support. |
| User Profiles | Students need to see what they have borrowed. | Low | Simple dashboard of active loans. |
| Overdue Tracking | Essential for inventory management. | Medium | Automated status changes based on date. |
| Basic Inventory Management | Librarians must add/edit books. | Low | CRUD operations for books and authors. |

## Differentiators

Features that set product apart. Not expected, but valued.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Reservation Queue | Allows students to wait for popular books. | High | Requires complex concurrency logic. |
| Automated Fines | Transparency for students and revenue for library. | Medium | Integrates with email notifications. |
| Advanced Search Facets | Filter by genre, year, availability. | Medium | Uses Postgres GIN indexes for speed. |
| Self-Service Mobile Scanning | Students check out books via their phone. | High | Requires secure auth and geolocation. |
| Analytics Dashboard | Shows librarians "most popular" books. | Medium | Helpful for budgeting and purchasing. |

## Anti-Features

Features to explicitly NOT build.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| Internal Social Network | High maintenance, distracts from core mission. | Simple "Recommended for you" based on genre. |
| Direct E-book Hosting | Legal/DRM nightmare for custom builds. | Provide links to external platforms (ProQuest/JSTOR). |
| Real-time Chat | Resource heavy for librarians. | Simple notification system for "Book Ready for Pickup". |

## Feature Dependencies

```
Inventory CRUD → Catalog Search
Member Registration → Check-out Logic
Check-out Logic → Overdue Management
Reservation Logic → Hold Queue Notification
```

## MVP Recommendation

Prioritize:
1. **Inventory & Search:** Basic book listing and student-facing search.
2. **Member & Loan Logic:** Registration, borrowing (max 3 books), and manual returns.
3. **Basic Overdue Alert:** Highlighting late books in the librarian dashboard.

Defer: **Fine payments, Reservation queues, Mobile scanning.**

## Sources

- [Modern LMS Requirements (vmedulife.com)](https://vmedulife.com)
- [Library System Feature Matrix (simplelittlelibrarysystem.co.uk)](https://simplelittlelibrarysystem.co.uk)
