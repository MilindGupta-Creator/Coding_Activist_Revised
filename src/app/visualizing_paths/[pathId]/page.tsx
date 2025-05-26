"use client";

import { useParams, useRouter } from 'next/navigation';
import { learningPaths } from '../data/learningPaths';
import { PathDetail } from '../components/PathDetail';

export default function PathPage() {
  const params = useParams();
  const router = useRouter();
  const pathId = params.pathId as string;
  
  const currentPath = learningPaths.find(path => path.id === pathId);

  if (!currentPath) {
    return (
      <div className="min-h-screen pt-12 bg-gradient-to-br from-gray-50 via-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Path not found</h1>
          <button
            onClick={() => router.push('/visualizing_paths')}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-300"
          >
            Back to Paths
          </button>
        </div>
      </div>
    );
  }

  return (
    <PathDetail
      path={currentPath}
      onBack={() => router.push('/visualizing_paths')}
    />
  );
} 