"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const sections = [
  {
    id: 'acceptance',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: '1. Acceptance of Terms',
    content: (
      <p>
        By accessing or using Coding Activist ("we," "our," or "us") website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
      </p>
    ),
  },
  {
    id: 'services',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    title: '2. Description of Services',
    content: (
      <>
        <p className="mb-4">
          Coding Activist provides educational resources, coding challenges, interview preparation materials, and related services to help developers improve their skills. Our services include:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { text: 'Interactive coding challenges', icon: '💻', color: 'from-blue-500/20 to-blue-600/10 border-blue-500/30' },
            { text: 'Educational content & tutorials', icon: '📚', color: 'from-violet-500/20 to-violet-600/10 border-violet-500/30' },
            { text: 'Interview preparation resources', icon: '🎯', color: 'from-amber-500/20 to-amber-600/10 border-amber-500/30' },
            { text: 'Community features', icon: '👥', color: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/30' },
            { text: 'Premium subscriptions', icon: '⭐', color: 'from-rose-500/20 to-rose-600/10 border-rose-500/30' },
          ].map((item, i) => (
            <div key={i} className={`flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r ${item.color} border backdrop-blur-sm hover:scale-[1.02] transition-transform duration-200`}>
              <span className="text-xl">{item.icon}</span>
              <span className="text-sm font-medium text-white">{item.text}</span>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: 'accounts',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    title: '3. User Accounts',
    content: (
      <div className="space-y-4">
        <div className="p-5 rounded-xl bg-gradient-to-r from-blue-500/20 to-blue-600/10 border border-blue-500/30 backdrop-blur-sm">
          <h4 className="font-semibold text-blue-300 mb-2 flex items-center gap-2">
            <span className="text-lg">👤</span> Account Creation
          </h4>
          <p className="text-white text-sm leading-relaxed">
            To access certain features, you may need to create an account. You agree to provide accurate, current, and complete information during registration.
          </p>
        </div>
        <div className="p-5 rounded-xl bg-gradient-to-r from-violet-500/20 to-violet-600/10 border border-violet-500/30 backdrop-blur-sm">
          <h4 className="font-semibold text-violet-300 mb-2 flex items-center gap-2">
            <span className="text-lg">🔐</span> Account Security
          </h4>
          <p className="text-white text-sm leading-relaxed">
            You are responsible for safeguarding your account credentials and for all activities under your account. Notify us immediately of any unauthorized use.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'conduct',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    title: '4. User Conduct',
    content: (
      <>
        <p className="mb-4">You agree not to engage in the following prohibited activities:</p>
        <div className="space-y-2">
          {[
            'Use services for unlawful purposes',
            'Share or distribute premium content without authorization',
            'Attempt unauthorized access to systems',
            'Upload viruses or malicious code',
            'Harass or harm other users',
            'Use automated bots to access services',
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-2 rounded-lg hover:bg-red-50/50 dark:hover:bg-red-950/20 transition-colors">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mt-0.5">
                <svg className="w-3 h-3 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </span>
              <span className="text-sm">{item}</span>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: 'ip',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: '5. Intellectual Property',
    content: (
      <div className="space-y-4">
        <div className="relative overflow-hidden p-5 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 border border-amber-500/30 backdrop-blur-sm">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl" />
          <h4 className="font-semibold text-amber-300 mb-2 relative flex items-center gap-2">
            <span className="text-lg">©</span> Our Content
          </h4>
          <p className="text-white text-sm relative leading-relaxed">
            All content, features, and functionality are owned by Coding Activist and protected by copyright, trademark, and intellectual property laws.
          </p>
        </div>
        <div className="relative overflow-hidden p-5 rounded-xl bg-gradient-to-br from-teal-500/20 to-cyan-500/10 border border-teal-500/30 backdrop-blur-sm">
          <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/10 rounded-full blur-2xl" />
          <h4 className="font-semibold text-teal-300 mb-2 relative flex items-center gap-2">
            <span className="text-lg">✍️</span> Your Content
          </h4>
          <p className="text-white text-sm relative leading-relaxed">
            You retain ownership of content you create. By submitting content, you grant us a non-exclusive, worldwide, royalty-free license to use it in connection with our services.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'payments',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    title: '6. Subscription & Payments',
    content: (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: 'Pricing', desc: 'Prices displayed on our website may change with reasonable notice', icon: '💎', color: 'from-violet-500/20 to-violet-600/10 border-violet-500/30' },
          { title: 'Billing', desc: 'Subscriptions billed in advance on a recurring basis', icon: '📅', color: 'from-blue-500/20 to-blue-600/10 border-blue-500/30' },
          { title: 'Refunds', desc: 'Handled case-by-case. Contact support for assistance', icon: '↩️', color: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/30' },
        ].map((item, i) => (
          <div key={i} className={`group p-5 rounded-xl bg-gradient-to-br ${item.color} border backdrop-blur-sm hover:scale-[1.02] transition-transform duration-300`}>
            <span className="text-3xl mb-3 block">{item.icon}</span>
            <h4 className="font-semibold text-white mb-2">{item.title}</h4>
            <p className="text-slate-300 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'disclaimers',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: '7. Disclaimers',
    content: (
      <div className="p-5 rounded-xl bg-gradient-to-r from-amber-500/15 to-orange-500/10 border border-amber-500/30 backdrop-blur-sm">
        <div className="flex items-start gap-4">
          <span className="text-2xl flex-shrink-0">⚠️</span>
          <div>
            <p className="text-white mb-3">
              Our services are provided <span className="font-bold text-amber-300">"as is"</span> and <span className="font-bold text-amber-300">"as available"</span> without warranties of any kind.
            </p>
            <p className="text-slate-300 text-sm">
              Educational content is for informational purposes only. We do not guarantee employment outcomes or specific results from using our services.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'liability',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: '8. Limitation of Liability',
    content: (
      <p>
        To the maximum extent permitted by law, Coding Activist shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits, revenues, data, use, goodwill, or other intangible losses.
      </p>
    ),
  },
  {
    id: 'termination',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    ),
    title: '9. Termination',
    content: (
      <p>
        We may terminate or suspend your account and access to our services immediately, without prior notice, for any reason, including breach of these Terms. Upon termination, your right to use our services will immediately cease.
      </p>
    ),
  },
  {
    id: 'changes',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    title: '10. Changes to Terms',
    content: (
      <p>
        We reserve the right to modify these Terms at any time. Changes will be posted on this page with an updated date. Continued use of our services indicates acceptance of new terms.
      </p>
    ),
  },
  {
    id: 'law',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
    title: '11. Governing Law',
    content: (
      <p>
        These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles.
      </p>
    ),
  },
];

export default function TermsOfService() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/5 rounded-full blur-[150px]" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-white/10 backdrop-blur-xl bg-black/20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link 
              href="/product"
              className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors group"
            >
              <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </span>
              Back to Home
            </Link>
          </div>
        </header>

        {/* Hero Section */}
        <div className="relative py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Legal Agreement
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-white to-slate-400 bg-clip-text text-transparent">
              Terms of Service
            </h1>
            
            <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-6">
              Please read these terms carefully before using our platform. By using Coding Activist, you agree to these terms.
            </p>
            
            <div className="flex items-center justify-center gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Quick Navigation</h3>
            <div className="flex flex-wrap gap-2">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-emerald-500/20 border border-white/10 hover:border-emerald-500/30 text-sm text-slate-300 hover:text-emerald-400 transition-all duration-200"
                >
                  {section.title.replace(/^\d+\.\s*/, '')}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="space-y-6">
            {sections.map((section, index) => (
              <section
                key={section.id}
                id={section.id}
                className="group relative"
                onMouseEnter={() => setActiveSection(section.id)}
                onMouseLeave={() => setActiveSection(null)}
              >
                <div 
                  className={`relative p-6 md:p-8 rounded-2xl border transition-all duration-500 ${
                    activeSection === section.id
                      ? 'bg-white/[0.08] border-emerald-500/30 shadow-xl shadow-emerald-500/5'
                      : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.05]'
                  }`}
                  style={{
                    animationDelay: `${index * 50}ms`
                  }}
                >
                  {/* Section Number Badge */}
                  <div className="absolute -top-3 -left-3 w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-500/30">
                    {index + 1}
                  </div>

                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                      activeSection === section.id
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-white/5 text-slate-400'
                    }`}>
                      {section.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl md:text-2xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors">
                        {section.title}
                      </h2>
                      <div className="text-slate-300 leading-relaxed">
                        {section.content}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            ))}

            {/* Contact Section */}
            <section className="relative mt-12">
              <div className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-blue-500/10 to-violet-500/10 border border-white/10 overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/20 rounded-full blur-[80px]" />
                
                <div className="relative text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 mb-6 shadow-lg shadow-emerald-500/30">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Have Questions?</h2>
                  <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                    If you have any questions about these Terms of Service, we're here to help.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a 
                      href="mailto:support@codingactivist.com"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-slate-900 font-semibold hover:bg-slate-100 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      support@codingactivist.com
                    </a>
                    <Link 
                      href="/privacy-policy"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 border border-white/20 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      Privacy Policy
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-white/10 py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-500 text-sm">
            © {new Date().getFullYear()} Coding Activist. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
}
