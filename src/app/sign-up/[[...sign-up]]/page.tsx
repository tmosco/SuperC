import { SignUp } from "@clerk/nextjs";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-20 text-slate-50">
      <section className="w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900 shadow-2xl shadow-cyan-950/30">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative hidden overflow-hidden border-r border-white/10 bg-[radial-gradient(circle_at_bottom_left,_rgba(16,185,129,0.18),_transparent_38%),linear-gradient(160deg,#052e16_0%,#020617_55%,#000_100%)] p-10 lg:block">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20" />
            <div className="relative flex h-full flex-col justify-between">
              <div>
                <Link
                  href="/"
                  className="inline-flex items-center gap-3 text-sm font-semibold text-emerald-100 transition hover:text-white"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-400/15 text-lg text-emerald-200 ring-1 ring-inset ring-emerald-300/20">
                    S
                  </span>
                  Super C
                </Link>
              </div>

              <div className="max-w-md space-y-6">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300/80">
                  Team Access
                </p>
                <h1 className="text-4xl font-semibold tracking-tight text-white">
                  Create your account and go straight to the dashboard.
                </h1>
                <p className="text-base leading-7 text-slate-300">
                  Set up access for your pharmacy workspace with Clerk and land
                  directly in the protected inventory overview when registration
                  completes.
                </p>
              </div>
            </div>
          </div>

          <div className="flex min-h-[720px] items-center justify-center bg-slate-950 px-6 py-12 sm:px-10">
            <SignUp
              path="/sign-up"
              routing="path"
              signInUrl="/sign-in"
              forceRedirectUrl="/dashboard"
              fallbackRedirectUrl="/dashboard"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
