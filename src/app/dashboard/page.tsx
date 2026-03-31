import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

const dashboardCards = [
  {
    title: "Products",
    description:
      "Browse pharmacy inventory, inspect product details, and keep pricing and metadata in sync.",
    href: "/products",
    accent: "from-cyan-400/30 to-transparent",
  },
  {
    title: "Stock Movements",
    description:
      "Record incoming and outgoing stock with a clear movement trail tied to batches and audit logs.",
    href: "/movements",
    accent: "from-emerald-400/30 to-transparent",
  },
  {
    title: "Alerts",
    description:
      "Monitor low-stock and expiring inventory so the team can act before availability is affected.",
    href: "/alerts",
    accent: "from-amber-400/30 to-transparent",
  },
] as const;

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-8 text-slate-50">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl flex-col rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.98),rgba(2,6,23,0.96))] p-6 shadow-2xl shadow-cyan-950/20 sm:p-8">
        <header className="flex flex-col gap-6 border-b border-white/10 pb-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-3 text-sm font-semibold text-cyan-200 transition hover:text-white"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-400/15 text-lg text-cyan-200 ring-1 ring-inset ring-cyan-300/20">
                S
              </span>
              Super C
            </Link>
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300/80">
                Protected Dashboard
              </p>
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Inventory overview
              </h1>
              <p className="max-w-3xl text-base leading-7 text-slate-300">
                Signed in as <span className="font-mono text-slate-200">{userId}</span>.
                This route is protected by Clerk middleware and a server-side
                auth guard before any inventory UI is rendered.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/products"
              className="inline-flex items-center rounded-full border border-cyan-400/30 px-5 py-2.5 text-sm font-semibold text-cyan-100 transition hover:border-cyan-300 hover:bg-cyan-400/10"
            >
              View products
            </Link>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-10 w-10 ring-2 ring-white/10",
                },
              }}
            />
          </div>
        </header>

        <section className="grid flex-1 gap-6 pt-8 md:grid-cols-3">
          {dashboardCards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6 transition hover:border-white/20 hover:bg-white/[0.05]"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${card.accent} opacity-70 transition group-hover:opacity-100`}
              />
              <div className="relative space-y-4">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
                  Overview
                </p>
                <h2 className="text-2xl font-semibold text-white">
                  {card.title}
                </h2>
                <p className="leading-7 text-slate-300">{card.description}</p>
                <span className="inline-flex items-center text-sm font-semibold text-cyan-200 transition group-hover:text-cyan-100">
                  Open section
                </span>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
