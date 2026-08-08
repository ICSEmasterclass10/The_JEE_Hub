"use client";

import { Resource } from "@/lib/stores/resources-store";
import ResourceCard from "./resource-card";

interface ResourceGridProps {
  resources: Resource[];
  onDelete: (id: string) => void;
}

export default function ResourceGrid({
  resources,
  onDelete,
}: ResourceGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {resources.map((resource, idx) => (
        <ResourceCard
          key={resource.id}
          resource={resource}
          onDelete={onDelete}
          index={idx}
        />
      ))}
    </div>
  );
}
