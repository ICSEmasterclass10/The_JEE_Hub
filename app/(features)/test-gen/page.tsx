"use client";

import { useState, useEffect } from "react";
import TestSelector from "@/components/test-gen/test-selector";
import TestDisplay from "@/components/test-gen/test-display";
import TestProgress from "@/components/test-gen/test-progress";

export interface Question {
  id: number;
  question: string;
  options: string[];
  correct: string;
  solution: string;
  difficulty: string;
}

interface TestState {
  subject: string;
  mode: string;
  questions: Question[];
  currentQuestion: number;
  answers: { [key: number]: string };
  showResults: boolean;
  loading: boolean;
}

export default function TestGeneratorPage() {
  const [state, setState] = useState<TestState>({
    subject: "physics",
    mode: "practice",
    questions: [],
    currentQuestion: 0,
    answers: {},
    showResults: false,
    loading: false,
  });

  const handleGenerateTest = async (subject: string, mode: string, count: number) => {
    setState((prev) => ({ ...prev, loading: true, subject, mode }));

    try {
      const response = await fetch("/api/generate-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, mode, questionCount: count }),
      });

      const data = await response.json();
      setState((prev) => ({
        ...prev,
        questions: data.questions || [],
        currentQuestion: 0,
        answers: {},
        showResults: false,
        loading: false,
      }));
    } catch (error) {
      console.error("Error generating test:", error);
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  const handleAnswerSelect = (answer: string) => {
    setState((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        [prev.currentQuestion]: answer,
      },
    }));
  };

  const handleNext = () => {
    if (state.currentQuestion < state.questions.length - 1) {
      setState((prev) => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
      }));
    }
  };

  const handlePrevious = () => {
    if (state.currentQuestion > 0) {
      setState((prev) => ({
        ...prev,
        currentQuestion: prev.currentQuestion - 1,
      }));
    }
  };

  const handleSubmitTest = () => {
    setState((prev) => ({ ...prev, showResults: true }));
  };

  const handleReset = () => {
    setState({
      subject: "physics",
      mode: "practice",
      questions: [],
      currentQuestion: 0,
      answers: {},
      showResults: false,
      loading: false,
    });
  };

  if (state.questions.length === 0) {
    return (
      <TestSelector
        onGenerateTest={handleGenerateTest}
        loading={state.loading}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <TestProgress
            current={state.currentQuestion + 1}
            total={state.questions.length}
            answered={Object.keys(state.answers).length}
          />
        </div>

        <TestDisplay
          question={state.questions[state.currentQuestion]}
          questionNumber={state.currentQuestion + 1}
          totalQuestions={state.questions.length}
          selectedAnswer={state.answers[state.currentQuestion]}
          onSelectAnswer={handleAnswerSelect}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onSubmit={handleSubmitTest}
          showResults={state.showResults}
          canGoNext={state.currentQuestion < state.questions.length - 1}
          canGoPrevious={state.currentQuestion > 0}
          onReset={handleReset}
        />
      </div>
    </div>
  );
}
