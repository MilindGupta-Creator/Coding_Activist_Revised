"use client";

import React, { useMemo, useState } from 'react';

interface TopicConfig {
  name: string;
  importance: number; // 3 = highest, 1 = lowest
  category: 'Core JS' | 'HTML & CSS' | 'React / Next.js' | 'DSA & System Design' | 'Behavioral';
}

// Curated list of ~30 core frontend topics ordered by importance
const FRONTEND_TOPICS: TopicConfig[] = [
  { name: 'Event Loop', importance: 3, category: 'Core JS' },
  { name: 'Hoisting', importance: 3, category: 'Core JS' },
  { name: 'Scope', importance: 3, category: 'Core JS' },
  { name: 'Closures', importance: 3, category: 'Core JS' },
  { name: 'this / call / apply / bind', importance: 3, category: 'Core JS' },
  { name: 'Promises', importance: 3, category: 'Core JS' },
  { name: 'Async / Await', importance: 3, category: 'Core JS' },
  { name: 'Prototype & Inheritance', importance: 3, category: 'Core JS' },
  { name: 'Arrays & Iteration', importance: 3, category: 'Core JS' },
  { name: 'Objects', importance: 3, category: 'Core JS' },
  { name: 'DOM & Browser APIs', importance: 3, category: 'Core JS' },
  { name: 'CSS Box Model', importance: 3, category: 'HTML & CSS' },
  { name: 'CSS Specificity', importance: 3, category: 'HTML & CSS' },
  { name: 'CSS Positions', importance: 2, category: 'HTML & CSS' },
  { name: 'CSS Display / Inline vs Block', importance: 2, category: 'HTML & CSS' },
  { name: 'Semantic HTML', importance: 2, category: 'HTML & CSS' },
  { name: 'Forms & Validation', importance: 2, category: 'HTML & CSS' },
  { name: 'Virtual DOM', importance: 3, category: 'React / Next.js' },
  { name: 'React Hooks: useState', importance: 3, category: 'React / Next.js' },
  { name: 'React Hooks: useEffect', importance: 3, category: 'React / Next.js' },
  { name: 'React Hooks: useRef', importance: 2, category: 'React / Next.js' },
  { name: 'Custom Hooks', importance: 2, category: 'React / Next.js' },
  { name: 'HOC (Higher-Order Components)', importance: 2, category: 'React / Next.js' },
  { name: 'React Performance', importance: 2, category: 'React / Next.js' },
  { name: 'SSR / CSR', importance: 3, category: 'React / Next.js' },
  { name: 'Next.js Routing & Data Fetching', importance: 2, category: 'React / Next.js' },
  { name: 'Machine Coding / UI Systems', importance: 2, category: 'DSA & System Design' },
  { name: 'DSA: Arrays & Strings', importance: 2, category: 'DSA & System Design' },
  { name: 'System Design (Frontend)', importance: 2, category: 'DSA & System Design' },
  { name: 'Behavioral / STAR', importance: 1, category: 'Behavioral' },
];

const CATEGORIES: Array<{ id: TopicConfig['category'] | 'All'; label: string }> = [
  { id: 'All', label: 'All' },
  { id: 'Core JS', label: 'Core JS' },
  { id: 'HTML & CSS', label: 'HTML & CSS' },
  { id: 'React / Next.js', label: 'React & Next' },
  { id: 'DSA & System Design', label: 'DSA & System Design' },
  { id: 'Behavioral', label: 'Behavioral' },
];

const importanceColor = (importance: number) => {
  if (importance >= 3) return 'bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400 text-orange-50 border-orange-300/80';
  if (importance === 2) return 'bg-gradient-to-r from-emerald-500 via-emerald-400 to-lime-400 text-emerald-50 border-emerald-300/80';
  return 'bg-gradient-to-r from-slate-700 via-slate-600 to-slate-500 text-slate-100 border-slate-400/70';
};

const barWidth = (importance: number) => {
  if (importance >= 3) return 'w-full';
  if (importance === 2) return 'w-3/4';
  return 'w-1/2';
};

const FrequencyHeatmap: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<TopicConfig['category'] | 'All'>('All');

  const topics = useMemo(
    () =>
      [...FRONTEND_TOPICS]
        .filter((t) => activeCategory === 'All' || t.category === activeCategory)
        .sort((a, b) => b.importance - a.importance),
    [activeCategory],
  );

  return (
    <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/90 p-4 md:p-5 space-y-3">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-slate-500">
          Frontend Topic Heat Map
        </span>
        <span className="text-[10px] text-slate-500">
          filter by area • color + bar length = importance
        </span>
      </div>

      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2 text-[10px]">
        {CATEGORIES.map(({ id, label }) => {
          const isActive = activeCategory === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setActiveCategory(id as any)}
              className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 transition-colors ${
                isActive
                  ? 'border-orange-400/80 bg-orange-500/15 text-orange-200'
                  : 'border-slate-700 bg-slate-900/80 text-slate-400 hover:border-orange-400/70 hover:text-orange-200'
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  id === 'Core JS'
                    ? 'bg-sky-400'
                    : id === 'HTML & CSS'
                    ? 'bg-pink-400'
                    : id === 'React / Next.js'
                    ? 'bg-emerald-400'
                    : id === 'DSA & System Design'
                    ? 'bg-violet-400'
                    : id === 'Behavioral'
                    ? 'bg-amber-400'
                    : 'bg-slate-400'
                }`}
              />
              <span>{label}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-80 overflow-y-auto pr-1">
        {topics.map(({ name, importance, category }) => (
          <div
            key={name}
            className="rounded-xl border border-slate-800/80 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 px-3 py-3 flex flex-col gap-2 hover:border-orange-400/80 hover:shadow-[0_0_20px_rgba(249,115,22,0.25)] transition-all duration-150"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className={`h-2 w-2 rounded-full shadow-sm ${
                    importance === 3 ? 'bg-orange-400' : importance === 2 ? 'bg-emerald-400' : 'bg-slate-400'
                  }`}
                />
                <span className="text-[11px] font-mono uppercase text-slate-100 truncate">
                  {name}
                </span>
              </div>
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-slate-900/80 text-slate-400 border border-slate-700/80">
                {category}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex-1 bg-slate-800/70 rounded-full h-1.5 overflow-hidden">
                <div
                  className={`h-full rounded-full border ${importanceColor(
                    importance,
                  )} ${barWidth(importance)}`}
                />
              </div>
              <span className="text-[10px] text-slate-500 w-12 text-right">
                {importance === 3 ? 'High' : importance === 2 ? 'Medium' : 'Base'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FrequencyHeatmap;

