# Baseline Production Checks

## Deployment

- Project: `Super C`
- Environment: `Production`
- Deployment URL: `https://super-c.vercel.app`
- Deployment date: `2026-03-30`
- Deployment commit SHA: `7218b2fb7c0179c59d803c2feb7b38d7f8acc2ef`
- Verified by: `Codex`

## Smoke Test Checklist

- [x] Deployment URL is public and reachable over HTTPS.
- [ ] Homepage `/` returns `200`.
- [ ] Homepage renders the baseline app.
- [ ] Homepage shows Convex-backed content from `convex/home.ts`.
- [ ] Optional route `/dashboard` loads as expected for the current baseline.
- [x] No live secrets were found in tracked files.

## Verification Output

### HTTP Checks

```text
Verified at: 2026-03-30 11:02:00 WAT
URL: https://super-c.vercel.app
Latest Vercel deployment status: success
GET /: 500 Internal Server Error
GET /dashboard: 500 Internal Server Error
```

### Visual Checks

```text
Homepage result:
- Public URL is reachable on Vercel.
- Homepage response body is "Internal Server Error".
- Baseline Convex-backed homepage is not rendering in production.

Dashboard result:
- /dashboard response body is "Internal Server Error".
- Dashboard does not load successfully in production.
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
Outstanding issue(s): Latest Vercel deployment completed for commit 7218b2f, but both / and /dashboard return 500 in production.
```
