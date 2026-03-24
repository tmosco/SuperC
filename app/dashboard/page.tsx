import { SignInButton, SignUpButton, Show, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-indigo-500/30 font-sans">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/20 via-black to-black"></div>
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[600px] bg-indigo-500/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-purple-500/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8 flex flex-col min-h-screen">
        <header className="flex justify-between items-center py-6 border-b border-white/5 mb-8">
          <Link href="/" className="flex items-center gap-3 group transition-transform hover:scale-105 active:scale-95">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
              S
            </div>
            <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
              Super C
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button className="text-sm font-semibold text-zinc-400 hover:text-white transition-colors">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="text-sm font-semibold bg-white text-black px-5 py-2.5 rounded-full hover:bg-zinc-200 transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]">
                  Sign Up
                </button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <UserButton appearance={{ elements: { avatarBox: "w-10 h-10 border-2 border-white/10" } }} />
            </Show>
          </div>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center text-center">
          <Show when="signed-out">
            <div className="space-y-8 max-w-3xl transform transition-all duration-700 hover:-translate-y-2">
              <div className="inline-flex rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm text-indigo-200 backdrop-blur-md shadow-[0_0_15px_rgba(99,102,241,0.1)]">
                <span className="flex h-2 w-2 rounded-full bg-indigo-400 mr-2.5 items-center self-center animate-pulse"></span>
                Secure Next.js Application
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 drop-shadow-sm">
                Unlock Your Dashboard
              </h1>
              <p className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto font-light">
                Join us to access powerful analytics, real-time data streaming, and team collaboration features. Sign in or create an account to get started.
              </p>
              <div className="flex items-center justify-center gap-4 pt-6">
                <SignUpButton mode="modal">
                  <button className="group relative px-8 py-4 bg-white text-black rounded-full font-bold text-lg overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_-5px_rgba(255,255,255,0.4)]">
                    <span className="relative z-10 flex items-center gap-2">
                      Get Started Free
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </button>
                </SignUpButton>
              </div>
            </div>
          </Show>

          <Show when="signed-in">
            <div className="w-full max-w-5xl text-left mt-[-8vh]">
              <div className="mb-14">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">Welcome back.</h1>
                <p className="text-zinc-400 text-xl font-light">Here's an overview of your workspace.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: "Project Activity", color: "indigo", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
                  { title: "Connected Devices", color: "purple", icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" },
                  { title: "System Health", color: "sky", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" }
                ].map((card, i) => (
                  <div key={i} className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-xl hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 cursor-pointer">
                    {/* Hover Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br from-${card.color}-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-8 border border-white/10 group-hover:scale-110 transition-transform duration-500 shadow-lg">
                        <svg className={`w-6 h-6 text-${card.color}-400`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={card.icon} />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold mb-3 text-white/90">{card.title}</h3>
                      <p className="text-zinc-400 leading-relaxed text-sm font-light">
                        Sample placeholder text for your amazing dashboard metric. This card represents a key feature.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Show>
        </main>
      </div>
    </div>
  );
}
