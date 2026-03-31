# Baseline Production Checks

## Deployment

- Project: `Super C`
- Environment: `Production`
- Deployment URL: `https://super-c.vercel.app`
- Deployment date: `2026-03-30`
- Deployment commit SHA: `38ab42da5e0cca594d4a54c05fb4ec752c059e46`
- Verified by: `Codex`

## Smoke Test Checklist

- [x] Deployment URL is public and reachable over HTTPS.
- [x] Homepage `/` returns `200`.
- [x] Homepage renders the baseline app.
- [ ] Homepage shows Convex-backed content from `convex/home.ts`.
- [x] Optional route `/dashboard` loads as expected for the current baseline.
- [x] No live secrets were found in tracked files.

## Verification Output

### HTTP Checks

```text
Verified at: 2026-03-30 11:35:53 WAT
URL: https://super-c.vercel.app
Latest Vercel deployment status: success
GET /: 200 OK
GET /dashboard: 200 OK
```

### Visual Checks

```text
Homepage result:
- Public URL is reachable on Vercel.
- Production homepage renders the Super C baseline shell.
- Homepage HTML includes the baseline title and "Convex Data" section.

Dashboard result:
- /dashboard returns 200 in production.
- Signed-out dashboard view renders with Clerk buttons.
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

- [x] PASS
- [ ] FAIL

Summary:

```text
Deployment URL shared: https://super-c.vercel.app
Smoke test outcome: PASS
Outstanding issue(s): Convex-backed homepage data was not fully asserted from raw HTTP alone because the initial HTML still shows the loading state before client hydration.
```
