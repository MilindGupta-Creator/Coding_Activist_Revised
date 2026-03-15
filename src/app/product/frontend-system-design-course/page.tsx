import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Frontend System Design Course | Coding Activist',
  description:
    'Frontend system design course for real-world web architectures: server-driven UI, infinite feeds, dashboards, caching, CDNs and edge rendering. Built for senior and staff frontend interviews.',
};

const faqs = [
  {
    q: 'Why take a dedicated frontend system design course?',
    a: 'Because most system design material is backend-heavy. Frontend interviews often focus on rendering strategy, caching, client performance, resilience, and user experience trade-offs that general system design resources do not cover well.',
  },
  {
    q: 'What kinds of systems will I learn to design?',
    a: 'You will practice designing product pages, feeds, dashboards, collaborative interfaces, and other user-facing systems that depend on rendering choices, performance strategy, and graceful degradation.',
  },
  {
    q: 'How does this connect to the rest of the prep program?',
    a: 'This module complements the broader Coding Activist frontend interview preparation program by connecting architecture thinking with React, runtime fundamentals, and machine coding execution.',
  },
];

const designAreas = [
  {
    title: 'Server-driven and hybrid UI',
    body: 'Learn when the server should shape UI structure, personalization, and data boundaries, and when that logic should stay on the client.',
  },
  {
    title: 'Caching, CDN, and edge strategy',
    body: 'Reason about where to cache, how to choose TTLs, and how delivery strategy affects performance, cost, and resilience.',
  },
  {
    title: 'Feeds, dashboards, and real-time views',
    body: 'Design interfaces that update frequently, handle partial failure well, and remain usable under changing data conditions.',
  },
  {
    title: 'Performance and degradation paths',
    body: 'Think through loading states, hydration strategy, fallback behavior, and what should happen when the happy path breaks.',
  },
];

const outcomes = [
  'Lead frontend architecture discussions with more clarity and structure.',
  'Explain rendering, caching, and resilience trade-offs more convincingly.',
  'Design user-facing systems with stronger product and performance judgment.',
  'Build a better interview story for senior and staff frontend roles.',
];

export default function FrontendSystemDesignCoursePage() {
  return (
    <main className="min-h-screen bg-[#07111F] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(55%_60%_at_16%_0%,rgba(139,92,246,0.10),transparent_60%),radial-gradient(45%_45%_at_84%_12%,rgba(16,185,129,0.08),transparent_60%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(7,17,31,0.55),rgba(7,17,31,0.94))]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8 lg:py-24">
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.2fr)_430px]">
            <div className="max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-violet-200">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-300" />
                Frontend architecture module
              </div>

              <h1 className="max-w-4xl text-4xl font-semibold leading-[1.02] tracking-[-0.04em] text-white md:text-6xl">
                Frontend system design course
                <span className="block text-white/70">
                  for real-world web architectures
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
                Learn how to design modern user-facing systems across rendering,
                caching, delivery, resilience, and UX trade-offs — the parts of
                system design that strong frontend interviews actually test.
              </p>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 md:text-base">
                This module focuses on product pages, feeds, dashboards,
                server-driven UI patterns, and performance-sensitive interfaces
                that need to work well under real constraints.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/product"
                  className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:translate-y-[-1px] hover:bg-slate-100"
                >
                  View full product
                </Link>

                <Link
                  href="/tech-roadmap"
                  className="inline-flex items-center justify-center rounded-xl border border-white/12 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/8"
                >
                  Explore roadmap
                </Link>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
                    Focus
                  </p>
                  <p className="mt-2 text-sm font-medium text-white">
                    Rendering, caching, and resilience
                  </p>
                </div>
                <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
                    Best for
                  </p>
                  <p className="mt-2 text-sm font-medium text-white">
                    Senior frontend interview prep
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

            {/* Right rail */}
            <aside className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/20 backdrop-blur-xl md:p-6">
              <div className="rounded-2xl border border-violet-400/15 bg-gradient-to-b from-violet-400/10 to-transparent p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-violet-200">
                  Course snapshot
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white">
                  Frontend architecture at scale
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  A focused module for engineers who need to reason clearly
                  about rendering strategy, performance, delivery layers, and
                  failure modes in frontend systems.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-white/8 bg-black/20 p-4">
                    <p className="text-xs text-slate-400">Level</p>
                    <p className="mt-1 text-sm font-semibold text-white">
                      Advanced
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/8 bg-black/20 p-4">
                    <p className="text-xs text-slate-400">Lens</p>
                    <p className="mt-1 text-sm font-semibold text-white">
                      Product + platform
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-white/8 bg-black/20 p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
                  What you’ll design
                </p>
                <ul className="mt-4 space-y-3">
                  {[
                    'Server-driven interface flows',
                    'Caching and CDN strategy',
                    'Feeds and dashboard systems',
                    'Fallback and resilience plans',
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-sm text-slate-200"
                    >
                      <span className="flex h-6 w-6 items-center justify-center rounded-full border border-violet-400/20 bg-violet-400/10 text-[11px] text-violet-200">
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

      {/* Design areas */}
      <section className="border-b border-white/8 bg-[#0A1526] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-violet-200">
              Design areas
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white">
              The frontend architecture topics that matter most
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              This module focuses on the design decisions that shape real user
              experience, not just generic system diagrams.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {designAreas.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/8 bg-white/[0.03] p-5"
              >
                <h3 className="text-base font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="border-b border-white/8 bg-[#07111F] py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[320px_minmax(0,1fr)] lg:px-8">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-emerald-200">
              Outcomes
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white">
              What this course should improve
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              Strong system design answers come from reasoning through trade-offs
              clearly enough that your architecture feels intentional, not improvised.
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
                What you’ll cover
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white">
                Frontend design decisions with real product consequences
              </h3>
              <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-300">
                <li>When to render on the client, server, or both.</li>
                <li>How to think through cache layers and delivery paths.</li>
                <li>How to design for partial failure and degraded states.</li>
                <li>How to explain user-facing system trade-offs clearly.</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-white/8 bg-white/[0.03] p-6 md:p-7">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-400">
                Why it matters
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white">
                Frontend architects need more than implementation depth
              </h3>
              <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-300">
                <li>Build stronger answers for senior and staff interviews.</li>
                <li>Make your architecture reasoning feel more complete.</li>
                <li>Connect UX quality to infrastructure and delivery choices.</li>
                <li>Show better judgment in product-facing technical discussions.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-white/8 bg-[#0A1526] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-violet-200">
              FAQ
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white">
              Frontend system design course FAQs
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

          <div className="mt-10 flex flex-col items-start justify-between gap-5 rounded-3xl border border-violet-400/15 bg-gradient-to-r from-violet-400/10 to-emerald-400/10 p-6 md:flex-row md:items-center md:p-7">
            <div className="max-w-2xl">
              <h3 className="text-xl font-semibold tracking-[-0.03em] text-white">
                Ready to make your frontend system design answers more convincing?
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                Get the full Coding Activist product and use this module to
                build stronger architecture judgment for high-bar interviews.
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