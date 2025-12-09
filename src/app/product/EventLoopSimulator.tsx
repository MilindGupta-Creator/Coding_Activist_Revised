import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft, Info, Keyboard, CheckCircle2 } from "lucide-react";

type LoopFrame = {
  title: string;
  note?: string;
  stack: string[];
  microtasks: string[];
  macrotasks: string[];
  log?: string;
};

type Scenario = {
  id: string;
  title: string;
  description: string;
  code: string;
  frames: LoopFrame[];
};

const SCENARIOS: Scenario[] = [
  {
    id: "promise-timeout",
    title: "Promise vs setTimeout",
    description: "Promise microtasks beat timers even with 0ms delay.",
    code: `console.log("A");

setTimeout(() => {
  console.log("setTimeout");
}, 0);

Promise.resolve().then(() => {
  console.log("microtask");
});

console.log("B");`,
    frames: [
      {
        title: "Script start",
        note: "Global code enters the call stack",
        stack: ["(script)"],
        microtasks: [],
        macrotasks: [],
      },
      {
        title: 'console.log("A")',
        stack: ["(script)", "console.log"],
        microtasks: [],
        macrotasks: [],
        log: "A",
      },
      {
        title: "After A",
        stack: ["(script)"],
        microtasks: [],
        macrotasks: [],
      },
      {
        title: "setTimeout registered",
        note: "Timer callback waits in Web APIs → macrotask queue",
        stack: ["(script)", "setTimeout"],
        microtasks: [],
        macrotasks: ["timeout cb"],
      },
      {
        title: "Promise.then scheduled",
        note: "Microtask queued for the next checkpoint",
        stack: ["(script)", "promise.then"],
        microtasks: ["promise microtask"],
        macrotasks: ["timeout cb"],
      },
      {
        title: 'console.log("B")',
        stack: ["(script)", "console.log"],
        microtasks: ["promise microtask"],
        macrotasks: ["timeout cb"],
        log: "B",
      },
      {
        title: "Stack empty → queues",
        note: "Event loop checks microtasks first",
        stack: [],
        microtasks: ["promise microtask"],
        macrotasks: ["timeout cb"],
      },
      {
        title: "Run microtask",
        stack: ["promise microtask"],
        microtasks: [],
        macrotasks: ["timeout cb"],
        log: "microtask",
      },
      {
        title: "Microtasks drained",
        stack: [],
        microtasks: [],
        macrotasks: ["timeout cb"],
      },
      {
        title: "Process macrotask",
        note: "Now timers/callback queue can run",
        stack: ["timeout cb"],
        microtasks: [],
        macrotasks: [],
        log: "setTimeout",
      },
      {
        title: "All done",
        stack: [],
        microtasks: [],
        macrotasks: [],
      },
    ],
  },
  {
    id: "async-await",
    title: "async / await + queueMicrotask",
    description: "await yields to microtasks before timers fire.",
    code: `async function main() {
  console.log("start");

  queueMicrotask(() => console.log("queued"));

  await Promise.resolve();
  console.log("after await");

  setTimeout(() => console.log("timer"), 0);
}

main();`,
    frames: [
      {
        title: "main() called",
        note: "Function frame on the stack",
        stack: ["(script)", "main()"],
        microtasks: [],
        macrotasks: [],
      },
      {
        title: 'console.log("start")',
        stack: ["(script)", "main()", "console.log"],
        microtasks: [],
        macrotasks: [],
        log: "start",
      },
      {
        title: "queueMicrotask added",
        stack: ["(script)", "main()", "queueMicrotask"],
        microtasks: ["queued microtask"],
        macrotasks: [],
      },
      {
        title: "Await Promise.resolve()",
        note: "Promise resolves → microtask for continuation",
        stack: ["(script)", "main()", "await Promise"],
        microtasks: ["queued microtask", "resume main()"],
        macrotasks: [],
      },
      {
        title: "main() suspends",
        stack: ["(script)"],
        microtasks: ["queued microtask", "resume main()"],
        macrotasks: [],
      },
      {
        title: "Run microtask 1",
        stack: ["queued microtask"],
        microtasks: ["resume main()"],
        macrotasks: [],
        log: "queued",
      },
      {
        title: "Run microtask 2 (resume)",
        stack: ["resume main()"],
        microtasks: [],
        macrotasks: [],
      },
      {
        title: 'console.log("after await")',
        stack: ["(script)", "main()", "console.log"],
        microtasks: [],
        macrotasks: [],
        log: "after await",
      },
      {
        title: "setTimeout registered",
        stack: ["(script)", "main()", "setTimeout"],
        microtasks: [],
        macrotasks: ["timer cb"],
      },
      {
        title: "main() completes",
        stack: [],
        microtasks: [],
        macrotasks: ["timer cb"],
      },
      {
        title: "Process timer macrotask",
        stack: ["timer cb"],
        microtasks: [],
        macrotasks: [],
        log: "timer",
      },
      {
        title: "Finished",
        stack: [],
        microtasks: [],
        macrotasks: [],
      },
    ],
  },
  {
    id: "nested-timeouts",
    title: "Nested Timeouts & Tasks",
    description: "Microtasks inside macrotasks run before the next macrotask.",
    code: `console.log("Start");

setTimeout(() => {
  console.log("Timeout 1");
  queueMicrotask(() => console.log("Micro 1"));
}, 0);

setTimeout(() => {
  console.log("Timeout 2");
}, 0);

console.log("End");`,
    frames: [
      {
        title: "Script start",
        stack: ["(script)"],
        microtasks: [],
        macrotasks: [],
      },
      {
        title: 'console.log("Start")',
        stack: ["(script)", "console.log"],
        microtasks: [],
        macrotasks: [],
        log: "Start",
      },
      {
        title: "Register Timeout 1",
        stack: ["(script)", "setTimeout"],
        microtasks: [],
        macrotasks: ["timeout 1"],
      },
      {
        title: "Register Timeout 2",
        stack: ["(script)", "setTimeout"],
        microtasks: [],
        macrotasks: ["timeout 1", "timeout 2"],
      },
      {
        title: 'console.log("End")',
        stack: ["(script)", "console.log"],
        microtasks: [],
        macrotasks: ["timeout 1", "timeout 2"],
        log: "End",
      },
      {
        title: "Stack empty → Loop check",
        stack: [],
        microtasks: [],
        macrotasks: ["timeout 1", "timeout 2"],
      },
      {
        title: "Process Timeout 1",
        stack: ["timeout 1"],
        microtasks: [],
        macrotasks: ["timeout 2"],
        log: "Timeout 1",
      },
      {
        title: "Queue inner microtask",
        stack: ["timeout 1", "queueMicrotask"],
        microtasks: ["Micro 1"],
        macrotasks: ["timeout 2"],
      },
      {
        title: "Timeout 1 done",
        stack: [],
        microtasks: ["Micro 1"],
        macrotasks: ["timeout 2"],
      },
      {
        title: "Process Microtasks",
        note: "Microtasks run before next macrotask!",
        stack: ["Micro 1"],
        microtasks: [],
        macrotasks: ["timeout 2"],
        log: "Micro 1",
      },
      {
        title: "Process Timeout 2",
        stack: ["timeout 2"],
        microtasks: [],
        macrotasks: [],
        log: "Timeout 2",
      },
      {
        title: "All done",
        stack: [],
        microtasks: [],
        macrotasks: [],
      }
    ]
  },
  {
    id: "advanced-mastery",
    title: "Advanced Mastery Challenge",
    description: "Complex mix: async functions, promise chains, nested microtasks, and timers. Can you predict the exact order?",
    code: `console.log("1: Sync Start");

async function taskA() {
  console.log("2: taskA start");
  await Promise.resolve();
  console.log("3: taskA after await");
  
  Promise.resolve().then(() => {
    console.log("4: taskA nested promise");
    queueMicrotask(() => console.log("5: taskA microtask"));
  });
}

async function taskB() {
  console.log("6: taskB start");
  await Promise.resolve();
  console.log("7: taskB after await");
}

setTimeout(() => {
  console.log("8: setTimeout 1");
  Promise.resolve().then(() => console.log("9: setTimeout promise"));
}, 0);

taskA();
taskB();

setTimeout(() => {
  console.log("10: setTimeout 2");
}, 0);

queueMicrotask(() => console.log("11: Global microtask"));

console.log("12: Sync End");`,
    frames: [
      {
        title: "Script start",
        note: "Global execution begins",
        stack: ["(script)"],
        microtasks: [],
        macrotasks: [],
      },
      {
        title: 'console.log("1: Sync Start")',
        stack: ["(script)", "console.log"],
        microtasks: [],
        macrotasks: [],
        log: "1: Sync Start",
      },
      {
        title: "setTimeout 1 registered",
        note: "First timer scheduled",
        stack: ["(script)", "setTimeout"],
        microtasks: [],
        macrotasks: ["setTimeout 1"],
      },
      {
        title: "Call taskA()",
        stack: ["(script)", "taskA"],
        microtasks: [],
        macrotasks: ["setTimeout 1"],
      },
      {
        title: 'console.log("2: taskA start")',
        stack: ["(script)", "taskA", "console.log"],
        microtasks: [],
        macrotasks: ["setTimeout 1"],
        log: "2: taskA start",
      },
      {
        title: "await Promise.resolve() in taskA",
        note: "taskA suspends, continuation queued",
        stack: ["(script)", "taskA", "await"],
        microtasks: ["resume taskA"],
        macrotasks: ["setTimeout 1"],
      },
      {
        title: "taskA suspends",
        stack: ["(script)"],
        microtasks: ["resume taskA"],
        macrotasks: ["setTimeout 1"],
      },
      {
        title: "Call taskB()",
        stack: ["(script)", "taskB"],
        microtasks: ["resume taskA"],
        macrotasks: ["setTimeout 1"],
      },
      {
        title: 'console.log("6: taskB start")',
        stack: ["(script)", "taskB", "console.log"],
        microtasks: ["resume taskA"],
        macrotasks: ["setTimeout 1"],
        log: "6: taskB start",
      },
      {
        title: "await Promise.resolve() in taskB",
        note: "taskB suspends, continuation queued",
        stack: ["(script)", "taskB", "await"],
        microtasks: ["resume taskA", "resume taskB"],
        macrotasks: ["setTimeout 1"],
      },
      {
        title: "taskB suspends",
        stack: ["(script)"],
        microtasks: ["resume taskA", "resume taskB"],
        macrotasks: ["setTimeout 1"],
      },
      {
        title: "setTimeout 2 registered",
        stack: ["(script)", "setTimeout"],
        microtasks: ["resume taskA", "resume taskB"],
        macrotasks: ["setTimeout 1", "setTimeout 2"],
      },
      {
        title: "queueMicrotask registered",
        note: "Global microtask queued",
        stack: ["(script)", "queueMicrotask"],
        microtasks: ["resume taskA", "resume taskB", "Global microtask"],
        macrotasks: ["setTimeout 1", "setTimeout 2"],
      },
      {
        title: 'console.log("12: Sync End")',
        stack: ["(script)", "console.log"],
        microtasks: ["resume taskA", "resume taskB", "Global microtask"],
        macrotasks: ["setTimeout 1", "setTimeout 2"],
        log: "12: Sync End",
      },
      {
        title: "Stack empty → Process microtasks",
        note: "Event loop drains ALL microtasks first",
        stack: [],
        microtasks: ["resume taskA", "resume taskB", "Global microtask"],
        macrotasks: ["setTimeout 1", "setTimeout 2"],
      },
      {
        title: "Run microtask: resume taskA",
        stack: ["resume taskA"],
        microtasks: ["resume taskB", "Global microtask"],
        macrotasks: ["setTimeout 1", "setTimeout 2"],
      },
      {
        title: 'console.log("3: taskA after await")',
        stack: ["resume taskA", "console.log"],
        microtasks: ["resume taskB", "Global microtask"],
        macrotasks: ["setTimeout 1", "setTimeout 2"],
        log: "3: taskA after await",
      },
      {
        title: "Promise.resolve().then in taskA",
        note: "Nested promise callback queued",
        stack: ["resume taskA", "Promise.then"],
        microtasks: ["resume taskB", "Global microtask", "taskA nested promise"],
        macrotasks: ["setTimeout 1", "setTimeout 2"],
      },
      {
        title: "taskA completes",
        stack: [],
        microtasks: ["resume taskB", "Global microtask", "taskA nested promise"],
        macrotasks: ["setTimeout 1", "setTimeout 2"],
      },
      {
        title: "Run microtask: resume taskB",
        stack: ["resume taskB"],
        microtasks: ["Global microtask", "taskA nested promise"],
        macrotasks: ["setTimeout 1", "setTimeout 2"],
      },
      {
        title: 'console.log("7: taskB after await")',
        stack: ["resume taskB", "console.log"],
        microtasks: ["Global microtask", "taskA nested promise"],
        macrotasks: ["setTimeout 1", "setTimeout 2"],
        log: "7: taskB after await",
      },
      {
        title: "taskB completes",
        stack: [],
        microtasks: ["Global microtask", "taskA nested promise"],
        macrotasks: ["setTimeout 1", "setTimeout 2"],
      },
      {
        title: "Run microtask: Global microtask",
        stack: ["Global microtask"],
        microtasks: ["taskA nested promise"],
        macrotasks: ["setTimeout 1", "setTimeout 2"],
        log: "11: Global microtask",
      },
      {
        title: "Run microtask: taskA nested promise",
        stack: ["taskA nested promise"],
        microtasks: [],
        macrotasks: ["setTimeout 1", "setTimeout 2"],
        log: "4: taskA nested promise",
      },
      {
        title: "queueMicrotask inside nested promise",
        note: "Another microtask queued!",
        stack: ["taskA nested promise", "queueMicrotask"],
        microtasks: ["taskA microtask"],
        macrotasks: ["setTimeout 1", "setTimeout 2"],
      },
      {
        title: "Run microtask: taskA microtask",
        stack: ["taskA microtask"],
        microtasks: [],
        macrotasks: ["setTimeout 1", "setTimeout 2"],
        log: "5: taskA microtask",
      },
      {
        title: "All microtasks drained",
        note: "Now macrotasks can run",
        stack: [],
        microtasks: [],
        macrotasks: ["setTimeout 1", "setTimeout 2"],
      },
      {
        title: "Process macrotask: setTimeout 1",
        stack: ["setTimeout 1"],
        microtasks: [],
        macrotasks: ["setTimeout 2"],
        log: "8: setTimeout 1",
      },
      {
        title: "Promise.resolve().then in setTimeout",
        note: "Microtask queued from macrotask!",
        stack: ["setTimeout 1", "Promise.then"],
        microtasks: ["setTimeout promise"],
        macrotasks: ["setTimeout 2"],
      },
      {
        title: "setTimeout 1 completes",
        stack: [],
        microtasks: ["setTimeout promise"],
        macrotasks: ["setTimeout 2"],
      },
      {
        title: "Process microtask: setTimeout promise",
        note: "Microtasks run before next macrotask!",
        stack: ["setTimeout promise"],
        microtasks: [],
        macrotasks: ["setTimeout 2"],
        log: "9: setTimeout promise",
      },
      {
        title: "Process macrotask: setTimeout 2",
        stack: ["setTimeout 2"],
        microtasks: [],
        macrotasks: [],
        log: "10: setTimeout 2",
      },
      {
        title: "All done",
        stack: [],
        microtasks: [],
        macrotasks: [],
      }
    ]
  }
];

const QueueList = ({ items, emptyLabel }: { items: string[]; emptyLabel: string }) => (
  <div className="flex flex-wrap content-start gap-2 h-full">
    <AnimatePresence mode="popLayout">
      {items.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-full flex items-center justify-center h-full min-h-[40px]"
        >
          <span className="text-[11px] text-slate-600 italic">{emptyLabel}</span>
        </motion.div>
      ) : (
        items.map((item, idx) => (
          <motion.span
            key={`${item}-${idx}`}
            layout
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="rounded bg-slate-800/80 border border-slate-700 px-2 py-1 text-[10px] text-slate-200 shadow-sm"
          >
            {item}
          </motion.span>
        ))
      )}
    </AnimatePresence>
  </div>
);

const EventLoopSimulator: React.FC = () => {
  const [scenarioId, setScenarioId] = useState(SCENARIOS[0].id);
  const [frameIndex, setFrameIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(900);
  const [showShortcuts, setShowShortcuts] = useState(false);

  const scenario = useMemo(
    () => SCENARIOS.find((s) => s.id === scenarioId) ?? SCENARIOS[0],
    [scenarioId]
  );

  const frames = scenario.frames;
  const hasFrames = frames.length > 0;
  const maxIndex = Math.max(frames.length - 1, 0);
  const isFinished = frameIndex === maxIndex && hasFrames;
  const current =
    frames[frameIndex] ?? {
      title: "No frames yet",
      stack: [],
      microtasks: [],
      macrotasks: [],
    };

  const logs = useMemo(
    () =>
      frames
        .slice(0, frameIndex + 1)
        .map((f) => f.log)
        .filter(Boolean) as string[],
    [frames, frameIndex]
  );

  useEffect(() => {
    setFrameIndex(0);
    setIsPlaying(false);
  }, [scenarioId]);

  // Auto-play logic
  useEffect(() => {
    if (!isPlaying) return;
    if (frameIndex >= maxIndex) {
      setIsPlaying(false);
      return;
    }

    const id = window.setTimeout(() => {
      setFrameIndex((prev) => Math.min(prev + 1, maxIndex));
    }, speed);

    return () => window.clearTimeout(id);
  }, [isPlaying, frameIndex, maxIndex, speed]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      
      switch(e.key) {
        case "ArrowRight":
          setFrameIndex(i => Math.min(i + 1, maxIndex));
          break;
        case "ArrowLeft":
          setFrameIndex(i => Math.max(i - 1, 0));
          setIsPlaying(false);
          break;
        case " ":
          e.preventDefault(); // Prevent scroll
          setIsPlaying(p => !p);
          break;
        case "Home":
          setFrameIndex(0);
          setIsPlaying(false);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [maxIndex]);

  const progress =
    frames.length <= 1 ? 0 : Math.round((frameIndex / (frames.length - 1)) * 100);

  return (
    <div className="relative z-[60] mt-12 rounded-3xl border border-slate-800 bg-slate-950/90 backdrop-blur-sm p-6 shadow-2xl shadow-brand-500/10 overflow-hidden ring-1 ring-white/5">
      {/* Keyboard Shortcuts Modal */}
      <AnimatePresence>
        {showShortcuts && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute top-4 right-4 z-50 bg-slate-900/95 border border-slate-700 p-4 rounded-xl shadow-xl text-xs w-64 backdrop-blur-md"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="font-bold text-white">Keyboard Controls</span>
              <button onClick={() => setShowShortcuts(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <div className="space-y-2 text-slate-300">
              <div className="flex justify-between"><span>Play / Pause</span> <kbd className="bg-slate-800 px-2 rounded border border-slate-700">Space</kbd></div>
              <div className="flex justify-between"><span>Next Step</span> <kbd className="bg-slate-800 px-2 rounded border border-slate-700">→</kbd></div>
              <div className="flex justify-between"><span>Prev Step</span> <kbd className="bg-slate-800 px-2 rounded border border-slate-700">←</kbd></div>
              <div className="flex justify-between"><span>Reset</span> <kbd className="bg-slate-800 px-2 rounded border border-slate-700">Home</kbd></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-slate-800/50 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-500 font-bold">
              Event Loop Lab
            </span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            {scenario.title}
            {isFinished && <CheckCircle2 className="w-5 h-5 text-emerald-500 animate-in fade-in zoom-in" />}
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-lg leading-relaxed">
            {scenario.description}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2 justify-end">
          {SCENARIOS.map((s) => (
            <button
              key={s.id}
              onClick={() => setScenarioId(s.id)}
              className={`px-4 py-2 text-[11px] font-medium rounded-full transition-all border ${
                scenarioId === s.id
                  ? "bg-brand-500/10 text-brand-200 border-brand-500/50 shadow-[0_0_15px_rgba(99,102,241,0.15)]"
                  : "bg-slate-900/50 text-slate-400 border-slate-800 hover:border-slate-600 hover:text-slate-200"
              }`}
            >
              {s.title}
            </button>
          ))}
        </div>
      </div>

      {/* Controls Bar */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 bg-slate-900/40 p-2 pr-4 rounded-2xl border border-slate-800/50 backdrop-blur-md">
        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              setIsPlaying(false);
              setFrameIndex(0);
            }}
            className="p-2.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-all active:scale-95"
            title="Reset (Home)"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <div className="h-5 w-px bg-slate-800 mx-1" />

          <button
            onClick={() => {
              setIsPlaying(false);
              setFrameIndex((i) => Math.max(i - 1, 0));
            }}
            disabled={frameIndex === 0}
            className="p-2.5 rounded-xl hover:bg-slate-800 text-slate-200 disabled:opacity-30 disabled:hover:bg-transparent transition-all active:scale-95"
            title="Previous Step (Left Arrow)"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => setIsPlaying((p) => !p)}
            disabled={!hasFrames}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl font-semibold text-xs transition-all active:scale-95 ${
              isPlaying
                ? "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border border-amber-500/20"
                : "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25 hover:bg-emerald-400 hover:shadow-emerald-500/40"
            }`}
            title="Play/Pause (Space)"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" /> Pause
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" /> {frameIndex > 0 ? "Resume" : "Run"}
              </>
            )}
          </button>

          <button
            onClick={() => setFrameIndex((i) => Math.min(i + 1, maxIndex))}
            disabled={!hasFrames || frameIndex === maxIndex}
            className="p-2.5 rounded-xl hover:bg-slate-800 text-slate-200 disabled:opacity-30 disabled:hover:bg-transparent transition-all active:scale-95"
            title="Next Step (Right Arrow)"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-6 flex-1 justify-end min-w-[200px]">
          {/* Speed Control */}
          <div className="flex items-center gap-3 group">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider group-hover:text-slate-400 transition-colors">
              Speed
            </span>
            <div className="relative w-24 h-1.5 bg-slate-800 rounded-full">
              <input
                type="range"
                min={200}
                max={2000}
                step={100}
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div 
                className="h-full bg-slate-600 rounded-full"
                style={{ width: `${((speed - 200) / 1800) * 100}%` }}
              />
              <div 
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md pointer-events-none transition-all"
                style={{ left: `${((speed - 200) / 1800) * 100}%` }}
              />
            </div>
          </div>
          
          <button 
            onClick={() => setShowShortcuts(!showShortcuts)}
            className="text-slate-500 hover:text-emerald-400 transition-colors"
            title="Keyboard Shortcuts"
          >
            <Keyboard className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4 relative h-1 w-full bg-slate-800/50 rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </div>

      {/* Main Visualization Grid */}
      <div className="mt-6 grid lg:grid-cols-2 gap-6 min-h-[420px]">
        {/* Source Code Panel */}
        <div className="rounded-2xl border border-slate-800/60 bg-[#0a0d14]/80 flex flex-col overflow-hidden shadow-inner backdrop-blur-sm">
          <div className="px-4 py-3 border-b border-slate-800/50 flex justify-between items-center bg-slate-900/30">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Source Code</span>
            <div className="flex gap-1.5 opacity-50">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500"/>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"/>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500"/>
            </div>
          </div>
          <div className="flex-1 p-4 overflow-x-auto relative group custom-scrollbar">
             {/* Simple Line Highlighting Logic */}
             {scenario.code.split('\n').map((line, i) => {
               const cleanTitle = current.title.replace(/["'()]/g, '').replace('console.log', '').trim();
               const cleanLine = line.replace(/["'()]/g, '').trim();
               // Slightly improved matching: if title is small, ensure exact match or boundary
               const isMatch = cleanTitle && cleanLine.includes(cleanTitle) && cleanTitle.length > 1;
               
               return (
                 <div key={i} className={`flex relative transition-colors duration-200 ${isMatch ? 'bg-emerald-500/10 -mx-4 px-4 py-0.5 rounded-sm' : 'py-0.5'}`}>
                   {isMatch && (
                     <motion.div 
                       layoutId="activeLine"
                       className="absolute left-0 top-0 bottom-0 w-0.5 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"
                     />
                   )}
                   <span className="text-slate-700 w-6 text-right select-none mr-4 text-[10px] pt-0.5 font-mono">{i + 1}</span>
                   <span className={`font-mono text-xs whitespace-pre transition-colors duration-200 ${isMatch ? 'text-emerald-100 font-bold' : 'text-blue-200/70'}`}>
                     {line}
                   </span>
                 </div>
               );
             })}
          </div>
        </div>

        {/* Execution State Panel */}
        <div className="flex flex-col gap-4">
          {/* Current Step Banner */}
          <div className="rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-950/90 border border-slate-800/60 p-5 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 p-8 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-all duration-500" />
            
            <div className="relative z-10">
              <div className="flex justify-between items-start">
                <div>
                  <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-emerald-500 mb-1.5">
                    <Info className="w-3 h-3" />
                    Current Step
                  </span>
                  <h3 className="text-lg font-bold text-white mb-1 tracking-tight">
                    {current.title}
                  </h3>
                </div>
                <div className="text-[10px] font-mono text-slate-600 bg-slate-900 px-2 py-1 rounded border border-slate-800">
                  Frame {frameIndex + 1}/{frames.length}
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mt-1 border-l-2 border-slate-800 pl-3">
                {current.note || "Proceeding to next operation..."}
              </p>
            </div>
          </div>

          {/* Stacks & Queues Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
             {/* Call Stack */}
             <div className="rounded-2xl border border-slate-800/60 bg-slate-900/40 p-4 flex flex-col h-full relative overflow-hidden">
               <div className="flex items-center justify-between mb-3 border-b border-slate-800/50 pb-2 relative z-10">
                 <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Call Stack</span>
                 <span className="text-[9px] font-bold text-emerald-400 bg-emerald-950/30 border border-emerald-500/20 px-1.5 py-0.5 rounded">LIFO</span>
               </div>
               
               <div className="flex-1 flex flex-col justify-end gap-2 min-h-[100px] relative z-10">
                 <AnimatePresence mode="popLayout">
                   {current.stack.length === 0 ? (
                     <motion.div 
                       initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                       className="flex-1 flex flex-col items-center justify-center text-slate-700 gap-2"
                     >
                       <div className="w-8 h-8 rounded-full border-2 border-dashed border-slate-800 animate-[spin_10s_linear_infinite]" />
                       <span className="text-[10px] uppercase tracking-widest">Idle</span>
                     </motion.div>
                   ) : (
                     [...current.stack].reverse().map((frame, i) => (
                       <motion.div
                         key={`${frame}-${i}`}
                         initial={{ y: -10, opacity: 0, scale: 0.95 }}
                         animate={{ y: 0, opacity: 1, scale: 1 }}
                         exit={{ y: 10, opacity: 0, scale: 0.95 }}
                         className={`p-2.5 rounded-lg text-xs font-mono font-medium border shadow-sm backdrop-blur-sm transition-all duration-300 ${
                           i === 0 
                             ? "bg-emerald-500/10 text-emerald-100 border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.1)]" 
                             : "bg-slate-800/60 text-slate-400 border-slate-700/50"
                         }`}
                       >
                         <div className="flex justify-between items-center">
                           <span>{frame}</span>
                           {i === 0 && <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />}
                         </div>
                       </motion.div>
                     ))
                   )}
                 </AnimatePresence>
               </div>
             </div>

             {/* Queues Container */}
             <div className="flex flex-col gap-4">
                {/* Microtasks */}
                <div className="rounded-2xl border border-slate-800/60 bg-slate-900/40 p-4 flex-1">
                  <div className="flex items-center justify-between mb-3 border-b border-slate-800/50 pb-2">
                    <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Microtasks</span>
                    <span className="text-[9px] font-bold text-amber-400 bg-amber-950/30 border border-amber-500/20 px-1.5 py-0.5 rounded">High Prio</span>
                  </div>
                  <QueueList items={current.microtasks} emptyLabel="Empty" />
                </div>

                {/* Macrotasks */}
                <div className="rounded-2xl border border-slate-800/60 bg-slate-900/40 p-4 flex-1">
                  <div className="flex items-center justify-between mb-3 border-b border-slate-800/50 pb-2">
                    <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Macrotasks</span>
                    <span className="text-[9px] font-bold text-blue-400 bg-blue-950/30 border border-blue-500/20 px-1.5 py-0.5 rounded">Low Prio</span>
                  </div>
                   <QueueList items={current.macrotasks} emptyLabel="Empty" />
                </div>
             </div>
          </div>
          
          {/* Console Output */}
          <div className="rounded-2xl border border-slate-800/60 bg-[#05070a] p-4 min-h-[120px] shadow-inner">
            <div className="flex items-center gap-2 mb-2 opacity-70">
              <span className="text-[10px] font-bold uppercase text-slate-500 tracking-widest">Console</span>
            </div>
            <div className="font-mono text-xs space-y-1.5 max-h-[150px] overflow-y-auto custom-scrollbar pr-2">
              <AnimatePresence initial={false}>
                {logs.length === 0 ? (
                   <span className="text-slate-800 italic block mt-4 text-center text-[11px]">Waiting for logs...</span>
                ) : (
                  logs.map((log, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex gap-3 text-emerald-400/90 border-b border-slate-800/30 pb-1 last:border-0 group hover:bg-slate-900/30 rounded px-1 -mx-1"
                    >
                      <span className="text-slate-700 select-none w-4 text-[10px] pt-0.5 opacity-50 group-hover:opacity-100">{i + 1}</span>
                      <span className="break-all">{log}</span>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventLoopSimulator;
