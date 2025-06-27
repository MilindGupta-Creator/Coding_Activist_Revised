"use client";

import React, { useState } from 'react';
import { learningPaths } from './data/learningPaths';
import { PathCard } from './components/PathCard';
import { PathSwitcher } from './components/PathSwitcher';
import { Compass, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

function App() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const router = useRouter();
  
  const filteredPaths = learningPaths
    .filter(path => activeCategory === 'all' || path.category === activeCategory)
    .filter(path => 
      searchQuery === '' || 
      path.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      path.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (path.tools && path.tools.some(tool => tool.toLowerCase().includes(searchQuery.toLowerCase())))
    );

  return (
    <div className="min-h-screen pt-12 bg-gradient-to-br from-gray-50 via-gray-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-5 rounded-3xl shadow-lg transform hover:scale-105 transition-transform duration-300">
              <Compass className="w-14 h-14 text-white" />
            </div>
          </div>
          <h1 className="h-24 text-4xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
            Technology Learning Paths
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
            Choose your path and start your journey in technology. Each path is carefully curated with the best resources and a clear progression.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-xl mx-auto mb-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Search paths, technologies, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 pl-12 text-gray-700 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="relative mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/30 to-transparent" />
          <PathSwitcher 
            activeCategory={activeCategory} 
            onCategoryChange={setActiveCategory}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative max-w-5xl mx-auto">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-transparent blur-3xl -z-10" />
          {filteredPaths.map((path) => (
            <PathCard
              key={path.id}
              path={path}
              onClick={() => router.push(`/visualizing_paths/${path.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;