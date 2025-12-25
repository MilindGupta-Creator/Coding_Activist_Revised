'use client';

import React, { useEffect, useRef, useState } from 'react';

const ReaderShowcase: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  const features = [
    {
      title: "15-Day Crash Course",
      description: "Structured study plans with daily tasks, progress tracking, and completion goals. Choose from beginner to advanced paths.",
      icon: "📅",
      color: "from-blue-500 to-cyan-500",
      preview: (
        <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-slate-400">Overall Progress</span>
            <span className="text-xs font-bold text-blue-400">5%</span>
          </div>
          <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500" style={{ width: '5%' }} />
          </div>
          <div className="mt-3 text-xs text-slate-500">Day 2 of 15</div>
        </div>
      )
    },
    {
      title: "Quiz Mode",
      description: "Practice with answers hidden. Reveal solutions when ready. Perfect for self-assessment and interview prep.",
      icon: "🎯",
      color: "from-amber-500 to-orange-500",
      preview: (
        <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(245,158,11,0.8)]" />
            <span className="text-xs text-amber-200">Quiz Mode: On</span>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-slate-300">Q1. How setTimeout works?</div>
            <button className="text-xs px-3 py-1.5 rounded-full border border-slate-700 bg-slate-800 text-slate-200 hover:border-amber-500">
              Show answer
            </button>
          </div>
        </div>
      )
    },
    {
      title: "Exam Mode",
      description: "Timed exams with random question selection. Simulate real interview conditions and track your performance.",
      icon: "📝",
      color: "from-emerald-500 to-teal-500",
      preview: (
        <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
            <span className="text-xs text-emerald-200">Exam Mode: Active</span>
          </div>
          <div className="text-xs text-slate-400 mb-2">Time Remaining: 12:45</div>
          <div className="text-sm text-slate-300">Question 3 of 10</div>
        </div>
      )
    },
    {
      title: "Topic Heatmap",
      description: "Visual frequency analysis of interview topics. Know what's hot in FAANG interviews and focus your prep accordingly.",
      icon: "🔥",
      color: "from-sky-500 to-blue-500",
      preview: (
        <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
          <div className="text-xs text-slate-400 mb-2">Interview Frequency</div>
          <div className="grid grid-cols-5 gap-1">
            {[3, 5, 2, 4, 5, 1, 3, 4, 5, 2].map((intensity, i) => (
              <div
                key={i}
                className="h-8 rounded"
                style={{
                  backgroundColor: `rgba(56, 189, 248, ${intensity / 5})`,
                  border: '1px solid rgba(56, 189, 248, 0.3)'
                }}
              />
            ))}
          </div>
        </div>
      )
    },
    {
      title: "Event Loop Lab",
      description: "Interactive simulator to visualize JavaScript's event loop, call stack, and async operations. Master concurrency concepts.",
      icon: "⚡",
      color: "from-purple-500 to-pink-500",
      preview: (
        <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
          <div className="text-xs text-slate-400 mb-2">Event Loop Simulator</div>
          <div className="space-y-2">
            <div className="h-6 bg-slate-800 rounded text-xs text-slate-300 px-2 flex items-center">
              Call Stack
            </div>
            <div className="h-6 bg-slate-800 rounded text-xs text-slate-300 px-2 flex items-center">
              Web APIs
            </div>
            <div className="h-6 bg-slate-800 rounded text-xs text-slate-300 px-2 flex items-center">
              Callback Queue
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Focus Mode",
      description: "Distraction-free reading experience. Hide navigation and focus entirely on learning. Perfect for deep study sessions.",
      icon: "🎯",
      color: "from-indigo-500 to-purple-500",
      preview: (
        <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
            <span className="text-xs text-emerald-200">Focus Mode: Active</span>
          </div>
          <div className="text-sm text-slate-300 leading-relaxed">
            Immersive learning experience with zero distractions
          </div>
        </div>
      )
    },
    {
      title: "Code Examples",
      description: "Syntax-highlighted code snippets with explanations. Real-world examples that mirror actual interview questions.",
      icon: "💻",
      color: "from-green-500 to-emerald-500",
      preview: (
        <div className="bg-[#0c0e14] rounded-lg overflow-hidden border border-slate-800">
          <div className="px-4 py-2 bg-[#1a1d24] border-b border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-mono">solution.js</span>
            <div className="flex gap-1">
              <span className="w-2 h-2 rounded-full bg-red-500/20" />
              <span className="w-2 h-2 rounded-full bg-yellow-500/20" />
              <span className="w-2 h-2 rounded-full bg-green-500/20" />
            </div>
          </div>
          <pre className="p-4 text-xs font-mono text-blue-300">
            <code>{`console.log("Order taken");
setTimeout(() => {
  console.log("Food ready");
}, 2000);`}</code>
          </pre>
        </div>
      )
    },
    {
      title: "Progress Tracking",
      description: "Track your daily progress, completed tasks, and overall course completion. Stay motivated with visual progress bars.",
      icon: "📊",
      color: "from-rose-500 to-pink-500",
      preview: (
        <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-300">Today's Progress</span>
            <span className="text-xs font-bold text-green-400">3 / 5 tasks</span>
          </div>
          <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-green-500 to-emerald-400" style={{ width: '60%' }} />
          </div>
        </div>
      )
    },
    {
      title: "Code Challenges",
      description: "Interactive coding challenges with real-time test execution. Build Drag & Drop lists, implement Promise.all & more. Practice with actual interview problems.",
      icon: "🧩",
      color: "from-violet-500 to-purple-600",
      isPremium: true,
      preview: (
        <div className="bg-slate-900 rounded-lg p-3 border border-violet-500/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 px-2 py-0.5 text-[9px] font-bold bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-bl-lg">
            PREMIUM
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 font-medium">Hard</span>
            <span className="text-[10px] text-slate-500">Drag & Drop List</span>
          </div>
          <div className="bg-[#0c0e14] rounded p-2 font-mono text-[10px] text-blue-300 mb-2">
            <div className="text-slate-500">{'// Reorder array utility'}</div>
            <div><span className="text-purple-400">function</span> <span className="text-yellow-300">reorderArray</span>(arr, from, to) {'{'}</div>
            <div className="text-slate-600 pl-2">...</div>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_4px_rgba(16,185,129,0.8)]" />
            <span className="text-[10px] text-emerald-400">4/5 Tests Passing</span>
          </div>
        </div>
      )
    },
    {
      title: "CSS Battles",
      description: "Master CSS with pixel-perfect challenges. Recreate designs with minimal code. Compete on leaderboards and track your code golf scores.",
      icon: "🎨",
      color: "from-fuchsia-500 to-pink-600",
      isPremium: true,
      preview: (
        <div className="bg-slate-900 rounded-lg p-3 border border-fuchsia-500/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 px-2 py-0.5 text-[9px] font-bold bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white rounded-bl-lg">
            PREMIUM
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 font-medium">Hard</span>
            <span className="text-[10px] text-slate-500">Yin Yang</span>
          </div>
          <div className="flex gap-2 mb-2">
            <div className="flex-1">
              <div className="text-[9px] text-slate-500 mb-1">Target</div>
              <div className="h-14 rounded bg-[#e9e9e9] flex items-center justify-center">
                {/* Yin Yang Symbol */}
                <div className="w-10 h-10 rounded-full relative overflow-hidden" style={{ background: 'linear-gradient(to right, #000 50%, #fff 50%)', boxShadow: '0 0 0 2px #000' }}>
                  <div className="absolute w-5 h-5 rounded-full bg-black top-0 left-1/2 -translate-x-1/2" />
                  <div className="absolute w-5 h-5 rounded-full bg-white bottom-0 left-1/2 -translate-x-1/2" />
                  <div className="absolute w-2 h-2 rounded-full bg-white top-[6px] left-1/2 -translate-x-1/2" />
                  <div className="absolute w-2 h-2 rounded-full bg-black bottom-[6px] left-1/2 -translate-x-1/2" />
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="text-[9px] text-slate-500 mb-1">Your Output</div>
              <div className="h-14 rounded bg-[#e9e9e9] flex items-center justify-center">
                <div className="w-10 h-10 rounded-full relative overflow-hidden opacity-95" style={{ background: 'linear-gradient(to right, #000 50%, #fff 50%)', boxShadow: '0 0 0 2px #000' }}>
                  <div className="absolute w-5 h-5 rounded-full bg-black top-0 left-1/2 -translate-x-1/2" />
                  <div className="absolute w-5 h-5 rounded-full bg-white bottom-0 left-1/2 -translate-x-1/2" />
                  <div className="absolute w-2 h-2 rounded-full bg-white top-[6px] left-1/2 -translate-x-1/2" />
                  <div className="absolute w-2 h-2 rounded-full bg-black bottom-[6px] left-1/2 -translate-x-1/2" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-fuchsia-400 font-bold">99.2% Match</span>
            <span className="text-[10px] text-slate-500">156 chars</span>
          </div>
        </div>
      )
    }
  ];

  return (
    <>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; box-shadow: 0 0 20px rgba(56, 189, 248, 0.3); }
          50% { opacity: 1; box-shadow: 0 0 40px rgba(56, 189, 248, 0.6); }
        }
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 4s ease infinite;
        }
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
        .feature-card {
          animation: slide-up 0.6s ease-out both;
        }
        .preview-container {
          animation: scale-in 0.8s ease-out both;
        }
      `}</style>
      <section 
        id="reader-showcase" 
        ref={sectionRef}
        className="py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-brand-400/5 rounded-full blur-3xl animate-float" />
          <div className="absolute top-40 right-20 w-96 h-96 bg-purple-400/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-20 left-1/4 w-64 h-64 bg-cyan-400/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="w-full h-full bg-[linear-gradient(rgba(56,189,248,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-block mb-4">
              <span className="text-xs font-mono text-brand-500 uppercase tracking-widest bg-brand-50 px-4 py-2 rounded-full border border-brand-200">
                Interactive Learning Platform
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 bg-gradient-to-r from-slate-900 via-brand-600 to-slate-900 bg-clip-text text-transparent animate-gradient-shift">
              Experience the <span className="text-brand-600">Ultimate Learning Platform</span>
            </h2>
            <p className="text-slate-600 max-w-3xl mx-auto text-lg leading-relaxed">
              Our interactive reader isn't just an ebook—it's a complete learning ecosystem designed to maximize your interview success.
            </p>
          </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={`feature-card group bg-white border-2 rounded-2xl p-6 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 flex flex-col relative overflow-hidden ${
                feature.isPremium 
                  ? 'border-purple-300 hover:border-purple-400 hover:shadow-purple-500/20' 
                  : 'border-slate-200 hover:border-brand-400 hover:shadow-brand-500/20'
              }`}
              style={{ 
                animationDelay: `${idx * 0.1}s`,
                animationFillMode: isVisible ? 'both' : 'none'
              }}
            >
              {/* Premium Badge */}
              {feature.isPremium && (
                <div className="absolute top-3 right-3 z-20">
                  <span className="px-2 py-1 text-[10px] font-bold bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 text-white rounded-full shadow-lg shadow-purple-500/30 flex items-center gap-1">
                    <span className="text-xs">✨</span> ADVANCED
                  </span>
                </div>
              )}

              {/* Shimmer Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer pointer-events-none" />
              
              {/* Gradient Border on Hover */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`} />
              
              {/* Premium Glow Effect */}
              {feature.isPremium && (
                <div className="absolute -inset-1 bg-gradient-to-r from-violet-500/20 via-purple-500/20 to-fuchsia-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              )}
              
              {/* Icon */}
              <div className={`relative w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center text-2xl mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 animate-pulse-glow`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity`} />
                <span className="relative z-10">{feature.icon}</span>
              </div>

              {/* Title */}
              <h3 className={`text-lg font-bold mb-2 transition-colors duration-300 relative z-10 ${
                feature.isPremium 
                  ? 'text-slate-900 group-hover:text-purple-600' 
                  : 'text-slate-900 group-hover:text-brand-600'
              }`}>
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-grow relative z-10">
                {feature.description}
              </p>

              {/* Preview */}
              <div className="mt-auto relative z-10 transform group-hover:scale-[1.02] transition-transform duration-500">
                {feature.preview}
              </div>

              {/* Corner Accent */}
              <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-bl-full transition-opacity duration-500`} />
            </div>
          ))}
        </div>

        {/* Main Reader Preview Section */}
        <div className={`mt-20 preview-container bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 rounded-3xl p-8 md:p-12 border-2 border-slate-800 shadow-2xl relative overflow-hidden group transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          {/* Animated Border Glow */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-brand-500/20 via-purple-500/20 to-brand-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none animate-float" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none animate-float" style={{ animationDelay: '2s' }} />
          
          {/* Animated Grid Overlay */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
            <div className="w-full h-full bg-[linear-gradient(rgba(56,189,248,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.3)_1px,transparent_1px)] bg-[size:30px_30px]"></div>
          </div>
          
          {/* Scan Line Effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-brand-400/50 to-transparent animate-shimmer" style={{ top: '20%', animation: 'shimmer 3s linear infinite' }} />
          </div>

          <div className="relative z-10">
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-4xl font-bold text-white mb-4">
                See It In Action
              </h3>
              <p className="text-slate-400 max-w-2xl mx-auto">
                A fully interactive learning experience with real-time progress tracking, multiple study modes, and comprehensive content.
              </p>
            </div>

            {/* Mock Reader Interface */}
            <div className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl relative group/reader hover:border-brand-500/50 transition-all duration-500">
              {/* Glow Effect on Hover */}
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-500/20 via-purple-500/20 to-brand-500/20 rounded-2xl blur-xl opacity-0 group-hover/reader:opacity-100 transition-opacity duration-500 -z-10" />
              
              {/* Mock Sidebar */}
              <div className="flex flex-col md:flex-row relative">
                <div className="w-full md:w-80 bg-slate-900 border-r border-slate-800 p-6">
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-xs font-mono text-green-500 uppercase">Secure Connection</span>
                    </div>
                    <div className="text-sm font-bold text-white mb-4">Coding Activist</div>
                  </div>

                  <div className="mb-6 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-slate-400">Overall Progress</span>
                      <span className="text-xs font-bold text-blue-400">5%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500" style={{ width: '5%' }} />
                    </div>
                    <div className="mt-2 text-xs text-slate-500">Day 2 of 15</div>
                  </div>

                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Modules</div>
                  <div className="space-y-2">
                    {['Core JavaScript & Runtime', 'HTML5 & CSS Architecture', 'Advanced React & Next.js','System Design','Machine Coding','A Lot More... 😍 '].map((module, i) => (
                      <div
                        key={i}
                        className={`px-4 py-3 rounded-lg text-sm ${
                          i === 0
                            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                            : 'text-slate-400 hover:bg-slate-800'
                        }`}
                      >
                        {module}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mock Main Content */}
                <div className="flex-1 bg-slate-950 p-8">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-600">
                      Reading Mode
                    </span>
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="px-3 py-1.5 rounded-full border border-slate-700 bg-slate-900/70 text-xs text-slate-300">
                        Quiz Mode: Off
                      </div>
                      <div className="px-3 py-1.5 rounded-full border border-slate-700 bg-slate-900/70 text-xs text-slate-300">
                        Topics Heatmap
                      </div>
                      <div className="px-3 py-1.5 rounded-full border border-slate-700 bg-slate-900/70 text-xs text-slate-300">
                        Event Loop Lab
                      </div>
                      <div className="px-3 py-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-xs text-emerald-300">
                        Exam Mode
                      </div>
                      <div className="px-3 py-1.5 rounded-full border border-slate-700 bg-slate-900/70 text-xs text-slate-300">
                        Enter Focus Mode
                      </div>
                      <div className="px-3 py-1.5 rounded-full border border-violet-500/40 bg-violet-500/10 text-xs text-violet-300 flex items-center gap-1">
                        <span className="text-[10px]">✨</span> Code Challenges
                      </div>
                      <div className="px-3 py-1.5 rounded-full border border-fuchsia-500/40 bg-fuchsia-500/10 text-xs text-fuchsia-300 flex items-center gap-1">
                        <span className="text-[10px]">🎨</span> CSS Battles
                      </div>
                    </div>
                  </div>

                  <div className="mb-8 pb-6 border-b border-slate-800">
                    <span className="text-blue-500 font-mono text-sm tracking-widest uppercase mb-2 block">
                      Current Module
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white">
                      Core JavaScript & Runtime
                    </h2>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <div className="flex gap-4 items-start mb-2">
                        <span className="flex-shrink-0 w-8 h-8 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400 font-mono font-bold text-sm">
                          Q1
                        </span>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-slate-200 leading-snug">
                            How setTimeout works / Event Loop?
                          </h3>
                        </div>
                      </div>

                      <div className="pl-12 mt-4">
                        <div className="bg-[#0c0e14] rounded-lg overflow-hidden border border-slate-800 mb-4">
                          <div className="px-4 py-2 bg-[#1a1d24] border-b border-slate-800 flex items-center justify-between">
                            <span className="text-xs text-slate-500 font-mono">solution.js</span>
                            <div className="flex gap-1">
                              <span className="w-2 h-2 rounded-full bg-red-500/20" />
                              <span className="w-2 h-2 rounded-full bg-yellow-500/20" />
                              <span className="w-2 h-2 rounded-full bg-green-500/20" />
                            </div>
                          </div>
                          <pre className="p-4 text-xs font-mono text-blue-300">
                            <code>{`console.log("Order taken");

setTimeout(() => {
  console.log("Food ready");
}, 2000);

console.log("Taking next order");`}</code>
                          </pre>
                        </div>

                        <div className="text-slate-400 text-sm leading-relaxed">
                          setTimeout schedules a callback to run after the specified delay. The callback is added to the callback queue and executed by the event loop once the call stack is empty...
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Highlights */}
            <div className="mt-12 grid md:grid-cols-3 gap-6">
              {[
                { icon: '🔒', title: 'Secure & Protected', desc: 'Watermarked content with anti-piracy protection', delay: '0s' },
                { icon: '📱', title: 'Responsive Design', desc: 'Perfect experience on desktop, tablet, and mobile', delay: '0.2s' },
                { icon: '⚡', title: 'Lightning Fast', desc: 'Optimized for speed and smooth navigation', delay: '0.4s' }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="text-center p-6 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-brand-500/50 hover:bg-slate-800/70 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-brand-500/20 group relative overflow-hidden"
                  style={{ 
                    animation: isVisible ? `slide-up 0.6s ease-out ${item.delay} both` : 'none'
                  }}
                >
                  {/* Hover Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-500/0 via-brand-500/0 to-purple-500/0 group-hover:from-brand-500/10 group-hover:via-brand-500/5 group-hover:to-purple-500/10 transition-all duration-500" />
                  
                  <div className="text-3xl mb-3 relative z-10 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    {item.icon}
                  </div>
                  <h4 className="text-white font-semibold mb-2 relative z-10 group-hover:text-brand-400 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-slate-400 text-sm relative z-10 group-hover:text-slate-300 transition-colors">
                    {item.desc}
                  </p>
                  
                  {/* Corner Accent */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-brand-500/0 group-hover:bg-brand-500/10 rounded-bl-full transition-all duration-500" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default ReaderShowcase;

