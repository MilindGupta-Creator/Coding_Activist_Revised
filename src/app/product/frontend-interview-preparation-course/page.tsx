import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Frontend Interview Preparation Course | Coding Activist',
  description:
    'A shark-tank worthy frontend interview preparation course covering JavaScript event loop, advanced React & Next.js, frontend system design, and machine coding interview practice. Built for FAANG and product-company interviews.',
};

const faqs = [
  {
    q: 'Who is this course for?',
    a: 'Frontend engineers targeting strong product companies who want a structured preparation system across JavaScript, React, architecture, and machine coding instead of disconnected tutorials.',
  },
  {
    q: 'What makes this different from a generic React course?',
    a: 'This is a full interview-prep curriculum. It brings together JavaScript fundamentals under pressure, modern React and Next.js architecture, frontend system design, and timed implementation practice.',
  },
  {
    q: 'Does it cover system design and machine coding rounds?',
    a: 'Yes. The curriculum includes architecture-heavy frontend design topics as well as timed implementation practice for interfaces like dashboards, feeds, drag-and-drop flows, and interactive state-heavy UIs.',
  },
];

const pillars = [
  {
    title: 'JavaScript event loop',
    body: 'Build a precise mental model for call stack, Web APIs, task queues, microtasks, rendering, and async behavior under interview pressure.',
  },
  {
    title: 'Advanced React & Next.js',
    body: 'Go beyond components into rendering strategy, server/client boundaries, App Router architecture, streaming, and production-grade frontend decisions.',
  },
  {
    title: 'Frontend system design',
    body: 'Learn how to structure feeds, dashboards, server-driven UI, scalability boundaries, performance flows, and resilient frontend architecture.',
  },
  {
    title: 'Machine coding practice',
    body: 'Train with implementation-heavy challenges that force you to model data, structure state, and ship working interfaces on a clock.',
  },
];

const outcomes = [
  'Build a complete frontend interview roadmap instead of studying topics in isolation.',
  'Explain JavaScript, React, and rendering behavior with more precision.',
  'Reason about architecture and trade-offs like a stronger senior candidate.',
  'Approach machine coding rounds with a more repeatable system.',
];

export default function FrontendInterviewPreparationCoursePage() {
  return (
    <main className="min-h-screen bg-[#07111F] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(55%_60%_at_15%_0%,rgba(16,185,129,0.10),transparent_60%),radial-gradient(45%_45%_at_85%_10%,rgba(56,189,248,0.10),transparent_60%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(7,17,31,0.55),rgba(7,17,31,0.94))]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8 lg:py-24">
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.2fr)_430px]">
            <div className="max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-emerald-200">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                Complete frontend interview prep program
              </div>

              <h1 className="max-w-4xl text-4xl font-semibold leading-[1.02] tracking-[-0.04em] text-white md:text-6xl">
                Frontend interview preparation
                <span className="block text-white/70">
                  for modern React and Next.js engineers
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
                A structured preparation system for engineers who want to do
                well in high-bar frontend interviews — across JavaScript
                internals, React architecture, system design, and machine coding.
              </p>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 md:text-base">
                Instead of hopping between random tutorials, you train through a
                connected roadmap designed around the kinds of rounds strong
                product companies actually run.
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
                    Built for
                  </p>
                  <p className="mt-2 text-sm font-medium text-white">
                    Product-company interview loops
                  </p>
                </div>
                <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
                    Coverage
                  </p>
                  <p className="mt-2 text-sm font-medium text-white">
                    JS, React, design, implementation
                  </p>
                </div>
                <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
                    Access
                  </p>
                  <p className="mt-2 text-sm font-medium text-white">
                    Lifetime, no subscription
                  </p>
                </div>
              </div>
            </div>

            {/* Right rail */}
            <aside className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/20 backdrop-blur-xl md:p-6">
              <div className="rounded-2xl border border-emerald-400/15 bg-gradient-to-b from-emerald-400/10 to-transparent p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-emerald-200">
                  Program snapshot
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white">
                  Full frontend prep stack
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  A complete interview-preparation curriculum that connects
                  concept depth, architectural reasoning, and implementation
                  speed.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-white/8 bg-black/20 p-4">
                    <p className="text-xs text-slate-400">Level</p>
                    <p className="mt-1 text-sm font-semibold text-white">
                      Mid-level to senior
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/8 bg-black/20 p-4">
                    <p className="text-xs text-slate-400">Format</p>
                    <p className="mt-1 text-sm font-semibold text-white">
                      Guided modules + practice
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-white/8 bg-black/20 p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
                  Included modules
                </p>
                <ul className="mt-4 space-y-3">
                  {[
                    'JavaScript Event Loop Lab',
                    'Advanced React & Next.js',
                    'Frontend System Design',
                    'Machine Coding Practice',
                  ].map((item) => (
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

      {/* Pillars */}
      <section className="border-b border-white/8 bg-[#0A1526] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-emerald-200">
              Curriculum pillars
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white">
              Four areas that map to real frontend interview loops
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              The goal is not just topic coverage. It is to help you build depth
              across the exact areas where strong candidates are usually tested.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {pillars.map((item) => (
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
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-cyan-200">
              Outcomes
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white">
              What this course should help you do better
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              Better answers come from better mental models, better structure,
              and more repetition under realistic interview constraints.
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
                What you’ll train
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white">
                From fundamentals to architectural judgment
              </h3>
              <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-300">
                <li>Clear JavaScript reasoning under pressure.</li>
                <li>Modern React and Next.js architectural fluency.</li>
                <li>Frontend system design patterns for real products.</li>
                <li>Implementation discipline in timed coding rounds.</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-white/8 bg-white/[0.03] p-6 md:p-7">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-400">
                How to use it
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white">
                Flexible enough for both deep prep and fast refresh
              </h3>
              <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-300">
                <li>Use it as a concentrated interview-prep sprint.</li>
                <li>Focus only on weak areas when time is limited.</li>
                <li>Revisit machine coding labs before important loops.</li>
                <li>Use the roadmap to study with more structure over time.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-white/8 bg-[#0A1526] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-emerald-200">
              FAQ
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white">
              Frontend interview preparation course FAQs
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

          <div className="mt-10 flex flex-col items-start justify-between gap-5 rounded-3xl border border-emerald-400/15 bg-gradient-to-r from-emerald-400/10 to-cyan-400/10 p-6 md:flex-row md:items-center md:p-7">
            <div className="max-w-2xl">
              <h3 className="text-xl font-semibold tracking-[-0.03em] text-white">
                Ready to make your interview prep more systematic?
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                Get the full Coding Activist program and prepare with a clearer,
                more senior-level roadmap.
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