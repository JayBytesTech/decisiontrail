# Project Bootstrap: DecisionTrail

## One-Sentence Description

DecisionTrail is a lightweight decision log for solo developers and small teams who want to preserve the context behind technical and product decisions.

## Problem Statement

Small projects often document what was built, but not why choices were made. When the developer returns weeks or months later, the tradeoffs, rejected options, and original constraints are hard to recover.

DecisionTrail solves this by making decision records easy to create, search, filter, and export.

## Target User

Primary users:

- Solo developers
- Portfolio builders
- Freelancers
- Small technical teams
- Technical founders

Secondary users:

- Engineering managers who want a lightweight ADR-style workflow
- Open-source maintainers who want project decision history

## MVP Scope

The MVP should allow a user to:

- Sign up, sign in, and sign out
- Create a decision record
- View a list of decision records
- View a decision detail page
- Edit a decision record
- Delete or archive a decision record
- Assign a project name
- Assign tags
- Assign a decision status
- Search decisions
- Filter decisions by project, status, and tag
- Copy one decision as Markdown
- Download one decision as a `.md` file

## Non-Goals

The MVP will not include:

- Multi-user teams
- Real-time collaboration
- Comments
- GitHub integration
- AI-generated decisions
- File attachments
- Public sharing
- Advanced analytics

These may become post-MVP features, but excluding them keeps the first version focused.

## Suggested Stack

Initial recommendation:

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- PostgreSQL
- Drizzle ORM
- Vercel

Confirmed decisions:

- Include basic authentication from the beginning.
- Use Auth.js for authentication.
- Use PostgreSQL for persistence.
- Use Docker Compose PostgreSQL for local development.
- Use Drizzle ORM.
- Use Neon as the preferred hosted PostgreSQL provider for deployment.
- Keep project as a `project_name` text field in the MVP.
- Support both copy-to-clipboard and `.md` file download for Markdown export.
- Use a controlled demo account for the deployed portfolio demo instead of open public sign-ups.
- Create the implementation repo at `/home/jaybytestech/src/portfolio/decisiontrail`.

## Why This Stack

Next.js and TypeScript are a strong default for a polished full-stack portfolio product. The app needs a clean form workflow, list/detail UI, filtering, and deployment-friendly server functionality.

PostgreSQL gives the project a realistic production-style data model. Drizzle keeps schema management explicit and lightweight, which is a good fit for a focused portfolio project.

Tailwind CSS and shadcn/ui can support a professional interface without spending the whole project on low-level component styling.

## Data Model Sketch

### Decision

Fields:

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

Possible statuses:

- proposed
- accepted
- superseded
- archived

### Tag

Fields:

- `id`
- `name`
- `slug`

### Project

For the MVP, `project_name` may be a text field instead of a separate table. A separate `projects` table can be introduced later if the app grows.

## Main User Flows

### Create Decision

1. User opens the new decision form.
2. User enters title, project, status, context, options, final decision, consequences, and tags.
3. User saves the record.
4. App redirects to the decision detail page.

### Review Decisions

1. User opens the decision list.
2. User searches or filters by project, status, or tag.
3. User opens a decision detail page.

### Export Decision

1. User opens a decision detail page.
2. User clicks export.
3. App generates Markdown containing the decision record.
4. User copies or downloads the Markdown.

## Acceptance Criteria

The MVP is complete when:

- A user can create, read, update, and archive/delete decision records.
- A user can sign up, sign in, and sign out.
- A user can only access their own decision records.
- A user can search decisions by title or content.
- A user can filter by status, project, and tag.
- A user can copy a decision as Markdown.
- A user can download a decision as a `.md` file.
- The app has a clear README and full documentation set.
- The app can run locally from documented instructions.
- The app has a deployed URL.
- The project has a retrospective and blog draft.

## Testing Plan

Minimum testing:

- Unit tests for decision validation.
- Unit tests for Markdown export formatting.
- Integration tests for create/edit workflows if backend structure supports them.
- Manual QA checklist for primary user flows.

Stretch testing:

- Playwright test for create decision, filter decision, and export decision.

## Deployment Target

Preferred:

- Vercel for the application.
- Hosted PostgreSQL through Neon, Supabase, or Vercel Postgres.

Local development:

- Docker Compose PostgreSQL on host port `5433`, mapped to container port `5432`.

## Documentation Checklist

Required before MVP completion:

- `README.md`
- `docs/PRODUCT_BRIEF.md`
- `docs/REQUIREMENTS.md`
- `docs/ARCHITECTURE.md`
- `docs/DECISIONS.md`
- `docs/API.md`
- `docs/BUILD_LOG.md`
- `docs/DEVELOPMENT.md`
- `docs/DEPLOYMENT.md`
- `docs/TESTING.md`
- `docs/ROADMAP.md`
- `docs/RETROSPECTIVE.md`
- `docs/BLOG_DRAFT.md`

## First Milestones

1. Confirm persistence approach and ORM.
2. Create the project repo.
3. Copy bootstrap docs into the project repo.
4. Scaffold the app.
5. Build base layout and navigation.
6. Define the decision data model.
7. Build create/list/detail flows.
8. Add edit/archive/delete flows.
9. Add search and filters.
10. Add Markdown export.
11. Add tests and manual QA notes.
12. Deploy.
13. Complete retrospective and blog draft.

## Open Questions

No open product setup questions at this stage.
