"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import Sidebar from "@/components/layout/sidebar";
import BottomNav from "@/components/layout/bottom-nav";

const TABS = [
  { id: "test-gen", label: "Test Generator", icon: "📝" },
  { id: "daily-tasks", label: "Daily Tasks", icon: "✓" },
  { id: "yt-notes", label: "YouTube & Notes", icon: "📹" },
  { id: "doubt-solver", label: "Doubt Solver", icon: "💡" },
  { id: "syllabus", label: "Syllabus", icon: "📚" },
  { id: "notes", label: "Notes", icon: "📄" },
];

export default function RootLayoutContent({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  
  // Extract the active tab from the pathname
  const activeTab = pathname ? pathname.split("/")[1] || "test-gen" : "test-gen";

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar
          tabs={TABS}
          activeTab={activeTab}
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20 lg:pb-0">
        <div className="max-w-full">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40">
        <BottomNav
          tabs={TABS}
          activeTab={activeTab}
        />
      </div>
    </div>
  );
}
