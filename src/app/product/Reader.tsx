import React, { useState, useEffect, useCallback, useRef } from 'react';
import { signOut } from 'firebase/auth';
import { ebookContent, studyPlans, StudyPlan, DayPlan, ChapterContent } from './ebookContent';
import { XIcon } from './Icons';
import { productAuth } from './firebaseProduct';
import { db } from '@/firebase/firebase';
import { useSecurityProtection } from './hooks/useSecurityProtection';
import ReaderSidebar from './components/ReaderSidebar';
import ReaderContentArea from './components/ReaderContentArea';

interface ReaderProps {
  onLogout: () => void;
}

const Reader: React.FC<ReaderProps> = ({ onLogout }) => {
  // Initialize active module - if first module has submodules, use first submodule
  const getInitialModule = () => {
    const firstModule = ebookContent[0];
    if (firstModule.submodules && firstModule.submodules.length > 0) {
      return firstModule.submodules[0].id;
    }
    return firstModule.id;
  };
  
  const [activeModule, setActiveModule] = useState(getInitialModule());
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set(['system-design']));
  const [sessionExpiryMsg, setSessionExpiryMsg] = useState<string | null>(null);
  const [logoutReason, setLogoutReason] = useState<string | null>(null);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});
  const [isExamMode, setIsExamMode] = useState(false);
  const [showTopicHeatmap, setShowTopicHeatmap] = useState(false);
  const [showEventLoopLab, setShowEventLoopLab] = useState(false);
  const [showWhatsAppLab, setShowWhatsAppLab] = useState(false);
  const [isTimedQuizActive, setIsTimedQuizActive] = useState(false);
  const [quizDurationMinutes, setQuizDurationMinutes] = useState(15);
  const [quizQuestionCount, setQuizQuestionCount] = useState(10);
  const [quizTimeLeft, setQuizTimeLeft] = useState<number | null>(null);
  const [quizQuestionIndices, setQuizQuestionIndices] = useState<number[]>([]);

  const contentRef = useRef<HTMLElement | null>(null);

  const scrollToTop = () => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Helper function to find content (including submodules)
  const findContentById = (id: string): ChapterContent | null => {
    for (const module of ebookContent) {
      if (module.id === id && module.items) return module;
      if (module.submodules) {
        const submodule = module.submodules.find(sm => sm.id === id);
        if (submodule && submodule.items) return submodule;
      }
    }
    return null;
  };

  // Helper to get all modules (including submodules) as flat list for navigation
  const getAllModules = (): ChapterContent[] => {
    const all: ChapterContent[] = [];
    ebookContent.forEach(module => {
      if (module.submodules) {
        all.push(...module.submodules.filter(sm => sm.items));
      } else if (module.items) {
        all.push(module);
      }
    });
    return all;
  };

  const toggleModuleExpansion = (moduleId: string) => {
    setExpandedModules(prev => {
      const newSet = new Set(prev);
      if (newSet.has(moduleId)) {
        newSet.delete(moduleId);
      } else {
        newSet.add(moduleId);
      }
      return newSet;
    });
  };

  const goToModule = (moduleId: string) => {
    if (isTimedQuizActive) {
      // Prevent switching modules during a timed quiz
      return;
    }
    setActiveModule(moduleId);
    setShowTodayPanel(false);
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
    scrollToTop();
  };

  const toggleAnswerReveal = (key: string) => {
    setRevealedAnswers(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const formatQuizTime = (seconds: number | null) => {
    if (seconds === null || seconds < 0) return '';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const mm = mins.toString().padStart(2, '0');
    const ss = secs.toString().padStart(2, '0');
    return `${mm}:${ss}`;
  };

  const startTimedQuiz = () => {
    const module = findContentById(activeModule);
    if (!module || !module.items || module.items.length === 0) return;

    const indices = Array.from({ length: module.items.length }, (_, i) => i);
    // Fisher–Yates shuffle to pick random questions
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    const selected = indices.slice(0, Math.min(quizQuestionCount, indices.length));
    if (selected.length === 0) return;

    setQuizQuestionIndices(selected);
    setQuizTimeLeft(quizDurationMinutes * 60);
    setIsTimedQuizActive(true);
    setIsQuizMode(true);
    setRevealedAnswers({});
    scrollToTop();
  };

  const endTimedQuiz = () => {
    setIsTimedQuizActive(false);
    setQuizTimeLeft(null);
    setQuizQuestionIndices([]);
    setIsQuizMode(false);
  };

  // ==================== STUDY PLAN STATE ====================
  const [activePlan, setActivePlan] = useState<StudyPlan | null>(null);
  const [currentDay, setCurrentDay] = useState(1);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [isPlanDropdownOpen, setIsPlanDropdownOpen] = useState(false);
  const [showTodayPanel, setShowTodayPanel] = useState(false);
  const [planStartDate, setPlanStartDate] = useState<Date | null>(null);

  // Load study plan progress from localStorage
  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem('ebook_study_progress');
      if (savedProgress) {
        const { planId, day, completed, startDate } = JSON.parse(savedProgress);
        const plan = studyPlans.find(p => p.id === planId);
        if (plan) {
          setActivePlan(plan);
          setCurrentDay(day);
          setCompletedTasks(new Set(completed || []));
          setPlanStartDate(startDate ? new Date(startDate) : new Date());
        }
      }
    } catch (e) {
      // Ignore parse errors
    }
  }, []);

  // Timed quiz countdown
  useEffect(() => {
    if (!isTimedQuizActive || quizTimeLeft === null) return;

    const id = window.setInterval(() => {
      setQuizTimeLeft(prev => {
        if (prev === null) return prev;
        if (prev <= 1) {
          window.clearInterval(id);
          setIsTimedQuizActive(false);
          setIsQuizMode(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      window.clearInterval(id);
    };
  }, [isTimedQuizActive, quizTimeLeft]);

  // Save study plan progress to localStorage
  const savePlanProgress = useCallback((plan: StudyPlan | null, day: number, completed: Set<string>) => {
    if (plan) {
      localStorage.setItem('ebook_study_progress', JSON.stringify({
        planId: plan.id,
        day,
        completed: Array.from(completed),
        startDate: planStartDate || new Date()
      }));
    } else {
      localStorage.removeItem('ebook_study_progress');
    }
  }, [planStartDate]);

  // Select a study plan
  const selectPlan = (plan: StudyPlan) => {
    setActivePlan(plan);
    setCurrentDay(1);
    setCompletedTasks(new Set());
    setPlanStartDate(new Date());
    setIsPlanDropdownOpen(false);
    setShowTodayPanel(true);
    savePlanProgress(plan, 1, new Set());
  };

  // Clear active plan
  const clearPlan = () => {
    setActivePlan(null);
    setCurrentDay(1);
    setCompletedTasks(new Set());
    setPlanStartDate(null);
    setShowTodayPanel(false);
    localStorage.removeItem('ebook_study_progress');
  };

  // Toggle task completion
  const toggleTaskCompletion = (taskKey: string) => {
    setCompletedTasks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(taskKey)) {
        newSet.delete(taskKey);
      } else {
        newSet.add(taskKey);
      }
      savePlanProgress(activePlan, currentDay, newSet);
      return newSet;
    });
  };

  // Navigate to a specific question
  const navigateToQuestion = (moduleId: string, questionIndex: number) => {
    setActiveModule(moduleId);
    setShowTodayPanel(false);
    // Scroll to question after a short delay
    setTimeout(() => {
      const questionEl = document.getElementById(`question-${questionIndex}`);
      if (questionEl) {
        questionEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // Go to next day
  const goToNextDay = () => {
    if (activePlan && currentDay < activePlan.totalDays) {
      const newDay = currentDay + 1;
      setCurrentDay(newDay);
      savePlanProgress(activePlan, newDay, completedTasks);
    }
  };

  // Go to previous day
  const goToPreviousDay = () => {
    if (currentDay > 1) {
      const newDay = currentDay - 1;
      setCurrentDay(newDay);
      savePlanProgress(activePlan, newDay, completedTasks);
    }
  };

  // Get today's plan
  const todayPlan: DayPlan | undefined = activePlan?.schedule.find(s => s.day === currentDay);

  // Calculate overall progress
  const calculateProgress = () => {
    if (!activePlan) return 0;
    let totalTasks = 0;
    let completedCount = 0;
    activePlan.schedule.forEach(day => {
      day.tasks.forEach(task => {
        task.questionIndices.forEach(qIdx => {
          totalTasks++;
          if (completedTasks.has(`${day.day}-${task.moduleId}-${qIdx}`)) {
            completedCount++;
          }
        });
      });
    });
    return totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;
  };

  // Get task count for today
  const getTodayTaskCount = () => {
    if (!todayPlan) return { total: 0, completed: 0 };
    let total = 0;
    let completed = 0;
    todayPlan.tasks.forEach(task => {
      task.questionIndices.forEach(qIdx => {
        total++;
        if (completedTasks.has(`${currentDay}-${task.moduleId}-${qIdx}`)) {
          completed++;
        }
      });
    });
    return { total, completed };
  };

  const todayStats = getTodayTaskCount();
  const overallProgress = calculateProgress();
  
  // Use security protection hook
  useSecurityProtection();
  
  // Check Session Expiry and Validate Session ID
  useEffect(() => {
    const SESSION_KEY = "frontend_mastery_active_session";
    
    const checkExpiry = () => {
      const activeSession = localStorage.getItem(SESSION_KEY);
      if (activeSession) {
        try {
          const session = JSON.parse(activeSession);
          const now = Date.now();
          const hours24 = 24 * 60 * 60 * 1000;
          const timeLeft = (session.timestamp + hours24) - now;
          
          // Show warning if less than 2 hours remaining and session is still valid
          if (timeLeft > 0 && timeLeft < 2 * 60 * 60 * 1000) {
            const mins = Math.ceil(timeLeft / 60000);
            const hourText = mins > 60 ? `1h ${mins % 60}m` : `${mins}m`;
            setSessionExpiryMsg(`Session expires in ${hourText}. Please re-login soon.`);
          } else {
             // If expired or plenty of time, don't show warning (App.tsx handles actual expiry redirect)
             if (timeLeft > 2 * 60 * 60 * 1000) {
                 setSessionExpiryMsg(null);
             }
          }
        } catch (e) {
          // Ignore invalid session data
        }
      }
    };

    // Validate session ID against Firestore (check for concurrent login)
    const validateSession = async () => {
      const activeSession = localStorage.getItem(SESSION_KEY);
      if (!activeSession) return;

      try {
        const session = JSON.parse(activeSession);
        if (!session.uid || !session.sessionId) return;

        // Fetch user document from Firestore
        const userDoc = await db.collection('premiumUsers').doc(session.uid).get();
        if (!userDoc.exists) {
          // User document doesn't exist, invalidate session
          setLogoutReason('Your account is no longer valid. Please contact support.');
          setTimeout(() => {
            localStorage.removeItem(SESSION_KEY);
            onLogout();
          }, 3000);
          return;
        }

        const userData = userDoc.data();
        const firestoreSessionId = userData?.activeSessionId;

        // If session IDs don't match, another device has logged in
        if (firestoreSessionId && firestoreSessionId !== session.sessionId) {
          setLogoutReason('You have been logged out because you logged in from another device. Only one device can be active at a time.');
          setTimeout(() => {
            localStorage.removeItem(SESSION_KEY);
            onLogout();
          }, 5000); // Give user 5 seconds to read the message
          return;
        }
      } catch (error) {
        // Network error or Firestore issue - don't log out, just log the error
        console.error('Session validation error:', error);
      }
    };

    checkExpiry();
    validateSession(); // Check immediately on mount
    const expiryInterval = setInterval(checkExpiry, 60000); // Check every minute
    const validationInterval = setInterval(validateSession, 30000); // Check every 30 seconds

    return () => {
      clearInterval(expiryInterval);
      clearInterval(validationInterval);
    };
  }, [onLogout]);

  const handleLogout = () => {
    // Clear the active session token used by the reader UI
    localStorage.removeItem("frontend_mastery_active_session");

    // Sign out from the product Firebase project
    signOut(productAuth)
      .catch(() => {
        // Ignore sign-out errors – local session is already cleared
      })
      .finally(() => {
        onLogout();
      });
  };

  const activeContent = findContentById(activeModule);
  const allModules = getAllModules();
  const activeModuleIndex = allModules.findIndex(c => c.id === activeModule);
  const prevModule = activeModuleIndex > 0 ? allModules[activeModuleIndex - 1] : null;
  const nextModule =
    activeModuleIndex >= 0 && activeModuleIndex < allModules.length - 1
      ? allModules[activeModuleIndex + 1]
      : null;

  // Get user email from session
  const userEmail = (() => {
    try {
      const session = localStorage.getItem("frontend_mastery_active_session");
      if (session) {
        const sessionData = JSON.parse(session);
        return sessionData.user || "milindgupta578@gmail.com";
      }
    } catch (e) {
      // Ignore
    }
    return "milindgupta578@gmail.com";
  })();

  return (
    <div 
      className="fixed inset-0 bg-slate-950 flex flex-col md:flex-row overflow-hidden select-none print:hidden"
      onContextMenu={(e) => e.preventDefault()}
      onCopy={(e) => e.preventDefault()}
      onCut={(e) => e.preventDefault()}
      onPaste={(e) => e.preventDefault()}
    >
      
      {/* Dynamic Watermark Overlay (Repeated) with User Info - Enhanced Visibility */}
      <div className="pointer-events-none fixed inset-0 z-50 flex flex-wrap content-start items-start justify-center overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <div 
            key={i} 
            data-watermark="true"
            className="w-96 h-96 flex items-center justify-center transform -rotate-45"
            style={{ opacity: 0.06 }}
          >
            <span className="text-xl font-extrabold text-red-400 whitespace-nowrap text-center drop-shadow-[0_0_8px_rgba(255,0,0,0.5)]">
              ⚠️ LICENSED TO: {userEmail}<br/>
              🔒 ID: 8X9-22-LOCKED<br/>
              📧 {userEmail}
            </span>
          </div>
        ))}
      </div>

      {/* Session Expiry Warning Toast */}
      {sessionExpiryMsg && (
        <div className="fixed bottom-6 right-6 z-[60] animate-fade-in">
           <div className="bg-amber-950/90 border border-amber-500/30 text-amber-100 px-4 py-3 rounded-lg shadow-2xl backdrop-blur-md flex items-center gap-4 max-w-sm">
              <div className="shrink-0 w-2 h-2 bg-amber-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.5)]"></div>
              <div className="flex-1">
                 <div className="text-[10px] font-bold text-amber-500 uppercase tracking-wider mb-0.5">Security Alert</div>
                 <p className="text-xs">{sessionExpiryMsg}</p>
              </div>
              <button 
                onClick={() => setSessionExpiryMsg(null)}
                className="text-amber-500/50 hover:text-amber-400 transition-colors p-1"
              >
                <XIcon className="w-4 h-4" />
              </button>
           </div>
        </div>
      )}

      {/* Concurrent Login Warning Toast */}
      {logoutReason && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-red-950/95 border-2 border-red-500/50 text-red-100 px-6 py-5 rounded-xl shadow-2xl backdrop-blur-md max-w-md w-full animate-fade-in">
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_12px_rgba(239,68,68,0.8)] mt-1"></div>
              <div className="flex-1">
                <div className="text-sm font-bold text-red-400 uppercase tracking-wider mb-2">Session Terminated</div>
                <p className="text-sm leading-relaxed mb-4">{logoutReason}</p>
                <div className="text-xs text-red-300/80 bg-red-900/30 px-3 py-2 rounded border border-red-800/50">
                  <strong>Security Notice:</strong> For your account security, only one device can access premium content at a time.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Header */}
      {!isFocusMode && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 p-4 flex justify-between items-center z-40">
          <span className="font-bold text-brand-400">FrontendMastery Reader</span>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-slate-400">
            {isSidebarOpen ? 'Close Menu' : 'Menu'}
          </button>
        </div>
      )}

      {/* Sidebar Navigation */}
      {!isFocusMode && (
        <ReaderSidebar
          isSidebarOpen={isSidebarOpen}
          activeModule={activeModule}
          expandedModules={expandedModules}
          activePlan={activePlan}
          currentDay={currentDay}
          overallProgress={overallProgress}
          showTodayPanel={showTodayPanel}
          isPlanDropdownOpen={isPlanDropdownOpen}
          userEmail={userEmail}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          onToggleModuleExpansion={toggleModuleExpansion}
          onGoToModule={goToModule}
          onSelectPlan={selectPlan}
          onClearPlan={clearPlan}
          onToggleTodayPanel={() => setShowTodayPanel(!showTodayPanel)}
          onLogout={handleLogout}
        />
      )}

      {/* Main Content Area */}
      <ReaderContentArea
        contentRef={contentRef}
        activeModule={activeModule}
        activeContent={activeContent}
        prevModule={prevModule}
        nextModule={nextModule}
        isFocusMode={isFocusMode}
        isQuizMode={isQuizMode}
        isExamMode={isExamMode}
        revealedAnswers={revealedAnswers}
        showTopicHeatmap={showTopicHeatmap}
        showEventLoopLab={showEventLoopLab}
        showWhatsAppLab={showWhatsAppLab}
        isTimedQuizActive={isTimedQuizActive}
        quizQuestionIndices={quizQuestionIndices}
        activePlan={activePlan}
        todayPlan={todayPlan}
        currentDay={currentDay}
        completedTasks={completedTasks}
        todayStats={todayStats}
        findContentById={findContentById}
        goToModule={goToModule}
        toggleAnswerReveal={toggleAnswerReveal}
        navigateToQuestion={navigateToQuestion}
        toggleTaskCompletion={toggleTaskCompletion}
        goToNextDay={goToNextDay}
        goToPreviousDay={goToPreviousDay}
        savePlanProgress={savePlanProgress}
        setShowTodayPanel={setShowTodayPanel}
        setIsExamMode={setIsExamMode}
        setIsQuizMode={setIsQuizMode}
        setIsFocusMode={setIsFocusMode}
        setShowTopicHeatmap={setShowTopicHeatmap}
        setShowEventLoopLab={setShowEventLoopLab}
        setShowWhatsAppLab={setShowWhatsAppLab}
        setCurrentDay={setCurrentDay}
      />
    </div>
  );
};

export default Reader;