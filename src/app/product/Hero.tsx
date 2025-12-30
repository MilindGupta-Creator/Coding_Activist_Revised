"use client";

import React, { useState, useEffect, useRef } from 'react';
import dynamic from "next/dynamic";

const FloatingShapes = dynamic(
  () => import("@/components/three/FloatingShapes").then((m) => ({ default: m.FloatingShapes })),
  { ssr: false }
);

const CodeLine = ({ text, delay, color = "text-slate-300", indent = 0 }: { text: string, delay: number, color?: string, indent?: number }) => {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setStarted(false);
    
    const startTimer = setTimeout(() => {
      setStarted(true);
      let i = 0;
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i > text.length) {
          clearInterval(interval);
        }
      }, 30 + Math.random() * 30); // Random typing speed
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [text, delay]);

  return (
    <div className={`flex items-center h-6 font-mono text-xs md:text-[13px] ${color}`} style={{ paddingLeft: `${indent * 1.2}rem` }}>
      {displayed}
      {started && displayed.length < text.length && (
        <span className="animate-pulse ml-0.5 w-1.5 h-4 bg-brand-400 inline-block align-middle shadow-[0_0_8px_rgba(56,189,248,0.8)]"/>
      )}
    </div>
  );
};

type CodeSnippet = {
  fileName: string;
  language: string;
  status: string;
  lines: {
    text: string;
    delay: number;
    color: string;
    indent?: number;
    highlight?: boolean;
  }[];
};

const snippets: CodeSnippet[] = [
  {
    fileName: "ProductPage.tsx",
    language: "TypeScript",
    status: "Streaming",
    lines: [
      { text: "// Server Component", delay: 200, color: "text-slate-500" },
      { text: "async function Page() {", delay: 800, color: "text-purple-400" },
      { text: "const data = await db.query();", delay: 2000, color: "text-blue-400", indent: 1 },
      { text: "return (", delay: 3500, color: "text-slate-300", indent: 1 },
      { text: "<Suspense fallback={<Skel />}>", delay: 4500, color: "text-yellow-300", indent: 2, highlight: true },
      { text: "<StreamingList data={data} />", delay: 6000, color: "text-green-300", indent: 3, highlight: true },
      { text: "</Suspense>", delay: 7500, color: "text-yellow-300", indent: 2, highlight: true },
      { text: ");", delay: 8500, color: "text-slate-300", indent: 1 },
      { text: "}", delay: 9000, color: "text-purple-400" }
    ]
  },
  {
    fileName: "useDebounce.ts",
    language: "TypeScript",
    status: "Optimized",
    lines: [
      { text: "// Google Interview Question", delay: 200, color: "text-slate-500" },
      { text: "function useDebounce<T>(val: T, delay: number) {", delay: 800, color: "text-yellow-300" },
      { text: "const [state, setState] = useState(val);", delay: 2000, color: "text-blue-400", indent: 1 },
      { text: "useEffect(() => {", delay: 3500, color: "text-purple-400", indent: 1 },
      { text: "const handler = setTimeout(() => {", delay: 4500, color: "text-blue-300", indent: 2 },
      { text: "setState(val);", delay: 5500, color: "text-green-300", indent: 3, highlight: true },
      { text: "}, delay);", delay: 6500, color: "text-blue-300", indent: 2 },
      { text: "return () => clearTimeout(handler);", delay: 7500, color: "text-red-400", indent: 2, highlight: true },
      { text: "}, [val, delay]);", delay: 8500, color: "text-purple-400", indent: 1 },
      { text: "return state;", delay: 9000, color: "text-blue-400", indent: 1 },
      { text: "}", delay: 9500, color: "text-yellow-300" }
    ]
  },
  {
    fileName: "DataGrid.tsx",
    language: "TypeScript",
    status: "Virtualizing",
    lines: [
      { text: "// Micro-frontend / Enterprise", delay: 200, color: "text-slate-500" },
      { text: "const DataGrid = memo(({ items }) => {", delay: 800, color: "text-purple-400" },
      { text: "const rowVirtualizer = useVirtual({", delay: 2000, color: "text-blue-400", indent: 1 },
      { text: "size: items.length,", delay: 3000, color: "text-slate-300", indent: 2 },
      { text: "estimateSize: useCallback(() => 35, []),", delay: 5000, color: "text-yellow-300", indent: 2, highlight: true },
      { text: "});", delay: 6500, color: "text-blue-400", indent: 1 },
      { text: "return (", delay: 7500, color: "text-slate-300", indent: 1 },
      { text: "<div ref={parentRef}>", delay: 8000, color: "text-green-300", indent: 2 },
      { text: "{rowVirtualizer.virtualItems.map((row) => (", delay: 9000, color: "text-blue-300", indent: 3 },
      { text: "<Row key={row.index} data={items[row.index]} />", delay: 10000, color: "text-yellow-300", indent: 4 },
      { text: "))}</div>", delay: 11000, color: "text-green-300", indent: 2 }
    ]
  }
];

const Hero: React.FC = () => {
  const [snippetIndex, setSnippetIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const bookRef = useRef<HTMLDivElement>(null);
  
  const currentSnippet = snippets[snippetIndex];

  useEffect(() => {
    // Cycle through snippets every 12 seconds
    const timer = setInterval(() => {
      setSnippetIndex(prev => (prev + 1) % snippets.length);
    }, 12500); 

    // Observer for entrance animation
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (bookRef.current) {
      observer.observe(bookRef.current);
    }

    return () => {
      clearInterval(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative pt-32 pb-20 lg:pt-12 lg:pb-12 overflow-hidden bg-gradient-to-b from-white via-blue-50/30 to-white">
      {/* 3D Floating Shapes Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
        <FloatingShapes shapeCount={10} colors={["#3b82f6", "#8b5cf6", "#ec4899", "#10b981"]} />
      </div>
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand-400/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-400/30 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-brand-100 to-accent-100 border border-brand-200 text-brand-700 text-sm font-medium mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
              Includes Next.js 14 & Server Components
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
              Stop Building Average UIs. <br className="hidden lg:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-brand-500 to-accent-600">
                Architect Scalable Systems.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              The only playbook you need to master <strong className="text-slate-900">Design-to-Code</strong>, <strong className="text-slate-900">Micro-frontends</strong>, and <strong className="text-slate-900">Distributed State</strong>. Transform from a component builder to a Staff Engineer.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <button 
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white rounded-xl font-semibold text-lg transition-all shadow-xl shadow-brand-500/30 hover:shadow-2xl hover:shadow-brand-500/40 hover:-translate-y-1"
              >
                Get the Ebook ($29)
              </button>
              <button 
                onClick={() => document.getElementById('preview')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-200 rounded-xl font-semibold text-lg transition-all hover:border-brand-300 hover:shadow-lg"
              >
                Test Your Knowledge
              </button>
            </div>

            {/* Featured Question Card */}
            <div className="mt-8 p-6 bg-white backdrop-blur-md border-2 border-brand-200 rounded-xl max-w-lg mx-auto lg:mx-0 shadow-xl animate-fade-in hover:border-brand-400 hover:shadow-2xl transition-all group cursor-default">
              <div className="flex items-center justify-between mb-3">
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">L6 Interview Question</span>
                 </div>
                 <span className="text-[10px] font-mono bg-brand-100 text-brand-700 px-2 py-1 rounded border border-brand-200 group-hover:border-brand-400 group-hover:bg-brand-50 transition-colors">Staff Level • System Design</span>
              </div>
              <p className="text-slate-800 font-medium text-lg mb-4 leading-relaxed">
                "Design a resilient <span className="text-brand-600 font-semibold">server-driven UI</span> framework for a high-traffic e-commerce app that handles partial hydration and A/B testing at the edge."
              </p>
              <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
                 <span className="flex items-center gap-1">
                   <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></span>
                   Edge Computing
                 </span>
                 <span className="flex items-center gap-1">
                   <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                   Serialization
                 </span>
              </div>
            </div>
          </div>

          {/* Improved 3D Code Visual */}
          <div className="flex-1 flex justify-center perspective-[1500px] z-10" ref={bookRef}>
            <div className={`transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform ${isVisible ? 'opacity-100 translate-y-0 rotate-y-[-8deg] rotate-x-[5deg]' : 'opacity-0 translate-y-20 rotate-y-0'}`}>
              <div className="relative group animate-float">
                
                {/* Glow/Backlight */}
                <div className="absolute -inset-4 bg-brand-500/20 rounded-3xl blur-2xl group-hover:bg-brand-500/30 transition-all duration-500"></div>
                
                {/* Glassmorphism Card Container */}
                <div className="relative w-80 sm:w-96 rounded-xl overflow-hidden shadow-2xl border-2 border-slate-200 bg-white backdrop-blur-xl transform transition-transform duration-500 group-hover:scale-[1.02] group-hover:-translate-y-1">
                  
                  {/* Top Bar (IDE Style) */}
                  <div className="bg-gradient-to-r from-slate-100 to-slate-50 px-4 py-3 flex items-center justify-between border-b border-slate-200">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black/10"></div>
                      <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black/10"></div>
                      <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-black/10"></div>
                    </div>
                    <div className="text-[10px] font-mono text-slate-600 bg-white px-3 py-1 rounded-full border border-slate-200 flex items-center gap-2 shadow-sm">
                       <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse"></span>
                       {currentSnippet.fileName}
                    </div>
                  </div>

                  {/* Code Editor Body */}
                  <div className="p-6 bg-[#0f172a] relative min-h-[400px]">
                    {/* Background Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                    
                    {/* Code Content */}
                    <div className="relative z-10 space-y-2 font-mono text-sm leading-relaxed min-h-[300px]">
                        {currentSnippet.lines.map((line, idx) => {
                          // Determine if this line should have the background highlight effect
                          // We render the background separately to not interfere with text
                          return (
                            <div key={`${snippetIndex}-${idx}`} className="relative">
                              {line.highlight && (
                                <div 
                                  className="absolute inset-y-0 -left-6 -right-6 bg-brand-500/5 border-l-2 border-brand-500/50 opacity-0"
                                  style={{ animation: `fadeIn 0.5s forwards ${line.delay}ms` }}
                                ></div>
                              )}
                              <CodeLine 
                                text={line.text} 
                                delay={line.delay} 
                                color={line.color} 
                                indent={line.indent} 
                              />
                            </div>
                          );
                        })}
                    </div>

                    {/* Footer Status */}
                    <div className="absolute bottom-0 left-0 right-0 bg-[#0f172a] border-t border-slate-800 p-2 px-4 flex justify-between items-center text-[10px]">
                        <div className="flex gap-3 text-slate-500">
                           <span className="flex items-center gap-1"><span className="text-blue-400">TS</span> {currentSnippet.language}</span>
                           <span className="flex items-center gap-1">Ln {currentSnippet.lines.length}, Col 12</span>
                        </div>
                        <div className="flex items-center gap-1 text-green-400 bg-green-500/10 px-2 py-0.5 rounded transition-all duration-300">
                           <span className="w-1 h-1 bg-green-400 rounded-full animate-ping"></span>
                           {currentSnippet.status}
                        </div>
                    </div>
                  </div>
                </div>

                {/* Floating Decor Elements */}
                <div className="absolute -right-8 -bottom-8 w-20 h-20 bg-brand-500/30 rounded-2xl blur-xl animate-pulse"></div>
                <div className="absolute -left-4 -top-4 w-16 h-16 bg-accent-500/20 rounded-full blur-xl animate-pulse delay-700"></div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;    