"use client";

interface CompletionBarProps {
  completion: number;
}

export default function CompletionBar({ completion }: CompletionBarProps) {
  return (
    <div className="bg-background border-2 border-primary/30 rounded-xl p-6 md:p-8">
      <div className="flex items-end justify-between mb-4">
        <h3 className="text-lg font-bold text-foreground">
          Today&apos;s Progress
        </h3>
        <span className="text-2xl font-bold text-primary">{completion}%</span>
      </div>

      {/* Main Progress Bar */}
      <div className="relative h-8 bg-secondary/20 rounded-full overflow-hidden border-2 border-secondary/40 mb-4">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500 flex items-center justify-end pr-3"
          style={{ width: `${completion}%` }}
        >
          {completion > 20 && (
            <span className="text-white text-xs font-bold">
              {completion}%
            </span>
          )}
        </div>
      </div>

      {/* Motivational message */}
      <p className="text-sm text-foreground/70 text-center">
        {completion === 0
          ? "Get started - complete your first task!"
          : completion < 50
            ? "You're making progress! Keep going!"
            : completion < 100
              ? "Almost there! Finish strong!"
              : "All tasks completed! Great job!"}
      </p>
    </div>
  );
}
