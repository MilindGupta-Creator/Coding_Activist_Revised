"use client";

import React, { useState } from 'react';
import { learningPaths } from './data/learningPaths';
import { PathCard } from './components/PathCard';
import { PathDetail } from './components/PathDetail';
import { PathSwitcher } from './components/PathSwitcher';
import { Compass } from 'lucide-react';

function App() {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  const currentPath = learningPaths.find(path => path.id === selectedPath);

  const filteredPaths = activeCategory === 'all' 
    ? learningPaths
    : learningPaths.filter(path => path.category === activeCategory);

  return (
    <div className="min-h-screen pt-12 bg-gradient-to-br from-gray-50 via-gray-50 to-blue-50">
      {!selectedPath ? (
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-5 rounded-3xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                <Compass className="w-14 h-14 text-white" />
              </div>
            </div>
            <h1 className="h-24 text-4xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
              Technology Learning Paths
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Choose your path and start your journey in technology. Each path is carefully curated with the best resources and a clear progression.
            </p>
          </div>

          <div className="relative mb-16">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/30 to-transparent" />
            <PathSwitcher 
              activeCategory={activeCategory} 
              onCategoryChange={setActiveCategory}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-transparent blur-3xl -z-10" />
            {filteredPaths.map((path) => (
              <PathCard
                key={path.id}
                path={path}
                onClick={() => setSelectedPath(path.id)}
              />
            ))}
          </div>
        </div>
      ) : (
        currentPath && (
          <PathDetail
            path={currentPath}
            onBack={() => setSelectedPath(null)}
          />
        )
      )}
    </div>
  );
}

export default App;