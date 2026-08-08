import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Resource {
  id: string;
  title: string;
  subject: string;
  topic: string;
  youtubeUrl: string;
  notesUrl?: string;
  addedAt: string;
  rating: number;
}

export interface ResourcesState {
  resources: Resource[];
  subjects: string[];
  topics: string[];

  addResource: (resource: Omit<Resource, "id" | "addedAt">) => void;
  deleteResource: (id: string) => void;
  updateResource: (id: string, resource: Partial<Resource>) => void;
  rateResource: (id: string, rating: number) => void;
  getResourcesBySubject: (subject: string) => Resource[];
  getResourcesByTopic: (topic: string) => Resource[];
  getUniqueSubjects: () => string[];
  getUniqueTopics: (subject?: string) => string[];
}

const DEFAULT_RESOURCES: Resource[] = [
  {
    id: "1",
    title: "Electrostatics Fundamentals",
    subject: "Physics",
    topic: "Electrostatics",
    youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    notesUrl: "https://example.com/electrostatics-notes",
    addedAt: new Date().toISOString(),
    rating: 0,
  },
  {
    id: "2",
    title: "Chemical Bonding Explained",
    subject: "Chemistry",
    topic: "Chemical Bonding",
    youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    notesUrl: "https://example.com/bonding-notes",
    addedAt: new Date().toISOString(),
    rating: 0,
  },
  {
    id: "3",
    title: "Calculus Integration Techniques",
    subject: "Mathematics",
    topic: "Integration",
    youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    notesUrl: "https://example.com/integration-notes",
    addedAt: new Date().toISOString(),
    rating: 0,
  },
];

export const useResourcesStore = create<ResourcesState>()(
  persist(
    (set, get) => ({
      resources: DEFAULT_RESOURCES,
      subjects: ["Physics", "Chemistry", "Mathematics"],
      topics: ["Electrostatics", "Chemical Bonding", "Integration"],

      addResource: (resource: Omit<Resource, "id" | "addedAt">) =>
        set((state) => ({
          resources: [
            ...state.resources,
            {
              ...resource,
              id: `resource-${Date.now()}`,
              addedAt: new Date().toISOString(),
            },
          ],
          subjects: Array.from(
            new Set([...state.subjects, resource.subject])
          ),
          topics: Array.from(new Set([...state.topics, resource.topic])),
        })),

      deleteResource: (id: string) =>
        set((state) => ({
          resources: state.resources.filter((r) => r.id !== id),
        })),

      updateResource: (id: string, updates: Partial<Resource>) =>
        set((state) => ({
          resources: state.resources.map((r) =>
            r.id === id ? { ...r, ...updates } : r
          ),
        })),

      rateResource: (id: string, rating: number) =>
        set((state) => ({
          resources: state.resources.map((r) =>
            r.id === id ? { ...r, rating: Math.max(0, Math.min(5, rating)) } : r
          ),
        })),

      getResourcesBySubject: (subject: string) => {
        const state = get();
        return state.resources.filter((r) => r.subject === subject);
      },

      getResourcesByTopic: (topic: string) => {
        const state = get();
        return state.resources.filter((r) => r.topic === topic);
      },

      getUniqueSubjects: () => {
        const state = get();
        return Array.from(new Set(state.resources.map((r) => r.subject)));
      },

      getUniqueTopics: (subject?: string) => {
        const state = get();
        const filtered = subject
          ? state.resources.filter((r) => r.subject === subject)
          : state.resources;
        return Array.from(new Set(filtered.map((r) => r.topic)));
      },
    }),
    {
      name: "resources-store",
      version: 1,
    }
  )
);
