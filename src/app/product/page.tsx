"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from './Navbar';
import Hero from './Hero';
import InteractiveDemo from './InteractiveDemo';
import Features from './Features';
import ReaderShowcase from './ReaderShowcase';
import SampleGenerator from './SampleGenerator';
import Testimonials from './Testimonials';
import Pricing from './Pricing';
import ComparisonTable from './ComparisonTable';
import Footer from './Footer';
import Reader from './Reader';
import Login from './Login';
import UnderConstruction from './UnderConstruction';
import { CheckIcon } from './Icons';
import { db } from '@/firebase/firebase';

type ViewState = 'landing' | 'login' | 'reader' | 'underConstruction';

const curriculumSections = [
  {
    slug: 'frontend-interview-preparation-course',
    title: 'Frontend Interview Preparation Course',
    description:
      'A complete frontend interview preparation course covering JavaScript fundamentals, the event loop, advanced React, Next.js, frontend system design, and machine coding interview practice. Built to take you from Senior to Staff-level interviews.',
  },
  {
    slug: 'advanced-react-next-js-course',
    title: 'Advanced React & Next.js Course',
    description:
      'Master advanced React and Next.js with React Server Components, App Router, streaming, edge rendering, and micro-frontends. Go beyond CRUD apps and learn how top-tier teams architect production systems.',
  },
  {
    slug: 'frontend-system-design-course',
    title: 'Frontend System Design Course',
    description:
      'Learn frontend system design for real interview problems: server-driven UI frameworks, scalable dashboards, infinite feeds, and edge-powered personalization. Practice the exact type of whiteboard and take-home problems you will be asked.',
  },
  {
    slug: 'machine-coding-interview-practice',
    title: 'Machine Coding Interview Practice',
    description:
      'Hands-on machine coding interview practice with Kanban boards, drag & drop lists, infinite scroll feeds, and real-time components. Get instant feedback with tests that mirror FAANG-style machine coding rounds.',
  },
  {
    slug: 'javascript-event-loop-course',
    title: 'JavaScript Event Loop Course',
    description:
      'Deep-dive JavaScript event loop course with interactive labs that simulate the call stack, Web APIs, and callback queue. Understand event loop phases so you never get surprised by async behavior in interviews again.',
  },
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('landing');

  // Check for active session on load to persist login across refresh
  useEffect(() => {
    const checkSession = async () => {
      const activeSession = localStorage.getItem("frontend_mastery_active_session");
      if (activeSession) {
        try {
          const sessionData = JSON.parse(activeSession);
          // Basic expiry check (24h)
          const isExpired = new Date().getTime() - sessionData.timestamp >= 24 * 60 * 60 * 1000;

          if (!isExpired && sessionData.uid && sessionData.sessionId) {
            // Validate session ID against Firestore
            try {
              const userDoc = await db.collection('premiumUsers').doc(sessionData.uid).get();
              if (userDoc.exists) {
                const userData = userDoc.data();
                const firestoreSessionId = userData?.activeSessionId;
                // Only allow if session IDs match
                if (firestoreSessionId === sessionData.sessionId) {
                  setCurrentView('reader');
                  return;
                }
              }
            } catch (error) {
              // Firestore error - don't auto-login, user will need to login again
              console.error('Session validation error:', error);
            }
          }

          // If session is invalid or expired, clear it
          localStorage.removeItem("frontend_mastery_active_session");
        } catch (e) {
          // Invalid session data
          localStorage.removeItem("frontend_mastery_active_session");
        }
      }
      // Ensure page scrolls to top on initial load
      window.scrollTo(0, 0);
    };

    checkSession();
  }, []);

  const handlePurchaseClick = () => {
    // Redirect to payment checkout
    window.open('https://dodo.pe/ic4vo842tzb', '_blank');
  };

  const handleLoginClick = () => {
    setCurrentView('login');
  };

  const handleLoginSuccess = () => {
    setCurrentView('reader');
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    setCurrentView('landing');
    window.scrollTo(0, 0);
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
  };

  if (currentView === 'reader') {
    return <Reader onLogout={handleLogout} />;
  }

  if (currentView === 'login') {
    return <Login onLoginSuccess={handleLoginSuccess} onBack={handleBackToLanding} />;
  }

  if (currentView === 'underConstruction') {
    return <UnderConstruction onBack={handleBackToLanding} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 text-slate-900 selection:bg-brand-500 selection:text-white">
      {/* Navbar with Login/Purchase handlers */}
      <Navbar onPurchase={handlePurchaseClick} onLogin={handleLoginClick} />

      {/* Main Landing Page Content */}
      <div className="pt-20">
        <Hero />
        <InteractiveDemo />

        {/* Premium Features Banner - Compact & Impactful */}
        <section className="relative py-12 md:py-16 overflow-hidden">
          {/* Premium Dark Background */}
          <div className="absolute inset-0 bg-[#030014]">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-violet-600 rounded-full mix-blend-multiply filter blur-[100px]" />
              <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-fuchsia-600 rounded-full mix-blend-multiply filter blur-[100px]" />
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Header Row */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex h-2.5 w-2.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                  <span className="text-xs font-semibold text-violet-400 uppercase tracking-wider">Premium Features</span>
                  <span className="px-2 py-0.5 text-[9px] font-semibold bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full">NEW</span>
                </div>
                <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight">
                  Practice Like <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400">FAANG Engineers</span>
                </h2>
              </div>

              {/* Stats */}
              <div className="flex gap-6 md:gap-8">
                {[
                  { value: '50+', label: 'Challenges' },
                  { value: '30+', label: 'CSS Battles' },
                  { value: '11', label: 'XSS Topics' },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-slate-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-2 gap-5 mb-8">

              {/* Code Challenges */}
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-slate-800/50 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity" />
                <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-700/30 p-6 hover:border-slate-600/50 transition-all">
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-2xl shadow-md shadow-black/20 flex-shrink-0 group-hover:scale-105 transition-transform">
                      🧩
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold text-white">Code Challenges</h3>
                        <span className="px-2.5 py-1 text-[10px] font-semibold bg-violet-500/20 text-violet-300 rounded-full border border-violet-500/30">15+</span>
                      </div>
                      <p className="text-slate-400 text-sm mb-4 leading-relaxed">Real interview problems with instant test feedback. Build what FAANG actually asks.</p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {['Drag & Drop', 'Promise.all', 'Debounce', 'Curry'].map((tag, i) => (
                          <span key={i} className="px-2 py-0.5 text-[10px] bg-violet-500/10 text-violet-300 rounded-full border border-violet-500/20">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Mini Preview */}
                      <div className="flex items-center justify-between p-3 bg-slate-950/80 rounded-xl border border-slate-800/50">
                        <div className="flex items-center gap-2.5">
                          <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 font-medium">Hard</span>
                          <span className="text-sm text-slate-300 font-mono">Drag & Drop List</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm shadow-black/10" />
                          <span className="text-xs text-emerald-400 font-medium">4/5 Tests</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CSS Battles */}
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-slate-800/50 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity" />
                <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-700/30 p-6 hover:border-slate-600/50 transition-all">
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-fuchsia-500 to-pink-600 flex items-center justify-center text-2xl shadow-md shadow-black/20 flex-shrink-0 group-hover:scale-105 transition-transform">
                      🎨
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold text-white">CSS Battles</h3>
                        <span className="px-2.5 py-1 text-[10px] font-semibold bg-fuchsia-500/20 text-fuchsia-300 rounded-full border border-fuchsia-500/30">8+</span>
                      </div>
                      <p className="text-slate-400 text-sm mb-4 leading-relaxed">Pixel-perfect designs with code golf scoring. Compete on global leaderboards.</p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {['Yin Yang', 'Checkerboard', '3D Button', 'Sunset'].map((tag, i) => (
                          <span key={i} className="px-2 py-0.5 text-[10px] bg-fuchsia-500/10 text-fuchsia-300 rounded-full border border-fuchsia-500/20">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Mini Preview */}
                      <div className="flex items-center justify-between p-3 bg-slate-950/80 rounded-xl border border-slate-800/50">
                        <div className="flex items-center gap-2.5">
                          {/* Mini Yin Yang */}
                          <div className="w-6 h-6 rounded-full relative overflow-hidden flex-shrink-0" style={{ background: 'linear-gradient(to right, #000 50%, #fff 50%)', boxShadow: '0 0 0 1.5px #000' }}>
                            <div className="absolute w-3 h-3 rounded-full bg-black top-0 left-1/2 -translate-x-1/2" />
                            <div className="absolute w-3 h-3 rounded-full bg-white bottom-0 left-1/2 -translate-x-1/2" />
                          </div>
                          <span className="text-sm text-slate-300">Yin Yang</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-fuchsia-400 font-semibold">99.2%</span>
                          <span className="text-xs text-slate-500">156 chars</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Web Security */}
              <div className="group relative md:col-span-2">
                <div className="absolute -inset-0.5 bg-slate-800/50 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity" />
                <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-700/30 p-6 hover:border-slate-600/50 transition-all">
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center text-2xl shadow-md shadow-black/20 flex-shrink-0 group-hover:scale-105 transition-transform">
                      🛡️
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold text-white">Web Security — XSS Deep Dive</h3>
                        <span className="px-2.5 py-1 text-[10px] font-semibold bg-red-500/20 text-red-300 rounded-full border border-red-500/30">NEW</span>
                      </div>
                      <p className="text-slate-400 text-sm mb-4 leading-relaxed">Master Cross-Site Scripting (XSS) attacks & defenses. CSP, DOMPurify, cookie security, real-world case studies & production checklists.</p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {['Stored XSS', 'DOM XSS', 'CSP Headers', 'DOMPurify', 'Cookie Flags', 'React Security'].map((tag, i) => (
                          <span key={i} className="px-2 py-0.5 text-[10px] bg-red-500/10 text-red-300 rounded-full border border-red-500/20">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Mini Preview */}
                      <div className="flex items-center justify-between p-3 bg-slate-950/80 rounded-xl border border-slate-800/50">
                        <div className="flex items-center gap-2.5">
                          <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-medium">OWASP Top 10</span>
                          <span className="text-sm text-slate-300 font-mono">XSS Prevention Checklist</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-red-500 shadow-sm shadow-black/10" />
                          <span className="text-xs text-red-400 font-medium">11 Topics</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Row */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-gradient-to-r from-violet-500/10 via-fuchsia-500/10 to-violet-500/10 rounded-2xl border border-violet-500/20">
              <div className="flex items-center gap-4 text-sm text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="text-emerald-400">✓</span> Lifetime Access
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-emerald-400">✓</span> No Subscription
                </span>
                <span className="hidden sm:flex items-center gap-1.5">
                  <span className="text-emerald-400">✓</span> Free Updates
                </span>
              </div>
              <button
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                className="group flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 hover:from-violet-500 hover:via-fuchsia-500 hover:to-pink-500 text-white rounded-xl font-medium text-sm transition-all shadow-md shadow-black/20 hover:shadow-lg hover:shadow-black/25"
              >
                <span>Unlock Premium</span>
                <span className="group-hover:translate-x-0.5 transition-transform">→</span>
              </button>
            </div>
          </div>
        </section>

        <Features />

        {/* SEO-focused curriculum overview for key interview topics */}
        {/* Curriculum overview */}
        <section className="bg-white py-20 md:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                Curriculum overview
              </div>

              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-slate-900 md:text-4xl">
                A complete frontend interview prep system
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-600 md:text-lg">
                The program is organized into focused modules that map to how strong
                frontend candidates are actually evaluated: JavaScript foundations,
                modern React architecture, system design, and hands-on coding rounds.
              </p>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-2">
              {curriculumSections.map((section) => (
                <article
                  key={section.slug}
                  className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_16px_40px_rgba(15,23,42,0.08)] md:p-7"
                >
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div className="rounded-2xl bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                      Module
                    </div>
                    <span className="text-xs text-slate-400">Focused track</span>
                  </div>

                  <h3 className="text-xl font-semibold tracking-[-0.02em] text-slate-900">
                    {section.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600 md:text-[15px]">
                    {section.description}
                  </p>

                  <div className="mt-auto pt-6">
                    <div className="flex items-center justify-between border-t border-slate-200 pt-4">
                      <p className="text-xs font-medium text-slate-500">
                        Interview-focused · Practical depth
                      </p>

                      <Link
                        href={`/product/${section.slug}`}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-slate-900 transition-all group-hover:gap-2 hover:text-brand-600"
                      >
                        Learn more
                        <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <ReaderShowcase />
        <SampleGenerator />
        <Testimonials />
        <ComparisonTable />
        <Pricing />

        <Footer />
      </div>
    </div>
  );
};

export default App;