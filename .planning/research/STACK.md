# Technology Stack

**Project:** Library Management System
**Researched:** 2026-06-13

## Recommended Stack

### Core Framework
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| React | 19 | Frontend | State of the art, server components support, massive ecosystem. |
| Node.js | 22+ (LTS) | Backend | High performance, unified JS/TS stack, great for I/O heavy apps. |
| Express | 5.x | Web Server | Mature, lightweight, and standard for Node APIs. |
| TypeScript | 5.x | Language | Essential for maintainability and catching errors in complex schemas. |

### Database
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| PostgreSQL | 16+ | Primary DB | Strong ACID compliance, superior Full-Text Search, JSONB support for flexible metadata. |
| Prisma | 5.x | ORM | Type-safe database access, automated migrations, excellent DX. |

### Infrastructure
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Redis | 7.x | Caching/Jobs | Backend for BullMQ to handle background fine calculations and notifications. |
| Docker | Latest | Orchestration | Consistent dev/prod environments. |

### Supporting Libraries
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Shadcn/ui | Latest | UI Components | All dashboard and catalog views (accessible & tailwind-based). |
| Better Auth | Latest | Auth/SSO | Implementing University SSO and student login. |
| modern-barcode-scanner | Latest | Scanning | Librarian check-in/out via webcam or dedicated hardware. |
| BullMQ | Latest | Task Queue | Scheduling daily overdue checks and notification emails. |
| TanStack Query | 5.x | Data Fetching | Handling all server state and auto-refreshing availability. |
| Zod | Latest | Validation | Schema validation for API requests and form inputs. |

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Database | PostgreSQL | MongoDB | Library data is inherently relational; Postgres FTS is sufficient without the complexity of NoSQL schema management. |
| Search | Postgres FTS | Elasticsearch | Overkill for <1M books; adds significant operational complexity. |
| Auth | Better Auth | Auth0/Clerk | University systems often prefer self-hosted or standard-based (SAML) auth which Better Auth handles well without per-user costs. |

## Installation

```bash
# Backend dependencies
npm install express @prisma/client zod bullmq better-auth cors dotenv

# Frontend dependencies
npm install lucide-react @tanstack/react-query modern-barcode-scanner clsx tailwind-merge

# Dev dependencies
npm install -D typescript @types/node @types/express prisma tailwindcss postcss autoprefixer
```

## Sources

- [PostgreSQL Full-Text Search Documentation](https://www.postgresql.org/docs/current/textsearch.html)
- [React 19 Release Notes](https://react.dev/blog/2024/12/05/react-19)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
