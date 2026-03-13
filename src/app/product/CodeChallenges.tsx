'use client';
import React, { useState, useCallback, useMemo } from 'react';
import Editor from '@monaco-editor/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  RotateCcw,
  Loader2,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Eye,
  EyeOff,
  Trophy,
  Clock,
  Flame,
  Code2,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Lock,
  Unlock,
  Zap,
  Target,
  X,
} from 'lucide-react';

// ==================== TYPES ====================
interface TestCase {
  id: string;
  name: string;
  input: string; // JavaScript expression to evaluate
  expected: string; // Expected output (stringified)
  isHidden?: boolean; // Hidden test cases shown only after completion
}

interface Challenge {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  description: string;
  starterCode: string;
  solution: string;
  hints: string[];
  testCases: TestCase[];
  timeEstimate: string; // e.g., "10-15 min"
  companies: string[]; // Companies that ask this
}

interface TestResult {
  testId: string;
  passed: boolean;
  expected: string;
  actual: string;
  error?: string;
}

// ==================== CHALLENGES DATA ====================
const CHALLENGES: Challenge[] = [
  {
    id: 'debounce',
    title: 'Implement Debounce',
    difficulty: 'Medium',
    category: 'Utility Functions',
    description: `Implement a \`debounce\` function that delays invoking the provided function until after \`wait\` milliseconds have elapsed since the last time it was invoked.

**Requirements:**
- The debounced function should delay execution
- If called again before the delay expires, restart the timer
- The function should be invoked with the correct \`this\` context and arguments

**Example:**
\`\`\`javascript
const debouncedFn = debounce(() => console.log('Called!'), 300);
debouncedFn(); // Nothing happens immediately
// After 300ms of no calls: "Called!"
\`\`\``,
    starterCode: `function debounce(func, wait) {
  // Your implementation here
  
}

// Test your implementation:
// const debouncedLog = debounce((msg) => console.log(msg), 100);
// debouncedLog('Hello');`,
    solution: `function debounce(func, wait) {
  let timeoutId = null;
  
  return function(...args) {
    const context = this;
    
    // Clear any existing timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    // Set a new timeout
    timeoutId = setTimeout(() => {
      func.apply(context, args);
      timeoutId = null;
    }, wait);
  };
}`,
    hints: [
      'You need to return a new function that wraps the original function.',
      'Use `setTimeout` to delay the execution and store its ID in a variable.',
      'Use `clearTimeout` to cancel any pending execution when called again.',
      'Remember to preserve the `this` context using `apply` or `call`.',
      'Store the timeout ID in a closure variable that persists between calls.',
    ],
    testCases: [
      {
        id: 'debounce-1',
        name: 'Returns a function',
        input: `typeof debounce(() => {}, 100)`,
        expected: 'function',
      },
      {
        id: 'debounce-2',
        name: 'Delays execution',
        input: `
          let called = false;
          const fn = debounce(() => { called = true; }, 50);
          fn();
          const immediate = called;
          await new Promise(r => setTimeout(r, 100));
          JSON.stringify({ immediate, afterDelay: called });
        `,
        expected: '{"immediate":false,"afterDelay":true}',
      },
      {
        id: 'debounce-3',
        name: 'Resets timer on subsequent calls',
        input: `
          let count = 0;
          const fn = debounce(() => { count++; }, 50);
          fn(); fn(); fn();
          await new Promise(r => setTimeout(r, 100));
          count;
        `,
        expected: '1',
      },
      {
        id: 'debounce-4',
        name: 'Passes arguments correctly',
        input: `
          let result = null;
          const fn = debounce((a, b) => { result = a + b; }, 50);
          fn(2, 3);
          await new Promise(r => setTimeout(r, 100));
          result;
        `,
        expected: '5',
      },
    ],
    timeEstimate: '10-15 min',
    companies: ['Google', 'Meta', 'Amazon', 'Uber'],
  },
  {
    id: 'throttle',
    title: 'Implement Throttle',
    difficulty: 'Medium',
    category: 'Utility Functions',
    description: `Implement a \`throttle\` function that ensures the provided function is called at most once per \`wait\` milliseconds.

**Requirements:**
- Execute the function immediately on the first call
- Ignore subsequent calls within the wait period
- After the wait period, allow the function to be called again

**Example:**
\`\`\`javascript
const throttledFn = throttle(() => console.log('Scroll!'), 1000);
// Calling rapidly will only log once per second
\`\`\``,
    starterCode: `function throttle(func, wait) {
  // Your implementation here
  
}

// Test your implementation:
// const throttledLog = throttle((msg) => console.log(msg), 100);
// throttledLog('A'); throttledLog('B'); throttledLog('C');`,
    solution: `function throttle(func, wait) {
  let lastTime = 0;
  let timeoutId = null;
  
  return function(...args) {
    const context = this;
    const now = Date.now();
    const remaining = wait - (now - lastTime);
    
    if (remaining <= 0) {
      // Enough time has passed, execute immediately
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      lastTime = now;
      func.apply(context, args);
    } else if (!timeoutId) {
      // Schedule execution for the remaining time
      timeoutId = setTimeout(() => {
        lastTime = Date.now();
        timeoutId = null;
        func.apply(context, args);
      }, remaining);
    }
  };
}`,
    hints: [
      'Track the timestamp of the last execution.',
      'Compare current time with last execution time to decide whether to execute.',
      'Use `Date.now()` to get the current timestamp.',
      'Calculate the remaining wait time: `wait - (now - lastTime)`',
      'You may want to schedule a trailing call if the function is called during the wait period.',
    ],
    testCases: [
      {
        id: 'throttle-1',
        name: 'Returns a function',
        input: `typeof throttle(() => {}, 100)`,
        expected: 'function',
      },
      {
        id: 'throttle-2',
        name: 'Executes immediately on first call',
        input: `
          let called = false;
          const fn = throttle(() => { called = true; }, 100);
          fn();
          called;
        `,
        expected: 'true',
      },
      {
        id: 'throttle-3',
        name: 'Throttles rapid calls',
        input: `
          let count = 0;
          const fn = throttle(() => { count++; }, 50);
          fn(); fn(); fn();
          count;
        `,
        expected: '1',
      },
      {
        id: 'throttle-4',
        name: 'Allows call after wait period',
        input: `
          let count = 0;
          const fn = throttle(() => { count++; }, 50);
          fn();
          await new Promise(r => setTimeout(r, 100));
          fn();
          count;
        `,
        expected: '2',
      },
    ],
    timeEstimate: '10-15 min',
    companies: ['Google', 'Meta', 'LinkedIn', 'Airbnb'],
  },
  {
    id: 'promise-all',
    title: 'Implement Promise.all',
    difficulty: 'Medium',
    category: 'Promises & Async',
    description: `Implement your own version of \`Promise.all\` called \`promiseAll\`.

**Requirements:**
- Accept an array of promises (or values)
- Return a promise that resolves with an array of results when all promises resolve
- Reject immediately if any promise rejects
- Maintain the order of results matching the input order

**Example:**
\`\`\`javascript
promiseAll([Promise.resolve(1), Promise.resolve(2), 3])
  .then(console.log); // [1, 2, 3]
\`\`\``,
    starterCode: `function promiseAll(promises) {
  // Your implementation here
  
}

// Test your implementation:
// promiseAll([Promise.resolve(1), Promise.resolve(2)])
//   .then(results => console.log(results));`,
    solution: `function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError('Argument must be an array'));
    }
    
    if (promises.length === 0) {
      return resolve([]);
    }
    
    const results = new Array(promises.length);
    let resolvedCount = 0;
    
    promises.forEach((promise, index) => {
      // Wrap in Promise.resolve to handle non-promise values
      Promise.resolve(promise)
        .then(value => {
          results[index] = value;
          resolvedCount++;
          
          if (resolvedCount === promises.length) {
            resolve(results);
          }
        })
        .catch(reject); // Reject immediately on any error
    });
  });
}`,
    hints: [
      'Return a new Promise that you control with resolve/reject.',
      'Use `Promise.resolve()` to wrap each item - this handles non-promise values.',
      'Track how many promises have resolved using a counter.',
      'Store results in an array at the correct index to maintain order.',
      'Call reject immediately when any promise fails - don\'t wait for others.',
    ],
    testCases: [
      {
        id: 'promise-all-1',
        name: 'Returns a promise',
        input: `promiseAll([]) instanceof Promise`,
        expected: 'true',
      },
      {
        id: 'promise-all-2',
        name: 'Resolves with all values',
        input: `
          const result = await promiseAll([
            Promise.resolve(1),
            Promise.resolve(2),
            Promise.resolve(3)
          ]);
          JSON.stringify(result);
        `,
        expected: '[1,2,3]',
      },
      {
        id: 'promise-all-3',
        name: 'Handles non-promise values',
        input: `
          const result = await promiseAll([1, 2, Promise.resolve(3)]);
          JSON.stringify(result);
        `,
        expected: '[1,2,3]',
      },
      {
        id: 'promise-all-4',
        name: 'Rejects if any promise rejects',
        input: `
          try {
            await promiseAll([
              Promise.resolve(1),
              Promise.reject('error'),
              Promise.resolve(3)
            ]);
            'did not reject';
          } catch (e) {
            e;
          }
        `,
        expected: 'error',
      },
      {
        id: 'promise-all-5',
        name: 'Maintains order',
        input: `
          const result = await promiseAll([
            new Promise(r => setTimeout(() => r(3), 50)),
            new Promise(r => setTimeout(() => r(1), 10)),
            new Promise(r => setTimeout(() => r(2), 30))
          ]);
          JSON.stringify(result);
        `,
        expected: '[3,1,2]',
      },
    ],
    timeEstimate: '15-20 min',
    companies: ['Meta', 'Google', 'Microsoft', 'Stripe'],
  },
  {
    id: 'flatten-array',
    title: 'Flatten Array',
    difficulty: 'Easy',
    category: 'Arrays',
    description: `Implement a \`flatten\` function that flattens a nested array to a specified depth.

**Requirements:**
- Flatten nested arrays to the specified depth
- Default depth should be 1
- Depth of Infinity should flatten completely

**Example:**
\`\`\`javascript
flatten([1, [2, [3, [4]]]], 2); // [1, 2, 3, [4]]
flatten([1, [2, [3]]], Infinity); // [1, 2, 3]
\`\`\``,
    starterCode: `function flatten(arr, depth = 1) {
  // Your implementation here
  
}

// Test your implementation:
// console.log(flatten([1, [2, [3, [4]]]], 2));`,
    solution: `function flatten(arr, depth = 1) {
  if (depth < 1) {
    return arr.slice();
  }
  
  return arr.reduce((acc, val) => {
    if (Array.isArray(val) && depth > 0) {
      acc.push(...flatten(val, depth - 1));
    } else {
      acc.push(val);
    }
    return acc;
  }, []);
}

// Alternative iterative solution:
// function flatten(arr, depth = 1) {
//   const result = [];
//   const stack = arr.map(item => [item, depth]);
//   
//   while (stack.length) {
//     const [item, d] = stack.pop();
//     if (Array.isArray(item) && d > 0) {
//       stack.push(...item.map(i => [i, d - 1]));
//     } else {
//       result.unshift(item);
//     }
//   }
//   return result;
// }`,
    hints: [
      'Use recursion to handle nested arrays.',
      'Check if the current item is an array using `Array.isArray()`.',
      'Decrement the depth on each recursive call.',
      'Use `reduce` or a loop to build the result array.',
      'Handle the base case when depth is 0 or item is not an array.',
    ],
    testCases: [
      {
        id: 'flatten-1',
        name: 'Flattens one level by default',
        input: `JSON.stringify(flatten([1, [2, 3], [4, [5]]]))`,
        expected: '[1,2,3,4,[5]]',
      },
      {
        id: 'flatten-2',
        name: 'Flattens to specified depth',
        input: `JSON.stringify(flatten([1, [2, [3, [4]]]], 2))`,
        expected: '[1,2,3,[4]]',
      },
      {
        id: 'flatten-3',
        name: 'Flattens completely with Infinity',
        input: `JSON.stringify(flatten([1, [2, [3, [4, [5]]]]], Infinity))`,
        expected: '[1,2,3,4,5]',
      },
      {
        id: 'flatten-4',
        name: 'Handles empty arrays',
        input: `JSON.stringify(flatten([1, [], [2, []]]))`,
        expected: '[1,2]',
      },
    ],
    timeEstimate: '5-10 min',
    companies: ['Amazon', 'Apple', 'Microsoft'],
  },
  {
    id: 'memoize',
    title: 'Implement Memoization',
    difficulty: 'Medium',
    category: 'Performance',
    description: `Implement a \`memoize\` function that caches the results of function calls.

**Requirements:**
- Cache results based on arguments
- Return cached result for repeated calls with same arguments
- Handle multiple arguments
- Optional: Support a custom key generator

**Example:**
\`\`\`javascript
const expensiveFn = memoize((n) => {
  console.log('Computing...');
  return n * 2;
});
expensiveFn(5); // logs "Computing...", returns 10
expensiveFn(5); // returns 10 (no log, cached)
\`\`\``,
    starterCode: `function memoize(func, keyGenerator) {
  // Your implementation here
  
}

// Test your implementation:
// let computeCount = 0;
// const memoizedDouble = memoize((n) => {
//   computeCount++;
//   return n * 2;
// });
// console.log(memoizedDouble(5), memoizedDouble(5), computeCount);`,
    solution: `function memoize(func, keyGenerator) {
  const cache = new Map();
  
  return function(...args) {
    // Generate cache key
    const key = keyGenerator 
      ? keyGenerator(...args) 
      : JSON.stringify(args);
    
    // Return cached result if exists
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    // Compute and cache result
    const result = func.apply(this, args);
    cache.set(key, result);
    
    return result;
  };
}

// With WeakMap for object arguments:
// function memoize(func) {
//   const cache = new WeakMap();
//   return function(obj) {
//     if (!cache.has(obj)) {
//       cache.set(obj, func.call(this, obj));
//     }
//     return cache.get(obj);
//   };
// }`,
    hints: [
      'Use a Map or object to store cached results.',
      'Create a unique key from the function arguments.',
      'For simple cases, `JSON.stringify(args)` works as a key.',
      'Check if the key exists in cache before computing.',
      'Store the result in cache after computing.',
    ],
    testCases: [
      {
        id: 'memoize-1',
        name: 'Returns correct result',
        input: `
          const double = memoize((n) => n * 2);
          double(5);
        `,
        expected: '10',
      },
      {
        id: 'memoize-2',
        name: 'Caches results',
        input: `
          let count = 0;
          const fn = memoize((n) => { count++; return n * 2; });
          fn(5); fn(5); fn(5);
          count;
        `,
        expected: '1',
      },
      {
        id: 'memoize-3',
        name: 'Handles multiple arguments',
        input: `
          let count = 0;
          const add = memoize((a, b) => { count++; return a + b; });
          add(1, 2); add(1, 2); add(2, 1);
          JSON.stringify({ result: add(1, 2), count });
        `,
        expected: '{"result":3,"count":2}',
      },
      {
        id: 'memoize-4',
        name: 'Different args = different cache entries',
        input: `
          let count = 0;
          const fn = memoize((n) => { count++; return n; });
          fn(1); fn(2); fn(3); fn(1);
          count;
        `,
        expected: '3',
      },
    ],
    timeEstimate: '10-15 min',
    companies: ['Google', 'Meta', 'Netflix', 'Uber'],
  },
  {
    id: 'deep-clone',
    title: 'Deep Clone Object',
    difficulty: 'Hard',
    category: 'Objects',
    description: `Implement a \`deepClone\` function that creates a deep copy of an object.

**Requirements:**
- Clone nested objects and arrays
- Handle circular references
- Preserve object types (Date, RegExp, Map, Set)
- Don't use JSON.parse/stringify

**Example:**
\`\`\`javascript
const obj = { a: 1, b: { c: 2 } };
const clone = deepClone(obj);
clone.b.c = 99;
console.log(obj.b.c); // 2 (original unchanged)
\`\`\``,
    starterCode: `function deepClone(obj, seen = new WeakMap()) {
  // Your implementation here
  
}

// Test your implementation:
// const original = { a: 1, b: { c: [1, 2, 3] } };
// const cloned = deepClone(original);
// cloned.b.c.push(4);
// console.log(original.b.c, cloned.b.c);`,
    solution: `function deepClone(obj, seen = new WeakMap()) {
  // Handle primitives and null
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  // Handle circular references
  if (seen.has(obj)) {
    return seen.get(obj);
  }
  
  // Handle Date
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }
  
  // Handle RegExp
  if (obj instanceof RegExp) {
    return new RegExp(obj.source, obj.flags);
  }
  
  // Handle Map
  if (obj instanceof Map) {
    const mapClone = new Map();
    seen.set(obj, mapClone);
    obj.forEach((value, key) => {
      mapClone.set(deepClone(key, seen), deepClone(value, seen));
    });
    return mapClone;
  }
  
  // Handle Set
  if (obj instanceof Set) {
    const setClone = new Set();
    seen.set(obj, setClone);
    obj.forEach(value => {
      setClone.add(deepClone(value, seen));
    });
    return setClone;
  }
  
  // Handle Array
  if (Array.isArray(obj)) {
    const arrClone = [];
    seen.set(obj, arrClone);
    obj.forEach((item, index) => {
      arrClone[index] = deepClone(item, seen);
    });
    return arrClone;
  }
  
  // Handle plain objects
  const clone = Object.create(Object.getPrototypeOf(obj));
  seen.set(obj, clone);
  
  for (const key of Reflect.ownKeys(obj)) {
    clone[key] = deepClone(obj[key], seen);
  }
  
  return clone;
}`,
    hints: [
      'Handle primitive types first - they can be returned directly.',
      'Use a WeakMap to track visited objects for circular reference detection.',
      'Check for special object types: Date, RegExp, Map, Set.',
      'For arrays and objects, recursively clone each element/property.',
      'Use `Object.create(Object.getPrototypeOf(obj))` to preserve prototype chain.',
    ],
    testCases: [
      {
        id: 'deepclone-1',
        name: 'Clones nested objects',
        input: `
          const obj = { a: { b: { c: 1 } } };
          const clone = deepClone(obj);
          clone.a.b.c = 99;
          obj.a.b.c;
        `,
        expected: '1',
      },
      {
        id: 'deepclone-2',
        name: 'Clones arrays',
        input: `
          const obj = { arr: [1, 2, { x: 3 }] };
          const clone = deepClone(obj);
          clone.arr[2].x = 99;
          obj.arr[2].x;
        `,
        expected: '3',
      },
      {
        id: 'deepclone-3',
        name: 'Handles Date objects',
        input: `
          const date = new Date('2024-01-01');
          const clone = deepClone({ d: date });
          clone.d instanceof Date && clone.d.getTime() === date.getTime();
        `,
        expected: 'true',
      },
      {
        id: 'deepclone-4',
        name: 'Handles circular references',
        input: `
          const obj = { a: 1 };
          obj.self = obj;
          const clone = deepClone(obj);
          clone.self === clone && clone.a === 1;
        `,
        expected: 'true',
      },
    ],
    timeEstimate: '20-25 min',
    companies: ['Google', 'Meta', 'Apple', 'Stripe'],
  },
  {
    id: 'event-emitter',
    title: 'Implement Event Emitter',
    difficulty: 'Medium',
    category: 'Design Patterns',
    description: `Implement an \`EventEmitter\` class with subscribe/unsubscribe/emit functionality.

**Requirements:**
- \`on(event, callback)\` - Subscribe to an event
- \`off(event, callback)\` - Unsubscribe from an event
- \`emit(event, ...args)\` - Trigger all callbacks for an event
- \`once(event, callback)\` - Subscribe for only one invocation

**Example:**
\`\`\`javascript
const emitter = new EventEmitter();
emitter.on('greet', (name) => console.log(\`Hello, \${name}!\`));
emitter.emit('greet', 'World'); // "Hello, World!"
\`\`\``,
    starterCode: `class EventEmitter {
  constructor() {
    // Initialize your data structure
  }
  
  on(event, callback) {
    // Subscribe to event
  }
  
  off(event, callback) {
    // Unsubscribe from event
  }
  
  emit(event, ...args) {
    // Trigger event callbacks
  }
  
  once(event, callback) {
    // Subscribe for single invocation
  }
}

// Test your implementation:
// const emitter = new EventEmitter();
// emitter.on('test', (x) => console.log('Got:', x));
// emitter.emit('test', 42);`,
    solution: `class EventEmitter {
  constructor() {
    this.events = new Map();
  }
  
  on(event, callback) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(callback);
    
    // Return unsubscribe function
    return () => this.off(event, callback);
  }
  
  off(event, callback) {
    if (!this.events.has(event)) return;
    
    const callbacks = this.events.get(event);
    const index = callbacks.indexOf(callback);
    
    if (index > -1) {
      callbacks.splice(index, 1);
    }
    
    // Clean up empty event arrays
    if (callbacks.length === 0) {
      this.events.delete(event);
    }
  }
  
  emit(event, ...args) {
    if (!this.events.has(event)) return false;
    
    const callbacks = this.events.get(event).slice(); // Clone to avoid mutation issues
    callbacks.forEach(callback => {
      callback.apply(this, args);
    });
    
    return true;
  }
  
  once(event, callback) {
    const onceWrapper = (...args) => {
      this.off(event, onceWrapper);
      callback.apply(this, args);
    };
    
    return this.on(event, onceWrapper);
  }
}`,
    hints: [
      'Use a Map to store event names and their callback arrays.',
      'For `on`, push the callback to the array for that event.',
      'For `off`, find and remove the specific callback from the array.',
      'For `emit`, iterate through all callbacks and invoke them with the args.',
      'For `once`, create a wrapper that calls `off` before invoking the original callback.',
    ],
    testCases: [
      {
        id: 'emitter-1',
        name: 'on() subscribes to events',
        input: `
          const emitter = new EventEmitter();
          let result = null;
          emitter.on('test', (x) => { result = x; });
          emitter.emit('test', 42);
          result;
        `,
        expected: '42',
      },
      {
        id: 'emitter-2',
        name: 'off() unsubscribes from events',
        input: `
          const emitter = new EventEmitter();
          let count = 0;
          const fn = () => { count++; };
          emitter.on('test', fn);
          emitter.emit('test');
          emitter.off('test', fn);
          emitter.emit('test');
          count;
        `,
        expected: '1',
      },
      {
        id: 'emitter-3',
        name: 'once() fires only once',
        input: `
          const emitter = new EventEmitter();
          let count = 0;
          emitter.once('test', () => { count++; });
          emitter.emit('test');
          emitter.emit('test');
          emitter.emit('test');
          count;
        `,
        expected: '1',
      },
      {
        id: 'emitter-4',
        name: 'Multiple listeners work correctly',
        input: `
          const emitter = new EventEmitter();
          let sum = 0;
          emitter.on('add', (n) => { sum += n; });
          emitter.on('add', (n) => { sum += n * 2; });
          emitter.emit('add', 5);
          sum;
        `,
        expected: '15',
      },
    ],
    timeEstimate: '15-20 min',
    companies: ['Meta', 'Google', 'Microsoft', 'Shopify'],
  },
  {
    id: 'curry',
    title: 'Implement Curry Function',
    difficulty: 'Hard',
    category: 'Functional Programming',
    description: `Implement a \`curry\` function that transforms a function to allow partial application.

**Requirements:**
- Transform a function to accept arguments one at a time
- Return the result when all arguments are provided
- Support passing multiple arguments at once
- Preserve the function's arity (number of expected arguments)

**Example:**
\`\`\`javascript
const add = (a, b, c) => a + b + c;
const curriedAdd = curry(add);
curriedAdd(1)(2)(3); // 6
curriedAdd(1, 2)(3); // 6
curriedAdd(1)(2, 3); // 6
\`\`\``,
    starterCode: `function curry(func) {
  // Your implementation here
  
}

// Test your implementation:
// const add = (a, b, c) => a + b + c;
// const curriedAdd = curry(add);
// console.log(curriedAdd(1)(2)(3));
// console.log(curriedAdd(1, 2)(3));`,
    solution: `function curry(func) {
  return function curried(...args) {
    // If we have enough arguments, call the original function
    if (args.length >= func.length) {
      return func.apply(this, args);
    }
    
    // Otherwise, return a function that collects more arguments
    return function(...moreArgs) {
      return curried.apply(this, args.concat(moreArgs));
    };
  };
}

// Alternative with placeholder support:
// curry.placeholder = Symbol('curry.placeholder');
// 
// function curry(func) {
//   return function curried(...args) {
//     const complete = args.length >= func.length && 
//       !args.slice(0, func.length).includes(curry.placeholder);
//     
//     if (complete) {
//       return func.apply(this, args);
//     }
//     
//     return (...moreArgs) => {
//       const newArgs = args.map(arg => 
//         arg === curry.placeholder && moreArgs.length ? moreArgs.shift() : arg
//       ).concat(moreArgs);
//       return curried(...newArgs);
//     };
//   };
// }`,
    hints: [
      'Use `func.length` to get the number of expected arguments.',
      'Return the result when collected args >= expected args.',
      'Otherwise return a new function that concatenates new args with existing.',
      'Use recursion or closure to accumulate arguments across calls.',
      'Remember to preserve `this` context using `apply`.',
    ],
    testCases: [
      {
        id: 'curry-1',
        name: 'Curries a function',
        input: `
          const add = (a, b, c) => a + b + c;
          const curried = curry(add);
          curried(1)(2)(3);
        `,
        expected: '6',
      },
      {
        id: 'curry-2',
        name: 'Accepts multiple args at once',
        input: `
          const add = (a, b, c) => a + b + c;
          const curried = curry(add);
          curried(1, 2)(3);
        `,
        expected: '6',
      },
      {
        id: 'curry-3',
        name: 'Works with all args at once',
        input: `
          const add = (a, b, c) => a + b + c;
          const curried = curry(add);
          curried(1, 2, 3);
        `,
        expected: '6',
      },
      {
        id: 'curry-4',
        name: 'Handles 2-arg functions',
        input: `
          const multiply = (a, b) => a * b;
          const curried = curry(multiply);
          curried(3)(4);
        `,
        expected: '12',
      },
    ],
    timeEstimate: '15-20 min',
    companies: ['Google', 'Amazon', 'Stripe', 'Bloomberg'],
  },
  // ==================== REACT COMPONENT CHALLENGES ====================
  {
    id: 'autocomplete-logic',
    title: 'Autocomplete Component Logic',
    difficulty: 'Medium',
    category: 'React Components',
    description: `Implement the core logic for an Autocomplete component.

**Requirements:**
- \`filterSuggestions(items, query)\` - Filter items that match the query (case-insensitive)
- \`highlightMatch(text, query)\` - Return object with matched portions marked
- \`useAutocomplete(items)\` hook logic - Handle state for query, filtered results, selected index
- Support keyboard navigation (up/down/enter/escape)

**Example:**
\`\`\`javascript
filterSuggestions(['Apple', 'Banana', 'Apricot'], 'ap');
// ['Apple', 'Apricot']

highlightMatch('Apple', 'ap');
// { before: '', match: 'Ap', after: 'ple' }
\`\`\``,
    starterCode: `// Filter suggestions based on query
function filterSuggestions(items, query) {
  // Your implementation here
}

// Highlight the matching portion of text
function highlightMatch(text, query) {
  // Return { before, match, after }
}

// Autocomplete state manager
function createAutocompleteState(items) {
  // Return object with: query, results, selectedIndex, and methods
}

// Test your implementation:
// console.log(filterSuggestions(['Apple', 'Banana'], 'a'));`,
    solution: `// Filter suggestions based on query
function filterSuggestions(items, query) {
  if (!query.trim()) return [];
  const lowerQuery = query.toLowerCase();
  return items.filter(item => 
    item.toLowerCase().includes(lowerQuery)
  );
}

// Highlight the matching portion of text
function highlightMatch(text, query) {
  if (!query) return { before: text, match: '', after: '' };
  
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const index = lowerText.indexOf(lowerQuery);
  
  if (index === -1) {
    return { before: text, match: '', after: '' };
  }
  
  return {
    before: text.slice(0, index),
    match: text.slice(index, index + query.length),
    after: text.slice(index + query.length)
  };
}

// Autocomplete state manager
function createAutocompleteState(items) {
  let state = {
    query: '',
    results: [],
    selectedIndex: -1,
    isOpen: false
  };
  
  return {
    getState: () => ({ ...state }),
    
    setQuery: (query) => {
      state.query = query;
      state.results = filterSuggestions(items, query);
      state.selectedIndex = state.results.length > 0 ? 0 : -1;
      state.isOpen = state.results.length > 0;
    },
    
    moveUp: () => {
      if (state.selectedIndex > 0) {
        state.selectedIndex--;
      }
    },
    
    moveDown: () => {
      if (state.selectedIndex < state.results.length - 1) {
        state.selectedIndex++;
      }
    },
    
    select: () => {
      if (state.selectedIndex >= 0 && state.selectedIndex < state.results.length) {
        state.query = state.results[state.selectedIndex];
        state.isOpen = false;
        return state.query;
      }
      return null;
    },
    
    close: () => {
      state.isOpen = false;
      state.selectedIndex = -1;
    }
  };
}`,
    hints: [
      'For filtering, convert both item and query to lowercase for case-insensitive matching.',
      'Use `String.indexOf()` to find where the query matches in the text.',
      'Use `String.slice()` to split the text into before, match, and after portions.',
      'Track selectedIndex for keyboard navigation - bound it between 0 and results.length - 1.',
      'The state manager pattern lets you encapsulate logic without React hooks.',
    ],
    testCases: [
      {
        id: 'auto-1',
        name: 'Filters items case-insensitively',
        input: `JSON.stringify(filterSuggestions(['Apple', 'Banana', 'Apricot', 'Cherry'], 'ap'))`,
        expected: '["Apple","Apricot"]',
      },
      {
        id: 'auto-2',
        name: 'Returns empty for empty query',
        input: `JSON.stringify(filterSuggestions(['Apple', 'Banana'], ''))`,
        expected: '[]',
      },
      {
        id: 'auto-3',
        name: 'Highlights match correctly',
        input: `JSON.stringify(highlightMatch('JavaScript', 'script'))`,
        expected: '{"before":"Java","match":"Script","after":""}',
      },
      {
        id: 'auto-4',
        name: 'State manager filters on query',
        input: `
          const ac = createAutocompleteState(['React', 'Redux', 'Router']);
          ac.setQuery('re');
          const s = ac.getState();
          JSON.stringify({ count: s.results.length, selected: s.selectedIndex });
        `,
        expected: '{"count":2,"selected":0}',
      },
      {
        id: 'auto-5',
        name: 'Keyboard navigation works',
        input: `
          const ac = createAutocompleteState(['A', 'B', 'C']);
          ac.setQuery('');
          ac.setQuery('A');
          ac.setQuery('');
          ac.setQuery('X'); // No results
          const fruits = ['Apple', 'Apricot', 'Avocado'];
          const ac2 = createAutocompleteState(fruits);
          ac2.setQuery('a');
          ac2.moveDown();
          ac2.moveDown();
          const selected = ac2.select();
          selected;
        `,
        expected: 'Avocado',
      },
    ],
    timeEstimate: '20-25 min',
    companies: ['Google', 'Meta', 'Airbnb', 'LinkedIn'],
  },
  {
    id: 'modal-dialog',
    title: 'Modal/Dialog Component Logic',
    difficulty: 'Medium',
    category: 'React Components',
    description: `Implement the core logic for a Modal/Dialog component.

**Requirements:**
- \`createModalManager()\` - Manage modal open/close state with stack support
- Handle multiple modals (stack behavior)
- Focus trap logic - track focusable elements
- Handle escape key to close
- Prevent body scroll when modal is open

**Example:**
\`\`\`javascript
const modal = createModalManager();
modal.open('confirm-dialog');
modal.isOpen('confirm-dialog'); // true
modal.close();
\`\`\``,
    starterCode: `// Modal state manager with stack support
function createModalManager() {
  // Your implementation here
  // Methods: open(id), close(), closeAll(), isOpen(id), getStack()
}

// Focus trap utilities
function getFocusableElements(container) {
  // Return array of focusable element selectors
}

function createFocusTrap() {
  // Manage focus cycling within a container
}

// Test your implementation:
// const modal = createModalManager();
// modal.open('dialog-1');
// console.log(modal.isOpen('dialog-1'));`,
    solution: `// Modal state manager with stack support
function createModalManager() {
  let stack = [];
  let listeners = [];
  
  const notify = () => listeners.forEach(fn => fn(stack));
  
  return {
    open: (id, options = {}) => {
      if (!stack.find(m => m.id === id)) {
        stack.push({ id, options, timestamp: Date.now() });
        notify();
      }
      return stack.length;
    },
    
    close: (id) => {
      if (id) {
        stack = stack.filter(m => m.id !== id);
      } else {
        stack.pop();
      }
      notify();
      return stack.length;
    },
    
    closeAll: () => {
      stack = [];
      notify();
    },
    
    isOpen: (id) => stack.some(m => m.id === id),
    
    getStack: () => [...stack],
    
    getTopModal: () => stack[stack.length - 1] || null,
    
    subscribe: (fn) => {
      listeners.push(fn);
      return () => {
        listeners = listeners.filter(l => l !== fn);
      };
    }
  };
}

// Focus trap utilities
function getFocusableElements(containerSelector) {
  const selectors = [
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'a[href]',
    '[tabindex]:not([tabindex="-1"])'
  ];
  return selectors;
}

function createFocusTrap() {
  let container = null;
  let firstElement = null;
  let lastElement = null;
  
  return {
    activate: (elements) => {
      if (elements.length === 0) return;
      firstElement = elements[0];
      lastElement = elements[elements.length - 1];
      firstElement.focus && firstElement.focus();
    },
    
    handleTab: (e, elements) => {
      if (elements.length === 0) return;
      
      const first = elements[0];
      const last = elements[elements.length - 1];
      
      if (e.shiftKey && e.target === first) {
        e.preventDefault();
        return last; // Focus last element
      } else if (!e.shiftKey && e.target === last) {
        e.preventDefault();
        return first; // Focus first element
      }
      return null;
    },
    
    deactivate: () => {
      firstElement = null;
      lastElement = null;
    }
  };
}`,
    hints: [
      'Use an array as a stack to support multiple nested modals.',
      'The most recent modal is at the top of the stack (last element).',
      'For focus trapping, cycle from last element to first on Tab, and first to last on Shift+Tab.',
      'Common focusable elements: buttons, inputs, links, and elements with tabindex.',
      'The subscribe pattern allows React components to re-render when state changes.',
    ],
    testCases: [
      {
        id: 'modal-1',
        name: 'Opens and tracks modal',
        input: `
          const m = createModalManager();
          m.open('dialog-1');
          m.isOpen('dialog-1');
        `,
        expected: 'true',
      },
      {
        id: 'modal-2',
        name: 'Supports modal stack',
        input: `
          const m = createModalManager();
          m.open('modal-1');
          m.open('modal-2');
          m.open('modal-3');
          m.getStack().length;
        `,
        expected: '3',
      },
      {
        id: 'modal-3',
        name: 'Closes top modal',
        input: `
          const m = createModalManager();
          m.open('modal-1');
          m.open('modal-2');
          m.close();
          JSON.stringify({ open1: m.isOpen('modal-1'), open2: m.isOpen('modal-2') });
        `,
        expected: '{"open1":true,"open2":false}',
      },
      {
        id: 'modal-4',
        name: 'Gets top modal',
        input: `
          const m = createModalManager();
          m.open('first');
          m.open('second');
          m.getTopModal().id;
        `,
        expected: 'second',
      },
      {
        id: 'modal-5',
        name: 'Focus trap handles tab cycling',
        input: `
          const trap = createFocusTrap();
          const elements = ['btn1', 'input1', 'btn2'];
          const result1 = trap.handleTab({ shiftKey: true, target: 'btn1', preventDefault: () => {} }, elements);
          const result2 = trap.handleTab({ shiftKey: false, target: 'btn2', preventDefault: () => {} }, elements);
          JSON.stringify([result1, result2]);
        `,
        expected: '["btn2","btn1"]',
      },
    ],
    timeEstimate: '20-25 min',
    companies: ['Meta', 'Microsoft', 'Shopify', 'Atlassian'],
  },
  {
    id: 'carousel-logic',
    title: 'Carousel Component Logic',
    difficulty: 'Medium',
    category: 'React Components',
    description: `Implement the core logic for a Carousel/Slider component.

**Requirements:**
- \`createCarousel(totalSlides, options)\` - Manage carousel state
- Support infinite loop mode
- Auto-play with pause on hover
- Handle touch/swipe gestures (calculate direction)
- Support multiple visible slides

**Example:**
\`\`\`javascript
const carousel = createCarousel(5, { loop: true });
carousel.next(); // Go to slide 1
carousel.goTo(3); // Jump to slide 3
carousel.prev(); // Back to slide 2
\`\`\``,
    starterCode: `// Carousel state manager
function createCarousel(totalSlides, options = {}) {
  // options: { loop: false, autoPlayInterval: 0, slidesToShow: 1 }
  // Methods: next(), prev(), goTo(index), play(), pause(), getState()
}

// Swipe gesture detector
function createSwipeDetector(threshold = 50) {
  // Track touch start/end and determine swipe direction
  // Methods: start(x, y), end(x, y) => 'left' | 'right' | 'up' | 'down' | null
}

// Test your implementation:
// const c = createCarousel(5, { loop: true });
// c.next(); c.next();
// console.log(c.getState().currentIndex);`,
    solution: `// Carousel state manager
function createCarousel(totalSlides, options = {}) {
  const {
    loop = false,
    autoPlayInterval = 0,
    slidesToShow = 1
  } = options;
  
  let state = {
    currentIndex: 0,
    isPlaying: false,
    isPaused: false
  };
  
  let intervalId = null;
  let listeners = [];
  
  const notify = () => listeners.forEach(fn => fn(state));
  
  const maxIndex = Math.max(0, totalSlides - slidesToShow);
  
  const carousel = {
    next: () => {
      if (loop) {
        state.currentIndex = (state.currentIndex + 1) % totalSlides;
      } else {
        state.currentIndex = Math.min(state.currentIndex + 1, maxIndex);
      }
      notify();
      return state.currentIndex;
    },
    
    prev: () => {
      if (loop) {
        state.currentIndex = (state.currentIndex - 1 + totalSlides) % totalSlides;
      } else {
        state.currentIndex = Math.max(state.currentIndex - 1, 0);
      }
      notify();
      return state.currentIndex;
    },
    
    goTo: (index) => {
      if (loop) {
        state.currentIndex = ((index % totalSlides) + totalSlides) % totalSlides;
      } else {
        state.currentIndex = Math.max(0, Math.min(index, maxIndex));
      }
      notify();
      return state.currentIndex;
    },
    
    play: () => {
      if (autoPlayInterval > 0 && !intervalId) {
        state.isPlaying = true;
        state.isPaused = false;
        intervalId = setInterval(() => carousel.next(), autoPlayInterval);
        notify();
      }
    },
    
    pause: () => {
      state.isPaused = true;
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
      notify();
    },
    
    resume: () => {
      if (state.isPlaying && state.isPaused) {
        state.isPaused = false;
        intervalId = setInterval(() => carousel.next(), autoPlayInterval);
        notify();
      }
    },
    
    stop: () => {
      state.isPlaying = false;
      state.isPaused = false;
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
      notify();
    },
    
    getState: () => ({
      ...state,
      totalSlides,
      maxIndex,
      canGoNext: loop || state.currentIndex < maxIndex,
      canGoPrev: loop || state.currentIndex > 0
    }),
    
    subscribe: (fn) => {
      listeners.push(fn);
      return () => { listeners = listeners.filter(l => l !== fn); };
    }
  };
  
  return carousel;
}

// Swipe gesture detector
function createSwipeDetector(threshold = 50) {
  let startX = 0;
  let startY = 0;
  
  return {
    start: (x, y) => {
      startX = x;
      startY = y;
    },
    
    end: (x, y) => {
      const deltaX = x - startX;
      const deltaY = y - startY;
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);
      
      if (absX < threshold && absY < threshold) {
        return null; // No significant swipe
      }
      
      if (absX > absY) {
        return deltaX > 0 ? 'right' : 'left';
      } else {
        return deltaY > 0 ? 'down' : 'up';
      }
    }
  };
}`,
    hints: [
      'For loop mode, use modulo: `(index + total) % total` handles both positive and negative.',
      'Track canGoNext/canGoPrev for non-loop mode to disable navigation buttons.',
      'Auto-play uses setInterval - remember to clear it on pause/stop.',
      'For swipe detection, compare deltaX vs deltaY to determine horizontal vs vertical.',
      'The threshold prevents accidental small movements from triggering swipes.',
    ],
    testCases: [
      {
        id: 'carousel-1',
        name: 'Basic navigation works',
        input: `
          const c = createCarousel(5);
          c.next();
          c.next();
          c.getState().currentIndex;
        `,
        expected: '2',
      },
      {
        id: 'carousel-2',
        name: 'Loop mode wraps around',
        input: `
          const c = createCarousel(3, { loop: true });
          c.prev(); // From 0 to 2
          c.getState().currentIndex;
        `,
        expected: '2',
      },
      {
        id: 'carousel-3',
        name: 'Non-loop mode respects bounds',
        input: `
          const c = createCarousel(3, { loop: false });
          c.prev(); c.prev(); // Should stay at 0
          const atStart = c.getState().currentIndex;
          c.goTo(10); // Should clamp to max
          const atEnd = c.getState().currentIndex;
          JSON.stringify([atStart, atEnd]);
        `,
        expected: '[0,2]',
      },
      {
        id: 'carousel-4',
        name: 'Swipe detector identifies direction',
        input: `
          const swipe = createSwipeDetector(50);
          swipe.start(100, 100);
          const left = swipe.end(20, 105);
          swipe.start(100, 100);
          const down = swipe.end(105, 200);
          JSON.stringify([left, down]);
        `,
        expected: '["left","down"]',
      },
      {
        id: 'carousel-5',
        name: 'GoTo navigates to specific slide',
        input: `
          const c = createCarousel(10);
          c.goTo(5);
          c.next();
          c.getState().currentIndex;
        `,
        expected: '6',
      },
    ],
    timeEstimate: '20-25 min',
    companies: ['Airbnb', 'Netflix', 'Spotify', 'Pinterest'],
  },
  {
    id: 'data-table-logic',
    title: 'Data Table with Sorting & Filtering',
    difficulty: 'Hard',
    category: 'React Components',
    description: `Implement the core logic for a Data Table component with sorting and filtering.

**Requirements:**
- \`createTableState(data, columns)\` - Manage table state
- Multi-column sorting (primary, secondary)
- Column filtering with different filter types (text, number range, select)
- Pagination support
- Column visibility toggle

**Example:**
\`\`\`javascript
const table = createTableState(users, columns);
table.sort('name', 'asc');
table.filter('age', { min: 18, max: 65 });
table.getRows(); // Sorted and filtered data
\`\`\``,
    starterCode: `// Table state manager
function createTableState(data, columns) {
  // Manage: sorting, filtering, pagination, column visibility
  // Methods: sort(col, dir), filter(col, value), setPage(n), 
  //          toggleColumn(col), getRows(), getState()
}

// Sorting utilities
function sortData(data, sortConfig) {
  // sortConfig: [{ column, direction }] - supports multi-sort
}

// Filtering utilities
function filterData(data, filters) {
  // filters: { columnId: filterValue }
}

// Test your implementation:
// const data = [{ name: 'John', age: 30 }, { name: 'Jane', age: 25 }];
// const table = createTableState(data, ['name', 'age']);
// table.sort('age', 'asc');`,
    solution: `// Sorting utilities
function sortData(data, sortConfig) {
  if (!sortConfig || sortConfig.length === 0) return data;
  
  return [...data].sort((a, b) => {
    for (const { column, direction } of sortConfig) {
      const aVal = a[column];
      const bVal = b[column];
      
      let comparison = 0;
      if (aVal < bVal) comparison = -1;
      else if (aVal > bVal) comparison = 1;
      
      if (comparison !== 0) {
        return direction === 'desc' ? -comparison : comparison;
      }
    }
    return 0;
  });
}

// Filtering utilities
function filterData(data, filters) {
  if (!filters || Object.keys(filters).length === 0) return data;
  
  return data.filter(row => {
    return Object.entries(filters).every(([column, filter]) => {
      const value = row[column];
      
      if (filter === null || filter === undefined) return true;
      
      // Text filter
      if (typeof filter === 'string') {
        return String(value).toLowerCase().includes(filter.toLowerCase());
      }
      
      // Range filter { min, max }
      if (typeof filter === 'object' && ('min' in filter || 'max' in filter)) {
        const { min, max } = filter;
        if (min !== undefined && value < min) return false;
        if (max !== undefined && value > max) return false;
        return true;
      }
      
      // Array filter (multiple select)
      if (Array.isArray(filter)) {
        return filter.length === 0 || filter.includes(value);
      }
      
      // Exact match
      return value === filter;
    });
  });
}

// Table state manager
function createTableState(data, columns) {
  let state = {
    sortConfig: [],
    filters: {},
    page: 1,
    pageSize: 10,
    visibleColumns: new Set(columns),
    selectedRows: new Set()
  };
  
  const getProcessedData = () => {
    let result = [...data];
    result = filterData(result, state.filters);
    result = sortData(result, state.sortConfig);
    return result;
  };
  
  return {
    sort: (column, direction = 'asc', multi = false) => {
      if (multi) {
        const existing = state.sortConfig.findIndex(s => s.column === column);
        if (existing >= 0) {
          state.sortConfig[existing].direction = direction;
        } else {
          state.sortConfig.push({ column, direction });
        }
      } else {
        state.sortConfig = [{ column, direction }];
      }
    },
    
    clearSort: () => {
      state.sortConfig = [];
    },
    
    filter: (column, value) => {
      if (value === null || value === undefined || value === '') {
        delete state.filters[column];
      } else {
        state.filters[column] = value;
      }
      state.page = 1; // Reset to first page on filter
    },
    
    clearFilters: () => {
      state.filters = {};
      state.page = 1;
    },
    
    setPage: (page) => {
      const totalPages = Math.ceil(getProcessedData().length / state.pageSize);
      state.page = Math.max(1, Math.min(page, totalPages || 1));
    },
    
    setPageSize: (size) => {
      state.pageSize = size;
      state.page = 1;
    },
    
    toggleColumn: (column) => {
      if (state.visibleColumns.has(column)) {
        state.visibleColumns.delete(column);
      } else {
        state.visibleColumns.add(column);
      }
    },
    
    selectRow: (index) => {
      if (state.selectedRows.has(index)) {
        state.selectedRows.delete(index);
      } else {
        state.selectedRows.add(index);
      }
    },
    
    getRows: () => {
      const processed = getProcessedData();
      const start = (state.page - 1) * state.pageSize;
      return processed.slice(start, start + state.pageSize);
    },
    
    getTotalRows: () => getProcessedData().length,
    
    getState: () => ({
      ...state,
      visibleColumns: Array.from(state.visibleColumns),
      selectedRows: Array.from(state.selectedRows),
      totalRows: getProcessedData().length,
      totalPages: Math.ceil(getProcessedData().length / state.pageSize)
    })
  };
}`,
    hints: [
      'For multi-column sort, iterate through sortConfig and only move to next column if values are equal.',
      'Different filter types: string (contains), object with min/max (range), array (multi-select).',
      'Reset page to 1 when filters change to avoid showing empty pages.',
      'Use Set for visibleColumns and selectedRows for O(1) lookup.',
      'getProcessedData should apply filters first, then sorting, for best performance.',
    ],
    testCases: [
      {
        id: 'table-1',
        name: 'Sorts data ascending',
        input: `
          const data = [{ name: 'Charlie' }, { name: 'Alice' }, { name: 'Bob' }];
          const sorted = sortData(data, [{ column: 'name', direction: 'asc' }]);
          sorted.map(r => r.name).join(',');
        `,
        expected: 'Alice,Bob,Charlie',
      },
      {
        id: 'table-2',
        name: 'Filters with text search',
        input: `
          const data = [{ name: 'John' }, { name: 'Jane' }, { name: 'Bob' }];
          const filtered = filterData(data, { name: 'j' });
          filtered.length;
        `,
        expected: '2',
      },
      {
        id: 'table-3',
        name: 'Filters with range',
        input: `
          const data = [{ age: 20 }, { age: 30 }, { age: 40 }, { age: 50 }];
          const filtered = filterData(data, { age: { min: 25, max: 45 } });
          filtered.map(r => r.age).join(',');
        `,
        expected: '30,40',
      },
      {
        id: 'table-4',
        name: 'Table state pagination works',
        input: `
          const data = Array.from({ length: 25 }, (_, i) => ({ id: i }));
          const table = createTableState(data, ['id']);
          table.setPageSize(10);
          table.setPage(2);
          const rows = table.getRows();
          JSON.stringify({ first: rows[0].id, count: rows.length });
        `,
        expected: '{"first":10,"count":10}',
      },
      {
        id: 'table-5',
        name: 'Sort and filter together',
        input: `
          const data = [
            { name: 'Alice', age: 30 },
            { name: 'Bob', age: 25 },
            { name: 'Charlie', age: 35 },
            { name: 'Anna', age: 28 }
          ];
          const table = createTableState(data, ['name', 'age']);
          table.filter('name', 'a');
          table.sort('age', 'desc');
          table.getRows().map(r => r.name).join(',');
        `,
        expected: 'Charlie,Alice,Anna',
      },
    ],
    timeEstimate: '30-40 min',
    companies: ['Google', 'Microsoft', 'Salesforce', 'Palantir'],
  },
  {
    id: 'drag-drop-list',
    title: 'Drag & Drop List Logic',
    difficulty: 'Hard',
    category: 'React Components',
    description: `Implement the core logic for a Drag & Drop sortable list.

**Requirements:**
- \`createDragDropState(items)\` - Manage drag state and item positions
- Calculate drop position based on mouse/touch coordinates
- Handle reordering with animations (calculate transforms)
- Support drag handles and disabled items
- Multi-select drag support

**Example:**
\`\`\`javascript
const dnd = createDragDropState(['A', 'B', 'C', 'D']);
dnd.startDrag(0); // Start dragging item 0
dnd.updatePosition(150); // Mouse at y=150
dnd.endDrag(); // Finalize new order
dnd.getItems(); // Reordered array
\`\`\``,
    starterCode: `// Array reorder utility
function reorderArray(arr, fromIndex, toIndex) {
  // Move item from fromIndex to toIndex
}

// Calculate drop index based on position
function calculateDropIndex(itemPositions, dragY, itemHeight) {
  // Given y coordinate, determine which index to drop at
}

// Drag & Drop state manager
function createDragDropState(items) {
  // Methods: startDrag(index), updatePosition(y), endDrag(),
  //          getItems(), getDragState(), canDrag(index)
}

// Test your implementation:
// const dnd = createDragDropState(['A', 'B', 'C']);
// dnd.startDrag(2);
// dnd.endDrag(0);`,
    solution: `// Array reorder utility
function reorderArray(arr, fromIndex, toIndex) {
  const result = [...arr];
  const [item] = result.splice(fromIndex, 1);
  result.splice(toIndex, 0, item);
  return result;
}

// Calculate drop index based on position
function calculateDropIndex(itemCount, dragY, itemHeight, startY = 0) {
  const relativeY = dragY - startY;
  const index = Math.round(relativeY / itemHeight);
  return Math.max(0, Math.min(index, itemCount - 1));
}

// Calculate transforms for animation
function calculateTransforms(itemCount, dragIndex, hoverIndex) {
  const transforms = [];
  
  for (let i = 0; i < itemCount; i++) {
    if (i === dragIndex) {
      transforms.push({ scale: 1.02, shadow: true, zIndex: 999 });
    } else if (dragIndex < hoverIndex && i > dragIndex && i <= hoverIndex) {
      // Items shift up
      transforms.push({ translateY: -1 }); // -1 = one item height up
    } else if (dragIndex > hoverIndex && i < dragIndex && i >= hoverIndex) {
      // Items shift down
      transforms.push({ translateY: 1 }); // 1 = one item height down
    } else {
      transforms.push({ translateY: 0 });
    }
  }
  
  return transforms;
}

// Drag & Drop state manager
function createDragDropState(initialItems, options = {}) {
  const { disabledIndices = [], itemHeight = 50 } = options;
  
  let items = [...initialItems];
  let dragState = {
    isDragging: false,
    dragIndex: -1,
    hoverIndex: -1,
    startY: 0,
    currentY: 0,
    selectedIndices: new Set()
  };
  
  let listeners = [];
  const notify = () => listeners.forEach(fn => fn(dragState, items));
  
  return {
    startDrag: (index, y = 0) => {
      if (disabledIndices.includes(index)) return false;
      
      dragState.isDragging = true;
      dragState.dragIndex = index;
      dragState.hoverIndex = index;
      dragState.startY = y;
      dragState.currentY = y;
      
      if (!dragState.selectedIndices.has(index)) {
        dragState.selectedIndices = new Set([index]);
      }
      
      notify();
      return true;
    },
    
    updatePosition: (y) => {
      if (!dragState.isDragging) return;
      
      dragState.currentY = y;
      const newHoverIndex = calculateDropIndex(
        items.length,
        y,
        itemHeight,
        dragState.startY - dragState.dragIndex * itemHeight
      );
      
      if (newHoverIndex !== dragState.hoverIndex) {
        dragState.hoverIndex = newHoverIndex;
        notify();
      }
    },
    
    endDrag: () => {
      if (!dragState.isDragging) return items;
      
      if (dragState.dragIndex !== dragState.hoverIndex) {
        items = reorderArray(items, dragState.dragIndex, dragState.hoverIndex);
      }
      
      dragState.isDragging = false;
      dragState.dragIndex = -1;
      dragState.hoverIndex = -1;
      dragState.selectedIndices.clear();
      
      notify();
      return items;
    },
    
    cancelDrag: () => {
      dragState.isDragging = false;
      dragState.dragIndex = -1;
      dragState.hoverIndex = -1;
      notify();
    },
    
    toggleSelect: (index) => {
      if (dragState.selectedIndices.has(index)) {
        dragState.selectedIndices.delete(index);
      } else {
        dragState.selectedIndices.add(index);
      }
      notify();
    },
    
    canDrag: (index) => !disabledIndices.includes(index),
    
    getItems: () => [...items],
    
    getDragState: () => ({
      ...dragState,
      selectedIndices: Array.from(dragState.selectedIndices),
      transforms: dragState.isDragging 
        ? calculateTransforms(items.length, dragState.dragIndex, dragState.hoverIndex)
        : items.map(() => ({ translateY: 0 }))
    }),
    
    subscribe: (fn) => {
      listeners.push(fn);
      return () => { listeners = listeners.filter(l => l !== fn); };
    }
  };
}`,
    hints: [
      'reorderArray: splice out the item, then splice it back at the new position.',
      'For drop index, divide the Y position by item height and round to nearest integer.',
      'Items between drag start and hover position need to shift up or down.',
      'Use transforms instead of actually reordering during drag for smooth animation.',
      'Only reorder the actual array when drag ends (endDrag).',
    ],
    testCases: [
      {
        id: 'dnd-1',
        name: 'Reorders array correctly',
        input: `JSON.stringify(reorderArray(['A', 'B', 'C', 'D'], 0, 2))`,
        expected: '["B","C","A","D"]',
      },
      {
        id: 'dnd-2',
        name: 'Calculates drop index',
        input: `
          // Item height 50, 5 items, dragging from y=25 (middle of first)
          // Move to y=175 (middle of 4th item, index 3)
          calculateDropIndex(5, 175, 50, 0);
        `,
        expected: '4',
      },
      {
        id: 'dnd-3',
        name: 'DnD state tracks drag',
        input: `
          const dnd = createDragDropState(['A', 'B', 'C']);
          dnd.startDrag(0, 0);
          const state = dnd.getDragState();
          JSON.stringify({ isDragging: state.isDragging, dragIndex: state.dragIndex });
        `,
        expected: '{"isDragging":true,"dragIndex":0}',
      },
      {
        id: 'dnd-4',
        name: 'Reorders on drag end',
        input: `
          const dnd = createDragDropState(['A', 'B', 'C', 'D'], { itemHeight: 50 });
          dnd.startDrag(0, 25);
          dnd.updatePosition(125); // Move to position of index 2
          dnd.endDrag();
          JSON.stringify(dnd.getItems());
        `,
        expected: '["B","C","A","D"]',
      },
      {
        id: 'dnd-5',
        name: 'Respects disabled items',
        input: `
          const dnd = createDragDropState(['A', 'B', 'C'], { disabledIndices: [1] });
          const canDrag0 = dnd.canDrag(0);
          const canDrag1 = dnd.canDrag(1);
          JSON.stringify([canDrag0, canDrag1]);
        `,
        expected: '[true,false]',
      },
    ],
    timeEstimate: '30-40 min',
    companies: ['Notion', 'Trello', 'Asana', 'Monday.com'],
  },
];

// ==================== DIFFICULTY COLORS ====================
const difficultyConfig = {
  Easy: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  Medium: { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30' },
  Hard: { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30' },
};

// ==================== MAIN COMPONENT ====================
interface CodeChallengesProps {
  onClose: () => void;
  isDarkMode?: boolean;
}

const CodeChallenges: React.FC<CodeChallengesProps> = ({ onClose, isDarkMode = true }) => {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [code, setCode] = useState('');
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [revealedHints, setRevealedHints] = useState<number>(0);
  const [showSolution, setShowSolution] = useState(false);
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(new Set());
  const [filterDifficulty, setFilterDifficulty] = useState<string>('All');
  const [filterCategory, setFilterCategory] = useState<string>('All');

  // Load completed challenges from localStorage
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem('code_challenges_completed');
      if (saved) {
        setCompletedChallenges(new Set(JSON.parse(saved)));
      }
    } catch (e) {
      // Ignore
    }
  }, []);

  // Save completed challenges to localStorage
  const markCompleted = useCallback((challengeId: string) => {
    setCompletedChallenges(prev => {
      const next = new Set(prev);
      next.add(challengeId);
      localStorage.setItem('code_challenges_completed', JSON.stringify(Array.from(next)));
      return next;
    });
  }, []);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(CHALLENGES.map(c => c.category));
    return ['All', ...Array.from(cats)];
  }, []);

  // Filter challenges
  const filteredChallenges = useMemo(() => {
    return CHALLENGES.filter(c => {
      if (filterDifficulty !== 'All' && c.difficulty !== filterDifficulty) return false;
      if (filterCategory !== 'All' && c.category !== filterCategory) return false;
      return true;
    });
  }, [filterDifficulty, filterCategory]);

  // Select a challenge
  const selectChallenge = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setCode(challenge.starterCode);
    setTestResults([]);
    setRevealedHints(0);
    setShowSolution(false);
  };

  // Back to challenge list
  const goBack = () => {
    setSelectedChallenge(null);
    setCode('');
    setTestResults([]);
    setRevealedHints(0);
    setShowSolution(false);
  };

  // Run tests
  const runTests = useCallback(async () => {
    if (!selectedChallenge) return;

    setIsRunning(true);
    setTestResults([]);
    const results: TestResult[] = [];

    for (const test of selectedChallenge.testCases) {
      try {
        // Create async function with user's code + test
        const AsyncFunction = Object.getPrototypeOf(async function () { }).constructor;
        const testCode = `
          ${code}
          return (${test.input});
        `;
        const fn = new AsyncFunction(testCode);
        const actual = await fn();
        const actualStr = typeof actual === 'object' ? JSON.stringify(actual) : String(actual);

        results.push({
          testId: test.id,
          passed: actualStr === test.expected,
          expected: test.expected,
          actual: actualStr,
        });
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        results.push({
          testId: test.id,
          passed: false,
          expected: test.expected,
          actual: 'Error',
          error: errorMessage,
        });
      }
    }

    setTestResults(results);
    setIsRunning(false);

    // Check if all tests passed
    const allPassed = results.every(r => r.passed);
    if (allPassed) {
      markCompleted(selectedChallenge.id);
    }
  }, [code, selectedChallenge, markCompleted]);

  // Reset code
  const resetCode = () => {
    if (selectedChallenge) {
      setCode(selectedChallenge.starterCode);
      setTestResults([]);
    }
  };

  // Reveal next hint
  const revealNextHint = () => {
    if (selectedChallenge && revealedHints < selectedChallenge.hints.length) {
      setRevealedHints(prev => prev + 1);
    }
  };

  // Theme classes
  const themeClasses = {
    bg: isDarkMode ? 'bg-slate-950' : 'bg-gray-50',
    bgSecondary: isDarkMode ? 'bg-slate-900' : 'bg-white',
    bgTertiary: isDarkMode ? 'bg-slate-800' : 'bg-gray-100',
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    textSecondary: isDarkMode ? 'text-slate-300' : 'text-gray-700',
    textMuted: isDarkMode ? 'text-slate-400' : 'text-gray-500',
    border: isDarkMode ? 'border-slate-700' : 'border-gray-300',
  };

  const passedCount = testResults.filter(r => r.passed).length;
  const totalTests = testResults.length;
  const allPassed = totalTests > 0 && passedCount === totalTests;

  return (
    <div className="fixed inset-0 z-[100] flex bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`w-full h-full overflow-hidden ${themeClasses.bg} border ${themeClasses.border} flex flex-col`}
      >
        {/* Header */}
        <div className={`flex items-center justify-between px-6 py-4 border-b ${themeClasses.border} ${themeClasses.bgSecondary}`}>
          <div className="flex items-center gap-3">
            {selectedChallenge && (
              <button
                onClick={goBack}
                className={`p-2 rounded-lg ${themeClasses.bgTertiary} ${themeClasses.textSecondary} hover:text-white transition-colors`}
              >
                <ChevronRight className="w-5 h-5 rotate-180" />
              </button>
            )}
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className={`text-lg font-bold ${themeClasses.text}`}>
                {selectedChallenge ? selectedChallenge.title : 'Code Challenges'}
              </h2>
              <p className={`text-xs ${themeClasses.textMuted}`}>
                {selectedChallenge
                  ? `${selectedChallenge.category} • ${selectedChallenge.timeEstimate}`
                  : `${completedChallenges.size}/${CHALLENGES.length} completed`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {selectedChallenge && (
              <div className={`px-3 py-1.5 rounded-full ${difficultyConfig[selectedChallenge.difficulty].bg} ${difficultyConfig[selectedChallenge.difficulty].text} text-xs font-medium border ${difficultyConfig[selectedChallenge.difficulty].border}`}>
                {selectedChallenge.difficulty}
              </div>
            )}
            <button
              onClick={onClose}
              className={`p-2 rounded-lg ${themeClasses.bgTertiary} ${themeClasses.textSecondary} hover:text-red-400 transition-colors`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto min-h-0">
          {!selectedChallenge ? (
            // Challenge List
            <div className="p-6">
              {/* Filters */}
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="flex items-center gap-2">
                  <span className={`text-xs ${themeClasses.textMuted}`}>Difficulty:</span>
                  <div className="flex gap-1">
                    {['All', 'Easy', 'Medium', 'Hard'].map(d => (
                      <button
                        key={d}
                        onClick={() => setFilterDifficulty(d)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${filterDifficulty === d
                            ? 'bg-violet-500 text-white'
                            : `${themeClasses.bgTertiary} ${themeClasses.textSecondary} hover:bg-violet-500/20`
                          }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs ${themeClasses.textMuted}`}>Category:</span>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className={`px-3 py-1 rounded-lg text-xs ${themeClasses.bgTertiary} ${themeClasses.text} border ${themeClasses.border} outline-none focus:border-violet-500`}
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Challenge Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredChallenges.map(challenge => {
                  const isCompleted = completedChallenges.has(challenge.id);
                  const diffConfig = difficultyConfig[challenge.difficulty];

                  return (
                    <motion.button
                      key={challenge.id}
                      onClick={() => selectChallenge(challenge)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`text-left p-5 rounded-xl border ${themeClasses.border} ${themeClasses.bgSecondary} hover:border-violet-500/50 transition-all group relative overflow-hidden`}
                    >
                      {isCompleted && (
                        <div className="absolute top-3 right-3">
                          <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      )}

                      <div className="flex items-start gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-lg ${diffConfig.bg} flex items-center justify-center`}>
                          {challenge.difficulty === 'Easy' && <Zap className={`w-5 h-5 ${diffConfig.text}`} />}
                          {challenge.difficulty === 'Medium' && <Flame className={`w-5 h-5 ${diffConfig.text}`} />}
                          {challenge.difficulty === 'Hard' && <Target className={`w-5 h-5 ${diffConfig.text}`} />}
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-semibold ${themeClasses.text} group-hover:text-violet-400 transition-colors`}>
                            {challenge.title}
                          </h3>
                          <p className={`text-xs ${themeClasses.textMuted}`}>{challenge.category}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${diffConfig.bg} ${diffConfig.text}`}>
                          {challenge.difficulty}
                        </span>
                        <span className={`flex items-center gap-1 text-[10px] ${themeClasses.textMuted}`}>
                          <Clock className="w-3 h-3" />
                          {challenge.timeEstimate}
                        </span>
                        <span className={`flex items-center gap-1 text-[10px] ${themeClasses.textMuted}`}>
                          <CheckCircle2 className="w-3 h-3" />
                          {challenge.testCases.length} tests
                        </span>
                      </div>

                      {challenge.companies.length > 0 && (
                        <div className="flex gap-1 mt-3 flex-wrap">
                          {challenge.companies.slice(0, 3).map(company => (
                            <span key={company} className={`text-[10px] px-2 py-0.5 rounded-full ${themeClasses.bgTertiary} ${themeClasses.textMuted}`}>
                              {company}
                            </span>
                          ))}
                          {challenge.companies.length > 3 && (
                            <span className={`text-[10px] ${themeClasses.textMuted}`}>+{challenge.companies.length - 3}</span>
                          )}
                        </div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          ) : (
            // Challenge View
            <div className="flex flex-col lg:flex-row lg:h-full">
              {/* Left Panel - Description */}
              <div className={`w-full lg:w-2/5 border-b lg:border-b-0 lg:border-r ${themeClasses.border} lg:overflow-y-auto`}>
                <div className="p-6 space-y-6">
                  {/* Description */}
                  <div>
                    <h3 className={`text-sm font-semibold ${themeClasses.text} mb-3 flex items-center gap-2`}>
                      <Target className="w-4 h-4 text-violet-400" />
                      Problem Description
                    </h3>
                    <div className={`text-sm ${themeClasses.textSecondary} whitespace-pre-wrap prose prose-sm ${isDarkMode ? 'prose-invert' : ''} max-w-none`}>
                      {selectedChallenge.description.split('```').map((part, i) => {
                        if (i % 2 === 1) {
                          // Code block
                          const lines = part.split('\n');
                          const lang = lines[0];
                          const code = lines.slice(1).join('\n');
                          return (
                            <pre key={i} className={`${themeClasses.bgTertiary} rounded-lg p-3 overflow-x-auto text-xs`}>
                              <code>{code}</code>
                            </pre>
                          );
                        }
                        return <span key={i}>{part}</span>;
                      })}
                    </div>
                  </div>

                  {/* Companies */}
                  {selectedChallenge.companies.length > 0 && (
                    <div>
                      <h3 className={`text-sm font-semibold ${themeClasses.text} mb-2`}>Asked at</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedChallenge.companies.map(company => (
                          <span key={company} className={`text-xs px-2.5 py-1 rounded-full ${themeClasses.bgTertiary} ${themeClasses.textSecondary}`}>
                            {company}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Hints */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className={`text-sm font-semibold ${themeClasses.text} flex items-center gap-2`}>
                        <Lightbulb className="w-4 h-4 text-amber-400" />
                        Hints ({revealedHints}/{selectedChallenge.hints.length})
                      </h3>
                      {revealedHints < selectedChallenge.hints.length && (
                        <button
                          onClick={revealNextHint}
                          className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 transition-colors"
                        >
                          <Unlock className="w-3 h-3" />
                          Reveal Hint
                        </button>
                      )}
                    </div>
                    <div className="space-y-2">
                      {selectedChallenge.hints.map((hint, i) => (
                        <div
                          key={i}
                          className={`p-3 rounded-lg text-sm ${i < revealedHints
                              ? `${themeClasses.bgTertiary} ${themeClasses.textSecondary}`
                              : `${themeClasses.bgTertiary}/50 ${themeClasses.textMuted}`
                            }`}
                        >
                          {i < revealedHints ? (
                            <div className="flex gap-2">
                              <span className="text-amber-400 font-semibold">{i + 1}.</span>
                              {hint}
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <Lock className="w-4 h-4" />
                              <span>Hint {i + 1} locked</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Solution Toggle */}
                  <div>
                    <button
                      onClick={() => setShowSolution(!showSolution)}
                      className={`flex items-center gap-2 text-sm font-semibold ${showSolution ? 'text-violet-400' : themeClasses.textMuted
                        } hover:text-violet-400 transition-colors`}
                    >
                      {showSolution ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      {showSolution ? 'Hide Solution' : 'Show Solution'}
                    </button>
                    <AnimatePresence>
                      {showSolution && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3"
                        >
                          <div className={`rounded-lg overflow-hidden border ${themeClasses.border}`}>
                            <div className={`px-3 py-2 text-xs ${themeClasses.bgTertiary} ${themeClasses.textMuted} flex items-center gap-2`}>
                              <Sparkles className="w-3 h-3 text-violet-400" />
                              Solution
                            </div>
                            <Editor
                              height={`${Math.min(Math.max((selectedChallenge.solution.split('\n').length + 2) * 19, 150), 600)}px`}
                              defaultLanguage="javascript"
                              value={selectedChallenge.solution}
                              theme={isDarkMode ? 'vs-dark' : 'light'}
                              options={{
                                readOnly: true,
                                minimap: { enabled: false },
                                fontSize: 12,
                                lineNumbers: 'on',
                                scrollBeyondLastLine: false,
                                padding: { top: 8, bottom: 8 },
                              }}
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Right Panel - Code Editor & Tests */}
              <div className="flex-1 flex flex-col lg:overflow-hidden">
                {/* Editor Header */}
                <div className={`flex items-center justify-between px-4 py-2 ${themeClasses.bgSecondary} border-b ${themeClasses.border}`}>
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-red-500"></span>
                      <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                      <span className="w-3 h-3 rounded-full bg-green-500"></span>
                    </div>
                    <span className={`text-xs ${themeClasses.textMuted} font-mono`}>solution.js</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={resetCode}
                      className={`p-1.5 rounded hover:bg-slate-700/50 transition-colors ${themeClasses.textMuted}`}
                      title="Reset code"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                    <button
                      onClick={runTests}
                      disabled={isRunning}
                      className="flex items-center gap-1.5 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-md transition-colors disabled:opacity-50"
                    >
                      {isRunning ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Play className="w-3.5 h-3.5" />
                      )}
                      {isRunning ? 'Running...' : 'Run Tests'}
                    </button>
                  </div>
                </div>

                {/* Monaco Editor */}
                <div className="h-[250px] lg:h-[300px] lg:flex-shrink-0">
                  <Editor
                    height="100%"
                    defaultLanguage="javascript"
                    value={code}
                    onChange={(value) => setCode(value || '')}
                    theme={isDarkMode ? 'vs-dark' : 'light'}
                    options={{
                      minimap: { enabled: false },
                      fontSize: 14,
                      lineNumbers: 'on',
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                      tabSize: 2,
                      wordWrap: 'on',
                      padding: { top: 12, bottom: 12 },
                    }}
                  />
                </div>

                {/* Test Results - Always visible */}
                <div className={`border-t ${themeClasses.border} lg:flex-1 lg:overflow-y-auto min-h-[200px]`}>
                  <div className={`px-4 py-2 ${themeClasses.bgSecondary} border-b ${themeClasses.border} flex items-center justify-between sticky top-0 z-10`}>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${testResults.length > 0 ? (allPassed ? 'bg-emerald-500' : 'bg-amber-500') : 'bg-slate-500'} animate-pulse`}></div>
                      <span className={`text-xs font-semibold ${themeClasses.text}`}>Test Results</span>
                      {testResults.length > 0 && (
                        <span className={`text-xs px-2 py-0.5 rounded-full ${allPassed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                          }`}>
                          {passedCount}/{totalTests} passed
                        </span>
                      )}
                      {testResults.length === 0 && selectedChallenge && (
                        <span className={`text-xs ${themeClasses.textMuted}`}>
                          {selectedChallenge.testCases.length} tests available
                        </span>
                      )}
                    </div>
                    {allPassed && (
                      <div className="flex items-center gap-2 text-emerald-400">
                        <Trophy className="w-4 h-4" />
                        <span className="text-xs font-semibold">Challenge Complete!</span>
                      </div>
                    )}
                  </div>

                  {testResults.length === 0 ? (
                    <div className={`p-6 text-center ${themeClasses.textMuted}`}>
                      <div className={`w-12 h-12 rounded-full ${themeClasses.bgTertiary} flex items-center justify-center mx-auto mb-3`}>
                        <Play className="w-6 h-6 opacity-50" />
                      </div>
                      <p className="text-sm font-medium mb-1">Ready to test your code</p>
                      <p className="text-xs opacity-70">Click "Run Tests" to check your solution</p>
                      {selectedChallenge && (
                        <div className="mt-4 flex flex-wrap justify-center gap-2">
                          {selectedChallenge.testCases.map((test, i) => (
                            <span key={test.id} className={`text-[10px] px-2 py-1 rounded ${themeClasses.bgTertiary}`}>
                              {i + 1}. {test.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="p-4 space-y-3">
                      {testResults.map((result, i) => {
                        const test = selectedChallenge.testCases[i];
                        return (
                          <div
                            key={result.testId}
                            className={`p-3 rounded-lg border ${result.passed
                                ? 'border-emerald-500/30 bg-emerald-500/10'
                                : 'border-red-500/30 bg-red-500/10'
                              }`}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              {result.passed ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                              ) : (
                                <XCircle className="w-4 h-4 text-red-400" />
                              )}
                              <span className={`text-sm font-medium ${result.passed ? 'text-emerald-400' : 'text-red-400'}`}>
                                {test.name}
                              </span>
                            </div>
                            {!result.passed && (
                              <div className="space-y-1 text-xs font-mono">
                                <div className={themeClasses.textMuted}>
                                  <span className="text-emerald-400">Expected:</span> {result.expected}
                                </div>
                                <div className={themeClasses.textMuted}>
                                  <span className="text-red-400">Actual:</span> {result.actual}
                                </div>
                                {result.error && (
                                  <div className="text-red-400">
                                    Error: {result.error}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default CodeChallenges;

