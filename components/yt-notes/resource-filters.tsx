"use client";

interface ResourceFiltersProps {
  subjects: string[];
  topics: string[];
  selectedSubject: string | null;
  selectedTopic: string | null;
  onSubjectChange: (subject: string | null) => void;
  onTopicChange: (topic: string | null) => void;
}

export default function ResourceFilters({
  subjects,
  topics,
  selectedSubject,
  selectedTopic,
  onSubjectChange,
  onTopicChange,
}: ResourceFiltersProps) {
  return (
    <div className="bg-background border-2 border-secondary/30 rounded-xl p-6 space-y-6">
      <h3 className="text-lg font-bold text-foreground">Filter Resources</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Subject Filter */}
        <div>
          <p className="text-sm font-semibold text-foreground mb-3">Subject</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onSubjectChange(null)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                selectedSubject === null
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/10 text-foreground hover:bg-secondary/20"
              }`}
            >
              All
            </button>
            {subjects.map((subject) => (
              <button
                key={subject}
                onClick={() => {
                  onSubjectChange(subject);
                  onTopicChange(null);
                }}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  selectedSubject === subject
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary/10 text-foreground hover:bg-secondary/20"
                }`}
              >
                {subject}
              </button>
            ))}
          </div>
        </div>

        {/* Topic Filter */}
        <div>
          <p className="text-sm font-semibold text-foreground mb-3">Topic</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onTopicChange(null)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                selectedTopic === null
                  ? "bg-accent text-accent-foreground"
                  : "bg-secondary/10 text-foreground hover:bg-secondary/20"
              }`}
            >
              All
            </button>
            {topics.map((topic) => (
              <button
                key={topic}
                onClick={() => onTopicChange(topic)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  selectedTopic === topic
                    ? "bg-accent text-accent-foreground"
                    : "bg-secondary/10 text-foreground hover:bg-secondary/20"
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
