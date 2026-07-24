"use client";

import { Question } from "@/app/(features)/test-gen/page";
import { useMemo } from "react";

interface TestDisplayProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer: string | undefined;
  onSelectAnswer: (answer: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  onSubmit: () => void;
  onReset: () => void;
  showResults: boolean;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

// Function to render LaTeX math
function renderLatex(text: string) {
  if (!text) return text;

  return text.split(/(\$\$[^$]+\$\$|\$[^$]+\$)/g).map((part, i) => {
    if (part.startsWith("$$") && part.endsWith("$$")) {
      // Display math - would need MathJax/Katex in real app
      return (
        <span key={i} className="font-mono bg-secondary/10 px-1 rounded">
          {part.slice(2, -2)}
        </span>
      );
    } else if (part.startsWith("$") && part.endsWith("$")) {
      // Inline math
      return (
        <span key={i} className="font-mono text-primary">
          {part.slice(1, -1)}
        </span>
      );
    }
    return part;
  });
}

export default function TestDisplay({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onSelectAnswer,
  onNext,
  onPrevious,
  onSubmit,
  onReset,
  showResults,
  canGoNext,
  canGoPrevious,
}: TestDisplayProps) {
  const isAnswerCorrect = useMemo(
    () => selectedAnswer === question.options[question.correct],
    [selectedAnswer, question]
  );

  return (
    <div className="space-y-8">
      {/* Question Card */}
      <div className="bg-background border-2 border-primary/30 rounded-xl p-8 shadow-lg">
        {/* Question Header */}
        <div className="mb-6 pb-6 border-b border-secondary/30">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">
              Question {questionNumber}
            </h3>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                question.difficulty === "Easy"
                  ? "bg-green-100 text-green-700"
                  : question.difficulty === "Medium"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
              }`}
            >
              {question.difficulty}
            </span>
          </div>
          <p className="text-lg text-foreground font-semibold">
            {renderLatex(question.question)}
          </p>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-8">
          {question.options.map((option, index) => {
            const optionLabel = String.fromCharCode(65 + index); // A, B, C, D
            const isSelected = selectedAnswer === option;
            const isCorrect = option === question.options[question.correct];

            let optionClass =
              "w-full text-left p-4 rounded-lg border-2 transition-all cursor-pointer ";

            if (showResults) {
              if (isCorrect) {
                optionClass +=
                  "bg-green-50 border-green-500 text-foreground shadow-md";
              } else if (isSelected && !isCorrect) {
                optionClass +=
                  "bg-red-50 border-red-500 text-foreground shadow-md";
              } else {
                optionClass +=
                  "border-secondary/30 text-foreground opacity-60 bg-secondary/5";
              }
            } else {
              optionClass += isSelected
                ? "border-primary bg-primary/10 text-foreground shadow-md"
                : "border-secondary/30 hover:border-secondary bg-background hover:bg-secondary/5 text-foreground";
            }

            return (
              <button
                key={index}
                onClick={() => !showResults && onSelectAnswer(option)}
                disabled={showResults}
                className={optionClass}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center font-bold text-sm ${
                      isSelected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-secondary/40"
                    }`}
                  >
                    {isSelected && "✓"}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{optionLabel}</div>
                    <div className="text-sm">{renderLatex(option)}</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Solution (Show after submission) */}
        {showResults && selectedAnswer === undefined && (
          <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4 mb-8">
            <p className="text-yellow-800 font-semibold">⚠ Not answered</p>
          </div>
        )}

        {showResults && selectedAnswer !== undefined && (
          <div className={`rounded-lg p-6 mb-8 ${
            isAnswerCorrect
              ? "bg-green-50 border-2 border-green-300"
              : "bg-red-50 border-2 border-red-300"
          }`}>
            <div className="flex items-start gap-3 mb-4">
              <span className="text-2xl">{isAnswerCorrect ? "✓" : "✗"}</span>
              <div>
                <p
                  className={`font-bold ${
                    isAnswerCorrect ? "text-green-700" : "text-red-700"
                  }`}
                >
                  {isAnswerCorrect ? "Correct!" : "Incorrect"}
                </p>
                <p className="text-sm mt-1">
                  Correct answer: {String.fromCharCode(65 + question.correct)}
                </p>
              </div>
            </div>
            <div className="border-t border-current border-opacity-20 pt-4">
              <p className="font-semibold mb-2">Solution:</p>
              <p className="text-sm leading-relaxed">
                {renderLatex(question.solution)}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={onPrevious}
          disabled={!canGoPrevious || showResults}
          className="flex-1 px-6 py-3 border-2 border-secondary rounded-lg font-semibold hover:bg-secondary/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          ← Previous
        </button>

        {canGoNext && !showResults ? (
          <button
            onClick={onNext}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Next →
          </button>
        ) : (
          <button
            onClick={onSubmit}
            disabled={showResults}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-accent to-accent/80 text-accent-foreground rounded-lg font-semibold hover:shadow-lg disabled:opacity-50 transition-all"
          >
            Submit Test
          </button>
        )}

        {showResults && (
          <button
            onClick={onReset}
            className="flex-1 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Back to Menu
          </button>
        )}
      </div>
    </div>
  );
}
