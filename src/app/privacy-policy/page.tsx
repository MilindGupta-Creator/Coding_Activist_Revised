"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const sections = [
  {
    id: 'introduction',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: '1. Introduction',
    content: (
      <p>
        Welcome to Coding Activist ("we," "our," or "us"). We are committed to protecting your privacy and ensuring you have a positive experience on our website and in using our products and services. This Privacy Policy explains how we collect, use, disclose, and safeguard your information.
      </p>
    ),
  },
  {
    id: 'collection',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    title: '2. Information We Collect',
    content: (
      <div className="space-y-5">
        <div className="p-5 rounded-xl bg-gradient-to-r from-blue-500/20 to-blue-600/10 border border-blue-500/30 backdrop-blur-sm">
          <h4 className="font-semibold text-blue-300 mb-4 flex items-center gap-3">
            <span className="text-xl">📝</span>
            Information You Provide
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {['Account information (name, email, password)', 'Payment information (secure processing)', 'Profile information & preferences', 'Communications & feedback'].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-white text-sm">
                <span className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-5 rounded-xl bg-gradient-to-r from-violet-500/20 to-violet-600/10 border border-violet-500/30 backdrop-blur-sm">
          <h4 className="font-semibold text-violet-300 mb-4 flex items-center gap-3">
            <span className="text-xl">🔄</span>
            Automatically Collected
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {['Device info (IP, browser, OS)', 'Usage data (pages, time spent)', 'Cookies & tracking technologies', 'Log files & analytics'].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-white text-sm">
                <span className="w-2 h-2 rounded-full bg-violet-400 flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'usage',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    title: '3. How We Use Your Information',
    content: (
      <>
        <p className="mb-4">We use the information we collect to deliver the best possible experience:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { icon: '🚀', text: 'Provide & improve our services', color: 'from-blue-500/20 to-blue-600/10 border-blue-500/30' },
            { icon: '💳', text: 'Process transactions', color: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/30' },
            { icon: '📧', text: 'Send updates & notifications', color: 'from-violet-500/20 to-violet-600/10 border-violet-500/30' },
            { icon: '💬', text: 'Respond to your requests', color: 'from-amber-500/20 to-amber-600/10 border-amber-500/30' },
            { icon: '📊', text: 'Analyze trends & usage', color: 'from-cyan-500/20 to-cyan-600/10 border-cyan-500/30' },
            { icon: '🔒', text: 'Detect security threats', color: 'from-rose-500/20 to-rose-600/10 border-rose-500/30' },
            { icon: '✨', text: 'Personalize your experience', color: 'from-indigo-500/20 to-indigo-600/10 border-indigo-500/30' },
          ].map((item, i) => (
            <div key={i} className={`flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r ${item.color} border backdrop-blur-sm hover:scale-[1.02] transition-transform duration-200`}>
              <span className="text-2xl">{item.icon}</span>
              <span className="text-sm font-medium text-white">{item.text}</span>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: 'sharing',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
    ),
    title: '4. Information Sharing',
    content: (
      <>
        <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-500/20 to-emerald-600/10 border border-emerald-500/40 mb-5">
          <p className="text-emerald-300 font-semibold flex items-center gap-2">
            <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            We do not sell your personal information.
          </p>
        </div>
        <p className="mb-4 text-slate-300">We may share your information only in these circumstances:</p>
        <div className="space-y-3">
          {[
            { title: 'Service Providers', desc: 'Trusted third-party partners who assist our operations', icon: '🤝', gradient: 'from-blue-500/20 to-blue-600/10 border-blue-500/30' },
            { title: 'Legal Requirements', desc: 'When required by law or to protect our rights', icon: '⚖️', gradient: 'from-amber-500/20 to-amber-600/10 border-amber-500/30' },
            { title: 'Business Transfers', desc: 'In connection with merger, acquisition, or sale', icon: '🏢', gradient: 'from-violet-500/20 to-violet-600/10 border-violet-500/30' },
            { title: 'With Your Consent', desc: 'When you explicitly permit sharing', icon: '✅', gradient: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/30' },
          ].map((item, i) => (
            <div key={i} className={`flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r ${item.gradient} border backdrop-blur-sm`}>
              <span className="text-xl flex-shrink-0">{item.icon}</span>
              <div>
                <span className="font-semibold text-white">{item.title}</span>
                <p className="text-slate-300 text-sm mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: 'security',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: '5. Data Security',
    content: (
      <div className="relative overflow-hidden p-6 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/30 backdrop-blur-sm">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-[60px]" />
        <div className="relative flex items-start gap-4">
          <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <p className="text-white leading-relaxed">
            We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission is 100% secure.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'cookies',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: '6. Cookies & Tracking',
    content: (
      <p>
        We use cookies and similar tracking technologies to track activity on our website and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, some features may not function properly without cookies.
      </p>
    ),
  },
  {
    id: 'rights',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: '7. Your Rights & Choices',
    content: (
      <>
        <p className="mb-4">You have the following rights regarding your personal data:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { icon: '📋', text: 'Access your data', color: 'from-blue-500/20 to-blue-600/10 border-blue-500/30' },
            { icon: '✏️', text: 'Rectify inaccuracies', color: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/30' },
            { icon: '🗑️', text: 'Request deletion', color: 'from-rose-500/20 to-rose-600/10 border-rose-500/30' },
            { icon: '⛔', text: 'Object to processing', color: 'from-amber-500/20 to-amber-600/10 border-amber-500/30' },
            { icon: '⏸️', text: 'Restrict processing', color: 'from-violet-500/20 to-violet-600/10 border-violet-500/30' },
            { icon: '📦', text: 'Data portability', color: 'from-cyan-500/20 to-cyan-600/10 border-cyan-500/30' },
            { icon: '↩️', text: 'Withdraw consent', color: 'from-indigo-500/20 to-indigo-600/10 border-indigo-500/30' },
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
    id: 'children',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    title: '8. Children\'s Privacy',
    content: (
      <div className="p-5 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/10 border border-amber-500/30 backdrop-blur-sm">
        <div className="flex items-start gap-4">
          <span className="text-2xl flex-shrink-0">👶</span>
          <p className="text-amber-200">
            Our services are not intended for individuals under the age of 13. We do not knowingly collect personal information from children under 13. If you become aware that a child has provided us with personal information, please contact us.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'changes',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    title: '9. Changes to This Policy',
    content: (
      <p>
        We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this policy periodically.
      </p>
    ),
  },
];

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[150px]" />
        
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Your Privacy Matters
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-white to-slate-400 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            
            <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-6">
              We're committed to protecting your privacy and being transparent about how we handle your data.
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
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-blue-500/20 border border-white/10 hover:border-blue-500/30 text-sm text-slate-300 hover:text-blue-400 transition-all duration-200"
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
                      ? 'bg-white/[0.08] border-blue-500/30 shadow-xl shadow-blue-500/5'
                      : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.05]'
                  }`}
                >
                  {/* Section Number Badge */}
                  <div className="absolute -top-3 -left-3 w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/30">
                    {index + 1}
                  </div>

                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                      activeSection === section.id
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-white/5 text-slate-400'
                    }`}>
                      {section.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl md:text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
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
              <div className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-blue-500/10 via-violet-500/10 to-emerald-500/10 border border-white/10 overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-violet-500/20 rounded-full blur-[80px]" />
                
                <div className="relative text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 mb-6 shadow-lg shadow-blue-500/30">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Questions About Privacy?</h2>
                  <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                    If you have any questions about our Privacy Policy or how we handle your data, we're here to help.
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
                      href="/terms-of-service"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 border border-white/20 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Terms of Service
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
