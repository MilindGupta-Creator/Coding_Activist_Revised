import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Machine Coding Interview Practice | Coding Activist',
  description:
    'Machine coding interview practice for frontend and fullstack engineers: Kanban boards, drag & drop lists, infinite scroll feeds and dashboards with timed rounds and instant feedback.',
};

const faqs = [
  {
    q: 'What is machine coding interview practice?',
    a: 'It is hands-on preparation for timed interview rounds where you are expected to build a working UI under constraints, while being evaluated on structure, correctness, state modeling, and implementation quality.',
  },
  {
    q: 'What kinds of problems are included?',
    a: 'The practice set includes interactive UI tasks such as Kanban boards, drag-and-drop lists, infinite feeds, filters, widgets, and dashboard-style interfaces that resemble real frontend product work.',
  },
  {
    q: 'How does this fit into the larger course?',
    a: 'This module is the execution layer of the broader Coding Activist frontend interview preparation program, helping you apply concepts from JavaScript, React, and system design in realistic coding rounds.',
  },
];

const practiceAreas = [
  {
    title: 'Kanban and task flows',
    body: 'Model columns, cards, ordering, and state updates cleanly while keeping the UI responsive and easy to reason about.',
  },
  {
    title: 'Drag-and-drop interactions',
    body: 'Practice moving items across lists and surfaces with patterns that are reliable, understandable, and reusable in interviews.',
  },
  {
    title: 'Infinite feeds and filters',
    body: 'Handle loading states, pagination, edge cases, and interaction flows that often appear in product-style coding rounds.',
  },
  {
    title: 'Dashboard-style interfaces',
    body: 'Combine layout, local state, derived views, and UX details in the sort of problems interviewers use to test execution quality.',
  },
];

const outcomes = [
  'Structure machine coding solutions faster instead of improvising from scratch.',
  'Get more confident with state modeling, UI decomposition, and interaction flows.',
  'Develop reusable implementation patterns for common interview problem types.',
  'Improve your ability to ship working, testable UIs under time pressure.',
];

export default function MachineCodingInterviewPracticePage() {
  return (
    <main className="min-h-screen bg-[#07111F] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(55%_60%_at_18%_0%,rgba(245,158,11,0.10),transparent_60%),radial-gradient(45%_45%_at_85%_12%,rgba(56,189,248,0.08),transparent_60%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(7,17,31,0.55),rgba(7,17,31,0.94))]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8 lg:py-24">
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.2fr)_430px]">
            <div className="max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-amber-200">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
                Hands-on interview practice module
              </div>

              <h1 className="max-w-4xl text-4xl font-semibold leading-[1.02] tracking-[-0.04em] text-white md:text-6xl">
                Machine coding interview practice
                <span className="block text-white/70">
                  for frontend and fullstack roles
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
                Practice the kinds of UI tasks that show up in real interview
                loops: Kanban boards, drag-and-drop flows, infinite feeds, and
                dashboard-style interfaces built under time pressure.
              </p>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 md:text-base">
                This module is designed to help you move from “I know the
                concepts” to “I can actually structure and ship a solution in a
                timed round.”
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
                    Timed implementation practice
                  </p>
                </div>
                <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
                    Best for
                  </p>
                  <p className="mt-2 text-sm font-medium text-white">
                    Frontend and fullstack candidates
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
              <div className="rounded-2xl border border-amber-400/15 bg-gradient-to-b from-amber-400/10 to-transparent p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-amber-200">
                  Practice snapshot
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white">
                  Execution under pressure
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  A focused practice environment for building interactive UIs
                  the way interviewers often expect: under a clock, with clear
                  requirements, and little room for messy structure.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-white/8 bg-black/20 p-4">
                    <p className="text-xs text-slate-400">Round style</p>
                    <p className="mt-1 text-sm font-semibold text-white">
                      Timed UI builds
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/8 bg-black/20 p-4">
                    <p className="text-xs text-slate-400">Goal</p>
                    <p className="mt-1 text-sm font-semibold text-white">
                      Structure + correctness
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-white/8 bg-black/20 p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
                  What you practice
                </p>
                <ul className="mt-4 space-y-3">
                  {[
                    'Kanban board implementation',
                    'Drag-and-drop list flows',
                    'Infinite feed behavior',
                    'State-heavy dashboard UI',
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-sm text-slate-200"
                    >
                      <span className="flex h-6 w-6 items-center justify-center rounded-full border border-amber-400/20 bg-amber-400/10 text-[11px] text-amber-200">
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

      {/* Practice areas */}
      <section className="border-b border-white/8 bg-[#0A1526] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-amber-200">
              Practice areas
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white">
              Problem types that map to real machine coding rounds
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              The goal is to help you recognize recurring patterns quickly and
              solve them with better structure, not just more speed.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {practiceAreas.map((item) => (
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
              What this module should improve
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              Machine coding performance usually improves when you stop guessing
              and start recognizing repeatable structures.
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
                What you’ll build
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white">
                Interactive UIs with realistic constraints
              </h3>
              <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-300">
                <li>List-heavy interfaces with clean data modeling.</li>
                <li>Drag-and-drop behavior with solid interaction handling.</li>
                <li>Loading, filtering, and state transitions in dynamic views.</li>
                <li>UI structures that stay maintainable under time pressure.</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-white/8 bg-white/[0.03] p-6 md:p-7">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-400">
                Why it matters
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white">
                Better implementation rounds come from better systems
              </h3>
              <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-300">
                <li>Reduce the chaos of starting from a blank screen.</li>
                <li>Practice decomposing UI requirements into clear steps.</li>
                <li>Build more confidence in shipping under a clock.</li>
                <li>Carry reusable patterns into future interview loops.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-white/8 bg-[#0A1526] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-amber-200">
              FAQ
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white">
              Machine coding interview practice FAQs
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

          <div className="mt-10 flex flex-col items-start justify-between gap-5 rounded-3xl border border-amber-400/15 bg-gradient-to-r from-amber-400/10 to-cyan-400/10 p-6 md:flex-row md:items-center md:p-7">
            <div className="max-w-2xl">
              <h3 className="text-xl font-semibold tracking-[-0.03em] text-white">
                Ready to make machine coding rounds feel more repeatable?
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                Get the full Coding Activist product and use this module to turn
                implementation rounds into a strength instead of a scramble.
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