import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'JavaScript Event Loop Course | Coding Activist',
  description:
    'JavaScript event loop course with interactive labs that visualize the call stack, Web APIs, microtasks and callback queues. Master event loop interview questions with confidence.',
};

const faqs = [
  {
    q: 'Why take a dedicated JavaScript event loop course?',
    a: 'Because event loop questions are rarely about memorized examples. Strong answers come from understanding how the runtime actually schedules work, and being able to explain that clearly.',
  },
  {
    q: 'How is this course taught?',
    a: 'Through interactive runtime labs. You watch the call stack, browser APIs, task queues, and promise scheduling update as code runs, then reason through what happens and why.',
  },
  {
    q: 'How does this help with frontend interviews?',
    a: 'It helps you explain timers, promises, async flows, rendering order, and runtime behavior with more precision — which is often where otherwise strong candidates become uncertain.',
  },
];

const topics = [
  {
    title: 'Call stack and synchronous execution',
    body: 'Build a reliable mental model for how JavaScript executes line by line before asynchronous work gets a chance to run.',
  },
  {
    title: 'Tasks, microtasks, and scheduling',
    body: 'Understand how timers, promises, and queueing behavior affect execution order and why certain logs appear before others.',
  },
  {
    title: 'Promises and async/await',
    body: 'Learn how promise callbacks are scheduled, how async functions behave, and where common interview confusion usually starts.',
  },
  {
    title: 'Interview-style runtime reasoning',
    body: 'Practice tracing real snippets and explaining runtime behavior in plain language instead of guessing from memory.',
  },
];

const outcomes = [
  'Explain event loop behavior more confidently in interviews.',
  'Trace asynchronous JavaScript snippets with less guesswork.',
  'Build a stronger mental model for promises, timers, and async/await.',
  'Connect runtime behavior to frontend performance and UX decisions.',
];

export default function JavaScriptEventLoopCoursePage() {
  return (
    <main className="min-h-screen bg-[#07111F] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(55%_60%_at_16%_0%,rgba(16,185,129,0.10),transparent_60%),radial-gradient(45%_45%_at_85%_12%,rgba(56,189,248,0.08),transparent_60%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(7,17,31,0.55),rgba(7,17,31,0.94))]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8 lg:py-24">
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.2fr)_430px]">
            <div className="max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-emerald-200">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                Interactive runtime foundations module
              </div>

              <h1 className="max-w-4xl text-4xl font-semibold leading-[1.02] tracking-[-0.04em] text-white md:text-6xl">
                JavaScript event loop course
                <span className="block text-white/70">
                  with interactive runtime labs
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
                Learn how JavaScript actually schedules work by tracing the call
                stack, browser APIs, tasks, microtasks, promises, and async
                flows in a visual lab environment.
              </p>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 md:text-base">
                This module is designed to help you stop memorizing “correct
                answers” and start reasoning about runtime behavior with clarity
                and confidence.
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
                    Runtime behavior and async reasoning
                  </p>
                </div>
                <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
                    Best for
                  </p>
                  <p className="mt-2 text-sm font-medium text-white">
                    Frontend engineers building stronger fundamentals
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
              <div className="rounded-2xl border border-emerald-400/15 bg-gradient-to-b from-emerald-400/10 to-transparent p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-emerald-200">
                  Course snapshot
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white">
                  Event loop foundations
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  A focused learning module for understanding how JavaScript
                  executes asynchronous work — and explaining it the way strong
                  candidates should.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-white/8 bg-black/20 p-4">
                    <p className="text-xs text-slate-400">Format</p>
                    <p className="mt-1 text-sm font-semibold text-white">
                      Visual labs + guided reasoning
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/8 bg-black/20 p-4">
                    <p className="text-xs text-slate-400">Goal</p>
                    <p className="mt-1 text-sm font-semibold text-white">
                      Clear runtime mental models
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-white/8 bg-black/20 p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
                  What you’ll study
                </p>
                <ul className="mt-4 space-y-3">
                  {[
                    'Call stack and Web APIs',
                    'Tasks and microtasks',
                    'Promises and async/await',
                    'Interview-style trace questions',
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

      {/* Topics */}
      <section className="border-b border-white/8 bg-[#0A1526] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-emerald-200">
              Core topics
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white">
              The parts of the runtime that candidates need to understand
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              This module focuses on the pieces of JavaScript execution that are
              most often misunderstood, and most often tested.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {topics.map((item) => (
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
              What this course should improve
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              Good event loop answers usually come from understanding execution
              deeply enough that you can reason in real time.
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
                What you’ll learn
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white">
                Runtime clarity instead of memorized patterns
              </h3>
              <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-300">
                <li>How synchronous and asynchronous work interact.</li>
                <li>Why tasks and microtasks affect execution order.</li>
                <li>How promises and async functions are scheduled.</li>
                <li>How to explain tricky snippets without guessing.</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-white/8 bg-white/[0.03] p-6 md:p-7">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-400">
                Why it matters
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white">
                Strong frontend reasoning starts with strong runtime foundations
              </h3>
              <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-300">
                <li>Answer interview questions with more confidence.</li>
                <li>Debug asynchronous behavior more effectively.</li>
                <li>Connect JavaScript execution to product behavior and UX.</li>
                <li>Carry stronger fundamentals into React and system design topics.</li>
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
              JavaScript event loop course FAQs
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
                Ready to make event loop questions feel much less random?
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                Get the full Coding Activist product and use this module to make
                one of the most commonly tested frontend topics feel much more
                intuitive.
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