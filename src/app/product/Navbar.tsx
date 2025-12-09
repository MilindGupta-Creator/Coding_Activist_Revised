'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import Link from "next/link";
import Logo from "../../../public/assets/main-logo.png";

interface NavbarProps {
  onPurchase: () => void;
  onLogin: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onPurchase, onLogin }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const navRef = useRef<HTMLElement>(null);

  // Scroll detection with progress tracking
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          setIsScrolled(scrollY > 20);
          
          const windowHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight;
          const maxScroll = documentHeight - windowHeight;
          const progress = maxScroll > 0 ? Math.min((scrollY / maxScroll) * 100, 100) : 0;
          setScrollProgress(progress);
          
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navHeight = navRef.current?.offsetHeight || 0;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navHeight - 20;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    {
      id: 'features',
      label: 'Architecture',
      icon: (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      color: 'brand'
    },
    {
      id: 'preview',
      label: 'System Design',
      icon: (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      color: 'accent'
    },
    {
      id: 'pricing',
      label: 'Investment',
      icon: (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'yellow'
    }
  ];

  return (
    <>
      <style jsx>{`
        @keyframes fade-in-up {
          from { transform: translateY(8px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        @keyframes scan-line {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes terminal-type {
          0% { width: 0; }
          100% { width: 100%; }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes animate-gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-shift {
          animation: animate-gradient-shift 3s ease infinite;
        }
        .nav-link {
          position: relative;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .nav-link::before {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, currentColor, transparent);
          transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 2px;
        }
        .nav-link:hover::before {
          width: 100%;
        }
        .nav-link::after {
          content: '>';
          position: absolute;
          right: -14px;
          opacity: 0;
          font-family: 'Courier New', monospace;
          font-size: 0.75rem;
          color: currentColor;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translateX(-6px) scale(0.8);
        }
        .nav-link:hover::after {
          opacity: 0.8;
          transform: translateX(0) scale(1);
        }
        .nav-link:hover {
          transform: translateY(-1px);
        }
        .code-bracket {
          font-family: 'Courier New', monospace;
          opacity: 0.5;
          font-size: 0.75rem;
        }
        .terminal-cursor {
          display: inline-block;
          width: 2px;
          height: 0.875rem;
          background: currentColor;
          margin-left: 2px;
          animation: blink 1s infinite;
        }
        .tech-glow {
          box-shadow: 0 0 8px rgba(56, 189, 248, 0.3);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .tech-glow:hover {
          box-shadow: 0 0 16px rgba(56, 189, 248, 0.6), 0 0 32px rgba(56, 189, 248, 0.3);
          transform: scale(1.05);
        }
        .cool-button {
          position: relative;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .cool-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          transition: left 0.5s;
        }
        .cool-button:hover::before {
          left: 100%;
        }
        .cool-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(56, 189, 248, 0.3);
        }
        .gradient-border {
          position: relative;
          background: linear-gradient(135deg, rgba(56, 189, 248, 0.1), rgba(99, 102, 241, 0.1));
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
        }
        .icon-float {
          animation: float 3s ease-in-out infinite;
        }
        .icon-float:nth-child(2) {
          animation-delay: 0.5s;
        }
        .icon-float:nth-child(3) {
          animation-delay: 1s;
        }
        .scan-line {
          position: absolute;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.3), transparent);
          animation: scan-line 3s linear infinite;
        }
        .code-indicator {
          font-family: 'Courier New', monospace;
          font-size: 0.625rem;
          opacity: 0.4;
        }
      `}</style>
      
      <nav 
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
      isScrolled 
            ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-lg shadow-slate-200/20' 
            : 'bg-white/90 backdrop-blur-md border-b border-slate-200/50'
        }`}
      >
        {/* Tech Scroll Progress with Terminal Style */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-slate-200/60">
          <div 
            className="h-full bg-gradient-to-r from-brand-400 via-accent-500 via-brand-400 to-accent-500 bg-[length:200%_100%] transition-all duration-200 relative animate-gradient-shift"
            style={{ width: `${scrollProgress}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-brand-400 rounded-full shadow-[0_0_8px_rgba(56,189,248,1)] animate-pulse-glow"></div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-brand-400/20 rounded-full blur-sm"></div>
          </div>
        </div>
        
        {/* Subtle Scan Line Effect */}
        <div className="scan-line opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Animated Gradient Orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-400/5 rounded-full blur-3xl animate-pulse-glow"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent-500/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
          <div className="w-full h-full bg-[linear-gradient(rgba(148,163,184,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.15)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
        </div>

      <div className="flex justify-between items-center py-3 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
          {/* Logo Section */}
          <Link 
            href="/" 
            className="flex items-center gap-x-3 group relative z-50" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-400/30 via-accent-500/30 to-brand-400/30 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-glow"></div>
              <div className="absolute -inset-0.5 bg-brand-400/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Image
                src={Logo}
                alt="Coding Activist Logo"
                width="40"
                height="40"
                className="relative bg-white rounded-full transition-all duration-300 group-hover:opacity-90 ring-1 ring-slate-600/60 group-hover:ring-2 group-hover:ring-brand-400/70 tech-glow icon-float"
                loading="eager"
                priority
              />
            </div>
            
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
                <span className="code-bracket text-brand-500/60 group-hover:text-brand-600 transition-colors">{'<'}</span>
                <p className="font-semibold text-slate-900 text-base group-hover:text-brand-600 transition-colors duration-300 tracking-tight font-mono">
                  CodingActivist
                </p>
                <span className="code-bracket text-brand-500/70 group-hover:text-brand-600 transition-colors">{'/>'}</span>
                <span className="text-xs font-mono text-slate-700 bg-gradient-to-r from-brand-100 to-accent-100 px-1.5 py-0.5 rounded-md border border-brand-200 group-hover:border-brand-400 group-hover:text-brand-700 group-hover:bg-gradient-to-r group-hover:from-brand-200 group-hover:to-accent-200 transition-all duration-300 shadow-sm group-hover:shadow-brand-500/20">
                  L6+
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="code-indicator text-brand-500/60">$</span>
                <span className="text-[10px] font-mono text-slate-600 flex items-center gap-1 group-hover:text-slate-700 transition-colors">
                  <span className="w-1 h-1 bg-brand-500 rounded-full animate-pulse-glow"></span>
                  <span className="code-indicator opacity-60">status:</span>
                  <span>Staff Engineer</span>
                  <span className="terminal-cursor text-brand-500"></span>
                </span>
              </div>
          </div>
        </Link>

          {/* Desktop Navigation */}
          <div className="md:flex items-center gap-x-6 lg:gap-x-8 hidden relative">
            {navItems.map((item) => (
          <button 
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`nav-link text-sm font-medium transition-all duration-200 text-slate-700 hover:text-slate-900 flex items-center gap-2 group relative px-2 py-1 rounded ${
                  item.color === 'brand' ? 'hover:text-brand-600 hover:bg-brand-100' :
                  item.color === 'accent' ? 'hover:text-accent-600 hover:bg-accent-100' :
                  'hover:text-yellow-600 hover:bg-yellow-100'
                }`}
              >
                <span className={`transition-all duration-300 ${
                  item.color === 'brand' ? 'text-brand-500/70 group-hover:text-brand-600 group-hover:drop-shadow-[0_0_6px_rgba(56,189,248,0.6)] group-hover:scale-110' :
                  item.color === 'accent' ? 'text-accent-500/70 group-hover:text-accent-600 group-hover:drop-shadow-[0_0_6px_rgba(99,102,241,0.6)] group-hover:scale-110' :
                  'text-yellow-500/70 group-hover:text-yellow-600 group-hover:drop-shadow-[0_0_6px_rgba(234,179,8,0.6)] group-hover:scale-110'
                }`}>
                  {item.icon}
                </span>
                <span className="font-mono text-xs relative z-10">{item.label}</span>
                <span className={`absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-current to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 ${
                  item.color === 'brand' ? 'text-brand-400 shadow-[0_0_8px_rgba(56,189,248,0.5)]' :
                  item.color === 'accent' ? 'text-accent-400 shadow-[0_0_8px_rgba(99,102,241,0.5)]' :
                  'text-yellow-400 shadow-[0_0_8px_rgba(234,179,8,0.5)]'
                }`}></span>
                <span className={`absolute inset-0 rounded-md bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  item.color === 'brand' ? 'from-brand-500/5 to-transparent' :
                  item.color === 'accent' ? 'from-accent-500/5 to-transparent' :
                  'from-yellow-500/5 to-transparent'
                }`}></span>
          </button>
            ))}
            
            <div className="w-px h-4 bg-gradient-to-b from-transparent via-slate-300/60 to-transparent mx-2"></div>
            
            {/* Login Button */}
            <button
              onClick={onLogin}
              className="cool-button text-sm font-medium transition-all duration-300 text-slate-700 hover:text-slate-900 px-3 py-1.5 rounded-md hover:bg-gradient-to-r hover:from-slate-100 hover:to-slate-50 flex items-center gap-2 group border border-slate-200 hover:border-brand-400 relative"
            >
              <span className="code-indicator absolute -left-2 opacity-0 group-hover:opacity-60 transition-all duration-300 group-hover:-translate-x-1">[</span>
              <svg className="w-3.5 h-3.5 text-brand-500/70 group-hover:text-brand-600 transition-all duration-300 group-hover:drop-shadow-[0_0_6px_rgba(56,189,248,0.6)] group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="font-mono text-xs relative z-10">Access</span>
              <span className="code-indicator absolute -right-2 opacity-0 group-hover:opacity-60 transition-all duration-300 group-hover:translate-x-1">]</span>
              <div className="absolute inset-0 rounded-md bg-gradient-to-r from-brand-500/0 via-brand-500/10 to-brand-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          
            {/* CTA Button */}
            <button
              onClick={onPurchase}
              className="cool-button relative bg-gradient-to-r from-brand-600 via-brand-500 to-accent-600 hover:from-brand-500 hover:via-accent-500 hover:to-brand-500 text-white font-medium py-2 px-5 rounded-md transition-all duration-300 hover:shadow-xl hover:shadow-brand-500/40 active:scale-[0.98] flex items-center gap-2 group overflow-hidden"
              style={{ backgroundSize: '200% 100%' }}
            >
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-brand-400 via-accent-500 to-brand-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ backgroundSize: '200% 100%', animation: 'gradient-shift 3s ease infinite' }}></div>
              
              {/* Terminal-style background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              
              <span className="code-indicator text-white/70 group-hover:text-white transition-all duration-300 relative z-10 group-hover:scale-110">$</span>
              <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-all duration-300 relative z-10 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              <span className="font-mono text-xs relative z-10 font-semibold">npm start</span>
              
              {/* Multi-layer glow effect */}
              <div className="absolute -inset-1 bg-brand-400/30 rounded-md blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              <div className="absolute -inset-2 bg-accent-500/20 rounded-md blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
            </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
            className="md:hidden relative z-50 p-2 rounded-md hover:bg-slate-800/50 transition-colors duration-200"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <div className="relative w-5 h-5">
              <span className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-[1.5px] bg-slate-300 transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5'
            }`}></span>
              <span className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-[1.5px] bg-slate-300 transition-all duration-300 ${
              isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}></span>
              <span className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-[1.5px] bg-slate-300 transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-1.5'
            }`}></span>
          </div>
        </button>

        {/* Mobile Menu Overlay */}
          <div 
            className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          isMobileMenuOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div 
              className="absolute inset-0 bg-white/90 backdrop-blur-xl"
              onClick={(e) => e.stopPropagation()}
            ></div>
            
            <div 
              className={`absolute top-0 right-0 w-72 max-w-[80vw] h-full bg-white border-l border-slate-200 shadow-xl transform transition-transform duration-300 ${
                isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mobile Grid Pattern */}
              <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
                <div className="w-full h-full bg-[linear-gradient(rgba(148,163,184,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.15)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
              </div>
              
              <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-brand-500/50 via-accent-500/50 to-brand-500/50"></div>
              
              <div className="flex flex-col h-full pt-16 px-5 pb-6 overflow-y-auto relative">
                {/* Header */}
                <div className="mb-6 pb-4 border-b border-slate-200">
                  <div className="flex items-center gap-2 px-2 py-1.5 bg-brand-100 rounded border border-brand-200 w-fit group">
                    <span className="code-indicator text-brand-600/70">$</span>
                    <span className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-pulse-glow"></span>
                    <span className="text-xs font-mono text-slate-700 uppercase tracking-wider">Premium</span>
                    <span className="terminal-cursor text-brand-600"></span>
                  </div>
                </div>
                
                {/* Menu Items */}
                <div className="flex flex-col gap-y-1">
                  {navItems.map((item, index) => (
                <button 
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="text-left text-sm font-medium transition-all duration-200 hover:text-slate-900 text-slate-700 py-2.5 px-3 rounded-md hover:bg-slate-100 border-l-2 border-transparent hover:border-brand-500/70 flex items-center gap-3 group relative"
                      style={{
                        animation: isMobileMenuOpen ? `fade-in-up 0.3s ease-out ${index * 0.05}s both` : 'none'
                      }}
                    >
                      <div className={`w-8 h-8 rounded-md flex items-center justify-center transition-colors ${
                        item.color === 'brand' ? 'bg-brand-500/10 group-hover:bg-brand-500/20' :
                        item.color === 'accent' ? 'bg-accent-500/10 group-hover:bg-accent-500/20' :
                        'bg-yellow-500/10 group-hover:bg-yellow-500/20'
                      }`}>
                        <span className={`transition-all duration-200 ${
                          item.color === 'brand' ? 'text-brand-400 group-hover:drop-shadow-[0_0_4px_rgba(56,189,248,0.5)]' :
                          item.color === 'accent' ? 'text-accent-400 group-hover:drop-shadow-[0_0_4px_rgba(99,102,241,0.5)]' :
                          'text-yellow-400 group-hover:drop-shadow-[0_0_4px_rgba(234,179,8,0.5)]'
                        }`}>
                          {item.icon}
                        </span>
                  </div>
                      <span className="font-mono text-xs">{item.label}</span>
                      <span className="code-indicator absolute right-3 opacity-0 group-hover:opacity-40 transition-opacity">→</span>
                </button>
                  ))}
                  
                  <div className="h-px bg-slate-200 my-3"></div>
                
                <button 
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onLogin();
                    }}
                    className="text-left text-sm font-medium transition-all duration-200 hover:text-slate-900 text-slate-700 py-2.5 px-3 rounded-md hover:bg-slate-100 flex items-center gap-3 group border border-slate-200 hover:border-slate-300"
                    style={{
                      animation: isMobileMenuOpen ? `fade-in-up 0.3s ease-out ${navItems.length * 0.05}s both` : 'none'
                    }}
                  >
                    <div className="w-8 h-8 rounded-md bg-brand-100 flex items-center justify-center group-hover:bg-brand-200 transition-colors">
                      <svg className="w-3.5 h-3.5 text-brand-600 group-hover:drop-shadow-[0_0_4px_rgba(56,189,248,0.5)] transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                    <span className="font-mono text-xs">Access</span>
                    <span className="code-indicator absolute right-3 opacity-0 group-hover:opacity-40 transition-opacity">→</span>
                </button>
                
                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onPurchase();
                  }}
                    className="mt-2 bg-gradient-to-r from-brand-600 to-accent-600 hover:from-brand-500 hover:to-accent-500 text-white font-medium py-2.5 px-4 rounded-md transition-all duration-200 hover:shadow-lg hover:shadow-brand-500/30 active:scale-[0.98] flex items-center justify-center gap-2 group relative overflow-hidden"
                    style={{
                      animation: isMobileMenuOpen ? `fade-in-up 0.3s ease-out ${(navItems.length + 1) * 0.05}s both` : 'none'
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    <span className="code-indicator text-white/60 group-hover:text-white transition-colors relative z-10">$</span>
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                    <span className="font-mono text-xs relative z-10">npm start</span>
                    <div className="absolute -inset-1 bg-brand-400/20 rounded-md blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    </>
  );
};

export default Navbar;
