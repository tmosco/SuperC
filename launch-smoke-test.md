# Baseline Production Checks

## Deployment

- Project: `Super C`
- Environment: `Production`
- Deployment URL: `https://super-c.vercel.app`
- Deployment date: `2026-03-30`
- Deployment commit SHA: `e6a683d1619ff8b0d76fbf2c8a0d81bbe06448f0`
- Verified by: `Codex`

## Smoke Test Checklist

- [x] Deployment URL is public and reachable over HTTPS.
- [x] Homepage `/` returns `200`.
- [ ] Homepage renders the baseline app, not the default Next.js starter page.
- [ ] Homepage shows Convex-backed content from `convex/home.ts`.
- [ ] Optional route `/dashboard` loads as expected for the current baseline.
- [x] No live secrets were found in tracked files.

## Verification Output

### HTTP Checks

```text
Verified at: 2026-03-30 10:32:40 WAT
URL: https://super-c.vercel.app
GET /: 200 OK
GET /dashboard: 500 Internal Server Error
```

### Visual Checks

```text
Homepage result:
- Public URL is reachable on Vercel.
- Live page is not the repo baseline from src/app/page.tsx.
- Production is still serving an older/default app instead of the Convex-backed homepage.

Dashboard result:
- /dashboard does not load successfully in production.
- Route returned a server error during verification.
```

## Secrets Review

- [x] `.env.local` is not committed.
- [x] `.vercel/` is not committed.
- [x] `.clerk/` is not committed.
- [x] No live secrets were found in tracked files.

Notes:

```text
.gitignore excludes .env*, .vercel, and /.clerk/.
Tracked-file scan found only placeholder secret examples in README.md.
```

## Final Status

- [ ] PASS
- [x] FAIL

Summary:

```text
Deployment URL shared: https://super-c.vercel.app
Smoke test outcome: FAIL
Outstanding issue(s): Production does not match the baseline app; /dashboard fails in production.
```
