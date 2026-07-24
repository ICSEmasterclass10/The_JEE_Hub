"use client";

import { useState } from "react";

interface TestSelectorProps {
  onGenerateTest: (subject: string, mode: string, count: number) => void;
  loading: boolean;
}

const SUBJECTS = ["Physics", "Chemistry", "Mathematics"];
const MODES = ["Practice", "NTA"];
const QUESTION_COUNTS = [5, 10, 15, 20];

export default function TestSelector({
  onGenerateTest,
  loading,
}: TestSelectorProps) {
  const [subject, setSubject] = useState("physics");
  const [mode, setMode] = useState("practice");
  const [count, setCount] = useState(10);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-background rounded-xl shadow-2xl border border-primary/20 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-8">
            <h1 className="text-4xl font-bold mb-2">Test Generator</h1>
            <p className="text-primary-foreground/80">
              Create custom JEE practice tests powered by AI
            </p>
          </div>

          {/* Content */}
          <div className="p-8 space-y-8">
            {/* Subject Selection */}
            <div>
              <label className="block text-lg font-semibold text-foreground mb-4">
                Select Subject
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {SUBJECTS.map((subj) => (
                  <button
                    key={subj.toLowerCase()}
                    onClick={() => setSubject(subj.toLowerCase())}
                    className={`p-4 rounded-lg font-semibold transition-all duration-200 ${
                      subject === subj.toLowerCase()
                        ? "bg-primary text-primary-foreground shadow-lg scale-105"
                        : "bg-secondary/10 text-foreground hover:bg-secondary/20 border border-secondary/30"
                    }`}
                  >
                    {subj}
                  </button>
                ))}
              </div>
            </div>

            {/* Mode Selection */}
            <div>
              <label className="block text-lg font-semibold text-foreground mb-4">
                Test Mode
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {MODES.map((m) => (
                  <button
                    key={m.toLowerCase()}
                    onClick={() => setMode(m.toLowerCase())}
                    className={`p-4 rounded-lg font-semibold transition-all duration-200 ${
                      mode === m.toLowerCase()
                        ? "bg-accent text-accent-foreground shadow-lg scale-105"
                        : "bg-secondary/10 text-foreground hover:bg-secondary/20 border border-secondary/30"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
              <p className="text-sm text-foreground/60 mt-2">
                {mode === "practice"
                  ? "Practice mode: Conceptual and application-based questions"
                  : "NTA mode: Official JEE Main/Advanced pattern"}
              </p>
            </div>

            {/* Question Count Selection */}
            <div>
              <label className="block text-lg font-semibold text-foreground mb-4">
                Number of Questions
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {QUESTION_COUNTS.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCount(c)}
                    className={`p-3 rounded-lg font-semibold transition-all duration-200 ${
                      count === c
                        ? "bg-primary text-primary-foreground shadow-lg"
                        : "bg-secondary/10 text-foreground hover:bg-secondary/20 border border-secondary/30"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={() => onGenerateTest(subject, mode, count)}
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-4 rounded-lg font-bold text-lg hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⏳</span> Generating Test...
                </span>
              ) : (
                "Generate Test"
              )}
            </button>
          </div>
        </div>

        {/* Info Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-background border border-primary/20 rounded-lg p-6 shadow-md">
            <div className="text-2xl mb-2">🤖</div>
            <h3 className="font-bold text-foreground mb-1">AI Powered</h3>
            <p className="text-sm text-foreground/60">
              Tests generated by advanced AI models
            </p>
          </div>
          <div className="bg-background border border-secondary/20 rounded-lg p-6 shadow-md">
            <div className="text-2xl mb-2">📊</div>
            <h3 className="font-bold text-foreground mb-1">Instant Results</h3>
            <p className="text-sm text-foreground/60">
              Get detailed solutions and explanations
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
