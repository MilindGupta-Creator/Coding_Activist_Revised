import React, { useState, useEffect, useRef } from 'react';
import { generateSampleQuestion } from '../services/geminiService';
import { GeneratedQuestion, SampleTopic } from '../types';
import { TerminalIcon, SparklesIcon, LockIcon, ChevronDownIcon } from './Icons';

const SampleGenerator: React.FC = () => {
  const [topic, setTopic] = useState<SampleTopic>(SampleTopic.NEXTJS);
  const [questionData, setQuestionData] = useState<GeneratedQuestion | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const logsEndRef = useRef<HTMLDivElement>(null);

  const addLog = (text: string) => {
    setLogs(prev => [...prev, text]);
  };

  useEffect(() => {
    // Only scroll if there are actual logs and the ref is available
    if (logs.length > 0 && logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setQuestionData(null);
    setLogs([]);

    // Simulate terminal startup sequence
    addLog(`> Initializing connection to Neural Core...`);
    await new Promise(r => setTimeout(r, 600));
    addLog(`> Context selected: ${topic}`);
    addLog(`> Fetching constraints for L5/L6 complexity... [OK]`);
    await new Promise(r => setTimeout(r, 800));
    addLog(`> Analyzing system design patterns...`);
    
    try {
      const data = await generateSampleQuestion(topic);
      addLog(`> Generating challenge...`);
      await new Promise(r => setTimeout(r, 600)); // Suspense
      setQuestionData(data);
      addLog(`> DATA_RECEIVED. Rendering output.`);
    } catch (e) {
      setError("Connection to mainframe interrupted. Please retry.");
      addLog(`> ERROR: Connection failed.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="preview" className="py-24 bg-slate-900 relative overflow-hidden">
       {/* Background Grid & Glow */}
       <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
       <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500/50 to-transparent"></div>
       <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
          <div>
             <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse"></span>
                <span className="text-brand-400 font-mono text-xs tracking-widest uppercase">Live Preview v2.1</span>
             </div>
             <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">Can You Solve This?</span>
             </h2>
          </div>
          <p className="text-slate-400 max-w-sm text-sm md:text-right">
            Test your readiness. These aren't your typical "to-do list" tutorials. 
            This is what Top Tier companies ask.
          </p>
        </div>

        {/* Terminal Window Container */}
        <div className="rounded-xl overflow-hidden border border-slate-700/50 bg-[#0c0e14] shadow-2xl shadow-brand-900/20 backdrop-blur-sm relative group">
          
          {/* Glowing Border Effect */}
          <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-xl"></div>
          
          {/* Terminal Title Bar */}
          <div className="bg-[#1a1d24] px-4 py-3 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5 group-hover:opacity-100 opacity-60 transition-opacity">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
              </div>
            </div>
            <div className="font-mono text-xs text-slate-500 flex items-center gap-2">
               <TerminalIcon className="w-3 h-3" />
               mastery-ai --interactive
            </div>
            <div className="w-12"></div> {/* Spacer for centering */}
          </div>

          <div className="p-6 md:p-8 min-h-[500px] flex flex-col">
            
            {/* Command Bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-8 border-b border-dashed border-slate-800 pb-8">
              <div className="flex-1 relative group/input">
                <label className="absolute -top-4 left-3 bg-[#0c0e14] px-1 text-[10px] font-mono text-brand-400 uppercase tracking-wider">
                   --select-module
                </label>
                <div className="relative">
                    <select 
                      value={topic}
                      onChange={(e) => setTopic(e.target.value as SampleTopic)}
                      className="w-full bg-[#13161c] border border-slate-700 text-slate-200 py-3 pl-4 pr-10 rounded-lg focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 font-mono text-sm appearance-none transition-all hover:border-slate-600"
                    >
                      {Object.values(SampleTopic).map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                </div>
              </div>

              <button 
                onClick={handleGenerate}
                disabled={loading}
                className="relative overflow-hidden px-8 py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-lg font-mono text-sm font-bold tracking-wide transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group/btn"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {loading ? (
                    <span className="animate-pulse">EXECUTING...</span>
                  ) : (
                    <>
                      <SparklesIcon className="w-4 h-4" />
                      RUN GENERATOR
                    </>
                  )}
                </span>
                {/* Button Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[200%] group-hover/btn:animate-[shimmer_1.5s_infinite]"></div>
              </button>
            </div>

            {/* Output Area */}
            <div className="flex-1 font-mono text-sm relative">
              
              {/* Idle State */}
              {!loading && !questionData && !logs.length && (
                <div className="h-full flex flex-col items-center justify-center text-slate-600">
                   <div className="w-16 h-16 border border-slate-800 rounded-full flex items-center justify-center mb-4 bg-slate-900/50">
                     <TerminalIcon className="w-8 h-8 opacity-50" />
                   </div>
                   <p className="animate-pulse">Waiting for input stream...</p>
                </div>
              )}

              {/* Logs */}
              <div className="space-y-1 mb-4 text-slate-400">
                {logs.map((log, i) => (
                  <div key={i} className="animate-fade-in">
                    <span className="text-slate-600 mr-2">{new Date().toLocaleTimeString('en-US', {hour12: false})}</span>
                    <span className={log.includes("ERROR") ? "text-red-400" : "text-green-400/80"}>{log}</span>
                  </div>
                ))}
                <div ref={logsEndRef} />
              </div>

              {/* Question Result */}
              {questionData && !loading && (
                <div className="animate-[fadeIn_0.5s_ease-out]">
                   <div className="border border-slate-700 bg-slate-900/50 rounded p-6 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-2 opacity-50">
                        <span className="text-[10px] border border-slate-600 px-2 py-0.5 rounded text-yellow-500 uppercase tracking-wider">
                          Level: {questionData.difficulty}
                        </span>
                      </div>
                      
                      <div className="mb-6">
                        <span className="text-slate-500 block mb-2 text-xs uppercase tracking-wider">// Query</span>
                        <p className="text-slate-100 text-base md:text-lg leading-relaxed font-sans">
                          {questionData.question}
                        </p>
                      </div>

                      <div className="bg-[#0c0e14] p-4 rounded border border-slate-800/50">
                        <span className="text-slate-500 block mb-1 text-xs uppercase tracking-wider">// Hint</span>
                        <p className="text-brand-300/80 italic">
                          {questionData.hint}
                        </p>
                      </div>
                   </div>

                   {/* Locked Solution CTA */}
                   <div className="mt-4 relative group cursor-pointer" onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}>
                      <div className="absolute inset-0 bg-brand-500/5 blur-xl group-hover:bg-brand-500/10 transition-colors"></div>
                      <div className="relative border border-slate-700/50 bg-slate-800/30 rounded p-4 flex items-center justify-between hover:border-brand-500/50 transition-colors">
                         <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-slate-400">
                               <LockIcon className="w-4 h-4" />
                            </div>
                            <div className="text-left">
                               <div className="text-slate-300 font-bold text-xs uppercase tracking-wider">Full Solution Locked</div>
                               <div className="text-slate-500 text-xs">Unlock detailed implementation & optimization strategies</div>
                            </div>
                         </div>
                         <span className="text-brand-400 text-xs hover:underline flex items-center gap-1">
                            [ VIEW FULL SOLUTION ] <span className="text-lg leading-none">&rarr;</span>
                         </span>
                      </div>
                   </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default SampleGenerator;