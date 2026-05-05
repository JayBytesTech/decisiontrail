# Testing Guide: DecisionTrail

## Test Strategy

The MVP should focus tests on the logic most likely to regress:

- Decision validation
- Tag normalization
- Markdown export
- Search/filter behavior
- User data scoping

## Unit Tests

Planned:

- Validate required fields.
- Validate status values.
- Normalize tags.
- Generate Markdown export.
- Confirm decisions are scoped to the signed-in user.

## Integration Tests

Planned if the implementation structure supports it:

- Create decision.
- Edit decision.
- Archive or delete decision.
- Query decisions with filters.
- Protect decision routes from signed-out access.

## End-To-End Tests

Stretch goal:

- Create a decision through the UI.
- Filter for the decision.
- Export the decision as Markdown.
- Sign in and sign out.

## Manual QA Checklist

- Create a decision with all fields.
- Create a decision with no tags.
- Attempt to save a decision without required fields.
- Edit a decision.
- Archive or delete a decision.
- Search by title.
- Search by content.
- Filter by status.
- Filter by tag.
- Export Markdown.
- Verify empty state.
- Verify no-results state.
- Verify keyboard navigation through form fields.
- Verify signed-out users cannot access protected pages.
- Verify copy Markdown export.
- Verify download Markdown export.

## Known Test Gaps

TBD after implementation.
