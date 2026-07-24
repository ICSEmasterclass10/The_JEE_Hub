"use client";

import { useState, useEffect } from "react";
import { useSyllabusStore } from "@/lib/stores/syllabus-store";
import SyllabusClassTabs from "@/components/syllabus/class-tabs";
import SyllabusOverview from "@/components/syllabus/syllabus-overview";
import SubjectChapters from "@/components/syllabus/subject-chapters";

export default function SyllabusPage() {
  const [mounted, setMounted] = useState(false);
  const [selectedClass, setSelectedClass] = useState<"11" | "12">("11");
  const [selectedSubject, setSelectedSubject] = useState<number>(0);

  const {
    class11,
    class12,
    getCompletionPercentage,
    getCompletedChapters,
    getTotalChapters,
  } = useSyllabusStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const syllabusData = selectedClass === "11" ? class11 : class12;
  const completionPercentage = getCompletionPercentage(selectedClass);
  const completedChapters = getCompletedChapters(selectedClass);
  const totalChapters = getTotalChapters(selectedClass);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            JEE Syllabus Roadmap
          </h1>
          <p className="text-foreground/60">
            Track your progress through the complete JEE syllabus
          </p>
        </div>

        {/* Class Tabs */}
        <SyllabusClassTabs
          selectedClass={selectedClass}
          onChange={setSelectedClass}
        />

        {/* Overview */}
        <SyllabusOverview
          completion={completionPercentage}
          completed={completedChapters}
          total={totalChapters}
          className={selectedClass}
        />

        {/* Subject Selection and Chapters */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Subject Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-background border-2 border-secondary/30 rounded-xl overflow-hidden sticky top-8">
              <div className="bg-gradient-to-b from-primary to-primary/80 text-primary-foreground p-4">
                <h3 className="font-bold">Subjects</h3>
              </div>
              <div className="divide-y divide-secondary/30">
                {syllabusData.map((subject, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedSubject(idx)}
                    className={`w-full px-4 py-3 text-left font-semibold transition-colors ${
                      selectedSubject === idx
                        ? "bg-primary text-primary-foreground"
                        : "bg-background text-foreground hover:bg-secondary/10"
                    }`}
                  >
                    {subject.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Chapters */}
          <div className="lg:col-span-3">
            <SubjectChapters
              subject={syllabusData[selectedSubject]}
              className={selectedClass}
              subjectIdx={selectedSubject}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
