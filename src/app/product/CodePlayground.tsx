'use client';
import React, { useState, useCallback, useRef } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import { Play, RotateCcw, Copy, Check, Loader2 } from 'lucide-react';

interface CodePlaygroundProps {
  initialCode: string;
  isDarkMode?: boolean;
}

const CodePlayground: React.FC<CodePlaygroundProps> = ({ initialCode, isDarkMode = true }) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const editorRef = useRef<any>(null);

  React.useEffect(() => {
    setCode(initialCode);
    setOutput([]);
  }, [initialCode]);

  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;
  };

  const runCode = useCallback(() => {
    setIsRunning(true);
    setOutput([]);

    const logs: string[] = [];
    const originalConsoleLog = console.log;
    const originalConsoleError = console.error;
    const originalConsoleWarn = console.warn;

    console.log = (...args) => {
      logs.push(args.map(arg =>
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' '));
    };
    console.error = (...args) => {
      logs.push(`❌ ${args.join(' ')}`);
    };
    console.warn = (...args) => {
      logs.push(`⚠️ ${args.join(' ')}`);
    };

    try {
      const AsyncFunction = Object.getPrototypeOf(async function () { }).constructor;
      const fn = new AsyncFunction(code);

      Promise.resolve(fn()).then(() => {
        setOutput(logs.length > 0 ? logs : ['✓ Code executed (no output)']);
      }).catch((err: Error) => {
        setOutput([`❌ Runtime Error: ${err.message}`]);
      }).finally(() => {
        console.log = originalConsoleLog;
        console.error = originalConsoleError;
        console.warn = originalConsoleWarn;
        setIsRunning(false);
      });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setOutput([`❌ Syntax Error: ${errorMessage}`]);
      console.log = originalConsoleLog;
      console.error = originalConsoleError;
      console.warn = originalConsoleWarn;
      setIsRunning(false);
    }
  }, [code]);

  const resetCode = () => {
    setCode(initialCode);
    setOutput([]);
  };

  const copyCode = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const borderClass = isDarkMode ? 'border-slate-700' : 'border-gray-300';
  const headerBg = isDarkMode ? 'bg-slate-800' : 'bg-gray-100';
  const textClass = isDarkMode ? 'text-slate-400' : 'text-gray-500';

  return (
    <div className={`rounded-lg overflow-hidden border ${borderClass} shadow-xl`}>
      {/* Header */}
      <div className={`flex items-center justify-between px-4 py-2 ${headerBg} border-b ${borderClass}`}>
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
          </div>
          <span className={`text-xs ${textClass} font-mono`}>playground.js</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={copyCode}
            className={`p-1.5 rounded hover:bg-slate-700/50 transition-colors ${textClass}`}
            title="Copy code"
          >
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
          </button>
          <button
            onClick={resetCode}
            className={`p-1.5 rounded hover:bg-slate-700/50 transition-colors ${textClass}`}
            title="Reset code"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={runCode}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-md transition-colors disabled:opacity-50"
          >
            {isRunning ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
            {isRunning ? 'Running...' : 'Run Code'}
          </button>
        </div>
      </div>

      {/* Monaco Editor */}
      <Editor
        height="200px"
        defaultLanguage="javascript"
        value={code}
        onChange={(value) => setCode(value || '')}
        onMount={handleEditorDidMount}
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
          scrollbar: { verticalScrollbarSize: 8, horizontalScrollbarSize: 8 },
        }}
        loading={
          <div className={`flex items-center justify-center h-[200px] ${isDarkMode ? 'bg-[#1e1e1e]' : 'bg-white'}`}>
            <Loader2 className={`w-6 h-6 animate-spin ${isDarkMode ? 'text-slate-500' : 'text-gray-400'}`} />
          </div>
        }
      />

      {/* Output Console */}
      {output.length > 0 && (
        <div className={`border-t ${borderClass}`}>
          <div className={`px-4 py-1.5 ${headerBg} text-xs font-mono ${textClass} flex items-center gap-2`}>
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Console Output
          </div>
          <div className={`p-4 font-mono text-sm ${isDarkMode ? 'bg-[#0d1117] text-green-400' : 'bg-gray-900 text-green-300'} max-h-[180px] overflow-auto`}>
            {output.map((line, i) => (
              <div key={i} className="whitespace-pre-wrap py-0.5">{line}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CodePlayground;
