"use client";

import { useState } from "react";
import { Note } from "@/lib/stores/notes-store";

interface NoteFormProps {
  onSubmit: (note: Omit<Note, "id" | "createdAt" | "updatedAt">) => void;
  onCancel: () => void;
}

const COLORS: Array<"yellow" | "blue" | "green" | "pink" | "purple"> = [
  "yellow",
  "blue",
  "green",
  "pink",
  "purple",
];

const COLOR_NAMES: Record<string, string> = {
  yellow: "Yellow",
  blue: "Blue",
  green: "Green",
  pink: "Pink",
  purple: "Purple",
};

const COLOR_CLASSES: Record<string, string> = {
  yellow: "bg-yellow-100 border-yellow-300",
  blue: "bg-blue-100 border-blue-300",
  green: "bg-green-100 border-green-300",
  pink: "bg-pink-100 border-pink-300",
  purple: "bg-purple-100 border-purple-300",
};

export default function NoteForm({ onSubmit, onCancel }: NoteFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState<"yellow" | "blue" | "green" | "pink" | "purple">("yellow");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("Please fill in both title and content");
      return;
    }

    onSubmit({
      title,
      content,
      color,
    });

    setTitle("");
    setContent("");
    setColor("yellow");
  };

  return (
    <div
      className={`border-2 rounded-xl p-6 ${COLOR_CLASSES[color]}`}
      style={{
        animation: `slideIn 0.3s ease-out`,
      }}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title..."
          className="w-full text-lg font-bold bg-transparent text-foreground placeholder-foreground/40 focus:outline-none border-b border-current"
        />

        {/* Content */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your note..."
          className="w-full h-32 bg-transparent text-foreground placeholder-foreground/40 focus:outline-none resize-none"
        />

        {/* Color Selector */}
        <div className="flex gap-2 mb-4">
          {COLORS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setColor(c)}
              className={`w-6 h-6 rounded border-2 transition-transform ${
                color === c ? "scale-125 border-current" : "border-current opacity-60"
              }`}
              style={{
                backgroundColor: `var(--color-${c})`,
              }}
              title={COLOR_NAMES[c]}
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-2 justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded font-semibold hover:opacity-75 transition-opacity"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-foreground text-background rounded font-semibold hover:shadow-md transition-all"
          >
            Save Note
          </button>
        </div>
      </form>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        --color-yellow: #fef08a;
        --color-blue: #bfdbfe;
        --color-green: #bbf7d0;
        --color-pink: #fbcfe8;
        --color-purple: #e9d5ff;
      `}</style>
    </div>
  );
}
