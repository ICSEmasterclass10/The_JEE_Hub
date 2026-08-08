"use client";

import { Note } from "@/lib/stores/notes-store";
import NoteCard from "./note-card";

interface NotesGridProps {
  notes: Note[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Note>) => void;
}

export default function NotesGrid({
  notes,
  onDelete,
  onUpdate,
}: NotesGridProps) {
  return (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
      {notes.map((note, idx) => (
        <NoteCard
          key={note.id}
          note={note}
          onDelete={onDelete}
          onUpdate={onUpdate}
          index={idx}
        />
      ))}
    </div>
  );
}
