"use client";

interface TestProgressProps {
  current: number;
  total: number;
  answered: number;
}

export default function TestProgress({
  current,
  total,
  answered,
}: TestProgressProps) {
  const progressPercentage = (answered / total) * 100;
  const currentPercentage = (current / total) * 100;

  return (
    <div className="space-y-3">
      {/* Header Info */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-foreground">
          Question {current} of {total}
        </h2>
        <span className="text-sm bg-primary text-primary-foreground px-3 py-1 rounded-full font-semibold">
          {answered}/{total} Answered
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-secondary/20 rounded-full h-3 overflow-hidden border border-secondary/30">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Current Position Indicator */}
      <div className="w-full bg-secondary/10 rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-secondary transition-all duration-500"
          style={{ width: `${currentPercentage}%` }}
        />
      </div>
    </div>
  );
}
