"use client";

interface Solution {
  solution: string;
  timestamp: string;
}

interface SolutionDisplayProps {
  solution: Solution;
  onReset: () => void;
  loading: boolean;
}

// Function to render LaTeX math
function renderLatex(text: string) {
  if (!text) return text;

  return text.split(/(\$\$[^$]+\$\$|\$[^$]+\$)/g).map((part, i) => {
    if (part.startsWith("$$") && part.endsWith("$$")) {
      return (
        <div key={i} className="font-mono bg-secondary/10 px-3 py-2 rounded my-2 overflow-x-auto text-sm">
          {part.slice(2, -2)}
        </div>
      );
    } else if (part.startsWith("$") && part.endsWith("$")) {
      return (
        <code key={i} className="font-mono bg-secondary/10 px-1 rounded text-primary">
          {part.slice(1, -1)}
        </code>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export default function SolutionDisplay({
  solution,
  onReset,
  loading,
}: SolutionDisplayProps) {
  return (
    <div className="space-y-6">
      {/* Solution Card */}
      <div className="bg-background border-2 border-primary/30 rounded-xl p-8 shadow-lg">
        {/* Header */}
        <div className="flex items-start justify-between mb-6 pb-6 border-b border-secondary/30">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Solution</h2>
            <p className="text-sm text-foreground/60 mt-1">
              Generated at {solution.timestamp}
            </p>
          </div>
          <div className="text-3xl">✓</div>
        </div>

        {/* Solution Content */}
        <div className="prose prose-invert max-w-none text-foreground leading-relaxed space-y-4">
          {renderLatex(solution.solution)}
        </div>

        {/* Actions */}
        <div className="mt-8 pt-6 border-t border-secondary/30 flex gap-4">
          <button
            onClick={onReset}
            disabled={loading}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-60"
          >
            Solve Another Doubt
          </button>
          <button
            onClick={() => {
              const text = solution.solution;
              navigator.clipboard.writeText(text);
              alert("Solution copied to clipboard!");
            }}
            className="px-6 py-3 border-2 border-secondary text-foreground rounded-lg font-semibold hover:bg-secondary/10 transition-all"
          >
            Copy
          </button>
        </div>
      </div>

      {/* Related Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
          <h4 className="font-bold text-green-700 mb-2">Key Takeaway</h4>
          <p className="text-sm text-green-700">
            Review the concepts mentioned in this solution and try similar problems
          </p>
        </div>
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
          <h4 className="font-bold text-blue-700 mb-2">Practice Tip</h4>
          <p className="text-sm text-blue-700">
            Solve more problems from this topic to strengthen your understanding
          </p>
        </div>
      </div>
    </div>
  );
}
