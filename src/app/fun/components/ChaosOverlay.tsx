"use client";

import React from 'react';

interface ChaosOverlayProps {
  isExploding: boolean;
  crackBurst: boolean;
  showConfetti: boolean;
  confettiPosition?: { x: number; y: number };
}

export const ChaosOverlay: React.FC<ChaosOverlayProps> = ({
  isExploding,
  crackBurst,
  showConfetti,
  confettiPosition = { x: 0, y: 0 },
}) => {
  return (
    <>
      {/* DANGER FLASH OVERLAY - Portal to top level */}
      {isExploding && (
        <div className="fixed inset-0 z-[9999] pointer-events-none">
          {/* Red danger flash */}
          <div className="absolute inset-0 bg-red-500 animate-danger-flash" />
          {/* Chromatic aberration layers */}
          <div className="absolute inset-0 bg-cyan-500/30 animate-rgb-split-left mix-blend-screen" />
          <div className="absolute inset-0 bg-red-500/30 animate-rgb-split-right mix-blend-screen" />
          {/* Scanlines */}
          <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.3)_2px,rgba(0,0,0,0.3)_4px)] animate-scanlines" />
          {/* Noise + vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0)_30%,rgba(0,0,0,0.35)_100%)] mix-blend-multiply" />
          <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%204%204%22%3E%3Cpath%20fill=%22%23fff%22%20d=%22M0%200h1v1H0zm2%200h1v1H2zm1%201h1v1H3zm-3%201h1v1H0zm2%201h1v1H2z%22/%3E%3C/svg%3E')] animate-static-noise" />
          {/* Screen tear bands */}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(255,255,255,0.12)_3%,transparent_6%)] animate-tear" />
          {/* Blur pulse for extra distortion */}
          <div className="absolute inset-0 backdrop-blur-[1.5px] animate-blur-pulse" />
        </div>
      )}

      {/* Crack overlay */}
      {crackBurst && (
        <div className="fixed inset-0 z-[9998] pointer-events-none select-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_30%,rgba(255,255,255,0.07)_0,rgba(255,255,255,0)_40%),radial-gradient(circle_at_70%_55%,rgba(255,255,255,0.08)_0,rgba(255,255,255,0)_35%)] blur-[0.3px] mix-blend-screen animate-crack-appear" />
          
          <svg className="absolute inset-0 w-full h-full text-white/70 drop-shadow-[0_0_8px_rgba(255,255,255,0.25)] animate-crack-appear" viewBox="0 0 100 100" preserveAspectRatio="none">
            <g stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" strokeLinejoin="round" fill="none">
              <path d="M52 50 L70 20 L85 8" />
              <path d="M52 50 L78 42 L94 32" />
              <path d="M52 50 L80 62 L96 72" />
              <path d="M52 50 L68 82 L76 96" />
              <path d="M52 50 L50 82 L48 96" />
              <path d="M52 50 L30 80 L18 94" />
              <path d="M52 50 L22 62 L4 70" />
              <path d="M52 50 L24 40 L6 30" />
              <path d="M52 50 L34 18 L18 6" />
              <path d="M52 50 L52 18 L54 4" />
            </g>
          </svg>

          <div className="absolute inset-0">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-10 h-16 border border-white/15 bg-white/5 backdrop-blur-[1px] rotate-[8deg] rounded-sm shadow-[0_4px_18px_rgba(255,255,255,0.08)] animate-glass-fall"
                style={{
                  left: `${20 + i * 12}%`,
                  top: `${30 + (i % 3) * 10}%`,
                  '--glass-x': `${(i - 2) * 12}px`,
                } as React.CSSProperties}
              />
            ))}
          </div>
        </div>
      )}

      {/* Confetti burst effect */}
      {showConfetti && (
        <div 
          className="fixed pointer-events-none overflow-visible z-[10000]"
          style={{
            left: `${confettiPosition.x || (typeof window !== 'undefined' ? window.innerWidth / 2 : 0)}px`,
            top: `${confettiPosition.y || (typeof window !== 'undefined' ? window.innerHeight / 2 : 0)}px`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute top-0 left-0 w-2 h-2 rounded-full animate-confetti"
              style={{
                background: ['#fbbf24', '#f97316', '#ef4444', '#22c55e', '#3b82f6', '#a855f7'][i % 6],
                '--confetti-x': `${(Math.random() - 0.5) * 100}px`,
                '--confetti-y': `${(Math.random() - 0.5) * 100}px`,
                animationDelay: `${i * 30}ms`,
              } as React.CSSProperties}
            />
          ))}
        </div>
      )}
    </>
  );
};

