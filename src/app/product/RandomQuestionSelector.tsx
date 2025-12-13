import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shuffle, 
  Settings, 
  X, 
  Play, 
  Pause, 
  SkipForward, 
  RotateCcw, 
  Filter,
  Hash,
  FileText,
  Tag,
  TrendingUp,
  Clock,
  Target,
  Zap,
  CheckCircle2,
  XCircle,
  BarChart3,
  Sparkles
} from 'lucide-react';
import { ebookContent, ChapterContent } from './ebookContent';
import Image from 'next/image';
import { Briefcase } from 'lucide-react';

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

interface RandomQuestionSelectorProps {
  onNavigateToQuestion: (moduleId: string, questionIndex: number) => void;
  onClose: () => void;
  themeClasses: {
    bg: string;
    bgSecondary: string;
    bgTertiary: string;
    bgHover: string;
    text: string;
    textSecondary: string;
    textMuted: string;
    textDim: string;
    border: string;
    borderSecondary: string;
  };
  isDarkMode: boolean;
}

interface QuestionWithContext {
  moduleId: string;
  moduleTitle: string;
  questionIndex: number;
  question: NonNullable<ChapterContent['items']>[0];
  fullPath: string;
}

type FilterMode = 'all' | 'module' | 'tags' | 'companies';
type PracticeMode = 'single' | 'session' | 'marathon';

const RandomQuestionSelector: React.FC<RandomQuestionSelectorProps> = ({
  onNavigateToQuestion,
  onClose,
  themeClasses,
  isDarkMode,
}) => {
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionWithContext | null>(null);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [autoPlayInterval, setAutoPlayInterval] = useState(30); // seconds
  const [filterMode, setFilterMode] = useState<FilterMode>('all');
  const [selectedModule, setSelectedModule] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [practiceMode, setPracticeMode] = useState<PracticeMode>('single');
  const [sessionQuestions, setSessionQuestions] = useState<QuestionWithContext[]>([]);
  const [currentSessionIndex, setCurrentSessionIndex] = useState(0);
  const [sessionStats, setSessionStats] = useState({
    total: 0,
    viewed: 0,
    correct: 0,
    incorrect: 0,
  });
  const [showSettings, setShowSettings] = useState(false);
  const [viewedQuestions, setViewedQuestions] = useState<Set<string>>(new Set());
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const [questionCount, setQuestionCount] = useState(10);

  const knownCompanies = new Set(Object.keys(companyLogos));

  // Get all questions with context
  const getAllQuestions = useCallback((): QuestionWithContext[] => {
    const questions: QuestionWithContext[] = [];

    const traverseModules = (modules: typeof ebookContent, parentTitle = '') => {
      modules.forEach((module) => {
        const fullTitle = parentTitle ? `${parentTitle} > ${module.title}` : module.title;
        
        if (module.items) {
          module.items.forEach((item, index) => {
            questions.push({
              moduleId: module.id,
              moduleTitle: fullTitle,
              questionIndex: index,
              question: item,
              fullPath: `${fullTitle} - Q${index + 1}`,
            });
          });
        }

        if (module.submodules) {
          traverseModules(module.submodules, fullTitle);
        }
      });
    };

    traverseModules(ebookContent);
    return questions;
  }, []);

  // Get all available modules
  const allModules = useMemo(() => {
    const modules: Array<{ id: string; title: string; level: number }> = [];
    
    const traverse = (mods: typeof ebookContent, level = 0) => {
      mods.forEach((mod) => {
        modules.push({ id: mod.id, title: mod.title, level });
        if (mod.submodules) {
          traverse(mod.submodules, level + 1);
        }
      });
    };
    
    traverse(ebookContent);
    return modules;
  }, []);

  // Get all available tags and companies
  const { allTags, allCompanies } = useMemo(() => {
    const tags = new Set<string>();
    const companies = new Set<string>();
    
    getAllQuestions().forEach((q) => {
      if (q.question.tags) {
        q.question.tags.forEach((tag: string) => {
          if (knownCompanies.has(tag)) {
            companies.add(tag);
          } else {
            tags.add(tag);
          }
        });
      }
    });
    
    return {
      allTags: Array.from(tags).sort(),
      allCompanies: Array.from(companies).sort(),
    };
  }, [getAllQuestions]);

  // Filter questions based on current filters
  const getFilteredQuestions = useCallback((): QuestionWithContext[] => {
    let questions = getAllQuestions();

    // Filter by module
    if (filterMode === 'module' && selectedModule) {
      questions = questions.filter((q) => q.moduleId === selectedModule);
    }

    // Filter by tags
    if (filterMode === 'tags' && selectedTags.length > 0) {
      questions = questions.filter((q) =>
        q.question.tags?.some((tag: string) => selectedTags.includes(tag) && !knownCompanies.has(tag))
      );
    }

    // Filter by companies
    if (filterMode === 'companies' && selectedCompanies.length > 0) {
      questions = questions.filter((q) =>
        q.question.tags?.some((tag: string) => selectedCompanies.includes(tag) && knownCompanies.has(tag))
      );
    }

    // Filter by difficulty (if tags contain difficulty indicators)
    if (difficultyFilter !== 'all') {
      questions = questions.filter((q) => {
        const tags = q.question.tags || [];
        const hasDifficulty = tags.some((tag: string) => 
          tag.toLowerCase().includes(difficultyFilter)
        );
        return hasDifficulty;
      });
    }

    // Exclude already viewed questions in session mode
    if (practiceMode === 'session' && viewedQuestions.size > 0) {
      questions = questions.filter(
        (q) => !viewedQuestions.has(`${q.moduleId}-${q.questionIndex}`)
      );
    }

    return questions;
  }, [
    filterMode,
    selectedModule,
    selectedTags,
    selectedCompanies,
    difficultyFilter,
    practiceMode,
    viewedQuestions,
    getAllQuestions,
  ]);

  // Get random question
  const getRandomQuestion = useCallback(() => {
    const filtered = getFilteredQuestions();
    if (filtered.length === 0) {
      return null;
    }
    
    const randomIndex = Math.floor(Math.random() * filtered.length);
    return filtered[randomIndex];
  }, [getFilteredQuestions]);

  // Generate session questions
  const generateSession = useCallback(() => {
    const filtered = getFilteredQuestions();
    const count = Math.min(questionCount, filtered.length);
    
    // Shuffle array
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, count);
    
    setSessionQuestions(selected);
    setCurrentSessionIndex(0);
    setSessionStats({ total: selected.length, viewed: 0, correct: 0, incorrect: 0 });
    setViewedQuestions(new Set());
    
    if (selected.length > 0) {
      setSelectedQuestion(selected[0]);
      setViewedQuestions(new Set([`${selected[0].moduleId}-${selected[0].questionIndex}`]));
    }
  }, [getFilteredQuestions, questionCount]);

  // Handle next question
  const handleNext = useCallback(() => {
    if (practiceMode === 'session') {
      if (currentSessionIndex < sessionQuestions.length - 1) {
        const nextIndex = currentSessionIndex + 1;
        setCurrentSessionIndex(nextIndex);
        setSelectedQuestion(sessionQuestions[nextIndex]);
        setViewedQuestions((prev) => {
          const newSet = new Set(prev);
          newSet.add(`${sessionQuestions[nextIndex].moduleId}-${sessionQuestions[nextIndex].questionIndex}`);
          return newSet;
        });
        setSessionStats((prev) => ({ ...prev, viewed: prev.viewed + 1 }));
      } else {
        // Session complete
        setIsAutoPlay(false);
      }
    } else {
      const random = getRandomQuestion();
      if (random) {
        setSelectedQuestion(random);
        setViewedQuestions((prev) => {
          const newSet = new Set(prev);
          newSet.add(`${random.moduleId}-${random.questionIndex}`);
          return newSet;
        });
      }
    }
  }, [practiceMode, currentSessionIndex, sessionQuestions, getRandomQuestion]);

  // Handle shuffle (new random question)
  const handleShuffle = useCallback(() => {
    if (practiceMode === 'session' && sessionQuestions.length === 0) {
      generateSession();
    } else {
      handleNext();
    }
  }, [practiceMode, sessionQuestions.length, generateSession, handleNext]);

  // Auto-play effect
  useEffect(() => {
    if (!isAutoPlay || practiceMode === 'marathon') return;

    const interval = setInterval(() => {
      handleNext();
    }, autoPlayInterval * 1000);

    return () => clearInterval(interval);
  }, [isAutoPlay, autoPlayInterval, handleNext, practiceMode]);

  // Initialize with first random question
  useEffect(() => {
    if (!selectedQuestion) {
      const random = getRandomQuestion();
      if (random) {
        setSelectedQuestion(random);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredCount = getFilteredQuestions().length;
  const questionText = selectedQuestion?.question.q.replace(/^Q\d+\.\s*/i, '') || '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 ${isDarkMode ? 'bg-black/80' : 'bg-white/80'} backdrop-blur-sm`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className={`relative w-full max-w-4xl ${themeClasses.bgSecondary} rounded-2xl border ${themeClasses.borderSecondary} shadow-2xl overflow-hidden max-h-[90vh] flex flex-col`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`p-6 border-b ${themeClasses.borderSecondary} flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center`}>
              <Shuffle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className={`text-2xl font-bold ${themeClasses.text}`}>Random Question Selector</h2>
              <p className={`text-sm ${themeClasses.textMuted}`}>
                {filteredCount} question{filteredCount !== 1 ? 's' : ''} available
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`p-2 rounded-lg ${themeClasses.bgTertiary} ${themeClasses.textSecondary} hover:${themeClasses.text} ${themeClasses.bgHover} transition-colors`}
              title="Settings"
            >
              <Settings className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg ${themeClasses.bgTertiary} ${themeClasses.textSecondary} hover:text-red-400 ${themeClasses.bgHover} transition-colors`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Settings Panel */}
          <AnimatePresence>
            {showSettings && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className={`border-b ${themeClasses.borderSecondary} ${themeClasses.bgTertiary}/30 overflow-hidden`}
              >
                <div className="p-6 space-y-6">
                  {/* Practice Mode */}
                  <div>
                    <label className={`text-sm font-medium ${themeClasses.textSecondary} mb-2 block`}>
                      Practice Mode
                    </label>
                    <div className="flex gap-2 flex-wrap">
                      {(['single', 'session', 'marathon'] as PracticeMode[]).map((mode) => (
                        <button
                          key={mode}
                          onClick={() => {
                            setPracticeMode(mode);
                            if (mode === 'session') {
                              generateSession();
                            }
                          }}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            practiceMode === mode
                              ? 'bg-purple-500 text-white'
                              : `${themeClasses.bgTertiary} ${themeClasses.textSecondary} ${themeClasses.bgHover}`
                          }`}
                        >
                          {mode === 'single' && '🎲 Single Question'}
                          {mode === 'session' && '📚 Practice Session'}
                          {mode === 'marathon' && '🏃 Marathon Mode'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Filter Mode */}
                  <div>
                    <label className={`text-sm font-medium ${themeClasses.textSecondary} mb-2 block`}>
                      Filter By
                    </label>
                    <div className="flex gap-2 flex-wrap">
                      {(['all', 'module', 'tags', 'companies'] as FilterMode[]).map((mode) => (
                        <button
                          key={mode}
                          onClick={() => setFilterMode(mode)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            filterMode === mode
                              ? 'bg-blue-500 text-white'
                              : `${themeClasses.bgTertiary} ${themeClasses.textSecondary} ${themeClasses.bgHover}`
                          }`}
                        >
                          {mode.charAt(0).toUpperCase() + mode.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Module Selector */}
                  {filterMode === 'module' && (
                    <div>
                      <label className={`text-sm font-medium ${themeClasses.textSecondary} mb-2 block`}>
                        Select Module
                      </label>
                      <select
                        value={selectedModule}
                        onChange={(e) => setSelectedModule(e.target.value)}
                        className={`w-full px-4 py-2 rounded-lg ${themeClasses.bgTertiary} ${themeClasses.text} border ${themeClasses.borderSecondary} focus:outline-none focus:border-purple-500`}
                      >
                        <option value="">All Modules</option>
                        {allModules.map((mod) => (
                          <option key={mod.id} value={mod.id}>
                            {'  '.repeat(mod.level)}
                            {mod.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Tags Selector */}
                  {filterMode === 'tags' && (
                    <div>
                      <label className={`text-sm font-medium ${themeClasses.textSecondary} mb-2 block`}>
                        Select Tags
                      </label>
                      <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-2">
                        {allTags.map((tag) => (
                          <button
                            key={tag}
                            onClick={() => {
                              setSelectedTags((prev) =>
                                prev.includes(tag)
                                  ? prev.filter((t) => t !== tag)
                                  : [...prev, tag]
                              );
                            }}
                            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                              selectedTags.includes(tag)
                                ? 'bg-purple-500 text-white'
                                : `${themeClasses.bgTertiary} ${themeClasses.textSecondary} ${themeClasses.bgHover}`
                            }`}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Companies Selector */}
                  {filterMode === 'companies' && (
                    <div>
                      <label className={`text-sm font-medium ${themeClasses.textSecondary} mb-2 block`}>
                        Select Companies
                      </label>
                      <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-2">
                        {allCompanies.map((company) => (
                          <button
                            key={company}
                            onClick={() => {
                              setSelectedCompanies((prev) =>
                                prev.includes(company)
                                  ? prev.filter((c) => c !== company)
                                  : [...prev, company]
                              );
                            }}
                            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors flex items-center gap-2 ${
                              selectedCompanies.includes(company)
                                ? 'bg-blue-500 text-white'
                                : `${themeClasses.bgTertiary} ${themeClasses.textSecondary} ${themeClasses.bgHover}`
                            }`}
                          >
                            <CompanyLogo company={company} size={14} />
                            {company}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Session Settings */}
                  {practiceMode === 'session' && (
                    <div>
                      <label className={`text-sm font-medium ${themeClasses.textSecondary} mb-2 block`}>
                        Number of Questions: {questionCount}
                      </label>
                      <input
                        type="range"
                        min="5"
                        max="50"
                        value={questionCount}
                        onChange={(e) => setQuestionCount(Number(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  )}

                  {/* Auto-play Settings */}
                  {practiceMode !== 'marathon' && (
                    <div>
                      <label className={`text-sm font-medium ${themeClasses.textSecondary} mb-2 block flex items-center gap-2`}>
                        <input
                          type="checkbox"
                          checked={isAutoPlay}
                          onChange={(e) => setIsAutoPlay(e.target.checked)}
                          className="rounded"
                        />
                        Auto-play (seconds per question)
                      </label>
                      {isAutoPlay && (
                        <input
                          type="range"
                          min="5"
                          max="120"
                          value={autoPlayInterval}
                          onChange={(e) => setAutoPlayInterval(Number(e.target.value))}
                          className="w-full mt-2"
                        />
                      )}
                      {isAutoPlay && (
                        <p className={`text-xs ${themeClasses.textDim} mt-1`}>
                          {autoPlayInterval} seconds per question
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <div className="p-6">
            {selectedQuestion ? (
              <div className="space-y-6">
                {/* Question Header */}
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${themeClasses.bgTertiary} border ${themeClasses.borderSecondary} flex items-center justify-center`}>
                    <Hash className={`w-6 h-6 ${themeClasses.textSecondary}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className={`w-4 h-4 ${themeClasses.textDim}`} />
                      <span className={`text-sm ${themeClasses.textMuted}`}>
                        {selectedQuestion.moduleTitle}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded ${themeClasses.bgTertiary} ${themeClasses.textDim} font-mono`}>
                        Q{selectedQuestion.questionIndex + 1}
                      </span>
                    </div>
                    <h3 className={`text-xl md:text-2xl font-semibold ${themeClasses.text} leading-snug mb-3`}>
                      {questionText}
                    </h3>
                    
                    {/* Tags */}
                    {selectedQuestion.question.tags && selectedQuestion.question.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 items-center mt-3">
                        {selectedQuestion.question.tags
                          .filter((tag: string) => knownCompanies.has(tag))
                          .map((company: string) => (
                            <div
                              key={company}
                              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20"
                            >
                              <CompanyLogo company={company} size={16} />
                              <span className="text-xs font-medium text-blue-400">{company}</span>
                            </div>
                          ))}
                        {selectedQuestion.question.tags
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

                {/* Session Progress */}
                {practiceMode === 'session' && sessionQuestions.length > 0 && (
                  <div className={`p-4 rounded-lg ${themeClasses.bgTertiary}/50 border ${themeClasses.borderSecondary}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm ${themeClasses.textSecondary}`}>Session Progress</span>
                      <span className={`text-sm font-bold ${themeClasses.text}`}>
                        {currentSessionIndex + 1} / {sessionQuestions.length}
                      </span>
                    </div>
                    <div className={`w-full h-2 ${themeClasses.bgTertiary} rounded-full overflow-hidden`}>
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                        style={{ width: `${((currentSessionIndex + 1) / sessionQuestions.length) * 100}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center gap-3 flex-wrap">
                  <button
                    onClick={handleShuffle}
                    className={`flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2`}
                  >
                    <Shuffle className="w-5 h-5" />
                    {practiceMode === 'session' && sessionQuestions.length === 0
                      ? 'Start Session'
                      : 'Shuffle'}
                  </button>
                  
                  {practiceMode === 'session' && sessionQuestions.length > 0 && (
                    <button
                      onClick={handleNext}
                      disabled={currentSessionIndex >= sessionQuestions.length - 1}
                      className={`px-6 py-3 rounded-xl ${themeClasses.bgTertiary} ${themeClasses.textSecondary} font-semibold hover:${themeClasses.text} ${themeClasses.bgHover} transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      <SkipForward className="w-5 h-5" />
                      Next
                    </button>
                  )}

                  <button
                    onClick={() => {
                      onNavigateToQuestion(selectedQuestion.moduleId, selectedQuestion.questionIndex);
                      onClose();
                    }}
                    className={`px-6 py-3 rounded-xl border-2 border-purple-500/50 bg-purple-500/10 ${themeClasses.textSecondary} font-semibold hover:bg-purple-500/20 transition-colors flex items-center gap-2`}
                  >
                    <Target className="w-5 h-5" />
                    Go to Question
                  </button>

                  {practiceMode !== 'marathon' && (
                    <button
                      onClick={() => setIsAutoPlay(!isAutoPlay)}
                      className={`px-4 py-3 rounded-xl ${themeClasses.bgTertiary} ${themeClasses.textSecondary} ${themeClasses.bgHover} transition-colors`}
                    >
                      {isAutoPlay ? (
                        <Pause className="w-5 h-5" />
                      ) : (
                        <Play className="w-5 h-5" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Shuffle className={`w-16 h-16 ${themeClasses.textDim} mx-auto mb-4 opacity-50`} />
                <p className={`${themeClasses.textMuted} text-lg mb-2`}>No questions found</p>
                <p className={`${themeClasses.textDim} text-sm`}>
                  Try adjusting your filters to see more questions
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Stats */}
        <div className={`p-4 border-t ${themeClasses.borderSecondary} ${themeClasses.bgTertiary}/30 flex items-center justify-between text-xs ${themeClasses.textDim} flex-wrap gap-2`}>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <BarChart3 className="w-3 h-3" />
              {filteredCount} available
            </span>
            {practiceMode === 'session' && (
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                {sessionStats.viewed} viewed
              </span>
            )}
          </div>
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Random Practice Mode
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RandomQuestionSelector;

