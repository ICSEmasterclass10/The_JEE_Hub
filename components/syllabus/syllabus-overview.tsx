"use client";

interface SyllabusOverviewProps {
  completion: number;
  completed: number;
  total: number;
  className: string;
}

export default function SyllabusOverview({
  completion,
  completed,
  total,
  className,
}: SyllabusOverviewProps) {
  return (
    <div className="bg-background border-2 border-primary/30 rounded-xl p-8">
      <h2 className="text-xl font-bold text-foreground mb-6">
        Class {className} Progress
      </h2>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-foreground">
            Completion Rate
          </span>
          <span className="text-2xl font-bold text-primary">{completion}%</span>
        </div>
        <div className="w-full bg-secondary/20 rounded-full h-4 overflow-hidden border-2 border-secondary/40">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
            style={{ width: `${completion}%` }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-4 bg-primary/10 rounded-lg">
          <p className="text-3xl font-bold text-primary">{completed}</p>
          <p className="text-xs text-foreground/60 mt-1">Completed</p>
        </div>
        <div className="text-center p-4 bg-secondary/10 rounded-lg">
          <p className="text-3xl font-bold text-secondary">{total - completed}</p>
          <p className="text-xs text-foreground/60 mt-1">Remaining</p>
        </div>
        <div className="text-center p-4 bg-accent/10 rounded-lg">
          <p className="text-3xl font-bold text-accent">{total}</p>
          <p className="text-xs text-foreground/60 mt-1">Total</p>
        </div>
      </div>
    </div>
  );
}
