# Architecture: DecisionTrail

## Tech Stack

Proposed:

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- PostgreSQL
- Drizzle ORM
- Auth.js
- Vercel

## System Overview

DecisionTrail is planned as a small full-stack web app. The frontend provides decision creation, review, search, filtering, and export workflows. The backend persists decision records and exposes the operations needed by the UI.

For a Next.js implementation, the backend may be implemented with server actions or route handlers.

The MVP includes basic authentication from the beginning. Decision records should be scoped to the signed-in user.

## Data Model

### Decision

Candidate fields:

- `id`
- `title`
- `slug`
- `summary`
- `context`
- `options_considered`
- `decision`
- `consequences`
- `status`
- `project_name`
- `tags`
- `created_at`
- `updated_at`
- `archived_at`
- `user_id`

Candidate statuses:

- proposed
- accepted
- superseded
- archived

## API Design

If using route handlers, likely endpoints:

- `GET /api/decisions`
- `POST /api/decisions`
- `GET /api/decisions/:id`
- `PATCH /api/decisions/:id`
- `DELETE /api/decisions/:id`
- `GET /api/decisions/:id/export`

If using server actions, this file should document the action contracts instead of HTTP endpoints.

## Frontend Structure

Likely screens:

- Decision list
- New decision form
- Decision detail
- Edit decision form
- Settings or export options if needed

Likely components:

- Decision card or row
- Decision form
- Status badge
- Tag input
- Search input
- Filter controls
- Markdown export preview

## Backend Structure

Likely responsibilities:

- Validate input
- Persist decisions
- Query decisions with filters
- Generate Markdown export
- Normalize tags

## Security And Privacy Considerations

MVP assumptions:

- Basic authentication is included from the beginning.
- Decision records are private to the signed-in user.
- The app should avoid storing secrets or sensitive client information in demo data.
- Public demo data should be seeded intentionally and should not contain private information.

Authentication uses Auth.js with a credentials provider for the MVP. Hosted PostgreSQL is planned through Neon for deployment. Local PostgreSQL runs through Docker Compose on host port `5433`.

## Tradeoffs

- Including authentication increases MVP scope but makes the deployed product more realistic and safer.
- PostgreSQL makes the project more realistic but adds setup overhead.
- Docker Compose PostgreSQL adds local setup overhead but mirrors the production persistence model.
- Neon is a good deployment fit because it provides hosted Postgres without requiring database infrastructure work.
- Server actions reduce API boilerplate but may make API documentation less traditional.
