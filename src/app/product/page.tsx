"use client";
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Features from './Features';
import ReaderShowcase from './ReaderShowcase';
import SampleGenerator from './SampleGenerator';
import Testimonials from './Testimonials';
import Pricing from './Pricing';
import Footer from './Footer';
import Reader from './Reader';
import Login from './Login';
import UnderConstruction from './UnderConstruction';
import { CheckIcon } from './Icons';
import { db } from '@/firebase/firebase';

type ViewState = 'landing' | 'login' | 'reader' | 'underConstruction';

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
    // Navigate to under construction page
    setCurrentView('underConstruction');
    window.scrollTo(0, 0);
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
                  <span className="text-xs font-bold text-violet-400 uppercase tracking-wider">Premium Features</span>
                  <span className="px-2 py-0.5 text-[9px] font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full">NEW</span>
                </div>
                <h2 className="text-2xl md:text-4xl font-black text-white leading-tight">
                  Practice Like <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400">FAANG Engineers</span>
                </h2>
              </div>
              
              {/* Stats */}
              <div className="flex gap-6 md:gap-8">
                {[
                  { value: '50+', label: 'Challenges' },
                  { value: '30+', label: 'CSS Battles' },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-2xl md:text-3xl font-black text-white">{stat.value}</div>
                    <div className="text-xs text-slate-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-2 gap-5 mb-8">
              
              {/* Code Challenges */}
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition-opacity" />
                <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-violet-500/20 p-6 hover:border-violet-500/40 transition-all">
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-2xl shadow-lg shadow-violet-500/30 flex-shrink-0 group-hover:scale-105 transition-transform">
                      🧩
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-white">Code Challenges</h3>
                        <span className="px-2.5 py-1 text-[10px] font-bold bg-violet-500/20 text-violet-300 rounded-full border border-violet-500/30">15+</span>
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
                          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
                          <span className="text-xs text-emerald-400 font-medium">4/5 Tests</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CSS Battles */}
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-fuchsia-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition-opacity" />
                <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-fuchsia-500/20 p-6 hover:border-fuchsia-500/40 transition-all">
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-fuchsia-500 to-pink-600 flex items-center justify-center text-2xl shadow-lg shadow-fuchsia-500/30 flex-shrink-0 group-hover:scale-105 transition-transform">
                      🎨
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-white">CSS Battles</h3>
                        <span className="px-2.5 py-1 text-[10px] font-bold bg-fuchsia-500/20 text-fuchsia-300 rounded-full border border-fuchsia-500/30">8+</span>
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
                          <span className="text-sm text-fuchsia-400 font-bold">99.2%</span>
                          <span className="text-xs text-slate-500">156 chars</span>
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
                className="group flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 hover:from-violet-500 hover:via-fuchsia-500 hover:to-pink-500 text-white rounded-xl font-semibold text-sm transition-all shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30"
              >
                <span>Unlock Premium</span>
                <span className="group-hover:translate-x-0.5 transition-transform">→</span>
              </button>
            </div>
          </div>
        </section>

        <Features />
        <ReaderShowcase />
        <SampleGenerator />
        <Testimonials />
        
        {/* Pricing Section with manual purchase handler */}
        <section id="pricing" className="py-24 bg-gradient-to-b from-white to-slate-50 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Invest in Your Career</h2>
              <p className="text-slate-600">The price of a few coffees. The ROI of a Staff Engineer's salary.</p>
            </div>

            <div className="max-w-lg mx-auto bg-white rounded-3xl overflow-hidden shadow-2xl border-2 border-brand-200 relative">
              <div className="absolute top-0 right-0 bg-gradient-to-r from-brand-500 to-accent-500 text-white text-xs font-bold px-4 py-2 rounded-bl-lg shadow-lg">
                LIMITED OFFER
              </div>
              <div className="p-8 md:p-12 text-center border-b border-slate-200 bg-gradient-to-br from-white to-brand-50/30">
                <h3 className="text-2xl font-semibold text-slate-900 mb-2">The Ultimate Guide (Vol 2)</h3>
                <div className="flex items-baseline justify-center gap-2 mb-6">
                    <span className="text-5xl font-bold bg-gradient-to-r from-brand-600 to-accent-600 bg-clip-text text-transparent">$29</span>
                    <span className="text-xl text-slate-400 line-through">$89</span>
                </div>
                <button 
                  onClick={handlePurchaseClick}
                  className="w-full py-4 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white rounded-xl font-bold text-lg shadow-xl shadow-brand-500/30 transition-all transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-brand-500/40"
                >
                  Instantly Upgrade My Career
                </button>
                <p className="mt-4 text-xs text-slate-500">Includes lifetime updates for Next.js 15+</p>
              </div>
              
              <div className="p-8 md:p-12 bg-gradient-to-br from-slate-50 to-white">
                <h4 className="text-slate-900 font-medium mb-6 uppercase tracking-wider text-sm">Everything Inside:</h4>
                <ul className="space-y-4 text-left">
                  <li className="flex items-start gap-3 text-slate-700">
                    <CheckIcon className="w-5 h-5 text-brand-500 shrink-0" />
                    <span>Next.js 14 App Router Deep Dive</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-700">
                    <CheckIcon className="w-5 h-5 text-brand-500 shrink-0" />
                    <span>Advanced React Server Components</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-700">
                    <CheckIcon className="w-5 h-5 text-brand-500 shrink-0" />
                    <span>Machine Coding: Kanban Board, Infinite Feed</span>
                  </li>
                   <li className="flex items-start gap-3 text-slate-700">
                    <CheckIcon className="w-5 h-5 text-brand-500 shrink-0" />
                    <span>System Design: Designing WhatsApp Web</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default App;