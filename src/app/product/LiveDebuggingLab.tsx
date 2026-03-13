import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Bug, Clock, CheckCircle2, XCircle, RotateCcw, X, Info, ChevronRight, Terminal, Loader2, Zap, Activity } from 'lucide-react';
import Editor, { OnMount } from '@monaco-editor/react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  timeLimit: number; // in seconds
  initialCode: string;
  tests: {
    description: string;
    // A string of code that will be evaluated, assuming the user's code is already loaded in the context.
    // It should return boolean (true for pass, false for fail)
    testCode: string;
  }[];
}

const CHALLENGES: Challenge[] = [
  {
    id: 'debounce-bug',
    title: 'Fix the Broken Debounce',
    description: 'This debounce function is broken. It fires immediately on the first call, but the subsequent calls are not properly debounced and it loses the context (`this`) and arguments. Fix it so it passes all tests.',
    timeLimit: 120,
    initialCode: `function debounce(func, wait) {
  let timeout;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func();
    }, wait);
  }
}

// Do not modify the test exports below
if (typeof module !== 'undefined' && module.exports) {
  module.exports = debounce;
}`,
    tests: [
      {
        description: 'Should execute only once after the wait time',
        testCode: `
          return new Promise((resolve) => {
            let count = 0;
            const debounced = debounce(() => { count++; }, 50);
            debounced();
            debounced();
            debounced();
            setTimeout(() => {
              resolve(count === 1);
            }, 100);
          });
        `
      },
      {
        description: 'Should preserve context and arguments',
        testCode: `
          return new Promise((resolve) => {
            let result = null;
            const obj = {
              val: 42,
              method: debounce(function(a, b) {
                result = this.val + a + b;
              }, 50)
            };
            obj.method(10, 20);
            setTimeout(() => {
              resolve(result === 72);
            }, 100);
          });
        `
      }
    ]
  },
  {
    id: 'memory-leak',
    title: 'Event Emitter Memory Leak',
    description: 'This SimpleEmitter class is leaking memory because the `off` method is not correctly removing the listener. The tests will verify if the listeners array size goes to 0 when removed. Fix the `off` implementation.',
    timeLimit: 180,
    initialCode: `class SimpleEmitter {
  constructor() {
    this.events = {};
  }
  
  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }
  
  off(event, listener) {
    if (!this.events[event]) return;
    // BUG IS HERE: This doesn't correctly remove the listener
    this.events[event] = this.events[event].filter(l => l == listener);
  }
  
  emit(event, ...args) {
    if (!this.events[event]) return;
    this.events[event].forEach(l => l(...args));
  }
}

// Do not modify the test exports below
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SimpleEmitter;
}`,
    tests: [
      {
        description: 'Should add and emit events properly',
        testCode: `
          let count = 0;
          const emitter = new SimpleEmitter();
          emitter.on('ping', () => count++);
          emitter.emit('ping');
          return count === 1;
        `
      },
      {
        description: 'Should completely remove the listener when off is called',
        testCode: `
          const emitter = new SimpleEmitter();
          const fn = () => {};
          emitter.on('test', fn);
          emitter.off('test', fn);
          return emitter.events['test'].length === 0;
        `
      }
    ]
  },
  {
    id: 'closure-loop',
    title: 'The Stale Closure Loop',
    description: 'A classic JavaScript issue. We have a loop that creates functions returning the loop index. However, because of how closures and variable scoping work, all functions return the final value of the loop variable instead of the value at the time the function was created. Fix the code so each function returns its expected index.',
    timeLimit: 120,
    initialCode: `function createFunctions() {
  var callbacks = [];

  for (var i = 0; i < 3; i++) {
    callbacks.push(function() {
      return i;
    });
  }

  return callbacks;
}

// Do not modify the test exports below
if (typeof module !== 'undefined' && module.exports) {
  module.exports = createFunctions;
}`,
    tests: [
      {
        description: 'Each callback should return its respective index',
        testCode: `
         const fns = createFunctions();
         return fns[0]() === 0 && fns[1]() === 1 && fns[2]() === 2;
       `
      },
      {
        description: 'Should return exactly 3 functions',
        testCode: `
         const fns = createFunctions();
         return fns.length === 3 && typeof fns[0] === 'function';
       `
      }
    ]
  },
  {
    id: 'async-array-map',
    title: 'Broken Async Array Map',
    description: 'We have an array of user IDs, and we want to asynchronously fetch user data for all of them and return an array of user names. The current implementation is broken and returns an array of Promises instead of the resolved names. Fix the `fetchUserNames` function.',
    timeLimit: 150,
    initialCode: `// Mock API function (Do not modify)
const getUser = async (id) => {
  const users = { 1: { name: 'Alice' }, 2: { name: 'Bob' }, 3: { name: 'Charlie' } };
  return new Promise(resolve => setTimeout(() => resolve(users[id]), 10));
};

async function fetchUserNames(userIds) {
  // BUG IS HERE
  const names = userIds.map(async (id) => {
    const user = await getUser(id);
    return user.name;
  });
  
  return names;
}

// Do not modify the test exports below
if (typeof module !== 'undefined' && module.exports) {
  module.exports = fetchUserNames;
}`,
    tests: [
      {
        description: 'Should return an array of resolved user names, not promises',
        testCode: `
          return fetchUserNames([1, 2, 3]).then(names => {
            return Array.isArray(names) && names.length === 3 && names[0] === 'Alice' && names[1] === 'Bob' && names[2] === 'Charlie';
          }).catch(() => false);
        `
      }
    ]
  },
  {
    id: 'this-context-loss',
    title: 'Losing "this" Context',
    description: 'The `Counter` object has an `incrementLater` method that schedules an increment after a delay. However, the interval is losing the `this` context, so the count is not actually incrementing on the object. Fix the method so the context is preserved.',
    timeLimit: 120,
    initialCode: `const Counter = {
  count: 0,
  incrementLater: function() {
    // BUG IS HERE
    setTimeout(function() {
      this.count++;
    }, 10);
  }
};

// Do not modify the test exports below
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Counter;
}`,
    tests: [
      {
        description: 'Should increment the count property on the Counter object',
        testCode: `
          return new Promise(resolve => {
            Counter.count = 0; // reset
            Counter.incrementLater();
            setTimeout(() => {
              resolve(Counter.count === 1);
            }, 30);
          });
        `
      }
    ]
  }
];

interface LiveDebuggingLabProps {
  onClose?: () => void;
}

export const LiveDebuggingLab: React.FC<LiveDebuggingLabProps> = ({ onClose }) => {
  const [activeChallengeId, setActiveChallengeId] = useState<string>(CHALLENGES[0].id);
  const [code, setCode] = useState<string>(CHALLENGES[0].initialCode);

  const [timeLeft, setTimeLeft] = useState<number>(CHALLENGES[0].timeLimit);
  const [timerActive, setTimerActive] = useState(false);

  const [testResults, setTestResults] = useState<{ pass: boolean; error?: string }[] | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const activeChallenge = CHALLENGES.find(c => c.id === activeChallengeId) || CHALLENGES[0];
  const editorRef = useRef<any>(null);

  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;
  };

  const startChallenge = (challengeId: string) => {
    const challenge = CHALLENGES.find(c => c.id === challengeId)!;
    setActiveChallengeId(challenge.id);
    setCode(challenge.initialCode);
    setTimeLeft(challenge.timeLimit);
    setTestResults(null);
    setTimerActive(true);
    setIsRunning(false);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const runTests = async () => {
    setIsRunning(true);
    setTestResults(null);
    const results: { pass: boolean; error?: string }[] = [];

    const testExecutionScope = async (testCode: string, userCode: string) => {
      try {
        // We construct an async function block that has the user's code, followed by the test's evaluation
        const AsyncFunction = Object.getPrototypeOf(async function () { }).constructor;

        // Remove export statements if any, just to safely run in browser scope
        const safeUserCode = userCode.replace(/module\.exports\s*=\s*[a-zA-Z0-9_]+;/g, '');

        const evaluationCode = `
          ${safeUserCode}
          ${testCode}
        `;

        const fn = new AsyncFunction(evaluationCode);
        const result = await Promise.resolve(fn());
        return { pass: result === true };
      } catch (err: any) {
        return { pass: false, error: err.message || String(err) };
      }
    };

    for (let i = 0; i < activeChallenge.tests.length; i++) {
      const test = activeChallenge.tests[i];
      const res = await testExecutionScope(test.testCode, code);
      results.push(res);
    }

    setTestResults(results);
    setIsRunning(false);

    // Stop timer if all tests pass
    if (results.every(r => r.pass)) {
      setTimerActive(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-900 p-6 h-full w-full flex flex-col"
    >
      {/* Header */}
      <div className="relative z-10 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-500 rounded-lg blur-lg opacity-40 animate-pulse"></div>
            <div className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
              <Bug className="w-5 h-5 text-white" />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              Performance & Debugging Labs
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">PRO / LIVE</span>
            </h3>
            <p className="text-sm text-slate-400">Fix broken code and memory leaks under pressure to pass technical rounds.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono font-bold ${timeLeft <= 30 && timerActive ? 'bg-red-500/20 text-red-400 animate-pulse border border-red-500/50' : 'bg-slate-800 text-emerald-400 border border-slate-700'}`}>
            <Clock className="w-4 h-4" />
            {formatTime(timeLeft)}
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10 flex-1 min-h-0">

        {/* Left Sidebar - Challenges */}
        <div className="col-span-1 lg:col-span-3 order-1 flex flex-col gap-4 overflow-y-auto pr-2">
          <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-4">
            <h4 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">Select Bug</h4>
            <div className="space-y-2">
              {CHALLENGES.map((challenge) => (
                <button
                  key={challenge.id}
                  onClick={() => startChallenge(challenge.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-all flex flex-col gap-1 ${activeChallengeId === challenge.id ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-600'}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-sm leading-tight">{challenge.title}</span>
                    {activeChallengeId === challenge.id && <ChevronRight className="w-4 h-4 flex-shrink-0 mt-0.5" />}
                  </div>
                  <div className="flex items-center gap-1 text-[10px] opacity-70">
                    <Clock className="w-3 h-3" /> {Math.floor(challenge.timeLimit / 60)}m
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Mission Briefing */}
        <div className="col-span-1 lg:col-span-3 order-3 flex flex-col gap-4 overflow-y-auto lg:pr-2">
          <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-4 flex-1">
            <h4 className="text-sm font-bold text-white mb-2 uppercase tracking-wider flex items-center gap-2">
              <Info className="w-4 h-4 text-blue-400" /> Mission Briefing
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              {activeChallenge.description}
            </p>

            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
              <h5 className="text-xs font-bold text-slate-400 uppercase mb-2">Tests to Pass:</h5>
              <ul className="space-y-2">
                {activeChallenge.tests.map((t, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <div className="mt-0.5">
                      {testResults ? (
                        testResults[idx]?.pass ? (
                          <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                        ) : (
                          <XCircle className="w-3 h-3 text-red-400 flex-shrink-0" />
                        )
                      ) : (
                        <span className="w-3 h-3 rounded-full border border-slate-600 inline-block flex-shrink-0" />
                      )}
                    </div>
                    <div>
                      {t.description}
                      {testResults && !testResults[idx]?.pass && testResults[idx]?.error && (
                        <div className="text-red-400 mt-1 font-mono text-[10px] bg-red-500/10 p-1 rounded break-all">
                          {testResults[idx].error}
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {testResults && testResults.every(r => r.pass) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4 bg-emerald-500/20 border border-emerald-500/50 p-3 rounded-lg text-center"
              >
                <div className="font-bold text-emerald-400 text-sm mb-1">Mission Accomplished! 🎉</div>
                <div className="text-emerald-300/80 text-xs">You successfully fixed the bug with {formatTime(timeLeft)} left on the clock.</div>
              </motion.div>
            )}

            {timeLeft === 0 && (!testResults || !testResults.every(r => r.pass)) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 bg-red-500/20 border border-red-500/50 p-3 rounded-lg text-center"
              >
                <div className="font-bold text-red-400 text-sm mb-1">Time's Up! ⏰</div>
                <div className="text-red-300/80 text-xs">You ran out of time. Review the solution or try again.</div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Middle Content Area - Editor */}
        <div className="col-span-1 lg:col-span-6 order-2 flex flex-col bg-slate-900 rounded-xl border border-slate-700 overflow-hidden shadow-inner">
          <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700 flex-shrink-0">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-slate-400" />
              <span className="text-sm font-mono text-slate-300">solution.js</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setCode(activeChallenge.initialCode);
                  setTestResults(null);
                  setTimeLeft(activeChallenge.timeLimit);
                  setTimerActive(true);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs font-semibold rounded-md transition-colors"
                title="Reset code & timer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset
              </button>
              <button
                onClick={runTests}
                disabled={isRunning || (timeLeft === 0 && (!testResults || !testResults.every(r => r.pass)))}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold rounded-md transition-colors disabled:opacity-50 shadow-lg shadow-brand-500/20 hover:shadow-brand-500/40"
              >
                {isRunning ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-white" />}
                Run Tests
              </button>
            </div>
          </div>

          <div className="flex-1 min-h-0 relative">
            <Editor
              height="100%"
              defaultLanguage="javascript"
              value={code}
              onChange={(value) => setCode(value || '')}
              onMount={handleEditorDidMount}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 2,
                wordWrap: 'on',
                padding: { top: 16, bottom: 16 },
                scrollbar: { verticalScrollbarSize: 8, horizontalScrollbarSize: 8 },
              }}
              loading={
                <div className="flex items-center justify-center h-full bg-[#1e1e1e]">
                  <Loader2 className="w-6 h-6 animate-spin text-slate-500" />
                </div>
              }
            />
            {/* Disabled Overlay if time is up and not passed */}
            {timeLeft === 0 && (!testResults || !testResults.every(r => r.pass)) && (
              <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center">
                <Clock className="w-12 h-12 text-red-500 mb-4 animate-pulse opacity-80" />
                <div className="text-xl font-bold text-white mb-2">Testing Window Closed</div>
                <button
                  onClick={() => startChallenge(activeChallengeId)}
                  className="px-6 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white rounded-lg transition-colors flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" /> Try Again
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default LiveDebuggingLab;
