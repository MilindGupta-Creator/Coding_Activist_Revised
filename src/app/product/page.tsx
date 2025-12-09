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
        <Features />
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