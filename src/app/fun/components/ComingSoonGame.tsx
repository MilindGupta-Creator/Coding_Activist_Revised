"use client";

import React from 'react';

type ComingSoonGameProps = {
  name: string;
  emoji: string;
  color: string; // e.g. "from-blue-500 to-cyan-500"
};

const ComingSoonGame: React.FC<ComingSoonGameProps> = ({ name, emoji, color }) => {
  return (
    <div className="relative group">
      <div className={`absolute -inset-2 bg-gradient-to-br ${color} opacity-25 blur-lg transition-opacity group-hover:opacity-50`} />
      <div className="relative p-6 bg-slate-900/70 border border-slate-800/70 rounded-xl backdrop-blur-sm flex flex-col items-center gap-3 text-center shadow-lg shadow-black/30">
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white/5 border border-white/10 text-2xl">
          {emoji}
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-white">{name}</h3>
          <span className="text-xs text-slate-400">Coming soon</span>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-200">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>In progress</span>
        </div>

        <div className={`absolute inset-[2px] rounded-[10px] bg-gradient-to-br ${color} opacity-0 group-hover:opacity-15 transition-opacity`} />
      </div>
    </div>
  );
};

export default ComingSoonGame;

