"use client";

import { useState } from "react";

interface GuidanceCard {
  title: string;
  tips: string[];
  icon: string;
}

const GUIDANCE_DATA: GuidanceCard[] = [
  {
    title: "Effective Study Strategy",
    icon: "📚",
    tips: [
      "Study in focused 50-minute sessions with 10-minute breaks",
      "Review notes regularly - follow the 24-hour rule",
      "Create concept maps for complex topics",
      "Practice previous year questions",
      "Maintain a doubt notebook and resolve daily",
    ],
  },
  {
    title: "Time Management",
    icon: "⏱️",
    tips: [
      "Allocate equal time to Physics, Chemistry, and Maths",
      "Practice speed with mock tests every week",
      "Focus on weak areas without neglecting strengths",
      "Plan your revision schedule 3-4 months before exam",
      "Get 7-8 hours of sleep daily",
    ],
  },
  {
    title: "Exam Preparation",
    icon: "🎯",
    tips: [
      "Solve at least 10 full-length mock tests",
      "Analyze your performance after each test",
      "Understand conceptual questions, not just formulas",
      "Develop shortcuts for calculations",
      "Know the exam pattern and marking scheme",
    ],
  },
  {
    title: "Mental & Physical Health",
    icon: "💪",
    tips: [
      "Exercise for 30 minutes daily to reduce stress",
      "Avoid comparing your progress with others",
      "Practice meditation or yoga for mental clarity",
      "Eat healthy balanced meals regularly",
      "Take breaks and engage in hobbies",
    ],
  },
  {
    title: "Common Mistakes to Avoid",
    icon: "⚠️",
    tips: [
      "Don't start new topics 1 month before the exam",
      "Avoid skipping any subject completely",
      "Don't memorize everything - understand concepts",
      "Don't neglect board exam preparations",
      "Don't lose hope if initial mocks don't go well",
    ],
  },
  {
    title: "Last-Minute Tips",
    icon: "⭐",
    tips: [
      "Revise formulas and key concepts the night before",
      "Solve easy questions to build confidence",
      "Keep water and snacks handy during exam",
      "Allocate time wisely in the exam",
      "Don't attempt every question if not sure",
    ],
  },
];

export default function GuidanceSection() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {GUIDANCE_DATA.map((card, idx) => (
          <div
            key={idx}
            className="bg-background border-2 border-secondary/30 rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer"
            onClick={() =>
              setExpandedCard(expandedCard === card.title ? null : card.title)
            }
          >
            <div className="flex items-start gap-3 mb-4">
              <span className="text-3xl">{card.icon}</span>
              <h3 className="font-bold text-lg text-foreground">
                {card.title}
              </h3>
            </div>

            {expandedCard === card.title && (
              <ul className="space-y-3 mt-4 animate-fade-in">
                {card.tips.map((tip, tipIdx) => (
                  <li key={tipIdx} className="flex gap-2 text-sm text-foreground/80">
                    <span className="text-primary font-bold">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            )}

            {expandedCard !== card.title && (
              <p className="text-xs text-foreground/60">
                Click to view {card.tips.length} tips
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Motivational Quote */}
      <div className="bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-xl p-8 text-center">
        <p className="text-2xl font-bold mb-2">
          "Your dreams don't have an expiration date"
        </p>
        <p className="text-primary-foreground/80">
          Stay focused, stay motivated, and you will achieve your goals. The JEE
          preparation journey is a marathon, not a sprint. Believe in yourself!
        </p>
      </div>
    </div>
  );
}
