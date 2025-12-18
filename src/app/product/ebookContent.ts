export interface ChapterContent {
  id: string;
  title: string;
  items?: {
    q: string;
    a: string;
    code?: string; // Optional code snippet
    diagram?: string; // Optional ASCII / visual diagram
    tags?: string[]; // Companies / topics chips (Google, Meta, Frontend, DSA, etc.)
    followUps?: string[]; // Extra prompts / follow-up interview questions
    playground?: boolean; // Enable interactive code playground for this question
  }[];
  submodules?: ChapterContent[]; // Optional submodules for nested structure
}

// Study Plan types
export interface DayPlan {
  day: number;
  title: string;
  tasks: {
    moduleId: string;
    questionIndices: number[]; // 0-based indices into the module's items array
  }[];
  tip?: string; // Optional daily tip
}

export interface StudyPlan {
  id: string;
  name: string;
  description: string;
  totalDays: number;
  targetRole: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  schedule: DayPlan[];
}

// ==================== STUDY PLANS ====================
export const studyPlans: StudyPlan[] = [
  {
    id: '15-day-crash',
    name: '15-Day Crash Course',
    description: 'Intensive preparation for upcoming interviews. Covers core concepts quickly.',
    totalDays: 15,
    targetRole: 'Frontend Developer',
    difficulty: 'Intermediate',
    schedule: [
      {
        day: 1,
        title: 'JavaScript Fundamentals',
        tasks: [
          { moduleId: 'js-core', questionIndices: [0, 1, 2] } // Event loop, objects, setTimeout
        ],
        tip: 'Focus on understanding the event loop deeply - it comes up in 90% of interviews.'
      },
      {
        day: 2,
        title: 'JavaScript Deep Dive',
        tasks: [
          { moduleId: 'js-core', questionIndices: [3, 4, 5, 6] } // Arrays, closures, performance, prototypes
        ],
        tip: 'Practice explaining closures out loud - verbal clarity matters in interviews.'
      },
      {
        day: 3,
        title: 'Advanced JS Patterns',
        tasks: [
          { moduleId: 'js-core', questionIndices: [7, 8, 9, 10, 11, 12, 13] }
        ],
        tip: 'Write code by hand today. No IDE autocomplete!'
      },
      {
        day: 4,
        title: 'HTML5 & CSS Essentials',
        tasks: [
          { moduleId: 'html-css', questionIndices: [0, 1, 2, 3, 4] }
        ],
        tip: 'CSS specificity is a common gotcha - make sure you can calculate it.'
      },
      {
        day: 5,
        title: 'CSS Advanced & Layout',
        tasks: [
          { moduleId: 'html-css', questionIndices: [5, 6, 7, 8, 9] }
        ],
        tip: 'Build something small with Flexbox/Grid from scratch today.'
      },
      {
        day: 6,
        title: 'React Fundamentals',
        tasks: [
          { moduleId: 'react-mastery', questionIndices: [0, 1, 2, 3] }
        ],
        tip: 'Virtual DOM questions are almost guaranteed - know the reconciliation process.'
      },
      {
        day: 7,
        title: 'React Hooks & Patterns',
        tasks: [
          { moduleId: 'react-mastery', questionIndices: [4, 5, 6, 7] }
        ],
        tip: 'Rest day tip: Review what you learned in Week 1. Spaced repetition works!'
      },
      {
        day: 8,
        title: 'React Advanced',
        tasks: [
          { moduleId: 'react-mastery', questionIndices: [8, 9, 10, 11, 12, 13] }
        ],
        tip: 'HOCs vs Hooks is a classic comparison question. Know the tradeoffs.'
      },
      {
        day: 9,
        title: 'Machine Coding Basics',
        tasks: [
          { moduleId: 'machine-coding', questionIndices: [0, 1] }
        ],
        tip: 'Time yourself! Most machine coding rounds are 45-60 minutes.'
      },
      {
        day: 10,
        title: 'DSA for Frontend',
        tasks: [
          { moduleId: 'machine-coding', questionIndices: [2, 3, 4, 5] }
        ],
        tip: 'Frontend interviews rarely go beyond medium-level DSA. Focus on arrays, strings, objects.'
      },
      {
        day: 11,
        title: 'Advanced DSA & Patterns',
        tasks: [
          { moduleId: 'machine-coding', questionIndices: [6, 7, 8] }
        ],
        tip: 'LRU Cache is a FAANG favorite. Implement it from scratch today.'
      },
      {
        day: 12,
        title: 'Machine Coding Practice',
        tasks: [
          { moduleId: 'machine-coding', questionIndices: [9, 10] }
        ],
        tip: 'Build the autocomplete component end-to-end. Ship it!'
      },
      {
        day: 13,
        title: 'Company-Specific Prep',
        tasks: [
          { moduleId: 'company-tech', questionIndices: [0, 1, 2, 3] }
        ],
        tip: 'Research your target company. Tailor examples to their product.'
      },
      {
        day: 14,
        title: 'System Design & More',
        tasks: [
          { moduleId: 'company-tech', questionIndices: [4, 5, 6, 7, 8, 9, 10] }
        ],
        tip: 'Draw diagrams while explaining system design. Visual communication helps.'
      },
      {
        day: 15,
        title: 'Behavioral & Final Review',
        tasks: [
          { moduleId: 'behavioral', questionIndices: [0, 1, 2] }
        ],
        tip: "You're ready! Trust your preparation. Get good sleep before the interview."
      }
    ]
  },
  {
    id: '30-day-faang',
    name: '30-Day FAANG Frontend',
    description: 'Comprehensive preparation for top tech companies. Deep coverage of all topics.',
    totalDays: 30,
    targetRole: 'Senior Frontend Engineer',
    difficulty: 'Advanced',
    schedule: [
      // Week 1: JavaScript Mastery
      {
        day: 1,
        title: 'Event Loop & Async JS',
        tasks: [{ moduleId: 'js-core', questionIndices: [0, 2] }],
        tip: 'Day 1! Start strong. Event loop is the foundation of everything in JS.'
      },
      {
        day: 2,
        title: 'Objects & Prototypes',
        tasks: [{ moduleId: 'js-core', questionIndices: [1, 6] }],
        tip: 'Understand __proto__ vs prototype. Draw the chain!'
      },
      {
        day: 3,
        title: 'Closures & Scope',
        tasks: [{ moduleId: 'js-core', questionIndices: [4, 9, 10] }],
        tip: 'Closures are used everywhere - debounce, throttle, memoization, private variables.'
      },
      {
        day: 4,
        title: 'Arrays & Mutations',
        tasks: [{ moduleId: 'js-core', questionIndices: [3, 8] }],
        tip: 'Know which array methods mutate and which return new arrays.'
      },
      {
        day: 5,
        title: 'Performance & Loading',
        tasks: [{ moduleId: 'js-core', questionIndices: [5, 7] }],
        tip: 'Web Vitals (LCP, FID, CLS) are crucial for senior roles. Research them.'
      },
      {
        day: 6,
        title: 'this & Arrow Functions',
        tasks: [{ moduleId: 'js-core', questionIndices: [13] }],
        tip: 'Practice explaining "this" binding rules without looking at notes.'
      },
      {
        day: 7,
        title: 'Week 1 Review',
        tasks: [{ moduleId: 'js-core', questionIndices: [11, 12] }],
        tip: '🎉 Week 1 done! Review all JS concepts. Take notes on weak areas.'
      },
      // Week 2: HTML/CSS + React Basics
      {
        day: 8,
        title: 'HTML5 Semantics',
        tasks: [{ moduleId: 'html-css', questionIndices: [0, 1, 3] }],
        tip: 'Semantic HTML improves SEO and accessibility. Know the new HTML5 tags.'
      },
      {
        day: 9,
        title: 'CSS Box Model & Display',
        tasks: [{ moduleId: 'html-css', questionIndices: [2, 4] }],
        tip: 'Inline vs block vs inline-block - classic interview question.'
      },
      {
        day: 10,
        title: 'CSS Specificity & Selectors',
        tasks: [{ moduleId: 'html-css', questionIndices: [5, 7, 9] }],
        tip: 'Calculate specificity: inline=1000, ID=100, class=10, element=1'
      },
      {
        day: 11,
        title: 'Advanced CSS',
        tasks: [{ moduleId: 'html-css', questionIndices: [6, 8] }],
        tip: 'CSS architecture (BEM, SMACSS) shows seniority. Know at least one methodology.'
      },
      {
        day: 12,
        title: 'React Core Concepts',
        tasks: [{ moduleId: 'react-mastery', questionIndices: [0, 5] }],
        tip: 'Virtual DOM + Reconciliation = must-know for any React role.'
      },
      {
        day: 13,
        title: 'React Components & Props',
        tasks: [{ moduleId: 'react-mastery', questionIndices: [1, 3] }],
        tip: 'Pure components and memoization are key for performance questions.'
      },
      {
        day: 14,
        title: 'Week 2 Review',
        tasks: [{ moduleId: 'react-mastery', questionIndices: [2] }],
        tip: '🎉 Week 2 complete! You now have a solid foundation.'
      },
      // Week 3: React Advanced + Hooks
      {
        day: 15,
        title: 'useRef & useEffect',
        tasks: [{ moduleId: 'react-mastery', questionIndices: [10, 11, 12] }],
        tip: 'useEffect cleanup is crucial - memory leaks are a red flag in interviews.'
      },
      {
        day: 16,
        title: 'Custom Hooks',
        tasks: [{ moduleId: 'react-mastery', questionIndices: [8, 9] }],
        tip: 'Build at least 3 custom hooks today: useFetch, useDebounce, useLocalStorage.'
      },
      {
        day: 17,
        title: 'HOCs & Patterns',
        tasks: [{ moduleId: 'react-mastery', questionIndices: [6, 7] }],
        tip: 'Know when to use HOC vs Hook vs Render Props. Discuss tradeoffs.'
      },
      {
        day: 18,
        title: 'React Performance',
        tasks: [{ moduleId: 'react-mastery', questionIndices: [13] }],
        tip: 'React DevTools Profiler is your friend. Practice using it.'
      },
      {
        day: 19,
        title: 'Next.js & SSR',
        tasks: [{ moduleId: 'react-mastery', questionIndices: [4] }],
        tip: 'SSR vs SSG vs ISR - know when to use each in Next.js.'
      },
      {
        day: 20,
        title: 'Machine Coding: Fetch',
        tasks: [{ moduleId: 'machine-coding', questionIndices: [0] }],
        tip: 'Handle loading, error, empty states. Edge cases matter!'
      },
      {
        day: 21,
        title: 'Week 3 Review',
        tasks: [{ moduleId: 'machine-coding', questionIndices: [1] }],
        tip: '🎉 Week 3 done! Build something real this weekend.'
      },
      // Week 4: DSA + System Design + Behavioral
      {
        day: 22,
        title: 'DSA: Strings & Arrays',
        tasks: [{ moduleId: 'machine-coding', questionIndices: [2, 3, 4] }],
        tip: 'Sliding window and two pointers solve 70% of string problems.'
      },
      {
        day: 23,
        title: 'DSA: Trees & Recursion',
        tasks: [{ moduleId: 'machine-coding', questionIndices: [5, 6] }],
        tip: 'Flatten nested structures is common. Master recursion.'
      },
      {
        day: 24,
        title: 'DSA: Intervals & Cache',
        tasks: [{ moduleId: 'machine-coding', questionIndices: [7, 8] }],
        tip: 'LRU Cache: HashMap + Doubly Linked List. Draw it out!'
      },
      {
        day: 25,
        title: 'Machine Coding: UI',
        tasks: [{ moduleId: 'machine-coding', questionIndices: [9, 10] }],
        tip: 'Autocomplete with debounce + keyboard nav = complete solution.'
      },
      {
        day: 26,
        title: 'Company Specific: FAANG',
        tasks: [{ moduleId: 'company-tech', questionIndices: [0, 1, 2, 3] }],
        tip: 'Research your target company Glassdoor for recent questions.'
      },
      {
        day: 27,
        title: 'System Design: E-commerce',
        tasks: [{ moduleId: 'company-tech', questionIndices: [4, 5, 6, 7] }],
        tip: 'Draw architecture diagrams. Practice on paper or whiteboard.'
      },
      {
        day: 28,
        title: 'System Design: Advanced',
        tasks: [{ moduleId: 'company-tech', questionIndices: [8, 9, 10] }],
        tip: 'Shopping cart + Calendar are classic frontend system design.'
      },
      {
        day: 29,
        title: 'Behavioral Prep',
        tasks: [{ moduleId: 'behavioral', questionIndices: [0, 1, 2] }],
        tip: 'Prepare 5 stories using STAR format. Practice out loud.'
      },
      {
        day: 30,
        title: 'Final Review Day',
        tasks: [
          { moduleId: 'js-core', questionIndices: [0] },
          { moduleId: 'react-mastery', questionIndices: [0] },
          { moduleId: 'machine-coding', questionIndices: [8] }
        ],
        tip: '🚀 You did it! Review weak areas, get good sleep, and crush that interview!'
      }
    ]
  }
];

export const ebookContent: ChapterContent[] = [

  {
    id: 'js-core',
    title: 'Core JavaScript & Runtime',
    items: [
      {
        q: "Q1. How setTimeout works / Event Loop?",
        a: "Imagine you're a chef in a busy restaurant kitchen. The setTimeout function is like setting a kitchen timer - it tells JavaScript 'wait for X milliseconds, then do this task'.\n\n**The Process:**\n1. Immediate tasks (Call Stack) get done first.\n2. setTimeout tasks wait in a separate waiting area (Web APIs) with their timer.\n3. The Event Loop checks every moment: 'Is the Stack empty?'.\n4. When a timer finishes, that task gets moved to the Queue, and then to the Stack when clear.\n\nKey: setTimeout doesn't pause your program. It schedules a task.",
        code: `console.log("Order taken"); // Runs immediately\n\nsetTimeout(() => {\n  console.log("Food ready"); // Runs after 2 seconds\n}, 2000);\n\nconsole.log("Taking next order"); // Runs immediately\n\n// Output:\n// Order taken\n// Taking next order\n// Food ready`,
        playground: true,
        diagram: `Call Stack            Web APIs              Callback Queue\n----------           --------              --------------\nconsole.log('Order taken')\nsetTimeout(cb, 2000)  --->  [ timer running ]\nconsole.log('Taking next order')\n\n// After ~2s when stack is empty:\n// [ timer done ]  --->  cb added to Queue  --->  pushed to Stack`,
        followUps: [
          "How would you explain the Event Loop vs Call Stack to a junior engineer using a real production bug you faced?",
          "What changes if we replace setTimeout with setInterval in a React component? Where can things go wrong?",
          "How does the Event Loop behave differently in Node.js when there are I/O callbacks and timers mixed together?"
        ]
      },
      {
        q: "Q2. What are the 3 different types to create an object in JavaScript?",
        a: "**1. Object Literal (Most Common)**: Simple objects, quick setup.\n**2. Constructor Function**: When you need multiple similar objects.\n**3. Object.create() Method**: When you want to inherit specific prototypes.",
        code: `// 1. Literal\nlet p1 = { name: "John" };\n\n// 2. Constructor\nfunction Person(n) { this.name = n; }\nlet p2 = new Person("John");\n\n// 3. Object.create\nlet p3 = Object.create({ greet: () => "Hi" });`
      },
      {
        q: "Q3. What is the output of following setTimeout calls?",
        a: "Order: yo, a, i, b.\n\n1. 'yo' is synchronous.\n2. 'a' has 0ms delay but goes to macrotask queue.\n3. 'i' is undefined delay (defaults to min/0), goes to queue after 'a'.\n4. 'b' is 5s delay.",
        code: `setTimeout(()=>console.log("b"), 5000);\nsetTimeout(()=>console.log("a"),0);\nsetTimeout(()=>console.log("i"));\nconsole.log("yo");\n// Output: yo, a, i, b`,
        playground: true
      },
      {
        q: "Q8. What would be the output of the following?",
        a: "1. `arr1` becomes ['j','o','h','n'].\n2. `arr2` is a reference to `arr1` reversed: ['n','h','o','j']. Note: reverse() mutates the original array!\n3. `arr3` is ['j','o','n','e','s'].\n4. `arr2.push(arr3)` adds the entire array as a single element.\n\nResult:\nLength: 5 (n, h, o, j, [array])\nLast: ['j','o','n','e','s']",
        code: `var arr1 = 'john'.split('');\nvar arr2 = arr1.reverse();\nvar arr3 = 'jones'.split('');\narr2.push(arr3);\nconsole.log('length:', arr1.length, 'last:', arr1.slice(-1));`,
        playground: true
      },
      {
        q: "Q11. What is the output of the following closure?",
        a: "Output: 1.\nThe IIFE executes immediately. Inside, `delete x` attempts to delete the local variable `x`. However, variables declared with `var` cannot be deleted. The operation returns false (or fails silently in non-strict mode), and the function returns the value of x (1).",
        code: `var x = 1;\nvar output = (function() {\n  delete x;\n  return x;\n})();\nconsole.log(output);`,
        playground: true
      },
      {
        q: "Q12. How do you lower the load time of your page in Javascript?",
        a: "**Optimize Performance:**\n- **Minify code**: Remove spaces, comments.\n- **Compress files**: Gzip/Brotli.\n- **Lazy loading**: Load JS only when needed.\n- **Code splitting**: Split large bundles.\n- **Tree shaking**: Remove unused code.\n- **CDN**: Use Content Delivery Networks.\n- **Async/Defer**: Load scripts without blocking rendering."
      },
      {
        q: "Q13. What is prototype inheritance?",
        a: "Prototype inheritance is JavaScript's way of sharing properties and methods between objects.\n\n- Every object has a prototype (parent object).\n- Child objects inherit properties from their prototype.\n- If a property is not found in the child, JS looks up the prototype chain.",
        code: `let animal = { type: "mammal" };\nlet dog = Object.create(animal);\ndog.breed = "labrador";\n\nconsole.log(dog.type); // "mammal" (inherited)`,
        playground: true
      },
      {
        q: "Q17. Implement function to read field inside a nested object.",
        a: "We need to safely traverse the object path provided as a string (e.g., 'A.B.C').",
        code: `function read(obj, path) {\n  const keys = path.split('.');\n  let current = obj;\n\n  for (let key of keys) {\n    if (!current || !(key in current)) return undefined;\n    current = current[key];\n  }\n  return current;\n}\n\nconst obj = { A: { B: { C: { D: { E: 2 } } } } };\nconsole.log(read(obj, "A.B.C.D.E")); // 2`,
        playground: true
      },
      {
        q: "Q18. Remove duplicates from array using ES6",
        a: "Use the Set object, which only stores unique values.",
        code: `const arr = [1, 2, 2, 3, 4, 4];\nconst unique = [...new Set(arr)];\nconsole.log(unique); // [1, 2, 3, 4]`,
        playground: true
      },
      {
        q: "Q20. What is the result of 3 + 2 + \"7\"?",
        a: "Output: \"57\"\n\n1. `3 + 2` is evaluated first (Left-to-Right) = `5`.\n2. `5 + \"7\"` performs string concatenation = `\"57\"`."
      },
      {
        q: "Q21. Output of following (Scope/Const)?",
        a: "Output: 'white_rabbit'.\n`const` has block scope. The inner KEY only exists inside the if block. The outer KEY remains unchanged.",
        code: `const KEY = 'white_rabbit';\nif (true) {\n  const KEY = 'ginger_rabbit';\n}\nconsole.log(KEY);`,
        playground: true
      },
      {
        q: "Q22. Output of following (Scope/Let)?",
        a: "It depends on the console.log position. If `console.log(x)` is before `let x = 1337`, it throws a ReferenceError (Temporal Dead Zone). If the outer `let x = 42` is accessed before the inner block, it prints 42. In the example provided: `if(true) { console.log(x); let x = 1337; }` -> **ReferenceError** because the inner `x` is hoisted but uninitialized in the TDZ.",
        code: `let x = 42;\nif (true) {\n  console.log(x); // ReferenceError: Cannot access 'x' before initialization\n  let x = 1337;\n}`
      },
      {
        q: "Q28. Which function in js decodes the search string?",
        a: "Use `URLSearchParams` or `decodeURIComponent`. Note that `decodeURIComponent` might need manual handling for '+' symbols depending on implementation, while `URLSearchParams` handles it natively.",
        code: `// Method 1\nnew URLSearchParams('?s=Hello+World').get('s'); // "Hello World"\n\n// Method 2\ndecodeURIComponent('Hello+World'.replace(/\\+/g, ' '));`
      },
      {
        q: "Q39. How is the behavior of 'this' in arrow vs regular functions?",
        a: "**Regular functions** have their own `this` (dynamic, depends on call site).\n**Arrow functions** inherit `this` from their surrounding context (lexical binding).",
        code: `const obj = {\n  name: "Alice",\n  regular: function() { console.log(this.name); },\n  arrow: () => { console.log(this.name); }\n};\n\nobj.regular(); // "Alice"\nobj.arrow(); // undefined (window/global)`,
        playground: true
      },
      {
        q: "Q43. Explain Promise.all vs Promise.allSettled vs Promise.race",
        a: "- **Promise.all**: Waits for all promises. Rejects if ANY promise rejects (fail-fast).\n- **Promise.allSettled**: Waits for all promises. Returns results for both fulfilled and rejected.\n- **Promise.race**: Returns the first promise that settles (fulfills OR rejects).",
        code: `Promise.all([p1, p2, p3]).then(console.log); // [val1, val2, val3] or rejects\nPromise.allSettled([p1, p2, p3]).then(console.log); // [{status: 'fulfilled', value: ...}, ...]\nPromise.race([p1, p2, p3]).then(console.log); // First to settle`,
        tags: ["Google", "Meta", "Core JS"],
        followUps: [
          "When would you use Promise.allSettled instead of Promise.all in a real application?",
          "How would you implement a timeout wrapper using Promise.race?",
          "What happens if you pass an empty array to Promise.all vs Promise.race?"
        ]
      },
      {
        q: "Q44. What is the difference between var, let, and const?",
        a: "- **var**: Function-scoped, hoisted (initialized as undefined), can be redeclared.\n- **let**: Block-scoped, hoisted but in TDZ (Temporal Dead Zone), cannot be redeclared.\n- **const**: Block-scoped, must be initialized, cannot be reassigned (but object properties can change).",
        code: `// var\nif (true) { var x = 1; }\nconsole.log(x); // 1 (accessible)\n\n// let\nif (true) { let y = 1; }\nconsole.log(y); // ReferenceError\n\n// const\nconst obj = { a: 1 };\nobj.a = 2; // OK\nobj = {}; // TypeError`,
        playground: true,
        tags: ["Core JS", "Interview"],
      },
      {
        q: "Q45. Explain Closures with a practical example",
        a: "A closure gives you access to an outer function's scope from an inner function. Common use cases: data privacy, function factories, event handlers, debounce/throttle.",
        code: `function createCounter() {\n  let count = 0; // Private variable\n  return function() {\n    return ++count;\n  };\n}\n\nconst counter = createCounter();\nconsole.log(counter()); // 1\nconsole.log(counter()); // 2`,
        playground: true,
        tags: ["Google", "Meta", "Core JS"],
        followUps: [
          "How would you use closures to implement a debounce function?",
          "What is a memory leak related to closures and how do you prevent it?",
          "Explain how closures are used in React hooks like useState."
        ]
      },
      {
        q: "Q46. What are Symbols and when to use them?",
        a: "Symbols are unique, immutable primitive values. Use them for:\n- Creating unique object keys (avoid name collisions)\n- Implementing private properties\n- Well-known symbols (Symbol.iterator, Symbol.toPrimitive)",
        code: `const sym1 = Symbol('id');\nconst sym2 = Symbol('id');\nconsole.log(sym1 === sym2); // false (unique!)\n\nconst obj = { [sym1]: 'value' };\nconsole.log(obj[sym1]); // 'value'`,
        playground: true,
        tags: ["Advanced JS"],
      },
      {
        q: "Q47. Explain WeakMap and WeakSet vs Map and Set",
        a: "- **WeakMap/WeakSet**: Keys must be objects, weakly referenced (garbage collected if no other references), not iterable.\n- **Map/Set**: Any keys, strongly referenced, iterable.\n\nUse WeakMap for metadata that shouldn't prevent garbage collection.",
        code: `const wm = new WeakMap();\nconst obj = {};\nwm.set(obj, 'metadata');\n// If obj is garbage collected, entry is removed automatically`,
        tags: ["Advanced JS", "Memory"],
      },
      {
        q: "Q48. What is the output and why? (Hoisting + TDZ)",
        a: "Output: ReferenceError: Cannot access 'a' before initialization.\n\nEven though `var a` is hoisted, the `let a = 2` creates a Temporal Dead Zone (TDZ) for the entire block. The `console.log(a)` tries to access `a` before it's initialized.",
        code: `console.log(a); // ReferenceError\nlet a = 2;`,
        tags: ["Core JS", "Interview"],
      },
      {
        q: "Q49. Implement debounce and throttle functions",
        a: "**Debounce**: Execute function after delay, reset timer on each call.\n**Throttle**: Execute function at most once per interval.",
        code: `function debounce(fn, delay) {\n  let timer;\n  return function(...args) {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn.apply(this, args), delay);\n  };\n}\n\nfunction throttle(fn, limit) {\n  let inThrottle;\n  return function(...args) {\n    if (!inThrottle) {\n      fn.apply(this, args);\n      inThrottle = true;\n      setTimeout(() => inThrottle = false, limit);\n    }\n  };\n}`,
        playground: true,
        tags: ["Google", "Meta", "Core JS", "Performance"],
        followUps: [
          "When would you use debounce vs throttle for a search input?",
          "How would you implement a leading-edge throttle (execute immediately, then throttle)?",
          "What are the memory implications if you don't clear timers properly?"
        ]
      },
      {
        q: "Q50. Explain Generator Functions and yield",
        a: "Generators are functions that can be paused and resumed. They return an iterator object. Use `yield` to pause execution and return a value.",
        code: `function* countUp() {\n  yield 1;\n  yield 2;\n  yield 3;\n}\n\nconst gen = countUp();\nconsole.log(gen.next().value); // 1\nconsole.log(gen.next().value); // 2`,
        playground: true,
        tags: ["Advanced JS"],
      },
      {
        q: "Q51. What is the difference between == and ===?",
        a: "- **== (loose equality)**: Performs type coercion before comparison.\n- **=== (strict equality)**: No type coercion, compares type and value.\n\nAlways use === unless you specifically need coercion.",
        code: `console.log(5 == "5"); // true (coercion)\nconsole.log(5 === "5"); // false (different types)\nconsole.log(null == undefined); // true\nconsole.log(null === undefined); // false`,
        playground: true,
        tags: ["Core JS", "Interview"],
      },
      {
        q: "Q52. Explain the difference between null, undefined, and undeclared",
        a: "- **null**: Intentional absence of value (assigned by developer).\n- **undefined**: Variable declared but not assigned, or missing property.\n- **undeclared**: Variable never declared (ReferenceError if accessed).",
        code: `let a = null; // Explicitly set to null\nlet b; // undefined\nconsole.log(c); // ReferenceError (undeclared)`,
        tags: ["Core JS"],
      }
    ]
  },
  {
    id: 'html-css',
    title: 'HTML5 & CSS Architecture',
    items: [
      {
        q: "Q4. Difference between HTML5 and HTML?",
        a: "**HTML5** is the enhanced version.\n- **Media**: Native `<video>` and `<audio>`.\n- **Storage**: localStorage/sessionStorage.\n- **Semantics**: `<header>`, `<nav>`, `<article>`.\n- **APIs**: Geolocation, Drag & Drop, Canvas."
      },
      {
        q: "Q5. What does !DOCTYPE do?",
        a: "`<!DOCTYPE html>` tells the browser to use 'Standards Mode' for modern, correct rendering. Without it, browsers use 'Quirks Mode' which emulates old bugs.",
        code: `<!DOCTYPE html>\n<html>\n...`
      },
      {
        q: "Q9. What is inline and inline-block in CSS?",
        a: "- **Inline**: Respects left/right margins/padding, but ignores top/bottom and width/height. Example: `<span>`.\n- **Inline-block**: Flows like text (inline) but respects width/height/margins (block). Example: `<button>`."
      },
      {
        q: "Q10. What is a span tag?",
        a: "A generic inline container for phrasing content, which does not inherently represent anything. It can be used to group elements for styling purposes (using class or id attributes)."
      },
      {
        q: "Q15/Q23. List CSS positions.",
        a: "1. **Static**: Default flow.\n2. **Relative**: Offset relative to itself.\n3. **Absolute**: Relative to nearest positioned ancestor.\n4. **Fixed**: Relative to viewport.\n5. **Sticky**: Toggles between relative and fixed based on scroll."
      },
      {
        q: "Q16. List some pseudo classes and pseudo elements.",
        a: "**Pseudo Classes (State)**: `:hover`, `:focus`, `:nth-child`.\n**Pseudo Elements (Content)**: `::before`, `::after`, `::first-line`.",
        code: `a:hover { color: red; }\np::before { content: "Note: "; }`
      },
      {
        q: "Q19. When to use PUT and POST in REST Services?",
        a: "- **POST**: Create a new resource. Not idempotent (sending twice creates duplicates).\n- **PUT**: Update/Replace a resource. Idempotent (sending twice has same effect)."
      },
      {
        q: "Q24. What will be the color of the text?",
        a: "Text color will be **GREEN**.\n\nSpecificity:\n1. `div#test span` = 1 ID + 2 elements (102 pts)\n2. `div span` = 2 elements (2 pts)\n3. `span` = 1 element (1 pt)\n\nIn CSS, **specificity beats source order**: even if `span { color: red }` is written later in the stylesheet, `div#test span` still wins because its selector is more specific.\n\nYou can think of the three selectors as scores:\n- `div#test span` → [0, 1, 0, 2]\n- `div span` → [0, 0, 0, 2]\n- `span` → [0, 0, 0, 1]\n\nInline styles (e.g. `style=\"color: orange\"`) and `!important` (e.g. `span { color: red !important; }`) would override these rules, but they are not used in this example.",
        code: `<div id="test"><span>Text</span></div>\n\ndiv#test span { color: green; }\ndiv span { color: blue; }\nspan { color: red; }`,
        followUps: [
          "What happens if we change the last rule to `span { color: red !important; }`? Which color wins and why?",
          "If we add an inline style `style=\"color: orange\"` to the `<span>`, which rule wins and how does its specificity compare?",
          "How would you use browser DevTools to inspect which CSS rules applied to the `<span>` and why some were overridden?"
        ]
      },
      {
        q: "Q27. Draw concentric circles using CSS",
        a: "You can use `border-radius: 50%` on nested divs, or a single div with `box-shadow` or `radial-gradient`.",
        code: `div {\n  width: 100px; height: 100px;\n  background: radial-gradient(circle, red 10px, blue 10px, blue 20px, green 20px);\n  border-radius: 50%;\n}`
      },
      {
        q: "Q41. Why CSS specificity matters?",
        a: "Specificity ensures the correct styles are applied when multiple rules target the same element. It prevents conflicts and allows overriding styles in a predictable way.\n\nPriority: Inline > ID > Class > Element."
      },
      {
        q: "Q42. Visual: CSS Box Model & Stacking Context",
        a: "The CSS box model describes how every element is built from content, padding, border, and margin. Stacking context explains how overlapping elements are layered using `z-index`.",
        diagram: `CSS Box Model (outer to inner)\n\n[ margin ]   (transparent space outside the border)\n[ border ]   (line surrounding the box)\n[ padding ]  (space between border and content)\n[ content ]  (actual text / image)\n\nExample stacking context:\n\nz-index: 2   ─── Modal / Toast on top\nz-index: 1   ─── Header / Fixed Nav\nz-index: 0   ─── Main page content\nz-index: -1  ─── Background decoration`,
      },
      {
        q: "Q43. Explain Flexbox vs CSS Grid - when to use each?",
        a: "- **Flexbox**: 1D layout (row OR column). Perfect for navigation bars, centering content, distributing space.\n- **Grid**: 2D layout (rows AND columns). Perfect for page layouts, card grids, complex designs.\n\nUse Flexbox for components, Grid for layouts.",
        code: `/* Flexbox - horizontal nav */\n.nav { display: flex; justify-content: space-between; }\n\n/* Grid - card layout */\n.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }`,
        tags: ["HTML & CSS", "Layout"],
        followUps: [
          "Can you use Flexbox and Grid together? Give an example.",
          "What's the difference between `justify-content` and `align-items` in Flexbox?",
          "How would you create a responsive grid that switches from 3 columns to 1 column on mobile?"
        ]
      },
      {
        q: "Q44. What are CSS Custom Properties (CSS Variables)?",
        a: "CSS variables allow you to store values that can be reused throughout your stylesheet. They're scoped and can be changed dynamically via JavaScript.",
        code: `:root {\n  --primary-color: #3b82f6;\n  --spacing: 1rem;\n}\n\n.button {\n  background: var(--primary-color);\n  padding: var(--spacing);\n}\n\n/* Change dynamically */\ndocument.documentElement.style.setProperty('--primary-color', '#ef4444');`,
        tags: ["HTML & CSS", "Modern CSS"],
      },
      {
        q: "Q45. Explain CSS BEM Methodology",
        a: "BEM (Block Element Modifier) is a naming convention:\n- **Block**: Standalone component (`button`, `card`)\n- **Element**: Part of block (`button__icon`, `card__title`)\n- **Modifier**: Variation (`button--primary`, `card--featured`)",
        code: `/* Block */\n.card { }\n\n/* Element */\n.card__title { }\n.card__body { }\n\n/* Modifier */\n.card--featured { }\n.card__title--large { }`,
        tags: ["HTML & CSS", "Architecture"],
      },
      {
        q: "Q46. What is the difference between display: none, visibility: hidden, and opacity: 0?",
        a: "- **display: none**: Removes element from layout (no space taken, not accessible).\n- **visibility: hidden**: Element takes space but invisible (not accessible).\n- **opacity: 0**: Element fully transparent but takes space and remains accessible/interactive.",
        code: `/* Removed from layout */\n.hidden { display: none; }\n\n/* Invisible but takes space */\n.invisible { visibility: hidden; }\n\n/* Transparent but interactive */\n.transparent { opacity: 0; }`,
        tags: ["HTML & CSS", "Interview"],
      },
      {
        q: "Q47. How do you center a div horizontally and vertically?",
        a: "Multiple methods:\n1. **Flexbox** (modern, recommended)\n2. **Grid** (modern)\n3. **Absolute + Transform** (legacy)\n4. **Margin auto** (horizontal only)",
        code: `/* Method 1: Flexbox */\n.parent {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n/* Method 2: Grid */\n.parent {\n  display: grid;\n  place-items: center;\n}\n\n/* Method 3: Absolute */\n.child {\n  position: absolute;\n  top: 50%; left: 50%;\n  transform: translate(-50%, -50%);\n}`,
        tags: ["HTML & CSS", "Interview"],
      },
      {
        q: "Q48. Explain CSS Animations vs Transitions",
        a: "- **Transitions**: Simple property changes over time (hover effects, state changes). Need a trigger.\n- **Animations**: Complex, multi-step animations. Can loop, reverse, pause. Defined with @keyframes.",
        code: `/* Transition */\n.button {\n  transition: background 0.3s ease;\n}\n.button:hover { background: blue; }\n\n/* Animation */\n@keyframes slide {\n  from { transform: translateX(0); }\n  to { transform: translateX(100px); }\n}\n.box { animation: slide 1s infinite; }`,
        tags: ["HTML & CSS"],
      },
      {
        q: "Q49. What is the difference between rem, em, and px?",
        a: "- **px**: Absolute unit (1px = 1/96 inch). Fixed size.\n- **em**: Relative to parent's font-size. Can compound.\n- **rem**: Relative to root (`<html>`) font-size. Consistent across the page.",
        code: `html { font-size: 16px; }\n.parent { font-size: 20px; }\n\n.child-px { font-size: 16px; } /* Always 16px */\n.child-em { font-size: 1.5em; } /* 30px (20px * 1.5) */\n.child-rem { font-size: 1.5rem; } /* 24px (16px * 1.5) */`,
        tags: ["HTML & CSS", "Typography"],
      },
      {
        q: "Q50. How do you make a responsive image that scales with its container?",
        a: "Use `max-width: 100%` and `height: auto`. This ensures the image scales down but never exceeds its container width.",
        code: `img {\n  max-width: 100%;\n  height: auto;\n  display: block;\n}\n\n/* For background images */\n.bg {\n  background-size: cover; /* or contain */\n  background-position: center;\n}`,
        tags: ["HTML & CSS", "Responsive"],
      }
    ]
  },
  {
    id: 'react-mastery',
    title: 'Advanced React & Next.js',
    items: [
      {
        q: "Q6. Why React instead of Javascript? Q7. Explain Virtual DOM.",
        a: "Virtual DOM is a lightweight copy of the UI in memory.\n\n**Reconciliation**: React compares the new Virtual DOM with the old one (Diffing) and only updates the actual DOM nodes that changed. This is much faster than re-painting the whole page.",
        code: `// Virtual DOM change:\n// <div class="a"> -> <div class="b">\n// React only updates the className attribute.`
        ,
        diagram: `Component Tree (Virtual DOM)\n\n<App>\n ├─ <Header>\n │   └─ <Logo />\n └─ <Main>\n     ├─ <Sidebar />\n     └─ <Content>\n         ├─ <Article />\n         └─ <Comments />\n\nOnly the branch that changed is diffed and updated in the real DOM.`
      },
      {
        q: "Q14. What is a Pure Component?",
        a: "A component that renders the same output for the same props and state. In class components, it extends `React.PureComponent` (shallow comparison). In functional components, we use `React.memo`.",
        code: `const MyComponent = React.memo(function MyComponent(props) {\n  /* only rerenders if props change */\n});`
      },
      {
        q: "Q25. What is useRef?",
        a: "Returns a mutable object `{ current: ... }` that persists across renders without causing re-renders. Used for DOM access or storing mutable values like timers.",
        code: `const inputRef = useRef(null);\n// inputRef.current.focus()`
      },
      {
        q: "Q26. How do you optimize performance in React?",
        a: "- **React.memo**: Avoid re-renders.\n- **useMemo/useCallback**: Memoize expensive values/functions.\n- **Virtualization**: react-window for long lists.\n- **Code Splitting**: React.lazy + Suspense.\n- **State Management**: Keep state local, avoid prop drilling."
      },
      {
        q: "Q29. How NextJS is different from other JavaScript frameworks?",
        a: "Next.js is a meta-framework. It provides:\n- **SSR/SSG**: Server-side rendering out of the box.\n- **Routing**: File-system based routing.\n- **API Routes**: Backend endpoints.\n- **Optimizations**: Images, Fonts, Scripts handled automatically.\nStandard React (CRA/Vite) is usually Client-Side Rendering (CSR) only."
      },
      {
        q: "Q30. What do you mean by SSR?",
        a: "Server-Side Rendering. The server generates the full HTML for a page and sends it to the client. This improves SEO and First Contentful Paint (FCP)."
      },
      {
        q: "Q31. CSR vs SSR?",
        a: "**CSR (Client-Side)**: Browser downloads empty HTML + JS. JS runs and builds UI. Slower initial load, fast navigation.\n**SSR (Server-Side)**: Server sends full HTML. Browser renders immediately. JS 'hydrates' the page later for interactivity."
      },
      {
        q: "Q32. Explain Reconciliation.",
        a: "The process of syncing the Virtual DOM with the Real DOM. React uses a diffing algorithm (O(n)) to determine the minimal set of operations needed to update the UI."
      },
      {
        q: "Q33. What is an HOC? Q34. Example?",
        a: "**HOC (Higher-Order Component)** is a function that takes a component and returns a new component with additional functionality (e.g., Auth, Logging).",
        code: `function withAuth(WrappedComponent) {\n  return function(props) {\n    if (!isLoggedIn) return <div>Login required</div>;\n    return <WrappedComponent {...props} />;\n  };\n}`
      },
      {
        q: "Q35. What are Custom Hooks?",
        a: "Functions starting with `use` that can call other hooks. They allow you to extract and reuse stateful logic between components.",
        code: `function useCounter(initial = 0) {\n  const [count, setCount] = useState(initial);\n  // ...\n  return { count, increment };\n}`
      },
      {
        q: "Q36. Difference b/w HOC and Custom Hooks.",
        a: "- **HOC**: Wraps components, can cause 'wrapper hell', good for legacy or props injection.\n- **Hooks**: Used *inside* components, cleaner, no nesting, shares logic not UI."
      },
      {
        q: "Q37. How to handle side effects? (useEffect)",
        a: "Use `useEffect` for data fetching, subscriptions, or DOM manipulation.\n\n- `[]`: Runs once (mount).\n- `[prop]`: Runs when prop changes.\n- Return function: Cleanup (unmount).",
        code: `useEffect(() => {\n  const sub = subscribe();\n  return () => sub.unsubscribe(); // Cleanup\n}, []);`
      },
      {
        q: "Q38. Biggest misunderstandings about useEffect?",
        a: "1. Thinking it runs *before* render (it runs after paint).\n2. Missing dependencies causing stale closures.\n3. Using it for derived state (just calculate it during render instead).\n4. Not cleaning up timers/subscriptions."
      },
      {
        q: "Q40. React Batching mechanism?",
        a: "React groups multiple state updates into a single re-render.\nReact 18 introduces **Automatic Batching** which batches updates inside promises, timeouts, and event handlers automatically.",
        code: `// React 18\nsetTimeout(() => {\n  setCount(c => c + 1);\n  setFlag(f => !f);\n  // Triggers only 1 re-render\n}, 1000);`
      },
      {
        q: "Q41. What are Error Boundaries in React?",
        a: "Error Boundaries catch JavaScript errors anywhere in the component tree and display a fallback UI instead of crashing the app. They catch errors in:\n- Rendering\n- Lifecycle methods\n- Constructors\n\nThey do NOT catch errors in event handlers, async code, or SSR.",
        code: `class ErrorBoundary extends React.Component {\n  state = { hasError: false };\n  static getDerivedStateFromError(error) {\n    return { hasError: true };\n  }\n  componentDidCatch(error, info) {\n    console.error(error, info);\n  }\n  render() {\n    if (this.state.hasError) {\n      return <h1>Something went wrong.</h1>;\n    }\n    return this.props.children;\n  }\n}`,
        tags: ["React", "Error Handling"],
        followUps: [
          "Why can't Error Boundaries catch errors in event handlers?",
          "How would you implement an Error Boundary with React Hooks?",
          "What's the difference between getDerivedStateFromError and componentDidCatch?"
        ]
      },
      {
        q: "Q42. Explain useMemo vs useCallback",
        a: "- **useMemo**: Memoizes a computed VALUE. Returns the cached value until dependencies change.\n- **useCallback**: Memoizes a FUNCTION. Returns the cached function reference until dependencies change.\n\nBoth prevent unnecessary recalculations/recreations.",
        code: `// useMemo - memoize value\nconst expensiveValue = useMemo(() => {\n  return computeExpensiveValue(a, b);\n}, [a, b]);\n\n// useCallback - memoize function\nconst memoizedCallback = useCallback(() => {\n  doSomething(a, b);\n}, [a, b]);`,
        playground: true,
        tags: ["React", "Performance"],
      },
      {
        q: "Q43. What is React Suspense and how does it work?",
        a: "Suspense lets components 'wait' for something (data loading, code splitting) before rendering. It shows a fallback UI while waiting.\n\nReact 18 Suspense works with:\n- React.lazy (code splitting)\n- Data fetching libraries (React Query, SWR)\n- Concurrent features",
        code: `const LazyComponent = React.lazy(() => import('./Component'));\n\nfunction App() {\n  return (\n    <Suspense fallback={<div>Loading...</div>}>\n      <LazyComponent />\n    </Suspense>\n  );\n}`,
        tags: ["React", "Next.js"],
      },
      {
        q: "Q44. What are React Portals?",
        a: "Portals render children into a DOM node outside the parent component hierarchy. Useful for modals, tooltips, dropdowns that need to escape parent overflow/stacking contexts.",
        code: `import { createPortal } from 'react-dom';\n\nfunction Modal({ children }) {\n  return createPortal(\n    <div className="modal">{children}</div>,\n    document.body\n  );\n}`,
        tags: ["React", "DOM"],
      },
      {
        q: "Q45. Explain React Context API and when to use it",
        a: "Context provides a way to pass data through the component tree without prop drilling.\n\nUse when:\n- Theme, language, auth state (global data)\n- Data needed by many components at different levels\n\nAvoid for:\n- Frequently changing data (causes re-renders)\n- Local component state",
        code: `const ThemeContext = createContext('light');\n\nfunction App() {\n  return (\n    <ThemeContext.Provider value="dark">\n      <Toolbar />\n    </ThemeContext.Provider>\n  );\n}\n\nfunction Button() {\n  const theme = useContext(ThemeContext);\n  return <button className={theme}>Click</button>;\n}`,
        tags: ["React", "State Management"],
        followUps: [
          "How does Context cause performance issues and how do you optimize it?",
          "When would you choose Context over Redux or Zustand?",
          "How do you prevent unnecessary re-renders when using Context?"
        ]
      },
      {
        q: "Q46. What is the difference between controlled and uncontrolled components?",
        a: "- **Controlled**: Form data is handled by React state. Input value is controlled by `value` prop.\n- **Uncontrolled**: Form data is handled by the DOM. Use `ref` to access values.\n\nControlled is preferred for React apps.",
        code: `// Controlled\nconst [value, setValue] = useState('');\n<input value={value} onChange={(e) => setValue(e.target.value)} />\n\n// Uncontrolled\nconst inputRef = useRef();\n<input ref={inputRef} />\n// Access: inputRef.current.value`,
        tags: ["React", "Forms"],
      },
      {
        q: "Q47. Explain React Server Components (RSC) in Next.js 13+",
        a: "Server Components render on the server and send minimal JS to the client. Benefits:\n- Zero client bundle size\n- Direct database/API access\n- Better security (API keys stay on server)\n- Faster initial load\n\nUse 'use client' directive for interactive components.",
        code: `// Server Component (default)\nasync function ServerComponent() {\n  const data = await fetch('...');\n  return <div>{data}</div>;\n}\n\n// Client Component\n'use client';\nfunction ClientComponent() {\n  const [state, setState] = useState();\n  return <button onClick={...}>Click</button>;\n}`,
        tags: ["React", "Next.js", "SSR"],
      },
      {
        q: "Q48. What are React Keys and why are they important?",
        a: "Keys help React identify which items changed, were added, or removed. They should be stable, unique, and predictable.\n\nWithout keys, React may incorrectly reuse DOM nodes, causing bugs and performance issues.",
        code: `// Good: Stable, unique keys\n{items.map(item => (\n  <Item key={item.id} data={item} />\n))}\n\n// Bad: Using index (only if list is static)\n{items.map((item, index) => (\n  <Item key={index} data={item} />\n))}`,
        tags: ["React", "Performance"],
      },
      {
        q: "Q49. How does React handle forms and form validation?",
        a: "React handles forms through controlled components. Validation can be:\n- Built-in HTML5 validation (`required`, `pattern`)\n- Custom validation in `onChange` handlers\n- Libraries like Formik, React Hook Form\n\nAlways validate on both client and server.",
        code: `const [email, setEmail] = useState('');\nconst [error, setError] = useState('');\n\nconst validate = (value) => {\n  if (!value.includes('@')) {\n    setError('Invalid email');\n  } else {\n    setError('');\n  }\n};\n\n<input\n  value={email}\n  onChange={(e) => {\n    setEmail(e.target.value);\n    validate(e.target.value);\n  }}\n/>`,
        tags: ["React", "Forms"],
      },
      {
        q: "Q50. Explain React's Concurrent Features (React 18)",
        a: "Concurrent rendering allows React to interrupt rendering work. Features:\n- **startTransition**: Mark non-urgent updates\n- **useTransition**: Track transition state\n- **useDeferredValue**: Defer value updates\n- **Suspense**: Better loading states\n\nImproves perceived performance and responsiveness.",
        code: `import { startTransition } from 'react';\n\nfunction App() {\n  const [isPending, startTransition] = useTransition();\n  \n  const handleChange = (e) => {\n    setInput(e.target.value); // Urgent\n    startTransition(() => {\n      setResults(filter(e.target.value)); // Non-urgent\n    });\n  };\n}`,
        tags: ["React", "Performance", "React 18"],
      }
    ]
  },
  {
    id: 'machine-coding',
    title: 'Machine Coding & DSA',
    items: [
      {
        q: "Machine Coding A: Fetch & Display Products",
        a: "Task: Fetch data from Dummy JSON API based on user input.\n\nSteps:\n1. Create input state.\n2. Use `useEffect` with debounce to fetch data.\n3. Handle Loading/Error states.\n4. Map over results to display list.",
        code: `useEffect(() => {\n  const handler = setTimeout(() => fetchData(query), 500);\n  return () => clearTimeout(handler);\n}, [query]);`,
        tags: ["Google", "Meta", "Frontend", "Machine Coding"]
      },
      {
        q: "Machine Coding B: Stopwatch",
        a: "Develop a Stopwatch UI with Start, Stop, Reset.\n\nTip: Do not just increment a counter variable. Store the `startTime` (Date.now()) and calculate `elapsed = Date.now() - startTime` in the interval to prevent time drift.",
        tags: ["Microsoft", "Frontend", "Machine Coding"]
      },
      {
        q: "DSA A: Find Next Lexicographical Permutation",
        a: "Input: [1, 2, 3] -> Output: [1, 3, 2].\nAlgorithm:\n1. Find largest index k such that a[k] < a[k+1].\n2. Find largest index l > k such that a[k] < a[l].\n3. Swap a[k] and a[l].\n4. Reverse the sub-array a[k+1]...end.",
        tags: ["Google", "Microsoft", "DSA", "Arrays"]
      },
      {
        q: "DSA B: Compress a String",
        a: "Input: 'aabbbbcc' -> Output: 'a2b3c2'.\nIterate through the string, counting consecutive occurrences. Append char + count to result string.",
        tags: ["Meta", "DSA", "Strings"]
      },
      {
        q: "DSA C: Pivot Index",
        a: "Find index where sum(left) === sum(right).\n1. Calculate total sum.\n2. Iterate, keeping track of `leftSum`.\n3. `rightSum = totalSum - leftSum - currentElement`.\n4. If `leftSum == rightSum`, return index.",
        tags: ["Amazon", "DSA", "Arrays"]
      },
      {
        q: "DSA D: Flatten array of arbitrary depth",
        a: "Use recursion or `reduce`.",
        code: `const flatten = (arr) => \n  arr.reduce((acc, val) => \n    Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val), \n  []);\n\n// Test it\nconst nested = [1, [2, [3, [4, 5]]], 6];\nconsole.log(flatten(nested));`,
        playground: true,
        tags: ["Google", "DSA", "Recursion"]
      },
      {
        q: "DSA E: Longest Substring Without Repeating Characters",
        a: "Classic sliding window asked at Google/Meta.\nGiven a string, return the length of the longest substring without repeating characters.\nUse two pointers and a Set/Map to track the current window; move the left pointer whenever you see a duplicate.",
        code: `function lengthOfLongestSubstring(s) {\n  let left = 0, maxLen = 0;\n  const seen = new Set();\n\n  for (let right = 0; right < s.length; right++) {\n    while (seen.has(s[right])) {\n      seen.delete(s[left]);\n      left++;\n    }\n    seen.add(s[right]);\n    maxLen = Math.max(maxLen, right - left + 1);\n  }\n  return maxLen;\n}\n\n// Test it\nconsole.log(lengthOfLongestSubstring("abcabcbb")); // 3\nconsole.log(lengthOfLongestSubstring("bbbbb")); // 1\nconsole.log(lengthOfLongestSubstring("pwwkew")); // 3`,
        playground: true,
        tags: ["Google", "Meta", "DSA", "Strings", "Sliding Window"],
        followUps: [
          "How would you modify this to return the actual substring, not just the length?",
          "What is the time and space complexity and why is a naive O(n^2) approach not acceptable in interviews?",
          "How would you adapt this pattern to handle the 'longest substring with at most K distinct characters' problem?"
        ]
      },
      {
        q: "DSA F: Merge Intervals / Meeting Rooms",
        a: "Common at Google/Microsoft.\nGiven meeting time intervals [[s1,e1],[s2,e2],...], merge all overlapping intervals.\nSort by start time, then scan once and merge when the current interval overlaps the previous one.",
        code: `function merge(intervals) {\n  intervals.sort((a,b) => a[0] - b[0]);\n  const res = [];\n\n  for (const [start, end] of intervals) {\n    if (!res.length || res[res.length - 1][1] < start) {\n      res.push([start, end]);\n    } else {\n      res[res.length - 1][1] = Math.max(res[res.length - 1][1], end);\n    }\n  }\n  return res;\n}\n\n// Test it\nconst intervals = [[1,3],[2,6],[8,10],[15,18]];\nconsole.log(merge(intervals)); // [[1,6],[8,10],[15,18]]`,
        playground: true,
        tags: ["Google", "Microsoft", "DSA", "Intervals"],
        followUps: [
          "How would you extend this to solve the 'minimum number of meeting rooms required' problem?",
          "If intervals were streaming in real-time, how would you maintain a merged view efficiently?",
          "What changes if the intervals are extremely large and don’t fit in memory? How would you chunk or externalize the algorithm?"
        ]
      },
      {
        q: "DSA G: Design LRU Cache (Least Recently Used)",
        a: "Very popular at FAANG.\nDesign a cache with `get` and `put` in O(1) time.\nIdea: combine a HashMap (key -> node) with a doubly linked list to track recency; move accessed nodes to the front, and evict from the tail when capacity is exceeded.",
        code: `// High-level idea (pseudo-code)\nclass LRUCache {\n  constructor(capacity) {\n    this.capacity = capacity;\n    this.map = new Map();\n    this.list = new DoublyLinkedList();\n  }\n  get(key) { /* if key in map -> move node to front, return value */ }\n  put(key, val) { /* insert/update + move to front, evict tail if size > capacity */ }\n}`,
        tags: ["Google", "Meta", "Amazon", "DSA", "System Design"],
        followUps: [
          "How would you design this cache in a distributed system where multiple app servers share the same cache?",
          "What changes if keys are extremely large objects (e.g., complex query objects) – how would you hash or normalize them?",
          "Compare LRU with LFU and FIFO in terms of hit rate for typical web workloads."
        ]
      },
      {
        q: "Machine Coding C: Autocomplete Search Box",
        a: "Asked at companies like Google/Meta.\nBuild an autocomplete input that:\n1. Debounces API calls.\n2. Shows a dropdown of suggestions.\n3. Supports keyboard navigation (↑/↓ + Enter).\nBonus: cache previous queries to avoid duplicate network calls.",
        tags: ["Google", "Meta", "Frontend", "Machine Coding"],
        followUps: [
          "How would you handle very large result sets efficiently on the client (10k+ options)?",
          "How can you make the component accessible (ARIA roles, keyboard support, screen readers)?",
          "What changes if the suggestions must personalize based on user history and location?"
        ]
      },
      {
        q: "Machine Coding D: Live Character Counter for Comments",
        a: "Simple but real-world UI task (Twitter/Meta).\nBuild a textarea with max length (e.g. 280) that shows remaining characters, turns red when close to the limit, and disables the Post button when empty or exceeded.",
        tags: ["Meta", "Frontend", "UI", "Machine Coding"],
        followUps: [
          "How would you support rich text (mentions, hashtags, links) while still enforcing an underlying character limit?",
          "How do you keep the UI responsive if validation and sanitization logic is expensive?",
          "What server-side checks would you still perform even though you already validated on the client?"
        ]
      },
      {
        q: "DSA H: Two Sum / Three Sum",
        a: "**Two Sum**: Find two numbers that add up to target. Use HashMap for O(n) solution.\n**Three Sum**: Find three numbers that add up to zero. Sort array, fix one number, use two pointers for the rest.",
        code: `// Two Sum\nfunction twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) {\n      return [map.get(complement), i];\n    }\n    map.set(nums[i], i);\n  }\n}\n\nconsole.log(twoSum([2,7,11,15], 9)); // [0,1]\n\n// Three Sum\nfunction threeSum(nums) {\n  nums.sort((a, b) => a - b);\n  const res = [];\n  for (let i = 0; i < nums.length - 2; i++) {\n    if (i > 0 && nums[i] === nums[i - 1]) continue;\n    let left = i + 1, right = nums.length - 1;\n    while (left < right) {\n      const sum = nums[i] + nums[left] + nums[right];\n      if (sum === 0) {\n        res.push([nums[i], nums[left], nums[right]]);\n        while (left < right && nums[left] === nums[left + 1]) left++;\n        while (left < right && nums[right] === nums[right - 1]) right--;\n        left++; right--;\n      } else if (sum < 0) left++;\n      else right--;\n    }\n  }\n  return res;\n}\n\nconsole.log(threeSum([-1,0,1,2,-1,-4])); // [[-1,-1,2],[-1,0,1]]`,
        playground: true,
        tags: ["Google", "Meta", "Amazon", "DSA", "Arrays"],
      },
      {
        q: "DSA I: Valid Parentheses",
        a: "Given a string containing parentheses, determine if they're valid. Use a stack to track opening brackets.",
        code: `function isValid(s) {\n  const stack = [];\n  const pairs = { '(': ')', '[': ']', '{': '}' };\n  \n  for (const char of s) {\n    if (pairs[char]) {\n      stack.push(char);\n    } else {\n      if (stack.length === 0 || pairs[stack.pop()] !== char) {\n        return false;\n      }\n    }\n  }\n  return stack.length === 0;\n}\n\nconsole.log(isValid("()[]{}")); // true\nconsole.log(isValid("(]")); // false\nconsole.log(isValid("{[]}")); // true`,
        playground: true,
        tags: ["Google", "Microsoft", "DSA", "Stack"],
      },
      {
        q: "DSA J: Reverse Linked List",
        a: "Reverse a singly linked list iteratively or recursively. Classic problem asked at FAANG.",
        code: `// Iterative\nfunction reverseList(head) {\n  let prev = null;\n  let curr = head;\n  \n  while (curr) {\n    const next = curr.next;\n    curr.next = prev;\n    prev = curr;\n    curr = next;\n  }\n  return prev;\n}\n\n// Recursive\nfunction reverseList(head) {\n  if (!head || !head.next) return head;\n  const newHead = reverseList(head.next);\n  head.next.next = head;\n  head.next = null;\n  return newHead;\n}`,
        tags: ["Google", "Meta", "DSA", "Linked List"],
      },
      {
        q: "Machine Coding E: Todo List with LocalStorage",
        a: "Build a Todo app with:\n1. Add/Delete/Edit todos\n2. Mark as complete\n3. Filter (All/Active/Completed)\n4. Persist to localStorage\n5. Clear completed\n\nFocus on clean component structure and state management.",
        tags: ["Frontend", "Machine Coding", "State Management"],
        followUps: [
          "How would you add undo/redo functionality?",
          "How would you sync todos across multiple browser tabs?",
          "What if todos need to sync with a backend API?"
        ]
      },
      {
        q: "Machine Coding F: Infinite Scroll / Pagination",
        a: "Implement infinite scroll:\n1. Detect when user scrolls near bottom\n2. Fetch next page of data\n3. Append to existing list\n4. Show loading indicator\n5. Handle end of data\n\nUse IntersectionObserver API for efficient scroll detection.",
        code: `// IntersectionObserver example\nconst observer = new IntersectionObserver((entries) => {\n  entries.forEach(entry => {\n    console.log('Element visible:', entry.isIntersecting);\n    console.log('Intersection ratio:', entry.intersectionRatio);\n  });\n});\n\n// In real app: observer.observe(sentinelRef.current);\nconsole.log('IntersectionObserver created!');`,
        playground: true,
        tags: ["Google", "Meta", "Frontend", "Machine Coding"],
      },
      {
        q: "Machine Coding G: Drag and Drop List",
        a: "Build a sortable list with drag-and-drop:\n1. Drag items to reorder\n2. Visual feedback during drag\n3. Persist new order\n4. Smooth animations\n\nUse HTML5 Drag API or libraries like react-beautiful-dnd.",
        tags: ["Microsoft", "Frontend", "Machine Coding", "UI"],
      },
      {
        q: "DSA K: Binary Search",
        a: "Search for a target in a sorted array in O(log n) time. Classic algorithm with many variations:\n- Find exact match\n- Find insertion point\n- Search in rotated array",
        code: `function binarySearch(nums, target) {\n  let left = 0, right = nums.length - 1;\n  \n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    if (nums[mid] === target) return mid;\n    if (nums[mid] < target) left = mid + 1;\n    else right = mid - 1;\n  }\n  return -1;\n}\n\nconst arr = [1, 3, 5, 7, 9, 11, 13];\nconsole.log(binarySearch(arr, 7)); // 3\nconsole.log(binarySearch(arr, 6)); // -1`,
        playground: true,
        tags: ["Google", "Microsoft", "DSA", "Binary Search"],
      },
      {
        q: "DSA L: Maximum Subarray (Kadane's Algorithm)",
        a: "Find the contiguous subarray with the largest sum. O(n) solution using dynamic programming.",
        code: `function maxSubArray(nums) {\n  let maxSum = nums[0];\n  let currentSum = nums[0];\n  \n  for (let i = 1; i < nums.length; i++) {\n    currentSum = Math.max(nums[i], currentSum + nums[i]);\n    maxSum = Math.max(maxSum, currentSum);\n  }\n  return maxSum;\n}\n\nconsole.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4])); // 6\nconsole.log(maxSubArray([5,4,-1,7,8])); // 23`,
        playground: true,
        tags: ["Amazon", "Microsoft", "DSA", "Dynamic Programming"],
      }
    ]
  },
  {
    id: 'system-design',
    title: 'System Design',
    submodules: [
      {
        id: 'system-design-whatsapp',
        title: 'Designing WhatsApp Web',
        items: [
          {
            q: "Q1. High-Level Architecture: How would you design WhatsApp Web?",
            a: "**Core Components:**\n\n1. **Client (Browser)**: React/Vue frontend, WebSocket client\n2. **WebSocket Server**: Real-time message relay\n3. **API Gateway**: REST endpoints for auth, contacts, media\n4. **Message Service**: Handles message storage, delivery\n5. **Presence Service**: Online/offline status, last seen\n6. **Media Service**: Handles image/video uploads, CDN\n7. **Notification Service**: Push notifications\n8. **Database**: Message history, user data (sharded)\n\n**Key Design Principles:**\n- Real-time bidirectional communication (WebSocket)\n- Offline-first architecture (local storage + sync)\n- End-to-end encryption (client-side)\n- Optimistic UI updates\n- Message ordering and deduplication\n\n💡 **Try the Interactive Lab**: Enable 'System Design Lab' in the toolbar above to experiment with WebSocket connections, offline queues, and explore the architecture interactively!",
            diagram: `WhatsApp Web Architecture

[Browser Client]
     │
     ├─ WebSocket ──> [WebSocket Server] ──> [Message Service]
     │                                           │
     ├─ REST API ──> [API Gateway] ──> [Presence Service]
     │                 │                  │
     │                 ├─> [Media Service] ──> [CDN]
     │                 │
     │                 └─> [Database Cluster] (Sharded)
     │
     └─ [Local Storage] (Offline Queue, Cache)`,
            tags: ["System Design", "Architecture", "WhatsApp", "FAANG"],
            followUps: [
              "How would you handle message delivery guarantees (at-least-once vs exactly-once)?",
              "What happens if the WebSocket connection drops? How do you handle reconnection?",
              "How would you scale this architecture to support 2 billion users?"
            ]
          },
          {
            q: "Q2. Real-Time Messaging: WebSocket vs Server-Sent Events vs Polling",
            a: "**WebSocket (Best for WhatsApp):**\n- Full-duplex, bidirectional\n- Low latency (~1ms)\n- Persistent connection\n- Efficient for high-frequency messages\n\n**Server-Sent Events (SSE):**\n- One-way (server → client)\n- Good for notifications, live feeds\n- Auto-reconnect built-in\n\n**Polling:**\n- Simple but inefficient\n- High latency, battery drain\n- Not suitable for real-time chat\n\n**Implementation:**\n```javascript\nconst ws = new WebSocket('wss://chat.whatsapp.com');\nws.onmessage = (event) => {\n  const message = JSON.parse(event.data);\n  handleIncomingMessage(message);\n};\n```",
            code: `// WebSocket Connection Manager\nclass WebSocketManager {\n  constructor(url) {\n    this.url = url;\n    this.ws = null;\n    this.reconnectAttempts = 0;\n    this.maxReconnectAttempts = 5;\n  }\n\n  connect() {\n    this.ws = new WebSocket(this.url);\n    \n    this.ws.onopen = () => {\n      console.log('Connected');\n      this.reconnectAttempts = 0;\n      this.syncPendingMessages();\n    };\n    \n    this.ws.onmessage = (event) => {\n      const data = JSON.parse(event.data);\n      this.handleMessage(data);\n    };\n    \n    this.ws.onclose = () => {\n      this.handleReconnect();\n    };\n    \n    this.ws.onerror = (error) => {\n      console.error('WebSocket error:', error);\n    };\n  }\n\n  handleReconnect() {\n    if (this.reconnectAttempts < this.maxReconnectAttempts) {\n      const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);\n      setTimeout(() => {\n        this.reconnectAttempts++;\n        this.connect();\n      }, delay);\n    }\n  }\n\n  send(message) {\n    if (this.ws?.readyState === WebSocket.OPEN) {\n      this.ws.send(JSON.stringify(message));\n    } else {\n      // Queue for later\n      this.queueMessage(message);\n    }\n  }\n}`,
            tags: ["System Design", "WebSocket", "Real-time", "Networking"],
            followUps: [
              "How would you implement message acknowledgment to ensure delivery?",
              "What's the difference between WebSocket and HTTP/2 Server Push?",
              "How do you handle WebSocket connection in a service worker for background sync?"
            ]
          },
          {
            q: "Q3. State Management: How to manage chat state in the frontend?",
            a: "**State Structure:**\n```javascript\n{\n  chats: { [chatId]: Chat },\n  messages: { [chatId]: Message[] },\n  users: { [userId]: User },\n  presence: { [userId]: { online: boolean, lastSeen: timestamp } },\n  currentChat: string | null,\n  unreadCounts: { [chatId]: number },\n  typing: { [chatId]: Set<userId> }\n}\n```\n\n**State Management Patterns:**\n1. **Redux/Zustand**: Global state for chats, users\n2. **React Context**: Theme, auth state\n3. **Local State**: UI state (modals, dropdowns)\n4. **IndexedDB**: Persistent message cache\n5. **Optimistic Updates**: Update UI immediately, sync later\n\n**Key Considerations:**\n- Normalize data (avoid nested arrays)\n- Pagination for message history\n- Virtual scrolling for long chat lists\n- Memoization to prevent re-renders",
            code: `// Zustand Store Example\nimport create from 'zustand';\n\nconst useChatStore = create((set, get) => ({\n  chats: {},\n  messages: {},\n  \n  addMessage: (chatId, message) => set((state) => ({\n    messages: {\n      ...state.messages,\n      [chatId]: [...(state.messages[chatId] || []), message]\n    }\n  })),\n  \n  markAsRead: (chatId) => set((state) => ({\n    chats: {\n      ...state.chats,\n      [chatId]: { ...state.chats[chatId], unreadCount: 0 }\n    }\n  })),\n  \n  updatePresence: (userId, presence) => set((state) => ({\n    presence: { ...state.presence, [userId]: presence }\n  }))\n}));`,
            tags: ["System Design", "State Management", "React", "Frontend"],
            followUps: [
              "How would you handle state synchronization when multiple tabs are open?",
              "What's the best way to implement infinite scroll for message history?",
              "How do you prevent memory leaks with large message lists?"
            ]
          },
          {
            q: "Q4. Message Synchronization: Handling offline messages and conflicts",
            a: "**Offline Queue Pattern:**\n1. Store outgoing messages in IndexedDB when offline\n2. Assign temporary client-side IDs\n3. On reconnect, sync queue with server\n4. Server assigns real IDs, client updates references\n\n**Conflict Resolution:**\n- Use server timestamps as source of truth\n- Client timestamps for ordering before sync\n- Last-write-wins for metadata (read receipts)\n\n**Message Deduplication:**\n- Use message hash (content + sender + timestamp)\n- Check for duplicates before inserting\n- Handle duplicate delivery from server",
            code: "// Offline Message Queue\nclass OfflineQueue {\n  constructor() {\n    this.db = new IDBDatabase('whatsapp-offline');\n  }\n\n  async queueMessage(chatId, content) {\n    const tempId = 'temp_' + Date.now() + '_' + Math.random();\n    const message = {\n      id: tempId,\n      chatId,\n      content,\n      timestamp: Date.now(),\n      status: 'pending',\n      synced: false\n    };\n    \n    await this.db.messages.add(message);\n    return tempId;\n  }\n\n  async syncPendingMessages() {\n    const pending = await this.db.messages\n      .where('synced').equals(false)\n      .toArray();\n    \n    for (const msg of pending) {\n      try {\n        const response = await api.sendMessage(msg);\n        // Update with server ID\n        await this.db.messages.update(msg.id, {\n          id: response.id,\n          synced: true,\n          status: 'sent'\n        });\n      } catch (error) {\n        await this.db.messages.update(msg.id, {\n          status: 'failed'\n        });\n      }\n    }\n  }\n}",
            tags: ["System Design", "Offline", "Sync", "IndexedDB"],
            followUps: [
              "How would you handle message ordering when messages arrive out of order?",
              "What happens if a message fails to sync after multiple retries?",
              "How do you merge local and server state after reconnection?"
            ]
          },
          {
            q: "Q5. Media Handling: Images, Videos, Documents",
            a: "**Upload Flow:**\n1. Client compresses/resizes media (if needed)\n2. Upload to Media Service via multipart/form-data\n3. Media Service stores in object storage (S3)\n4. CDN URL returned to client\n5. Client sends message with media URL\n6. Receivers fetch from CDN\n\n**Optimizations:**\n- Lazy loading: Load thumbnails first, full image on click\n- Progressive loading: Show low-res, then high-res\n- Compression: Reduce file size before upload\n- Caching: Cache media in IndexedDB\n- Preloading: Preload next few messages' media\n\n**Security:**\n- Validate file types on client and server\n- Scan for malware\n- Rate limit uploads",
            code: `// Media Upload with Progress\nasync function uploadMedia(file, chatId) {\n  // Compress image if needed\n  const compressed = await compressImage(file);\n  \n  const formData = new FormData();\n  formData.append('file', compressed);\n  formData.append('chatId', chatId);\n  \n  const xhr = new XMLHttpRequest();\n  \n  return new Promise((resolve, reject) => {\n    xhr.upload.onprogress = (e) => {\n      const percent = (e.loaded / e.total) * 100;\n      updateUploadProgress(percent);\n    };\n    \n    xhr.onload = () => {\n      if (xhr.status === 200) {\n        const { url, mediaId } = JSON.parse(xhr.responseText);\n        resolve({ url, mediaId });\n      } else {\n        reject(new Error('Upload failed'));\n      }\n    };\n    \n    xhr.open('POST', '/api/media/upload');\n    xhr.send(formData);\n  });\n}\n\n// Lazy load media\nfunction MediaMessage({ url, thumbnail }) {\n  const [loaded, setLoaded] = useState(false);\n  const [showFull, setShowFull] = useState(false);\n  \n  return (\n    <div onClick={() => setShowFull(true)}>\n      {!loaded && <img src={thumbnail} />}\n      {showFull && (\n        <img \n          src={url} \n          onLoad={() => setLoaded(true)}\n          loading="lazy"\n        />\n      )}\n    </div>\n  );\n}`,
            tags: ["System Design", "Media", "Upload", "Performance"],
            followUps: [
              "How would you handle video uploads that are several GB in size?",
              "What's the best way to implement image compression in the browser?",
              "How do you prevent users from uploading malicious files?"
            ]
          },
          {
            q: "Q6. Presence System: Online Status, Last Seen, Typing Indicators",
            a: "**Implementation:**\n1. **Heartbeat**: Client sends ping every 30s when active\n2. **Last Activity**: Server tracks last heartbeat timestamp\n3. **Status Broadcast**: When user goes online/offline, notify contacts\n4. **Typing Indicator**: Send 'typing' event, auto-clear after 3s of inactivity\n\n**Optimizations:**\n- Batch presence updates\n- Throttle typing indicators (max 1 per second)\n- Cache presence in client (stale after 2 minutes)\n- Only show 'typing' to active chat participants\n\n**Privacy:**\n- Respect user's privacy settings (hide last seen)\n- Don't send presence to blocked users",
            code: `// Presence Manager\nclass PresenceManager {\n  constructor(ws) {\n    this.ws = ws;\n    this.isActive = true;\n    this.heartbeatInterval = null;\n    this.typingTimeouts = new Map();\n  }\n\n  startHeartbeat() {\n    this.heartbeatInterval = setInterval(() => {\n      if (this.isActive) {\n        this.ws.send(JSON.stringify({\n          type: 'heartbeat',\n          timestamp: Date.now()\n        }));\n      }\n    }, 30000);\n  }\n\n  sendTyping(chatId) {\n    // Throttle: max once per second\n    const lastSent = this.typingTimeouts.get(chatId);\n    if (lastSent && Date.now() - lastSent < 1000) return;\n    \n    this.ws.send(JSON.stringify({\n      type: 'typing',\n      chatId\n    }));\n    \n    this.typingTimeouts.set(chatId, Date.now());\n    \n    // Auto-clear after 3s\n    setTimeout(() => {\n      this.ws.send(JSON.stringify({\n        type: 'typing_stop',\n        chatId\n      }));\n    }, 3000);\n  }\n\n  handleVisibilityChange() {\n    document.addEventListener('visibilitychange', () => {\n      this.isActive = !document.hidden;\n      if (!this.isActive) {\n        this.ws.send(JSON.stringify({ type: 'away' }));\n      }\n    });\n  }\n}`,
            tags: ["System Design", "Presence", "Real-time", "UX"],
            followUps: [
              "How would you implement 'last seen' privacy settings (nobody, contacts only, everyone)?",
              "What's the best way to show typing indicators without spamming the server?",
              "How do you handle presence when the user switches between devices?"
            ]
          },
          {
            q: "Q7. Performance Optimization: Virtual Scrolling, Code Splitting, Caching",
            a: "**Virtual Scrolling:**\n- Only render visible messages (react-window, react-virtualized)\n- Estimate item heights for smooth scrolling\n- Load more messages on scroll up\n\n**Code Splitting:**\n- Lazy load chat components\n- Split by route (chat list, chat view, settings)\n- Dynamic imports for heavy features\n\n**Caching Strategy:**\n- **Memory**: Recent messages, active chats\n- **IndexedDB**: Message history, media cache\n- **Service Worker**: Offline support, background sync\n- **HTTP Cache**: Static assets, media files\n\n**Bundle Optimization:**\n- Tree shaking\n- Minification\n- Compression (gzip/brotli)\n- CDN for static assets",
            code: `// Virtual Scrolling for Messages\nimport { FixedSizeList } from 'react-window';\n\nfunction MessageList({ messages }) {\n  const Row = ({ index, style }) => (\n    <div style={style}>\n      <Message message={messages[index]} />\n    </div>\n  );\n  \n  return (\n    <FixedSizeList\n      height={600}\n      itemCount={messages.length}\n      itemSize={80}\n      width="100%"\n    >\n      {Row}\n    </FixedSizeList>\n  );\n}\n\n// Code Splitting\nconst ChatView = lazy(() => import('./ChatView'));\nconst Settings = lazy(() => import('./Settings'));\n\nfunction App() {\n  return (\n    <Suspense fallback={<Loading />}>\n      <Routes>\n        <Route path="/chat/:id" element={<ChatView />} />\n        <Route path="/settings" element={<Settings />} />\n      </Routes>\n    </Suspense>\n  );\n}\n\n// Service Worker Caching\nself.addEventListener('fetch', (event) => {\n  if (event.request.url.includes('/api/messages')) {\n    event.respondWith(\n      caches.open('messages-v1').then((cache) => {\n        return fetch(event.request).then((response) => {\n          cache.put(event.request, response.clone());\n          return response;\n        });\n      })\n    );\n  }\n});`,
            tags: ["System Design", "Performance", "Optimization", "React"],
            followUps: [
              "How would you implement infinite scroll that loads messages as you scroll up?",
              "What's the best caching strategy for media files?",
              "How do you measure and improve Core Web Vitals for a chat app?"
            ]
          },
          {
            q: "Q8. Security: End-to-End Encryption, Authentication, XSS Prevention",
            a: "**End-to-End Encryption (E2E):**\n- Encrypt messages client-side before sending\n- Use Web Crypto API for encryption\n- Exchange keys via secure channel\n- Never store plaintext on server\n\n**Authentication:**\n- JWT tokens with short expiry\n- Refresh tokens stored in httpOnly cookies\n- QR code scan for initial pairing\n- Device fingerprinting\n\n**XSS Prevention:**\n- Sanitize user input (DOMPurify)\n- Content Security Policy (CSP)\n- Avoid innerHTML, use textContent\n- Escape user-generated content\n\n**CSRF Protection:**\n- SameSite cookies\n- CSRF tokens for state-changing operations",
            code: `// Message Encryption (Simplified)\nasync function encryptMessage(message, recipientPublicKey) {\n  const encoder = new TextEncoder();\n  const data = encoder.encode(message);\n  \n  // Generate symmetric key\n  const key = await crypto.subtle.generateKey(\n    { name: 'AES-GCM', length: 256 },\n    true,\n    ['encrypt']\n  );\n  \n  // Encrypt message\n  const encrypted = await crypto.subtle.encrypt(\n    { name: 'AES-GCM', iv: crypto.getRandomValues(new Uint8Array(12)) },\n    key,\n    data\n  );\n  \n  // Encrypt key with recipient's public key (RSA)\n  const encryptedKey = await crypto.subtle.encrypt(\n    { name: 'RSA-OAEP' },\n    recipientPublicKey,\n    await crypto.subtle.exportKey('raw', key)\n  );\n  \n  return { encrypted, encryptedKey };\n}\n\n// Input Sanitization\nimport DOMPurify from 'dompurify';\n\nfunction MessageContent({ content }) {\n  const sanitized = DOMPurify.sanitize(content, {\n    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'],\n    ALLOWED_ATTR: ['href']\n  });\n  \n  return <div dangerouslySetInnerHTML={{ __html: sanitized }} />;\n}\n\n// CSP Header\nContent-Security-Policy: \n  default-src 'self';\n  script-src 'self' 'unsafe-inline';\n  style-src 'self' 'unsafe-inline';\n  img-src 'self' data: https:;\n  connect-src 'self' wss://chat.whatsapp.com;`,
            tags: ["System Design", "Security", "Encryption", "Frontend"],
            followUps: [
              "How would you implement key exchange for E2E encryption?",
              "What's the difference between encryption at rest and in transit?",
              "How do you prevent man-in-the-middle attacks in a web app?"
            ]
          },
          {
            q: "Q9. Search Functionality: Full-Text Search Across Messages",
            a: "**Client-Side Search (Small Scale):**\n- Index messages in IndexedDB\n- Use Fuse.js or similar for fuzzy search\n- Search as user types (debounced)\n\n**Server-Side Search (Large Scale):**\n- Elasticsearch or similar search engine\n- Index messages on ingestion\n- Search API with pagination\n- Highlight matching text\n\n**Search Features:**\n- Search by sender, date range, media type\n- Filter by chat/group\n- Search within specific chat\n- Recent searches cache",
            code: `// Client-Side Search with IndexedDB\nclass MessageSearch {\n  constructor(db) {\n    this.db = db;\n    this.index = null;\n  }\n\n  async buildIndex() {\n    const messages = await this.db.messages.toArray();\n    this.index = new Fuse(messages, {\n      keys: ['content', 'sender.name'],\n      threshold: 0.3,\n      includeScore: true\n    });\n  }\n\n  async search(query, filters = {}) {\n    if (!this.index) await this.buildIndex();\n    \n    let results = this.index.search(query);\n    \n    // Apply filters\n    if (filters.chatId) {\n      results = results.filter(r => r.item.chatId === filters.chatId);\n    }\n    if (filters.dateFrom) {\n      results = results.filter(r => r.item.timestamp >= filters.dateFrom);\n    }\n    \n    return results.map(r => r.item);\n  }\n}\n\n// Debounced Search Input\nfunction SearchBar() {\n  const [query, setQuery] = useState('');\n  const [results, setResults] = useState([]);\n  \n  const debouncedSearch = useMemo(\n    () => debounce(async (q) => {\n      if (q.length > 2) {\n        const res = await searchMessages(q);\n        setResults(res);\n      } else {\n        setResults([]);\n      }\n    }, 300),\n    []\n  );\n  \n  useEffect(() => {\n    debouncedSearch(query);\n  }, [query]);\n  \n  return (\n    <input\n      value={query}\n      onChange={(e) => setQuery(e.target.value)}\n      placeholder="Search messages..."\n    />\n  );\n}`,
            tags: ["System Design", "Search", "IndexedDB", "UX"],
            followUps: [
              "How would you implement search across millions of messages?",
              "What's the best way to highlight search results in messages?",
              "How do you handle search in multiple languages?"
            ]
          },
          {
            q: "Q10. Group Chat Features: Adding Members, Admin Controls, Notifications",
            a: "**Group Management:**\n- Add/remove members (with permissions)\n- Admin roles (admin, member)\n- Group settings (name, description, photo)\n- Mute notifications per group\n\n**Message Handling:**\n- Broadcast to all members\n- Handle member join/leave events\n- Show 'X added Y' system messages\n- Read receipts per member\n\n**Optimizations:**\n- Batch member updates\n- Lazy load member list\n- Cache group metadata\n- Optimistic UI for member actions",
            code: "// Group Chat Component\nfunction GroupChat({ groupId }) {\n  const [group, setGroup] = useState(null);\n  const [members, setMembers] = useState([]);\n  \n  useEffect(() => {\n    // Load group info\n    loadGroup(groupId).then(setGroup);\n    loadMembers(groupId).then(setMembers);\n    \n    // Subscribe to group events\n    ws.on('group_member_added', (data) => {\n      if (data.groupId === groupId) {\n        setMembers(prev => [...prev, data.member]);\n        addSystemMessage(data.addedBy + ' added ' + data.member.name);\n      }\n    });\n    \n    ws.on('group_member_removed', (data) => {\n      if (data.groupId === groupId) {\n        setMembers(prev => prev.filter(m => m.id !== data.memberId));\n        addSystemMessage(data.removedBy + ' removed ' + data.member.name);\n      }\n    });\n  }, [groupId]);\n  \n  const addMember = async (userId) => {\n    // Optimistic update\n    const tempMember = { id: userId, name: 'Loading...' };\n    setMembers(prev => [...prev, tempMember]);\n    \n    try {\n      await api.addGroupMember(groupId, userId);\n      // Server will broadcast update\n    } catch (error) {\n      // Revert on error\n      setMembers(prev => prev.filter(m => m.id !== userId));\n    }\n  };\n  \n  return (\n    <div>\n      <GroupHeader group={group} members={members} />\n      <MessageList chatId={groupId} />\n      <MessageInput chatId={groupId} />\n    </div>\n  );\n}",
            tags: ["System Design", "Group Chat", "Real-time", "UX"],
            followUps: [
              "How would you handle permissions in a group (who can add members, change settings)?",
              "What's the best way to show 'X, Y, and 5 others' in group member list?",
              "How do you handle notifications when you're mentioned in a group?"
            ]
          },
          {
            q: "Q11. Read Receipts and Message Status: Sent, Delivered, Read",
            a: "**Message States:**\n1. **Pending**: Queued locally, not sent\n2. **Sent**: Delivered to server\n3. **Delivered**: Received by recipient's device\n4. **Read**: Recipient opened the chat\n\n**Implementation:**\n- Server tracks delivery status\n- Client sends 'read' event when message is viewed\n- Update message status optimistically\n- Batch read receipts (don't send one per message)\n\n**Privacy:**\n- User can disable read receipts\n- Show 'sent' but not 'read' if disabled\n- Don't send read receipt for system messages",
            code: "// Message Status Tracking\nclass MessageStatusManager {\n  constructor(ws) {\n    this.ws = ws;\n    this.readReceiptQueue = [];\n    this.lastReadReceipt = Date.now();\n  }\n\n  markAsRead(chatId, messageIds) {\n    // Batch read receipts (max once per 2 seconds)\n    const now = Date.now();\n    if (now - this.lastReadReceipt < 2000) {\n      this.readReceiptQueue.push(...messageIds);\n      return;\n    }\n    \n    const allIds = [...this.readReceiptQueue, ...messageIds];\n    this.readReceiptQueue = [];\n    this.lastReadReceipt = now;\n    \n    this.ws.send(JSON.stringify({\n      type: 'read_receipt',\n      chatId,\n      messageIds: allIds\n    }));\n  }\n\n  handleDeliveryStatus(messageId, status) {\n    // Update local message status\n    updateMessageStatus(messageId, status);\n    \n    // Show in UI\n    if (status === 'delivered') {\n      showDoubleCheckmark(messageId);\n    } else if (status === 'read') {\n      showBlueCheckmark(messageId);\n    }\n  }\n}\n\n// Track message visibility\nfunction useMessageReadTracking(chatId, messages) {\n  const observerRef = useRef(null);\n  \n  useEffect(() => {\n    const observer = new IntersectionObserver((entries) => {\n      entries.forEach(entry => {\n        if (entry.isIntersecting) {\n          const messageId = entry.target.dataset.messageId;\n          markAsRead(chatId, [messageId]);\n        }\n      });\n    }, { threshold: 0.5 });\n    \n    observerRef.current = observer;\n    \n    messages.forEach(msg => {\n      const element = document.querySelector('[data-message-id=\"' + msg.id + '\"]');\n      if (element) observer.observe(element);\n    });\n    \n    return () => observer.disconnect();\n  }, [messages, chatId]);\n}",
            tags: ["System Design", "Read Receipts", "UX", "Real-time"],
            followUps: [
              "How would you handle read receipts in group chats?",
              "What happens if a user reads a message on multiple devices?",
              "How do you prevent read receipt spam?"
            ]
          },
          {
            q: "Q12. Notification System: Browser Notifications, Badge Counts, Sounds",
            a: "**Browser Notifications:**\n- Request permission on first use\n- Show notification for new messages (when tab not focused)\n- Group notifications by chat\n- Action buttons (Reply, Mark as read)\n- Click notification to open chat\n\n**Badge Count:**\n- Update favicon with unread count\n- Show badge in tab title\n- Service Worker updates badge\n\n**Sound Notifications:**\n- Play sound for new messages\n- Respect system mute/Do Not Disturb\n- User can disable per chat\n- Different sounds for different chat types",
            code: "// Notification Manager\nclass NotificationManager {\n  constructor() {\n    this.permission = Notification.permission;\n    this.soundEnabled = true;\n  }\n\n  async requestPermission() {\n    if (this.permission === 'default') {\n      this.permission = await Notification.requestPermission();\n    }\n    return this.permission === 'granted';\n  }\n\n  showNotification(message, chat) {\n    if (this.permission !== 'granted') return;\n    if (document.hasFocus()) return; // Don't notify if tab is active\n    \n    const notification = new Notification(\n      chat.name || 'New Message',\n      {\n        body: message.content,\n        icon: chat.avatar || '/default-avatar.png',\n        badge: '/badge.png',\n        tag: chat.id, // Group notifications by chat\n        requireInteraction: false,\n        actions: [\n          { action: 'reply', title: 'Reply' },\n          { action: 'mark-read', title: 'Mark as Read' }\n        ]\n      }\n    );\n    \n    notification.onclick = () => {\n      window.focus();\n      openChat(chat.id);\n      notification.close();\n    };\n    \n    if (this.soundEnabled) {\n      this.playSound();\n    }\n  }\n\n  updateBadge(count) {\n    // Update favicon\n    if (count > 0) {\n      updateFaviconWithBadge(count);\n      document.title = '(' + count + ') WhatsApp Web';\n    } else {\n      resetFavicon();\n      document.title = 'WhatsApp Web';\n    }\n    \n    // Service Worker badge (if supported)\n    if ('setAppBadge' in navigator) {\n      navigator.setAppBadge(count);\n    }\n  }\n\n  playSound() {\n    const audio = new Audio('/notification.mp3');\n    audio.volume = 0.5;\n    audio.play().catch(() => {}); // Ignore errors\n  }\n}\n\n// Service Worker Notification\nself.addEventListener('push', (event) => {\n  const data = event.data.json();\n  \n  event.waitUntil(\n    self.registration.showNotification(data.title, {\n      body: data.body,\n      icon: data.icon,\n      badge: '/badge.png',\n      tag: data.chatId\n    })\n  );\n});",
            tags: ["System Design", "Notifications", "PWA", "UX"],
            followUps: [
              "How would you implement notification preferences (mute specific chats)?",
              "What's the best way to handle notification grouping?",
              "How do you prevent notification fatigue for users in many groups?"
            ]
          },
          {
            q: "Q13. Scalability: Handling Millions of Users and Messages",
            a: "**Database Sharding:**\n- Shard by user ID or chat ID\n- Horizontal scaling across multiple DB instances\n- Consistent hashing for shard selection\n\n**Caching Layer:**\n- Redis for hot data (active chats, presence)\n- CDN for static assets and media\n- Client-side caching (IndexedDB)\n\n**Load Balancing:**\n- Multiple WebSocket servers behind load balancer\n- Sticky sessions (same user → same server)\n- Health checks and auto-scaling\n\n**Message Queue:**\n- Kafka/RabbitMQ for async message processing\n- Separate queues for different priorities\n- Batch processing for efficiency",
            diagram: `Scalability Architecture

[Load Balancer]
     │
     ├─> [WebSocket Server 1] ──> [Redis Cache]
     ├─> [WebSocket Server 2] ──> [Message Queue]
     ├─> [WebSocket Server N] ──> [Database Shard 1]
                                  [Database Shard 2]
                                  [Database Shard N]

[CDN] ──> [Media Storage (S3)]
     │
     └─> [Static Assets]`,
            tags: ["System Design", "Scalability", "Architecture", "Backend"],
            followUps: [
              "How would you handle database sharding when a user's chats span multiple shards?",
              "What's the best way to implement sticky sessions for WebSocket connections?",
              "How do you ensure message ordering across distributed systems?"
            ]
          },
          {
            q: "Q14. Testing Strategy: Unit Tests, Integration Tests, E2E Tests",
            a: "**Unit Tests:**\n- Test individual components (Message, ChatList)\n- Test utility functions (encryption, formatting)\n- Mock WebSocket and API calls\n- Use Jest + React Testing Library\n\n**Integration Tests:**\n- Test component interactions\n- Test state management flows\n- Test WebSocket message handling\n\n**E2E Tests:**\n- Test complete user flows (send message, receive message)\n- Use Playwright or Cypress\n- Test across browsers\n- Test offline/online scenarios\n\n**Performance Tests:**\n- Load testing for WebSocket connections\n- Measure render performance\n- Test with large message lists",
            code: "// Unit Test Example\nimport { render, screen, fireEvent } from '@testing-library/react';\nimport { MessageInput } from './MessageInput';\n\ndescribe('MessageInput', () => {\n  it('sends message on Enter key', () => {\n    const onSend = jest.fn();\n    render(<MessageInput onSend={onSend} />);\n    \n    const input = screen.getByPlaceholderText('Type a message...');\n    fireEvent.change(input, { target: { value: 'Hello' } });\n    fireEvent.keyDown(input, { key: 'Enter' });\n    \n    expect(onSend).toHaveBeenCalledWith('Hello');\n  });\n});\n\n// Integration Test\nimport { render, waitFor } from '@testing-library/react';\nimport { ChatView } from './ChatView';\nimport { mockWebSocket } from './test-utils';\n\ndescribe('ChatView Integration', () => {\n  it('displays new message when received via WebSocket', async () => {\n    const ws = mockWebSocket();\n    render(<ChatView chatId=\"123\" />);\n    \n    ws.simulateMessage({\n      type: 'new_message',\n      chatId: '123',\n      message: { id: '1', content: 'Test', sender: 'Alice' }\n    });\n    \n    await waitFor(() => {\n      expect(screen.getByText('Test')).toBeInTheDocument();\n    });\n  });\n});\n\n// E2E Test (Playwright)\nimport { test, expect } from '@playwright/test';\n\ntest('send and receive message', async ({ page }) => {\n  await page.goto('/chat/123');\n  \n  // Send message\n  await page.fill('[data-testid=\"message-input\"]', 'Hello');\n  await page.press('[data-testid=\"message-input\"]', 'Enter');\n  \n  // Wait for message to appear\n  await expect(page.locator('text=Hello')).toBeVisible();\n  \n  // Simulate receiving message\n  await page.evaluate(() => {\n    window.ws.simulateMessage({\n      type: 'new_message',\n      message: { content: 'Hi there!' }\n    });\n  });\n  \n  await expect(page.locator('text=Hi there!')).toBeVisible();\n});",
            tags: ["System Design", "Testing", "Quality", "Frontend"],
            followUps: [
              "How would you test WebSocket reconnection logic?",
              "What's the best way to test offline functionality?",
              "How do you test performance with thousands of messages?"
            ]
          },
          {
            q: "Q15. Error Handling and Resilience: Network Failures, Retries, Fallbacks",
            a: "**Network Error Handling:**\n- Retry with exponential backoff\n- Queue failed requests\n- Show user-friendly error messages\n- Graceful degradation (offline mode)\n\n**WebSocket Reconnection:**\n- Automatic reconnection with backoff\n- Show connection status to user\n- Sync missed messages on reconnect\n- Handle duplicate messages\n\n**Fallback Strategies:**\n- Fallback to polling if WebSocket fails\n- Show cached data when offline\n- Queue actions for later sync\n- Optimistic UI updates",
            code: "// Retry with Exponential Backoff\nasync function fetchWithRetry(url, options = {}, maxRetries = 3) {\n  for (let i = 0; i < maxRetries; i++) {\n    try {\n      const response = await fetch(url, options);\n      if (response.ok) return response;\n      throw new Error('HTTP ' + response.status);\n    } catch (error) {\n      if (i === maxRetries - 1) throw error;\n      \n      const delay = Math.min(1000 * Math.pow(2, i), 30000);\n      await new Promise(resolve => setTimeout(resolve, delay));\n    }\n  }\n}\n\n// Error Boundary\nclass ChatErrorBoundary extends React.Component {\n  state = { hasError: false, error: null };\n  \n  static getDerivedStateFromError(error) {\n    return { hasError: true, error };\n  }\n  \n  componentDidCatch(error, errorInfo) {\n    logErrorToService(error, errorInfo);\n  }\n  \n  render() {\n    if (this.state.hasError) {\n      return (\n        <div className=\"error-fallback\">\n          <h2>Something went wrong</h2>\n          <button onClick={() => window.location.reload()}>Reload</button>\n        </div>\n      );\n    }\n    return this.props.children;\n  }\n}\n\n// Connection Status Indicator\nfunction ConnectionStatus() {\n  const [status, setStatus] = useState('connected');\n  \n  useEffect(() => {\n    ws.on('open', () => setStatus('connected'));\n    ws.on('close', () => setStatus('disconnected'));\n    ws.on('error', () => setStatus('error'));\n  }, []);\n  \n  return (\n    <div className={'connection-status ' + status}>\n      {status === 'connected' && '🟢 Online'}\n      {status === 'disconnected' && '🟡 Connecting...'}\n      {status === 'error' && '🔴 Connection Error'}\n    </div>\n  );\n}",
            tags: ["System Design", "Error Handling", "Resilience", "UX"],
            followUps: [
              "How would you handle partial failures (some messages sent, some failed)?",
              "What's the best way to show error states without overwhelming the user?",
              "How do you test error scenarios and edge cases?"
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'company-tech',
    title: 'Company Specific: Technical & System Design',
    items: [
      {
        q: "[Amazon] Debounce / Search / Optimization",
        a: "- **Debounce**: Limit rate of function execution.\n- **Search**: Autocomplete with caching.\n- **Optimization**: Virtualization for 1000+ components."
      },
      {
        q: "[Google] Infinite Scroll / Hooks / Nav",
        a: "- **Infinite Scroll**: Virtualization + IntersectionObserver.\n- **Custom Hook**: `useFetch` with loading/error/data.\n- **Nav**: Responsive hamburger menu."
      },
      {
        q: "[Meta] Comments / Optimistic UI / State",
        a: "- **Nested Comments**: Recursive component rendering.\n- **Optimistic UI**: Update state immediately, revert on API fail.\n- **State**: Redux/Context for large apps."
      },
      {
        q: "[Microsoft] Drag-Drop / Forms / Collaborative",
        a: "- **Drag-Drop**: HTML5 API or library.\n- **Multi-step Form**: State management for wizard.\n- **Collaborative Editor**: WebSockets + OT/CRDTs."
      },
      {
        q: "[Swiggy/Zomato] Food Ordering / Filters",
        a: "- **Filters**: Client-side vs Server-side filtering.\n- **Cart**: Persistent cart (localStorage).\n- **Menu**: Category navigation."
      },
      {
        q: "[Flipkart/Amazon] Comparison / Wishlist",
        a: "- **Comparison**: Side-by-side view, identifying diffs.\n- **Wishlist**: Add/Remove toggle, sync with backend."
      },
      {
        q: "[Uber/Ola] Maps / Tracking",
        a: "- **Tracking**: Plotting coordinates on Map SDK (Google/Mapbox). Updating marker position via socket events."
      },
      {
        q: "[Netflix] Carousel / Video Player",
        a: "- **Carousel**: Horizontal scroll snap, lazy loading images.\n- **Video**: Custom controls overlaid on video element."
      },
      {
        q: "[Payments] Gateway / Dashboard",
        a: "- **Gateway**: Handling SDK integration securely.\n- **Dashboard**: Chart.js/Recharts for analytics."
      },
      {
        q: "[System Design] Shopping Cart",
        a: "- **Data**: `cartItems: { productId, qty, price }[]`.\n- **Sync**: Merge local cart with server cart on login.\n- **Events**: BroadcastChannel API for multi-tab sync."
      },
      {
        q: "[System Design] Google Calendar",
        a: "- **Grid**: CSS Grid for layout.\n- **Events**: Positioning using absolute (top = start time, height = duration).\n- **Virtualization**: Essential for month view."
      },
      {
        q: "[System Design] Twitter/X Feed",
        a: "- **Infinite Scroll**: Load tweets as user scrolls.\n- **Real-time Updates**: WebSocket/SSE for new tweets.\n- **Caching**: Cache user timeline, trending topics.\n- **Optimistic UI**: Show tweet immediately, sync later.\n- **Virtualization**: Render only visible tweets (react-window)."
      },
      {
        q: "[System Design] E-commerce Product Page",
        a: "- **Image Gallery**: Lazy loading, zoom, carousel.\n- **Add to Cart**: Optimistic UI, sync across tabs.\n- **Reviews**: Pagination, filtering, sorting.\n- **Related Products**: Recommendation algorithm.\n- **SEO**: Server-side rendering for product pages."
      },
      {
        q: "[System Design] Video Streaming Player (YouTube/Netflix)",
        a: "- **Adaptive Streaming**: HLS/DASH for quality switching.\n- **Buffering**: Preload next segments.\n- **Subtitles**: WebVTT format, multiple languages.\n- **Playback Controls**: Custom controls overlay.\n- **Analytics**: Track watch time, engagement."
      },
      {
        q: "[Google] Design a Search Autocomplete",
        a: "- **Debouncing**: Wait 300ms after user stops typing.\n- **Caching**: Cache popular queries in memory.\n- **Ranking**: Sort by relevance, popularity, recency.\n- **Keyboard Navigation**: Arrow keys, Enter to select.\n- **Accessibility**: ARIA labels, screen reader support."
      },
      {
        q: "[Meta] Design a Comments System",
        a: "- **Nested Comments**: Recursive component structure.\n- **Real-time Updates**: WebSocket for new comments.\n- **Pagination**: Load more comments on scroll.\n- **Rich Text**: Support mentions, links, emojis.\n- **Moderation**: Filter inappropriate content."
      },
      {
        q: "[Amazon] Design a Product Comparison Feature",
        a: "- **Side-by-side Layout**: CSS Grid for comparison table.\n- **Highlight Differences**: Visual indicators for different specs.\n- **Add/Remove Products**: Max 3-4 products at once.\n- **Persist Selection**: Save comparison in localStorage.\n- **Mobile**: Stack vertically on small screens."
      },
      {
        q: "[Microsoft] Design a Collaborative Document Editor",
        a: "- **Real-time Sync**: Operational Transform (OT) or CRDTs.\n- **Cursor Positions**: Show other users' cursors.\n- **Conflict Resolution**: Handle simultaneous edits.\n- **Version History**: Track changes, allow undo/redo.\n- **WebSocket**: Bi-directional communication."
      },
      {
        q: "[Netflix] Design a Movie/Show Carousel",
        a: "- **Horizontal Scroll**: CSS scroll-snap for smooth scrolling.\n- **Lazy Loading**: Load images as they enter viewport.\n- **Infinite Loop**: Seamless wrap-around effect.\n- **Keyboard Navigation**: Arrow keys, mouse drag.\n- **Responsive**: Adapt to screen size (show 3-7 items)."
      },
      {
        q: "[Uber/Ola] Design a Live Tracking Feature",
        a: "- **Map Integration**: Google Maps/Mapbox SDK.\n- **Real-time Updates**: WebSocket for driver location.\n- **Marker Animation**: Smooth movement of driver marker.\n- **ETA Calculation**: Distance/time estimation.\n- **Route Display**: Show driver's route to destination."
      },
      {
        q: "[System Design] Notification System",
        a: "- **Real-time**: WebSocket/SSE for instant notifications.\n- **Types**: In-app, push, email, SMS.\n- **Preferences**: User can enable/disable notification types.\n- **Grouping**: Group similar notifications.\n- **Read/Unread**: Track notification state."
      },
      {
        q: "[System Design] File Upload with Progress",
        a: "- **Chunked Upload**: Split large files into chunks.\n- **Progress Bar**: Track upload percentage.\n- **Resume**: Resume interrupted uploads.\n- **Preview**: Show image/video preview before upload.\n- **Validation**: Check file type, size on client and server."
      }
    ]
  },
  {
    id: 'behavioral',
    title: 'Behavioral & Tips',
    items: [
      {
        q: "Culture Fit: Why are you looking for a switch?",
        a: "Focus on growth. 'I'm looking for new challenges that my current role can't provide,' or 'I want to work on larger scale systems.' Never badmouth your current employer."
      },
      {
        q: "Challenge: Tell me about a difficult project.",
        a: "Use the STAR method: Situation, Task, Action, Result. \nExample: 'We had a memory leak (Situation). My task was to fix it (Task). I used Chrome Profiler to isolate the component (Action). Load time improved by 40% (Result).'"
      },
      {
        q: "General Tips",
        a: "- Interact calmly. Everyone is nervous.\n- Don't leave out DSA, even for frontend roles.\n- Ask clarifying questions before coding.\n- If you can't solve it, discuss your thought process."
      },
      {
        q: "Tell me about yourself / Walk me through your resume",
        a: "Structure: Current role → Key achievements → Why this role/company → What you bring.\n\nExample: 'I'm a Frontend Engineer with 3 years building React apps. I recently optimized our bundle size by 40% using code splitting. I'm excited about [Company] because [specific reason]. I bring expertise in [relevant tech] and a track record of [achievement].'"
      },
      {
        q: "Why do you want to work here?",
        a: "Show you've researched the company:\n- Mention specific products/features you admire\n- Reference company values/mission\n- Discuss growth opportunities\n- Connect your skills to their needs\n\nAvoid generic answers like 'it's a great company'."
      },
      {
        q: "What's your biggest weakness?",
        a: "Choose a real weakness that you're actively improving:\n1. Name the weakness\n2. Explain how you're addressing it\n3. Show progress/results\n\nExample: 'I used to struggle with time estimation. I've started tracking my tasks and comparing estimates vs actuals. My accuracy has improved by 30% over the past 6 months.'"
      },
      {
        q: "Where do you see yourself in 5 years?",
        a: "Show ambition aligned with company growth:\n- Technical growth: Senior/Staff Engineer, Tech Lead\n- Impact: Leading larger projects, mentoring\n- Domain expertise: Deepening in specific area\n- Leadership: Optional, if interested\n\nKeep it realistic and show you'll grow with the company."
      },
      {
        q: "Tell me about a time you disagreed with your manager/team",
        a: "Use STAR method. Show:\n- Professional disagreement (not personal)\n- How you communicated respectfully\n- Focus on solution, not blame\n- Positive outcome or learning\n\nExample: 'We disagreed on using a new framework. I presented data on migration costs and team learning curve. We compromised by prototyping first. The prototype validated my concerns, and we chose a better solution.'"
      },
      {
        q: "How do you handle tight deadlines?",
        a: "Show prioritization and communication:\n- Break down tasks, identify critical path\n- Communicate early if deadline is at risk\n- Ask for help when needed\n- Focus on MVP, iterate later\n- Learn from the experience\n\nExample: 'I prioritize tasks by impact, communicate blockers early, and focus on delivering core features first. I also document what we deferred for post-launch.'"
      },
      {
        q: "Do you have any questions for us?",
        a: "Ask thoughtful questions:\n- Team structure and collaboration\n- Technical challenges they're solving\n- Growth opportunities\n- Company culture\n- What success looks like in this role\n\nAvoid: Salary, benefits, vacation (ask HR later)."
      }
    ]
  }
];