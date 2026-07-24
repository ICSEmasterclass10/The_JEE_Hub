"use client";

import { useState, useRef } from "react";
import DoubSolverForm from "@/components/doubt-solver/solver-form";
import SolutionDisplay from "@/components/doubt-solver/solution-display";

interface Solution {
  solution: string;
  timestamp: string;
}

export default function DoubtSolverPage() {
  const [loading, setLoading] = useState(false);
  const [solution, setSolution] = useState<Solution | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSolveDraft = async (
    question: string,
    imageFile: File | null
  ) => {
    setLoading(true);
    setError(null);
    setSolution(null);

    try {
      const formData = new FormData();
      formData.append("question", question);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const response = await fetch("/api/solve-doubt", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to solve doubt");
      }

      setSolution({
        solution: data.solution,
        timestamp: new Date().toLocaleString(),
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSolution(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            AI Doubt Solver
          </h1>
          <p className="text-foreground/60">
            Get instant step-by-step solutions to your questions
          </p>
        </div>

        {solution ? (
          <SolutionDisplay
            solution={solution}
            onReset={handleReset}
            loading={loading}
          />
        ) : (
          <DoubSolverForm
            onSubmit={handleSolveDraft}
            loading={loading}
            error={error}
          />
        )}
      </div>
    </div>
  );
}
