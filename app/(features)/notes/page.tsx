"use client";

import { useState, useEffect } from "react";
import { useNotesStore } from "@/lib/stores/notes-store";
import NotesGrid from "@/components/notes/notes-grid";
import NoteForm from "@/components/notes/note-form";
import GuidanceSection from "@/components/notes/guidance-section";

export default function NotesPage() {
  const [mounted, setMounted] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState<"notes" | "guidance">("notes");

  const { notes, addNote, deleteNote, updateNote, getAllNotes } =
    useNotesStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const allNotes = getAllNotes();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Notes & Guidance</h1>
            <p className="text-foreground/60 mt-2">
              {activeTab === "notes"
                ? "Quick notes to remember key concepts"
                : "Strategic guidance for JEE preparation"}
            </p>
          </div>

          {activeTab === "notes" && (
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-lg font-semibold hover:shadow-lg transition-all w-full md:w-auto"
            >
              {showForm ? "Cancel" : "+ New Note"}
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b-2 border-secondary/30">
          <button
            onClick={() => {
              setActiveTab("notes");
              setShowForm(false);
            }}
            className={`px-6 py-3 font-bold transition-colors border-b-4 ${
              activeTab === "notes"
                ? "border-primary text-primary"
                : "border-transparent text-foreground/60 hover:text-foreground"
            }`}
          >
            My Notes
          </button>
          <button
            onClick={() => setActiveTab("guidance")}
            className={`px-6 py-3 font-bold transition-colors border-b-4 ${
              activeTab === "guidance"
                ? "border-primary text-primary"
                : "border-transparent text-foreground/60 hover:text-foreground"
            }`}
          >
            JEE Guidance
          </button>
        </div>

        {/* Content */}
        {activeTab === "notes" ? (
          <>
            {showForm && (
              <NoteForm
                onSubmit={(note) => {
                  addNote(note);
                  setShowForm(false);
                }}
                onCancel={() => setShowForm(false)}
              />
            )}

            <div>
              {allNotes.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-2xl text-foreground/40 mb-4">
                    No notes yet
                  </p>
                  <button
                    onClick={() => setShowForm(true)}
                    className="text-primary font-semibold hover:underline"
                  >
                    Create your first note
                  </button>
                </div>
              ) : (
                <NotesGrid
                  notes={allNotes}
                  onDelete={deleteNote}
                  onUpdate={updateNote}
                />
              )}
            </div>
          </>
        ) : (
          <GuidanceSection />
        )}
      </div>
    </div>
  );
}
