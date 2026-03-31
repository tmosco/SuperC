# Super C Project Rules

These are the standing instructions for any AI working in this repository.
Follow them by default unless the task explicitly requires an exception.

## Project Stack

- Treat this codebase as a Next.js 16 App Router app using Convex and Clerk.
- Do not assume older Next.js APIs, routing behavior, or file conventions still apply.

## Required References

- Before changing Next.js APIs, routing, metadata, config, or app structure, read the relevant guide in `node_modules/next/dist/docs/`.
- Before changing anything in `convex/`, read `convex/_generated/ai/guidelines.md` and follow it over general Convex knowledge.

## Frontend Rules

- Prefer Server Components by default.
- Add `"use client"` only when a file needs client hooks, browser APIs, or interactive state.
- Preserve the existing auth wiring unless the task explicitly requires a refactor.
- Keep Clerk as the auth provider and keep Convex client auth connected through `src/app/ConvexClientProvider.tsx`.

## Convex And Auth Rules

- Do not edit generated Convex files under `convex/_generated/`.
- Do not pass user IDs or ownership flags from the client for authorization.
- In Convex functions, derive identity server-side with `ctx.auth.getUserIdentity()`.
- For auth-linked lookups, prefer `identity.tokenIdentifier`.
- Keep Convex functions typed and validated according to `convex/_generated/ai/guidelines.md`.

## TypeScript And Quality Rules

- Keep TypeScript strict.
- Do not introduce `any`.
- Do not weaken types just to make code compile.
- Prefer explicit props and data shapes over loose objects.

## Workflow Rules

- For multi-file features or structural changes, propose a short plan before editing.
- Make the smallest change that fully solves the task.
- Do not refactor unrelated code unless the task explicitly asks for it.

## Verification Rules

- After code edits, run `npm run lint`.
- Fix any lint issues introduced by the change before finishing.
- Do not fix unrelated lint issues unless the task asks for cleanup.