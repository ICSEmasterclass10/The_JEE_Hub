"use client";

import { useState, useEffect } from "react";
import { useResourcesStore } from "@/lib/stores/resources-store";
import ResourceForm from "@/components/yt-notes/resource-form";
import ResourceGrid from "@/components/yt-notes/resource-grid";
import ResourceFilters from "@/components/yt-notes/resource-filters";

export default function YouTubeNotesPage() {
  const [mounted, setMounted] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const {
    resources,
    addResource,
    deleteResource,
    getUniqueSubjects,
    getUniqueTopics,
  } = useResourcesStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const subjects = getUniqueSubjects();
  const topics = getUniqueTopics(selectedSubject || undefined);

  const filteredResources = resources.filter(
    (r) =>
      (!selectedSubject || r.subject === selectedSubject) &&
      (!selectedTopic || r.topic === selectedTopic)
  );

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground">
              YouTube & Notes Hub
            </h1>
            <p className="text-foreground/60 mt-2">
              Curated learning resources for JEE preparation
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-lg font-semibold hover:shadow-lg transition-all w-full md:w-auto"
          >
            {showForm ? "Cancel" : "+ Add Resource"}
          </button>
        </div>

        {/* Resource Form */}
        {showForm && (
          <ResourceForm
            onSubmit={(resource) => {
              addResource(resource);
              setShowForm(false);
            }}
            onCancel={() => setShowForm(false)}
          />
        )}

        {/* Filters */}
        <ResourceFilters
          subjects={subjects}
          topics={topics}
          selectedSubject={selectedSubject}
          selectedTopic={selectedTopic}
          onSubjectChange={setSelectedSubject}
          onTopicChange={setSelectedTopic}
        />

        {/* Resources Grid */}
        <div>
          <p className="text-sm text-foreground/60 mb-4">
            Showing {filteredResources.length} resource
            {filteredResources.length !== 1 ? "s" : ""}
          </p>
          <ResourceGrid
            resources={filteredResources}
            onDelete={deleteResource}
          />
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <p className="text-2xl text-foreground/40 mb-4">
              No resources found
            </p>
            <button
              onClick={() => {
                setSelectedSubject(null);
                setSelectedTopic(null);
              }}
              className="text-primary font-semibold hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
