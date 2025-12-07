"use client";

import React, { useState } from 'react';
import { learningPaths } from './data/learningPaths';
import { PathCard } from './components/PathCard';
import { PathSwitcher } from './components/PathSwitcher';
import { Compass, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import dynamic from "next/dynamic";

const LearningPathNetwork = dynamic(
  () => import("@/components/three/LearningPathNetwork").then((m) => ({ default: m.LearningPathNetwork })),
  { ssr: false, loading: () => <div className="w-full h-[400px] rounded-2xl border border-slate-700/60 bg-slate-900/60 flex items-center justify-center text-gray-400">Loading network...</div> }
);

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

        {/* Technology Network Visualization */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
              Technology <span className="text-blue-600">Ecosystem</span>
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Explore how technologies connect and relate to each other. Click on any technology to see its connections.
            </p>
          </div>
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl shadow-2xl p-4 border-2 border-blue-500/20 overflow-hidden">
            <LearningPathNetwork 
              technologies={[
                {
                  id: "react",
                  name: "React",
                  category: "Frontend",
                  color: "#61dafb",
                  connections: ["nextjs", "typescript", "nodejs"],
                },
                {
                  id: "nextjs",
                  name: "Next.js",
                  category: "Frontend",
                  color: "#ffffff",
                  connections: ["react", "typescript", "nodejs"],
                },
                {
                  id: "typescript",
                  name: "TypeScript",
                  category: "Language",
                  color: "#3178c6",
                  connections: ["react", "nextjs", "nodejs"],
                },
                {
                  id: "nodejs",
                  name: "Node.js",
                  category: "Backend",
                  color: "#339933",
                  connections: ["react", "nextjs", "typescript", "mongodb", "postgresql"],
                },
                {
                  id: "mongodb",
                  name: "MongoDB",
                  category: "Database",
                  color: "#47a248",
                  connections: ["nodejs", "postgresql"],
                },
                {
                  id: "postgresql",
                  name: "PostgreSQL",
                  category: "Database",
                  color: "#336791",
                  connections: ["nodejs", "mongodb"],
                },
                {
                  id: "docker",
                  name: "Docker",
                  category: "DevOps",
                  color: "#2496ed",
                  connections: ["kubernetes", "aws"],
                },
                {
                  id: "kubernetes",
                  name: "Kubernetes",
                  category: "DevOps",
                  color: "#326ce5",
                  connections: ["docker", "aws"],
                },
                {
                  id: "aws",
                  name: "AWS",
                  category: "Cloud",
                  color: "#ff9900",
                  connections: ["docker", "kubernetes"],
                },
              ]}
              onTechClick={(tech) => {
                // Navigate to a path that includes this technology
                const relatedPath = learningPaths.find(path => 
                  path.tools?.some(tool => tool.toLowerCase().includes(tech.name.toLowerCase()))
                );
                if (relatedPath) {
                  router.push(`/visualizing_paths/${relatedPath.id}`);
                }
              }}
            />
          </div>
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