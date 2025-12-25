'use client';
import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Play,
  RotateCcw,
  Trophy,
  Clock,
  Flame,
  Target,
  ChevronLeft,
  ChevronRight,
  Zap,
  Medal,
  Crown,
  Star,
  Eye,
  EyeOff,
  Maximize2,
  Minimize2,
  RefreshCw,
  Award,
  TrendingUp,
  Users,
  Code2,
  Palette,
  Layers,
  Sparkles,
} from 'lucide-react';

// ==================== TYPES ====================
interface CSSChallenge {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  targetHTML: string;
  targetCSS: string;
  starterCSS: string;
  dimensions: { width: number; height: number };
  tips: string[];
  minCharacterTarget?: number; // For golf scoring
}

interface LeaderboardEntry {
  id: string;
  username: string;
  score: number;
  characters: number;
  time: string;
  avatar: string;
}

interface ChallengeScore {
  challengeId: string;
  score: number;
  characters: number;
  timestamp: number;
  css: string;
}

// ==================== THEME CLASSES ====================
const getThemeClasses = (isDarkMode: boolean) => ({
  bg: isDarkMode ? 'bg-slate-950' : 'bg-white',
  bgSecondary: isDarkMode ? 'bg-slate-900' : 'bg-slate-50',
  bgTertiary: isDarkMode ? 'bg-slate-800' : 'bg-slate-100',
  text: isDarkMode ? 'text-white' : 'text-slate-900',
  textSecondary: isDarkMode ? 'text-slate-300' : 'text-slate-600',
  textMuted: isDarkMode ? 'text-slate-400' : 'text-slate-500',
  textDim: isDarkMode ? 'text-slate-500' : 'text-slate-400',
  border: isDarkMode ? 'border-slate-800' : 'border-slate-200',
  borderSecondary: isDarkMode ? 'border-slate-700' : 'border-slate-300',
});

// ==================== CSS CHALLENGES DATA ====================
const CSS_CHALLENGES: CSSChallenge[] = [
  {
    id: 'simple-square',
    title: 'Simply Square',
    difficulty: 'Easy',
    category: 'Basics',
    dimensions: { width: 400, height: 300 },
    targetHTML: '<div class="target"></div>',
    targetCSS: `body {
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  background: #5d3a3a;
}
.target {
  width: 200px;
  height: 200px;
  background: #b5e0ba;
}`,
    starterCSS: `/* Create a 200x200 square in the center */
body {
  margin: 0;
  background: #5d3a3a;
}`,
    tips: [
      'Use flexbox to center the element',
      'Set display: flex on body',
      'Use align-items and justify-content',
    ],
    minCharacterTarget: 80,
  },
  {
    id: 'centered-circle',
    title: 'Centered Circle',
    difficulty: 'Easy',
    category: 'Basics',
    dimensions: { width: 400, height: 300 },
    targetHTML: '<div class="target"></div>',
    targetCSS: `body {
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  background: #62306d;
}
.target {
  width: 150px;
  height: 150px;
  background: #f7ec7d;
  border-radius: 50%;
}`,
    starterCSS: `/* Create a 150x150 yellow circle */
body {
  margin: 0;
  background: #62306d;
}`,
    tips: [
      'Use border-radius: 50% for circles',
      'Center using flexbox',
      'Match the exact dimensions',
    ],
    minCharacterTarget: 100,
  },
  {
    id: 'eye-of-sauron',
    title: 'Eye of Sauron',
    difficulty: 'Medium',
    category: 'Shapes',
    dimensions: { width: 400, height: 300 },
    targetHTML: '<div class="outer"><div class="middle"><div class="inner"></div></div></div>',
    targetCSS: `body {
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  background: #191919;
}
.outer {
  width: 200px;
  height: 200px;
  background: #d35400;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.middle {
  width: 140px;
  height: 140px;
  background: #191919;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.inner {
  width: 60px;
  height: 60px;
  background: #d35400;
  border-radius: 50%;
}`,
    starterCSS: `/* Nested circles - orange, black, orange */
body {
  margin: 0;
  background: #191919;
}`,
    tips: [
      'Use nested divs with border-radius',
      'Center each element within its parent',
      'Outer: 200px, Middle: 140px, Inner: 60px',
    ],
    minCharacterTarget: 200,
  },
  {
    id: 'push-button',
    title: 'Push Button',
    difficulty: 'Medium',
    category: 'Shadows',
    dimensions: { width: 400, height: 300 },
    targetHTML: '<div class="button"></div>',
    targetCSS: `body {
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  background: #6592cf;
}
.button {
  width: 150px;
  height: 150px;
  background: #243d83;
  border-radius: 50%;
  box-shadow: 
    0 10px 0 #1a2b5c,
    0 15px 25px rgba(0,0,0,0.3);
}`,
    starterCSS: `/* Create a 3D push button effect */
body {
  margin: 0;
  background: #6592cf;
}`,
    tips: [
      'Use box-shadow for 3D effect',
      'Multiple shadows create depth',
      'The button has a "pressed" look from shadow',
    ],
    minCharacterTarget: 150,
  },
  {
    id: 'gradient-sunset',
    title: 'Gradient Sunset',
    difficulty: 'Easy',
    category: 'Gradients',
    dimensions: { width: 400, height: 300 },
    targetHTML: '<div class="target"><div class="sun"></div></div>',
    targetCSS: `body {
  margin: 0;
}
.target {
  width: 400px;
  height: 300px;
  background: linear-gradient(#f06, #ff6, #0ff);
  position: relative;
}
.sun {
  position: absolute;
  width: 80px;
  height: 80px;
  background: #fff;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 40px 20px rgba(255,255,255,0.5);
}`,
    starterCSS: `/* Create a sunset gradient with a glowing sun */
body {
  margin: 0;
}`,
    tips: [
      'Use linear-gradient for the sky',
      'Create a white circle for the sun',
      'Add a glow effect with box-shadow',
    ],
    minCharacterTarget: 180,
  },
  {
    id: 'stacked-triangles',
    title: 'Stacked Triangles',
    difficulty: 'Hard',
    category: 'Shapes',
    dimensions: { width: 400, height: 300 },
    targetHTML: '<div class="container"><div class="tri1"></div><div class="tri2"></div><div class="tri3"></div></div>',
    targetCSS: `body {
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  background: #0b2429;
}
.container {
  position: relative;
  width: 200px;
  height: 200px;
}
.tri1, .tri2, .tri3 {
  position: absolute;
  width: 0;
  height: 0;
  left: 50%;
  transform: translateX(-50%);
}
.tri1 {
  border-left: 100px solid transparent;
  border-right: 100px solid transparent;
  border-bottom: 200px solid #1a4341;
  bottom: 0;
}
.tri2 {
  border-left: 70px solid transparent;
  border-right: 70px solid transparent;
  border-bottom: 140px solid #2a6463;
  bottom: 0;
}
.tri3 {
  border-left: 40px solid transparent;
  border-right: 40px solid transparent;
  border-bottom: 80px solid #3e8b8a;
  bottom: 0;
}`,
    starterCSS: `/* Create stacked triangles (mountains) */
body {
  margin: 0;
  background: #0b2429;
}`,
    tips: [
      'Create triangles using border trick',
      'Stack them with position: absolute',
      'Larger triangles in back, smaller in front',
    ],
    minCharacterTarget: 350,
  },
  {
    id: 'yin-yang',
    title: 'Yin Yang',
    difficulty: 'Hard',
    category: 'Shapes',
    dimensions: { width: 400, height: 300 },
    targetHTML: '<div class="circle"><div class="dot1"></div><div class="dot2"></div></div>',
    targetCSS: `body {
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  background: #e9e9e9;
}
.circle {
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: linear-gradient(to right, #000 50%, #fff 50%);
  box-shadow: 0 0 0 4px #000;
}
.circle::before, .circle::after {
  content: '';
  position: absolute;
  width: 75px;
  height: 75px;
  border-radius: 50%;
  left: 50%;
  transform: translateX(-50%);
}
.circle::before {
  top: 0;
  background: #000;
}
.circle::after {
  bottom: 0;
  background: #fff;
}
.dot1, .dot2 {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
}
.dot1 {
  top: 27.5px;
  background: #fff;
}
.dot2 {
  bottom: 27.5px;
  background: #000;
}`,
    starterCSS: `/* Create the Yin Yang symbol */
body {
  margin: 0;
  background: #e9e9e9;
}`,
    tips: [
      'Use gradient for the split',
      'Pseudo-elements for the curved parts',
      'Small dots in opposite colors',
    ],
    minCharacterTarget: 400,
  },
  {
    id: 'checkerboard',
    title: 'Checkerboard',
    difficulty: 'Medium',
    category: 'Patterns',
    dimensions: { width: 400, height: 300 },
    targetHTML: '<div class="board"></div>',
    targetCSS: `body {
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  background: #1a1a2e;
}
.board {
  width: 200px;
  height: 200px;
  background: 
    repeating-conic-gradient(
      #f3d2c1 0deg 90deg,
      #8a5a44 90deg 180deg
    ) 0 0/50px 50px;
}`,
    starterCSS: `/* Create a checkerboard pattern */
body {
  margin: 0;
  background: #1a1a2e;
}`,
    tips: [
      'Use repeating-conic-gradient',
      'Or use background with multiple gradients',
      'Pattern should repeat in 50px squares',
    ],
    minCharacterTarget: 120,
  },
];

// Mock leaderboard data
const MOCK_LEADERBOARD: Record<string, LeaderboardEntry[]> = {
  'simple-square': [
    { id: '1', username: 'CSSNinja', score: 100, characters: 72, time: '0:42', avatar: '🥷' },
    { id: '2', username: 'PixelPerfect', score: 100, characters: 78, time: '0:58', avatar: '🎨' },
    { id: '3', username: 'StyleMaster', score: 99.8, characters: 85, time: '1:12', avatar: '✨' },
    { id: '4', username: 'FlexboxFan', score: 99.5, characters: 92, time: '1:45', avatar: '📦' },
    { id: '5', username: 'CodeArtist', score: 99.2, characters: 110, time: '2:01', avatar: '🎯' },
  ],
  'centered-circle': [
    { id: '1', username: 'RoundAbout', score: 100, characters: 88, time: '0:55', avatar: '⭕' },
    { id: '2', username: 'CSSNinja', score: 100, characters: 95, time: '1:02', avatar: '🥷' },
    { id: '3', username: 'BorderRadius', score: 99.9, characters: 102, time: '1:15', avatar: '🔵' },
  ],
};

// Generate mock leaderboard for challenges without data
const getLeaderboard = (challengeId: string): LeaderboardEntry[] => {
  if (MOCK_LEADERBOARD[challengeId]) {
    return MOCK_LEADERBOARD[challengeId];
  }
  // Generate random leaderboard
  return [
    { id: '1', username: 'TopCoder', score: 98.5, characters: 150, time: '2:30', avatar: '🏆' },
    { id: '2', username: 'CSSWizard', score: 97.2, characters: 175, time: '3:15', avatar: '🧙' },
    { id: '3', username: 'StylePro', score: 95.8, characters: 200, time: '4:02', avatar: '💫' },
  ];
};

// ==================== COMPONENT ====================
interface CSSBattleProps {
  onClose: () => void;
  isDarkMode?: boolean;
}

const CSSBattle: React.FC<CSSBattleProps> = ({ onClose, isDarkMode = true }) => {
  const themeClasses = getThemeClasses(isDarkMode);
  
  // State
  const [selectedChallenge, setSelectedChallenge] = useState<CSSChallenge | null>(null);
  const [userCSS, setUserCSS] = useState('');
  const [score, setScore] = useState<number | null>(null);
  const [isComparing, setIsComparing] = useState(false);
  const [showTarget, setShowTarget] = useState(true);
  const [showDiff, setShowDiff] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState<'challenges' | 'leaderboard'>('challenges');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('All');
  const [challengeScores, setChallengeScores] = useState<Record<string, ChallengeScore>>({});
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  
  const targetCanvasRef = useRef<HTMLCanvasElement>(null);
  const userCanvasRef = useRef<HTMLCanvasElement>(null);
  const targetIframeRef = useRef<HTMLIFrameElement>(null);
  const userIframeRef = useRef<HTMLIFrameElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Load saved scores from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('css_battle_scores');
      if (saved) {
        setChallengeScores(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Error loading scores:', e);
    }
  }, []);

  // Save scores to localStorage
  useEffect(() => {
    localStorage.setItem('css_battle_scores', JSON.stringify(challengeScores));
  }, [challengeScores]);

  // Timer effect
  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning]);

  // Character count effect
  useEffect(() => {
    const cleanCSS = userCSS.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').trim();
    setCharCount(cleanCSS.length);
  }, [userCSS]);

  // Format time
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Select a challenge
  const selectChallenge = useCallback((challenge: CSSChallenge) => {
    setSelectedChallenge(challenge);
    setUserCSS(challenge.starterCSS);
    setScore(null);
    setShowDiff(false);
    setShowSolution(false);
    setTimeElapsed(0);
    setIsTimerRunning(true);
  }, []);

  // Back to challenge list
  const backToList = useCallback(() => {
    setSelectedChallenge(null);
    setIsTimerRunning(false);
    setScore(null);
  }, []);

  // Reset code
  const resetCode = useCallback(() => {
    if (selectedChallenge) {
      setUserCSS(selectedChallenge.starterCSS);
      setScore(null);
      setShowDiff(false);
    }
  }, [selectedChallenge]);

  // Generate iframe HTML
  const generateIframeHTML = useCallback((html: string, css: string) => {
    return `<!DOCTYPE html>
<html>
<head>
  <style>${css}</style>
</head>
<body>${html}</body>
</html>`;
  }, []);

  // Calculate pixel difference between two canvases
  const calculateScore = useCallback(async () => {
    if (!selectedChallenge || !targetIframeRef.current || !userIframeRef.current) return;
    
    setIsComparing(true);

    // Give iframes time to render
    await new Promise(resolve => setTimeout(resolve, 300));

    try {
      const { width, height } = selectedChallenge.dimensions;
      
      // Create canvases for comparison
      const targetCanvas = document.createElement('canvas');
      const userCanvas = document.createElement('canvas');
      targetCanvas.width = width;
      targetCanvas.height = height;
      userCanvas.width = width;
      userCanvas.height = height;

      const targetCtx = targetCanvas.getContext('2d');
      const userCtx = userCanvas.getContext('2d');

      if (!targetCtx || !userCtx) {
        throw new Error('Could not get canvas context');
      }

      // Use html2canvas approach with iframe screenshots
      // For now, we'll use a simplified scoring based on CSS similarity
      // In production, you'd want to use html2canvas or similar library
      
      // Simplified scoring based on CSS properties matching
      const targetCSS = selectedChallenge.targetCSS.toLowerCase();
      const userCSSLower = userCSS.toLowerCase();
      
      // Check for key properties
      const keyProperties = [
        'background',
        'width',
        'height',
        'border-radius',
        'display',
        'flex',
        'align-items',
        'justify-content',
        'position',
        'margin',
        'padding',
        'box-shadow',
        'gradient',
      ];

      let matches = 0;
      let total = 0;

      keyProperties.forEach(prop => {
        if (targetCSS.includes(prop)) {
          total++;
          if (userCSSLower.includes(prop)) {
            matches++;
          }
        }
      });

      // Extract colors from target and check if user has them
      const colorRegex = /#[a-f0-9]{3,6}|rgba?\([^)]+\)/gi;
      const targetColors = targetCSS.match(colorRegex) || [];
      const userColors = userCSSLower.match(colorRegex) || [];

      targetColors.forEach(color => {
        total++;
        if (userColors.some(uc => uc.toLowerCase() === color.toLowerCase())) {
          matches++;
        }
      });

      // Calculate base score
      const baseScore = total > 0 ? (matches / total) * 100 : 0;
      
      // Add bonus for code golf (shorter code)
      const minChars = selectedChallenge.minCharacterTarget || 100;
      const golfBonus = charCount <= minChars ? 5 : Math.max(0, 5 - (charCount - minChars) * 0.02);
      
      const finalScore = Math.min(100, baseScore + golfBonus);
      
      setScore(Math.round(finalScore * 10) / 10);
      setIsTimerRunning(false);

      // Save score if it's a new high score
      const existingScore = challengeScores[selectedChallenge.id];
      if (!existingScore || finalScore > existingScore.score) {
        setChallengeScores(prev => ({
          ...prev,
          [selectedChallenge.id]: {
            challengeId: selectedChallenge.id,
            score: finalScore,
            characters: charCount,
            timestamp: Date.now(),
            css: userCSS,
          },
        }));
      }
    } catch (error) {
      console.error('Error calculating score:', error);
      setScore(0);
    } finally {
      setIsComparing(false);
    }
  }, [selectedChallenge, userCSS, charCount, challengeScores]);

  // Get difficulty config
  const getDifficultyConfig = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return { bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/30' };
      case 'Medium':
        return { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30' };
      case 'Hard':
        return { bg: 'bg-rose-500/20', text: 'text-rose-400', border: 'border-rose-500/30' };
      default:
        return { bg: 'bg-slate-500/20', text: 'text-slate-400', border: 'border-slate-500/30' };
    }
  };

  // Filter challenges
  const filteredChallenges = useMemo(() => {
    if (filterDifficulty === 'All') return CSS_CHALLENGES;
    return CSS_CHALLENGES.filter(c => c.difficulty === filterDifficulty);
  }, [filterDifficulty]);

  // Calculate overall stats
  const stats = useMemo(() => {
    const completedChallenges = Object.values(challengeScores).filter(s => s.score >= 90);
    const totalScore = Object.values(challengeScores).reduce((sum, s) => sum + s.score, 0);
    const avgScore = Object.keys(challengeScores).length > 0 
      ? totalScore / Object.keys(challengeScores).length 
      : 0;
    
    return {
      completed: completedChallenges.length,
      total: CSS_CHALLENGES.length,
      avgScore: Math.round(avgScore * 10) / 10,
      perfectScores: Object.values(challengeScores).filter(s => s.score === 100).length,
    };
  }, [challengeScores]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className={`relative ${isFullscreen ? 'w-full h-full' : 'w-[95vw] h-[90vh] max-w-7xl'} ${themeClasses.bg} rounded-2xl overflow-hidden shadow-2xl flex flex-col`}
      >
        {/* Header */}
        <div className={`flex items-center justify-between px-6 py-4 border-b ${themeClasses.border} ${themeClasses.bgSecondary}`}>
          <div className="flex items-center gap-4">
            {selectedChallenge && (
              <button
                onClick={backToList}
                className={`p-2 rounded-lg ${themeClasses.bgTertiary} hover:bg-fuchsia-500/20 transition-colors`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-fuchsia-500 via-purple-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-fuchsia-500/25">
                <Palette className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className={`text-xl font-bold ${themeClasses.text}`}>
                  {selectedChallenge ? selectedChallenge.title : 'CSS Battle'}
                </h1>
                <p className={`text-xs ${themeClasses.textMuted}`}>
                  {selectedChallenge 
                    ? `${selectedChallenge.difficulty} • ${selectedChallenge.category}`
                    : 'Master CSS with pixel-perfect challenges'
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {selectedChallenge && (
              <>
                {/* Timer */}
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${themeClasses.bgTertiary}`}>
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span className={`font-mono text-sm ${themeClasses.text}`}>{formatTime(timeElapsed)}</span>
                </div>
                
                {/* Character count */}
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${themeClasses.bgTertiary}`}>
                  <Code2 className="w-4 h-4 text-purple-400" />
                  <span className={`font-mono text-sm ${themeClasses.text}`}>{charCount} chars</span>
                </div>

                {/* Score */}
                {score !== null && (
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${
                    score >= 90 ? 'bg-emerald-500/20' : score >= 70 ? 'bg-amber-500/20' : 'bg-rose-500/20'
                  }`}>
                    <Target className={`w-4 h-4 ${score >= 90 ? 'text-emerald-400' : score >= 70 ? 'text-amber-400' : 'text-rose-400'}`} />
                    <span className={`font-bold ${score >= 90 ? 'text-emerald-400' : score >= 70 ? 'text-amber-400' : 'text-rose-400'}`}>
                      {score}%
                    </span>
                  </div>
                )}
              </>
            )}

            {/* Stats (when in list view) */}
            {!selectedChallenge && (
              <div className="flex items-center gap-4">
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${themeClasses.bgTertiary}`}>
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span className={`text-sm ${themeClasses.text}`}>{stats.completed}/{stats.total}</span>
                </div>
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${themeClasses.bgTertiary}`}>
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span className={`text-sm ${themeClasses.text}`}>{stats.avgScore}% avg</span>
                </div>
              </div>
            )}

            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className={`p-2 rounded-lg ${themeClasses.bgTertiary} hover:bg-purple-500/20 transition-colors`}
            >
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg ${themeClasses.bgTertiary} hover:bg-rose-500/20 transition-colors`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {!selectedChallenge ? (
            // Challenge List View
            <div className="h-full flex">
              {/* Main Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {/* Tab Navigation */}
                <div className="flex items-center gap-4 mb-6">
                  <button
                    onClick={() => setActiveTab('challenges')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      activeTab === 'challenges'
                        ? 'bg-gradient-to-r from-fuchsia-500 to-purple-500 text-white'
                        : `${themeClasses.bgTertiary} ${themeClasses.textSecondary}`
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4" />
                      Challenges
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveTab('leaderboard')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      activeTab === 'leaderboard'
                        ? 'bg-gradient-to-r from-fuchsia-500 to-purple-500 text-white'
                        : `${themeClasses.bgTertiary} ${themeClasses.textSecondary}`
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Leaderboard
                    </div>
                  </button>
                </div>

                {activeTab === 'challenges' ? (
                  <>
                    {/* Difficulty Filter */}
                    <div className="flex items-center gap-2 mb-6">
                      {['All', 'Easy', 'Medium', 'Hard'].map(diff => (
                        <button
                          key={diff}
                          onClick={() => setFilterDifficulty(diff)}
                          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                            filterDifficulty === diff
                              ? diff === 'All'
                                ? 'bg-fuchsia-500 text-white'
                                : getDifficultyConfig(diff).bg + ' ' + getDifficultyConfig(diff).text
                              : `${themeClasses.bgTertiary} ${themeClasses.textMuted}`
                          }`}
                        >
                          {diff}
                        </button>
                      ))}
                    </div>

                    {/* Challenge Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredChallenges.map(challenge => {
                        const diffConfig = getDifficultyConfig(challenge.difficulty);
                        const savedScore = challengeScores[challenge.id];
                        const isCompleted = savedScore && savedScore.score >= 90;
                        const isPerfect = savedScore && savedScore.score === 100;

                        return (
                          <motion.button
                            key={challenge.id}
                            onClick={() => selectChallenge(challenge)}
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className={`relative text-left p-4 rounded-xl border ${themeClasses.border} ${themeClasses.bgSecondary} hover:border-fuchsia-500/50 transition-all group overflow-hidden`}
                          >
                            {/* Completion Badge */}
                            {isCompleted && (
                              <div className="absolute top-3 right-3">
                                <div className={`w-6 h-6 rounded-full ${isPerfect ? 'bg-amber-500' : 'bg-emerald-500'} flex items-center justify-center`}>
                                  {isPerfect ? <Crown className="w-3.5 h-3.5 text-white" /> : <Star className="w-3.5 h-3.5 text-white" />}
                                </div>
                              </div>
                            )}

                            {/* Preview */}
                            <div className={`relative aspect-[4/3] rounded-lg mb-3 overflow-hidden ${themeClasses.bgTertiary}`}>
                              <iframe
                                srcDoc={generateIframeHTML(challenge.targetHTML, challenge.targetCSS)}
                                className="w-full h-full pointer-events-none"
                                title={challenge.title}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>

                            {/* Info */}
                            <div className="flex items-start gap-3">
                              <div className={`w-8 h-8 rounded-lg ${diffConfig.bg} flex items-center justify-center flex-shrink-0`}>
                                {challenge.difficulty === 'Easy' && <Zap className={`w-4 h-4 ${diffConfig.text}`} />}
                                {challenge.difficulty === 'Medium' && <Flame className={`w-4 h-4 ${diffConfig.text}`} />}
                                {challenge.difficulty === 'Hard' && <Target className={`w-4 h-4 ${diffConfig.text}`} />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className={`font-semibold ${themeClasses.text} group-hover:text-fuchsia-400 transition-colors truncate`}>
                                  {challenge.title}
                                </h3>
                                <p className={`text-xs ${themeClasses.textMuted}`}>{challenge.category}</p>
                              </div>
                            </div>

                            {/* Stats */}
                            <div className="flex items-center gap-2 mt-3 flex-wrap">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${diffConfig.bg} ${diffConfig.text}`}>
                                {challenge.difficulty}
                              </span>
                              {savedScore && (
                                <span className={`text-[10px] ${themeClasses.textMuted}`}>
                                  Best: {savedScore.score}% • {savedScore.characters} chars
                                </span>
                              )}
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  // Global Leaderboard
                  <div className="max-w-2xl mx-auto">
                    <div className={`rounded-xl border ${themeClasses.border} overflow-hidden`}>
                      <div className={`px-4 py-3 ${themeClasses.bgTertiary} border-b ${themeClasses.border}`}>
                        <h3 className={`font-semibold ${themeClasses.text} flex items-center gap-2`}>
                          <Trophy className="w-5 h-5 text-amber-400" />
                          Global Rankings
                        </h3>
                      </div>
                      <div className="divide-y divide-slate-800">
                        {Array.from({ length: 10 }).map((_, i) => (
                          <div
                            key={i}
                            className={`flex items-center gap-4 px-4 py-3 ${i < 3 ? themeClasses.bgSecondary : ''}`}
                          >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                              i === 0 ? 'bg-amber-500 text-amber-900' :
                              i === 1 ? 'bg-slate-400 text-slate-900' :
                              i === 2 ? 'bg-amber-700 text-amber-200' :
                              `${themeClasses.bgTertiary} ${themeClasses.textMuted}`
                            }`}>
                              {i + 1}
                            </div>
                            <div className="text-2xl">{['🥷', '🎨', '✨', '📦', '🎯', '⭐', '🔥', '💎', '🚀', '🌟'][i]}</div>
                            <div className="flex-1">
                              <p className={`font-medium ${themeClasses.text}`}>
                                {['CSSNinja', 'PixelPerfect', 'StyleMaster', 'FlexboxFan', 'CodeArtist', 'GridGuru', 'AnimationAce', 'LayoutLord', 'SelectorSage', 'CascadeCraft'][i]}
                              </p>
                              <p className={`text-xs ${themeClasses.textMuted}`}>
                                {8 - Math.floor(i * 0.5)} challenges completed
                              </p>
                            </div>
                            <div className="text-right">
                              <p className={`font-bold ${themeClasses.text}`}>{(1000 - i * 75).toLocaleString()} pts</p>
                              <p className={`text-xs ${themeClasses.textMuted}`}>Avg: {(100 - i * 1.5).toFixed(1)}%</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar - Your Stats */}
              <div className={`w-80 border-l ${themeClasses.border} ${themeClasses.bgSecondary} p-4 hidden lg:block overflow-y-auto`}>
                <h3 className={`font-semibold ${themeClasses.text} mb-4 flex items-center gap-2`}>
                  <Award className="w-5 h-5 text-fuchsia-400" />
                  Your Stats
                </h3>

                {/* Stats Cards */}
                <div className="space-y-3 mb-6">
                  <div className={`p-4 rounded-xl ${themeClasses.bgTertiary}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm ${themeClasses.textMuted}`}>Progress</span>
                      <span className={`font-bold ${themeClasses.text}`}>{stats.completed}/{stats.total}</span>
                    </div>
                    <div className={`h-2 rounded-full ${themeClasses.bg} overflow-hidden`}>
                      <div 
                        className="h-full bg-gradient-to-r from-fuchsia-500 to-purple-500 transition-all duration-500"
                        style={{ width: `${(stats.completed / stats.total) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className={`p-4 rounded-xl ${themeClasses.bgTertiary} flex items-center justify-between`}>
                    <div>
                      <p className={`text-sm ${themeClasses.textMuted}`}>Average Score</p>
                      <p className={`text-2xl font-bold ${themeClasses.text}`}>{stats.avgScore}%</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-500 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  <div className={`p-4 rounded-xl ${themeClasses.bgTertiary} flex items-center justify-between`}>
                    <div>
                      <p className={`text-sm ${themeClasses.textMuted}`}>Perfect Scores</p>
                      <p className={`text-2xl font-bold text-amber-400`}>{stats.perfectScores}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                      <Crown className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <h4 className={`font-medium ${themeClasses.textSecondary} mb-3 text-sm`}>Recent Activity</h4>
                <div className="space-y-2">
                  {Object.entries(challengeScores)
                    .sort(([, a], [, b]) => b.timestamp - a.timestamp)
                    .slice(0, 5)
                    .map(([id, score]) => {
                      const challenge = CSS_CHALLENGES.find(c => c.id === id);
                      if (!challenge) return null;
                      return (
                        <div
                          key={id}
                          className={`p-3 rounded-lg ${themeClasses.bgTertiary} flex items-center gap-3`}
                        >
                          <div className={`w-8 h-8 rounded-lg ${getDifficultyConfig(challenge.difficulty).bg} flex items-center justify-center`}>
                            {score.score >= 100 ? (
                              <Crown className="w-4 h-4 text-amber-400" />
                            ) : score.score >= 90 ? (
                              <Star className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <Target className="w-4 h-4 text-slate-400" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-medium ${themeClasses.text} truncate`}>{challenge.title}</p>
                            <p className={`text-xs ${themeClasses.textMuted}`}>{score.characters} chars</p>
                          </div>
                          <span className={`font-bold text-sm ${score.score >= 90 ? 'text-emerald-400' : 'text-amber-400'}`}>
                            {score.score}%
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          ) : (
            // Challenge View
            <div className="h-full flex flex-col lg:flex-row">
              {/* Left Panel - Target & Tips */}
              <div className={`w-full lg:w-2/5 border-b lg:border-b-0 lg:border-r ${themeClasses.border} flex flex-col`}>
                {/* View Toggle */}
                <div className={`flex items-center gap-2 px-4 py-2 border-b ${themeClasses.border} ${themeClasses.bgSecondary}`}>
                  <button
                    onClick={() => setShowTarget(true)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                      showTarget ? 'bg-fuchsia-500 text-white' : `${themeClasses.bgTertiary} ${themeClasses.textMuted}`
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      <Target className="w-3.5 h-3.5" />
                      Target
                    </div>
                  </button>
                  <button
                    onClick={() => setShowTarget(false)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                      !showTarget ? 'bg-fuchsia-500 text-white' : `${themeClasses.bgTertiary} ${themeClasses.textMuted}`
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5" />
                      Compare
                    </div>
                  </button>
                  <button
                    onClick={() => setShowDiff(!showDiff)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                      showDiff ? 'bg-rose-500 text-white' : `${themeClasses.bgTertiary} ${themeClasses.textMuted}`
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      {showDiff ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      Diff
                    </div>
                  </button>
                </div>

                {/* Preview Area - Fixed height for better visibility */}
                <div className="p-4 min-h-[280px] h-[280px]">
                  <div className="relative h-full">
                    {showTarget ? (
                      // Target Preview
                      <div className={`rounded-xl overflow-hidden border-2 border-fuchsia-500/50 h-full flex flex-col`}>
                        <div className={`px-3 py-1.5 ${themeClasses.bgTertiary} border-b ${themeClasses.border} text-xs font-medium ${themeClasses.textMuted} flex-shrink-0`}>
                          🎯 Target Design
                        </div>
                        <div className="bg-gray-800 flex-1 flex items-center justify-center overflow-hidden">
                          <iframe
                            ref={targetIframeRef}
                            srcDoc={generateIframeHTML(selectedChallenge.targetHTML, selectedChallenge.targetCSS)}
                            className="border-0"
                            title="Target"
                            style={{ 
                              width: selectedChallenge.dimensions.width,
                              height: selectedChallenge.dimensions.height,
                              transform: 'scale(0.75)',
                              transformOrigin: 'center center',
                            }}
                          />
                        </div>
                      </div>
                    ) : (
                      // Side by Side Comparison
                      <div className="grid grid-cols-2 gap-2 h-full">
                        <div className={`rounded-xl overflow-hidden border ${themeClasses.border} flex flex-col`}>
                          <div className={`px-3 py-1.5 ${themeClasses.bgTertiary} border-b ${themeClasses.border} text-xs font-medium ${themeClasses.textMuted} flex-shrink-0`}>
                            Target
                          </div>
                          <div className="bg-gray-800 flex-1 flex items-center justify-center overflow-hidden">
                            <iframe
                              srcDoc={generateIframeHTML(selectedChallenge.targetHTML, selectedChallenge.targetCSS)}
                              className="border-0"
                              title="Target"
                              style={{ 
                                width: selectedChallenge.dimensions.width,
                                height: selectedChallenge.dimensions.height,
                                transform: 'scale(0.5)',
                                transformOrigin: 'center center',
                              }}
                            />
                          </div>
                        </div>
                        <div className={`rounded-xl overflow-hidden border ${themeClasses.border} flex flex-col`}>
                          <div className={`px-3 py-1.5 ${themeClasses.bgTertiary} border-b ${themeClasses.border} text-xs font-medium ${themeClasses.textMuted} flex-shrink-0`}>
                            Your Output
                          </div>
                          <div className="bg-gray-800 flex-1 flex items-center justify-center overflow-hidden">
                            <iframe
                              srcDoc={generateIframeHTML(selectedChallenge.targetHTML, userCSS)}
                              className="border-0"
                              title="Output"
                              style={{ 
                                width: selectedChallenge.dimensions.width,
                                height: selectedChallenge.dimensions.height,
                                transform: 'scale(0.5)',
                                transformOrigin: 'center center',
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Diff Overlay */}
                    {showDiff && (
                      <div className="absolute inset-0 bg-black/80 rounded-xl flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-6xl mb-4">🔍</div>
                          <p className={`text-lg font-medium ${themeClasses.text}`}>Difference View</p>
                          <p className={`text-sm ${themeClasses.textMuted}`}>Click "Compare" to see side-by-side</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Scrollable Info Section - Tips, Solution, Leaderboard */}
                <div className="flex-1 overflow-y-auto border-t border-slate-700/50">
                  {/* Tips Section */}
                  <div className={`p-4`}>
                    <h3 className={`text-sm font-semibold ${themeClasses.text} mb-2 flex items-center gap-2`}>
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      Tips
                    </h3>
                  <ul className="space-y-1">
                    {selectedChallenge.tips.map((tip, i) => (
                      <li key={i} className={`text-xs ${themeClasses.textMuted} flex items-start gap-2`}>
                        <span className="text-fuchsia-400">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                  {selectedChallenge.minCharacterTarget && (
                    <div className={`mt-3 p-2 rounded-lg ${themeClasses.bgTertiary} flex items-center gap-2`}>
                      <Medal className="w-4 h-4 text-amber-400" />
                      <span className={`text-xs ${themeClasses.textMuted}`}>
                        Code golf target: <span className="text-amber-400 font-bold">{selectedChallenge.minCharacterTarget}</span> characters
                      </span>
                    </div>
                  )}

                  {/* Show Solution Toggle */}
                  <div className="mt-4 pt-3 border-t border-slate-700/50">
                    <button
                      onClick={() => setShowSolution(!showSolution)}
                      className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                        showSolution ? 'text-fuchsia-400' : themeClasses.textMuted
                      } hover:text-fuchsia-400`}
                    >
                      {showSolution ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      {showSolution ? 'Hide Solution' : 'Show Solution'}
                    </button>
                    
                    <AnimatePresence>
                      {showSolution && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 overflow-hidden"
                        >
                          <div className={`rounded-lg border ${themeClasses.border} overflow-hidden`}>
                            <div className={`px-3 py-2 ${themeClasses.bgTertiary} border-b ${themeClasses.border} flex items-center justify-between`}>
                              <div className="flex items-center gap-2">
                                <Sparkles className="w-3.5 h-3.5 text-fuchsia-400" />
                                <span className={`text-xs font-medium ${themeClasses.textMuted}`}>Solution CSS</span>
                              </div>
                              <button
                                onClick={() => {
                                  setUserCSS(selectedChallenge.targetCSS);
                                  setShowSolution(false);
                                }}
                                className="text-[10px] px-2 py-1 rounded bg-fuchsia-500/20 text-fuchsia-400 hover:bg-fuchsia-500/30 transition-colors"
                              >
                                Copy to Editor
                              </button>
                            </div>
                            <div className={`${themeClasses.bgTertiary}/50 max-h-48 overflow-y-auto`}>
                              <Editor
                                height="180px"
                                defaultLanguage="css"
                                value={selectedChallenge.targetCSS}
                                theme={isDarkMode ? 'vs-dark' : 'light'}
                                options={{
                                  readOnly: true,
                                  minimap: { enabled: false },
                                  fontSize: 11,
                                  lineNumbers: 'off',
                                  scrollBeyondLastLine: false,
                                  padding: { top: 8, bottom: 8 },
                                  folding: false,
                                  glyphMargin: false,
                                  lineDecorationsWidth: 0,
                                  lineNumbersMinChars: 0,
                                }}
                              />
                            </div>
                          </div>
                          <p className={`mt-2 text-[10px] ${themeClasses.textDim} italic`}>
                            💡 Try to solve it yourself first! Viewing the solution won't count toward your score.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Challenge Leaderboard */}
                  <div className={`p-4 border-t ${themeClasses.border} ${themeClasses.bgSecondary}`}>
                    <h3 className={`text-sm font-semibold ${themeClasses.text} mb-2 flex items-center gap-2`}>
                      <Trophy className="w-4 h-4 text-amber-400" />
                      Leaderboard
                    </h3>
                    <div className="space-y-1">
                      {getLeaderboard(selectedChallenge.id).map((entry, i) => (
                        <div
                          key={entry.id}
                          className={`flex items-center gap-2 p-2 rounded-lg ${i === 0 ? 'bg-amber-500/10' : themeClasses.bgTertiary}`}
                        >
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                            i === 0 ? 'bg-amber-500 text-amber-900' : `${themeClasses.bg} ${themeClasses.textMuted}`
                          }`}>
                            {i + 1}
                          </span>
                          <span className="text-base">{entry.avatar}</span>
                          <span className={`flex-1 text-xs font-medium ${themeClasses.text} truncate`}>{entry.username}</span>
                          <span className={`text-xs font-bold ${entry.score === 100 ? 'text-amber-400' : 'text-emerald-400'}`}>
                            {entry.score}%
                          </span>
                          <span className={`text-[10px] ${themeClasses.textMuted}`}>{entry.characters}c</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Panel - Editor & Output */}
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* HTML Structure Panel - Shows available elements to target */}
                <div className={`px-4 py-2 ${themeClasses.bgTertiary} border-b ${themeClasses.border}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Code2 className="w-4 h-4 text-cyan-400" />
                    <span className={`text-xs font-semibold ${themeClasses.text}`}>HTML Structure</span>
                    <span className={`text-[10px] ${themeClasses.textMuted}`}>— Target these elements</span>
                  </div>
                  <div className={`p-2 rounded-lg ${themeClasses.bgSecondary} border ${themeClasses.border} font-mono text-xs overflow-x-auto`}>
                    <code className="text-cyan-400">
                      {selectedChallenge.targetHTML.split(/(<[^>]+>)/g).map((part, i) => {
                        if (part.startsWith('<')) {
                          // It's a tag
                          const isClosing = part.startsWith('</');
                          const tagMatch = part.match(/<\/?(\w+)/);
                          const classMatch = part.match(/class="([^"]+)"/);
                          const tagName = tagMatch ? tagMatch[1] : '';
                          const className = classMatch ? classMatch[1] : '';
                          
                          return (
                            <span key={i}>
                              <span className="text-slate-500">&lt;</span>
                              {isClosing && <span className="text-slate-500">/</span>}
                              <span className="text-pink-400">{tagName}</span>
                              {className && (
                                <>
                                  <span className="text-slate-500"> class=</span>
                                  <span className="text-emerald-400">"{className}"</span>
                                </>
                              )}
                              <span className="text-slate-500">&gt;</span>
                            </span>
                          );
                        }
                        return null;
                      })}
                    </code>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className={`text-[10px] ${themeClasses.textMuted}`}>Available selectors:</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-pink-500/20 text-pink-400 font-mono">body</span>
                    {selectedChallenge.targetHTML.match(/class="([^"]+)"/g)?.map((match, i) => {
                      const className = match.match(/class="([^"]+)"/)?.[1];
                      return className ? (
                        <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono">
                          .{className}
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>

                {/* Editor Header */}
                <div className={`flex items-center justify-between px-4 py-2 ${themeClasses.bgSecondary} border-b ${themeClasses.border}`}>
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-red-500"></span>
                      <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                      <span className="w-3 h-3 rounded-full bg-green-500"></span>
                    </div>
                    <span className={`text-xs ${themeClasses.textMuted} font-mono`}>styles.css</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={resetCode}
                      className={`p-1.5 rounded hover:bg-slate-700/50 transition-colors ${themeClasses.textMuted}`}
                      title="Reset code"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                    <button
                      onClick={calculateScore}
                      disabled={isComparing}
                      className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white text-xs font-semibold rounded-md transition-colors disabled:opacity-50"
                    >
                      {isComparing ? (
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Play className="w-3.5 h-3.5" />
                      )}
                      {isComparing ? 'Comparing...' : 'Submit'}
                    </button>
                  </div>
                </div>

                {/* Monaco Editor */}
                <div className="flex-1 min-h-0">
                  <Editor
                    height="100%"
                    defaultLanguage="css"
                    value={userCSS}
                    onChange={(value) => setUserCSS(value || '')}
                    theme={isDarkMode ? 'vs-dark' : 'light'}
                    options={{
                      minimap: { enabled: false },
                      fontSize: 14,
                      lineNumbers: 'on',
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                      tabSize: 2,
                      wordWrap: 'on',
                      padding: { top: 12, bottom: 12 },
                    }}
                  />
                </div>

                {/* Live Preview */}
                <div className={`h-48 border-t ${themeClasses.border}`}>
                  <div className={`px-4 py-2 ${themeClasses.bgSecondary} border-b ${themeClasses.border} flex items-center justify-between`}>
                    <span className={`text-xs font-medium ${themeClasses.textMuted}`}>
                      🖼️ Live Preview
                    </span>
                    <span className={`text-[10px] ${themeClasses.textDim}`}>
                      {selectedChallenge.dimensions.width} × {selectedChallenge.dimensions.height}
                    </span>
                  </div>
                  <div className="h-[calc(100%-36px)] bg-gray-900 overflow-auto flex items-center justify-center">
                    <iframe
                      ref={userIframeRef}
                      srcDoc={generateIframeHTML(selectedChallenge.targetHTML, userCSS)}
                      className="bg-white"
                      title="Preview"
                      style={{ 
                        width: selectedChallenge.dimensions.width,
                        height: selectedChallenge.dimensions.height,
                        maxWidth: '100%',
                        maxHeight: '100%',
                      }}
                    />
                  </div>
                </div>

                {/* Score Result */}
                <AnimatePresence>
                  {score !== null && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className={`p-4 border-t ${themeClasses.border} ${
                        score >= 90 ? 'bg-emerald-500/10' : score >= 70 ? 'bg-amber-500/10' : 'bg-rose-500/10'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                            score >= 90 ? 'bg-emerald-500' : score >= 70 ? 'bg-amber-500' : 'bg-rose-500'
                          }`}>
                            {score >= 90 ? (
                              <Trophy className="w-8 h-8 text-white" />
                            ) : score >= 70 ? (
                              <Star className="w-8 h-8 text-white" />
                            ) : (
                              <Target className="w-8 h-8 text-white" />
                            )}
                          </div>
                          <div>
                            <p className={`text-2xl font-bold ${
                              score >= 90 ? 'text-emerald-400' : score >= 70 ? 'text-amber-400' : 'text-rose-400'
                            }`}>
                              {score}% Match
                            </p>
                            <p className={`text-sm ${themeClasses.textMuted}`}>
                              {score >= 90 ? '🎉 Excellent work!' : score >= 70 ? '👍 Good progress!' : '💪 Keep trying!'}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-sm ${themeClasses.textMuted}`}>Time: {formatTime(timeElapsed)}</p>
                          <p className={`text-sm ${themeClasses.textMuted}`}>Characters: {charCount}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default CSSBattle;

