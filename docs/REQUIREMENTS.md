# Requirements: DecisionTrail

## MVP Scope

- Create decision records
- Sign up, sign in, and sign out
- View all decision records
- View one decision record
- Edit decision records
- Delete or archive decision records
- Search decisions
- Filter decisions by project, status, and tag
- Copy a decision as Markdown
- Download a decision as a `.md` file

## User Stories

- As a developer, I want to record a decision, so that I can preserve why a choice was made.
- As a developer, I want to capture options considered, so that future me understands the tradeoff.
- As a developer, I want to tag decisions, so that I can find related decisions later.
- As a developer, I want to filter by project, so that I can review decisions for one codebase.
- As a developer, I want to export a decision as Markdown, so that I can copy it into project docs or a blog post.
- As a developer, I want my decisions to be private to my account, so that project context is not exposed publicly.

## Non-Goals

- Multi-user collaboration
- Comments
- GitHub integration
- AI-generated decision content
- File uploads
- Public sharing
- Analytics

## Functional Requirements

- The app must provide a decision creation form.
- The app must provide basic authentication.
- The app must scope decision records to the signed-in user.
- The app must validate required fields.
- The app must persist decision records.
- The app must provide a decision list page.
- The app must provide a decision detail page.
- The app must support editing existing decisions.
- The app must support deleting or archiving decisions.
- The app must support search across title, summary, context, options, decision, and consequences.
- The app must support filtering by project, status, and tag.
- The app must generate a Markdown export for an individual decision.
- The app must support copying exported Markdown to the clipboard.
- The app must support downloading exported Markdown as a `.md` file.

## Non-Functional Requirements

- The app should run locally using documented steps.
- The app should deploy publicly.
- The UI should be responsive.
- The UI should be keyboard navigable for core workflows.
- Validation errors should be clear.
- Empty states should explain what the user can do next.

## Edge Cases

- No decisions exist yet.
- Search returns no results.
- A decision has no tags.
- A decision has a long context or consequences section.
- A user attempts to save without required fields.
- A tag is entered with inconsistent casing.
- A signed-out user attempts to access a protected page.
- A signed-in user attempts to access a decision that belongs to another user.

## Accessibility Notes

- Forms should use labels connected to inputs.
- Buttons and links should have clear accessible names.
- Focus states should be visible.
- Status should not be communicated by color alone.
- Search and filters should be usable with a keyboard.
