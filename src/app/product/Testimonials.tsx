import React, { useEffect, useState, useRef } from 'react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      text: "I was stuck at Senior level for 3 years. This ebook broke down System Design in a way that finally clicked. The distinct focus on scalable architecture vs just coding patterns was the game changer for me. Currently negotiating a Staff role at Uber.",
      author: "Alex Chen",
      role: "Senior Engineer @ Uber",
      avatarColor: "bg-blue-600",
      initials: "AC"
    },
    {
      text: "The 'Machine Coding' chapter is pure gold. It's exactly what I was asked in my Meta onsite. The infinite scroll implementation guide saved me. Truly a masterclass in practical frontend engineering.",
      author: "Sarah Jenkins",
      role: "Frontend Engineer @ Meta",
      avatarColor: "bg-pink-600",
      initials: "SJ"
    },
    {
      text: "Most resources ignore the hard stuff like memory leaks, performance profiling, and browser internals. This guide dives deep into the critical rendering path and V8 garbage collection strategies. Worth 10x the price.",
      author: "David Ross",
      role: "Tech Lead @ Stripe",
      avatarColor: "bg-purple-600",
      initials: "DR"
    },
    {
      text: "I didn't realize how much I didn't know about the Event Loop until I read Chapter 4. Essential reading for any JS developer looking to level up.",
      author: "Michael Chang",
      role: "Senior Dev @ Netflix",
      avatarColor: "bg-red-600",
      initials: "MC"
    },
    {
      text: "Passed my L5 interviews! The behavioral and system design frameworks are top notch.",
      author: "Priya Patel",
      role: "Software Engineer II @ Amazon",
      avatarColor: "bg-yellow-600",
      initials: "PP"
    },
    {
      text: "Finally a guide that treats frontend as engineering, not just UI building. The architecture patterns are immediately applicable to our enterprise monorepo. We use this for onboarding now.",
      author: "James Wilson",
      role: "Principal Engineer",
      avatarColor: "bg-green-600",
      initials: "JW"
    },
     {
      text: "The Micro-frontends section demystified module federation for me. We implemented it next quarter.",
      author: "Elena Rodriguez",
      role: "Architect @ Vercel",
      avatarColor: "bg-indigo-600",
      initials: "ER"
    },
    {
      text: "Straight to the point. No fluff. Just hard engineering problems and solutions.",
      author: "Tom Baker",
      role: "Senior FE @ Airbnb",
      avatarColor: "bg-orange-600",
      initials: "TB"
    }
  ];

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

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-slate-950 relative overflow-hidden border-t border-slate-900">
      {/* Dynamic Background Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-gradient-to-r from-brand-900/20 via-purple-900/20 to-slate-900/20 blur-[120px] animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute top-[40%] -right-[10%] w-[60%] h-[60%] rounded-full bg-gradient-to-l from-accent-900/20 via-blue-900/20 to-slate-900/20 blur-[100px] animate-[pulse_10s_ease-in-out_infinite_reverse]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-6xl bg-gradient-to-tr from-transparent via-brand-500/5 to-transparent opacity-30 rotate-12 animate-[spin_20s_linear_infinite]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                Join <span className="text-brand-400">12,000+</span> Engineers
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
                From startups to Fortune 500s, frontend developers are using this playbook to accelerate their careers.
            </p>
        </div>

        {/* Company Logos Strip */}
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 mb-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
            {['Google', 'Meta', 'Netflix', 'Airbnb', 'Stripe', 'Uber', 'Vercel'].map((company) => (
                <span key={company} className="text-2xl md:text-3xl font-bold text-slate-400 hover:text-white transition-colors cursor-default select-none tracking-tight">
                    {company}
                </span>
            ))}
        </div>

        {/* Masonry Grid */}
        <div className={`columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6`}>
            {testimonials.map((t, i) => (
                <div 
                  key={i} 
                  className={`break-inside-avoid mb-6 transform transition-all duration-700 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'}`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                    <div 
                        className="relative h-full bg-slate-900/60 backdrop-blur-md border border-slate-800 p-8 rounded-2xl hover:bg-slate-800/80 hover:border-brand-500/30 transition-all duration-300 shadow-xl group animate-float"
                        style={{ animationDelay: `${i * 0.2}s`, animationDuration: `${5 + (i % 4)}s` }}
                    >
                        {/* Hover Glow */}
                        <div className="absolute -inset-px bg-gradient-to-r from-brand-500/0 via-brand-500/10 to-accent-500/0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500" />
                        
                        {/* Stars */}
                        <div className="flex gap-1 mb-5 relative z-10">
                            {[1,2,3,4,5].map(s => (
                                <svg key={s} className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>

                        <p className="text-slate-300 text-[15px] leading-relaxed mb-8 relative z-10">
                            "{t.text}"
                        </p>

                        <div className="flex items-center gap-4 pt-6 border-t border-slate-700/50 mt-auto relative z-10">
                            <div className={`w-10 h-10 rounded-full ${t.avatarColor} flex items-center justify-center text-white font-bold text-sm shadow-inner ring-2 ring-slate-800`}>
                                {t.initials}
                            </div>
                            <div>
                                <div className="text-white font-semibold text-sm flex items-center gap-1.5">
                                    {t.author}
                                    <svg className="w-3.5 h-3.5 text-blue-400 fill-current" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="text-slate-500 text-xs font-medium">{t.role}</div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;