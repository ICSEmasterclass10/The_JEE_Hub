"use client";

interface StreakDisplayProps {
  streak: number;
  completedToday: boolean;
}

export default function StreakDisplay({
  streak,
  completedToday,
}: StreakDisplayProps) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-accent to-accent/80 text-accent-foreground p-8 shadow-lg">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[length:20px_20px]" />
      </div>

      <div className="relative">
        <div className="flex items-end justify-between mb-4">
          <div>
            <p className="text-sm font-semibold opacity-90 uppercase tracking-wider">
              Current Streak
            </p>
            <p className="text-6xl font-bold mt-2">{streak}</p>
          </div>
          <div className="text-8xl opacity-30">🔥</div>
        </div>

        <div className="flex items-center gap-2 mt-6">
          <span className={`w-3 h-3 rounded-full ${
            completedToday ? "bg-green-300" : "bg-yellow-300"
          }`} />
          <span className="text-sm font-medium">
            {completedToday
              ? "Completed today - Streak maintained!"
              : "Complete today's tasks to maintain your streak"}
          </span>
        </div>
      </div>
    </div>
  );
}
