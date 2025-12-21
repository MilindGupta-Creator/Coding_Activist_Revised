import { useState, useCallback, useEffect } from 'react';
import { studyPlans, StudyPlan, DayPlan } from '../ebookContent';

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
}

export function useStudyPlan(): UseStudyPlanReturn {
  const [activePlan, setActivePlan] = useState<StudyPlan | null>(null);
  const [currentDay, setCurrentDay] = useState(1);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [isPlanDropdownOpen, setIsPlanDropdownOpen] = useState(false);
  const [showTodayPanel, setShowTodayPanel] = useState(false);
  const [planStartDate, setPlanStartDate] = useState<Date | null>(null);

  // Load study plan progress from localStorage
  useEffect(() => {
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
  }, []);

  // Save study plan progress to localStorage
  const savePlanProgress = useCallback(
    (plan: StudyPlan | null, day: number, completed: Set<string>) => {
      if (plan) {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            planId: plan.id,
            day,
            completed: Array.from(completed),
            startDate: planStartDate || new Date(),
          })
        );
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    },
    [planStartDate]
  );

  // Select a study plan
  const selectPlan = useCallback((plan: StudyPlan) => {
    setActivePlan(plan);
    setCurrentDay(1);
    setCompletedTasks(new Set());
    setPlanStartDate(new Date());
    setIsPlanDropdownOpen(false);
    setShowTodayPanel(true);
    
    // Save immediately
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        planId: plan.id,
        day: 1,
        completed: [],
        startDate: new Date(),
      })
    );
  }, []);

  // Clear active plan
  const clearPlan = useCallback(() => {
    setActivePlan(null);
    setCurrentDay(1);
    setCompletedTasks(new Set());
    setPlanStartDate(null);
    setShowTodayPanel(false);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

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
  };
}

