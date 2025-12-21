import { useState, useCallback, useEffect } from 'react';
import { ebookContent } from '../ebookContent';

interface UseTimedQuizReturn {
  isTimedQuizActive: boolean;
  quizDurationMinutes: number;
  setQuizDurationMinutes: (minutes: number) => void;
  quizQuestionCount: number;
  setQuizQuestionCount: (count: number) => void;
  quizTimeLeft: number | null;
  quizQuestionIndices: number[];
  isQuizMode: boolean;
  setIsQuizMode: (mode: boolean) => void;
  revealedAnswers: Record<string, boolean>;
  startTimedQuiz: (activeModule: string, findModuleById: (modules: typeof ebookContent, id: string) => typeof ebookContent[0] | null) => void;
  endTimedQuiz: () => void;
  toggleAnswerReveal: (key: string) => void;
  formatQuizTime: (seconds: number | null) => string;
}

export function useTimedQuiz(): UseTimedQuizReturn {
  const [isTimedQuizActive, setIsTimedQuizActive] = useState(false);
  const [quizDurationMinutes, setQuizDurationMinutes] = useState(15);
  const [quizQuestionCount, setQuizQuestionCount] = useState(10);
  const [quizTimeLeft, setQuizTimeLeft] = useState<number | null>(null);
  const [quizQuestionIndices, setQuizQuestionIndices] = useState<number[]>([]);
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});

  // Format quiz time display
  const formatQuizTime = useCallback((seconds: number | null): string => {
    if (seconds === null || seconds < 0) return '';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const mm = mins.toString().padStart(2, '0');
    const ss = secs.toString().padStart(2, '0');
    return `${mm}:${ss}`;
  }, []);

  // Start timed quiz
  const startTimedQuiz = useCallback(
    (
      activeModule: string,
      findModuleById: (
        modules: typeof ebookContent,
        id: string
      ) => typeof ebookContent[0] | null
    ) => {
      const module = findModuleById(ebookContent, activeModule);
      if (!module || !module.items || module.items.length === 0) return;

      const indices = Array.from({ length: module.items.length }, (_, i) => i);
      // Fisher–Yates shuffle to pick random questions
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }

      const selected = indices.slice(
        0,
        Math.min(quizQuestionCount, indices.length)
      );
      if (selected.length === 0) return;

      setQuizQuestionIndices(selected);
      setQuizTimeLeft(quizDurationMinutes * 60);
      setIsTimedQuizActive(true);
      setIsQuizMode(true);
      setRevealedAnswers({});
    },
    [quizDurationMinutes, quizQuestionCount]
  );

  // End timed quiz
  const endTimedQuiz = useCallback(() => {
    setIsTimedQuizActive(false);
    setQuizTimeLeft(null);
    setQuizQuestionIndices([]);
    setIsQuizMode(false);
  }, []);

  // Toggle answer reveal
  const toggleAnswerReveal = useCallback((key: string) => {
    setRevealedAnswers((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, []);

  // Timed quiz countdown
  useEffect(() => {
    if (!isTimedQuizActive || quizTimeLeft === null) return;

    const id = window.setInterval(() => {
      setQuizTimeLeft((prev) => {
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

  return {
    isTimedQuizActive,
    quizDurationMinutes,
    setQuizDurationMinutes,
    quizQuestionCount,
    setQuizQuestionCount,
    quizTimeLeft,
    quizQuestionIndices,
    isQuizMode,
    setIsQuizMode,
    revealedAnswers,
    startTimedQuiz,
    endTimedQuiz,
    toggleAnswerReveal,
    formatQuizTime,
  };
}

