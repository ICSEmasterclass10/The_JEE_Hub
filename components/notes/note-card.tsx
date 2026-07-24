"use client";

import { useState } from "react";
import { Note } from "@/lib/stores/notes-store";

interface NoteCardProps {
  note: Note;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Note>) => void;
  index: number;
}

const COLOR_CLASSES: Record<string, string> = {
  yellow: "bg-yellow-100 border-yellow-300 hover:shadow-yellow-200",
  blue: "bg-blue-100 border-blue-300 hover:shadow-blue-200",
  green: "bg-green-100 border-green-300 hover:shadow-green-200",
  pink: "bg-pink-100 border-pink-300 hover:shadow-pink-200",
  purple: "bg-purple-100 border-purple-300 hover:shadow-purple-200",
};

export default function NoteCard({
  note,
  onDelete,
  onUpdate,
  index,
}: NoteCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(note.title);
  const [editContent, setEditContent] = useState(note.content);

  const handleSave = () => {
    if (editTitle.trim() && editContent.trim()) {
      onUpdate(note.id, {
        title: editTitle,
        content: editContent,
      });
      setIsEditing(false);
    }
  };

  return (
    <div
      className={`border-2 rounded-xl p-4 break-inside-avoid shadow-md hover:shadow-lg transition-all ${COLOR_CLASSES[note.color]}`}
      style={{
        animation: `fadeIn 0.3s ease-out`,
        animationDelay: `${index * 0.05}s`,
      }}
    >
      {isEditing ? (
        <div className="space-y-2">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full font-bold text-sm bg-white/50 rounded px-2 py-1"
          />
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full text-xs bg-white/50 rounded px-2 py-1 resize-none h-24"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex-1 text-xs font-bold bg-green-500 text-white rounded hover:bg-green-600"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="flex-1 text-xs font-bold bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <h3 className="font-bold text-sm mb-2 line-clamp-2">{note.title}</h3>
          <p className="text-xs whitespace-pre-wrap line-clamp-6 mb-3">
            {note.content}
          </p>
          <div className="flex gap-2 text-xs">
            <button
              onClick={() => setIsEditing(true)}
              className="flex-1 px-2 py-1 bg-yellow-400 hover:bg-yellow-500 rounded font-semibold"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(note.id)}
              className="flex-1 px-2 py-1 bg-red-400 hover:bg-red-500 text-white rounded font-semibold"
            >
              Delete
            </button>
          </div>
          <p className="text-xs mt-2 opacity-50">
            {new Date(note.updatedAt).toLocaleDateString()}
          </p>
        </>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
