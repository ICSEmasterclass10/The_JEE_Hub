"use client";

import { Subject } from "@/lib/stores/syllabus-store";
import { useSyllabusStore } from "@/lib/stores/syllabus-store";
import ChapterCard from "./chapter-card";

interface SubjectChaptersProps {
  subject: Subject;
  className: string;
  subjectIdx: number;
}

export default function SubjectChapters({
  subject,
  className,
  subjectIdx,
}: SubjectChaptersProps) {
  const { toggleChapter } = useSyllabusStore();

  const completionPercentage =
    subject.chapters.length === 0
      ? 0
      : Math.round(
          (subject.chapters.filter((ch) => ch.completed).length /
            subject.chapters.length) *
            100
        );

  return (
    <div className="space-y-6">
      {/* Subject Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-xl p-8">
        <h2 className="text-3xl font-bold mb-3">{subject.name}</h2>
        <div className="flex items-center justify-between">
          <p className="text-primary-foreground/80">
            {subject.chapters.filter((ch) => ch.completed).length} of{" "}
            {subject.chapters.length} chapters completed
          </p>
          <span className="text-4xl font-bold">{completionPercentage}%</span>
        </div>
        <div className="w-full bg-primary-foreground/20 rounded-full h-2 mt-4 overflow-hidden">
          <div
            className="h-full bg-primary-foreground transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      {/* Chapters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {subject.chapters.map((chapter, idx) => (
          <ChapterCard
            key={chapter.id}
            chapter={chapter}
            index={idx}
            onClick={() => toggleChapter(className, subjectIdx, chapter.id)}
          />
        ))}
      </div>
    </div>
  );
}
