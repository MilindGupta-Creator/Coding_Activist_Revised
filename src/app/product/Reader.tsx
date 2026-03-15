import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import Image from "next/image";
import Link from "next/link";
import { signOut } from 'firebase/auth';
import { motion } from 'framer-motion';
  import { MessageSquare, Wifi, Database, Server, Play, Sun, Moon, Search, X, Clock, Hash, Tag, FileText, ArrowRight, Briefcase, Shuffle, Link2, ExternalLink, BarChart3, Code, Sparkles, Shield, Activity, ChevronLeft, ChevronRight, LogOut, Bookmark as BookmarkIcon, LayoutDashboard, Navigation, Layout } from 'lucide-react';
import { ebookContent, studyPlans } from './ebookContent';
import { LockIcon, TerminalIcon, XIcon } from './Icons';
import { productAuth } from './firebaseProduct';
import { db } from '@/firebase/firebase';
import Logo from "../../../public/assets/main-logo.png";
import ExamQuiz from './ExamQuiz';
import FrequencyHeatmap from './FrequencyHeatmap';
import EventLoopSimulator from './EventLoopSimulator';
import WhatsAppSystemDesignLab from './WhatsAppSystemDesignLab';
import URLShortenerSystemDesignLab from './URLShortenerSystemDesignLab';
import WebSecurityXSSLab from './WebSecurityXSSLab';
import RandomQuestionSelector from './RandomQuestionSelector';
import CodePlayground from './CodePlayground';
import CodeChallenges from './CodeChallenges';
import CSSBattle from './CSSBattle';
import LiveDebuggingLab from './LiveDebuggingLab';
import { useSearch, useStudyPlan, useTimedQuiz } from './hooks';

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

// Company logos mapping
const companyLogos: { [key: string]: string } = {
  Google: "https://logo.clearbit.com/google.com",
  Amazon: "https://logo.clearbit.com/amazon.com",
  Facebook: "https://logo.clearbit.com/facebook.com",
  Meta: "https://logo.clearbit.com/meta.com",
  Apple: "https://logo.clearbit.com/apple.com",
  Microsoft: "https://logo.clearbit.com/microsoft.com",
  Netflix: "https://logo.clearbit.com/netflix.com",
  Uber: "https://logo.clearbit.com/uber.com",
  Airbnb: "https://logo.clearbit.com/airbnb.com",
  Adobe: "https://logo.clearbit.com/adobe.com",
  Oracle: "https://logo.clearbit.com/oracle.com",
  IBM: "https://logo.clearbit.com/ibm.com",
  "Goldman Sachs": "https://logo.clearbit.com/goldmansachs.com",
  Swiggy: "https://logo.clearbit.com/swiggy.com",
  Zomato: "https://logo.clearbit.com/zomato.com",
  Flipkart: "https://logo.clearbit.com/flipkart.com",
  Walmart: "https://logo.clearbit.com/walmart.com",
  Infosys: "https://logo.clearbit.com/infosys.com",
  "ICICI Bank": "https://logo.clearbit.com/icicibank.com",
  HackerRank: "https://logo.clearbit.com/hackerrank.com",
  LinkedIn: "https://logo.clearbit.com/linkedin.com",
  Twitter: "https://logo.clearbit.com/twitter.com",
  Tesla: "https://logo.clearbit.com/tesla.com",
  Spotify: "https://logo.clearbit.com/spotify.com",
  PayPal: "https://logo.clearbit.com/paypal.com",
  Stripe: "https://logo.clearbit.com/stripe.com",
  Shopify: "https://logo.clearbit.com/shopify.com",
  Atlassian: "https://logo.clearbit.com/atlassian.com",
  Salesforce: "https://logo.clearbit.com/salesforce.com",
  Zoom: "https://logo.clearbit.com/zoom.us",
  Dropbox: "https://logo.clearbit.com/dropbox.com",
  "JPMorgan Chase": "https://logo.clearbit.com/jpmorganchase.com",
  "Morgan Stanley": "https://logo.clearbit.com/morganstanley.com",
  "Bank of America": "https://logo.clearbit.com/bankofamerica.com",
  Visa: "https://logo.clearbit.com/visa.com",
  Mastercard: "https://logo.clearbit.com/mastercard.com",
  Intel: "https://logo.clearbit.com/intel.com",
  NVIDIA: "https://logo.clearbit.com/nvidia.com",
  AMD: "https://logo.clearbit.com/amd.com",
  Samsung: "https://logo.clearbit.com/samsung.com",
  Sony: "https://logo.clearbit.com/sony.com",
  "Goldman": "https://logo.clearbit.com/goldmansachs.com",
  "JP Morgan": "https://logo.clearbit.com/jpmorganchase.com",
  "JPMorgan": "https://logo.clearbit.com/jpmorganchase.com",
};

// List of known company names (for identification)
const knownCompanies = new Set(Object.keys(companyLogos));

// Company Logo Component
const CompanyLogo = ({
  company,
  size = 18,
  className = "",
  iconClassName = ""
}: {
  company: string;
  size?: number;
  className?: string;
  iconClassName?: string;
}) => {
  const [imageError, setImageError] = useState(false);
  const logoUrl = companyLogos[company];

  if (!logoUrl || imageError) {
    return (
      <div
        className={`flex-shrink-0 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-blue-500/30 ${iconClassName}`}
        style={{ width: size, height: size }}
      >
        <Briefcase
          className="text-blue-400"
          style={{ width: Math.floor(size * 0.6), height: Math.floor(size * 0.6) }}
        />
      </div>
    );
  }

  return (
    <img
      src={logoUrl}
      alt={`${company} logo`}
      width={size}
      height={size}
      className={`rounded-full object-cover border border-slate-700/50 flex-shrink-0 ${className}`}
      onError={() => setImageError(true)}
      loading="lazy"
    />
  );
};

interface ReaderProps {
  onLogout: () => void;
}

const Reader: React.FC<ReaderProps> = ({ onLogout }) => {
  // Get user session data
  const sessionData = useMemo(() => {
    try {
      const session = localStorage.getItem("frontend_mastery_active_session");
      if (session) {
        return JSON.parse(session);
      }
    } catch (e) {
      // Ignore
    }
    return null;
  }, []);

  const userId = sessionData?.uid || null;
  const userEmail = sessionData?.user || "milindgupta578@gmail.com";

  // ==================== CUSTOM HOOKS ====================
  const search = useSearch();
  const studyPlan = useStudyPlan(userId);
  const timedQuiz = useTimedQuiz();

  // ==================== LOCAL STATE ====================
  const [activeModule, setActiveModule] = useState(ebookContent[0].id);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
  const [sessionExpiryMsg, setSessionExpiryMsg] = useState<string | null>(null);
  const [logoutReason, setLogoutReason] = useState<string | null>(null);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [isExamMode, setIsExamMode] = useState(false);
  const [showTopicHeatmap, setShowTopicHeatmap] = useState(false);
  const [showEventLoopLab, setShowEventLoopLab] = useState(false);
  const [showWhatsAppLab, setShowWhatsAppLab] = useState(false);
  const [showURLShortenerLab, setShowURLShortenerLab] = useState(false);
  const [showXSSLab, setShowXSSLab] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showQuickJump, setShowQuickJump] = useState(false);
  const [quickJumpQuery, setQuickJumpQuery] = useState('');
  const [showRandomSelector, setShowRandomSelector] = useState(false);
  const [showCodePlayground, setShowCodePlayground] = useState(false);
  const [showCodeChallenges, setShowCodeChallenges] = useState(false);
  const [showCSSBattle, setShowCSSBattle] = useState(false);
  const [showLiveDebuggingLab, setShowLiveDebuggingLab] = useState(false);
  const [playgroundCode, setPlaygroundCode] = useState<string | null>(null);

  const contentRef = useRef<HTMLElement | null>(null);

  // Helper function to recursively find a module by ID (including submodules)
  const findModuleById = useCallback((modules: typeof ebookContent, id: string): typeof ebookContent[0] | null => {
    for (const module of modules) {
      if (module.id === id) {
        return module;
      }
      if (module.submodules) {
        const found = findModuleById(module.submodules, id);
        if (found) return found;
      }
    }
    return null;
  }, []);

  // Helper function to get all modules (including submodules) as a flat list for navigation
  const getAllModules = useCallback((modules: typeof ebookContent): Array<{ module: typeof ebookContent[0], level: number }> => {
    const result: Array<{ module: typeof ebookContent[0], level: number }> = [];
    for (const module of modules) {
      result.push({ module, level: 0 });
      if (module.submodules) {
        module.submodules.forEach(submodule => {
          result.push({ module: submodule, level: 1 });
        });
      }
    }
    return result;
  }, []);

  const scrollToTop = () => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToModule = (moduleId: string) => {
    if (timedQuiz.isTimedQuizActive) {
      // Prevent switching modules during a timed quiz
      return;
    }
    // If the module has submodules but no items, auto-navigate to the first submodule
    const targetModule = findModuleById(ebookContent, moduleId);
    if (targetModule && (!targetModule.items || targetModule.items.length === 0) && targetModule.submodules && targetModule.submodules.length > 0) {
      moduleId = targetModule.submodules[0].id;
    }
    setActiveModule(moduleId);
    studyPlan.setShowTodayPanel(false);
    // Reset WhatsApp lab when navigating away
    if (moduleId !== 'system-design-whatsapp') {
      setShowWhatsAppLab(false);
    }
    if (moduleId !== 'system-design-url-shortener') {
      setShowURLShortenerLab(false);
    }
    if (moduleId !== 'xss-attacks') {
      setShowXSSLab(false);
    }
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
    scrollToTop();
  };

  const handleStartTimedQuiz = () => {
    timedQuiz.startTimedQuiz(activeModule, findModuleById);
    scrollToTop();
  };

  // Load theme preference from localStorage
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('reader_theme');
      if (savedTheme === 'light') {
        setIsDarkMode(false);
      }
    } catch (e) {
      // Ignore parse errors
    }
  }, []);

  // Save theme preference to localStorage
  useEffect(() => {
    localStorage.setItem('reader_theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Additional keyboard shortcut for quick jump (not handled by useSearch hook)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Quick jump: Type "Q" followed by number
      if (e.key === 'q' && !search.isSearchOpen && !e.metaKey && !e.ctrlKey) {
        const target = e.target as HTMLElement;
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
          setShowQuickJump(true);
          setQuickJumpQuery('Q');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [search.isSearchOpen]);

  // Handle Enter key for search results navigation
  useEffect(() => {
    if (!search.isSearchOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (search.searchResults.length > 0) {
        if (e.key === 'Enter' && search.searchResults[search.selectedResultIndex]) {
          e.preventDefault();
          search.navigateToResult(search.searchResults[search.selectedResultIndex], goToModule);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [search.isSearchOpen, search.searchResults, search.selectedResultIndex, search.navigateToResult, goToModule]);

  // Quick jump to question number
  const handleQuickJump = useCallback((query: string) => {
    const match = query.match(/^q(\d+)$/i);
    if (match) {
      const questionNum = parseInt(match[1], 10);
      const module = findModuleById(ebookContent, activeModule);
      if (module && module.items && questionNum > 0 && questionNum <= module.items.length) {
        const questionIndex = questionNum - 1;
        setTimeout(() => {
          const questionEl = document.getElementById(`question-${questionIndex}`);
          if (questionEl) {
            questionEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            questionEl.classList.add('ring-2', 'ring-brand-500', 'ring-opacity-50');
            setTimeout(() => {
              questionEl.classList.remove('ring-2', 'ring-brand-500', 'ring-opacity-50');
            }, 2000);
          }
        }, 100);
        setShowQuickJump(false);
        setQuickJumpQuery('');
      }
    }
  }, [activeModule, findModuleById]);

  // Navigate to a specific question (for study plan)
  const navigateToQuestion = (moduleId: string, questionIndex: number) => {
    setActiveModule(moduleId);
    studyPlan.setShowTodayPanel(false);
    // Scroll to question after a short delay
    setTimeout(() => {
      const questionEl = document.getElementById(`question-${questionIndex}`);
      if (questionEl) {
        questionEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // Enhanced Anti-Screenshot / Copy Protection Logic (Global Listeners)
  useEffect(() => {
    // On small/mobile screens, skip aggressive anti-debug/screenshot logic
    // These heuristics can wrongly detect mobile browser UI as DevTools
    // and cause constant reloads/logouts. Desktop still keeps full protection.
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return;
    }

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
      const noop = () => { };
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
            (navigator.mediaDevices as any).getDisplayMedia = function () {
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

        HTMLCanvasElement.prototype.toDataURL = function () {
          window.location.reload();
          return originalToDataURL.apply(this, arguments as any);
        };

        CanvasRenderingContext2D.prototype.getImageData = function () {
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

  const activeContent = findModuleById(ebookContent, activeModule);
  const allModules = getAllModules(ebookContent);
  const activeModuleIndex = allModules.findIndex(m => m.module.id === activeModule);
  const prevModule = activeModuleIndex > 0 ? allModules[activeModuleIndex - 1].module : null;
  const nextModule =
    activeModuleIndex >= 0 && activeModuleIndex < allModules.length - 1
      ? allModules[activeModuleIndex + 1].module
      : null;

  // Check if we're viewing the WhatsApp System Design submodule
  const isWhatsAppModule = activeModule === 'system-design-whatsapp';
  const isURLShortenerModule = activeModule === 'system-design-url-shortener';
  const isXSSModule = activeModule === 'xss-attacks';

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  // Theme utility classes
  const themeClasses = {
    bg: isDarkMode ? 'bg-slate-950' : 'bg-gray-50',
    bgSecondary: isDarkMode ? 'bg-slate-900' : 'bg-white',
    bgTertiary: isDarkMode ? 'bg-slate-800' : 'bg-gray-100',
    bgHover: isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-gray-100',
    bgHoverSecondary: isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-200',
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    textSecondary: isDarkMode ? 'text-slate-300' : 'text-gray-700',
    textMuted: isDarkMode ? 'text-slate-400' : 'text-gray-500',
    textDim: isDarkMode ? 'text-slate-500' : 'text-gray-400',
    textDim2: isDarkMode ? 'text-slate-600' : 'text-gray-400',
    border: isDarkMode ? 'border-slate-800' : 'border-gray-200',
    borderSecondary: isDarkMode ? 'border-slate-700' : 'border-gray-300',
    borderL: isDarkMode ? 'border-slate-700' : 'border-gray-300',
    codeBg: isDarkMode ? 'bg-[#0c0e14]' : 'bg-gray-100',
    codeHeaderBg: isDarkMode ? 'bg-[#1a1d24]' : 'bg-gray-200',
    codeText: isDarkMode ? 'text-blue-300' : 'text-blue-700',
    indicatorBg: isDarkMode ? 'bg-slate-500' : 'bg-gray-400',
  };

  return (
    <div
      className={`fixed inset-0 ${themeClasses.bg} flex flex-col md:flex-row overflow-hidden select-none print:hidden`}
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
              ⚠️ LICENSED TO: {userEmail}<br />
              🔒 ID: 8X9-22-LOCKED<br />
              📧 {userEmail}
            </span>
          </div>
        ))}
      </div>

      {/* Search Modal */}
      {search.isSearchOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center pt-20 md:pt-32 px-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              search.setIsSearchOpen(false);
              search.clearSearch();
            }
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`relative w-full max-w-2xl ${themeClasses.bgSecondary} rounded-2xl border ${themeClasses.borderSecondary} shadow-2xl overflow-hidden`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input */}
            <div className={`p-4 border-b ${themeClasses.borderSecondary} flex items-center gap-3`}>
              <Search className={`w-5 h-5 ${themeClasses.textMuted} flex-shrink-0`} />
              <input
                ref={search.searchInputRef}
                type="text"
                value={search.searchQuery}
                onChange={(e) => search.setSearchQuery(e.target.value)}
                placeholder="Search modules, questions, tags, or code... (Press Esc to close)"
                className={`flex-1 bg-transparent ${themeClasses.text} placeholder:${themeClasses.textDim} outline-none text-sm`}
                autoFocus
              />
              {search.searchQuery && (
                <button
                  onClick={() => {
                    search.clearSearch();
                    search.searchInputRef.current?.focus();
                  }}
                  className={`p-1 rounded-lg ${themeClasses.bgHover} ${themeClasses.textMuted} hover:${themeClasses.textSecondary} transition-colors`}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => {
                  search.setIsSearchOpen(false);
                  search.clearSearch();
                }}
                className={`px-3 py-1.5 rounded-lg ${themeClasses.bgTertiary} ${themeClasses.textSecondary} text-xs font-medium ${themeClasses.bgHover} transition-colors`}
              >
                Esc
              </button>
            </div>

            {/* Search Results */}
            <div className={`max-h-[60vh] overflow-y-auto ${themeClasses.bgSecondary}`}>
              {search.searchQuery.trim() && search.searchResults.length === 0 && (
                <div className="p-8 text-center">
                  <Search className={`w-12 h-12 ${themeClasses.textDim} mx-auto mb-3 opacity-50`} />
                  <p className={`${themeClasses.textMuted} text-sm`}>No results found for "{search.searchQuery}"</p>
                  <p className={`${themeClasses.textDim} text-xs mt-2`}>Try different keywords or search by tags</p>
                </div>
              )}

              {search.searchQuery.trim() && search.searchResults.length > 0 && (
                <div className="p-2">
                  <div className={`px-3 py-2 text-xs font-medium ${themeClasses.textDim} uppercase tracking-wider`}>
                    {search.searchResults.length} result{search.searchResults.length !== 1 ? 's' : ''} found
                  </div>
                  {search.searchResults.map((result, idx) => {
                    // Highlight search query in text
                    const highlightText = (text: string, query: string) => {
                      if (!query.trim()) return text;
                      const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                      const parts = text.split(new RegExp(`(${escapedQuery})`, 'gi'));
                      return parts.map((part, i) =>
                        part.toLowerCase() === query.toLowerCase() ? (
                          <mark key={i} className={`bg-brand-500/30 ${themeClasses.text} px-0.5 rounded`}>
                            {part}
                          </mark>
                        ) : part
                      );
                    };

                    const isSelected = idx === search.selectedResultIndex;

                    return (
                      <button
                        key={`${result.moduleId}-${result.questionIndex ?? 'module'}-${idx}`}
                        data-search-result-index={idx}
                        onClick={() => search.navigateToResult(result, goToModule)}
                        className={`w-full text-left p-3 rounded-lg transition-colors border ${isSelected
                          ? `border-brand-500/50 ${themeClasses.bgTertiary}`
                          : `border-transparent ${themeClasses.bgHover} hover:border-brand-500/30`
                          } group`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${result.type === 'module'
                            ? 'bg-blue-500/20 text-blue-400'
                            : 'bg-brand-500/20 text-brand-400'
                            }`}>
                            {result.type === 'module' ? (
                              <FileText className="w-4 h-4" />
                            ) : (
                              <Hash className="w-4 h-4" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-xs font-medium ${themeClasses.textSecondary} truncate`}>
                                {highlightText(result.moduleTitle, search.searchQuery)}
                              </span>
                              {result.type === 'question' && result.questionIndex !== undefined && (
                                <span className={`text-[10px] px-1.5 py-0.5 rounded ${themeClasses.bgTertiary} ${themeClasses.textDim} font-mono`}>
                                  Q{result.questionIndex + 1}
                                </span>
                              )}
                            </div>
                            {result.type === 'question' && result.questionText && (
                              <p className={`text-sm ${themeClasses.textMuted} line-clamp-2 mb-1`}>
                                {highlightText(result.questionText, search.searchQuery)}
                              </p>
                            )}
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={`text-[10px] px-2 py-0.5 rounded-full ${themeClasses.bgTertiary} ${themeClasses.textDim} capitalize`}>
                                {result.matchedIn}
                              </span>
                              {result.type === 'question' && (
                                <span className={`text-[10px] ${themeClasses.textDim} flex items-center gap-1`}>
                                  <Tag className="w-3 h-3" />
                                  Question
                                </span>
                              )}
                              {result.type === 'module' && (
                                <span className={`text-[10px] ${themeClasses.textDim} flex items-center gap-1`}>
                                  <FileText className="w-3 h-3" />
                                  Module
                                </span>
                              )}
                            </div>
                          </div>
                          <ArrowRight className={`w-4 h-4 ${themeClasses.textDim} group-hover:text-brand-400 group-hover:translate-x-1 transition-all flex-shrink-0`} />
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {!search.searchQuery.trim() && search.recentSearches.length > 0 && (
                <div className="p-2">
                  <div className={`px-3 py-2 text-xs font-medium ${themeClasses.textDim} uppercase tracking-wider flex items-center gap-2`}>
                    <Clock className="w-3 h-3" />
                    Recent Searches
                  </div>
                  {search.recentSearches.map((recentSearch, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        search.setSearchQuery(recentSearch);
                        search.searchInputRef.current?.focus();
                      }}
                      className={`w-full text-left p-3 rounded-lg ${themeClasses.bgHover} transition-colors flex items-center gap-3 group`}
                    >
                      <Clock className={`w-4 h-4 ${themeClasses.textDim} flex-shrink-0`} />
                      <span className={`flex-1 text-sm ${themeClasses.textSecondary} group-hover:text-brand-400 transition-colors`}>
                        {recentSearch}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {!search.searchQuery.trim() && search.recentSearches.length === 0 && (
                <div className="p-8 text-center">
                  <Search className={`w-12 h-12 ${themeClasses.textDim} mx-auto mb-3 opacity-50`} />
                  <p className={`${themeClasses.textMuted} text-sm mb-2`}>Start typing to search</p>
                  <div className={`text-xs ${themeClasses.textDim} space-y-1 mt-4`}>
                    <p>• Search across all modules and questions</p>
                    <p>• Search by tags, topics, or keywords</p>
                    <p>• Type "Q" + number to quick jump (e.g., Q5)</p>
                    <p>• Press Esc to close</p>
                  </div>
                </div>
              )}
            </div>

            {/* Search Tips Footer */}
            {search.searchQuery.trim() && search.searchResults.length > 0 && (
              <div className={`px-4 py-2 border-t ${themeClasses.borderSecondary} ${themeClasses.bgTertiary}/30 flex items-center justify-between text-xs ${themeClasses.textDim} flex-wrap gap-2`}>
                <span>Press Enter to open first result</span>
                <span>↑↓ to navigate • Esc to close</span>
              </div>
            )}
          </motion.div>
        </div>
      )}

      {/* Random Question Selector */}
      {showRandomSelector && (
        <RandomQuestionSelector
          onNavigateToQuestion={(moduleId, questionIndex) => {
            goToModule(moduleId);
            setTimeout(() => {
              const questionEl = document.getElementById(`question-${questionIndex}`);
              if (questionEl) {
                questionEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                questionEl.classList.add('ring-2', 'ring-brand-500', 'ring-opacity-50');
                setTimeout(() => {
                  questionEl.classList.remove('ring-2', 'ring-brand-500', 'ring-opacity-50');
                }, 2000);
              }
            }, 300);
          }}
          onClose={() => setShowRandomSelector(false)}
          themeClasses={themeClasses}
          isDarkMode={isDarkMode}
        />
      )}

      {/* Code Playground Modal */}
      {showCodePlayground && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`w-full max-w-4xl max-h-[90vh] overflow-auto rounded-2xl ${themeClasses.bg} border ${themeClasses.border} shadow-2xl`}
          >
            <div className={`sticky top-0 flex items-center justify-between px-6 py-4 border-b ${themeClasses.border} ${themeClasses.bgSecondary}`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                  <Play className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className={`text-lg font-bold ${themeClasses.text}`}>Code Playground</h2>
                  <p className={`text-xs ${themeClasses.textMuted}`}>Write and run JavaScript code instantly</p>
                </div>
              </div>
              <button
                onClick={() => setShowCodePlayground(false)}
                className={`p-2 rounded-lg ${themeClasses.bgSecondary} hover:bg-red-500/20 hover:text-red-400 transition-colors`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <CodePlayground
                initialCode={playgroundCode || `// Write your JavaScript code here\nconsole.log("Hello, World!");`}
                isDarkMode={isDarkMode}
              />
            </div>
          </motion.div>
        </div>
      )}

      {/* Code Challenges Modal */}
      {showCodeChallenges && (
        <CodeChallenges
          onClose={() => setShowCodeChallenges(false)}
          isDarkMode={isDarkMode}
        />
      )}

      {/* CSS Battle Modal */}
      {showCSSBattle && (
        <CSSBattle
          onClose={() => setShowCSSBattle(false)}
          isDarkMode={isDarkMode}
        />
      )}

      {/* Live Debugging Lab Modal */}
      {showLiveDebuggingLab && (
        <div className="fixed inset-0 z-[100] flex bg-slate-950">
          <div className="w-full h-full">
            <LiveDebuggingLab
              onClose={() => setShowLiveDebuggingLab(false)}
            />
          </div>
        </div>
      )}

      {/* Quick Jump Input */}
      {showQuickJump && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-[90]">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${themeClasses.bgSecondary} border ${themeClasses.borderSecondary} rounded-lg shadow-xl p-3 flex items-center gap-2`}
          >
            <Hash className={`w-4 h-4 ${themeClasses.textMuted}`} />
            <input
              type="text"
              value={quickJumpQuery}
              onChange={(e) => {
                const val = e.target.value;
                setQuickJumpQuery(val);
                if (val.match(/^q\d+$/i)) {
                  handleQuickJump(val);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  setShowQuickJump(false);
                  setQuickJumpQuery('');
                }
              }}
              placeholder="Q1, Q2, Q3..."
              className={`bg-transparent ${themeClasses.text} placeholder:${themeClasses.textDim} outline-none text-sm w-32 font-mono`}
              autoFocus
            />
            <button
              onClick={() => {
                setShowQuickJump(false);
                setQuickJumpQuery('');
              }}
              className={`p-1 rounded ${themeClasses.bgHover} ${themeClasses.textMuted}`}
            >
              <X className="w-3 h-3" />
            </button>
          </motion.div>
        </div>
      )}

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
        <div className={`md:hidden ${themeClasses.bgSecondary} border-b ${themeClasses.border} p-4 flex justify-between items-center z-40`}>
          <span className="font-bold text-brand-400">Coding Activist Reader</span>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${themeClasses.bgTertiary} ${themeClasses.textSecondary} ${themeClasses.bgHover} transition-colors`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className={themeClasses.textMuted}>
              {isSidebarOpen ? 'Close Menu' : 'Menu'}
            </button>
          </div>
        </div>
      )}

      {/* Sidebar Navigation */}
      {!isFocusMode && (
        <aside className={`
        fixed md:relative z-30 w-full h-[calc(100%-60px)] md:h-full ${themeClasses.bgSecondary} border-r ${themeClasses.border} flex flex-col transition-all duration-300 overflow-hidden
        ${isSidebarMinimized ? 'md:w-14' : 'md:w-80'}
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
          {/* Sidebar collapse toggle — desktop only */}
          <div className={`hidden md:flex items-center justify-end px-2 py-2 border-b ${themeClasses.border} shrink-0`}>
            <button
              onClick={() => setIsSidebarMinimized(prev => !prev)}
              className={`p-1.5 rounded-md ${themeClasses.bgTertiary} ${themeClasses.textSecondary} ${themeClasses.bgHover} transition-colors`}
              aria-label={isSidebarMinimized ? 'Expand sidebar' : 'Collapse sidebar'}
              title={isSidebarMinimized ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isSidebarMinimized
                ? <ChevronRight className="w-4 h-4" />
                : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* ── Minimized icon strip — desktop only, shown when sidebar is collapsed ── */}
          {isSidebarMinimized && (
            <div className="hidden md:flex flex-col items-center flex-1 overflow-hidden">

              {/* Brand + controls */}
              <div className={`w-full flex flex-col items-center gap-2.5 py-3 border-b ${themeClasses.border}`}>
                <Link href="/" title="Coding Activist">
                  <Image
                    src={Logo}
                    alt="Coding Activist"
                    width={32}
                    height={32}
                    className="bg-white rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/40"
                    loading="lazy"
                  />
                </Link>
                <div
                  className="w-2 h-2 bg-green-500 rounded-full animate-pulse"
                  title="Secure Connection"
                />
                <button
                  onClick={toggleTheme}
                  className={`p-1.5 rounded-lg ${themeClasses.bgTertiary} ${themeClasses.textSecondary} ${themeClasses.bgHover} transition-colors`}
                  aria-label="Toggle theme"
                  title="Toggle theme"
                >
                  {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
              </div>

              {/* Module navigation dots */}
              <div className="flex-1 overflow-y-auto w-full flex flex-col items-center gap-1 py-2">
                <div className={`text-[8px] font-bold ${themeClasses.textDim} uppercase tracking-widest mb-1`}>CH</div>
                {ebookContent.map((chapter, idx) => (
                  <button
                    key={chapter.id}
                    onClick={() => goToModule(chapter.id)}
                    title={chapter.title}
                    className={`w-8 h-8 rounded-md flex items-center justify-center text-[11px] font-bold transition-all duration-200 shrink-0 ${
                      activeModule === chapter.id && !studyPlan.showTodayPanel
                        ? 'bg-brand-500/20 text-brand-400 border border-brand-500/30'
                        : `${themeClasses.textDim} ${themeClasses.bgHover}`
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>

              {/* Logout */}
              <div className={`w-full border-t ${themeClasses.border} flex justify-center py-3`}>
                <button
                  onClick={handleLogout}
                  title="Log Out"
                  aria-label="Log Out"
                  className={`p-1.5 rounded-lg ${themeClasses.bgTertiary} ${themeClasses.textSecondary} ${themeClasses.bgHover} hover:text-red-400 transition-colors`}
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* ── Full sidebar content — always on mobile, hidden on desktop when minimized ── */}
          <div className={`${isSidebarMinimized ? 'md:hidden' : ''} flex flex-col flex-1 min-h-0`}>

          <div className={`p-6 border-b ${themeClasses.border} hidden md:block`}>
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
              <span className={`text-sm font-bold ${themeClasses.text} group-hover:opacity-80 transition-colors`}>Coding Activist</span>
            </Link>
            <div className="mt-4 flex items-center justify-end">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg ${themeClasses.bgTertiary} ${themeClasses.textSecondary} ${themeClasses.bgHover} transition-colors`}
                aria-label="Toggle theme"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-1">
            {/* ==================== STUDY PLAN SELECTOR ==================== */}
            <div className="mb-4">
              <div className="relative">
                <button
                  onClick={() => studyPlan.setIsPlanDropdownOpen(!studyPlan.isPlanDropdownOpen)}
                  disabled={studyPlan.isLoading}
                  className={`w-full flex items-center justify-between gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 border ${studyPlan.activePlan
                    ? 'bg-gradient-to-r from-brand-500/20 to-purple-500/20 border-brand-500/30 text-brand-300'
                    : `${themeClasses.bgTertiary}/50 ${themeClasses.borderSecondary} ${themeClasses.textSecondary} ${themeClasses.bgHover}`
                    } ${studyPlan.isLoading ? 'opacity-50 cursor-wait' : ''}`}
                >
                  <div className="flex items-center gap-2">
                    {studyPlan.isLoading ? (
                      <Activity className="w-4 h-4 animate-pulse text-brand-400" />
                    ) : (
                      <CalendarIcon className="w-4 h-4" />
                    )}
                    <span className="truncate">
                      {studyPlan.isLoading ? 'Syncing Progress...' : studyPlan.activePlan ? studyPlan.activePlan.name : 'Choose Study Plan'}
                    </span>
                  </div>
                  {!studyPlan.isLoading && <ChevronDownIcon className={`w-4 h-4 transition-transform ${studyPlan.isPlanDropdownOpen ? 'rotate-180' : ''}`} />}
                </button>

                {/* Dropdown */}
                {studyPlan.isPlanDropdownOpen && (
                  <div className={`absolute top-full left-0 right-0 mt-2 ${themeClasses.bgTertiary} border ${themeClasses.borderSecondary} rounded-lg shadow-xl z-20 overflow-hidden`}>
                    {studyPlans.map((plan) => (
                      <button
                        key={plan.id}
                        onClick={() => studyPlan.selectPlan(plan)}
                        className={`w-full text-left px-4 py-3 ${themeClasses.bgHover} transition-colors border-b ${themeClasses.borderSecondary} last:border-b-0 ${studyPlan.activePlan?.id === plan.id ? themeClasses.bgTertiary : ''
                          }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          {plan.difficulty === 'Advanced' ? (
                            <RocketIcon className="w-4 h-4 text-purple-400" />
                          ) : (
                            <FireIcon className="w-4 h-4 text-orange-400" />
                          )}
                          <span className={`font-medium ${themeClasses.text} text-sm`}>{plan.name}</span>
                        </div>
                        <p className={`text-xs ${themeClasses.textMuted} line-clamp-2`}>{plan.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className={`text-[10px] px-2 py-0.5 rounded ${themeClasses.bgTertiary} ${themeClasses.textSecondary}`}>{plan.totalDays} days</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded ${themeClasses.bgTertiary} ${themeClasses.textSecondary}`}>{plan.targetRole}</span>
                        </div>
                      </button>
                    ))}
                    {studyPlan.activePlan && (
                      <button
                        onClick={studyPlan.clearPlan}
                        className="w-full text-left px-4 py-3 hover:bg-red-900/20 transition-colors text-red-400 text-sm"
                      >
                        ✕ Clear Active Plan
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Active Plan Progress */}
              {studyPlan.activePlan && (
                <div className={`mt-3 p-3 ${themeClasses.bgTertiary}/50 rounded-lg border ${themeClasses.borderSecondary}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs ${themeClasses.textMuted}`}>Overall Progress</span>
                    <span className="text-xs font-bold text-brand-400">{studyPlan.overallProgress}%</span>
                  </div>
                  <div className={`w-full h-2 ${themeClasses.bgTertiary} rounded-full overflow-hidden`}>
                    <div
                      className="h-full bg-gradient-to-r from-brand-500 to-purple-500 transition-all duration-500"
                      style={{ width: `${studyPlan.overallProgress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`text-[10px] ${themeClasses.textDim}`}>Day {studyPlan.currentDay} of {studyPlan.activePlan.totalDays}</span>
                    <button
                      onClick={() => studyPlan.setShowTodayPanel(!studyPlan.showTodayPanel)}
                      className="text-[10px] text-brand-400 hover:text-brand-300 font-medium"
                    >
                      {studyPlan.showTodayPanel ? 'Hide' : 'Show'} Today's Tasks
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className={`text-xs font-bold ${themeClasses.textDim} uppercase tracking-wider mb-3 px-2 mt-4`}>Modules</div>
            {ebookContent.map((chapter) => (
              <div key={chapter.id}>
                <button
                  onClick={() => goToModule(chapter.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 border border-transparent ${activeModule === chapter.id && !studyPlan.showTodayPanel
                    ? 'bg-brand-500/10 text-brand-400 border-brand-500/20'
                    : `${themeClasses.textMuted} ${themeClasses.bgHover} ${isDarkMode ? 'hover:text-white' : 'hover:text-gray-900'}`
                    }`}
                >
                  {chapter.title}
                </button>
                {/* Render submodules if they exist */}
                {chapter.submodules && chapter.submodules.length > 0 && (
                  <div className={`ml-4 mt-1 space-y-1 border-l ${themeClasses.borderL} pl-2`}>
                    {chapter.submodules.map((submodule) => (
                      <button
                        key={submodule.id}
                        onClick={() => goToModule(submodule.id)}
                        className={`w-full text-left px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 border border-transparent ${activeModule === submodule.id && !studyPlan.showTodayPanel
                          ? 'bg-brand-500/10 text-brand-400 border-brand-500/20'
                          : `${themeClasses.textDim} ${themeClasses.bgHover} ${isDarkMode ? 'hover:text-slate-300' : 'hover:text-gray-700'}`
                          }`}
                      >
                        <span className={`${themeClasses.textDim2} mr-2`}>└─</span>
                        {submodule.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className={`p-4 border-t ${themeClasses.border}`}>
            <div className={`${themeClasses.bgTertiary}/50 rounded-lg p-3 mb-4`}>
              <div className={`text-[10px] ${themeClasses.textDim} uppercase mb-1`}>License Holder</div>
              <div className={`text-xs ${themeClasses.text} font-mono`}>{userEmail}</div>
            </div>
            <button
              onClick={handleLogout}
              className={`w-full py-2 border ${themeClasses.borderSecondary} rounded-lg ${themeClasses.textMuted} text-sm ${themeClasses.bgHover} ${isDarkMode ? 'hover:text-white' : 'hover:text-gray-900'} transition-colors`}
            >
              Log Out
            </button>
          </div>
          </div>{/* end full sidebar content wrapper */}
        </aside>
      )}

      {/* Main Content Area */}
      <main ref={contentRef} className={`flex-1 h-full overflow-y-auto ${themeClasses.bg} relative scroll-smooth`}>
        <div
          className={`mx-auto px-6 py-12 md:py-20 transition-all duration-300 ${isFocusMode ? 'max-w-2xl md:px-0' : 'max-w-4xl'
            }`}
        >

          {/* Top toolbar */}
          <div className="flex items-center justify-between mb-6">
            <span className={`text-[10px] font-mono uppercase tracking-[0.25em] ${themeClasses.textDim2}`}>
              Reading Mode
            </span>
            <div className="flex items-center gap-2 flex-wrap justify-end">
              {/* Search Button */}
              <button
                onClick={() => {
                  search.setIsSearchOpen(true);
                  setTimeout(() => search.searchInputRef.current?.focus(), 100);
                }}
                className={`inline-flex items-center gap-2 rounded-full border ${themeClasses.borderSecondary} ${themeClasses.bgSecondary} px-3 py-1.5 text-[11px] font-medium ${themeClasses.textSecondary} hover:border-brand-500 hover:text-brand-300 transition-colors`}
                title="Search (Cmd/Ctrl + K)"
              >
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline">Search</span>
                <kbd className="hidden md:inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-800/50 border border-slate-700 text-[10px] font-mono text-slate-400">
                  <span className="text-[8px]">⌘</span>K
                </kbd>
              </button>

              {/* Random Question Selector Button */}
              <button
                onClick={() => setShowRandomSelector(true)}
                className={`inline-flex items-center gap-2 rounded-full border ${themeClasses.borderSecondary} ${themeClasses.bgSecondary} px-3 py-1.5 text-[11px] font-medium ${themeClasses.textSecondary} hover:border-purple-500 hover:text-purple-300 transition-colors`}
                title="Random Question Selector"
              >
                <Shuffle className="w-4 h-4" />
                <span className="hidden sm:inline">Random</span>
              </button>
              {/* Code Playground Button */}
              <button
                onClick={() => {
                  setPlaygroundCode(`// Write your JavaScript code here\nconsole.log("Hello, World!");\n\n// Try some examples:\nconst arr = [1, 2, 3, 4, 5];\nconsole.log("Sum:", arr.reduce((a, b) => a + b, 0));\n\n// Test closures\nfunction counter() {\n  let count = 0;\n  return () => ++count;\n}\nconst inc = counter();\nconsole.log(inc(), inc(), inc());`);
                  setShowCodePlayground(true);
                }}
                className={`inline-flex items-center gap-2 rounded-full border ${themeClasses.borderSecondary} ${themeClasses.bgSecondary} px-3 py-1.5 text-[11px] font-medium ${themeClasses.textSecondary} hover:border-green-500 hover:text-green-300 transition-colors`}
                title="Open Code Playground"
              >
                <Play className="w-4 h-4" />
                <span className="hidden sm:inline">Run Code</span>
              </button>
              {/* Code Challenges Button - Premium Feature */}
              <button
                onClick={() => setShowCodeChallenges(true)}
                className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 px-4 py-2 text-[11px] font-bold text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-105 transition-all duration-300 overflow-hidden"
                title="Practice Coding Challenges - Build Real Components!"
              >
                {/* Animated shine effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                {/* Pulsing glow ring */}
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300 -z-10" />

                {/* Icon with animation */}
                <span className="relative flex items-center justify-center w-5 h-5 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
                  <Code className="w-3 h-3" />
                </span>

                {/* Text */}
                <span className="relative">Code Challenges</span>

                {/* NEW badge */}
                <span className="relative flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-amber-400 text-amber-900 text-[9px] font-black uppercase tracking-wide animate-pulse">
                  <Sparkles className="w-2.5 h-2.5" />
                  NEW
                </span>
              </button>

              {/* CSS Battle Button - Visual CSS Challenges */}
              <button
                onClick={() => setShowCSSBattle(true)}
                className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-600 via-pink-600 to-cyan-500 px-4 py-2 text-[11px] font-bold text-white shadow-lg shadow-fuchsia-500/25 hover:shadow-fuchsia-500/40 hover:scale-105 transition-all duration-300 overflow-hidden"
                title="CSS Battle - Master CSS with pixel-perfect challenges!"
              >
                {/* Animated shine effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                {/* Pulsing glow ring */}
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-fuchsia-600 to-cyan-500 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300 -z-10" />

                {/* Icon with palette */}
                <span className="relative flex items-center justify-center w-5 h-5 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
                    <circle cx="12" cy="12" r="3" fill="currentColor" />
                  </svg>
                </span>

                {/* Text */}
                <span className="relative">CSS Battle</span>

                {/* HOT badge */}
                <span className="relative flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-gradient-to-r from-orange-400 to-red-500 text-white text-[9px] font-black uppercase tracking-wide animate-pulse">
                  🔥 HOT
                </span>
              </button>

              {/* Live Debugging Lab Button */}
              <button
                onClick={() => setShowLiveDebuggingLab(true)}
                className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 via-green-600 to-teal-500 px-4 py-2 text-[11px] font-bold text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 transition-all duration-300 overflow-hidden"
                title="Performance & Live Debugging Labs"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300 -z-10" />
                <span className="relative flex items-center justify-center w-5 h-5 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
                  <Activity className="w-3 h-3 pulse-emerald" />
                </span>
                <span className="relative">Bug Finder</span>
                <span className="relative flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-slate-900 border border-emerald-500 text-emerald-400 text-[9px] font-black uppercase tracking-wide">
                  LIVE
                </span>
              </button>
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`inline-flex items-center gap-2 rounded-full border ${themeClasses.borderSecondary} ${themeClasses.bgSecondary} px-3 py-1.5 text-[11px] font-medium ${themeClasses.textSecondary} hover:border-brand-500 hover:text-brand-300 transition-colors`}
                aria-label="Toggle theme"
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
              {!isExamMode && (
                <>
                  {/* Practice quiz toggle (hide/show answers) */}
                  <button
                    onClick={() => timedQuiz.setIsQuizMode(!timedQuiz.isQuizMode)}
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-medium transition-colors ${timedQuiz.isQuizMode
                      ? 'border-amber-500/70 bg-amber-500/10 text-amber-200 hover:bg-amber-500/20'
                      : `${themeClasses.borderSecondary} ${themeClasses.bgSecondary}/70 ${themeClasses.textSecondary} hover:border-amber-500 hover:text-amber-300 ${isDarkMode ? 'hover:bg-slate-900' : 'hover:bg-white'}`
                      }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full shadow-[0_0_6px_rgba(245,158,11,0.8)] ${timedQuiz.isQuizMode ? 'bg-amber-400' : themeClasses.indicatorBg
                        }`}
                    />
                    {timedQuiz.isQuizMode ? 'Quiz Mode: On' : 'Quiz Mode: Off'}
                  </button>

                  {/* Topic Heat Map toggle – only meaningful on first module */}
                  {activeModule === ebookContent[0].id && (
                    <button
                      onClick={() => setShowTopicHeatmap(prev => !prev)}
                      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-medium transition-colors ${showTopicHeatmap
                        ? 'border-sky-500/70 bg-sky-500/10 text-sky-200 hover:bg-sky-500/20'
                        : `${themeClasses.borderSecondary} ${themeClasses.bgSecondary}/70 ${themeClasses.textSecondary} hover:border-sky-500 hover:text-sky-300 ${isDarkMode ? 'hover:bg-slate-900' : 'hover:bg-white'}`
                        }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full shadow-[0_0_6px_rgba(56,189,248,0.8)] ${showTopicHeatmap ? 'bg-sky-400' : themeClasses.indicatorBg
                          }`}
                      />
                      {showTopicHeatmap ? 'Topics Heatmap: On' : 'Topics Heatmap'}
                    </button>
                  )}

                  <button
                    onClick={() => setShowEventLoopLab(prev => !prev)}
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-medium transition-colors ${showEventLoopLab
                      ? 'border-emerald-500/70 bg-emerald-500/10 text-emerald-200 hover:bg-emerald-500/20'
                      : `${themeClasses.borderSecondary} ${themeClasses.bgSecondary}/70 ${themeClasses.textSecondary} hover:border-emerald-500 hover:text-emerald-300 ${isDarkMode ? 'hover:bg-slate-900' : 'hover:bg-white'}`
                      }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full shadow-[0_0_6px_rgba(52,211,153,0.8)] ${showEventLoopLab ? 'bg-emerald-400' : themeClasses.indicatorBg
                        }`}
                    />
                    {showEventLoopLab ? 'Event Loop Lab: On' : 'Event Loop Lab'}
                  </button>
                </>
              )}

              {/* Exam Mode toggle */}
              <button
                onClick={() => {
                  studyPlan.setShowTodayPanel(false);
                  setIsExamMode(prev => !prev);
                  timedQuiz.setIsQuizMode(false);
                }}
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-medium transition-colors ${isExamMode
                  ? 'border-emerald-500/70 bg-emerald-500/10 text-emerald-200 hover:bg-emerald-500/20'
                  : `${themeClasses.borderSecondary} ${themeClasses.bgSecondary}/70 ${themeClasses.textSecondary} hover:border-emerald-500 hover:text-emerald-300 ${isDarkMode ? 'hover:bg-slate-900' : 'hover:bg-white'}`
                  }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full shadow-[0_0_6px_rgba(16,185,129,0.8)] ${isExamMode ? 'bg-emerald-400' : themeClasses.indicatorBg
                    }`}
                />
                {isExamMode ? 'Exam Mode: On' : 'Exam Mode'}
              </button>

              <button
                onClick={() => setIsFocusMode(prev => !prev)}
                className={`inline-flex items-center gap-2 rounded-full border ${themeClasses.borderSecondary} ${themeClasses.bgSecondary}/70 px-3 py-1.5 text-[11px] font-medium ${themeClasses.textSecondary} hover:border-brand-500 hover:text-brand-300 ${isDarkMode ? 'hover:bg-slate-900' : 'hover:bg-white'} transition-colors`}
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
          ) : studyPlan.showTodayPanel && studyPlan.activePlan && studyPlan.todayPlan ? (
            <div className="animate-fade-in">
              {/* Header */}
              <div className={`mb-8 pb-6 border-b ${themeClasses.border}`}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-500 to-purple-500 flex items-center justify-center">
                    <CalendarIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="text-brand-500 font-mono text-xs tracking-widest uppercase block">
                      {studyPlan.activePlan.name} • Day {studyPlan.currentDay}
                    </span>
                    <h2 className={`text-2xl md:text-4xl font-bold ${themeClasses.text}`}>{studyPlan.todayPlan.title}</h2>
                  </div>
                </div>

                {/* Day Navigation */}
                <div className="flex items-center gap-4 mt-4">
                  <button
                    onClick={studyPlan.goToPreviousDay}
                    disabled={studyPlan.currentDay === 1}
                    className={`px-3 py-1.5 rounded-lg ${themeClasses.bgTertiary} ${themeClasses.textSecondary} text-sm disabled:opacity-50 disabled:cursor-not-allowed ${themeClasses.bgHoverSecondary} transition-colors`}
                  >
                    ← Previous Day
                  </button>
                  <div className="flex-1 flex items-center gap-2">
                    {Array.from({ length: Math.min(studyPlan.activePlan.totalDays, 10) }).map((_, i) => {
                      const dayNum = studyPlan.currentDay <= 5 ? i + 1 : studyPlan.currentDay - 5 + i + 1;
                      if (dayNum > studyPlan.activePlan!.totalDays) return null;
                      return (
                        <button
                          key={dayNum}
                          onClick={() => studyPlan.setCurrentDay(dayNum)}
                          className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${dayNum === studyPlan.currentDay
                            ? 'bg-brand-500 text-white'
                            : dayNum < studyPlan.currentDay
                              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                              : `${themeClasses.bgTertiary} ${themeClasses.textMuted} ${themeClasses.bgHover}`
                            }`}
                        >
                          {dayNum}
                        </button>
                      );
                    })}
                    {studyPlan.activePlan.totalDays > 10 && (
                      <span className={`${themeClasses.textDim} text-xs`}>...</span>
                    )}
                  </div>
                  <button
                    onClick={studyPlan.goToNextDay}
                    disabled={studyPlan.currentDay === studyPlan.activePlan.totalDays}
                    className={`px-3 py-1.5 rounded-lg ${themeClasses.bgTertiary} ${themeClasses.textSecondary} text-sm disabled:opacity-50 disabled:cursor-not-allowed ${themeClasses.bgHoverSecondary} transition-colors`}
                  >
                    Next Day →
                  </button>
                </div>
              </div>

              {/* Daily Tip */}
              {studyPlan.todayPlan.tip && (
                <div className="mb-8 p-4 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">💡</span>
                    <div>
                      <span className="text-amber-400 font-semibold text-sm uppercase tracking-wide">Pro Tip</span>
                      <p className="text-amber-100/80 text-sm mt-1">{studyPlan.todayPlan.tip}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Progress Summary */}
              <div className={`mb-8 p-4 rounded-xl ${themeClasses.bgTertiary}/50 border ${themeClasses.borderSecondary}`}>
                <div className="flex items-center justify-between mb-3">
                  <span className={`${themeClasses.textSecondary} font-medium`}>Today's Progress</span>
                  <span className="text-brand-400 font-bold">{studyPlan.todayStats.completed} / {studyPlan.todayStats.total} tasks</span>
                </div>
                <div className={`w-full h-3 ${themeClasses.bgTertiary} rounded-full overflow-hidden`}>
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-500"
                    style={{ width: studyPlan.todayStats.total > 0 ? `${(studyPlan.todayStats.completed / studyPlan.todayStats.total) * 100}%` : '0%' }}
                  />
                </div>
                {studyPlan.todayStats.completed === studyPlan.todayStats.total && studyPlan.todayStats.total > 0 && (
                  <div className="mt-3 flex items-center gap-2 text-green-400">
                    <CheckCircleIcon className="w-5 h-5" />
                    <span className="text-sm font-medium">Day complete! Great work! 🎉</span>
                  </div>
                )}
              </div>

              {/* Task List */}
              <div className="space-y-4">
                <h3 className={`text-lg font-semibold ${themeClasses.text} mb-4`}>Today's Tasks</h3>
                {studyPlan.todayPlan.tasks.map((task, taskIdx) => {
                  const module = findModuleById(ebookContent, task.moduleId);
                  if (!module) return null;

                  return (
                    <div key={taskIdx} className={`${themeClasses.bgTertiary}/30 rounded-xl border ${themeClasses.borderSecondary} overflow-hidden`}>
                      <div className={`px-4 py-3 ${themeClasses.bgTertiary}/50 border-b ${themeClasses.borderSecondary}`}>
                        <span className={`${themeClasses.textSecondary} font-medium text-sm`}>{module.title}</span>
                      </div>
                      <div className="p-2">
                        {task.questionIndices.map((qIdx) => {
                          const question = module.items?.[qIdx];
                          if (!question) return null;
                          const taskKey = `${studyPlan.currentDay}-${task.moduleId}-${qIdx}`;
                          const isCompleted = studyPlan.completedTasks.has(taskKey);
                          const questionText = question.q.replace(/^Q\d+\.\s*/i, '');

                          return (
                            <div
                              key={qIdx}
                              className={`flex items-start gap-3 p-3 rounded-lg transition-all ${isCompleted ? 'bg-green-500/10' : `${themeClasses.bgHover}/50`
                                }`}
                            >
                              <button
                                onClick={() => studyPlan.toggleTaskCompletion(taskKey)}
                                className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${isCompleted
                                  ? 'bg-green-500 border-green-500 text-white'
                                  : `${themeClasses.borderSecondary} hover:border-brand-400`
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
                                  className={`text-left text-sm font-medium transition-colors ${isCompleted ? `${themeClasses.textDim} line-through` : `${themeClasses.textSecondary} hover:text-brand-400`
                                    }`}
                                >
                                  Q{qIdx + 1}. {questionText}
                                </button>
                                {question.tags && question.tags.length > 0 && (
                                  <div className="flex flex-wrap gap-1.5 mt-1.5 items-center">
                                    {/* Company tags with logos in study plan */}
                                    {question.tags
                                      .filter((tag: string) => knownCompanies.has(tag))
                                      .slice(0, 2)
                                      .map((company: string) => (
                                        <div
                                          key={company}
                                          className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20"
                                          title={`Asked at ${company}`}
                                        >
                                          <CompanyLogo company={company} size={14} />
                                          <span className="text-[9px] font-medium text-blue-400">
                                            {company}
                                          </span>
                                        </div>
                                      ))}
                                    {/* Regular tags */}
                                    {question.tags
                                      .filter((tag: string) => !knownCompanies.has(tag))
                                      .slice(0, 2)
                                      .map((tag: string) => (
                                        <span key={tag} className={`text-[9px] px-1.5 py-0.5 rounded ${themeClasses.bgTertiary} ${themeClasses.textMuted}`}>
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
              {studyPlan.todayStats.completed === studyPlan.todayStats.total && studyPlan.todayStats.total > 0 && studyPlan.currentDay < studyPlan.activePlan.totalDays && (
                <div className="mt-8 text-center">
                  <button
                    onClick={studyPlan.goToNextDay}
                    className="px-8 py-3 bg-gradient-to-r from-brand-500 to-purple-500 text-white font-bold rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-brand-500/25"
                  >
                    Continue to Day {studyPlan.currentDay + 1} →
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Chapter Header */}
              <div className={`mb-12 border-b ${themeClasses.border} pb-8`}>
                <span className="text-brand-500 font-mono text-sm tracking-widest uppercase mb-2 block">Current Module</span>
                <h2 className={`text-3xl md:text-5xl font-bold ${themeClasses.text}`}>{activeContent?.title}</h2>

                {/* Frontend topic heat map – only for first module + when toggle is ON */}
                {activeContent &&
                  activeContent.id === ebookContent[0].id &&
                  showTopicHeatmap && (
                    <FrequencyHeatmap />
                  )}

                {/* Event Loop simulator for async topics */}
                {activeContent &&
                  showEventLoopLab && (
                    <EventLoopSimulator />
                  )}

                {/* WhatsApp System Design Lab - Prominent Banner */}
                {isWhatsAppModule && (
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
                                  <h3 className={`text-xl font-bold ${themeClasses.text}`}>Interactive System Design Lab</h3>
                                  <span className={`px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/30 ${isDarkMode ? 'text-cyan-300' : 'text-cyan-600'} text-[10px] font-bold uppercase tracking-wider`}>
                                    NEW
                                  </span>
                                </div>
                                <p className={`text-sm ${themeClasses.textSecondary}`}>
                                  Experience real-time messaging architecture with hands-on simulations. Explore WebSocket flows, offline queues, and system architecture interactively.
                                </p>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mt-4">
                              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${themeClasses.bgTertiary}/50 border ${themeClasses.borderSecondary}`}>
                                <Wifi className="w-4 h-4 text-green-400" />
                                <span className={`text-xs ${themeClasses.textSecondary}`}>WebSocket Simulation</span>
                              </div>
                              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${themeClasses.bgTertiary}/50 border ${themeClasses.borderSecondary}`}>
                                <Database className="w-4 h-4 text-amber-400" />
                                <span className={`text-xs ${themeClasses.textSecondary}`}>Offline Queue</span>
                              </div>
                              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${themeClasses.bgTertiary}/50 border ${themeClasses.borderSecondary}`}>
                                <Server className="w-4 h-4 text-purple-400" />
                                <span className={`text-xs ${themeClasses.textSecondary}`}>Architecture Explorer</span>
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
                      <WhatsAppSystemDesignLab 
                        onClose={() => setShowWhatsAppLab(false)} 
                        onOpenPlayground={(code) => {
                          setPlaygroundCode(code);
                          setShowCodePlayground(true);
                        }}
                      />
                    )}
                  </div>
                )}

                {/* URL Shortener System Design Lab - Prominent Banner */}
                {isURLShortenerModule && (
                  <div className="mt-8">
                    {!showURLShortenerLab ? (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative overflow-hidden rounded-2xl border-2 border-purple-500/50 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 p-6 shadow-2xl shadow-purple-500/20"
                      >
                        {/* Animated background pattern */}
                        <div className="absolute inset-0 opacity-10 overflow-hidden">
                          <motion.div
                            className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(168,85,247,0.1)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]"
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
                                <div className="absolute inset-0 bg-purple-400 rounded-full blur-xl opacity-50 animate-pulse"></div>
                                <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                                  <Link2 className="w-6 h-6 text-white" />
                                </div>
                              </div>
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className={`text-xl font-bold ${themeClasses.text}`}>Interactive URL Shortener Lab</h3>
                                  <span className={`px-2 py-0.5 rounded-full bg-purple-500/20 border border-purple-400/30 ${isDarkMode ? 'text-purple-300' : 'text-purple-600'} text-[10px] font-bold uppercase tracking-wider`}>
                                    NEW
                                  </span>
                                </div>
                                <p className={`text-sm ${themeClasses.textSecondary}`}>
                                  Experience URL shortening architecture with hands-on simulations. Shorten URLs, test redirects, view analytics, and explore the system architecture interactively.
                                </p>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mt-4">
                              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${themeClasses.bgTertiary}/50 border ${themeClasses.borderSecondary}`}>
                                <Link2 className="w-4 h-4 text-purple-400" />
                                <span className={`text-xs ${themeClasses.textSecondary}`}>URL Shortening</span>
                              </div>
                              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${themeClasses.bgTertiary}/50 border ${themeClasses.borderSecondary}`}>
                                <ExternalLink className="w-4 h-4 text-blue-400" />
                                <span className={`text-xs ${themeClasses.textSecondary}`}>Redirect Flow</span>
                              </div>
                              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${themeClasses.bgTertiary}/50 border ${themeClasses.borderSecondary}`}>
                                <BarChart3 className="w-4 h-4 text-yellow-400" />
                                <span className={`text-xs ${themeClasses.textSecondary}`}>Analytics Dashboard</span>
                              </div>
                              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${themeClasses.bgTertiary}/50 border ${themeClasses.borderSecondary}`}>
                                <Server className="w-4 h-4 text-green-400" />
                                <span className={`text-xs ${themeClasses.textSecondary}`}>Architecture Explorer</span>
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() => setShowURLShortenerLab(true)}
                            className="group relative px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-sm hover:from-purple-400 hover:to-pink-400 transition-all duration-300 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 hover:scale-105 flex items-center gap-2"
                          >
                            <span className="relative z-10">Launch Lab</span>
                            <motion.div
                              animate={{ x: [0, 4, 0] }}
                              transition={{ repeat: Infinity, duration: 1.5 }}
                              className="relative z-10"
                            >
                              <Play className="w-4 h-4 fill-white" />
                            </motion.div>
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
                          </button>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-pink-500/10 rounded-full blur-2xl"></div>
                      </motion.div>
                    ) : (
                      <URLShortenerSystemDesignLab onClose={() => setShowURLShortenerLab(false)} />
                    )}
                  </div>
                )}

                {/* Web Security XSS Lab - Prominent Banner */}
                {isXSSModule && (
                  <div className="mt-8">
                    {!showXSSLab ? (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative overflow-hidden rounded-2xl border-2 border-red-500/50 bg-gradient-to-br from-red-500/10 via-orange-500/10 to-yellow-500/10 p-6 shadow-2xl shadow-red-500/20"
                      >
                        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="relative">
                                <div className="absolute inset-0 bg-red-400 rounded-full blur-xl opacity-50 animate-pulse"></div>
                                <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                                  <Shield className="w-6 h-6 text-white" />
                                </div>
                              </div>
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className={`text-xl font-bold ${themeClasses.text}`}>Interactive Web Security Lab</h3>
                                  <span className={`px-2 py-0.5 rounded-full bg-red-500/20 border border-red-400/30 ${isDarkMode ? 'text-red-300' : 'text-red-600'} text-[10px] font-bold uppercase tracking-wider`}>
                                    PROTOTYPE
                                  </span>
                                </div>
                                <p className={`text-sm ${themeClasses.textSecondary}`}>
                                  Experience web security concepts hands-on. Execute payloads, explore vulnerabilities, and learn how to defend against Cross-Site Scripting (XSS).
                                </p>
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => setShowXSSLab(true)}
                            className="group relative px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold text-sm hover:from-red-400 hover:to-orange-400 transition-all duration-300 shadow-lg shadow-red-500/50 hover:shadow-red-500/70 hover:scale-105 flex items-center gap-2"
                          >
                            <span className="relative z-10">Launch Lab</span>
                            <Play className="w-4 h-4 fill-white relative z-10" />
                          </button>
                        </div>
                      </motion.div>
                    ) : (
                      <WebSecurityXSSLab onClose={() => setShowXSSLab(false)} />
                    )}
                  </div>
                )}
              </div>

              {/* Questions Loop */}
              <div className="space-y-12">
                {(activeContent && activeContent.items
                  ? (timedQuiz.isTimedQuizActive && timedQuiz.quizQuestionIndices.length > 0
                    ? timedQuiz.quizQuestionIndices
                      .filter((idx: number) => idx >= 0 && idx < activeContent.items!.length)
                      .map((idx: number) => ({ item: activeContent.items![idx], idx }))
                    : activeContent.items.map((item, idx) => ({ item, idx }))
                  )
                  : []
                ).map(({ item, idx }: { item: NonNullable<typeof activeContent>['items'] extends (infer T)[] | undefined ? T : never; idx: number }) => {
                  // Remove "Q{number}." prefix from question text if it exists
                  const questionText = item.q.replace(/^Q\d+\.\s*/i, '');
                  const answerKey = `${activeModule}-${idx}`;
                  const isRevealed = !timedQuiz.isQuizMode || timedQuiz.revealedAnswers[answerKey];

                  return (
                    <div key={idx} id={`question-${idx}`} className="group scroll-mt-20">
                      <div className="flex gap-4 items-start mb-2">
                        <span className={`flex-shrink-0 w-8 h-8 rounded ${themeClasses.bgTertiary} border ${themeClasses.borderSecondary} flex items-center justify-center text-brand-400 font-mono font-bold text-sm`}>
                          Q{idx + 1}
                        </span>
                        <div className="flex-1">
                          <h3 className={`text-xl md:text-2xl font-semibold ${themeClasses.textSecondary} leading-snug`}>
                            {questionText}
                          </h3>
                          {item.tags && item.tags.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2 items-center">
                              {/* Company Tags with Logos */}
                              {item.tags
                                .filter((tag: string) => knownCompanies.has(tag))
                                .map((company: string) => (
                                  <div
                                    key={company}
                                    className={`group flex items-center gap-2 px-3 py-1.5 rounded-full ${themeClasses.bgTertiary}/60 border ${themeClasses.borderSecondary} hover:border-brand-500/50 transition-all cursor-default`}
                                    title={`Asked at ${company}`}
                                  >
                                    <CompanyLogo company={company} size={18} />
                                    <span className={`text-xs font-medium ${themeClasses.textSecondary} group-hover:text-brand-400 transition-colors`}>
                                      {company}
                                    </span>
                                  </div>
                                ))}

                              {/* Regular Tags (non-company) */}
                              {item.tags
                                .filter((tag: string) => !knownCompanies.has(tag))
                                .map((tag: string) => (
                                  <span
                                    key={tag}
                                    className={`text-[10px] uppercase tracking-wide px-2.5 py-1 rounded-full ${themeClasses.bgTertiary}/80 border ${themeClasses.borderSecondary} ${themeClasses.textSecondary}`}
                                  >
                                    {tag}
                                  </span>
                                ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="pl-12 mt-2">
                        {timedQuiz.isQuizMode && (
                          <button
                            type="button"
                            onClick={() => timedQuiz.toggleAnswerReveal(answerKey)}
                            className={`mb-3 inline-flex items-center gap-2 rounded-full border ${themeClasses.borderSecondary} ${themeClasses.bgSecondary}/70 px-3 py-1 text-[11px] font-medium ${themeClasses.textSecondary} hover:border-amber-500 hover:text-amber-300 ${isDarkMode ? 'hover:bg-slate-900' : 'hover:bg-white'} transition-colors`}
                          >
                            {isRevealed ? 'Hide answer' : 'Show answer'}
                          </button>
                        )}

                        {(!timedQuiz.isQuizMode || isRevealed) && (
                          <>
                            {/* Code Snippet (if exists) - shown before the answer for better question context */}
                            {item.code && (
                              item.playground ? (
                                <div className="mt-4 mb-4">
                                  <CodePlayground initialCode={item.code} isDarkMode={isDarkMode} />
                                </div>
                              ) : (
                                <div className={`relative mt-4 mb-4 rounded-lg overflow-hidden border ${themeClasses.border} ${themeClasses.codeBg} shadow-lg`}>
                                  <div className={`flex items-center justify-between px-4 py-2 ${themeClasses.codeHeaderBg} border-b ${themeClasses.border}`}>
                                    <span className={`text-xs ${themeClasses.textDim} font-mono flex items-center gap-2`}>
                                      <TerminalIcon className="w-3 h-3" /> solution.js
                                    </span>
                                    <div className="flex gap-1">
                                      <span className="w-2 h-2 rounded-full bg-red-500/20"></span>
                                      <span className="w-2 h-2 rounded-full bg-yellow-500/20"></span>
                                      <span className="w-2 h-2 rounded-full bg-green-500/20"></span>
                                    </div>
                                  </div>
                                  <pre className={`p-4 overflow-x-auto text-sm font-mono ${themeClasses.codeText} select-none`}>
                                    <code>{item.code}</code>
                                  </pre>
                                  {/* Security Overlay for Code */}
                                  <div
                                    className="absolute inset-0 z-10 bg-transparent"
                                    onContextMenu={(e) => e.preventDefault()}
                                  />
                                </div>
                              )
                            )}

                            {/* Optional visual diagram (ASCII) */}
                            {item.diagram && (
                              <div className={`mt-4 mb-6 rounded-lg border ${themeClasses.border} ${themeClasses.bgSecondary}/70 overflow-hidden`}>
                                <div className={`px-4 py-2 border-b ${themeClasses.border} text-[11px] font-mono uppercase tracking-wider ${themeClasses.textMuted}`}>
                                  Diagram
                                </div>
                                <pre className={`p-4 text-xs font-mono ${themeClasses.textSecondary} whitespace-pre select-none overflow-x-auto`}>
                                  {item.diagram}
                                </pre>
                              </div>
                            )}

                            {/* Answer Block */}
                            <div className={`prose ${isDarkMode ? 'prose-invert' : ''} prose-slate max-w-none ${themeClasses.textMuted} leading-relaxed whitespace-pre-line mb-6 select-none`}>
                              {item.a}
                            </div>

                            {/* Follow-up Questions (if any) */}
                            {item.followUps && item.followUps.length > 0 && (
                              <div className="mb-6">
                                <div className={`text-xs font-mono ${themeClasses.textDim} uppercase tracking-wider mb-2`}>
                                  Follow-up prompts
                                </div>
                                <ul className={`list-disc list-inside space-y-1 text-[13px] ${themeClasses.textMuted}`}>
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
              <div className={`mt-20 p-8 border border-dashed ${themeClasses.border} rounded-2xl text-center ${themeClasses.bgSecondary}/30`}>
                <LockIcon className={`w-8 h-8 ${themeClasses.textDim2} mx-auto mb-4`} />
                <h4 className={`${themeClasses.textMuted} font-medium`}>End of Module</h4>
                <p className={`${themeClasses.textDim2} text-sm mt-2`}>Content is watermarked and monitored. Do not distribute.</p>
              </div>

              {(prevModule || nextModule) && (
                <div className={`mt-8 flex flex-col gap-3 border-t ${themeClasses.border} pt-6 md:flex-row md:items-center md:justify-between`}>
                  {prevModule ? (
                    <button
                      onClick={() => goToModule(prevModule.id)}
                      className={`inline-flex items-center gap-2 rounded-lg border ${themeClasses.borderSecondary} ${themeClasses.bgSecondary}/70 px-4 py-2 text-sm ${themeClasses.textSecondary} hover:border-brand-500 hover:text-brand-300 ${isDarkMode ? 'hover:bg-slate-900' : 'hover:bg-white'} transition-colors`}
                    >
                      ← Previous: <span className="font-medium line-clamp-1">{prevModule.title}</span>
                    </button>
                  ) : (
                    <span className={`text-xs ${themeClasses.textDim}`}>This is the first module.</span>
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
    </div>
  );
};

export default Reader;