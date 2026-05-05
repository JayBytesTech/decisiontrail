# API Reference: DecisionTrail

## Overview

The exact API shape depends on whether the implementation uses Next.js route handlers or server actions.

For documentation purposes, the project should still define the backend contract clearly.

## Authentication

Basic authentication is included in the MVP.

Implementation:

- Auth.js
- Credentials provider
- Secure password hashing with `bcryptjs`
- JWT session strategy

## Endpoints

Candidate route-handler endpoints:

### `GET /api/decisions`

Returns a list of decision records.

Records must be scoped to the signed-in user.

Supported filters:

- `q`
- `project`
- `status`
- `tag`

### `POST /api/decisions`

Creates a decision record.

The created record must be assigned to the signed-in user.

### `GET /api/decisions/:id`

Returns one decision record.

The record must belong to the signed-in user.

### `PATCH /api/decisions/:id`

Updates one decision record.

The record must belong to the signed-in user.

### `DELETE /api/decisions/:id`

Deletes or archives one decision record.

The record must belong to the signed-in user.

### `GET /api/decisions/:id/export`

Returns a Markdown representation of one decision record.

## Request Examples

TBD during implementation.

## Response Examples

TBD during implementation.

## Error Handling

Expected error categories:

- Validation errors
- Not found errors
- Persistence errors
- Unsupported filter values

## Notes

If the app uses server actions instead of HTTP route handlers, this file should be updated to document action inputs, outputs, and validation behavior.
