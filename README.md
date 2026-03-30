# Super C

This project uses Next.js 16, Clerk, and Convex. The homepage at `src/app/page.tsx` renders baseline data from a public Convex query.

## Setup

Install dependencies:

```bash
npm install
```

Create `.env.local` with the required values:

```env
NEXT_PUBLIC_CONVEX_URL=your_convex_deployment_url
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_JWT_ISSUER_DOMAIN=https://your-clerk-domain
```

Generate Convex types and start the Convex dev process:

```bash
npx convex dev
```

## Run

In a second terminal, start Next.js:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Commands

```bash
npm run dev
npm run lint
npm run build
npx convex dev
```

## Deliverable

- `src/app/page.tsx` shows Convex-backed baseline data from `convex/home.ts`.
