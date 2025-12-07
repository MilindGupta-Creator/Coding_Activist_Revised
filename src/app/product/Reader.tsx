import React, { useState, useEffect, useCallback } from 'react';
import Image from "next/image";
import Link from "next/link";
import { signOut } from 'firebase/auth';
import { ebookContent, studyPlans, StudyPlan, DayPlan } from './ebookContent';
import { LockIcon, TerminalIcon, XIcon } from './Icons';
import { productAuth } from './firebaseProduct';
import Logo from "../../../public/assets/main-logo.png";

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

const CheckCircleIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
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

interface ReaderProps {
  onLogout: () => void;
}

const Reader: React.FC<ReaderProps> = ({ onLogout }) => {
  const [activeModule, setActiveModule] = useState(ebookContent[0].id);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sessionExpiryMsg, setSessionExpiryMsg] = useState<string | null>(null);

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
  
  // Enhanced Anti-Screenshot / Copy Protection Logic (Global Listeners)
  useEffect(() => {
    // Prevent right-click context menu
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    
    // Prevent drag and drop
    const handleDragStart = (e: DragEvent) => e.preventDefault();
    const handleDrag = (e: DragEvent) => e.preventDefault();
    const handleDrop = (e: DragEvent) => e.preventDefault();
    
    // Prevent text selection
    const handleSelectStart = (e: Event) => e.preventDefault();
    
    // Prevent image dragging
    const handleImageDrag = (e: DragEvent) => {
      if (e.target instanceof HTMLImageElement) {
        e.preventDefault();
      }
    };

    // Enhanced keyboard protection
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent Print Screen, F12, and specific function keys that open DevTools
      const blockedFKeys = ['F12', 'F8']; // F8 can pause debugger, F12 opens DevTools
      if (
        e.key === 'PrintScreen' ||
        blockedFKeys.includes(e.key) ||
        // DevTools shortcuts
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C' || e.key === 'K' || e.key === 'i' || e.key === 'j' || e.key === 'c' || e.key === 'k')) ||
        (e.metaKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C' || e.key === 'K' || e.key === 'i' || e.key === 'j' || e.key === 'c' || e.key === 'k')) ||
        // Common shortcuts
        (e.ctrlKey && (e.key === 'p' || e.key === 's' || e.key === 'c' || e.key === 'u' || e.key === 'a' || e.key === 'P' || e.key === 'S' || e.key === 'C' || e.key === 'U' || e.key === 'A')) ||
        (e.metaKey && (e.key === 'p' || e.key === 's' || e.key === 'c' || e.key === 'u' || e.key === 'a' || e.key === 'P' || e.key === 'S' || e.key === 'C' || e.key === 'U' || e.key === 'A')) ||
        // Additional protection keys
        (e.ctrlKey && e.shiftKey && e.key === 'Delete') ||
        (e.ctrlKey && e.key === 'Insert')
      ) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    // Prevent common debugging methods
    const blockConsole = () => {
      const noop = () => {};
      const methods = ['log', 'debug', 'info', 'warn', 'error', 'assert', 'dir', 'dirxml', 'group', 'groupEnd', 'time', 'timeEnd', 'count', 'trace', 'profile', 'profileEnd', 'table', 'clear'];
      methods.forEach(method => {
        if (window.console && (window.console as any)[method]) {
          (window.console as any)[method] = noop;
        }
      });
    };

    // Anti-debugging: Prevent debugger statements
    const antiDebug = () => {
      return setInterval(() => {
        const start = performance.now();
        // eslint-disable-next-line no-debugger
        debugger;
        const end = performance.now();
        if (end - start > 100) {
          // DevTools is likely open (debugger pauses execution)
          window.location.reload();
        }
      }, 1000);
    };

    // Enhanced DevTools detection (multiple methods)
    const detectDevTools = () => {
      const threshold = 160;
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold = window.outerHeight - window.innerHeight > threshold;
      
      // Method 1: Window size difference
      if (widthThreshold || heightThreshold) {
        window.location.reload();
        return;
      }
      
      // Method 2: Console object detection (removed - causing type issues)
      // This method can be re-enabled if needed with proper typing
      
      // Method 3: Debugger detection via timing
      const start = performance.now();
      // eslint-disable-next-line no-debugger
      debugger;
      const end = performance.now();
      if (end - start > 100) {
        window.location.reload();
      }
    };

    // Monitor DOM changes (detect if someone tries to modify content)
    const monitorDOMChanges = () => {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          // If someone tries to remove protection or modify content
          if (mutation.type === 'childList' || mutation.type === 'attributes') {
            // Check if protection elements are being removed
            const styleElement = document.querySelector('style[data-protection]');
            if (!styleElement) {
              window.location.reload();
            }
          }
        });
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class']
      });

      return observer;
    };

    // Detect iframe embedding (prevent content theft via iframe)
    const detectIframe = () => {
      try {
        if (window.self !== window.top && window.top) {
          // Content is in an iframe - reload in top frame
          window.top.location.href = window.self.location.href;
        }
      } catch (e) {
        // Cross-origin iframe - block it
        window.location.href = '/';
      }
    };

    // Prevent common browser extensions that might extract content
    const detectExtensions = () => {
      // Check for common extension patterns
      const suspiciousPatterns = [
        'chrome-extension://',
        'moz-extension://',
        'safari-extension://'
      ];
      
      // Monitor for extension injection
      setInterval(() => {
        const scripts = document.querySelectorAll('script');
        scripts.forEach(script => {
          if (script.src && suspiciousPatterns.some(pattern => script.src.includes(pattern))) {
            window.location.reload();
          }
        });
      }, 2000);
    };

    // Screenshot Detection and Protection
    const detectScreenshots = () => {
      // Method 1: Detect visibility changes (window loses focus during screenshot)
      let visibilityChangeCount = 0;
      const handleVisibilityChange = () => {
        if (document.hidden) {
          visibilityChangeCount++;
          if (visibilityChangeCount > 2) {
            // Multiple rapid visibility changes might indicate screenshot attempt
            window.location.reload();
          }
          setTimeout(() => {
            visibilityChangeCount = Math.max(0, visibilityChangeCount - 1);
          }, 1000);
        }
      };

      // Method 2: Detect window blur (common during screenshots)
      let blurCount = 0;
      const handleBlur = () => {
        blurCount++;
        if (blurCount > 3) {
          window.location.reload();
        }
        setTimeout(() => {
          blurCount = Math.max(0, blurCount - 1);
        }, 2000);
      };

      // Method 3: Monitor clipboard for screenshot pastes
      const handlePaste = (e: ClipboardEvent) => {
        const items = e.clipboardData?.items;
        if (items) {
          for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1) {
              // Screenshot detected in clipboard
              window.location.reload();
            }
          }
        }
      };

      // Method 4: Detect screen capture API usage
      const detectScreenCapture = () => {
        try {
          // Check if getDisplayMedia is being called (screen recording)
          if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
            const originalGetDisplayMedia = navigator.mediaDevices.getDisplayMedia;
            (navigator.mediaDevices as any).getDisplayMedia = function() {
              window.location.reload();
              return Promise.reject(new Error('Screen capture blocked'));
            };
          }
        } catch (e) {
          // Ignore
        }
      };

      // Method 5: Monitor for screenshot keyboard shortcuts
      const handleScreenshotShortcuts = (e: KeyboardEvent) => {
        // Windows: Win+Shift+S, Win+PrintScreen, PrintScreen
        // Mac: Cmd+Shift+3, Cmd+Shift+4, Cmd+Shift+5
        const isWindowsKey = e.getModifierState('Meta') || e.getModifierState('OS');
        const isPrintScreen = e.key === 'PrintScreen' || e.code === 'PrintScreen';
        
        if (
          isPrintScreen ||
          (isWindowsKey && isPrintScreen) ||
          (isWindowsKey && e.shiftKey && (e.key === 'S' || e.key === 's')) ||
          ((e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === '3' || e.key === '4' || e.key === '5'))
        ) {
          // Screenshot shortcut detected - blur content and add stronger watermark
          document.body.style.filter = 'blur(15px)';
          // Increase watermark opacity temporarily
          const watermarks = document.querySelectorAll('[data-watermark]');
          watermarks.forEach((wm: any) => {
            if (wm) wm.style.opacity = '0.15';
          });
          setTimeout(() => {
            window.location.reload();
          }, 300);
        }
      };

      // Method 6: Detect canvas read attempts (screenshot tools often use canvas)
      const detectCanvasRead = () => {
        const originalToDataURL = HTMLCanvasElement.prototype.toDataURL;
        const originalGetImageData = CanvasRenderingContext2D.prototype.getImageData;
        
        HTMLCanvasElement.prototype.toDataURL = function() {
          window.location.reload();
          return originalToDataURL.apply(this, arguments as any);
        };
        
        CanvasRenderingContext2D.prototype.getImageData = function() {
          window.location.reload();
          return originalGetImageData.apply(this, arguments as any);
        };
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);
      window.addEventListener('blur', handleBlur);
      document.addEventListener('paste', handlePaste);
      document.addEventListener('keydown', handleScreenshotShortcuts);
      
      detectScreenCapture();
      detectCanvasRead();

      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        window.removeEventListener('blur', handleBlur);
        document.removeEventListener('paste', handlePaste);
        document.removeEventListener('keydown', handleScreenshotShortcuts);
      };
    };

    // Apply CSS to prevent selection with protection marker
    const style = document.createElement('style');
    style.setAttribute('data-protection', 'true');
    style.textContent = `
      * {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
        -webkit-touch-callout: none !important;
        -webkit-tap-highlight-color: transparent !important;
      }
      img {
        -webkit-user-drag: none !important;
        -khtml-user-drag: none !important;
        -moz-user-drag: none !important;
        -o-user-drag: none !important;
        user-drag: none !important;
        pointer-events: none !important;
      }
      /* Prevent content extraction via CSS */
      body::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 999999;
        pointer-events: none;
        background: transparent;
      }
      /* Make watermarks more visible in screenshots */
      [data-watermark] {
        text-shadow: 2px 2px 4px rgba(0,0,0,0.8), -2px -2px 4px rgba(0,0,0,0.8);
        filter: contrast(1.2) brightness(1.1);
      }
    `;
    document.head.appendChild(style);

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('drag', handleDrag);
    document.addEventListener('drop', handleDrop);
    document.addEventListener('selectstart', handleSelectStart);
    document.addEventListener('dragstart', handleImageDrag);
    
    // Block console methods
    blockConsole();
    
    // Start anti-debugging protection
    const antiDebugInterval = antiDebug();
    
    // Enhanced protections (keep lightweight to avoid breaking network/Firebase)
    detectIframe();
    detectExtensions();
    const screenshotCleanupFn = detectScreenshots();
    const domObserver = monitorDOMChanges();
    
    // Monitor for DevTools (check periodically with multiple methods)
    const devToolsInterval = setInterval(detectDevTools, 300);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('drag', handleDrag);
      document.removeEventListener('drop', handleDrop);
      document.removeEventListener('selectstart', handleSelectStart);
      document.removeEventListener('dragstart', handleImageDrag);
      clearInterval(devToolsInterval);
      clearInterval(antiDebugInterval);
      domObserver.disconnect();
      if (screenshotCleanupFn) screenshotCleanupFn();
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  // Check Session Expiry
  useEffect(() => {
    const checkExpiry = () => {
      const activeSession = localStorage.getItem("frontend_mastery_active_session");
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

    checkExpiry();
    const interval = setInterval(checkExpiry, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

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

  const activeContent = ebookContent.find(c => c.id === activeModule);

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
        {(() => {
          // Get user email from session for watermarking
          let userEmail = "milindgupta578@gmail.com";
          try {
            const session = localStorage.getItem("frontend_mastery_active_session");
            if (session) {
              const sessionData = JSON.parse(session);
              userEmail = sessionData.user || userEmail;
            }
          } catch (e) {
            // Use default
          }
          
          return Array.from({ length: 30 }).map((_, i) => (
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
          ));
        })()}
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

      {/* Mobile Header */}
      <div className="md:hidden bg-slate-900 border-b border-slate-800 p-4 flex justify-between items-center z-40">
        <span className="font-bold text-brand-400">FrontendMastery Reader</span>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-slate-400">
           {isSidebarOpen ? 'Close Menu' : 'Menu'}
        </button>
      </div>

      {/* Sidebar Navigation */}
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
                onClick={() => setIsPlanDropdownOpen(!isPlanDropdownOpen)}
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
                <ChevronDownIcon className={`w-4 h-4 transition-transform ${isPlanDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown */}
              {isPlanDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-20 overflow-hidden">
                  {studyPlans.map((plan) => (
                    <button
                      key={plan.id}
                      onClick={() => selectPlan(plan)}
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
                      onClick={clearPlan}
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
                    onClick={() => setShowTodayPanel(!showTodayPanel)}
                    className="text-[10px] text-brand-400 hover:text-brand-300 font-medium"
                  >
                    {showTodayPanel ? 'Hide' : 'Show'} Today's Tasks
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-2 mt-4">Modules</div>
          {ebookContent.map((chapter) => (
            <button
              key={chapter.id}
              onClick={() => {
                setActiveModule(chapter.id);
                setShowTodayPanel(false);
                if (window.innerWidth < 768) setIsSidebarOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 border border-transparent ${
                activeModule === chapter.id && !showTodayPanel
                  ? 'bg-brand-500/10 text-brand-400 border-brand-500/20'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {chapter.title}
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-slate-800">
           <div className="bg-slate-800/50 rounded-lg p-3 mb-4">
              <div className="text-[10px] text-slate-500 uppercase mb-1">License Holder</div>
              <div className="text-xs text-white font-mono">milindgupta578@gmail.com</div>
              <div className="text-[10px] text-slate-500 mt-1">ID: 8X9-22-LOCKED</div>
           </div>
           <button 
             onClick={handleLogout}
             className="w-full py-2 border border-slate-700 rounded-lg text-slate-400 text-sm hover:bg-slate-800 hover:text-white transition-colors"
           >
             Log Out
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 h-full overflow-y-auto bg-slate-950 relative scroll-smooth">
         <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
            
            {/* ==================== TODAY'S TASKS PANEL ==================== */}
            {showTodayPanel && activePlan && todayPlan ? (
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
                    const module = ebookContent.find(m => m.id === task.moduleId);
                    if (!module) return null;

                    return (
                      <div key={taskIdx} className="bg-slate-800/30 rounded-xl border border-slate-700 overflow-hidden">
                        <div className="px-4 py-3 bg-slate-800/50 border-b border-slate-700">
                          <span className="text-slate-300 font-medium text-sm">{module.title}</span>
                        </div>
                        <div className="p-2">
                          {task.questionIndices.map((qIdx) => {
                            const question = module.items[qIdx];
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
                </div>

            {/* Questions Loop */}
            <div className="space-y-12">
               {activeContent?.items.map((item, idx) => {
                 // Remove "Q{number}." prefix from question text if it exists
                 const questionText = item.q.replace(/^Q\d+\.\s*/i, '');
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
                             {item.tags.map((tag) => (
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
                             {item.followUps.map((fu, i) => (
                               <li key={i} className="select-none">
                                 {fu}
                               </li>
                             ))}
                           </ul>
                         </div>
                       )}

                       {/* Code Snippet (If exists) */}
                       {item.code && (
                         <div className="relative mt-4 mb-8 rounded-lg overflow-hidden border border-slate-800 bg-[#0c0e14] shadow-lg">
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
                           <div className="absolute inset-0 z-10 bg-transparent" onContextMenu={(e) => e.preventDefault()} />
                         </div>
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
              </>
            )}
         </div>
      </main>
    </div>
  );
};

export default Reader;