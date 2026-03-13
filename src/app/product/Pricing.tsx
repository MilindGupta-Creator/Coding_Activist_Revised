import React from 'react';
import { CheckIcon, StarIcon } from './Icons';

const Pricing: React.FC = () => {
  return (
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
             <div className="flex justify-center mb-4">
               {[1,2,3,4,5].map(i => <StarIcon key={i} className="w-5 h-5 text-yellow-400" />)}
             </div>
             <h3 className="text-2xl font-semibold text-white mb-2">The Ultimate Guide (Vol 2)</h3>
             <div className="flex items-baseline justify-center gap-2 mb-6">
                <span className="text-5xl font-bold text-white">₹449</span>
                <span className="text-xl text-slate-500 line-through">₹1999</span>
             </div>
             <button className="w-full py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-bold text-lg shadow-lg shadow-brand-500/25 transition-all transform hover:scale-[1.02]">
               Instantly Upgrade My Career
             </button>
             <p className="mt-4 text-xs text-slate-500">Includes lifetime updates for Next.js 15+</p>
          </div>
          
          <div className="p-8 md:p-12 bg-slate-800/50">
            <h4 className="text-white font-medium mb-6 uppercase tracking-wider text-sm">Everything Inside:</h4>
            <ul className="space-y-4">
              {[
                "Next.js 14 App Router Deep Dive",
                "Advanced React Server Components",
                "Machine Coding: Kanban Board, Infinite Feed",
                "System Design: Designing WhatsApp Web",
                "Tailwind UI & Design-to-Code Workflow",
                "Bonus: Resume Review Checklist"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-300">
                  <CheckIcon className="w-5 h-5 text-brand-400 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;