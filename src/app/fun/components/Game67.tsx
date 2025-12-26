"use client";

import React, { useRef } from 'react';
import { useChaosMode } from './useChaosMode';
import { ChaosOverlay } from './ChaosOverlay';

interface Game67Props {
  className?: string;
}

const Game67: React.FC<Game67Props> = ({ className = '' }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { triggerChaos, isExploding, crackBurst, showConfetti, clickCount } = useChaosMode();

  const getConfettiPosition = () => {
    if (typeof window !== 'undefined' && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
    }
    return { x: 0, y: 0 };
  };

  return (
    <>
      <ChaosOverlay 
        isExploding={isExploding}
        crackBurst={crackBurst}
        showConfetti={showConfetti}
        confettiPosition={getConfettiPosition()}
      />

      {/* Game Card */}
      <div className={`relative group ${className}`}>
        <div className="absolute -inset-2 bg-gradient-to-r from-red-500 via-orange-500 to-red-600 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity animate-pulse" />
        <div className="relative p-6 bg-slate-900/80 border border-slate-700/50 rounded-xl backdrop-blur-sm flex flex-col items-center">
          
          {/* Button */}
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-xl blur-md opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
            
            <button
              ref={buttonRef}
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

          </div>

          <h3 className="text-lg font-bold text-slate-300 mt-4">67</h3>
          <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-red-500/20 text-red-400 rounded-full animate-pulse">
            ⚠️ CHAOS
          </span>
        </div>
      </div>
    </>
  );
};

export default Game67;

