export interface ChapterContent {
    id: string;
    title: string;
    items: {
      q: string;
      a: string;
      code?: string; // Optional code snippet
      tags?: string[]; // Companies / topics chips (Google, Meta, Frontend, DSA, etc.)
      followUps?: string[]; // Extra prompts / follow-up interview questions
    }[];
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
          code: `setTimeout(()=>console.log("b"), 5000);\nsetTimeout(()=>console.log("a"),0);\nsetTimeout(()=>console.log("i"));\nconsole.log("yo");\n// Output: yo, a, i, b`
        },
        {
          q: "Q8. What would be the output of the following?",
          a: "1. `arr1` becomes ['j','o','h','n'].\n2. `arr2` is a reference to `arr1` reversed: ['n','h','o','j']. Note: reverse() mutates the original array!\n3. `arr3` is ['j','o','n','e','s'].\n4. `arr2.push(arr3)` adds the entire array as a single element.\n\nResult:\nLength: 5 (n, h, o, j, [array])\nLast: ['j','o','n','e','s']",
          code: `var arr1 = 'john'.split('');\nvar arr2 = arr1.reverse();\nvar arr3 = 'jones'.split('');\narr2.push(arr3);\nconsole.log('length:', arr1.length, 'last:', arr1.slice(-1));`
        },
        {
          q: "Q11. What is the output of the following closure?",
          a: "Output: 1.\nThe IIFE executes immediately. Inside, `delete x` attempts to delete the local variable `x`. However, variables declared with `var` cannot be deleted. The operation returns false (or fails silently in non-strict mode), and the function returns the value of x (1).",
          code: `var x = 1;\nvar output = (function() {\n  delete x;\n  return x;\n})();\nconsole.log(output);`
        },
        {
          q: "Q12. How do you lower the load time of your page in Javascript?",
          a: "**Optimize Performance:**\n- **Minify code**: Remove spaces, comments.\n- **Compress files**: Gzip/Brotli.\n- **Lazy loading**: Load JS only when needed.\n- **Code splitting**: Split large bundles.\n- **Tree shaking**: Remove unused code.\n- **CDN**: Use Content Delivery Networks.\n- **Async/Defer**: Load scripts without blocking rendering."
        },
        {
          q: "Q13. What is prototype inheritance?",
          a: "Prototype inheritance is JavaScript's way of sharing properties and methods between objects.\n\n- Every object has a prototype (parent object).\n- Child objects inherit properties from their prototype.\n- If a property is not found in the child, JS looks up the prototype chain.",
          code: `let animal = { type: "mammal" };\nlet dog = Object.create(animal);\ndog.breed = "labrador";\n\nconsole.log(dog.type); // "mammal" (inherited)`
        },
        {
          q: "Q17. Implement function to read field inside a nested object.",
          a: "We need to safely traverse the object path provided as a string (e.g., 'A.B.C').",
          code: `function read(obj, path) {\n  const keys = path.split('.');\n  let current = obj;\n\n  for (let key of keys) {\n    if (!current || !(key in current)) return undefined;\n    current = current[key];\n  }\n  return current;\n}\n\nconst obj = { A: { B: { C: { D: { E: 2 } } } } };\nconsole.log(read(obj, "A.B.C.D.E")); // 2`
        },
        {
          q: "Q18. Remove duplicates from array using ES6",
          a: "Use the Set object, which only stores unique values.",
          code: `const arr = [1, 2, 2, 3, 4, 4];\nconst unique = [...new Set(arr)];\nconsole.log(unique); // [1, 2, 3, 4]`
        },
        {
          q: "Q20. What is the result of 3 + 2 + \"7\"?",
          a: "Output: \"57\"\n\n1. `3 + 2` is evaluated first (Left-to-Right) = `5`.\n2. `5 + \"7\"` performs string concatenation = `\"57\"`."
        },
        {
          q: "Q21. Output of following (Scope/Const)?",
          a: "Output: 'white_rabbit'.\n`const` has block scope. The inner KEY only exists inside the if block. The outer KEY remains unchanged.",
          code: `const KEY = 'white_rabbit';\nif (true) {\n  const KEY = 'ginger_rabbit';\n}\nconsole.log(KEY);`
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
          code: `const obj = {\n  name: "Alice",\n  regular: function() { console.log(this.name); },\n  arrow: () => { console.log(this.name); }\n};\n\nobj.regular(); // "Alice"\nobj.arrow(); // undefined (window/global)`
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
          a: "Text color will be **GREEN**.\n\nSpecificity:\n1. `div#test span` = 1 ID + 2 elements (102 pts)\n2. `div span` = 2 elements (2 pts)\n3. `span` = 1 element (1 pt)\n\nHighest specificity wins.",
          code: `<div id="test"><span>Text</span></div>\n\ndiv#test span { color: green; }\ndiv span { color: blue; }\nspan { color: red; }`
        },
        {
          q: "Q27. Draw concentric circles using CSS",
          a: "You can use `border-radius: 50%` on nested divs, or a single div with `box-shadow` or `radial-gradient`.",
          code: `div {\n  width: 100px; height: 100px;\n  background: radial-gradient(circle, red 10px, blue 10px, blue 20px, green 20px);\n  border-radius: 50%;\n}`
        },
        {
          q: "Q41. Why CSS specificity matters?",
          a: "Specificity ensures the correct styles are applied when multiple rules target the same element. It prevents conflicts and allows overriding styles in a predictable way.\n\nPriority: Inline > ID > Class > Element."
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
          code: `const flatten = (arr) => \n  arr.reduce((acc, val) => \n    Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val), \n  []);`,
          tags: ["Google", "DSA", "Recursion"]
        },
        {
          q: "DSA E: Longest Substring Without Repeating Characters",
          a: "Classic sliding window asked at Google/Meta.\nGiven a string, return the length of the longest substring without repeating characters.\nUse two pointers and a Set/Map to track the current window; move the left pointer whenever you see a duplicate.",
          code: `function lengthOfLongestSubstring(s) {\n  let left = 0, maxLen = 0;\n  const seen = new Set();\n\n  for (let right = 0; right < s.length; right++) {\n    while (seen.has(s[right])) {\n      seen.delete(s[left]);\n      left++;\n    }\n    seen.add(s[right]);\n    maxLen = Math.max(maxLen, right - left + 1);\n  }\n  return maxLen;\n}`,
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
          code: `function merge(intervals) {\n  intervals.sort((a,b) => a[0] - b[0]);\n  const res = [];\n\n  for (const [start, end] of intervals) {\n    if (!res.length || res[res.length - 1][1] < start) {\n      res.push([start, end]);\n    } else {\n      res[res.length - 1][1] = Math.max(res[res.length - 1][1], end);\n    }\n  }\n  return res;\n}`,
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
        }
      ]
    }
  ];