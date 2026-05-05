# Deployment Guide: DecisionTrail

## Hosting Platform

Planned:

- Vercel for the app
- Neon for hosted PostgreSQL

## Build Command

TBD after app scaffold.

## Environment Variables

Required:

```text
DATABASE_URL=
AUTH_SECRET=
AUTH_URL=
```

## Demo Account Policy

The deployed portfolio demo should use a controlled demo account rather than open public sign-ups.

Reasoning:

- Keeps the production database from collecting random public data.
- Gives reviewers a predictable experience.
- Avoids needing account moderation, rate limiting, or abuse controls in the MVP.
- Still demonstrates authentication and user-scoped data.

## Deployment Steps

TBD during implementation.

## Production URL

TBD

## Rollback Notes

TBD after deployment setup.
