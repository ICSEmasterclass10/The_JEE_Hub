"use client";

interface ClassTabsProps {
  selectedClass: "11" | "12";
  onChange: (className: "11" | "12") => void;
}

export default function SyllabusClassTabs({
  selectedClass,
  onChange,
}: ClassTabsProps) {
  return (
    <div className="flex gap-4 justify-center">
      {["11", "12"].map((className) => (
        <button
          key={className}
          onClick={() => onChange(className as "11" | "12")}
          className={`px-8 py-4 rounded-lg font-bold text-lg transition-all ${
            selectedClass === className
              ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg scale-105"
              : "bg-secondary/10 text-foreground hover:bg-secondary/20 border-2 border-secondary/30"
          }`}
        >
          Class {className}
        </button>
      ))}
    </div>
  );
}
