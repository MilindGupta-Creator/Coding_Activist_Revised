import React from "react";
import type { LearningPath } from "../data/learningPaths";
import { ArrowRight } from "lucide-react";

interface PathCardProps {
  path: LearningPath;
  onClick: () => void;
}

export function PathCard({ path, onClick }: PathCardProps) {
  const Icon = path.icon;

  return (
    <div
      onClick={onClick}
      className="group bg-white/80 rounded-2xl shadow-lg hover:shadow-2xl p-8 cursor-pointer transform transition-all duration-500 hover:scale-[1.02] border border-gray-100/50 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0  transition-opacity duration-500" />

      <div className="relative">
        <div className="flex justify-between items-start mb-6">
          <div
            className={`${path.color} bg-gradient-to-br from-current to-current/80 w-16 h-16 rounded-2xl flex items-center justify-center transform transition-transform duration-500 group-hover:rotate-3`}
          >
            <Icon className="w-8 h-8 text-white" />
          </div>
          <span className="text-sm font-medium px-4 py-1.5 rounded-full bg-gray-100/80 backdrop-blur-sm text-gray-600 transform transition-transform duration-500 group-hover:-rotate-3">
            {path.steps.length} steps
          </span>
        </div>

        <h3 className="text-2xl font-bold mb-3 text-gray-900">{path.title}</h3>
        <p className="text-gray-600 mb-6 line-clamp-2">{path.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span
              className={`px-4 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm ${
                path.steps[path.steps.length - 1].skillLevel === "beginner"
                  ? "bg-green-100/80 text-green-800"
                  : path.steps[path.steps.length - 1].skillLevel ===
                    "intermediate"
                  ? "bg-yellow-100/80 text-yellow-800"
                  : "bg-red-100/80 text-red-800"
              }`}
            >
              {path.steps[path.steps.length - 1].skillLevel}
            </span>
            <span className="text-sm text-gray-500 bg-gray-100/50 px-3 py-1.5 rounded-full backdrop-blur-sm">
              {path.totalDuration}
            </span>
          </div>

          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gray-100/80 backdrop-blur-sm group-hover:bg-blue-600 transition-all duration-500 transform group-hover:rotate-12">
            <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-500" />
          </div>
        </div>

        {path.salary && (
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Expected Salary</span>
              <span className="font-medium text-gray-900">
                {path.salary.currency} {path.salary.min} - {path.salary.max}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
