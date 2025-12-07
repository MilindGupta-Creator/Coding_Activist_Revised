"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface UnderConstructionProps {
  onBack?: () => void;
}

const UnderConstruction: React.FC<UnderConstructionProps> = ({ onBack }) => {
  const router = useRouter();
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev.length >= 3) return '';
        return prev + '.';
      });
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleGoBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.push('/product');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="max-w-2xl mx-auto text-center relative z-10">
        {/* Main Icon/Illustration */}
        <div className="mb-8 relative">
          <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-sm border border-purple-500/30 animate-pulse">
            <svg
              className="w-16 h-16 text-purple-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
              />
            </svg>
          </div>
          {/* Floating particles */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
          </div>
          <div className="absolute top-1/4 right-0 w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce delay-300"></div>
          <div className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-brand-400 rounded-full animate-bounce delay-700"></div>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
          Something Amazing
          <br />
          <span className="text-white">is Coming Soon{dots}</span>
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-slate-300 mb-4 font-medium">
          We're building something extraordinary for you
        </p>
        <p className="text-lg text-slate-400 mb-12 max-w-lg mx-auto">
          Our team is working hard to bring you an incredible experience. 
          Stay tuned for updates and be among the first to know when we launch!
        </p>

        {/* Features Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-2">Lightning Fast</h3>
            <p className="text-slate-400 text-sm">Optimized for speed and performance</p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-2">Secure & Reliable</h3>
            <p className="text-slate-400 text-sm">Built with security in mind</p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-brand-500/50 transition-all duration-300">
            <div className="w-12 h-12 bg-brand-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg className="w-6 h-6 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-2">User-Centric</h3>
            <p className="text-slate-400 text-sm">Designed with you in mind</p>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={handleGoBack}
          className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
        >
          <svg
            className="w-5 h-5 transition-transform group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span>Go Back</span>
        </button>

        {/* Progress Indicator */}
        <div className="mt-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-200"></div>
            <div className="w-2 h-2 bg-brand-400 rounded-full animate-pulse delay-400"></div>
          </div>
          <p className="text-sm text-slate-500">We're working on it...</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
        .delay-700 {
          animation-delay: 0.7s;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
        .delay-2000 {
          animation-delay: 2s;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  );
};

export default UnderConstruction;

