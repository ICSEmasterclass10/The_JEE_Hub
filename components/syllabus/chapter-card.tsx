"use client";

import { Chapter } from "@/lib/stores/syllabus-store";

interface ChapterCardProps {
  chapter: Chapter;
  index: number;
  onClick: () => void;
}

export default function ChapterCard({
  chapter,
  index,
  onClick,
}: ChapterCardProps) {
  return (
    <button
      onClick={onClick}
      className={`text-left p-6 rounded-xl border-2 transition-all hover:shadow-lg group ${
        chapter.completed
          ? "bg-gradient-to-br from-green-50 to-green-100 border-green-300"
          : "bg-background border-secondary/30 hover:border-primary"
      }`}
      style={{
        animation: `fadeIn 0.3s ease-out`,
        animationDelay: `${index * 0.05}s`,
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <h4 className={`font-bold text-lg ${
          chapter.completed ? "text-green-700" : "text-foreground"
        }`}>
          {chapter.name}
        </h4>
        {chapter.completed && (
          <span className="text-2xl">✓</span>
        )}
      </div>

      {/* Topics */}
      <div className="flex flex-wrap gap-2 mb-3">
        {chapter.topics.map((topic, idx) => (
          <span
            key={idx}
            className={`text-xs font-semibold px-2 py-1 rounded ${
              chapter.completed
                ? "bg-green-200 text-green-700"
                : "bg-secondary/20 text-foreground/60"
            }`}
          >
            {topic}
          </span>
        ))}
      </div>

      {/* Status */}
      <div className="flex items-center gap-2 text-sm font-semibold">
        <input
          type="checkbox"
          checked={chapter.completed}
          onChange={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className="w-5 h-5 cursor-pointer"
        />
        <span className={chapter.completed ? "text-green-700" : "text-foreground/60"}>
          {chapter.completed ? "Completed" : "Not completed"}
        </span>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </button>
  );
}
