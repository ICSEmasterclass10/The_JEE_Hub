"use client";

import { Resource } from "@/lib/stores/resources-store";

interface ResourceCardProps {
  resource: Resource;
  onDelete: (id: string) => void;
  index: number;
}

export default function ResourceCard({
  resource,
  onDelete,
  index,
}: ResourceCardProps) {
  return (
    <div
      className="group bg-background border-2 border-secondary/30 rounded-xl overflow-hidden hover:border-primary transition-all hover:shadow-lg"
      style={{
        animation: `fadeIn 0.3s ease-out`,
        animationDelay: `${index * 0.05}s`,
      }}
    >
      {/* Video Thumbnail Area */}
      <div className="relative w-full h-40 bg-secondary/20 overflow-hidden flex items-center justify-center">
        <iframe
          src={resource.youtubeUrl.replace("youtube.com/watch?v=", "youtube.com/embed/")}
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <h3 className="font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {resource.title}
        </h3>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded">
            {resource.subject}
          </span>
          <span className="px-2 py-1 bg-accent/10 text-accent text-xs font-semibold rounded">
            {resource.topic}
          </span>
        </div>

        {/* Links */}
        <div className="flex gap-2 pt-2 border-t border-secondary/20">
          <a
            href={resource.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded font-semibold text-sm transition-colors text-center"
          >
            Watch
          </a>
          {resource.notesUrl && (
            <a
              href={resource.notesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded font-semibold text-sm transition-colors text-center"
            >
              Notes
            </a>
          )}
          <button
            onClick={() => onDelete(resource.id)}
            className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded font-semibold text-sm transition-colors"
          >
            Delete
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
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
