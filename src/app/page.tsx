"use client";

import Link from "next/link";
import { useQuery } from "convex/react";

import { api } from "../../convex/_generated/api";

export default function Home() {
  const homepageData = useQuery(api.home.getHomepageData);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-20 text-slate-50">
      <section className="w-full max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-cyan-950/30 backdrop-blur">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-300">
          Super C
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Basic page renders Convex-backed data.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
          This baseline route reads a public Convex query and prints the result
          directly on the page.
        </p>

        <div className="mt-10 rounded-2xl border border-cyan-400/20 bg-slate-900/80 p-6">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Convex Data
          </p>
          {homepageData ? (
            <div className="mt-4 space-y-3">
              <p className="text-2xl font-semibold text-white">
                {homepageData.heading}
              </p>
              <p className="text-lg text-cyan-200">{homepageData.message}</p>
              <p className="font-mono text-sm text-slate-400">
                generatedAt: {homepageData.generatedAt}
              </p>
            </div>
          ) : (
            <p className="mt-4 text-lg text-slate-300">Loading Convex data...</p>
          )}
        </div>

        <div className="mt-8">
          <Link
            className="inline-flex items-center rounded-full border border-cyan-400/30 px-5 py-3 text-sm font-semibold text-cyan-100 transition hover:border-cyan-300 hover:bg-cyan-400/10"
            href="/dashboard"
          >
            Open dashboard
          </Link>
        </div>
      </section>
    </main>
  );
}
