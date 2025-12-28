"use client";

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Feature } from '@/app/types';
import { CodeIcon, ServerIcon, CpuIcon, TerminalIcon } from '@/app/product/Icons';

// Feature Visual Components
const ReactRSCVisual: React.FC = () => (
  <div className="w-full h-full bg-[#1e1e1e] flex flex-col">
    {/* File Tabs */}
    <div className="bg-[#252526] px-3 py-1 flex items-center gap-1 border-b border-gray-700">
      <div className="bg-[#1e1e1e] px-2 py-0.5 rounded-t border-t border-l border-r border-gray-700">
        <span className="text-[9px] text-gray-300 font-medium">app/page.tsx</span>
      </div>
      <div className="px-2 py-0.5">
        <span className="text-[9px] text-gray-500">components/UserList.tsx</span>
      </div>
    </div>
    
    {/* Code Content with Line Numbers */}
    <div className="flex-1 flex overflow-hidden">
      {/* Line Numbers */}
      <div className="bg-[#1e1e1e] text-gray-600 text-[9px] py-2 px-2 font-mono border-r border-gray-800 select-none">
        {Array.from({ length: 25 }, (_, i) => (
          <div key={i}>{i + 1}</div>
        ))}
      </div>
      
      {/* Code Content */}
      <div className="flex-1 p-4 font-mono text-[10px] leading-relaxed overflow-auto">
        <div className="space-y-1">
          {/* Imports */}
          <div><span className="text-purple-400">import</span> <span className="text-white">{'{'}</span> <span className="text-blue-400">Suspense</span> <span className="text-white">{'}'}</span> <span className="text-purple-400">from</span> <span className="text-orange-400">'react'</span><span className="text-white">;</span></div>
          <div><span className="text-purple-400">import</span> <span className="text-blue-400">UserList</span> <span className="text-purple-400">from</span> <span className="text-orange-400">'./components/UserList'</span><span className="text-white">;</span></div>
          <div><span className="text-purple-400">import</span> <span className="text-blue-400">LoadingSkeleton</span> <span className="text-purple-400">from</span> <span className="text-orange-400">'./components/LoadingSkeleton'</span><span className="text-white">;</span></div>
          <div className="pb-2"></div>
          
          {/* Async function */}
          <div><span className="text-purple-400">async function</span> <span className="text-blue-400">fetchUsers</span><span className="text-white">()</span> <span className="text-white">{'{'}</span></div>
          <div className="pl-4"><span className="text-purple-400">const</span> <span className="text-yellow-300">res</span> <span className="text-white">=</span> <span className="text-purple-400">await</span> <span className="text-blue-400">fetch</span><span className="text-white">(</span><span className="text-orange-400">'https://api.example.com/users'</span><span className="text-white">, </span><span className="text-white">{'{'}</span></div>
          <div className="pl-8"><span className="text-green-400">cache</span><span className="text-white">: </span><span className="text-orange-400">'force-cache'</span><span className="text-white">,</span></div>
          <div className="pl-8"><span className="text-green-400">next</span><span className="text-white">: </span><span className="text-white">{'{'}</span> <span className="text-green-400">revalidate</span><span className="text-white">: </span><span className="text-yellow-300">3600</span> <span className="text-white">{'}'}</span></div>
          <div className="pl-4"><span className="text-white">{'}'}</span><span className="text-white">);</span></div>
          <div className="pl-4"><span className="text-purple-400">return</span> <span className="text-yellow-300">res</span><span className="text-white">.</span><span className="text-blue-400">json</span><span className="text-white">();</span></div>
          <div><span className="text-white">{'}'}</span></div>
          <div className="pb-2"></div>
          
          {/* Main Page Component */}
          <div><span className="text-purple-400">export default async function</span> <span className="text-blue-400">Page</span><span className="text-white">()</span> <span className="text-white">{'{'}</span></div>
          <div className="pl-4"><span className="text-green-400">const</span> <span className="text-yellow-300">users</span> <span className="text-white">=</span> <span className="text-purple-400">await</span> <span className="text-blue-400">fetchUsers</span><span className="text-white">();</span></div>
          <div className="pl-4"></div>
          <div className="pl-4"><span className="text-purple-400">return</span> <span className="text-white">(</span></div>
          <div className="pl-8"><span className="text-white">&lt;</span><span className="text-blue-400">div</span> <span className="text-green-400">className</span><span className="text-white">=</span><span className="text-orange-400">"container"</span><span className="text-white">&gt;</span></div>
          <div className="pl-12"><span className="text-white">&lt;</span><span className="text-blue-400">h1</span><span className="text-white">&gt;</span><span className="text-green-400">Users</span><span className="text-white">&lt;/</span><span className="text-blue-400">h1</span><span className="text-white">&gt;</span></div>
          <div className="pl-12"><span className="text-white">&lt;</span><span className="text-blue-400">Suspense</span> <span className="text-green-400">fallback</span><span className="text-white">=</span><span className="text-white">{'{'}</span><span className="text-white">&lt;</span><span className="text-blue-400">LoadingSkeleton</span> <span className="text-white">/&gt;</span><span className="text-white">{'}'}</span><span className="text-white">&gt;</span></div>
          <div className="pl-16"><span className="text-white">&lt;</span><span className="text-blue-400">UserList</span> <span className="text-green-400">users</span><span className="text-white">=</span><span className="text-white">{'{'}</span><span className="text-yellow-300">users</span><span className="text-white">{'}'}</span> <span className="text-white">/&gt;</span></div>
          <div className="pl-12"><span className="text-white">&lt;/</span><span className="text-blue-400">Suspense</span><span className="text-white">&gt;</span></div>
          <div className="pl-8"><span className="text-white">&lt;/</span><span className="text-blue-400">div</span><span className="text-white">&gt;</span></div>
          <div className="pl-4"><span className="text-white">);</span></div>
          <div><span className="text-white">{'}'}</span></div>
        </div>
        
        {/* Status Bar */}
        <div className="mt-4 pt-3 border-t border-gray-700">
          <div className="flex items-center gap-2 text-green-400 mb-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-[9px]">✓ Server Component Rendered</span>
          </div>
          <div className="flex items-center gap-4 text-[8px] text-gray-500">
            <span>RSC: Streaming enabled</span>
            <span>•</span>
            <span>Cache: force-cache</span>
            <span>•</span>
            <span>Revalidate: 3600s</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ArchitectureVisual: React.FC = () => (
  <div className="w-full h-full bg-[#0d1117] flex flex-col p-3 min-h-full">
    {/* Header */}
    <div className="mb-2 pb-2 border-b border-gray-800">
      <div className="text-[10px] font-bold text-white mb-0.5">Monorepo Architecture</div>
      <div className="text-[7px] text-gray-500">Micro-frontends • Shared Libraries • Build Tools</div>
    </div>

    <div className="flex-1 flex flex-col justify-between">
      {/* Micro-frontends Layer */}
      <div>
        <div className="text-[8px] text-gray-400 mb-1.5 font-semibold">Applications</div>
        <div className="grid grid-cols-3 gap-2 mb-3">
          {/* Micro-frontend 1 */}
          <div className="bg-blue-500/20 border border-blue-500/30 rounded p-2 relative">
            <div className="flex items-center justify-between mb-1">
              <div className="text-[8px] text-blue-300 font-semibold">Auth App</div>
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
            </div>
            <div className="space-y-0.5 mb-1">
              <div className="h-1 bg-blue-500/40 rounded w-full"></div>
              <div className="h-1 bg-blue-500/40 rounded w-3/4"></div>
              <div className="h-1 bg-blue-500/40 rounded w-1/2"></div>
            </div>
            <div className="text-[6px] text-blue-400/60 mt-1">Next.js 14</div>
          </div>
          
          {/* Micro-frontend 2 */}
          <div className="bg-purple-500/20 border border-purple-500/30 rounded p-2 relative">
            <div className="flex items-center justify-between mb-1">
              <div className="text-[8px] text-purple-300 font-semibold">Dashboard</div>
              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse"></div>
            </div>
            <div className="space-y-0.5 mb-1">
              <div className="h-1 bg-purple-500/40 rounded w-full"></div>
              <div className="h-1 bg-purple-500/40 rounded w-2/3"></div>
              <div className="h-1 bg-purple-500/40 rounded w-4/5"></div>
            </div>
            <div className="text-[6px] text-purple-400/60 mt-1">React 18</div>
          </div>
          
          {/* Micro-frontend 3 */}
          <div className="bg-green-500/20 border border-green-500/30 rounded p-2 relative">
            <div className="flex items-center justify-between mb-1">
              <div className="text-[8px] text-green-300 font-semibold">Settings</div>
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div className="space-y-0.5 mb-1">
              <div className="h-1 bg-green-500/40 rounded w-full"></div>
              <div className="h-1 bg-green-500/40 rounded w-4/5"></div>
              <div className="h-1 bg-green-500/40 rounded w-3/5"></div>
            </div>
            <div className="text-[6px] text-green-400/60 mt-1">Vite + React</div>
          </div>
        </div>
      </div>

      {/* Shared Libraries Layer */}
      <div className="mb-3">
        <div className="text-[8px] text-gray-400 mb-1.5 font-semibold">Shared Libraries</div>
        <div className="bg-gray-800/50 border border-gray-700/50 rounded p-2">
          <div className="grid grid-cols-4 gap-1.5">
            <div className="bg-yellow-500/20 border border-yellow-500/30 rounded px-1.5 py-1">
              <div className="text-[7px] text-yellow-300 font-semibold">@ui/core</div>
              <div className="h-0.5 bg-yellow-500/30 rounded w-full mt-0.5"></div>
            </div>
            <div className="bg-orange-500/20 border border-orange-500/30 rounded px-1.5 py-1">
              <div className="text-[7px] text-orange-300 font-semibold">@utils</div>
              <div className="h-0.5 bg-orange-500/30 rounded w-full mt-0.5"></div>
            </div>
            <div className="bg-pink-500/20 border border-pink-500/30 rounded px-1.5 py-1">
              <div className="text-[7px] text-pink-300 font-semibold">@hooks</div>
              <div className="h-0.5 bg-pink-500/30 rounded w-full mt-0.5"></div>
            </div>
            <div className="bg-cyan-500/20 border border-cyan-500/30 rounded px-1.5 py-1">
              <div className="text-[7px] text-cyan-300 font-semibold">@types</div>
              <div className="h-0.5 bg-cyan-500/30 rounded w-full mt-0.5"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Build Tools Layer */}
      <div>
        <div className="text-[8px] text-gray-400 mb-1.5 font-semibold">Build & Orchestration</div>
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-indigo-500/20 border border-indigo-500/30 rounded p-1.5">
            <div className="flex items-center gap-1 mb-0.5">
              <div className="w-1 h-1 bg-indigo-400 rounded-full"></div>
              <div className="text-[7px] text-indigo-300 font-semibold">Turborepo</div>
            </div>
            <div className="h-0.5 bg-indigo-500/30 rounded w-2/3"></div>
          </div>
          <div className="flex-1 bg-teal-500/20 border border-teal-500/30 rounded p-1.5">
            <div className="flex items-center gap-1 mb-0.5">
              <div className="w-1 h-1 bg-teal-400 rounded-full"></div>
              <div className="text-[7px] text-teal-300 font-semibold">pnpm</div>
            </div>
            <div className="h-0.5 bg-teal-500/30 rounded w-3/4"></div>
          </div>
        </div>
      </div>

      {/* Status Footer */}
      <div className="mt-3 pt-2 border-t border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
            <div className="text-[7px] text-gray-400">All services running</div>
          </div>
          <div className="text-[7px] text-gray-500">TypeScript • ESLint • Prettier</div>
        </div>
      </div>
    </div>
  </div>
);

const CodePlaygroundVisual: React.FC = () => (
  <div className="w-full h-full bg-[#1e1e1e] flex flex-col">
    {/* Top Menu Bar */}
    <div className="bg-[#2d2d30] px-2 py-0.5 flex items-center gap-3 border-b border-gray-700">
      <div className="flex gap-1.5">
        <div className="w-2 h-2 rounded-full bg-red-500"></div>
        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
        <div className="w-2 h-2 rounded-full bg-green-500"></div>
      </div>
      <div className="flex gap-2 text-[7px] text-gray-400">
        <span>File</span>
        <span>Edit</span>
        <span>View</span>
        <span>Run</span>
      </div>
    </div>

    {/* Main Layout */}
    <div className="flex-1 flex overflow-hidden">
      {/* Sidebar - File Explorer */}
      <div className="w-16 bg-[#252526] border-r border-gray-700 flex flex-col">
        <div className="p-1.5 border-b border-gray-700">
          <div className="w-full h-6 bg-blue-500/20 border border-blue-500/30 rounded flex items-center justify-center">
            <span className="text-[7px] text-blue-300">📁</span>
          </div>
        </div>
        <div className="flex-1 p-1 space-y-1">
          <div className="w-full h-5 bg-gray-700/30 rounded flex items-center justify-center">
            <span className="text-[6px] text-gray-400">📄</span>
          </div>
          <div className="w-full h-5 bg-gray-700/30 rounded flex items-center justify-center">
            <span className="text-[6px] text-gray-400">📄</span>
          </div>
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 flex flex-col">
        {/* Tab Bar */}
        <div className="bg-[#252526] px-2 py-0.5 flex items-center gap-1 border-b border-gray-700">
          <div className="bg-[#1e1e1e] px-2 py-0.5 rounded-t border-t border-l border-r border-gray-700">
            <span className="text-[8px] text-gray-300 font-medium">App.tsx</span>
          </div>
          <div className="px-2 py-0.5">
            <span className="text-[8px] text-gray-500">utils.ts</span>
          </div>
          <div className="px-2 py-0.5">
            <span className="text-[8px] text-gray-500">hooks.ts</span>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <span className="text-[7px] text-gray-500">TypeScript</span>
            <div className="w-3 h-3 bg-green-500/20 rounded flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Editor with Line Numbers */}
        <div className="flex-1 flex overflow-hidden">
          {/* Line Numbers */}
          <div className="bg-[#1e1e1e] text-gray-600 text-[9px] py-2 px-2 font-mono border-r border-gray-800 select-none">
            {Array.from({ length: 30 }, (_, i) => (
              <div key={i} className={i === 14 ? 'text-blue-400' : ''}>{i + 1}</div>
            ))}
          </div>
          
          {/* Code Content */}
          <div className="flex-1 p-2 font-mono text-[10px] leading-relaxed overflow-auto relative">
            {/* Current Line Highlight */}
            <div className="absolute left-0 right-0 h-4 bg-blue-500/10 border-l-2 border-blue-500" style={{ top: '3.5rem' }}></div>
            
            <div className="space-y-1 relative">
              {/* Imports */}
              <div className="mb-1"><span className="text-purple-400">import</span> <span className="text-white">{'{'}</span> <span className="text-blue-400">useState</span><span className="text-white">, </span><span className="text-blue-400">useEffect</span> <span className="text-white">{'}'}</span> <span className="text-purple-400">from</span> <span className="text-orange-400">'react'</span><span className="text-white">;</span></div>
              <div className="mb-1"><span className="text-purple-400">import</span> <span className="text-blue-400">type</span> <span className="text-white">{'{'}</span> <span className="text-blue-400">User</span> <span className="text-white">{'}'}</span> <span className="text-purple-400">from</span> <span className="text-orange-400">'./types'</span><span className="text-white">;</span></div>
              <div className="mb-2"></div>
              
              {/* Component */}
              <div className="mb-1"><span className="text-purple-400">export default function</span> <span className="text-blue-400">App</span><span className="text-white">(): </span><span className="text-blue-400">JSX.Element</span> <span className="text-white">{'{'}</span></div>
              <div className="pl-4 mb-1"><span className="text-green-400">const</span> <span className="text-white">[</span><span className="text-yellow-300">users</span><span className="text-white">, </span><span className="text-yellow-300">setUsers</span><span className="text-white">] = </span><span className="text-blue-400">useState</span><span className="text-white">&lt;</span><span className="text-blue-400">User</span><span className="text-white">[]&gt;([]);</span></div>
              <div className="pl-4 mb-1"><span className="text-green-400">const</span> <span className="text-white">[</span><span className="text-yellow-300">loading</span><span className="text-white">, </span><span className="text-yellow-300">setLoading</span><span className="text-white">] = </span><span className="text-blue-400">useState</span><span className="text-white">&lt;</span><span className="text-blue-400">boolean</span><span className="text-white">&gt;(</span><span className="text-orange-400">true</span><span className="text-white">);</span></div>
              <div className="mb-2"></div>
              
              {/* useEffect */}
              <div className="pl-4 mb-1"><span className="text-blue-400">useEffect</span><span className="text-white">(() =&gt; </span><span className="text-white">{'{'}</span></div>
              <div className="pl-8 mb-1"><span className="text-purple-400">async function</span> <span className="text-blue-400">fetchUsers</span><span className="text-white">() </span><span className="text-white">{'{'}</span></div>
              <div className="pl-12 mb-1"><span className="text-purple-400">try</span> <span className="text-white">{' {'}</span></div>
              <div className="pl-16 mb-1"><span className="text-green-400">const</span> <span className="text-yellow-300">res</span> <span className="text-white">= </span><span className="text-purple-400">await</span> <span className="text-blue-400">fetch</span><span className="text-white">(</span><span className="text-orange-400">'/api/users'</span><span className="text-white">);</span></div>
              <div className="pl-16 mb-1"><span className="text-green-400">const</span> <span className="text-yellow-300">data</span> <span className="text-white">= </span><span className="text-purple-400">await</span> <span className="text-yellow-300">res</span><span className="text-white">.</span><span className="text-blue-400">json</span><span className="text-white">();</span></div>
              <div className="pl-16 mb-1"><span className="text-yellow-300">setUsers</span><span className="text-white">(</span><span className="text-yellow-300">data</span><span className="text-white">);</span></div>
              <div className="pl-12 mb-1"><span className="text-white">{'}'}</span> <span className="text-purple-400">catch</span> <span className="text-white">(</span><span className="text-yellow-300">error</span><span className="text-white">) </span><span className="text-white">{'{'}</span></div>
              <div className="pl-16 mb-1"><span className="text-blue-400">console</span><span className="text-white">.</span><span className="text-yellow-300">error</span><span className="text-white">(</span><span className="text-green-400">'Failed to fetch'</span><span className="text-white">, </span><span className="text-yellow-300">error</span><span className="text-white">);</span></div>
              <div className="pl-12 mb-1"><span className="text-white">{'}'}</span> <span className="text-purple-400">finally</span> <span className="text-white">{' {'}</span></div>
              <div className="pl-16 mb-1"><span className="text-yellow-300">setLoading</span><span className="text-white">(</span><span className="text-orange-400">false</span><span className="text-white">);</span></div>
              <div className="pl-12 mb-1"><span className="text-white">{'}'}</span></div>
              <div className="pl-8 mb-1"><span className="text-white">{'}'}</span></div>
              <div className="pl-8 mb-1"><span className="text-blue-400">fetchUsers</span><span className="text-white">();</span></div>
              <div className="pl-4 mb-1"><span className="text-white">{'}'}</span><span className="text-white">, []);</span></div>
              <div className="mb-2"></div>
              
              {/* Return JSX */}
              <div className="pl-4 mb-1"><span className="text-purple-400">return</span> <span className="text-white">(</span></div>
              <div className="pl-8 mb-1"><span className="text-white">&lt;</span><span className="text-blue-400">div</span> <span className="text-green-400">className</span><span className="text-white">=</span><span className="text-orange-400">"container"</span><span className="text-white">&gt;</span></div>
              <div className="pl-12 mb-1"><span className="text-white">{'{'}</span><span className="text-yellow-300">loading</span> <span className="text-white">? (</span></div>
              <div className="pl-16 mb-1"><span className="text-white">&lt;</span><span className="text-blue-400">div</span><span className="text-white">&gt;Loading...</span><span className="text-white">&lt;/</span><span className="text-blue-400">div</span><span className="text-white">&gt;</span></div>
              <div className="pl-12 mb-1"><span className="text-white">) : (</span></div>
              <div className="pl-16 mb-1"><span className="text-yellow-300">users</span><span className="text-white">.</span><span className="text-blue-400">map</span><span className="text-white">(</span><span className="text-yellow-300">user</span> <span className="text-white">=&gt; (</span></div>
              <div className="pl-20 mb-1"><span className="text-white">&lt;</span><span className="text-blue-400">UserCard</span> <span className="text-green-400">key</span><span className="text-white">=</span><span className="text-white">{'{'}</span><span className="text-yellow-300">user</span><span className="text-white">.</span><span className="text-blue-400">id</span><span className="text-white">{'}'}</span> <span className="text-green-400">user</span><span className="text-white">=</span><span className="text-white">{'{'}</span><span className="text-yellow-300">user</span><span className="text-white">{'}'}</span> <span className="text-white">/&gt;</span></div>
              <div className="pl-16 mb-1"><span className="text-white">))</span></div>
              <div className="pl-12 mb-1"><span className="text-white">{'}'}</span><span className="text-white">)</span><span className="text-white">{'}'}</span></div>
              <div className="pl-8 mb-1"><span className="text-white">&lt;/</span><span className="text-blue-400">div</span><span className="text-white">&gt;</span></div>
              <div className="pl-4 mb-1"><span className="text-white">);</span></div>
              <div className="mb-1"><span className="text-white">{'}'}</span></div>
            </div>
          </div>
        </div>

        {/* Bottom Panel Tabs */}
        <div className="bg-[#252526] border-t border-gray-700">
          <div className="flex items-center gap-1 px-2 py-0.5 border-b border-gray-800">
            <div className="px-2 py-0.5 bg-[#1e1e1e] border-t border-l border-r border-gray-700 rounded-t">
              <span className="text-[7px] text-gray-300">Problems</span>
            </div>
            <div className="px-2 py-0.5">
              <span className="text-[7px] text-gray-500">Terminal</span>
            </div>
            <div className="px-2 py-0.5">
              <span className="text-[7px] text-gray-500">Output</span>
            </div>
            <div className="ml-auto flex items-center gap-1">
              <div className="w-1 h-1 bg-green-400 rounded-full"></div>
              <span className="text-[6px] text-gray-500">0 errors</span>
            </div>
          </div>
          
          {/* Console Output */}
          <div className="bg-[#0d1117] p-2 h-16 overflow-auto">
            <div className="space-y-0.5">
              <div className="text-[8px] text-green-400 font-mono">$ npm run dev</div>
              <div className="text-[8px] text-gray-400 font-mono">✓ Compiled successfully</div>
              <div className="text-[8px] text-gray-400 font-mono">  Ready on http://localhost:3000</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const JSRuntimeVisual: React.FC = () => (
  <div className="w-full h-full bg-[#0d1117] flex flex-col p-3 min-h-full">
    {/* Title */}
    <div className="text-center mb-3">
      <h3 className="text-[11px] font-bold text-white mb-1">Event Loop Visualization</h3>
      <div className="text-[8px] text-gray-400">JavaScript Runtime Internals</div>
    </div>
    
    {/* Event Loop Visualization */}
    <div className="flex-1 flex flex-col justify-center space-y-2">
      {/* Call Stack */}
      <div className="bg-blue-500/20 border border-blue-500/30 rounded p-2">
        <div className="text-[8px] text-blue-300 font-semibold mb-1">Call Stack</div>
        <div className="space-y-0.5">
          <div className="bg-blue-500/30 rounded px-2 py-0.5 text-[7px] text-white">setTimeout()</div>
          <div className="bg-blue-500/30 rounded px-2 py-0.5 text-[7px] text-white ml-2">console.log()</div>
        </div>
      </div>
      
      {/* Web APIs */}
      <div className="bg-purple-500/20 border border-purple-500/30 rounded p-2">
        <div className="text-[8px] text-purple-300 font-semibold mb-1">Web APIs</div>
        <div className="flex gap-1 flex-wrap">
          <div className="bg-purple-500/30 rounded px-2 py-0.5 text-[7px] text-white">Timer</div>
          <div className="bg-purple-500/30 rounded px-2 py-0.5 text-[7px] text-white">Fetch</div>
        </div>
      </div>
      
      {/* Callback Queue */}
      <div className="bg-green-500/20 border border-green-500/30 rounded p-2">
        <div className="text-[8px] text-green-300 font-semibold mb-1">Callback Queue</div>
        <div className="flex gap-1">
          <div className="bg-green-500/30 rounded px-2 py-0.5 text-[7px] text-white">→ callback()</div>
        </div>
      </div>
      
      {/* Event Loop Arrow */}
      <div className="flex justify-center pt-1">
        <div className="text-[9px] text-yellow-400 animate-pulse">⟳ Event Loop</div>
      </div>
    </div>
  </div>
);

const features: Feature[] = [
  {
    title: "Advanced React & RSCs",
    description: "Move beyond `useEffect`. Master Composition, Server Components, and Suspense streaming boundaries.",
    iconPath: "react"
  },
  {
    title: "Frontend Architecture",
    description: "Design-to-code workflows, Micro-frontends, Monorepos, and managing state at scale (Zustand/Jotai).",
    iconPath: "system"
  },
  {
    title: "Interactive Code Playground",
    description: "Run JavaScript code directly in your browser with Monaco Editor. Edit, experiment, and see results instantly.",
    iconPath: "playground"
  },
  {
    title: "JS Runtime Internals",
    description: "V8 engine mechanics, Memory Management, Event Loop phases, and advanced closure patterns.",
    iconPath: "js"
  }
];

const MacBookShowcase: React.FC = () => {
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [transitionDirection, setTransitionDirection] = useState<'forward' | 'backward'>('forward');
  const containerRef = useRef<HTMLDivElement>(null);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const macBookRef = useRef<HTMLDivElement>(null);
  const autoPlayIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Smooth feature transition with direction
  const changeFeature = useCallback((newIndex: number, direction: 'forward' | 'backward' = 'forward') => {
    if (newIndex < 0 || newIndex >= features.length) return;
    setTransitionDirection(direction);
    setActiveFeatureIndex(newIndex);
  }, []);

  // Auto-play mode for presentations
  useEffect(() => {
    if (isAutoPlay && !isHovered) {
      autoPlayIntervalRef.current = setInterval(() => {
        setActiveFeatureIndex((prev) => {
          const next = (prev + 1) % features.length;
          setTransitionDirection('forward');
          return next;
        });
      }, 4000); // Change feature every 4 seconds
    } else {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
        autoPlayIntervalRef.current = null;
      }
    }

    return () => {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
      }
    };
  }, [isAutoPlay, isHovered]);

  // Keyboard navigation for presentations
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        changeFeature((activeFeatureIndex + 1) % features.length, 'forward');
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        changeFeature((activeFeatureIndex - 1 + features.length) % features.length, 'backward');
      } else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        setIsAutoPlay(!isAutoPlay);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [activeFeatureIndex, isAutoPlay, changeFeature]);

  // Mouse tracking for 3D effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!macBookRef.current) return;
      const rect = macBookRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setMousePosition({ x, y });
    };

    if (isHovered) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [isHovered]);

  // Smooth scroll-based feature switching
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || isAutoPlay) return;

      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      
      const containerTop = containerRect.top;
      const containerHeight = containerRect.height;
      
      const scrollProgress = Math.max(0, Math.min(1, 
        (viewportCenter - containerTop) / containerHeight
      ));

      const newIndex = Math.min(
        Math.max(0, Math.floor(scrollProgress * features.length)),
        features.length - 1
      );

      if (newIndex !== activeFeatureIndex) {
        const direction = newIndex > activeFeatureIndex ? 'forward' : 'backward';
        changeFeature(newIndex, direction);
      }
    };

    let ticking = false;
    const optimizedScroll = () => {
      if (!ticking) {
        animationFrameRef.current = window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', optimizedScroll, { passive: true });
    window.addEventListener('resize', optimizedScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', optimizedScroll);
      window.removeEventListener('resize', optimizedScroll);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [activeFeatureIndex, isAutoPlay, changeFeature]);

  const getFeatureIcon = (iconPath: string) => {
    switch (iconPath) {
      case 'js':
        return <CodeIcon className="w-8 h-8" />;
      case 'react':
        return <CpuIcon className="w-8 h-8" />;
      case 'system':
        return <ServerIcon className="w-8 h-8" />;
      case 'playground':
        return <TerminalIcon className="w-8 h-8" />;
      default:
        return <CodeIcon className="w-8 h-8" />;
    }
  };

  // Calculate 3D transform based on mouse position
  const get3DTransform = () => {
    if (!isHovered) return 'perspective(1000px) rotateX(2deg)';
    const rotateX = 2 + mousePosition.y * 8;
    const rotateY = mousePosition.x * 8;
    const translateZ = Math.abs(mousePosition.x) * 20 + Math.abs(mousePosition.y) * 20;
    return `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)`;
  };

  return (
    <section className="w-full py-24 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Enhanced Background decorations with animation */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl translate-y-1/2 translate-x-1/2 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${6 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            <span className="text-sm text-blue-300 font-medium">PREMIUM FEATURES</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient">Features</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-6">
            Experience our product features as you scroll
          </p>
          
          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-2 mb-4">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => changeFeature(index, index > activeFeatureIndex ? 'forward' : 'backward')}
                className={`transition-all duration-300 rounded-full ${
                  index === activeFeatureIndex
                    ? 'w-8 h-2 bg-gradient-to-r from-blue-400 to-purple-400'
                    : 'w-2 h-2 bg-gray-600 hover:bg-gray-500'
                }`}
                aria-label={`Go to feature ${index + 1}`}
              />
            ))}
          </div>

          {/* Auto-play Toggle */}
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
              isAutoPlay
                ? 'bg-green-500/20 border border-green-500/50 text-green-300'
                : 'bg-white/5 border border-white/10 text-gray-400 hover:border-white/20'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${isAutoPlay ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`}></span>
            <span className="text-sm font-medium">
              {isAutoPlay ? 'Auto-play ON' : 'Auto-play OFF'}
            </span>
            <span className="text-xs text-gray-500">(Press Space)</span>
          </button>
        </div>

        <div ref={containerRef} className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
          {/* MacBook Display */}
          <div className="flex-shrink-0 w-full lg:w-1/2 flex justify-center">
            <div 
              ref={macBookRef}
              className="relative w-full max-w-[700px] perspective-1000"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* MacBook Frame with 3D transform */}
              <div 
                className="relative transform-gpu transition-transform duration-300 ease-out"
                style={{ transform: get3DTransform() }}
              >
                {/* Screen Section */}
                <div className="relative mb-2">
                  {/* Screen Lid - Space Gray with enhanced gradient */}
                  <div className="bg-gradient-to-b from-[#2d2d2d] via-[#1d1d1d] to-[#2d2d2d] rounded-t-[20px] p-[6px] shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_40px_rgba(59,130,246,0.3)] border border-[#3a3a3a]/50 relative overflow-hidden">
                    {/* Animated glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-purple-500/0 animate-shimmer pointer-events-none"></div>
                    
                    {/* Notch - More realistic with glow */}
                    <div className="absolute top-[6px] left-1/2 -translate-x-1/2 w-[200px] h-[28px] bg-black rounded-b-[14px] z-20 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.3)]">
                      {/* Camera with subtle glow */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[6px] h-[6px] bg-gray-800 rounded-full border border-gray-700 shadow-[0_0_4px_rgba(59,130,246,0.5)]"></div>
                    </div>
                    
                    {/* Screen Bezel - Thin black bezel */}
                    <div className="bg-black rounded-t-[14px] p-[3px] relative">
                      {/* Screen Display with enhanced effects */}
                      <div className="bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a] rounded-[12px] overflow-hidden aspect-[16/10] relative border border-[#000000] shadow-[inset_0_0_30px_rgba(0,0,0,0.8)]">
                        {/* Screen Glare Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent pointer-events-none"></div>
                        
                        {/* Animated border glow */}
                        <div className={`absolute inset-0 rounded-[12px] pointer-events-none transition-opacity duration-500 ${
                          isHovered ? 'opacity-100' : 'opacity-0'
                        }`}>
                          <div className="absolute inset-0 rounded-[12px] bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-sm"></div>
                        </div>
                        
                        {/* Screen Content - Feature Visuals with smooth transitions */}
                        <div className="absolute inset-0 overflow-hidden">
                          <div 
                            key={`feature-${activeFeatureIndex}-${transitionDirection}`}
                            className="w-full h-full flex items-center justify-center animate-fade-in"
                          >
                            {activeFeatureIndex === 0 && <ReactRSCVisual />}
                            {activeFeatureIndex === 1 && <ArchitectureVisual />}
                            {activeFeatureIndex === 2 && <CodePlaygroundVisual />}
                            {activeFeatureIndex === 3 && <JSRuntimeVisual />}
                          </div>
                        </div>

                        {/* Feature indicator badge */}
                        <div className="absolute top-2 right-2 z-10 px-2 py-1 rounded-md bg-black/80 backdrop-blur-sm border border-white/10">
                          <span className="text-[8px] text-gray-400 font-mono">
                            {activeFeatureIndex + 1} / {features.length}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Base section with enhanced design */}
                <div className="relative mt-1">
                  <div className="bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d] h-3 rounded-b-[8px] shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-[#2a2a2a]/50">
                    {/* Trackpad indicator */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gray-800/50 rounded-full"></div>
                  </div>
                </div>
                
                {/* Overall Reflection Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-transparent pointer-events-none rounded-[20px]"></div>
                
                {/* Enhanced shadow with color */}
                <div className={`absolute -bottom-8 left-1/2 -translate-x-1/2 w-[80%] h-16 rounded-full transition-all duration-500 ${
                  isHovered 
                    ? 'bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 blur-2xl' 
                    : 'bg-black/40 blur-2xl'
                }`}></div>

                {/* Corner glow effects */}
                <div className="absolute -top-2 -left-2 w-4 h-4 bg-blue-500/20 rounded-full blur-md pointer-events-none"></div>
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-purple-500/20 rounded-full blur-md pointer-events-none"></div>
              </div>
            </div>
          </div>

          {/* Feature List */}
          <div className="w-full lg:w-1/2 space-y-6">
            {features.map((feature, index) => {
              const isActive = index === activeFeatureIndex;
              return (
              <div
                key={index}
                ref={(el) => { featureRefs.current[index] = el; }}
                  className={`group relative p-6 rounded-xl border-2 transition-all duration-500 cursor-pointer overflow-hidden ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 border-blue-500/50 shadow-2xl shadow-blue-500/20 scale-105 z-10'
                      : 'bg-white/5 border-white/10 hover:border-white/20 hover:scale-[1.02]'
                  }`}
                  onClick={() => changeFeature(index, index > activeFeatureIndex ? 'forward' : 'backward')}
                  onMouseEnter={() => {
                    if (!isActive && !isAutoPlay) {
                      // Optional: preview on hover
                    }
                  }}
                >
                  {/* Animated background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 transition-all duration-500 ${
                    isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-20'
                  }`}></div>
                  
                  {/* Shimmer effect for active item */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer pointer-events-none"></div>
                  )}

                  <div className="relative flex items-start gap-4">
                    <div className={`relative w-12 h-12 flex items-center justify-center rounded-lg transition-all duration-500 ${
                      isActive
                        ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white scale-110 shadow-lg shadow-blue-500/50'
                        : 'bg-white/10 text-gray-400 group-hover:bg-white/15'
                  }`}>
                    {getFeatureIcon(feature.iconPath)}
                      {/* Pulse ring for active icon */}
                      {isActive && (
                        <div className="absolute inset-0 rounded-lg bg-blue-400/30 animate-ping"></div>
                      )}
                  </div>
                  <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className={`text-xl font-bold transition-all duration-300 ${
                          isActive 
                            ? 'text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent' 
                            : 'text-gray-300'
                    }`}>
                      {feature.title}
                    </h3>
                        {isActive && (
                          <span className="px-2 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/30 text-[10px] text-blue-300 font-medium">
                            ACTIVE
                          </span>
                        )}
                      </div>
                      <p className={`text-sm leading-relaxed transition-all duration-300 ${
                        isActive ? 'text-gray-200' : 'text-gray-400'
                    }`}>
                      {feature.description}
                    </p>
                      
                      {/* Progress bar for active feature */}
                      {isActive && (
                        <div className="mt-3 h-1 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-shimmer"></div>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      {isActive && (
                        <>
                          <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shadow-lg shadow-blue-400/50"></div>
                          <div className="text-[10px] text-blue-400 font-mono font-bold">
                            {String(index + 1).padStart(2, '0')}
                          </div>
                        </>
                      )}
                      {!isActive && (
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-gray-500 transition-colors"></div>
                      )}
                    </div>
                  </div>

                  {/* Corner accent */}
                  {isActive && (
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-500/20 to-transparent rounded-bl-full pointer-events-none"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MacBookShowcase;

