import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Advanced React Next.js Course | Coding Activist',
  description:
    'Advanced React Next.js course for production-grade frontends: React Server Components, App Router, streaming, edge rendering and system design. Built for senior and staff interviews.',
};

const faqs = [
  {
    q: 'Who is this course for?',
    a: 'Frontend engineers who already know React fundamentals and want to design production-grade systems, speak confidently about architecture, and perform better in senior interviews.',
  },
  {
    q: 'What makes this different from a typical React course?',
    a: 'This is not a beginner tutorial series. It focuses on architecture, rendering strategy, caching, server/client boundaries, and the trade-offs senior engineers are expected to explain clearly.',
  },
  {
    q: 'Is this part of the full interview prep product?',
    a: 'Yes. This module sits inside the broader Coding Activist frontend interview preparation program alongside machine coding, JavaScript internals, and frontend system design.',
  },
];

const outcomes = [
  'Design React Server Component boundaries with intent.',
  'Use the Next.js App Router for real production flows.',
  'Explain streaming, caching, and rendering trade-offs clearly.',
  'Approach frontend architecture discussions like a senior engineer.',
];

const modules = [
  'React Server Components',
  'App Router architecture',
  'Streaming and Suspense',
  'Caching and revalidation',
  'Edge rendering',
  'Micro-frontends',
];

export default function AdvancedReactNextJsCoursePage() {
  return (
    <main className="min-h-screen bg-[#07111F] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_20%_0%,rgba(56,189,248,0.10),transparent_60%),radial-gradient(40%_40%_at_80%_10%,rgba(139,92,246,0.10),transparent_60%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(7,17,31,0.55),rgba(7,17,31,0.92))]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.2fr)_420px]">
            <div className="max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-amber-200">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
                Advanced frontend architecture module
              </div>

              <h1 className="max-w-4xl text-4xl font-semibold leading-[1.02] tracking-[-0.04em] text-white md:text-6xl">
                Master React and Next.js
                <span className="block text-white/70">
                  for production-grade frontend systems
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
                Learn how senior engineers structure modern frontend systems with
                React Server Components, the App Router, streaming, caching,
                edge rendering, and scalable application boundaries.
              </p>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 md:text-base">
                Built for engineers preparing for high-bar frontend and
                fullstack interviews — especially where architectural depth
                matters as much as implementation speed.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/product"
                  className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:translate-y-[-1px] hover:bg-slate-100"
                >
                  View full product
                </Link>

                <Link
                  href="/questions"
                  className="inline-flex items-center justify-center rounded-xl border border-white/12 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/8"
                >
                  Explore interview tracks
                </Link>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
                    Focus
                  </p>
                  <p className="mt-2 text-sm font-medium text-white">
                    Architecture, rendering, and scale
                  </p>
                </div>
                <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
                    Best for
                  </p>
                  <p className="mt-2 text-sm font-medium text-white">
                    Mid-level to senior frontend engineers
                  </p>
                </div>
                <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
                    Included in
                  </p>
                  <p className="mt-2 text-sm font-medium text-white">
                    Coding Activist interview prep
                  </p>
                </div>
              </div>
            </div>

            {/* Right panel */}
            <aside className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/20 backdrop-blur-xl md:p-6">
              <div className="rounded-2xl border border-cyan-400/15 bg-gradient-to-b from-cyan-400/10 to-transparent p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">
                  Course snapshot
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white">
                  Advanced React &amp; Next.js
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  A focused module for engineers who want to move beyond UI
                  patterns and reason about modern frontend architecture.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-white/8 bg-black/20 p-4">
                    <p className="text-xs text-slate-400">Level</p>
                    <p className="mt-1 text-sm font-semibold text-white">
                      Advanced
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/8 bg-black/20 p-4">
                    <p className="text-xs text-slate-400">Role fit</p>
                    <p className="mt-1 text-sm font-semibold text-white">
                      Frontend / Fullstack
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-white/8 bg-black/20 p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
                  What you’ll cover
                </p>
                <ul className="mt-4 space-y-3">
                  {modules.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-sm text-slate-200"
                    >
                      <span className="flex h-6 w-6 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/10 text-[11px] text-emerald-200">
                        ✓
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="border-b border-white/8 bg-[#0A1526] py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[320px_minmax(0,1fr)] lg:px-8">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-cyan-200">
              Outcomes
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white">
              What this module should change for you
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              By the end, you should be able to explain not just what to build,
              but why the architecture is correct for the product and scale.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {outcomes.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/8 bg-white/[0.03] p-5"
              >
                <p className="text-sm leading-7 text-slate-200">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Positioning */}
      <section className="bg-[#07111F] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-white/8 bg-white/[0.03] p-6 md:p-7">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-400">
                What you learn
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white">
                Practical architecture for modern React systems
              </h3>
              <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-300">
                <li>Server and client component boundaries that actually make sense.</li>
                <li>Nested layouts, route structure, and loading strategies with the App Router.</li>
                <li>Caching, revalidation, and rendering decisions grounded in performance.</li>
                <li>Patterns for scaling teams and frontend surfaces over time.</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-white/8 bg-white/[0.03] p-6 md:p-7">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-400">
                Why it matters
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white">
                Better interview depth, better engineering judgment
              </h3>
              <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-300">
                <li>Build a stronger story for senior frontend and fullstack interviews.</li>
                <li>Speak clearly about trade-offs instead of memorizing framework buzzwords.</li>
                <li>Connect implementation details to architecture and product constraints.</li>
                <li>Fit this module into broader machine coding and system design prep.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-white/8 bg-[#0A1526] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-cyan-200">
              FAQ
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white">
              Advanced React Next.js course FAQs
            </h2>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {faqs.map((item) => (
              <div
                key={item.q}
                className="rounded-2xl border border-white/8 bg-white/[0.03] p-5"
              >
                <h3 className="text-base font-semibold text-white">{item.q}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-start justify-between gap-5 rounded-3xl border border-cyan-400/15 bg-gradient-to-r from-cyan-400/10 to-indigo-400/10 p-6 md:flex-row md:items-center md:p-7">
            <div className="max-w-2xl">
              <h3 className="text-xl font-semibold tracking-[-0.03em] text-white">
                Ready to level up your React and Next.js interview story?
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                Get access to the full Coding Activist product and train with a
                curriculum built for real frontend interviews.
              </p>
            </div>

            <Link
              href="/product"
              className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
            >
              Go to product page
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}