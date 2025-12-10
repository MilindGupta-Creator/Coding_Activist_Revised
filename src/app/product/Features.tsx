import React from 'react';
import { CodeIcon, ServerIcon, CpuIcon, CheckIcon } from './Icons';
import { Feature } from '@/app/types';

const features: Feature[] = [
  {
    title: "Advanced React & RSCs",
    description: "Move beyond `useEffect`. Master Composition, Server Components, and Suspense streaming boundaries.",
    iconPath: "react"
  },
  {
    title: "Frontend Architecture",
    description: "Design-to-code workflows, Micro-frontends, Monorepos, and managing state at scale (Zustand/Jotai).",
    iconPath: "system"
  },
  {
    title: "Performance Engineering",
    description: "Deep dive into Critical Rendering Path, Web Workers, WASM, and shaving milliseconds off TTI.",
    iconPath: "perf"
  },
  {
    title: "JS Runtime Internals",
    description: "V8 engine mechanics, Memory Management, Event Loop phases, and advanced closure patterns.",
    iconPath: "js"
  }
];

const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="relative border-2 border-dashed border-brand-300 rounded-[2.5rem] p-8 md:p-16 bg-gradient-to-br from-white to-brand-50/30 shadow-lg">
            {/* Decorative Corner Accents */}
            <div className="absolute -top-0.5 -left-0.5 w-8 h-8 border-t-2 border-l-2 border-brand-500 rounded-tl-2xl"></div>
            <div className="absolute -top-0.5 -right-0.5 w-8 h-8 border-t-2 border-r-2 border-brand-500 rounded-tr-2xl"></div>
            <div className="absolute -bottom-0.5 -left-0.5 w-8 h-8 border-b-2 border-l-2 border-brand-500 rounded-bl-2xl"></div>
            <div className="absolute -bottom-0.5 -right-0.5 w-8 h-8 border-b-2 border-r-2 border-brand-500 rounded-br-2xl"></div>

            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Don't Just Code. <span className="text-brand-600">Engineer.</span></h2>
                <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
                    Most courses teach syntax. We teach <span className="text-slate-900 font-semibold">architecture</span>. The exact skills required to break the $200k barrier.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                {features.map((feature, idx) => (
                    <div key={idx} className="group bg-white border-2 border-slate-200 p-8 rounded-2xl hover:border-brand-400 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-500/10 hover:-translate-y-1">
                        <div className="w-12 h-12 bg-gradient-to-br from-brand-100 to-brand-50 rounded-lg flex items-center justify-center mb-6 border-2 border-brand-200 group-hover:border-brand-400 group-hover:bg-gradient-to-br group-hover:from-brand-200 group-hover:to-brand-100 text-brand-600 transition-all shadow-sm">
                            {feature.iconPath === 'js' && <CodeIcon className="w-5 h-5" />}
                            {feature.iconPath === 'react' && <CpuIcon className="w-5 h-5" />}
                            {feature.iconPath === 'system' && <ServerIcon className="w-5 h-5" />}
                            {feature.iconPath === 'perf' && <CheckIcon className="w-5 h-5" />}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand-600 transition-colors">{feature.title}</h3>
                        <p className="text-slate-600 leading-relaxed font-medium text-sm md:text-base">{feature.description}</p>
                    </div>
                ))}

                {/* FAANG Stats Card */}
                <div className="md:col-span-2 bg-gradient-to-r from-brand-500 via-brand-400 to-accent-500 border-2 border-brand-300 rounded-2xl p-4 sm:p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 md:gap-8 relative overflow-hidden group hover:shadow-2xl hover:shadow-brand-500/30 transition-all">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                    <div className="relative z-10 text-center md:text-left w-full md:w-auto">
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">The ROI is Massive</h3>
                        <p className="text-sm sm:text-base text-white/90 max-w-md mx-auto md:mx-0">
                            Our readers don't just pass interviews—they dictate terms. Join the elite 1% of frontend engineers.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-4 md:gap-8 relative z-10 justify-center w-full md:w-auto flex-wrap sm:flex-nowrap">
                        <div className="text-center min-w-[80px] sm:min-w-0">
                             <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">140%</div>
                             <div className="text-[9px] sm:text-[10px] md:text-xs text-white/80 uppercase tracking-wider font-semibold leading-tight">Avg. Salary Hike</div>
                        </div>
                        <div className="hidden sm:block w-px h-8 md:h-12 bg-white/30"></div>
                        <div className="text-center min-w-[80px] sm:min-w-0">
                             <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">Top 1%</div>
                             <div className="text-[9px] sm:text-[10px] md:text-xs text-white/80 uppercase tracking-wider font-semibold leading-tight">Offers Reached</div>
                        </div>
                        <div className="hidden sm:block w-px h-8 md:h-12 bg-white/30"></div>
                         <div className="text-center min-w-[80px] sm:min-w-0">
                             <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">12k+</div>
                             <div className="text-[9px] sm:text-[10px] md:text-xs text-white/80 uppercase tracking-wider font-semibold leading-tight">Developers Upgraded</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
};

export default Features;