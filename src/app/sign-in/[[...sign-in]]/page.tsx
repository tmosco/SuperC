import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function SignInPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.12),_transparent_35%),linear-gradient(180deg,#020617_0%,#0f172a_100%)] px-6 py-12 text-slate-50">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <header className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-3 text-sm font-semibold text-slate-200 transition hover:text-white"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-400/15 text-lg text-cyan-200 ring-1 ring-inset ring-cyan-300/20">
              S
            </span>
            Super C
          </Link>
          <Link
            href="/sign-up"
            className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-white/30 hover:text-white"
          >
            Create account
          </Link>
        </header>

        <section className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_420px]">
          <div className="max-w-2xl space-y-6 pt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300/80">
              Pharmacy Operations
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Sign in and continue to your dashboard.
            </h1>
            <p className="max-w-xl text-base leading-7 text-slate-300">
              Access products, stock movements, supplier records, and inventory
              alerts for your pharmacy workspace.
            </p>
          </div>

          <div className="flex justify-center lg:justify-end">
            <SignIn
              path="/sign-in"
              routing="path"
              signUpUrl="/sign-up"
              forceRedirectUrl="/dashboard"
              fallbackRedirectUrl="/dashboard"
              appearance={{
                elements: {
                  cardBox:
                    "shadow-none",
                  card:
                    "border border-white/10 bg-slate-950/80 shadow-2xl shadow-cyan-950/20",
                  headerTitle: "text-white",
                  headerSubtitle: "text-slate-400",
                  socialButtonsBlockButton:
                    "border-white/10 bg-slate-900 text-slate-100 hover:bg-slate-800",
                  socialButtonsBlockButtonText: "text-slate-100",
                  formButtonPrimary:
                    "bg-cyan-400 text-slate-950 hover:bg-cyan-300",
                  formFieldInput:
                    "border-white/10 bg-slate-900 text-white placeholder:text-slate-500",
                  footerActionLink: "text-cyan-300 hover:text-cyan-200",
                  identityPreviewText: "text-slate-200",
                  formFieldLabel: "text-slate-300",
                },
              }}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
