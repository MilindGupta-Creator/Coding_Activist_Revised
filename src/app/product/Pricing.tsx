import React from 'react';
import { CheckIcon, StarIcon } from './Icons';
import CountdownTimer from './CountdownTimer';

const Pricing: React.FC = () => {
  const handlePurchase = () => {
    window.open('https://dodo.pe/ic4vo842tzb', '_blank');
  };

  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-white to-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-semibold text-slate-900 mb-4">Invest in Your Career</h2>
          <p className="text-slate-600">The price of a few coffees. The ROI of a Staff Engineer's salary.</p>
        </div>

        <div className="max-w-lg mx-auto bg-white rounded-3xl overflow-hidden shadow-2xl border-2 border-brand-200 relative">
          
          <div className="absolute top-0 right-0 bg-gradient-to-r from-brand-600 to-accent-600 text-white flex flex-col items-center px-4 py-2 rounded-bl-xl shadow-lg border-l border-b border-brand-400/30">
            <div className="text-[9px] font-black tracking-widest uppercase mb-1.5 opacity-90">Limited Offer Ends In</div>
            <CountdownTimer />
          </div>

          <div className="p-8 md:p-12 text-center border-b border-slate-200 bg-gradient-to-br from-white to-brand-50/30">
             <div className="flex justify-center mb-4">
               {[1,2,3,4,5].map(i => <StarIcon key={i} className="w-5 h-5 text-yellow-400" />)}
             </div>
             <h3 className="text-2xl font-medium text-slate-900 mb-2">The Ultimate Guide (Vol 2)</h3>
             <div className="flex items-baseline justify-center gap-2 mb-6">
                <span className="text-5xl font-semibold bg-gradient-to-r from-brand-600 to-accent-600 bg-clip-text text-transparent">₹449</span>
                <span className="text-xl text-slate-400 line-through">₹1999</span>
             </div>
             <button 
               onClick={handlePurchase}
               className="w-full py-4 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white rounded-xl font-semibold text-lg shadow-lg shadow-black/15 transition-all transform hover:scale-[1.02] hover:shadow-xl"
             >
               Instantly Upgrade My Career
             </button>
             <p className="mt-4 text-xs text-slate-500">Includes lifetime updates for Next.js 15+</p>
          </div>
          
          <div className="p-8 md:p-12 bg-gradient-to-br from-slate-50 to-white">
            <h4 className="text-slate-900 font-medium mb-6 uppercase tracking-wider text-sm">Everything Inside:</h4>
            <ul className="space-y-4 text-left">
              {[
                "Next.js 14 App Router Deep Dive",
                "Advanced React Server Components",
                "Machine Coding: Kanban Board, Infinite Feed",
                "System Design: Designing WhatsApp Web",
                { text: "Web Security: XSS Deep Dive", badge: "NEW" },
                "Bonus: Resume Review Checklist"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-700">
                  <CheckIcon className="w-5 h-5 text-brand-500 shrink-0" />
                  <span className="flex items-center gap-2">
                    {typeof item === 'string' ? item : (
                      <>
                        {item.text}
                        <span className="px-1.5 py-0.5 text-[9px] font-bold bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full">
                          {item.badge}
                        </span>
                      </>
                    )}
                  </span>
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