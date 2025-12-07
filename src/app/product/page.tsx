"use client";
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Features from './Features';
import SampleGenerator from './SampleGenerator';
import Testimonials from './Testimonials';
import Pricing from './Pricing';
import Footer from './Footer';
import Reader from './Reader';
import Login from './Login';
import { CheckIcon } from './Icons';
import { db } from '@/firebase/firebase';

type ViewState = 'landing' | 'login' | 'reader';

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
    // In a real app, this would go to Stripe. 
    // For demo, we send them to login or simulate a "post-purchase" flow
    // Let's assume they bought it and now need to login
    setCurrentView('login');
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

  return (
    <div className="min-h-screen bg-slate-900 text-white selection:bg-brand-500 selection:text-white">
      {/* Navbar with Login/Purchase handlers */}
      <Navbar onPurchase={handlePurchaseClick} onLogin={handleLoginClick} />

      {/* Main Landing Page Content */}
      <div className="pt-20"> 
        <Hero />
        <Features />
        <SampleGenerator />
        <Testimonials />
        
        {/* Pricing Section with manual purchase handler */}
        <section id="pricing" className="py-24 bg-slate-900 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Invest in Your Career</h2>
              <p className="text-slate-400">The price of a few coffees. The ROI of a Staff Engineer's salary.</p>
            </div>

            <div className="max-w-lg mx-auto bg-slate-800 rounded-3xl overflow-hidden shadow-2xl border border-slate-700 relative">
              <div className="absolute top-0 right-0 bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                LIMITED OFFER
              </div>
              <div className="p-8 md:p-12 text-center border-b border-slate-700">
                <h3 className="text-2xl font-semibold text-white mb-2">The Ultimate Guide (Vol 2)</h3>
                <div className="flex items-baseline justify-center gap-2 mb-6">
                    <span className="text-5xl font-bold text-white">$29</span>
                    <span className="text-xl text-slate-500 line-through">$89</span>
                </div>
                <button 
                  onClick={handlePurchaseClick}
                  className="w-full py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-bold text-lg shadow-lg shadow-brand-500/25 transition-all transform hover:scale-[1.02]"
                >
                  Instantly Upgrade My Career
                </button>
                <p className="mt-4 text-xs text-slate-500">Includes lifetime updates for Next.js 15+</p>
              </div>
              
              <div className="p-8 md:p-12 bg-slate-800/50">
                <h4 className="text-white font-medium mb-6 uppercase tracking-wider text-sm">Everything Inside:</h4>
                <ul className="space-y-4 text-left">
                  <li className="flex items-start gap-3 text-slate-300">
                    <CheckIcon className="w-5 h-5 text-brand-400 shrink-0" />
                    <span>Next.js 14 App Router Deep Dive</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-300">
                    <CheckIcon className="w-5 h-5 text-brand-400 shrink-0" />
                    <span>Advanced React Server Components</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-300">
                    <CheckIcon className="w-5 h-5 text-brand-400 shrink-0" />
                    <span>Machine Coding: Kanban Board, Infinite Feed</span>
                  </li>
                   <li className="flex items-start gap-3 text-slate-300">
                    <CheckIcon className="w-5 h-5 text-brand-400 shrink-0" />
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