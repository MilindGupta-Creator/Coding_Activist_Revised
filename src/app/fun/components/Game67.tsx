"use client";

import React, { useState } from 'react';

interface Game67Props {
  className?: string;
}

const Game67: React.FC<Game67Props> = ({ className = '' }) => {
  const [clickCount, setClickCount] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isExploding, setIsExploding] = useState(false);
  const [crackBurst, setCrackBurst] = useState(false);

  const triggerChaos = () => {
    // CHAOS MODE - Apply multiple effects for maximum impact
    const html = document.documentElement;
    
    // Add all the chaos classes
    html.classList.add('chaos-mode');
    setIsExploding(true);
    setCrackBurst(true);
    setClickCount(prev => prev + 1);
    
    // Show confetti on milestones
    if ((clickCount + 1) % 10 === 0) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1500);
    }
    
    // Remove after the mayhem
    setTimeout(() => setCrackBurst(false), 1200);
    
    setTimeout(() => {
      html.classList.remove('chaos-mode');
      setIsExploding(false);
    }, 800);
  };

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

      {/* Game Card */}
      <div className={`relative group ${className}`}>
        <div className="absolute -inset-2 bg-gradient-to-r from-red-500 via-orange-500 to-red-600 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity animate-pulse" />
        <div className="relative p-6 bg-slate-900/80 border border-slate-700/50 rounded-xl backdrop-blur-sm flex flex-col items-center">
          
          {/* Button */}
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-xl blur-md opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
            
            <button
              onClick={triggerChaos}
              className="relative px-6 py-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-amber-500/30 hover:border-amber-400/60 rounded-xl shadow-lg shadow-amber-500/10 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-amber-500/10 to-transparent" />
              
              <div className="relative flex items-center gap-3">
                <span className="text-3xl font-black bg-gradient-to-br from-amber-300 via-orange-400 to-red-400 bg-clip-text text-transparent select-none">
                  67
                </span>
                
                <div className="px-2 py-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full text-white text-xs font-bold">
                  {clickCount}
                </div>
              </div>
            </button>

            {/* Confetti burst effect */}
            {showConfetti && (
              <div className="absolute inset-0 pointer-events-none overflow-visible">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full animate-confetti"
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
          </div>

          <h3 className="text-lg font-bold text-slate-300 mt-4">67</h3>
          <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-red-500/20 text-red-400 rounded-full animate-pulse">
            ⚠️ CHAOS
          </span>
        </div>
      </div>

      {/* Chaos Mode CSS */}
      <style jsx global>{`
        /* ========== EARTHQUAKE SHAKE ========== */
        @keyframes earthquake {
          0% { transform: translate(0, 0) rotate(0deg) scale(1); }
          5% { transform: translate(-25px, -15px) rotate(-3deg) scale(1.02); }
          10% { transform: translate(20px, 10px) rotate(2.5deg) scale(0.98); }
          15% { transform: translate(-15px, 20px) rotate(-2deg) scale(1.01); }
          20% { transform: translate(25px, -10px) rotate(3deg) scale(0.99); }
          25% { transform: translate(-20px, 5px) rotate(-2.5deg) scale(1.02); }
          30% { transform: translate(15px, -20px) rotate(2deg) scale(0.98); }
          35% { transform: translate(-10px, 15px) rotate(-1.5deg) scale(1.01); }
          40% { transform: translate(20px, -5px) rotate(2deg) scale(1); }
          45% { transform: translate(-15px, 10px) rotate(-1deg) scale(1.01); }
          50% { transform: translate(10px, -15px) rotate(1.5deg) scale(0.99); }
          55% { transform: translate(-8px, 8px) rotate(-1deg) scale(1); }
          60% { transform: translate(12px, -8px) rotate(1deg) scale(1); }
          65% { transform: translate(-6px, 6px) rotate(-0.5deg) scale(1); }
          70% { transform: translate(8px, -4px) rotate(0.8deg) scale(1); }
          75% { transform: translate(-4px, 4px) rotate(-0.3deg) scale(1); }
          80% { transform: translate(4px, -2px) rotate(0.3deg) scale(1); }
          85% { transform: translate(-2px, 2px) rotate(-0.2deg) scale(1); }
          90% { transform: translate(2px, -1px) rotate(0.1deg) scale(1); }
          95% { transform: translate(-1px, 1px) rotate(0deg) scale(1); }
          100% { transform: translate(0, 0) rotate(0deg) scale(1); }
        }

        /* ========== DANGER FLASH ========== */
        @keyframes danger-flash {
          0% { opacity: 0; }
          5% { opacity: 0.6; }
          10% { opacity: 0; }
          15% { opacity: 0.4; }
          20% { opacity: 0; }
          30% { opacity: 0.3; }
          40% { opacity: 0; }
          50% { opacity: 0.2; }
          60% { opacity: 0; }
          100% { opacity: 0; }
        }

        .animate-danger-flash {
          animation: danger-flash 0.8s ease-out forwards;
        }

        /* ========== RGB SPLIT / CHROMATIC ABERRATION ========== */
        @keyframes rgb-split-left {
          0% { transform: translateX(0); opacity: 0; }
          10% { transform: translateX(-15px); opacity: 0.8; }
          20% { transform: translateX(10px); opacity: 0.6; }
          30% { transform: translateX(-8px); opacity: 0.4; }
          50% { transform: translateX(5px); opacity: 0.3; }
          70% { transform: translateX(-3px); opacity: 0.2; }
          100% { transform: translateX(0); opacity: 0; }
        }

        @keyframes rgb-split-right {
          0% { transform: translateX(0); opacity: 0; }
          10% { transform: translateX(15px); opacity: 0.8; }
          20% { transform: translateX(-10px); opacity: 0.6; }
          30% { transform: translateX(8px); opacity: 0.4; }
          50% { transform: translateX(-5px); opacity: 0.3; }
          70% { transform: translateX(3px); opacity: 0.2; }
          100% { transform: translateX(0); opacity: 0; }
        }

        .animate-rgb-split-left {
          animation: rgb-split-left 0.8s ease-out forwards;
        }

        .animate-rgb-split-right {
          animation: rgb-split-right 0.8s ease-out forwards;
        }

        /* ========== SCANLINES GLITCH ========== */
        @keyframes scanlines {
          0% { transform: translateY(0); }
          100% { transform: translateY(4px); }
        }

        .animate-scanlines {
          animation: scanlines 0.1s linear infinite;
        }

        /* ========== CHAOS MODE - APPLY TO HTML ========== */
        html.chaos-mode {
          animation: earthquake 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
        }

        /* Invert colors rapidly for extra chaos */
        html.chaos-mode::before {
          content: '';
          position: fixed;
          inset: 0;
          background: white;
          mix-blend-mode: difference;
          pointer-events: none;
          z-index: 99999;
          animation: invert-flash 0.8s ease-out forwards;
        }

        @keyframes invert-flash {
          0% { opacity: 0; }
          8% { opacity: 1; }
          12% { opacity: 0; }
          25% { opacity: 0.5; }
          30% { opacity: 0; }
          100% { opacity: 0; }
        }

        /* ========== CONFETTI ========== */
        @keyframes confetti {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translate(
              calc(-50% + var(--confetti-x)),
              calc(-50% + var(--confetti-y))
            ) scale(1);
            opacity: 0;
          }
        }

        .animate-confetti {
          animation: confetti 0.8s ease-out forwards;
        }

        /* ========== SCREEN CRACK ========== */
        @keyframes crack-appear {
          0% { opacity: 0; transform: scale(0.92); }
          35% { opacity: 0.95; transform: scale(1.02); }
          65% { opacity: 0.7; transform: scale(1.03); }
          100% { opacity: 0; transform: scale(1.05); }
        }

        .animate-crack-appear {
          animation: crack-appear 1s ease-out forwards;
        }

        @keyframes glass-fall {
          0% {
            opacity: 0;
            transform: translate3d(0, 0, 0) rotate(0deg);
          }
          15% {
            opacity: 0.9;
          }
          100% {
            opacity: 0;
            transform: translate3d(var(--glass-x, 0), 200px, 0) rotate(15deg);
          }
        }

        .animate-glass-fall {
          animation: glass-fall 1s ease-in forwards;
        }

        /* ========== NOISE / TEAR / BLUR PULSE ========== */
        @keyframes static-noise {
          0% { transform: translate3d(0,0,0); opacity: 0.2; }
          20% { transform: translate3d(-3px,2px,0); opacity: 0.4; }
          40% { transform: translate3d(2px,-2px,0); opacity: 0.35; }
          60% { transform: translate3d(-2px,1px,0); opacity: 0.45; }
          80% { transform: translate3d(1px,-3px,0); opacity: 0.3; }
          100% { transform: translate3d(0,0,0); opacity: 0.25; }
        }

        .animate-static-noise {
          animation: static-noise 0.35s steps(2) infinite;
        }

        @keyframes tear {
          0% { transform: translateY(-10%); }
          100% { transform: translateY(110%); }
        }

        .animate-tear {
          animation: tear 0.6s linear infinite;
          mix-blend-mode: screen;
        }

        @keyframes blur-pulse {
          0% { opacity: 0; }
          25% { opacity: 0.35; filter: blur(1.5px); }
          50% { opacity: 0.1; filter: blur(0.5px); }
          75% { opacity: 0.25; filter: blur(1px); }
          100% { opacity: 0; filter: blur(0px); }
        }

        .animate-blur-pulse {
          animation: blur-pulse 0.8s ease-in-out forwards;
        }

        /* Pump contrast/saturation briefly in chaos mode */
        html.chaos-mode {
          filter: contrast(1.15) saturate(1.2);
        }
      `}</style>
    </>
  );
};

export default Game67;

