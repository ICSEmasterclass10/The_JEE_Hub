"use client";

import { DailyTask } from "@/lib/stores/tasks-store";

interface TaskCardProps {
  task: DailyTask;
  onComplete: (id: string) => void;
  index: number;
}

const DIFFICULTY_COLORS = {
  Easy: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Hard: "bg-red-100 text-red-700",
};

export default function TaskCard({
  task,
  onComplete,
  index,
}: TaskCardProps) {
  return (
    <div
      className={`group relative overflow-hidden rounded-xl border-2 transition-all duration-300 ${
        task.completed
          ? "bg-gradient-to-br from-green-50 to-green-100 border-green-300"
          : "bg-background border-secondary/30 hover:border-primary shadow-md hover:shadow-lg"
      }`}
      style={{
        animation: `fadeIn 0.3s ease-out`,
        animationDelay: `${index * 0.1}s`,
      }}
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity ${
        task.completed ? "bg-green-500" : "bg-primary"
      }`} />

      <div className="relative p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-foreground flex-1 leading-tight pr-2">
            {task.title}
          </h3>
          <span
            className={`px-2 py-1 rounded text-xs font-semibold flex-shrink-0 ${
              DIFFICULTY_COLORS[task.difficulty]
            }`}
          >
            {task.difficulty}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-foreground/70">{task.description}</p>

        {/* Status indicator */}
        <div className="flex items-center gap-2 text-xs font-semibold">
          {task.completed ? (
            <>
              <span className="w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center">
                ✓
              </span>
              <span className="text-green-700">Completed</span>
            </>
          ) : (
            <>
              <span className="w-5 h-5 border-2 border-secondary rounded-full" />
              <span className="text-foreground/60">Not started</span>
            </>
          )}
        </div>

        {/* Complete Button */}
        <button
          onClick={() => onComplete(task.id)}
          disabled={task.completed}
          className={`w-full py-2 rounded-lg font-semibold transition-all mt-4 ${
            task.completed
              ? "bg-green-500 text-white cursor-default"
              : "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:shadow-lg active:scale-95"
          }`}
        >
          {task.completed ? "Completed!" : "Mark Complete"}
        </button>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
