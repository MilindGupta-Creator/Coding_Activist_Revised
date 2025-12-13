import React, { useEffect, useMemo, useState } from 'react';
import { ebookContent } from './ebookContent';
import { TerminalIcon } from './Icons';

interface ExamQuizProps {
  activeModuleId: string;
  onExit: () => void;
}

interface ExamQuestion {
  id: string;
  moduleId: string;
  questionIndex: number; // index in the module's items array
  choices: string[];
  correctIndex: number;
}

// Exam-style question bank based on existing content
// At least ~10 questions per module (js-core, html-css, react-mastery, machine-coding, company-tech, behavioral)
const examQuestionBank: ExamQuestion[] = [
  // ===== JS Core (14 items total, 10+ exam questions) =====
  {
    id: 'js-event-loop-basic',
    moduleId: 'js-core',
    questionIndex: 0, // Q1: setTimeout works / Event Loop
    choices: [
      'setTimeout blocks the main thread until the delay finishes',
      'setTimeout schedules a callback to run later via the Event Loop',
      'setTimeout always runs callbacks before any synchronous code',
      'setTimeout guarantees exact timing to the millisecond',
    ],
    correctIndex: 1,
  },
  {
    id: 'js-object-creation',
    moduleId: 'js-core',
    questionIndex: 1, // Q2: object creation types
    choices: [
      'Object literal, class keyword, JSON.parse',
      'Object literal, constructor function, Object.create',
      'Object literal, Map, WeakMap',
      'Constructor function, JSON.stringify, fetch',
    ],
    correctIndex: 1,
  },
  {
    id: 'js-settimeout-order',
    moduleId: 'js-core',
    questionIndex: 2, // Q3: output order
    choices: ['yo, b, a, i', 'yo, a, i, b', 'a, i, yo, b', 'a, b, i, yo'],
    correctIndex: 1,
  },
  {
    id: 'js-array-reverse-reference',
    moduleId: 'js-core',
    questionIndex: 3, // Q8: reverse + push
    choices: [
      "length: 4, last: ['s']",
      "length: 5, last: ['j','o','n','e','s']",
      "length: 4, last: ['j','o','n','e','s']",
      "length: 5, last: ['s','e','n','o','j']",
    ],
    correctIndex: 1,
  },
  {
    id: 'js-closure-delete-var',
    moduleId: 'js-core',
    questionIndex: 4, // Q11: delete x
    choices: ['undefined', '0', '1', 'ReferenceError'],
    correctIndex: 2,
  },
  {
    id: 'js-performance-minify',
    moduleId: 'js-core',
    questionIndex: 5, // Q12: performance techniques
    choices: [
      'Adding more console.log statements',
      'Inlining all third-party libraries into one huge file',
      'Using minification, compression, and code splitting',
      'Running all scripts synchronously in the head',
    ],
    correctIndex: 2,
  },
  {
    id: 'js-prototype-inheritance',
    moduleId: 'js-core',
    questionIndex: 6, // Q13: prototype inheritance
    choices: [
      'Objects copy all properties at creation time',
      'Objects share behavior through a prototype chain',
      'Only classes can have prototypes',
      'Prototypes are only used in TypeScript',
    ],
    correctIndex: 1,
  },
  {
    id: 'js-set-unique',
    moduleId: 'js-core',
    questionIndex: 8, // Q18: remove duplicates
    choices: [
      'Use a for-loop and splice items while iterating',
      'Use a Set to keep only unique values',
      'Sort the array and take the first N elements',
      'Convert to string and back again',
    ],
    correctIndex: 1,
  },
  {
    id: 'js-plus-coercion',
    moduleId: 'js-core',
    questionIndex: 9, // Q20: 3 + 2 + "7"
    choices: ['"327"', '"57"', '12', '"3+2+7"'],
    correctIndex: 1,
  },
  {
    id: 'js-scope-const',
    moduleId: 'js-core',
    questionIndex: 10, // Q21: const scope
    choices: ["white_rabbit", "ginger_rabbit", 'ReferenceError', 'undefined'],
    correctIndex: 0,
  },
  {
    id: 'js-scope-let-tdz',
    moduleId: 'js-core',
    questionIndex: 11, // Q22: TDZ
    choices: ['42', '1337', 'undefined', 'ReferenceError'],
    correctIndex: 3,
  },
  {
    id: 'js-decode-search',
    moduleId: 'js-core',
    questionIndex: 12, // Q28: decode search string
    choices: [
      'encodeURIComponent',
      'JSON.parse',
      'URLSearchParams or decodeURIComponent',
      'atob',
    ],
    correctIndex: 2,
  },
  {
    id: 'js-this-arrow',
    moduleId: 'js-core',
    questionIndex: 13, // Q39: this in arrow vs regular
    choices: [
      'Both log "Alice"',
      'Both log undefined',
      'regular logs "Alice", arrow logs undefined',
      'regular logs undefined, arrow logs "Alice"',
    ],
    correctIndex: 2,
  },

  // ===== HTML + CSS (10 items, 10+ exam questions) =====
  {
    id: 'html5-vs-html',
    moduleId: 'html-css',
    questionIndex: 0, // Q4: HTML5 vs HTML
    choices: [
      'HTML5 removes support for audio/video',
      'HTML5 adds semantics, media, storage, and new APIs',
      'HTML5 is only about new CSS features',
      'HTML5 is a completely different language from HTML',
    ],
    correctIndex: 1,
  },
  {
    id: 'html-doctype',
    moduleId: 'html-css',
    questionIndex: 1, // Q5: !DOCTYPE
    choices: [
      'Defines the page title',
      'Tells browser to use Standards Mode',
      'Links external CSS',
      'Enables JavaScript execution',
    ],
    correctIndex: 1,
  },
  {
    id: 'css-inline-inlineblock',
    moduleId: 'html-css',
    questionIndex: 2, // Q9: inline vs inline-block
    choices: [
      'Inline respects width/height, inline-block does not',
      'Inline elements always start on a new line',
      'Inline-block flows like text but respects width/height',
      'Inline-block cannot have padding or margin',
    ],
    correctIndex: 2,
  },
  {
    id: 'html-span-tag',
    moduleId: 'html-css',
    questionIndex: 3, // Q10: span tag
    choices: [
      'A block-level container for layout',
      'A generic inline container for styling/grouping text',
      'A tag that always renders bold text',
      'A semantic tag for navigation',
    ],
    correctIndex: 1,
  },
  {
    id: 'css-positions',
    moduleId: 'html-css',
    questionIndex: 4, // Q15/Q23: positions
    choices: [
      'static, relative, absolute, fixed, sticky',
      'static, grid, flex, inline, block',
      'absolute, fluid, responsive, sticky',
      'relative, fixed, float, center',
    ],
    correctIndex: 0,
  },
  {
    id: 'css-pseudo',
    moduleId: 'html-css',
    questionIndex: 5, // Q16: pseudo classes/elements
    choices: [
      ':hover and ::before are both pseudo-elements',
      ':hover is a pseudo-class, ::before is a pseudo-element',
      'Pseudo-classes and pseudo-elements are identical',
      'Pseudo-elements must always start with one colon',
    ],
    correctIndex: 1,
  },
  {
    id: 'rest-put-post',
    moduleId: 'html-css',
    questionIndex: 6, // Q19: PUT vs POST
    choices: [
      'POST is idempotent, PUT is not',
      'Both POST and PUT are always idempotent',
      'PUT is idempotent, POST is not',
      'Neither POST nor PUT can send a body',
    ],
    correctIndex: 2,
  },
  {
    id: 'css-color-specificity',
    moduleId: 'html-css',
    questionIndex: 7, // Q24: color of text
    choices: ['Green', 'Blue', 'Red', 'Purple'],
    correctIndex: 0,
  },
  {
    id: 'css-concentric-circles',
    moduleId: 'html-css',
    questionIndex: 8, // Q27: concentric circles
    choices: [
      'Use table layout with border-collapse',
      'Use nested divs with border-radius: 50% or a radial-gradient',
      'Use only <canvas>, CSS cannot draw circles',
      'Use <marquee> tags for circular motion',
    ],
    correctIndex: 1,
  },
  {
    id: 'css-specificity-importance',
    moduleId: 'html-css',
    questionIndex: 9, // Q41: why specificity matters
    choices: [
      'It randomly chooses which styles to apply',
      'It ensures predictable overriding when multiple rules match',
      'It disables inline styles',
      'It only affects media queries',
    ],
    correctIndex: 1,
  },

  // ===== React Mastery (10+ exam questions) =====
  {
    id: 'react-virtual-dom',
    moduleId: 'react-mastery',
    questionIndex: 0, // Q6/Q7: Virtual DOM
    choices: [
      'It directly manipulates the real DOM for every change',
      'It is an in-memory representation used to compute minimal DOM updates',
      'It is a CSS-only feature for styling components',
      'It is a Node.js-only optimization',
    ],
    correctIndex: 1,
  },
  {
    id: 'react-pure-component',
    moduleId: 'react-mastery',
    questionIndex: 1, // Q14: Pure Component
    choices: [
      'A component that never re-renders',
      'A component that renders same output for same props/state',
      'Any functional component',
      'Any class component using setState',
    ],
    correctIndex: 1,
  },
  {
    id: 'react-useref',
    moduleId: 'react-mastery',
    questionIndex: 2, // Q25: useRef
    choices: [
      'A hook for HTTP requests',
      'A hook for memoizing values',
      'A hook returning a mutable .current that does not trigger re-renders',
      'A hook for global state management',
    ],
    correctIndex: 2,
  },
  {
    id: 'react-performance',
    moduleId: 'react-mastery',
    questionIndex: 3, // Q26: performance
    choices: [
      'Re-render everything on every state change',
      'Use React.memo, useMemo/useCallback, and list virtualization',
      'Avoid code splitting to reduce file count',
      'Use inline functions everywhere',
    ],
    correctIndex: 1,
  },
  {
    id: 'nextjs-vs-react',
    moduleId: 'react-mastery',
    questionIndex: 4, // Q29: NextJS differences
    choices: [
      'Next.js is a CSS framework',
      'Next.js adds SSR/SSG, routing, API routes, and optimizations on top of React',
      'Next.js replaces JavaScript with TypeScript',
      'Next.js only works for mobile apps',
    ],
    correctIndex: 1,
  },
  {
    id: 'react-ssr-definition',
    moduleId: 'react-mastery',
    questionIndex: 5, // Q30: SSR
    choices: [
      'Rendering JSX only on the client',
      'Server generating full HTML before sending to client',
      'Rendering components inside Web Workers',
      'Rendering only CSS on the server',
    ],
    correctIndex: 1,
  },
  {
    id: 'csr-vs-ssr',
    moduleId: 'react-mastery',
    questionIndex: 6, // Q31: CSR vs SSR
    choices: [
      'CSR sends full HTML; SSR sends only JSON',
      'CSR builds UI in browser; SSR sends pre-rendered HTML',
      'CSR and SSR are identical in performance',
      'SSR cannot hydrate on the client',
    ],
    correctIndex: 1,
  },
  {
    id: 'react-reconciliation',
    moduleId: 'react-mastery',
    questionIndex: 7, // Q32: Reconciliation
    choices: [
      'Process of compiling JSX to JS',
      'Process of syncing Virtual DOM with Real DOM using diffing',
      'Process of bundling code with Webpack',
      'Process of deploying React apps',
    ],
    correctIndex: 1,
  },
  {
    id: 'hoc-definition',
    moduleId: 'react-mastery',
    questionIndex: 8, // Q33/Q34: HOC
    choices: [
      'A function that returns JSX directly',
      'A function that takes a component and returns an enhanced component',
      'A way to declare class components',
      'A special React hook',
    ],
    correctIndex: 1,
  },
  {
    id: 'custom-hooks',
    moduleId: 'react-mastery',
    questionIndex: 9, // Q35: Custom Hooks
    choices: [
      'Functions that can only be used in class components',
      'Functions starting with use that can call other hooks to share logic',
      'Any helper function',
      'Functions that render JSX',
    ],
    correctIndex: 1,
  },
  {
    id: 'hoc-vs-hooks',
    moduleId: 'react-mastery',
    questionIndex: 10, // Q36: HOC vs Hooks
    choices: [
      'HOCs and Hooks are identical',
      'HOCs share UI and logic; hooks can only share UI',
      'Hooks share logic inside components; HOCs wrap components and can cause wrapper hell',
      'Hooks replace React context',
    ],
    correctIndex: 2,
  },
  {
    id: 'useeffect-basics',
    moduleId: 'react-mastery',
    questionIndex: 11, // Q37: useEffect
    choices: [
      'Runs before every render and blocks paint',
      'Used for side effects like data fetching and subscriptions, with cleanup',
      'Only used for styling',
      'Only runs when the app closes',
    ],
    correctIndex: 1,
  },
  {
    id: 'useeffect-misunderstandings',
    moduleId: 'react-mastery',
    questionIndex: 12, // Q38: misunderstandings
    choices: [
      'It always runs before paint',
      'Dependencies are optional and never matter',
      'Missing dependencies can cause stale closures and bugs',
      'Cleanup functions are forbidden',
    ],
    correctIndex: 2,
  },
  {
    id: 'react-batching',
    moduleId: 'react-mastery',
    questionIndex: 13, // Q40: batching
    choices: [
      'React always re-renders once per setState call',
      'React batches multiple state updates into a single render, especially in React 18',
      'Batching only works in class components',
      'Batching disables hooks',
    ],
    correctIndex: 1,
  },

  // ===== Machine Coding & DSA (10+ exam questions) =====
  {
    id: 'mc-fetch-products',
    moduleId: 'machine-coding',
    questionIndex: 0, // Machine Coding A
    choices: [
      'Use useEffect with debounce and proper loading/error states',
      'Call fetch directly in render',
      'Block UI until all products load synchronously',
      'Poll the API every 100ms unconditionally',
    ],
    correctIndex: 0,
  },
  {
    id: 'mc-stopwatch-drift',
    moduleId: 'machine-coding',
    questionIndex: 1, // Stopwatch
    choices: [
      'Increment a counter blindly in setInterval',
      'Use Date.now() to compute elapsed time to avoid drift',
      'Use CSS animations only',
      'Store elapsed time in localStorage only',
    ],
    correctIndex: 1,
  },
  {
    id: 'dsa-next-permutation',
    moduleId: 'machine-coding',
    questionIndex: 2, // DSA A
    choices: [
      'Reverse the entire array',
      'Sort the array descending',
      'Find pivot k, swap with next larger l, then reverse suffix',
      'Always rotate by one position',
    ],
    correctIndex: 2,
  },
  {
    id: 'dsa-string-compression',
    moduleId: 'machine-coding',
    questionIndex: 3, // DSA B
    choices: [
      'Remove all duplicate characters globally',
      'Count consecutive characters and append char+count',
      'Sort characters alphabetically',
      'Use a Set and join',
    ],
    correctIndex: 1,
  },
  {
    id: 'dsa-pivot-index',
    moduleId: 'machine-coding',
    questionIndex: 4, // DSA C
    choices: [
      'Index where left sum equals right sum',
      'Index of maximum value',
      'Index of minimum value',
      'Index where array is sorted',
    ],
    correctIndex: 0,
  },
  {
    id: 'dsa-flatten-array',
    moduleId: 'machine-coding',
    questionIndex: 5, // DSA D
    choices: [
      'Use recursion or reduce to flatten nested arrays',
      'Convert array to string and split by comma',
      'Only flatten one level with concat',
      'Flattening is impossible in JS',
    ],
    correctIndex: 0,
  },
  {
    id: 'dsa-longest-substring',
    moduleId: 'machine-coding',
    questionIndex: 6, // DSA E
    choices: [
      'Use nested loops with O(n^2) time',
      'Use sliding window with Set/Map and two pointers',
      'Sort the string first',
      'Use recursion with exponential time',
    ],
    correctIndex: 1,
  },
  {
    id: 'dsa-merge-intervals',
    moduleId: 'machine-coding',
    questionIndex: 7, // DSA F
    choices: [
      'Sort by start time then merge overlapping intervals',
      'Sort by end time then always split intervals',
      'Randomly merge intervals',
      'Use BFS on all intervals',
    ],
    correctIndex: 0,
  },
  {
    id: 'dsa-lru-cache',
    moduleId: 'machine-coding',
    questionIndex: 8, // DSA G
    choices: [
      'Array only',
      'HashMap + doubly linked list for O(1) get/put',
      'Single linked list only',
      'LocalStorage only',
    ],
    correctIndex: 1,
  },
  {
    id: 'mc-autocomplete',
    moduleId: 'machine-coding',
    questionIndex: 9, // Machine Coding C / D (use index 9 for autocomplete? actually 9 is Machine Coding D, 8 is C; adjust)
    choices: [
      'Fetch on every keypress without debounce',
      'Debounce API calls, show dropdown, support keyboard navigation',
      'Render all possible results without scrolling',
      'Use only server-side rendering',
    ],
    correctIndex: 1,
  },

  // ===== Company-specific & System Design (10 exam questions) =====
  {
    id: 'company-amazon-debounce',
    moduleId: 'company-tech',
    questionIndex: 0, // Amazon
    choices: [
      'Debounce search input and cache results',
      'Call API on every pixel of scroll',
      'Avoid virtualization entirely',
      'Render everything in a single canvas',
    ],
    correctIndex: 0,
  },
  {
    id: 'company-google-infinite-scroll',
    moduleId: 'company-tech',
    questionIndex: 1, // Google
    choices: [
      'Use IntersectionObserver + virtualization',
      'Load all pages at once',
      'Use setInterval to poll scroll position constantly',
      'Disable lazy loading',
    ],
    correctIndex: 0,
  },
  {
    id: 'company-meta-optimistic-ui',
    moduleId: 'company-tech',
    questionIndex: 2, // Meta
    choices: [
      'Wait for server before updating UI',
      'Update UI immediately and revert on failure',
      'Never show loading spinners',
      'Always reload page after actions',
    ],
    correctIndex: 1,
  },
  {
    id: 'company-microsoft-collab',
    moduleId: 'company-tech',
    questionIndex: 3, // Microsoft
    choices: [
      'Use WebSockets + OT/CRDTs for collaborative editing',
      'Use only localStorage to sync',
      'Poll the server every second with full document',
      'Use alerts to send updates',
    ],
    correctIndex: 0,
  },
  {
    id: 'company-swiggy-filters',
    moduleId: 'company-tech',
    questionIndex: 4, // Swiggy/Zomato
    choices: [
      'Always filter on client regardless of data size',
      'Choose between client-side and server-side filtering based on dataset and use case',
      'Never cache filter results',
      'Use only SQL on client',
    ],
    correctIndex: 1,
  },
  {
    id: 'company-flipkart-comparison',
    moduleId: 'company-tech',
    questionIndex: 5, // Flipkart/Amazon
    choices: [
      'Display products without highlighting diffs',
      'Provide side-by-side comparison and diffing of specs',
      'Show only one product at a time',
      'Use PDF export only',
    ],
    correctIndex: 1,
  },
  {
    id: 'company-uber-maps',
    moduleId: 'company-tech',
    questionIndex: 6, // Uber/Ola
    choices: [
      'Use Map SDK and update marker positions via socket events',
      'Use static images only',
      'Reload map on every position change',
      'Poll backend once per hour',
    ],
    correctIndex: 0,
  },
  {
    id: 'company-netflix-carousel',
    moduleId: 'company-tech',
    questionIndex: 7, // Netflix
    choices: [
      'Use horizontal scroll with snap and lazy-loaded images',
      'Render each movie as a separate page',
      'Avoid lazy loading to simplify code',
      'Use only iframes',
    ],
    correctIndex: 0,
  },
  {
    id: 'company-payments-dashboard',
    moduleId: 'company-tech',
    questionIndex: 8, // Payments
    choices: [
      'Ignore security in gateway integration',
      'Use proper SDK integration and charts on dashboard (Chart.js/Recharts)',
      'Render all charts with plain text',
      'Handle payments entirely on client',
    ],
    correctIndex: 1,
  },
  {
    id: 'company-shopping-cart',
    moduleId: 'company-tech',
    questionIndex: 9, // Shopping Cart
    choices: [
      'Keep separate carts per tab with no sync',
      'Merge local cart with server cart on login and sync via BroadcastChannel',
      'Always clear cart on login',
      'Store cart only in cookies',
    ],
    correctIndex: 1,
  },
  {
    id: 'company-calendar',
    moduleId: 'company-tech',
    questionIndex: 10, // Google Calendar
    choices: [
      'Use CSS Grid and absolute positioning for events with virtualization for large views',
      'Render each day as a separate page without grid',
      'Avoid virtualization entirely',
      'Use tables only',
    ],
    correctIndex: 0,
  },

  // ===== Behavioral (10 exam-style questions referencing 3 items) =====
  {
    id: 'beh-switch-reason',
    moduleId: 'behavioral',
    questionIndex: 0,
    choices: [
      'Complain about your current manager in detail',
      'Focus on growth and new challenges without badmouthing',
      'Say you want a higher title only',
      'Explain you dislike working in teams',
    ],
    correctIndex: 1,
  },
  {
    id: 'beh-star-method',
    moduleId: 'behavioral',
    questionIndex: 1,
    choices: [
      'Situation, Task, Action, Result',
      'Setup, Task, Analysis, Review',
      'Start, Try, Act, Repeat',
      'Story, Talk, Act, Result',
    ],
    correctIndex: 0,
  },
  {
    id: 'beh-general-tips-dsa',
    moduleId: 'behavioral',
    questionIndex: 2,
    choices: [
      'Skip DSA entirely for frontend roles',
      'Include some DSA even for frontend roles',
      'Only talk about CSS, never algorithms',
      'Refuse to code during interviews',
    ],
    correctIndex: 1,
  },
  {
    id: 'beh-calm',
    moduleId: 'behavioral',
    questionIndex: 2,
    choices: [
      'Panic and apologize repeatedly',
      'Interact calmly; everyone is nervous',
      'Refuse to answer questions',
      'Interrupt interviewer frequently',
    ],
    correctIndex: 1,
  },
  {
    id: 'beh-clarifying-questions',
    moduleId: 'behavioral',
    questionIndex: 2,
    choices: [
      'Start coding immediately without clarifying',
      'Ask clarifying questions before coding',
      'Only ask questions after coding',
      'Never ask questions',
    ],
    correctIndex: 1,
  },
  {
    id: 'beh-difficult-project',
    moduleId: 'behavioral',
    questionIndex: 1,
    choices: [
      'Describe random tasks without structure',
      'Use STAR: Situation, Task, Action, Result',
      'Only talk about tools used',
      'Focus only on failures without learnings',
    ],
    correctIndex: 1,
  },
  {
    id: 'beh-cant-solve',
    moduleId: 'behavioral',
    questionIndex: 2,
    choices: [
      'Stay silent and give up',
      'Discuss your thought process even if you cannot fully solve it',
      'Argue with the interviewer',
      'Search the web mid-interview',
    ],
    correctIndex: 1,
  },
  {
    id: 'beh-negative-talk',
    moduleId: 'behavioral',
    questionIndex: 0,
    choices: [
      'Openly badmouth your current employer',
      'Avoid badmouthing and keep focus on your goals',
      'Share gossip about coworkers',
      'Describe confidential company details',
    ],
    correctIndex: 1,
  },
  {
    id: 'beh-team-attitude',
    moduleId: 'behavioral',
    questionIndex: 2,
    choices: [
      'Show willingness to collaborate and communicate',
      'Emphasize that you dislike feedback',
      'Refuse to work with product/design',
      'Avoid mentioning teamwork',
    ],
    correctIndex: 0,
  },
  {
    id: 'beh-prep-strategy',
    moduleId: 'behavioral',
    questionIndex: 2,
    choices: [
      'Never practice beforehand',
      'Prepare stories in advance and practice answering out loud',
      'Rely solely on improvisation',
      'Read from a script during the interview',
    ],
    correctIndex: 1,
  },
];

const formatTime = (seconds: number) => {
  const safe = Math.max(0, seconds);
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  const mm = mins.toString().padStart(2, '0');
  const ss = secs.toString().padStart(2, '0');
  return `${mm}:${ss}`;
};

const ExamQuiz: React.FC<ExamQuizProps> = ({ activeModuleId, onExit }) => {
  const [started, setStarted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [answers, setAnswers] = useState<number[]>([]);

  // Prefer questions from the active module, fall back to the full bank
  const availablePool = useMemo(() => {
    const scoped = examQuestionBank.filter(q => q.moduleId === activeModuleId);
    return scoped.length > 0 ? scoped : examQuestionBank;
  }, [activeModuleId]);

  const totalQuestions = questions.length;

  const currentQuestion = totalQuestions > 0 ? questions[currentIndex] : null;

  const currentAnswer = currentQuestion
    ? answers[currentIndex] ?? -1
    : -1;

  const score = useMemo(() => {
    if (!submitted || totalQuestions === 0) return null;
    let correct = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.correctIndex) correct++;
    });
    return { correct, total: totalQuestions };
  }, [submitted, questions, answers, totalQuestions]);

  // Handle countdown
  useEffect(() => {
    if (!started || submitted) return;
    const id = window.setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          window.clearInterval(id);
          setSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(id);
  }, [started, submitted]);

  const resolveQuestionContent = (q: ExamQuestion) => {
    const module = ebookContent.find(m => m.id === q.moduleId);
    const item = module?.items?.[q.questionIndex];
    if (!item) {
      return {
        text: 'Question not found in content.',
        code: undefined as string | undefined,
      };
    }
    const text = item.q.replace(/^Q\d+\.\s*/i, '');
    return { text, code: item.code };
  };

  const startExam = () => {
    const pool = [...availablePool];
    // Shuffle questions
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    setQuestions(pool);
    setAnswers(new Array(pool.length).fill(-1));
    setCurrentIndex(0);
    setTimeLeft(15 * 60);
    setStarted(true);
    setSubmitted(false);
  };

  const handleSelectChoice = (choiceIndex: number) => {
    if (!currentQuestion || submitted) return;
    setAnswers(prev => {
      const next = [...prev];
      next[currentIndex] = choiceIndex;
      return next;
    });
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (!started) {
    return (
      <div className="border border-slate-800 rounded-2xl p-6 md:p-8 bg-slate-900/60">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-xs font-mono text-brand-400 uppercase tracking-[0.25em] mb-1">
              Exam Mode
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Timed exam based on real questions
            </h2>
          </div>
          <button
            onClick={onExit}
            className="text-xs text-slate-400 hover:text-slate-200 border border-slate-700 rounded-full px-3 py-1"
          >
            Exit
          </button>
        </div>
        <p className="text-sm text-slate-400 mb-4">
          You&apos;ll get a shuffled set of questions taken directly from the content.
          Each question is multiple-choice, and you have{' '}
          <span className="font-semibold text-slate-200">15 minutes</span> to answer all of them.
        </p>
        <ul className="text-xs text-slate-500 list-disc list-inside mb-6 space-y-1">
          <li>Questions are scoped to the current module when possible.</li>
          <li>You can move back and forth between questions before submitting.</li>
          <li>When time runs out, your exam is auto-submitted.</li>
        </ul>
        <button
          onClick={startExam}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-brand-500 to-purple-500 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 hover:opacity-95 transition"
        >
          Start exam
        </button>
      </div>
    );
  }

  if (!currentQuestion || totalQuestions === 0) {
    return (
      <div className="border border-slate-800 rounded-2xl p-6 md:p-8 bg-slate-900/60">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Exam Mode</h2>
          <button
            onClick={onExit}
            className="text-xs text-slate-400 hover:text-slate-200 border border-slate-700 rounded-full px-3 py-1"
          >
            Exit
          </button>
        </div>
        <p className="text-sm text-slate-400">
          No exam questions are configured yet for this module.
        </p>
      </div>
    );
  }

  const { text, code } = resolveQuestionContent(currentQuestion);

  return (
    <div className="border border-slate-800 rounded-2xl p-6 md:p-8 bg-slate-900/60 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="text-xs font-mono text-brand-400 uppercase tracking-[0.25em] mb-1">
            Exam Mode
          </div>
          <h2 className="text-lg md:text-2xl font-semibold text-white">
            Question {currentIndex + 1} of {totalQuestions}
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono px-3 py-1.5 rounded-full bg-slate-800 text-slate-200 border border-slate-700">
            ⏱ {formatTime(timeLeft)}
          </span>
          <button
            onClick={onExit}
            className="text-xs text-slate-400 hover:text-slate-200 border border-slate-700 rounded-full px-3 py-1"
          >
            Exit
          </button>
        </div>
      </div>

      {/* Question body */}
      <div>
        <h3 className="text-base md:text-lg font-semibold text-slate-100 mb-3">
          {text}
        </h3>
        {code && (
          <div className="relative mt-3 mb-5 rounded-lg overflow-hidden border border-slate-800 bg-[#0c0e14] shadow-lg">
            <div className="flex items-center justify-between px-4 py-2 bg-[#1a1d24] border-b border-slate-800">
              <span className="text-xs text-slate-500 font-mono flex items-center gap-2">
                <TerminalIcon className="w-3 h-3" /> question.js
              </span>
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-red-500/20" />
                <span className="w-2 h-2 rounded-full bg-yellow-500/20" />
                <span className="w-2 h-2 rounded-full bg-green-500/20" />
              </div>
            </div>
            <pre className="p-4 overflow-x-auto text-sm font-mono text-blue-300 select-none">
              <code>{code}</code>
            </pre>
            <div
              className="absolute inset-0 z-10 bg-transparent"
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>
        )}
      </div>

      {/* Choices */}
      <div className="space-y-2">
        {currentQuestion.choices.map((choice, idx) => {
          const isSelected = currentAnswer === idx;
          const isCorrect = submitted && idx === currentQuestion.correctIndex;
          const isWrongSelection =
            submitted && isSelected && idx !== currentQuestion.correctIndex;

          let borderClass = 'border-slate-700';
          let bgClass = 'bg-slate-900/60';
          let textClass = 'text-slate-200';

          if (!submitted && isSelected) {
            borderClass = 'border-brand-500';
            bgClass = 'bg-brand-500/10';
          }

          if (submitted) {
            if (isCorrect) {
              borderClass = 'border-green-500';
              bgClass = 'bg-green-500/10';
              textClass = 'text-green-200';
            } else if (isWrongSelection) {
              borderClass = 'border-red-500';
              bgClass = 'bg-red-500/10';
              textClass = 'text-red-200';
            } else {
              textClass = 'text-slate-400';
            }
          }

          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectChoice(idx)}
              className={`w-full text-left px-4 py-2.5 rounded-lg border ${borderClass} ${bgClass} ${textClass} text-sm flex items-center gap-3 transition-colors`}
            >
              <span className="w-6 h-6 rounded-full border border-slate-500 flex items-center justify-center text-[11px] font-semibold">
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="flex-1">{choice}</span>
            </button>
          );
        })}
      </div>

      {/* Navigation + submit */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pt-3 border-t border-slate-800">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="px-3 py-1.5 rounded-full border border-slate-700 text-xs text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors"
          >
            ← Previous
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={currentIndex === totalQuestions - 1}
            className="px-3 py-1.5 rounded-full border border-slate-700 text-xs text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors"
          >
            Next →
          </button>
        </div>

        <div className="flex items-center gap-3">
          {score && (
            <span className="text-xs text-slate-400">
              Score:{' '}
              <span className="font-semibold text-slate-100">
                {score.correct} / {score.total}
              </span>
            </span>
          )}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitted}
            className={`px-4 py-2 rounded-full text-xs font-semibold ${
              submitted
                ? 'bg-slate-800 text-slate-400 cursor-default'
                : 'bg-gradient-to-r from-brand-500 to-purple-500 text-white hover:opacity-95'
            } transition`}
          >
            {submitted ? 'Submitted' : 'Submit exam'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamQuiz;


