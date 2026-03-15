import { useState, useCallback, useEffect, useRef } from 'react';
import { studyPlans, StudyPlan, DayPlan } from '../ebookContent';
import { db } from '@/firebase/firebase';

const STORAGE_KEY = 'ebook_study_progress';

interface UseStudyPlanReturn {
  activePlan: StudyPlan | null;
  currentDay: number;
  completedTasks: Set<string>;
  isPlanDropdownOpen: boolean;
  setIsPlanDropdownOpen: (open: boolean) => void;
  showTodayPanel: boolean;
  setShowTodayPanel: (show: boolean) => void;
  planStartDate: Date | null;
  todayPlan: DayPlan | undefined;
  overallProgress: number;
  todayStats: { total: number; completed: number };
  selectPlan: (plan: StudyPlan) => void;
  clearPlan: () => void;
  toggleTaskCompletion: (taskKey: string) => void;
  goToNextDay: () => void;
  goToPreviousDay: () => void;
  setCurrentDay: (day: number) => void;
  isLoading: boolean;
}

export function useStudyPlan(userId?: string | null): UseStudyPlanReturn {
  const [activePlan, setActivePlan] = useState<StudyPlan | null>(null);
  const [currentDay, setCurrentDay] = useState(1);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [isPlanDropdownOpen, setIsPlanDropdownOpen] = useState(false);
  const [showTodayPanel, setShowTodayPanel] = useState(false);
  const [planStartDate, setPlanStartDate] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Track if we've initialised to avoid overwriting with empty local state
  const isInitialised = useRef(false);

  // Load study plan progress from Firebase or localStorage
  useEffect(() => {
    const loadProgress = async () => {
      setIsLoading(true);
      
      // 1. Try Firebase if userId is provided
      if (userId) {
        try {
          const doc = await db.collection('studyProgress').doc(userId).get();
          if (doc.exists) {
            const data = doc.data();
            if (data && data.activePlanId) {
              const plan = studyPlans.find((p) => p.id === data.activePlanId);
              if (plan) {
                setActivePlan(plan);
                setCurrentDay(data.currentDay || 1);
                setCompletedTasks(new Set(data.completedTasks || []));
                setPlanStartDate(data.planStartDate ? new Date(data.planStartDate) : new Date());
                isInitialised.current = true;
                setIsLoading(false);
                return;
              }
            }
          }
        } catch (error) {
          console.error('Error loading progress from Firebase:', error);
        }
      }

      // 2. Fallback to localStorage
      try {
        const savedProgress = localStorage.getItem(STORAGE_KEY);
        if (savedProgress) {
          const { planId, day, completed, startDate } = JSON.parse(savedProgress);
          const plan = studyPlans.find((p) => p.id === planId);
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
      
      isInitialised.current = true;
      setIsLoading(false);
    };

    loadProgress();
  }, [userId]);

  // Save study plan progress to Firebase and localStorage
  const savePlanProgress = useCallback(
    async (plan: StudyPlan | null, day: number, completed: Set<string>) => {
      if (!isInitialised.current) return;

      const progressData = {
        planId: plan?.id || null,
        day,
        completed: Array.from(completed),
        startDate: planStartDate || new Date(),
      };

      // 1. Save to localStorage
      if (plan) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progressData));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }

      // 2. Save to Firebase if userId is provided
      if (userId) {
        try {
          if (plan) {
            await db.collection('studyProgress').doc(userId).set({
              activePlanId: plan.id,
              currentDay: day,
              completedTasks: Array.from(completed),
              planStartDate: (planStartDate || new Date()).toISOString(),
              lastUpdated: new Date().toISOString(),
            }, { merge: true });
          } else {
            await db.collection('studyProgress').doc(userId).set({
              activePlanId: null,
              lastUpdated: new Date().toISOString(),
            }, { merge: true });
          }
        } catch (error) {
          console.error('Error saving progress to Firebase:', error);
        }
      }
    },
    [userId, planStartDate]
  );

  // Select a study plan
  const selectPlan = useCallback(async (plan: StudyPlan) => {
    const now = new Date();
    setActivePlan(plan);
    setCurrentDay(1);
    setCompletedTasks(new Set());
    setPlanStartDate(now);
    setIsPlanDropdownOpen(false);
    setShowTodayPanel(true);
    
    // Save to localStorage
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        planId: plan.id,
        day: 1,
        completed: [],
        startDate: now,
      })
    );

    // Save to Firebase
    if (userId) {
      try {
        await db.collection('studyProgress').doc(userId).set({
          activePlanId: plan.id,
          currentDay: 1,
          completedTasks: [],
          planStartDate: now.toISOString(),
          lastUpdated: now.toISOString(),
        }, { merge: true });
      } catch (error) {
        console.error('Error selecting plan in Firebase:', error);
      }
    }
  }, [userId]);

  // Clear active plan
  const clearPlan = useCallback(async () => {
    setActivePlan(null);
    setCurrentDay(1);
    setCompletedTasks(new Set());
    setPlanStartDate(null);
    setShowTodayPanel(false);
    localStorage.removeItem(STORAGE_KEY);

    if (userId) {
      try {
        await db.collection('studyProgress').doc(userId).set({
          activePlanId: null,
          lastUpdated: new Date().toISOString(),
        }, { merge: true });
      } catch (error) {
        console.error('Error clearing plan in Firebase:', error);
      }
    }
  }, [userId]);

  // Toggle task completion
  const toggleTaskCompletion = useCallback(
    (taskKey: string) => {
      setCompletedTasks((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(taskKey)) {
          newSet.delete(taskKey);
        } else {
          newSet.add(taskKey);
        }
        savePlanProgress(activePlan, currentDay, newSet);
        return newSet;
      });
    },
    [activePlan, currentDay, savePlanProgress]
  );

  // Go to next day
  const goToNextDay = useCallback(() => {
    if (activePlan && currentDay < activePlan.totalDays) {
      const newDay = currentDay + 1;
      setCurrentDay(newDay);
      savePlanProgress(activePlan, newDay, completedTasks);
    }
  }, [activePlan, currentDay, completedTasks, savePlanProgress]);

  // Go to previous day
  const goToPreviousDay = useCallback(() => {
    if (currentDay > 1) {
      const newDay = currentDay - 1;
      setCurrentDay(newDay);
      savePlanProgress(activePlan, newDay, completedTasks);
    }
  }, [activePlan, currentDay, completedTasks, savePlanProgress]);

  // Set current day with persistence
  const handleSetCurrentDay = useCallback(
    (day: number) => {
      setCurrentDay(day);
      savePlanProgress(activePlan, day, completedTasks);
    },
    [activePlan, completedTasks, savePlanProgress]
  );

  // Get today's plan
  const todayPlan: DayPlan | undefined = activePlan?.schedule.find(
    (s) => s.day === currentDay
  );

  // Calculate overall progress
  const overallProgress = (() => {
    if (!activePlan) return 0;
    let totalTasks = 0;
    let completedCount = 0;
    activePlan.schedule.forEach((day) => {
      day.tasks.forEach((task) => {
        task.questionIndices.forEach((qIdx) => {
          totalTasks++;
          if (completedTasks.has(`${day.day}-${task.moduleId}-${qIdx}`)) {
            completedCount++;
          }
        });
      });
    });
    return totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;
  })();

  // Get task count for today
  const todayStats = (() => {
    if (!todayPlan) return { total: 0, completed: 0 };
    let total = 0;
    let completed = 0;
    todayPlan.tasks.forEach((task) => {
      task.questionIndices.forEach((qIdx) => {
        total++;
        if (completedTasks.has(`${currentDay}-${task.moduleId}-${qIdx}`)) {
          completed++;
        }
      });
    });
    return { total, completed };
  })();

  return {
    activePlan,
    currentDay,
    completedTasks,
    isPlanDropdownOpen,
    setIsPlanDropdownOpen,
    showTodayPanel,
    setShowTodayPanel,
    planStartDate,
    todayPlan,
    overallProgress,
    todayStats,
    selectPlan,
    clearPlan,
    toggleTaskCompletion,
    goToNextDay,
    goToPreviousDay,
    setCurrentDay: handleSetCurrentDay,
    isLoading,
  };
}
