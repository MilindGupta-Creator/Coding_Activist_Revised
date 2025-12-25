"use client";

import React from 'react';
import Link from 'next/link';
import Game67 from './components/Game67';
import ComingSoonGame from './components/ComingSoonGame';

export default function FunPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        {/* Gradient orbs */}
        <div className="absolute top-20 left-20 w-[600px] h-[600px] bg-purple-600/20 rounded-full filter blur-[120px] animate-pulse" />
        <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-amber-600/15 rounded-full filter blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full filter blur-[150px]" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        
        {/* Radial fade */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0a0a0f_70%)]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-20 flex items-center justify-between px-6 py-4 border-b border-slate-800/50 backdrop-blur-sm">
        <Link 
          href="/"
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-medium">Back</span>
        </Link>
        
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎮</span>
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 bg-clip-text text-transparent">
            Fun Zone
          </h1>
        </div>
        
        <Link
          href="/fun"
          className="relative w-12 h-12 flex items-center justify-center group"
          aria-label="Fun Zone"
        >
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-amber-400 via-pink-500 to-purple-500 opacity-60 blur-sm group-hover:opacity-80 transition-opacity" />
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 rounded-lg bg-slate-900/80 border border-white/15 shadow-[0_0_18px_rgba(255,128,0,0.4)] animate-cube-rotate transform-gpu" />
            <div className="absolute inset-[2px] rounded-md border border-white/25 mix-blend-screen" />
            <div className="absolute inset-1 rounded-md bg-gradient-to-br from-white/10 via-amber-100/10 to-pink-100/5 opacity-80 group-hover:opacity-100 transition-opacity" />
          </div>
        </Link>
      </nav>

      {/* Main content */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full border border-purple-500/30 mb-6">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-purple-300">Interactive Mini Games</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4">
            Mini Games <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-red-400">Arcade</span>
          </h1>
          
          <p className="text-slate-400 text-lg max-w-md mx-auto">
            Take a break and have some fun with these interactive games!
          </p>
        </div>

        {/* Games Grid */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <span className="text-3xl">🎯</span>
            <h2 className="text-2xl font-bold text-white">Games</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Game67 />
            <ComingSoonGame name="Memory Match" emoji="🧠" color="from-blue-500 to-cyan-500" />
            <ComingSoonGame name="Speed Type" emoji="⌨️" color="from-green-500 to-emerald-500" />
            <ComingSoonGame name="Color Guess" emoji="🎨" color="from-pink-500 to-rose-500" />
          </div>
        </section>
      </main>

      <style jsx>{`
        @keyframes cube-rotate {
          0% { transform: rotateX(18deg) rotateY(0deg) rotateZ(0deg); }
          25% { transform: rotateX(22deg) rotateY(90deg) rotateZ(4deg); }
          50% { transform: rotateX(24deg) rotateY(180deg) rotateZ(-6deg); }
          75% { transform: rotateX(20deg) rotateY(270deg) rotateZ(2deg); }
          100% { transform: rotateX(18deg) rotateY(360deg) rotateZ(0deg); }
        }

        .animate-cube-rotate {
          animation: cube-rotate 6s linear infinite;
        }
      `}</style>
    </div>
  );
}
