# Decision Log

## 001 - Start With DecisionTrail

Date: 2026-05-01

Decision:

Start the portfolio mini-project sequence with DecisionTrail.

Context:

The portfolio process needs strong documentation discipline. A decision log app directly supports that workflow and creates a useful first case study.

Options considered:

- Start with a client intake form
- Start with a proposal scope estimator
- Start with a decision log app

Why this choice:

DecisionTrail is smaller than the client intake and scope estimator concepts while still showing real product thinking, data modeling, search/filter UX, and documentation practices.

Consequences:

- The first project can become a support tool for later projects.
- The MVP must avoid becoming too meta or abstract.
- The app needs enough polish to stand alone as a useful product.

## 002 - Use One Repo Per Project

Date: 2026-05-01

Decision:

DecisionTrail should become its own project repository rather than living inside the planning hub.

Context:

Each mini-project should stand alone for GitHub, deployment, documentation, and portfolio review.

Options considered:

- One monorepo for all mini-projects
- One repo per project plus a planning hub

Why this choice:

One repo per project gives each app a cleaner README, commit history, release history, and deployment setup.

Consequences:

- There is more setup overhead.
- Each project can use a stack appropriate to its problem.
- The planning hub remains focused on strategy and bootstrap docs.

## 003 - Initial Stack Direction

Date: 2026-05-01

Decision:

Use Next.js and TypeScript as the likely application foundation for DecisionTrail.

Context:

DecisionTrail needs a polished form-heavy UI, server-side persistence, search/filter workflows, and a deployment-friendly setup.

Options considered:

- Next.js full-stack app
- React frontend plus separate Node API
- Python FastAPI backend plus React frontend
- Go backend plus server-rendered UI

Why this choice:

Next.js keeps the first project focused while still showing full-stack product development. Other projects can introduce Python, Go, .NET, or Java later.

Consequences:

- Backend diversity will come from later projects.
- The implementation should still document server-side design clearly.
- Auth provider selection remains open.

## 004 - Include Basic Authentication In The MVP

Date: 2026-05-01

Decision:

Include basic authentication from the beginning.

Context:

Decision records may contain project context, tradeoffs, and notes that should not be globally writable or readable in a public deployment.

Options considered:

- No authentication for MVP
- No authentication with a read-only public demo
- Basic authentication from the beginning

Why this choice:

Authentication makes the app more realistic and avoids awkward public-demo constraints around write access.

Consequences:

- The MVP is larger.
- User-owned data must be modeled from the beginning.
- The auth provider or implementation approach still needs to be selected.

## 005 - Use PostgreSQL And Drizzle

Date: 2026-05-01

Decision:

Use PostgreSQL for persistence and Drizzle ORM for schema/query management.

Context:

DecisionTrail needs a realistic relational data model while staying lightweight enough for a focused MVP.

Options considered:

- PostgreSQL with Drizzle
- PostgreSQL with Prisma
- SQLite/Turso
- Browser local storage

Why this choice:

PostgreSQL is a career-relevant production database. Drizzle keeps schema and queries explicit, which supports the documentation and professional case-study goals.

Consequences:

- Local development should use Docker Compose PostgreSQL.
- Deployment needs a hosted PostgreSQL provider.
- Migrations and schema changes should be documented clearly.

## 006 - Support Copy And Download Markdown Export

Date: 2026-05-01

Decision:

Support both copy-to-clipboard and `.md` file download for exported decisions.

Context:

Markdown export is central to the app's usefulness because decisions should be portable into project docs, ADR files, and blog drafts.

Options considered:

- Copy Markdown only
- Download Markdown only
- Support both

Why this choice:

Both export modes are useful and small enough to include in the MVP.

Consequences:

- The export function should be tested independently.
- The UI needs a clear export affordance on the decision detail page.

## 007 - Use Auth.js For Authentication

Date: 2026-05-01

Decision:

Use Auth.js for MVP authentication.

Context:

DecisionTrail needs basic auth from the beginning so decision records are scoped to a signed-in user. The project should stay self-contained and avoid depending on a hosted auth product for the MVP.

Options considered:

- Auth.js
- Clerk
- Supabase Auth
- Custom auth without an auth library

Why this choice:

Auth.js works well with Next.js App Router, keeps the auth layer inside the application stack, and supports a credentials provider for the first MVP.

Consequences:

- The MVP uses `next-auth@beta` for the current Auth.js v5 API.
- The app owns user/password handling and must hash passwords securely.
- OAuth providers can be added later if useful.

## 008 - Use Neon For Hosted PostgreSQL

Date: 2026-05-01

Decision:

Use Neon as the preferred hosted PostgreSQL provider for deployment.

Context:

DecisionTrail needs a realistic hosted Postgres target without requiring database infrastructure work.

Options considered:

- Neon
- Supabase Postgres
- Vercel Postgres
- Self-hosted PostgreSQL

Why this choice:

Neon provides hosted Postgres with a deployment-friendly workflow and keeps the project focused on product development rather than infrastructure setup.

Consequences:

- Local development uses Docker Compose Postgres.
- Production deployment will need a Neon connection string in `DATABASE_URL`.
- Deployment docs should explain the local-vs-hosted database split.

## 009 - Keep Project As A Text Field For MVP

Date: 2026-05-01

Decision:

Represent the decision's project as a `project_name` text field in the MVP.

Context:

DecisionTrail needs project-level filtering, but a full project management model is not necessary for the first version.

Options considered:

- `project_name` text field
- Separate `projects` table

Why this choice:

A text field supports the MVP workflow while keeping the data model focused on decision records.

Consequences:

- Project names may need normalization later.
- A separate `projects` table can be introduced once project-level metadata becomes useful.

## 010 - Use A Controlled Demo Account

Date: 2026-05-01

Decision:

Use a controlled demo account for the deployed portfolio demo instead of allowing open public sign-ups.

Context:

DecisionTrail includes authentication and user-scoped data. A public portfolio deployment should be easy for reviewers to inspect without inviting unmoderated account creation or random data into the production database.

Options considered:

- Open public sign-ups
- Invite-only sign-ups
- Controlled demo account

Why this choice:

A controlled demo account keeps the reviewer experience predictable and avoids abuse/moderation concerns that are outside the MVP scope.

Consequences:

## 011 - Initialize GEMINI.md For AI Context

Date: 2026-05-05

Decision:

Generate and maintain a `GEMINI.md` file in the project root.

Context:

As the project grows, keeping AI agents aligned with the architecture, tech stack, and development conventions becomes critical for productivity and safety.

Options considered:

- Rely on README.md and existing docs
- Create a specialized `GEMINI.md` instructional context

Why this choice:

`GEMINI.md` provides a structured, high-signal reference for AI agents that is separate from user-facing documentation, ensuring they follow the project's specific mandates and standards.

Consequences:

- AI agents will have a clear source of truth for project-specific instructions.
- The file must be updated as the project's architecture or conventions evolve.
