import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Note {
  id: string;
  title: string;
  content: string;
  color: "yellow" | "blue" | "green" | "pink" | "purple";
  createdAt: string;
  updatedAt: string;
}

export interface NotesState {
  notes: Note[];
  
  addNote: (note: Omit<Note, "id" | "createdAt" | "updatedAt">) => void;
  deleteNote: (id: string) => void;
  updateNote: (id: string, updates: Partial<Note>) => void;
  getNotesByColor: (color: string) => Note[];
  getAllNotes: () => Note[];
}

const COLORS = ["yellow", "blue", "green", "pink", "purple"] as const;

const DEFAULT_NOTES: Note[] = [
  {
    id: "note-1",
    title: "Important Formulas - Physics",
    content: "F = ma\nv² = u² + 2as\nP = VI",
    color: "blue",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "note-2",
    title: "Chemistry Mnemonics",
    content: "VSEPR - Valence Shell Electron Pair Repulsion",
    color: "yellow",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const useNotesStore = create<NotesState>()(
  persist(
    (set, get) => ({
      notes: DEFAULT_NOTES,

      addNote: (note: Omit<Note, "id" | "createdAt" | "updatedAt">) =>
        set((state) => ({
          notes: [
            ...state.notes,
            {
              ...note,
              id: `note-${Date.now()}`,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          ],
        })),

      deleteNote: (id: string) =>
        set((state) => ({
          notes: state.notes.filter((n) => n.id !== id),
        })),

      updateNote: (id: string, updates: Partial<Note>) =>
        set((state) => ({
          notes: state.notes.map((n) =>
            n.id === id
              ? { ...n, ...updates, updatedAt: new Date().toISOString() }
              : n
          ),
        })),

      getNotesByColor: (color: string) => {
        const state = get();
        return state.notes.filter((n) => n.color === color);
      },

      getAllNotes: () => {
        const state = get();
        return state.notes.sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      },
    }),
    {
      name: "notes-store",
      version: 1,
    }
  )
);
