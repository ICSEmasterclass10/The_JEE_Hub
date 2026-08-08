"use client";

import { useState } from "react";
import { Resource } from "@/lib/stores/resources-store";

interface ResourceFormProps {
  onSubmit: (
    resource: Omit<Resource, "id" | "addedAt" | "rating">
  ) => void;
  onCancel: () => void;
}

const SUBJECTS = ["Physics", "Chemistry", "Mathematics"];

export default function ResourceForm({
  onSubmit,
  onCancel,
}: ResourceFormProps) {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("Physics");
  const [topic, setTopic] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [notesUrl, setNotesUrl] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) newErrors.title = "Title is required";
    if (!topic.trim()) newErrors.topic = "Topic is required";
    if (!youtubeUrl.trim())
      newErrors.youtubeUrl = "YouTube URL is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit({
      title,
      subject,
      topic,
      youtubeUrl,
      notesUrl: notesUrl || undefined,
    });

    setTitle("");
    setTopic("");
    setYoutubeUrl("");
    setNotesUrl("");
    setErrors({});
  };

  return (
    <div className="bg-background border-2 border-primary/30 rounded-xl p-8 shadow-lg">
      <h2 className="text-2xl font-bold text-foreground mb-6">
        Add New Resource
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Resource Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) setErrors({ ...errors, title: "" });
            }}
            placeholder="e.g., Electrostatics Fundamentals"
            className={`w-full px-4 py-2 border-2 rounded-lg bg-background transition-colors ${
              errors.title
                ? "border-red-500 focus:border-red-600"
                : "border-secondary/30 focus:border-primary"
            } text-foreground placeholder-foreground/40 focus:outline-none`}
          />
          {errors.title && (
            <p className="text-red-600 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        {/* Subject */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Subject *
          </label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-4 py-2 border-2 border-secondary/30 rounded-lg bg-background text-foreground focus:border-primary focus:outline-none"
          >
            {SUBJECTS.map((subj) => (
              <option key={subj} value={subj}>
                {subj}
              </option>
            ))}
          </select>
        </div>

        {/* Topic */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Topic *
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => {
              setTopic(e.target.value);
              if (errors.topic) setErrors({ ...errors, topic: "" });
            }}
            placeholder="e.g., Coulomb's Law"
            className={`w-full px-4 py-2 border-2 rounded-lg bg-background transition-colors ${
              errors.topic
                ? "border-red-500 focus:border-red-600"
                : "border-secondary/30 focus:border-primary"
            } text-foreground placeholder-foreground/40 focus:outline-none`}
          />
          {errors.topic && (
            <p className="text-red-600 text-sm mt-1">{errors.topic}</p>
          )}
        </div>

        {/* YouTube URL */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            YouTube URL *
          </label>
          <input
            type="url"
            value={youtubeUrl}
            onChange={(e) => {
              setYoutubeUrl(e.target.value);
              if (errors.youtubeUrl) setErrors({ ...errors, youtubeUrl: "" });
            }}
            placeholder="https://www.youtube.com/watch?v=..."
            className={`w-full px-4 py-2 border-2 rounded-lg bg-background transition-colors ${
              errors.youtubeUrl
                ? "border-red-500 focus:border-red-600"
                : "border-secondary/30 focus:border-primary"
            } text-foreground placeholder-foreground/40 focus:outline-none`}
          />
          {errors.youtubeUrl && (
            <p className="text-red-600 text-sm mt-1">{errors.youtubeUrl}</p>
          )}
        </div>

        {/* Notes URL */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Notes URL (Optional)
          </label>
          <input
            type="url"
            value={notesUrl}
            onChange={(e) => setNotesUrl(e.target.value)}
            placeholder="https://example.com/notes"
            className="w-full px-4 py-2 border-2 border-secondary/30 rounded-lg bg-background text-foreground placeholder-foreground/40 focus:border-primary focus:outline-none"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-2 rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Add Resource
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 border-2 border-secondary text-foreground py-2 rounded-lg font-semibold hover:bg-secondary/10 transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
