import React, { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { ebookContent, studyPlans, StudyPlan, ChapterContent } from '../ebookContent';
import Logo from "../../../../public/assets/main-logo.png";

// Icons for study plans
const CalendarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const FireIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
  </svg>
);

const RocketIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
  </svg>
);

interface ReaderSidebarProps {
  isSidebarOpen: boolean;
  activeModule: string;
  expandedModules: Set<string>;
  activePlan: StudyPlan | null;
  currentDay: number;
  overallProgress: number;
  showTodayPanel: boolean;
  isPlanDropdownOpen: boolean;
  userEmail: string;
  onToggleSidebar: () => void;
  onToggleModuleExpansion: (moduleId: string) => void;
  onGoToModule: (moduleId: string) => void;
  onSelectPlan: (plan: StudyPlan) => void;
  onClearPlan: () => void;
  onToggleTodayPanel: () => void;
  onLogout: () => void;
}

const ReaderSidebar: React.FC<ReaderSidebarProps> = ({
  isSidebarOpen,
  activeModule,
  expandedModules,
  activePlan,
  currentDay,
  overallProgress,
  showTodayPanel,
  isPlanDropdownOpen,
  userEmail,
  onToggleSidebar,
  onToggleModuleExpansion,
  onGoToModule,
  onSelectPlan,
  onClearPlan,
  onToggleTodayPanel,
  onLogout,
}) => {
  const [localPlanDropdownOpen, setLocalPlanDropdownOpen] = useState(isPlanDropdownOpen);

  const handleSelectPlan = (plan: StudyPlan) => {
    onSelectPlan(plan);
    setLocalPlanDropdownOpen(false);
  };

  const togglePlanDropdown = () => {
    setLocalPlanDropdownOpen(!localPlanDropdownOpen);
  };

  return (
    <aside className={`
      fixed md:relative z-30 w-full md:w-80 h-[calc(100%-60px)] md:h-full bg-slate-900 border-r border-slate-800 flex flex-col transition-transform duration-300
      ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
    `}>
      <div className="p-6 border-b border-slate-800 hidden md:block">
         <div className="flex items-center gap-2 mb-4">
           <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
           <span className="text-xs font-mono text-green-500 uppercase">Secure Connection</span>
         </div>
         <Link href="/" className="flex items-center gap-3 group hover:opacity-80 transition-opacity">
           <div className="relative">
             <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
             <Image
               src={Logo}
               alt="Coding Activist Logo"
               width={40}
               height={40}
               className="relative bg-white rounded-full transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-500/50"
               loading="lazy"
             />
           </div>
           <span className="text-sm font-bold text-white group-hover:text-gray-200 transition-colors">Coding Activist</span>
         </Link>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-1">
        {/* ==================== STUDY PLAN SELECTOR ==================== */}
        <div className="mb-4">
          <div className="relative">
            <button
              onClick={togglePlanDropdown}
              className={`w-full flex items-center justify-between gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 border ${
                activePlan 
                  ? 'bg-gradient-to-r from-brand-500/20 to-purple-500/20 border-brand-500/30 text-brand-300' 
                  : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" />
                <span className="truncate">
                  {activePlan ? activePlan.name : 'Choose Study Plan'}
                </span>
              </div>
              <ChevronDownIcon className={`w-4 h-4 transition-transform ${localPlanDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown */}
            {localPlanDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-20 overflow-hidden">
                {studyPlans.map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => handleSelectPlan(plan)}
                    className={`w-full text-left px-4 py-3 hover:bg-slate-700 transition-colors border-b border-slate-700 last:border-b-0 ${
                      activePlan?.id === plan.id ? 'bg-slate-700' : ''
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {plan.difficulty === 'Advanced' ? (
                        <RocketIcon className="w-4 h-4 text-purple-400" />
                      ) : (
                        <FireIcon className="w-4 h-4 text-orange-400" />
                      )}
                      <span className="font-medium text-white text-sm">{plan.name}</span>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-2">{plan.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-600 text-slate-300">{plan.totalDays} days</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-600 text-slate-300">{plan.targetRole}</span>
                    </div>
                  </button>
                ))}
                {activePlan && (
                  <button
                    onClick={onClearPlan}
                    className="w-full text-left px-4 py-3 hover:bg-red-900/20 transition-colors text-red-400 text-sm"
                  >
                    ✕ Clear Active Plan
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Active Plan Progress */}
          {activePlan && (
            <div className="mt-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400">Overall Progress</span>
                <span className="text-xs font-bold text-brand-400">{overallProgress}%</span>
              </div>
              <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-brand-500 to-purple-500 transition-all duration-500"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-[10px] text-slate-500">Day {currentDay} of {activePlan.totalDays}</span>
                <button
                  onClick={onToggleTodayPanel}
                  className="text-[10px] text-brand-400 hover:text-brand-300 font-medium"
                >
                  {showTodayPanel ? 'Hide' : 'Show'} Today's Tasks
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-2 mt-4">Modules</div>
        {ebookContent.map((chapter) => {
          const isExpanded = expandedModules.has(chapter.id);
          const hasSubmodules = chapter.submodules && chapter.submodules.length > 0;
          
          return (
            <div key={chapter.id} className="mb-1">
              <button
                onClick={() => {
                  if (hasSubmodules) {
                    onToggleModuleExpansion(chapter.id);
                  } else {
                    onGoToModule(chapter.id);
                  }
                }}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 border border-transparent flex items-center justify-between ${
                  !hasSubmodules && activeModule === chapter.id && !showTodayPanel
                    ? 'bg-brand-500/10 text-brand-400 border-brand-500/20'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span>{chapter.title}</span>
                {hasSubmodules && (
                  <ChevronDownIcon 
                    className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
                  />
                )}
              </button>
              {hasSubmodules && isExpanded && (
                <div className="ml-4 mt-1 space-y-1 border-l border-slate-700 pl-2">
                  {chapter.submodules?.map((submodule) => (
                    <button
                      key={submodule.id}
                      onClick={() => onGoToModule(submodule.id)}
                      className={`w-full text-left px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 border border-transparent ${
                        activeModule === submodule.id && !showTodayPanel
                          ? 'bg-brand-500/10 text-brand-400 border-brand-500/20'
                          : 'text-slate-500 hover:bg-slate-800 hover:text-slate-300'
                      }`}
                    >
                      {submodule.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="p-4 border-t border-slate-800">
         <div className="bg-slate-800/50 rounded-lg p-3 mb-4">
            <div className="text-[10px] text-slate-500 uppercase mb-1">License Holder</div>
            <div className="text-xs text-white font-mono">{userEmail}</div>
            </div>
         <button 
           onClick={onLogout}
           className="w-full py-2 border border-slate-700 rounded-lg text-slate-400 text-sm hover:bg-slate-800 hover:text-white transition-colors"
         >
           Log Out
         </button>
      </div>
    </aside>
  );
};

export default ReaderSidebar;

