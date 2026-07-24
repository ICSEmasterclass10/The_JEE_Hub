"use client";

import { useEffect, useState } from "react";
import { useTasksStore } from "@/lib/stores/tasks-store";
import TaskCard from "@/components/daily-tasks/task-card";
import StreakDisplay from "@/components/daily-tasks/streak-display";
import CompletionBar from "@/components/daily-tasks/completion-bar";

export default function DailyTasksPage() {
  const [mounted, setMounted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  const {
    tasks,
    streak,
    completedToday,
    completeTask,
    resetDaily,
    getCompletionPercentage,
  } = useTasksStore();

  useEffect(() => {
    setMounted(true);
    resetDaily();
  }, [resetDaily]);

  const handleCompleteTask = (id: string) => {
    completeTask(id);
    
    // Check if all tasks are now complete
    const allTasksComplete = tasks
      .map((t) => (t.id === id ? { ...t, completed: true } : t))
      .every((t) => t.completed);

    if (allTasksComplete) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }
  };

  const completion = getCompletionPercentage();

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10 p-4 md:p-8">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-accent rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10px`,
                animation: `fall ${2 + Math.random() * 1}s linear forwards`,
                animationDelay: `${Math.random() * 0.5}s`,
              }}
            />
          ))}
          <style>{`
            @keyframes fall {
              to {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
              }
            }
          `}</style>
        </div>
      )}

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Daily Tasks
          </h1>
          <p className="text-foreground/60">
            Complete your daily JEE preparation routine
          </p>
        </div>

        {/* Streak Display */}
        <StreakDisplay streak={streak} completedToday={completedToday} />

        {/* Completion Bar */}
        <CompletionBar completion={completion} />

        {/* Tasks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tasks.map((task, idx) => (
            <TaskCard
              key={task.id}
              task={task}
              onComplete={handleCompleteTask}
              index={idx}
            />
          ))}
        </div>

        {/* Summary */}
        <div className="bg-background border-2 border-primary/30 rounded-xl p-6 md:p-8">
          <h3 className="text-lg font-bold text-foreground mb-4">
            Daily Summary
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold text-primary">
                {tasks.filter((t) => t.completed).length}/{tasks.length}
              </p>
              <p className="text-sm text-foreground/60">Tasks Completed</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-accent">{completion}%</p>
              <p className="text-sm text-foreground/60">Completion Rate</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-secondary">{streak}</p>
              <p className="text-sm text-foreground/60">Current Streak</p>
            </div>
          </div>
        </div>

        {completedToday && (
          <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6 text-center">
            <p className="text-lg font-bold text-green-700">
              Excellent work! You&apos;ve completed today&apos;s tasks!
            </p>
            <p className="text-sm text-green-600 mt-2">
              Come back tomorrow to maintain your streak!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
