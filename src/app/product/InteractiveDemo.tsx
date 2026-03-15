"use client";
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { 
  Play, Code, Layout, Shield, Monitor, MousePointer2, 
  Sparkles, Activity, Eye, Zap, Search, Globe, Lock,
  CheckCircle
} from 'lucide-react';

// --- Types ---
type SimulationStep = {
  time: number;
  x: number | string;
  y: number | string;
  action?: 'click' | 'hover' | 'type';
  text?: string;
  target?: string;
};

// --- Sub-Components ---

const TypingCode = ({ code, active }: { code: string; active: boolean }) => {
  const [displayedCode, setDisplayedCode] = useState("");
  
  useEffect(() => {
    if (!active) {
      setDisplayedCode("");
      return;
    }
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedCode(code.slice(0, i));
      i++;
      if (i > code.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [code, active]);

  return <code className="whitespace-pre-wrap">{displayedCode}</code>;
};

const Hotspot = ({ label, x, y, active }: { label: string; x: string; y: string; active: boolean }) => (
  <motion.div 
    initial={{ scale: 0, opacity: 0 }}
    animate={active ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
    className="absolute z-50 pointer-events-none"
    style={{ left: x, top: y }}
  >
    <div className="relative">
      <div className="absolute inset-0 w-4 h-4 bg-brand-500 rounded-full animate-ping opacity-75" />
      <div className="relative w-4 h-4 bg-brand-500 rounded-full border-2 border-white shadow-lg" />
      <div className="absolute left-6 top-1/2 -translate-y-1/2 whitespace-nowrap bg-slate-900/90 backdrop-blur-md text-white px-3 py-1.5 rounded-lg border border-white/10 text-[10px] font-bold shadow-2xl">
        <span className="text-brand-400 mr-1.5">💡</span> {label}
      </div>
    </div>
  </motion.div>
);

// --- Demo Data ---

const demos = [
  {
    id: 'reader',
    title: 'Smart Reader',
    label: 'Architecture',
    icon: Layout,
    color: 'from-blue-600 to-cyan-500',
    description: 'Master frontend architecture with interactive heatmaps, security sandboxes, and offline-first reading.',
    simulation: [
      { time: 0, x: '20%', y: '30%', action: 'hover', target: 'sidebar' },
      { time: 2000, x: '50%', y: '40%', action: 'click', target: 'heatmap' },
      { time: 4000, x: '70%', y: '60%', action: 'hover', target: 'security' },
    ],
    content: (active: boolean) => (
      <div className="flex h-full w-full bg-slate-950 overflow-hidden relative">
        <Hotspot active={active} label="FAANG Heatmap" x="45%" y="35%" />
        <Hotspot active={active} label="Anti-Piracy Watermark" x="70%" y="65%" />
        
        {/* Sidebar */}
        <div className="w-1/4 border-r border-white/5 bg-white/[0.02] backdrop-blur-sm p-4 space-y-4">
          <div className="h-4 w-3/4 bg-white/5 rounded-full animate-pulse" />
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className={`h-8 rounded-xl transition-all duration-500 ${i === 1 ? 'bg-blue-500/20 border border-blue-500/30' : 'bg-white/5'}`} />
            ))}
          </div>
          <div className="pt-4 border-t border-white/5">
             <div className="bg-blue-500/5 rounded-xl border border-blue-500/10 p-3">
                <div className="flex justify-between mb-2">
                   <div className="h-2 w-12 bg-blue-500/40 rounded" />
                   <div className="h-2 w-4 bg-blue-500/40 rounded" />
                </div>
                <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                   <motion.div 
                     animate={active ? { width: ['0%', '65%'] } : { width: '0%' }}
                     transition={{ duration: 2 }}
                     className="h-full bg-blue-500" 
                   />
                </div>
             </div>
          </div>
        </div>

        {/* Main Area */}
        <div className="flex-1 p-8 space-y-8">
           <div className="space-y-3">
              <div className="flex items-center gap-2">
                 <div className="h-5 w-5 rounded bg-blue-500/20 flex items-center justify-center text-[10px] text-blue-400 font-bold">Q1</div>
                 <div className="h-6 w-1/2 bg-white/10 rounded" />
              </div>
              <div className="h-4 w-full bg-white/5 rounded" />
              <div className="h-4 w-3/4 bg-white/5 rounded" />
           </div>

           {/* Code Block */}
           <div className="relative rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-6 font-mono text-xs overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-20">
                 <Zap className="w-12 h-12 text-blue-500" />
              </div>
              <div className="flex gap-2 mb-4">
                 <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                 <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                 <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
              </div>
              <div className="text-blue-300/90 leading-relaxed">
                 <TypingCode active={active} code={`// Advanced Event Loop Concept\nconst scheduler = async () => {\n  console.log("Start task");\n  await Promise.resolve();\n  console.log("End task (Microtask)");\n};`} />
              </div>
              {/* Dynamic Heatmap Overlay */}
              <motion.div 
                animate={active ? { opacity: [0, 0.1, 0] } : { opacity: 0 }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-red-500/20 to-transparent pointer-events-none"
              />
           </div>
        </div>
      </div>
    )
  },
  {
    id: 'labs',
    title: 'Machine Coding',
    label: 'Engineering',
    icon: Code,
    color: 'from-violet-400 to-purple-200',
    description: 'Build FAANG-scale UI components like Infinite Scroll, Virtualized Lists, and Real-time Dashboards.',
    simulation: [
      { time: 0, x: '40%', y: '30%', action: 'type', text: 'reorder' },
      { time: 2500, x: '80%', y: '40%', action: 'hover', target: 'tests' },
      { time: 4500, x: '80%', y: '60%', action: 'click', target: 'run' },
    ],
    content: (active: boolean) => (
      <div className="h-full w-full bg-[#0a0c10] flex flex-col relative">
         <Hotspot active={active} label="Automated UI Testing" x="75%" y="30%" />
         <Hotspot active={active} label="Real-time Compilation" x="35%" y="60%" />

         <div className="h-12 border-b border-white/5 bg-white/[0.03] flex items-center justify-between px-6">
            <div className="flex items-center gap-6">
               <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
                  <span className="text-[10px] font-mono text-slate-400">virtual_list.tsx</span>
               </div>
               <div className="h-4 w-px bg-white/10" />
               <div className="flex gap-4">
                  <div className="h-1 w-8 bg-violet-500 rounded-full" />
                  <div className="h-1 w-8 bg-white/10 rounded-full" />
               </div>
            </div>
            <div className="flex items-center gap-3">
               <div className="px-2 py-1 rounded bg-red-500/10 text-red-400 text-[9px] font-bold border border-red-500/20 uppercase tracking-tighter">Hard</div>
               <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                  <Activity className="w-4 h-4 text-slate-500" />
               </div>
            </div>
         </div>

         <div className="flex-1 flex overflow-hidden">
            <div className="w-3/5 p-6 font-mono text-[11px] text-blue-300 leading-relaxed">
               <div className="text-slate-500 mb-2">// TODO: Implement windowing logic</div>
               <TypingCode active={active} code={`export const VirtualList = ({ items }) => {\n  const [visibleRange, setRange] = useState([0, 10]);\n  \n  const onScroll = useCallback((e) => {\n    const { scrollTop } = e.currentTarget;\n    const start = Math.floor(scrollTop / ITEM_HEIGHT);\n    setRange([start, start + 10]);\n  }, []);\n\n  return <div onScroll={onScroll}>...</div>;\n};`} />
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={active ? { opacity: 1 } : { opacity: 0 }}
                 className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold"
               >
                  <CheckCircle className="w-3 h-3" /> Syntax valid
               </motion.div>
            </div>

            <div className="w-2/5 border-l border-white/5 bg-black/40 backdrop-blur-md p-6">
               <div className="flex items-center justify-between mb-6">
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Test Suite</span>
                  <div className="flex gap-1">
                     <span className="w-1 h-1 rounded-full bg-emerald-500" />
                     <span className="w-1 h-1 rounded-full bg-emerald-500" />
                     <span className="w-1 h-1 rounded-full bg-slate-700" />
                  </div>
               </div>
               <div className="space-y-4">
                  {[
                    { label: 'Calculates start index', delay: 1 },
                    { label: 'Handles rapid scrolling', delay: 2 },
                    { label: 'Memory leak check', delay: 3, pending: true },
                  ].map((test, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      animate={active ? { opacity: 1, x: 0 } : { opacity: 0 }}
                      transition={{ delay: test.delay }}
                      className="flex items-center gap-3 p-2 rounded-lg bg-white/[0.02] border border-white/5"
                    >
                       <div className={`w-2 h-2 rounded-full ${test.pending ? 'bg-slate-700' : 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]'}`} />
                       <span className={`text-[10px] font-medium ${test.pending ? 'text-slate-500' : 'text-slate-300'}`}>{test.label}</span>
                    </motion.div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    )
  },
  {
    id: 'css',
    title: 'CSS Battle',
    label: 'Creativity',
    icon: Sparkles,
    color: 'from-pink-400 to-rose-200',
    description: 'Master CSS Golf and visual perfection. Our engine compares your code to the target with sub-pixel precision.',
    simulation: [
      { time: 0, x: '20%', y: '40%', action: 'type', text: 'border-radius: 50%' },
      { time: 3000, x: '50%', y: '50%', action: 'hover', target: 'diff' },
      { time: 5000, x: '50%', y: '80%', action: 'click', target: 'submit' },
    ],
    content: (active: boolean) => (
      <div className="h-full w-full bg-[#12141a] flex flex-col p-6 relative">
         <Hotspot active={active} label="Pixel Diffing Engine" x="50%" y="30%" />
         
         <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-lg shadow-pink-500/20">
                  <Sparkles className="w-5 h-5 text-white" />
               </div>
               <div>
                  <div className="text-[10px] font-black text-pink-500 uppercase tracking-widest">Level 12</div>
                  <h4 className="text-sm font-bold text-white">The Yin Yang Chamber</h4>
               </div>
            </div>
            <div className="flex items-center gap-4">
               <div className="text-right">
                  <div className="text-[9px] text-slate-500 uppercase">Current Score</div>
                  <div className="text-xs font-mono text-white">99.85 pts</div>
               </div>
               <div className="h-8 w-px bg-white/10" />
               <div className="bg-slate-800/50 rounded-lg px-3 py-1 border border-white/5">
                  <span className="text-[10px] text-slate-400 font-mono">152 chars</span>
               </div>
            </div>
         </div>

         <div className="flex-1 flex gap-8">
            <div className="flex-1 flex flex-col gap-4">
               <div className="flex-1 rounded-2xl bg-[#0a0a0a] border border-white/5 flex flex-col items-center justify-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(219,39,119,0.05)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="w-32 h-32 rounded-full relative overflow-hidden shadow-2xl" style={{ background: 'linear-gradient(to right, #000 50%, #fff 50%)', boxShadow: '0 0 0 2px #000' }}>
                     <div className="absolute w-16 h-16 rounded-full bg-black top-0 left-1/2 -translate-x-1/2" />
                     <div className="absolute w-16 h-16 rounded-full bg-white bottom-0 left-1/2 -translate-x-1/2" />
                     <div className="absolute w-4 h-4 rounded-full bg-white top-[24px] left-1/2 -translate-x-1/2 shadow-inner" />
                     <div className="absolute w-4 h-4 rounded-full bg-black bottom-[24px] left-1/2 -translate-x-1/2 shadow-inner" />
                  </div>
                  <div className="mt-4 text-[9px] text-slate-500 font-black uppercase tracking-widest">Target Reference</div>
               </div>
            </div>

            <div className="flex-1 rounded-2xl bg-[#0a0a0a] border border-pink-500/30 flex flex-col items-center justify-center relative overflow-hidden">
               <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-pink-500 to-rose-500 opacity-50" />
               <motion.div 
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={active ? { opacity: 1, scale: 1 } : { opacity: 0 }}
                 className="w-32 h-32 rounded-full relative overflow-hidden" 
                 style={{ background: 'linear-gradient(to right, #000 50%, #fff 50%)', boxShadow: '0 0 0 2px #000' }}
               >
                  <div className="absolute w-16 h-16 rounded-full bg-black top-0 left-1/2 -translate-x-1/2" />
                  <div className="absolute w-16 h-16 rounded-full bg-white bottom-0 left-1/2 -translate-x-1/2" />
                  <motion.div 
                    animate={active ? { opacity: [0, 1] } : { opacity: 0 }}
                    transition={{ delay: 1.5 }}
                    className="absolute w-4 h-4 rounded-full bg-white top-[24px] left-1/2 -translate-x-1/2" 
                  />
                  <motion.div 
                    animate={active ? { opacity: [0, 1] } : { opacity: 0 }}
                    transition={{ delay: 2 }}
                    className="absolute w-4 h-4 rounded-full bg-black bottom-[24px] left-1/2 -translate-x-1/2" 
                  />
               </motion.div>
               <motion.div 
                 animate={active ? { y: 0 } : { y: 40 }}
                 transition={{ delay: 2.5, type: 'spring' }}
                 className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-r from-pink-600 to-rose-600 flex items-center justify-center"
               >
                  <div className="flex items-center gap-2">
                     <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                     <span className="text-[11px] font-black text-white italic tracking-tighter uppercase">Match: 100.0% Perfect!</span>
                  </div>
               </motion.div>
            </div>
         </div>
      </div>
    )
  }
];

const InteractiveDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [cursorPos, setCursorPos] = useState({ x: '50%', y: '50%' });
  const [isClicking, setIsClicking] = useState(false);

  // --- Simulation Logic ---
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timeline = demos[activeTab].simulation;
    const timeouts: NodeJS.Timeout[] = [];

    timeline.forEach(step => {
      const t = setTimeout(() => {
        setCursorPos({ x: step.x as string, y: step.y as string });
        if (step.action === 'click') {
          setIsClicking(true);
          setTimeout(() => setIsClicking(false), 200);
        }
      }, step.time);
      timeouts.push(t);
    });

    const nextTabTimeout = setTimeout(() => {
      setActiveTab((prev) => (prev + 1) % demos.length);
    }, 6000);
    timeouts.push(nextTabTimeout);

    return () => timeouts.forEach(clearTimeout);
  }, [activeTab, isAutoPlaying]);

  return (
    <section className="py-14 bg-white relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-500/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-900 border border-white/10 mb-8"
          >
            <Sparkles className="w-4 h-4 text-brand-400" />
            <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">The Future of Interview Prep</span>
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-medium text-slate-900 mb-6 tracking-tighter leading-[0.95]">
            Engineering Mastery<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-violet-600 to-purple-600">Starts Here.</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
            Experience the world's most advanced frontend learning environment. Real code, real challenges, real results.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Enhanced Control Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {demos.map((demo, idx) => (
              <button
                key={demo.id}
                onClick={() => {
                  setActiveTab(idx);
                  setIsAutoPlaying(false);
                }}
                className={`w-full text-left p-1 group relative rounded-[2.5rem] transition-all duration-500 ${
                  activeTab === idx ? 'scale-105' : 'hover:scale-102 opacity-60 grayscale hover:grayscale-0 hover:opacity-100'
                }`}
              >
                <div className={`absolute inset-0 rounded-[2.5rem] bg-gradient-to-br ${demo.color} opacity-0 transition-opacity duration-500 ${activeTab === idx ? 'opacity-100' : ''}`} />
                <div className="relative h-full w-full bg-white rounded-[2.45rem] p-6 m-px overflow-hidden">
                   {activeTab === idx && (
                     <motion.div 
                       layoutId="active-tab-glow"
                       className={`absolute inset-0 bg-gradient-to-br ${demo.color} opacity-5`}
                     />
                   )}
                   <div className="flex items-start gap-5 relative z-10">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-700 shadow-2xl ${
                        activeTab === idx ? `bg-gradient-to-br ${demo.color} text-white rotate-6 scale-110` : 'bg-slate-50 text-slate-400'
                      }`}>
                         <demo.icon className="w-7 h-7" />
                      </div>
                      <div className="flex-1">
                         <div className="flex items-center justify-between mb-1.5">
                            <span className={`text-[10px] font-black uppercase tracking-widest ${activeTab === idx ? 'text-slate-900' : 'text-slate-400'}`}>
                               {demo.label}
                            </span>
                            {activeTab === idx && <div className="flex gap-1"><span className="w-1 h-1 rounded-full bg-brand-500 animate-bounce" /><span className="w-1 h-1 rounded-full bg-brand-500 animate-bounce [animation-delay:0.1s]" /></div>}
                         </div>
                         <h3 className={`text-2xl font-black tracking-tight transition-colors ${activeTab === idx ? 'text-slate-900' : 'text-slate-400'}`}>
                            {demo.title}
                         </h3>
                         <p className={`text-sm mt-3 leading-relaxed transition-all duration-500 ${activeTab === idx ? 'text-slate-600 opacity-100' : 'text-slate-400 opacity-0 h-0 overflow-hidden'}`}>
                            {demo.description}
                         </p>
                      </div>
                   </div>
                </div>
              </button>
            ))}
          </div>

          {/* Advanced Browser Showcase */}
          <div className="lg:col-span-8">
            <div className="relative group">
              {/* Outer Glow */}
              <motion.div 
                animate={{ 
                  boxShadow: activeTab === 0 ? '0 0 100px rgba(14,165,233,0.1)' : 
                            activeTab === 1 ? '0 0 100px rgba(139,92,246,0.1)' : 
                            '0 0 100px rgba(219,39,119,0.1)' 
                }}
                className="absolute -inset-4 rounded-[3.5rem] bg-slate-950 transition-all duration-1000" 
              />
              
              <div className="relative bg-slate-950 rounded-[3rem] border-[6px] border-slate-900 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden aspect-[16/10] md:aspect-[16/9]">
                {/* Modern Browser Header */}
                <div className="h-14 bg-slate-900/80 backdrop-blur-xl border-b border-white/5 flex items-center px-8 justify-between relative z-20">
                  <div className="flex gap-2.5">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#FF5F57] shadow-inner" />
                    <div className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] shadow-inner" />
                    <div className="w-3.5 h-3.5 rounded-full bg-[#28C840] shadow-inner" />
                  </div>
                  
                  <div className="flex-1 flex justify-center max-w-xl px-12">
                     <div className="w-full h-8 bg-black/40 rounded-xl border border-white/5 flex items-center px-4 gap-3">
                        <Lock className="w-3 h-3 text-emerald-500" />
                        <span className="text-[10px] font-mono text-slate-500 select-none truncate">
                           codingactivist.com/v2/reader/{demos[activeTab].id}
                        </span>
                        <div className="ml-auto w-4 h-4 rounded-full bg-white/5 flex items-center justify-center">
                           <Search className="w-2.5 h-2.5 text-slate-600" />
                        </div>
                     </div>
                  </div>

                  <div className="flex items-center gap-4">
                     <div className="flex -space-x-2">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="w-7 h-7 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center overflow-hidden">
                             <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" className="w-full h-full object-cover" />
                          </div>
                        ))}
                     </div>
                  </div>
                </div>

                {/* Simulated Content Area */}
                <div className="relative h-full w-full pt-0">
                   <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
                        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                        className="h-full w-full"
                      >
                         {demos[activeTab].content(activeTab === activeTab)}
                      </motion.div>
                   </AnimatePresence>

                   {/* Deterministic Cursor Simulation */}
                   <motion.div
                     animate={{ 
                       left: cursorPos.x,
                       top: cursorPos.y,
                       scale: isClicking ? 0.8 : 1
                     }}
                     transition={{ duration: 1, ease: "easeInOut" }}
                     className="absolute pointer-events-none z-[100] text-white"
                   >
                     <div className="relative">
                        <MousePointer2 className="w-8 h-8 drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)] fill-brand-500 stroke-white stroke-[1.5px]" />
                        {isClicking && (
                          <motion.div 
                            initial={{ scale: 0, opacity: 1 }}
                            animate={{ scale: 3, opacity: 0 }}
                            className="absolute inset-0 bg-brand-500 rounded-full"
                          />
                        )}
                     </div>
                   </motion.div>

                   {/* Auto-play status bar */}
                   <div className="absolute bottom-0 inset-x-0 h-1.5 bg-black/40 backdrop-blur-md">
                      {isAutoPlaying && (
                        <motion.div 
                          key={activeTab}
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 7, ease: "linear" }}
                          className={`h-full bg-gradient-to-r ${demos[activeTab].color}`}
                        />
                      )}
                   </div>
                </div>
              </div>

              {/* Advanced Floating Labels */}
              <div className="absolute top-24 -left-22 space-y-3 hidden xl:block">
                 {[
                   { icon: Monitor, label: 'Pixel Perfect' },
                   { icon: Shield, label: 'Secure DRM' },
                   { icon: Zap, label: 'Live Exec' }
                 ].map((badge, i) => (
                   <motion.div 
                     key={i}
                     initial={{ x: -50, opacity: 0 }}
                     whileInView={{ x: 0, opacity: 1 }}
                     transition={{ delay: i * 0.1 }}
                     className="bg-white/80 backdrop-blur-md border border-slate-200 p-3 rounded-2xl shadow-xl flex items-center gap-3"
                   >
                      <div className="w-6 h-6 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                         <badge.icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{badge.label}</span>
                   </motion.div>
                 ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveDemo;
