import React from 'react';
import { Code2, Brain, Server,Palette } from 'lucide-react';

interface PathSwitcherProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

interface Category {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export function PathSwitcher({ activeCategory, onCategoryChange }: PathSwitcherProps) {
  const categories: Category[] = [
    { id: 'all', label: 'All Paths', icon: <Code2 className="w-5 h-5" /> },
    { id: 'development', label: 'Development', icon: <Code2 className="w-5 h-5" /> },
    { id: 'data', label: 'Data & AI', icon: <Brain className="w-5 h-5" /> },
    { id: 'infrastructure', label: 'Infrastructure', icon: <Server className="w-5 h-5" /> },
    {id:'design',label:"Design",icon:<Palette className='w-5 h-5'/>},
  ];

  return (
    <div className="flex justify-center">
      <div className="overflow-x-auto inline-flex p-2 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100/50">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`
              flex items-center px-8 py-3 rounded-xl font-medium transition-all duration-300
              ${activeCategory === category.id 
                ? '  bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg scale-105' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50/80'
              }
            `}
          >
            <span className="mr-2.5">{category.icon}</span>
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
}