import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Wifi, Database, Server, MessageSquare, Play } from 'lucide-react';
import { ebookContent, StudyPlan, DayPlan, ChapterContent } from '../ebookContent';
import { LockIcon, TerminalIcon } from '../Icons';
import ExamQuiz from '../ExamQuiz';
import FrequencyHeatmap from '../FrequencyHeatmap';
import EventLoopSimulator from '../EventLoopSimulator';
import WhatsAppSystemDesignLab from '../WhatsAppSystemDesignLab';

const CheckCircleIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const CalendarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

interface ReaderContentAreaProps {
  contentRef: React.RefObject<HTMLElement>;
  activeModule: string;
  activeContent: ChapterContent | null;
  prevModule: ChapterContent | null;
  nextModule: ChapterContent | null;
  isFocusMode: boolean;
  isQuizMode: boolean;
  isExamMode: boolean;
  revealedAnswers: Record<string, boolean>;
  showTopicHeatmap: boolean;
  showEventLoopLab: boolean;
  showWhatsAppLab: boolean;
  isTimedQuizActive: boolean;
  quizQuestionIndices: number[];
  activePlan: StudyPlan | null;
  todayPlan: DayPlan | undefined;
  currentDay: number;
  completedTasks: Set<string>;
  todayStats: { total: number; completed: number };
  findContentById: (id: string) => ChapterContent | null;
  goToModule: (moduleId: string) => void;
  toggleAnswerReveal: (key: string) => void;
  navigateToQuestion: (moduleId: string, questionIndex: number) => void;
  toggleTaskCompletion: (taskKey: string) => void;
  goToNextDay: () => void;
  goToPreviousDay: () => void;
  savePlanProgress: (plan: StudyPlan | null, day: number, completed: Set<string>) => void;
  setShowTodayPanel: (show: boolean) => void;
  setIsExamMode: (mode: boolean) => void;
  setIsQuizMode: (mode: boolean) => void;
  setIsFocusMode: (mode: boolean) => void;
  setShowTopicHeatmap: (show: boolean) => void;
  setShowEventLoopLab: (show: boolean) => void;
  setShowWhatsAppLab: (show: boolean) => void;
  setCurrentDay: (day: number) => void;
}

const ReaderContentArea: React.FC<ReaderContentAreaProps> = ({
  contentRef,
  activeModule,
  activeContent,
  prevModule,
  nextModule,
  isFocusMode,
  isQuizMode,
  isExamMode,
  revealedAnswers,
  showTopicHeatmap,
  showEventLoopLab,
  showWhatsAppLab,
  isTimedQuizActive,
  quizQuestionIndices,
  activePlan,
  todayPlan,
  currentDay,
  completedTasks,
  todayStats,
  findContentById,
  goToModule,
  toggleAnswerReveal,
  navigateToQuestion,
  toggleTaskCompletion,
  goToNextDay,
  goToPreviousDay,
  savePlanProgress,
  setShowTodayPanel,
  setIsExamMode,
  setIsQuizMode,
  setIsFocusMode,
  setShowTopicHeatmap,
  setShowEventLoopLab,
  setShowWhatsAppLab,
  setCurrentDay,
}) => {
  return (
    <main ref={contentRef} className="flex-1 h-full overflow-y-auto bg-slate-950 relative scroll-smooth">
      <div
        className={`mx-auto px-6 py-12 md:py-20 transition-all duration-300 ${
          isFocusMode ? 'max-w-2xl md:px-0' : 'max-w-4xl'
        }`}
      >
        {/* Top toolbar */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-slate-600">
            Reading Mode
          </span>
          <div className="flex items-center gap-2 flex-wrap justify-end">
            {!isExamMode && (
              <>
                {/* Practice quiz toggle (hide/show answers) */}
                <button
                  onClick={() => setIsQuizMode(!isQuizMode)}
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-medium transition-colors ${
                    isQuizMode
                      ? 'border-amber-500/70 bg-amber-500/10 text-amber-200 hover:bg-amber-500/20'
                      : 'border-slate-700 bg-slate-900/70 text-slate-300 hover:border-amber-500 hover:text-amber-300 hover:bg-slate-900'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full shadow-[0_0_6px_rgba(245,158,11,0.8)] ${
                      isQuizMode ? 'bg-amber-400' : 'bg-slate-500'
                    }`}
                  />
                  {isQuizMode ? 'Quiz Mode: On' : 'Quiz Mode: Off'}
                </button>

                {/* Topic Heat Map toggle – only meaningful on first module */}
                {activeModule === ebookContent[0].id && (
                  <button
                    onClick={() => setShowTopicHeatmap(!showTopicHeatmap)}
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-medium transition-colors ${
                      showTopicHeatmap
                        ? 'border-sky-500/70 bg-sky-500/10 text-sky-200 hover:bg-sky-500/20'
                        : 'border-slate-700 bg-slate-900/70 text-slate-300 hover:border-sky-500 hover:text-sky-300 hover:bg-slate-900'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full shadow-[0_0_6px_rgba(56,189,248,0.8)] ${
                        showTopicHeatmap ? 'bg-sky-400' : 'bg-slate-500'
                      }`}
                    />
                    {showTopicHeatmap ? 'Topics Heatmap: On' : 'Topics Heatmap'}
                  </button>
                )}

                <button
                  onClick={() => setShowEventLoopLab(!showEventLoopLab)}
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-medium transition-colors ${
                    showEventLoopLab
                      ? 'border-emerald-500/70 bg-emerald-500/10 text-emerald-200 hover:bg-emerald-500/20'
                      : 'border-slate-700 bg-slate-900/70 text-slate-300 hover:border-emerald-500 hover:text-emerald-300 hover:bg-slate-900'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full shadow-[0_0_6px_rgba(52,211,153,0.8)] ${
                      showEventLoopLab ? 'bg-emerald-400' : 'bg-slate-500'
                    }`}
                  />
                  {showEventLoopLab ? 'Event Loop Lab: On' : 'Event Loop Lab'}
                </button>
              </>
            )}

            {/* Exam Mode toggle */}
            <button
              onClick={() => {
                setShowTodayPanel(false);
                setIsExamMode(!isExamMode);
                setIsQuizMode(false);
              }}
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-medium transition-colors ${
                isExamMode
                  ? 'border-emerald-500/70 bg-emerald-500/10 text-emerald-200 hover:bg-emerald-500/20'
                  : 'border-slate-700 bg-slate-900/70 text-slate-300 hover:border-emerald-500 hover:text-emerald-300 hover:bg-slate-900'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full shadow-[0_0_6px_rgba(16,185,129,0.8)] ${
                  isExamMode ? 'bg-emerald-400' : 'bg-slate-500'
                }`}
              />
              {isExamMode ? 'Exam Mode: On' : 'Exam Mode'}
            </button>

            <button
              onClick={() => setIsFocusMode(!isFocusMode)}
              className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1.5 text-[11px] font-medium text-slate-300 hover:border-brand-500 hover:text-brand-300 hover:bg-slate-900 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
              {isFocusMode ? 'Exit Focus Mode' : 'Enter Focus Mode'}
            </button>
          </div>
        </div>
        
        {/* ==================== TODAY'S TASKS PANEL / EXAM MODE ==================== */}
        {isExamMode ? (
          <ExamQuiz
            activeModuleId={activeModule}
            onExit={() => setIsExamMode(false)}
          />
        ) : todayPlan && activePlan ? (
          <div className="animate-fade-in">
            {/* Header */}
            <div className="mb-8 pb-6 border-b border-slate-800">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-500 to-purple-500 flex items-center justify-center">
                  <CalendarIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-brand-500 font-mono text-xs tracking-widest uppercase block">
                    {activePlan.name} • Day {currentDay}
                  </span>
                  <h2 className="text-2xl md:text-4xl font-bold text-white">{todayPlan.title}</h2>
                </div>
              </div>

              {/* Day Navigation */}
              <div className="flex items-center gap-4 mt-4">
                <button
                  onClick={goToPreviousDay}
                  disabled={currentDay === 1}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-700 transition-colors"
                >
                  ← Previous Day
                </button>
                <div className="flex-1 flex items-center gap-2">
                  {Array.from({ length: Math.min(activePlan.totalDays, 10) }).map((_, i) => {
                    const dayNum = currentDay <= 5 ? i + 1 : currentDay - 5 + i + 1;
                    if (dayNum > activePlan.totalDays) return null;
                    return (
                      <button
                        key={dayNum}
                        onClick={() => {
                          setCurrentDay(dayNum);
                          savePlanProgress(activePlan, dayNum, completedTasks);
                        }}
                        className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${
                          dayNum === currentDay
                            ? 'bg-brand-500 text-white'
                            : dayNum < currentDay
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                        }`}
                      >
                        {dayNum}
                      </button>
                    );
                  })}
                  {activePlan.totalDays > 10 && (
                    <span className="text-slate-500 text-xs">...</span>
                  )}
                </div>
                <button
                  onClick={goToNextDay}
                  disabled={currentDay === activePlan.totalDays}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-700 transition-colors"
                >
                  Next Day →
                </button>
              </div>
            </div>

            {/* Daily Tip */}
            {todayPlan.tip && (
              <div className="mb-8 p-4 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">💡</span>
                  <div>
                    <span className="text-amber-400 font-semibold text-sm uppercase tracking-wide">Pro Tip</span>
                    <p className="text-amber-100/80 text-sm mt-1">{todayPlan.tip}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Progress Summary */}
            <div className="mb-8 p-4 rounded-xl bg-slate-800/50 border border-slate-700">
              <div className="flex items-center justify-between mb-3">
                <span className="text-slate-300 font-medium">Today's Progress</span>
                <span className="text-brand-400 font-bold">{todayStats.completed} / {todayStats.total} tasks</span>
              </div>
              <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-500"
                  style={{ width: todayStats.total > 0 ? `${(todayStats.completed / todayStats.total) * 100}%` : '0%' }}
                />
              </div>
              {todayStats.completed === todayStats.total && todayStats.total > 0 && (
                <div className="mt-3 flex items-center gap-2 text-green-400">
                  <CheckCircleIcon className="w-5 h-5" />
                  <span className="text-sm font-medium">Day complete! Great work! 🎉</span>
                </div>
              )}
            </div>

            {/* Task List */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">Today's Tasks</h3>
              {todayPlan.tasks.map((task, taskIdx) => {
                const module = findContentById(task.moduleId);
                if (!module || !module.items) return null;

                return (
                  <div key={taskIdx} className="bg-slate-800/30 rounded-xl border border-slate-700 overflow-hidden">
                    <div className="px-4 py-3 bg-slate-800/50 border-b border-slate-700">
                      <span className="text-slate-300 font-medium text-sm">{module.title}</span>
                    </div>
                    <div className="p-2">
                      {task.questionIndices.map((qIdx) => {
                        const question = module.items![qIdx];
                        if (!question) return null;
                        const taskKey = `${currentDay}-${task.moduleId}-${qIdx}`;
                        const isCompleted = completedTasks.has(taskKey);
                        const questionText = question.q.replace(/^Q\d+\.\s*/i, '');

                        return (
                          <div
                            key={qIdx}
                            className={`flex items-start gap-3 p-3 rounded-lg transition-all ${
                              isCompleted ? 'bg-green-500/10' : 'hover:bg-slate-800/50'
                            }`}
                          >
                            <button
                              onClick={() => toggleTaskCompletion(taskKey)}
                              className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                                isCompleted
                                  ? 'bg-green-500 border-green-500 text-white'
                                  : 'border-slate-600 hover:border-brand-400'
                              }`}
                            >
                              {isCompleted && (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </button>
                            <div className="flex-1 min-w-0">
                              <button
                                onClick={() => navigateToQuestion(task.moduleId, qIdx)}
                                className={`text-left text-sm font-medium transition-colors ${
                                  isCompleted ? 'text-slate-500 line-through' : 'text-slate-200 hover:text-brand-400'
                                }`}
                              >
                                Q{qIdx + 1}. {questionText}
                              </button>
                              {question.tags && question.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {question.tags.slice(0, 3).map(tag => (
                                    <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded bg-slate-700 text-slate-400">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                            <button
                              onClick={() => navigateToQuestion(task.moduleId, qIdx)}
                              className="flex-shrink-0 text-xs text-brand-400 hover:text-brand-300 font-medium"
                            >
                              Study →
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Day Complete Action */}
            {todayStats.completed === todayStats.total && todayStats.total > 0 && currentDay < activePlan.totalDays && (
              <div className="mt-8 text-center">
                <button
                  onClick={goToNextDay}
                  className="px-8 py-3 bg-gradient-to-r from-brand-500 to-purple-500 text-white font-bold rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-brand-500/25"
                >
                  Continue to Day {currentDay + 1} →
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Chapter Header */}
            <div className="mb-12 border-b border-slate-800 pb-8">
              <span className="text-brand-500 font-mono text-sm tracking-widest uppercase mb-2 block">Current Module</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white">{activeContent?.title}</h2>

              {/* Frontend topic heat map – only for first module + when toggle is ON */}
              {activeContent &&
                activeContent.id === ebookContent[0].id &&
                showTopicHeatmap && (
                  <FrequencyHeatmap />
              )}

              {/* Event Loop simulator for async topics */}
              {activeContent &&
                showEventLoopLab && (
                  <EventLoopSimulator  />
              )}

              {/* WhatsApp System Design Lab - Prominent Banner */}
              {activeContent &&
                activeContent.id === 'system-design-whatsapp' && (
                  <div className="mt-8">
                    {!showWhatsAppLab ? (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative overflow-hidden rounded-2xl border-2 border-cyan-500/50 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 p-6 shadow-2xl shadow-cyan-500/20"
                      >
                        {/* Animated background pattern */}
                        <div className="absolute inset-0 opacity-10 overflow-hidden">
                          <motion.div
                            className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(6,182,212,0.1)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]"
                            animate={{
                              x: [0, 20, 0],
                              y: [0, 20, 0],
                            }}
                            transition={{
                              duration: 20,
                              repeat: Infinity,
                              ease: "linear"
                            }}
                          ></motion.div>
                        </div>
                        
                        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="relative">
                                <div className="absolute inset-0 bg-cyan-400 rounded-full blur-xl opacity-50 animate-pulse"></div>
                                <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                                  <MessageSquare className="w-6 h-6 text-white" />
                                </div>
                              </div>
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="text-xl font-bold text-white">Interactive System Design Lab</h3>
                                  <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-[10px] font-bold uppercase tracking-wider">
                                    NEW
                                  </span>
                                </div>
                                <p className="text-sm text-slate-300">
                                  Experience real-time messaging architecture with hands-on simulations. Explore WebSocket flows, offline queues, and system architecture interactively.
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 mt-4">
                              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/50 border border-slate-700">
                                <Wifi className="w-4 h-4 text-green-400" />
                                <span className="text-xs text-slate-300">WebSocket Simulation</span>
                              </div>
                              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/50 border border-slate-700">
                                <Database className="w-4 h-4 text-amber-400" />
                                <span className="text-xs text-slate-300">Offline Queue</span>
                              </div>
                              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/50 border border-slate-700">
                                <Server className="w-4 h-4 text-purple-400" />
                                <span className="text-xs text-slate-300">Architecture Explorer</span>
                              </div>
                            </div>
                          </div>
                          
                          <button
                            onClick={() => setShowWhatsAppLab(true)}
                            className="group relative px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold text-sm hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70 hover:scale-105 flex items-center gap-2"
                          >
                            <span className="relative z-10">Launch Lab</span>
                            <motion.div
                              animate={{ x: [0, 4, 0] }}
                              transition={{ repeat: Infinity, duration: 1.5 }}
                              className="relative z-10"
                            >
                              <Play className="w-4 h-4 fill-white" />
                            </motion.div>
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
                          </button>
                        </div>
                        
                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl"></div>
                      </motion.div>
                    ) : (
                      <WhatsAppSystemDesignLab onClose={() => setShowWhatsAppLab(false)} />
                    )}
                  </div>
              )}
            </div>

            {/* Questions Loop */}
            <div className="space-y-12">
              {(activeContent && activeContent.items
                ? (isTimedQuizActive && quizQuestionIndices.length > 0
                    ? quizQuestionIndices
                        .filter((idx) => idx >= 0 && idx < activeContent.items!.length)
                        .map((idx) => ({ item: activeContent.items![idx], idx }))
                    : activeContent.items.map((item, idx) => ({ item, idx }))
                  )
                : []
              ).map(({ item, idx }: { item: any, idx: number }) => {
                // Remove "Q{number}." prefix from question text if it exists
                const questionText = item.q.replace(/^Q\d+\.\s*/i, '');
                const answerKey = `${activeModule}-${idx}`;
                const isRevealed = !isQuizMode || revealedAnswers[answerKey];

                return (
                <div key={idx} id={`question-${idx}`} className="group scroll-mt-20">
                  <div className="flex gap-4 items-start mb-2">
                    <span className="flex-shrink-0 w-8 h-8 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-brand-400 font-mono font-bold text-sm">
                      Q{idx + 1}
                    </span>
                    <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-semibold text-slate-200 leading-snug">
                        {questionText}
                    </h3>
                      {item.tags && item.tags.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {item.tags.map((tag: string) => (
                            <span
                              key={tag}
                              className="text-[10px] uppercase tracking-wide px-2 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pl-12 mt-2">
                    {isQuizMode && (
                      <button
                        type="button"
                        onClick={() => toggleAnswerReveal(answerKey)}
                        className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 text-[11px] font-medium text-slate-200 hover:border-amber-500 hover:text-amber-300 hover:bg-slate-900 transition-colors"
                      >
                        {isRevealed ? 'Hide answer' : 'Show answer'}
                      </button>
                    )}

                    {(!isQuizMode || isRevealed) && (
                      <>
                        {/* Code Snippet (if exists) - shown before the answer for better question context */}
                        {item.code && (
                          <div className="relative mt-4 mb-4 rounded-lg overflow-hidden border border-slate-800 bg-[#0c0e14] shadow-lg">
                            <div className="flex items-center justify-between px-4 py-2 bg-[#1a1d24] border-b border-slate-800">
                              <span className="text-xs text-slate-500 font-mono flex items-center gap-2">
                                <TerminalIcon className="w-3 h-3" /> solution.js
                              </span>
                              <div className="flex gap-1">
                                <span className="w-2 h-2 rounded-full bg-red-500/20"></span>
                                <span className="w-2 h-2 rounded-full bg-yellow-500/20"></span>
                                <span className="w-2 h-2 rounded-full bg-green-500/20"></span>
                              </div>
                            </div>
                            <pre className="p-4 overflow-x-auto text-sm font-mono text-blue-300 select-none">
                              <code>{item.code}</code>
                            </pre>
                            {/* Security Overlay for Code */}
                            <div
                              className="absolute inset-0 z-10 bg-transparent"
                              onContextMenu={(e) => e.preventDefault()}
                            />
                          </div>
                        )}

                        {/* Optional visual diagram (ASCII) */}
                        {item.diagram && (
                          <div className="mt-4 mb-6 rounded-lg border border-slate-800 bg-slate-900/70 overflow-hidden">
                            <div className="px-4 py-2 border-b border-slate-800 text-[11px] font-mono uppercase tracking-wider text-slate-400">
                              Diagram
                            </div>
                            <pre className="p-4 text-xs font-mono text-slate-200 whitespace-pre select-none overflow-x-auto">
                              {item.diagram}
                            </pre>
                          </div>
                        )}

                        {/* Answer Block */}
                        <div className="prose prose-invert prose-slate max-w-none text-slate-400 leading-relaxed whitespace-pre-line mb-6 select-none">
                          {item.a}
                        </div>

                        {/* Follow-up Questions (if any) */}
                        {item.followUps && item.followUps.length > 0 && (
                          <div className="mb-6">
                            <div className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-2">
                              Follow-up prompts
                            </div>
                            <ul className="list-disc list-inside space-y-1 text-[13px] text-slate-400">
                              {item.followUps.map((fu: string, i: number) => (
                                <li key={i} className="select-none">
                                  {fu}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              );
              })}
            </div>

            {/* End of Chapter */}
            <div className="mt-20 p-8 border border-dashed border-slate-800 rounded-2xl text-center bg-slate-900/30">
              <LockIcon className="w-8 h-8 text-slate-600 mx-auto mb-4" />
              <h4 className="text-slate-400 font-medium">End of Module</h4>
              <p className="text-slate-600 text-sm mt-2">Content is watermarked and monitored. Do not distribute.</p>
            </div>

            {(prevModule || nextModule) && (
              <div className="mt-8 flex flex-col gap-3 border-t border-slate-800 pt-6 md:flex-row md:items-center md:justify-between">
                {prevModule ? (
                  <button
                    onClick={() => goToModule(prevModule.id)}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/70 px-4 py-2 text-sm text-slate-200 hover:border-brand-500 hover:text-brand-300 hover:bg-slate-900 transition-colors"
                  >
                    ← Previous: <span className="font-medium line-clamp-1">{prevModule.title}</span>
                  </button>
                ) : (
                  <span className="text-xs text-slate-500">This is the first module.</span>
                )}

                {nextModule && (
                  <button
                    onClick={() => goToModule(nextModule.id)}
                    className="inline-flex items-center gap-2 rounded-lg border border-brand-500/40 bg-brand-500/10 px-4 py-2 text-sm text-brand-300 hover:bg-brand-500/20 transition-colors"
                  >
                    Next: <span className="font-semibold line-clamp-1">{nextModule.title}</span> →
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default ReaderContentArea;

