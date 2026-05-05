# DecisionTrail: Project Instructions

DecisionTrail is a lightweight decision log for solo developers and small teams to preserve the context behind technical and product decisions.

## Project Overview

- **Main Technologies:** Next.js (App Router), TypeScript, Tailwind CSS 4, Drizzle ORM, NextAuth 5 (Auth.js), PostgreSQL.
- **Architecture:** Full-stack web application. Data persistence is handled via Drizzle ORM with a PostgreSQL database. Authentication is managed by NextAuth with a credentials provider.
- **Key Features:** Decision record creation, editing, history viewing, filtering, searching, and Markdown export.

## Building and Running

### Prerequisites
- Node.js (Latest LTS recommended)
- pnpm (Preferred package manager)
- Docker & Docker Compose (for local PostgreSQL)

### Key Commands
- `pnpm install`: Install dependencies.
- `pnpm dev`: Start the development server.
- `pnpm build`: Build the project for production.
- `pnpm start`: Start the production server.
- `pnpm lint`: Run ESLint.
- `pnpm db:generate`: Generate Drizzle migrations.
- `pnpm db:migrate`: Run Drizzle migrations.
- `pnpm db:studio`: Open Drizzle Studio for database exploration.

### Local Database Setup
The project uses Docker Compose for a local PostgreSQL instance.
```bash
docker-compose up -d
```
The database is exposed on host port `5433`.

## Project Structure

- `src/app/`: Next.js App Router pages and layouts.
- `src/app/(auth)/`: Authentication-related pages (sign-in, sign-up).
- `src/app/api/auth/`: NextAuth route handler.
- `src/db/`: Database configuration and schema.
- `src/lib/`: Shared utility functions and validations.
- `src/types/`: TypeScript type definitions.
- `docs/`: Comprehensive project documentation.
- `drizzle/`: Database migrations and metadata.

## Development Conventions

- **Server Actions:** Use Server Actions for data mutations and form submissions.
- **Validations:** Use Zod for schema validation (see `src/lib/validations/`).
- **Styling:** Use Tailwind CSS 4 and shadcn/ui components (if present/added).
- **Type Safety:** Ensure strict TypeScript usage, especially for database schemas and API responses.
- **Authentication:** Protect routes and scope data to the authenticated user. See `src/auth.ts`.

## Environment Variables

Required environment variables for local development:
- `DATABASE_URL`: `postgres://decisiontrail:decisiontrail@localhost:5433/decisiontrail`
- `AUTH_SECRET`: Generate a random secret for NextAuth.
- `AUTH_URL`: `http://localhost:3000` (optional for local dev).

## Documentation Reference
Refer to the `docs/` directory for detailed information:
- [Architecture](docs/ARCHITECTURE.md)
- [Requirements](docs/REQUIREMENTS.md)
- [Development Guide](docs/DEVELOPMENT.md)
- [Testing Guide](docs/TESTING.md)